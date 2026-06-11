# CLAUDE.md — Scenarist Obsidian Plugin

## О проекте

**Scenarist** — плагин для Obsidian, инструмент для писателей и мирострителей.
Управляет произведениями, книгами, арками, главами, персонажами и пользовательскими категориями прямо внутри vault.

- **Версия:** 0.3.3  
- **Репозиторий:** `MrDarkOm/obsidian-scenarist`  
- **Язык:** TypeScript 5.x → компилируется esbuild в `main.js`  
- **Стили:** `styles/main.css` → копируется в `styles.css` при сборке

---

## Команды

```bash
# Разработка (watch-режим, с hot-reload через Obsidian)
npm run dev

# Production-сборка (tsc type-check + esbuild + копирует CSS)
npm run build

# Проверка кода
npm run lint
npm run lint:fix   # автофикс исправимых ошибок

# Форматирование
npm run format
```

> **Важно:** `styles/main.css` — исходник стилей. Не редактируй `styles.css` напрямую — он перезаписывается при каждой сборке.

---

## Структура проекта

```
src/
├── main.ts                  — ScenaristPlugin (тонкий координатор)
├── settings.ts              — ScenaristSettings, ScenaristSettingsTab, QuickCategoryType
├── state/
│   └── ScenaristState.ts    — UI-состояние: selectedId, история, подписки
├── models/
│   ├── types.ts             — все интерфейсы и типы данных
│   ├── schema.ts            — SCHEMAS, CATEGORY_PRESETS, resolveSchema, findLinkDef
│   └── ScenaristStore.ts    — граф сущностей, вторичные индексы, персист
├── sync/
│   └── SyncEngine.ts        — синхронизация граф ↔ .md (через processFrontMatter)
├── views/
│   ├── NavigatorView.ts     — боковая панель (навигатор)
│   ├── CardView.ts          — карточка сущности с inline-редактированием
│   ├── BoardView.ts         — Kanban глав по статусу
│   ├── GraphView.ts         — граф связей (force-directed)
│   └── TimelineView.ts      — таймлайн якорей произведения
├── modals/
│   ├── CreateEntityModal.ts
│   ├── CreateWorkModal.ts
│   └── CreateCategoryModal.ts
└── templates/
    └── index.ts             — шаблоны тела .md-заметок для каждого EntityKind

styles/
└── main.css                 — единственный источник CSS (→ копируется в styles.css)
```

---

## Модель данных

### EntityKind

| Kind | Назначение | Слой |
|---|---|---|
| `project` | Верхний контейнер | `project` |
| `work` | Произведение (Серия / Ваншот) | `text` |
| `book` | Книга | `text` |
| `arc` | Арка | `text` |
| `anchor` | Ключевое событие (таймлайн) | `text` |
| `chapter` | Глава | `text` |
| `page` | Страница | `text` |
| `character` | Персонаж | `world` |
| `category` | Тип категории (содержит `categorySchema`) | `world` |
| `categoryItem` | Элемент категории (динамическая схема) | `world` |

### Интерфейс Entity

```ts
interface Entity {
  id: string;           // nanoid(12) — криптографически случайный, компактный
  kind: EntityKind;
  name: string;
  filePath: string;     // путь к .md заметке в vault
  props: Record<string, string | number | boolean | null>;
  links: Record<string, string[]>;  // key → массив id
  categorySchema?: CategorySchemaDef;  // только для kind === 'category'
  createdAt: number;
  updatedAt: number;
}
```

### Персистентность

- Граф хранится в **`.obsidian/plugins/obsidian-scenarist/scenarist-index.json`**.
  - Это папка плагина, **вне** пользовательского vault — пользователь его не трогает.
  - При первом запуске мигрируется со старого пути `.scenarist/index.json` автоматически.
- `ScenaristStore` — единственный источник истины. Сохранение — debounced 400 мс.
- **Запись frontmatter** в .md идёт через `app.fileManager.processFrontMatter` (атомарно, не трогает тело).
- **Чтение из .md** (обратная синхронизация) идёт через `MetadataCache` в `handleModify`.

### Связи и реципрокность

`setLink(id, key, targetIds)` поддерживает автоматическое обновление обратных связей через `LinkDef.reverse`. Пример: установка `book.chapters` автоматически обновляет `chapter.book`.

---

## Архитектурные паттерны

### Сервисы (разделение ответственности)

| Класс | Ответственность |
|---|---|
| `ScenaristPlugin` | Координатор: инициализирует сервисы, регистрирует views/commands |
| `ScenaristState` | UI-состояние: selectedId, история навигации, подписки onSelect |
| `ScenaristStore` | Граф данных: CRUD сущностей, вторичные индексы, сохранение |
| `SyncEngine` | Синхронизация Store ↔ .md файлы |

### Вторичные индексы Store

`ScenaristStore` поддерживает два дополнительных индекса для быстрого доступа:
- `byKindIndex: Map<EntityKind, Set<string>>` — O(1) lookup по типу
- `byPathIndex: Map<string, string>` — O(1) lookup по пути файла

Методы `byKind(kind)` и `findByPath(path)` используют эти индексы.  
Индексы автоматически обновляются при `create`, `delete`, `setFilePath`, и пересчитываются при `load()`.

### Подписки (pub/sub)

- `ScenaristStore.onChange(fn)` — изменение данных  
- `ScenaristState.onSelect(fn)` (через `plugin.onSelect(fn)`) — смена выбранного элемента  
- Оба возвращают функцию отписки. **Всегда отписывайся в `onClose()`**.

### Навигация

Через методы `ScenaristPlugin` (которые делегируют в `ScenaristState`):
- `plugin.select(id)` — выбрать сущность (открывает CardView)  
- `plugin.navigateTo(id)` — с сохранением истории  
- `plugin.back()` — назад по истории  

### Frontmatter — только через SyncEngine

**Никогда не пиши frontmatter вручную.** Только:
```ts
await plugin.sync.syncToNote(entity);  // обновить frontmatter существующей заметки
await plugin.sync.ensureNote(entity);  // создать заметку или обновить если есть
```

`CardView.stripFrontmatter` существует **только** для чтения/рендеринга тела заметки. Она никогда не пишет.

### Схемы сущностей

- Статические схемы: `SCHEMAS[kind]` в `schema.ts`  
- Динамические (для `categoryItem`): `resolveSchema(entity, store)` — читает `categorySchema` родительской категории  
- **Всегда используй** `resolveSchema` / `store.resolved(entity)`, а не `SCHEMAS[kind]` напрямую, когда работаешь с `categoryItem`.

### Пути к заметкам

`SyncEngine.buildPath(entity)` строит путь по шаблону:
```
{rootFolder}/{ProjectName}/{...}/{EntityName}.md
```
Персонажи → `Персонажи/`, книги/арки/главы → `{WorkName}/{folder}/`

### Иконки

- Везде используются **Lucide** (через Obsidian API `setIcon(el, name)`)
- Старый emoji-формат мигрируется при загрузке

---

## Настройки

| Поле | По умолчанию | Описание |
|---|---|---|
| `rootFolder` | `'Scenarist'` | Корневая папка заметок в vault |
| `autoCreateNotes` | `true` | Автосоздание .md при добавлении сущности |
| `categoryQuickTypes` | орг/локации/языки | Вкладки-категории в навигаторе |
| `genreOptions` | 10 жанров | Список жанров для выпадающего меню |
| `lastSelectedId` | — | Восстановление выбора при перезапуске |

---

## Добавление нового EntityKind

1. Добавить строку в `EntityKind` union в `types.ts`
2. Добавить схему в `SCHEMAS` в `schema.ts` (поля, связи, иконка, folder)
3. Добавить в массив `KINDS` в `schema.ts`
4. Добавить шаблон тела заметки в `templates/index.ts`
5. Добавить кейс в `SyncEngine.buildPath()` если нужен нестандартный путь
6. Добавить кейс в `SyncEngine.ownerWork()` если сущность входит в иерархию произведения

## Добавление нового поля к существующей сущности

1. Добавить `FieldDef` в `fields[]` нужной схемы в `schema.ts`
2. CSS-стили поля (если нужен кастомный рендер) — в `styles/main.css`
3. Если поле должно отображаться в `CardView` — проверить, что рендер-логика покрывает новый `FieldType`

---

## Типы полей (FieldType)

| Тип | Описание |
|---|---|
| `text` | Многострочный текст |
| `number` | Числовое значение |
| `checkbox` | Булево |
| `select` | Одиночный выбор из `options` |
| `multiselect` | Множественный выбор из `options` |
| `status` | Специальный select — первый вариант выбирается по умолчанию если `required: true` |
| `date` | Дата (хранится как строка) |

---

## Пресеты категорий (CategoryPreset)

| Пресет | Иконка | Описание |
|---|---|---|
| `organization` | `building-2` | Организации, группы |
| `location` | `map-pin` | Локации, города |
| `language` | `languages` | Языки мира |
| `custom` | `shapes` | Пустой пользовательский тип |

---

## CSS-классы (ключевые)

Все классы плагина имеют префикс `scenarist-`. Примеры:
- `.scenarist-modal`, `.scenarist-modal-title`, `.scenarist-modal-buttons`
- `.scenarist-form-row`, `.scenarist-label`, `.scenarist-input`
- `.scenarist-btn`, `.scenarist-btn-primary`
- `.scenarist-icon-picker`, `.scenarist-icon-grid`, `.scenarist-icon-cell`
- `.scenarist-icon-preview`, `.scenarist-setting-icon`

---

## Известные нюансы

- **selfWrites** в `SyncEngine` — Set путей куда плагин только что записал. Нужен чтобы `handleModify` не зациклился. `processFrontMatter` тоже тригерит vault events, поэтому selfWrites критичен.
- **scheduleSave** в Store debounced 400 мс; при `onunload` вызывается `store.save()` синхронно.
- **state.flushSave()** — сбрасывает debounce сохранения settings при выгрузке плагина.
- `activeProjectId === NO_PROJECT ('__none__')` означает «работа без проекта».
- `resolveSchema` для `categoryItem` требует наличия родительской категории в Store — если категория удалена, вернётся базовая схема.
- **ESLint warnings** (не errors): `@typescript-eslint/no-non-null-assertion` и `@typescript-eslint/no-explicit-any` — ожидаемые предупреждения в местах где Obsidian API возвращает `any` или требует `!`.
