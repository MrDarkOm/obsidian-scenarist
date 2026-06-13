# CLAUDE.md — Scenarist Obsidian Plugin

## О проекте

**Scenarist** — плагин для Obsidian, инструмент для писателей и мирострителей.
Управляет произведениями, книгами, арками, главами, персонажами и пользовательскими категориями прямо внутри vault.

- **Версия:** 0.5.2 (синхронизирована в `manifest.json` и `package.json`)
- **Репозиторий:** `MrDarkOm/obsidian-scenarist`
- **Язык:** TypeScript 5.x → компилируется esbuild в `main.js`
- **Стили:** `styles/main.css` → копируется в `styles.css` при сборке
- **План работ:** см. [ROADMAP.md](ROADMAP.md) — приоритизированный список багов и улучшений

---

## Команды

```bash
# Разработка (watch-режим, с hot-reload через Obsidian)
npm run dev

# Production-сборка (tsc type-check + esbuild + копирует CSS)
npm run build

# Тесты (vitest; obsidian мокается через tests/__mocks__/obsidian.ts)
npm run test
npm run test:watch

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
├── i18n/
│   ├── index.ts             — t(), setLocale(), detectLang() (по window.moment.locale())
│   ├── ru.ts                — русские переводы (базовая локаль)
│   └── en.ts                — английские переводы
├── state/
│   └── ScenaristState.ts    — UI-состояние: selectedId, история, подписки
├── models/
│   ├── types.ts             — все интерфейсы и типы данных
│   ├── schema.ts            — SCHEMAS, CATEGORY_PRESETS, resolveSchema, findLinkDef
│   └── ScenaristStore.ts    — граф сущностей, вторичные индексы, персист, sidecar-пути
├── sync/
│   └── SyncEngine.ts        — синхронизация граф ↔ .md (через processFrontMatter), rescanVault
├── views/
│   ├── NavigatorView.ts     — боковая панель (навигатор)
│   ├── CardView.ts          — карточка сущности (CARD_VIEW) + EntityFileView (.sc вкладки)
│   ├── BoardView.ts         — Kanban глав по статусу
│   ├── GraphView.ts         — граф связей (force-directed)
│   └── TimelineView.ts      — таймлайн якорей произведения
├── modals/
│   ├── CreateEntityModal.ts
│   ├── CreateWorkModal.ts
│   └── CreateCategoryModal.ts
└── templates/
    └── index.ts             — шаблоны тела .md-заметок для каждого EntityKind

tests/
├── __mocks__/obsidian.ts    — мок Obsidian API для vitest
├── ScenaristStore.test.ts
└── SyncEngine.buildPath.test.ts

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

### Персистентность (три слоя)

1. **Индекс** — `.obsidian/plugins/obsidian-scenarist/scenarist-index.json`.
   - Папка плагина, **вне** пользовательского vault — пользователь его не трогает.
   - При первом запуске мигрируется со старого пути `.scenarist/index.json` автоматически.
   - `INDEX_VERSION` записывается в файл (сейчас при load() не проверяется — см. ROADMAP).
2. **Frontmatter .md-заметок** — поля и связи (связи как wikilinks).
   - **Запись** только через `app.fileManager.processFrontMatter` (атомарно, не трогает тело).
   - **Чтение** (обратная синхронизация) через `MetadataCache` в `handleModify`.
3. **Sidecar-файлы `.sc`** — JSON-снимок Entity рядом с каждой .md-заметкой
   (`Глава 1.md` → `Глава 1.sc`, см. `ScenaristStore.sidecarPath`).
   - Пишутся в `store.save()` для всех сущностей с `filePath`.
   - При `rescanVault` sidecar имеет **приоритет над frontmatter** при восстановлении сущности.
   - `.sc` зарегистрировано как расширение (`registerExtensions(['sc'], ENTITY_FILE_VIEW)`) —
     клик по `.sc` в дереве vault открывает закреплённую карточку сущности (`EntityFileView`).
   - При rename .md sidecar переименовывается вместе с ним (`handleRename`).

`ScenaristStore` — единственный источник истины. Сохранение — debounced 400 мс.

### Связи и реципрокность

`setLink(id, key, targetIds)` поддерживает автоматическое обновление обратных связей через `LinkDef.reverse`. Пример: установка `book.chapters` автоматически обновляет `chapter.book`.

---

## Архитектурные паттерны

### Сервисы (разделение ответственности)

| Класс | Ответственность |
|---|---|
| `ScenaristPlugin` | Координатор: инициализирует сервисы, регистрирует views/commands |
| `ScenaristState` | UI-состояние: selectedId, история навигации, подписки onSelect |
| `ScenaristStore` | Граф данных: CRUD сущностей, вторичные индексы, сохранение, sidecar-пути |
| `SyncEngine` | Синхронизация Store ↔ .md файлы, rescanVault, восстановление из sidecar/frontmatter |

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

### Навигация и открытие сущностей

Через методы `ScenaristPlugin` (которые делегируют в `ScenaristState`):
- `plugin.select(id)` — выбрать сущность (открывает CardView)
- `plugin.navigateTo(id)` — с сохранением истории
- `plugin.back()` — назад по истории
- `plugin.openEntity(id)` — открыть сущность как **вкладку `.sc`** (как клик по файлу в дереве);
  фокусирует уже открытую вкладку, создаёт `.sc`-файл при необходимости,
  фолбэк на `navigateTo` если у сущности нет заметки.

### CardView и EntityFileView

- `CardView` (`CARD_VIEW`) — главная панель, следит за `plugin.selectedId`.
- `EntityFileView` (`ENTITY_FILE_VIEW`) — наследник CardView для `.sc`-файлов:
  отдельный тип view, чтобы Obsidian открывал каждый файл в новой вкладке.
  Закрепляется за сущностью через `pinnedId` (не следит за навигатором).
  В `setState` важно чейнить `super.setState` — FileView сам грузит файл и зовёт `onLoadFile`.
- Для персонажей карточка рендерится вкладками (`tab` в FieldDef: basic / characteristics /
  biography / appearance) с подразделами (`section` → заголовки через i18n `card.section.*`).

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

### i18n

- Локали: `ru` (базовая) и `en`. Определение — `detectLang()` по `window.moment.locale()`,
  установка — `setLocale()` в `onload`.
- `t(key, vars?, fallback?)` — dot-path ключ, `{{var}}`-интерполяция, фолбэк на ключ.
- `label` в схемах (`schema.ts`) — это **ключи переводов** (`'schema.work.fields.format'`),
  рендерится через `t(field.label, undefined, field.label)`.
- **Stored values не переводятся**: значения `options` (`'Серия'`, `'В работе'`, роли персонажей
  и т.п.) — это персистентные данные в `props`/frontmatter. Переводится только UI вокруг них.
- После смены языка — `plugin.refreshAllViews()`.

### Пути к заметкам

`SyncEngine.buildPath(entity)` строит путь по шаблону:
```
{rootFolder}/{ProjectName}/{...}/{EntityName}.md
```
Персонажи → `Персонажи/`, книги/арки/главы → `{WorkName}/{folder}/`

### Иконки

- Везде используются **Lucide** (через Obsidian API `setIcon(el, name)`)
- Старый emoji-формат мигрируется при загрузке; рендер-хелперы (`renderIconInto`, `typeIcon`)
  распознают строки ≤2 символов как emoji-fallback.

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
2. Добавить схему в `SCHEMAS` в `schema.ts` (поля, связи, иконка, folder; `label` — ключ перевода)
3. Добавить ключи переводов в `i18n/ru.ts` и `i18n/en.ts`
4. Добавить в массив `KINDS` в `schema.ts`
5. Добавить шаблон тела заметки в `templates/index.ts`
6. Добавить кейс в `SyncEngine.buildPath()` если нужен нестандартный путь
7. Добавить кейс в `SyncEngine.ownerWork()` если сущность входит в иерархию произведения

## Добавление нового поля к существующей сущности

1. Добавить `FieldDef` в `fields[]` нужной схемы в `schema.ts` (`label` — ключ перевода, добавить в обе локали)
2. CSS-стили поля (если нужен кастомный рендер) — в `styles/main.css`
3. Если поле должно отображаться в `CardView` — проверить, что рендер-логика покрывает новый `FieldType`
4. Для персонажа — указать `tab` (и при необходимости `section`), иначе поле не попадёт ни в одну вкладку

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

- **selfWrites** в `SyncEngine` — Set путей куда плагин только что записал. Нужен чтобы `handleModify` не зациклился. `processFrontMatter` тоже тригерит vault events, поэтому selfWrites критичен. (Известная слабость: запись снимается только следующим modify-событием — см. ROADMAP п. 5.)
- **Vault-события приходят для всех файлов**, включая `.sc`, которые пишет сам `store.save()` — обработчики должны фильтровать по расширению (см. ROADMAP п. 1).
- **scheduleSave** в Store debounced 400 мс; при `onunload` вызывается `store.save()` синхронно.
- **store.save() пишет sidecar-файлы для всех сущностей** — O(N) записей на каждый save (см. ROADMAP п. 13).
- **state.flushSave()** — отменяет debounce-таймер настроек при выгрузке плагина (фактическое сохранение делает `onunload` → `saveSettings()`).
- `activeProjectId === NO_PROJECT ('__none__')` означает «работа без проекта».
- `resolveSchema` для `categoryItem` требует наличия родительской категории в Store — если категория удалена, вернётся базовая схема.
- **Переименование сущности не переносит её .md-файл** — `buildPath` строится от имени, поэтому rename + ensureNote создаёт дубликат (см. ROADMAP п. 2).
- **ESLint warnings** (не errors): `@typescript-eslint/no-non-null-assertion` и `@typescript-eslint/no-explicit-any` — ожидаемые предупреждения в местах где Obsidian API возвращает `any` или требует `!`.
- При изменении версии — синхронизировать `manifest.json`, `package.json` и шапку этого файла.
