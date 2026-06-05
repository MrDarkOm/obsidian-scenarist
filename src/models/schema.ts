import {
	CategoryPreset,
	CategorySchemaDef,
	Entity,
	EntityKind,
	EntitySchema,
	ResolvedSchema,
} from './types';

// ============================================
//  Статические схемы фиксированных типов
// ============================================

export const SCHEMAS: Record<EntityKind, EntitySchema> = {
	project: {
		kind: 'project',
		label: 'Проект',
		labelPlural: 'Проекты',
		icon: '📁',
		folder: '',
		layer: 'project',
		titleField: 'Name',
		fields: [{ key: 'summary', label: 'Описание', type: 'text' }],
		links: [],
	},

	work: {
		kind: 'work',
		label: 'Произведение',
		labelPlural: 'Произведения',
		icon: '🎨',
		folder: '',
		layer: 'text',
		titleField: 'Name',
		fields: [
			{
				key: 'format',
				label: 'Формат',
				type: 'select',
				required: true,
				options: [
					{ value: 'Серия', color: '#9b59b6' },
					{ value: 'Ваншот', color: '#4a9eff' },
				],
			},
			{
				key: 'type',
				label: 'Тип',
				type: 'select',
				required: true,
				options: [
					{ value: 'Рассказ', color: '#4a9eff' },
					{ value: 'Сценарий', color: '#7ed321' },
				],
			},
			{
				key: 'status',
				label: 'Статус',
				type: 'status',
				options: [
					{ value: 'Обычное',   color: '#888' },
					{ value: 'Избранное', color: '#f5c518' },
					{ value: 'Архив',     color: '#c0392b' },
				],
			},
			{ key: 'summary', label: 'Краткое описание', type: 'text' },
		],
		links: [
			{ key: 'project', label: 'Проект', target: 'project', single: true },
			{ key: 'books', label: 'Книги', target: 'book', reverse: 'work' },
			{ key: 'arcs', label: 'Арки', target: 'arc', reverse: 'work' },
			{ key: 'anchors', label: 'Якоря', target: 'anchor', reverse: 'work' },
		],
	},

	book: {
		kind: 'book',
		label: 'Книга',
		labelPlural: 'Книги',
		icon: '📗',
		folder: 'Книги',
		layer: 'text',
		titleField: 'Name',
		fields: [
			{
				key: 'genre',
				label: 'Жанр',
				type: 'multiselect',
				options: [
					{ value: 'Приключение',      color: '#9b59b6' },
					{ value: 'Комедия',          color: '#e67e22' },
					{ value: 'Триллер',          color: '#f5a623' },
					{ value: 'Драма',            color: '#4a9eff' },
					{ value: 'Фэнтези',          color: '#7ed321' },
					{ value: 'Научная фантастика', color: '#00bcd4' },
					{ value: 'Хоррор',           color: '#c0392b' },
					{ value: 'Романтика',        color: '#e84393' },
					{ value: 'Детектив',         color: '#8b5a2b' },
					{ value: 'Боевик',           color: '#f5a623' },
				],
			},
			{
				key: 'format',
				label: 'Формат',
				type: 'select',
				required: true,
				options: [
					{ value: 'A4', color: '#c0392b' },
					{ value: 'WebToon', color: '#e67e22' },
				],
			},
			{ key: 'audience', label: 'Возрастная аудитория', type: 'number' },
			{ key: 'idea', label: 'Идея', type: 'text' },
			{ key: 'synopsis', label: 'Синопсис', type: 'text' },
			{ key: 'completed', label: 'Завершено', type: 'checkbox' },
		],
		links: [
			{ key: 'work', label: 'Произведение', target: 'work', single: true, reverse: 'books' },
			{ key: 'chapters', label: 'Главы', target: 'chapter', reverse: 'book' },
		],
	},

	arc: {
		kind: 'arc',
		label: 'Арка',
		labelPlural: 'Арки',
		icon: '🌉',
		folder: 'Арки',
		layer: 'text',
		titleField: 'Name',
		fields: [
			{ key: 'goal', label: 'Цель', type: 'text' },
			{ key: 'description', label: 'Описание', type: 'text' },
		],
		links: [
			{ key: 'work', label: 'Произведение', target: 'work', single: true, reverse: 'arcs' },
			{ key: 'books', label: 'Книги', target: 'book' },
			{ key: 'chapters', label: 'Главы', target: 'chapter', reverse: 'arc' },
			{ key: 'anchors', label: 'Якоря', target: 'anchor', reverse: 'arc' },
			{ key: 'keyCharacters', label: 'Ключевые персонажи', target: 'character' },
		],
	},

	anchor: {
		kind: 'anchor',
		label: 'Якорь',
		labelPlural: 'Якоря',
		icon: '⚓',
		folder: 'Якоря',
		layer: 'text',
		titleField: 'Name',
		fields: [
			{ key: 'description', label: 'Описание события', type: 'text' },
			{ key: 'date', label: 'Дата / момент', type: 'text' },
			{ key: 'order', label: 'Порядок на таймлайне', type: 'number' },
		],
		links: [
			{ key: 'work', label: 'Произведение', target: 'work', single: true, reverse: 'anchors' },
			{ key: 'arc', label: 'Арка', target: 'arc', single: true, reverse: 'anchors' },
			{ key: 'chapters', label: 'Главы', target: 'chapter', reverse: 'anchors' },
			{ key: 'characters', label: 'Персонажи', target: 'character' },
		],
	},

	chapter: {
		kind: 'chapter',
		label: 'Глава',
		labelPlural: 'Главы',
		icon: '📖',
		folder: 'Главы',
		layer: 'text',
		titleField: 'Название',
		fields: [
			{
				key: 'status',
				label: 'Статус',
				type: 'status',
				required: true,
				options: [
					{ value: 'Создано',  color: '#888' },
					{ value: 'В работе', color: '#4a9eff' },
					{ value: 'Черновик', color: '#f5a623' },
					{ value: 'Готово',   color: '#7ed321' },
					{ value: 'Архив',    color: '#c0392b' },
				],
			},
			{ key: 'synopsis', label: 'Синопсис', type: 'text' },
		],
		links: [
			{ key: 'book', label: 'Книга', target: 'book', single: true, reverse: 'chapters' },
			{ key: 'arc', label: 'Арка', target: 'arc', reverse: 'chapters' },
			{ key: 'anchors', label: 'Якоря', target: 'anchor', reverse: 'chapters' },
			{ key: 'characters', label: 'Персонажи', target: 'character', reverse: 'chapters' },
		],
	},

	page: {
		kind: 'page',
		label: 'Страница',
		labelPlural: 'Страницы',
		icon: '📄',
		folder: 'Страницы',
		layer: 'text',
		titleField: 'Name',
		fields: [{ key: 'archived', label: 'Архив', type: 'checkbox' }],
		links: [
			{ key: 'chapter', label: 'Глава', target: 'chapter', single: true, reverse: 'pages' },
			{ key: 'characters', label: 'Персонажи', target: 'character', reverse: 'pages' },
		],
	},

	character: {
		kind: 'character',
		label: 'Персонаж',
		labelPlural: 'Персонажи',
		icon: '👤',
		folder: 'Персонажи',
		layer: 'world',
		titleField: 'Name',
		fields: [
			{
				key: 'type',
				label: 'Тип',
				type: 'select',
				options: [
					{ value: 'Протагонист', color: '#7ed321' },
					{ value: 'Антагонист', color: '#c0392b' },
					{ value: 'Преступник', color: '#8b5a2b' },
					{ value: 'Союзник', color: '#4a9eff' },
					{ value: 'Нейтральный', color: '#9b59b6' },
				],
			},
			{
				key: 'role',
				label: 'Роль в истории',
				type: 'select',
				options: [
					{ value: 'Главная', color: '#7ed321' },
					{ value: 'Ключевая', color: '#f5a623' },
					{ value: 'Второстепенная', color: '#4a9eff' },
					{ value: 'Эпизодическая', color: '#e84393' },
				],
			},
			{ key: 'age', label: 'Возраст', type: 'number' },
			{ key: 'activity', label: 'Деятельность', type: 'text' },
			{ key: 'summary', label: 'Краткое описание', type: 'text' },
		],
		links: [
			{ key: 'project', label: 'Проект', target: 'project', single: true },
			{ key: 'works', label: 'Произведения', target: 'work' },
			{ key: 'affiliation', label: 'Принадлежность', target: 'categoryItem', reverse: 'members' },
			{ key: 'original', label: 'Оригинал', target: 'character', single: true, reverse: 'otherVersions' },
			{ key: 'otherVersions', label: 'В других историях', target: 'character', reverse: 'original' },
		],
	},

	category: {
		kind: 'category',
		label: 'Категория',
		labelPlural: 'Категории',
		icon: '🗂',
		folder: '',
		layer: 'world',
		titleField: 'Name',
		fields: [{ key: 'summary', label: 'Описание категории', type: 'text' }],
		links: [{ key: 'project', label: 'Проект', target: 'project', single: true }],
	},

	// Базовая схема элемента категории — поля/связи дополняются динамически.
	categoryItem: {
		kind: 'categoryItem',
		label: 'Элемент',
		labelPlural: 'Элементы',
		icon: '⬡',
		folder: '',
		layer: 'world',
		titleField: 'Name',
		fields: [],
		links: [{ key: 'works', label: 'Произведения', target: 'work' }],
	},
};

export const KINDS: EntityKind[] = [
	'project',
	'work',
	'book',
	'arc',
	'anchor',
	'chapter',
	'page',
	'character',
	'category',
	'categoryItem',
];

// ============================================
//  Пресеты категорий
// ============================================

export const CATEGORY_PRESETS: Record<CategoryPreset, CategorySchemaDef> = {
	organization: {
		icon: '♛',
		preset: 'organization',
		fields: [
			{
				key: 'type',
				label: 'Тип',
				type: 'select',
				options: [
					{ value: 'Следователи', color: '#f5a623' },
					{ value: 'Преступники', color: '#e84393' },
					{ value: 'СМИ', color: '#c0392b' },
					{ value: 'Международная организация', color: '#9b59b6' },
					{ value: 'Собирательная группа', color: '#8b5a2b' },
					{ value: 'Другое', color: '#7ed321' },
				],
			},
			{ key: 'summary', label: 'Короткое описание', type: 'text' },
		],
		linkDefs: [
			{ key: 'leader', label: 'Лидер', target: 'character', single: true },
			{ key: 'members', label: 'Участники', target: 'character', reverse: 'affiliation' },
		],
	},
	location: {
		icon: '📍',
		preset: 'location',
		fields: [
			{
				key: 'type',
				label: 'Тип',
				type: 'select',
				options: [
					{ value: 'Локация', color: '#f5a623' },
					{ value: 'Город', color: '#e67e22' },
					{ value: 'Район', color: '#e84393' },
					{ value: 'Неизвестно', color: '#7ed321' },
				],
			},
			{ key: 'country', label: 'Страна', type: 'text' },
			{ key: 'summary', label: 'Короткое описание', type: 'text' },
		],
		linkDefs: [],
	},
	language: {
		icon: '🌐',
		preset: 'language',
		fields: [
			{
				key: 'type',
				label: 'Тип',
				type: 'select',
				options: [
					{ value: 'Официальный', color: '#4a9eff' },
					{ value: 'Диалект', color: '#f5a623' },
					{ value: 'Мёртвый', color: '#888' },
					{ value: 'Созданный', color: '#9b59b6' },
				],
			},
			{ key: 'region', label: 'Регион', type: 'text' },
			{ key: 'summary', label: 'Описание', type: 'text' },
		],
		linkDefs: [],
	},

	custom: {
		icon: '⬡',
		preset: 'custom',
		fields: [{ key: 'summary', label: 'Описание', type: 'text' }],
		linkDefs: [],
	},
};

export const PRESET_LABELS: Record<CategoryPreset, string> = {
	organization: 'Организация',
	location: 'Локация',
	language: 'Язык',
	custom: 'Пользовательская',
};

// ============================================
//  Разрешение эффективной схемы сущности
// ============================================

/** Хранилище должно уметь отдавать сущность по id (минимальный интерфейс). */
export interface EntityLookup {
	get(id: string): Entity | null;
}

export function resolveSchema(entity: Entity, store: EntityLookup): ResolvedSchema {
	if (entity.kind === 'categoryItem') {
		const catId = (entity.links['category'] || [])[0];
		const category = catId ? store.get(catId) : null;
		const def = category?.categorySchema;
		const base = SCHEMAS.categoryItem;
		if (def) {
			return {
				icon: def.icon,
				label: category ? category.name : base.label,
				fields: def.fields,
				links: [...base.links, ...def.linkDefs],
			};
		}
		return { icon: base.icon, label: base.label, fields: base.fields, links: base.links };
	}
	const s = SCHEMAS[entity.kind];
	if (!s) {
		const base = SCHEMAS.categoryItem;
		return { icon: base.icon, label: entity.kind, fields: [], links: base.links };
	}
	return { icon: s.icon, label: s.label, fields: s.fields, links: s.links };
}

/** Найти LinkDef (с учётом динамики) по сущности и ключу. */
export function findLinkDef(entity: Entity, key: string, store: EntityLookup) {
	return resolveSchema(entity, store).links.find((l) => l.key === key) || null;
}
