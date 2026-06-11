import { CategoryPreset, CategorySchemaDef, Entity, EntityKind, EntitySchema, ResolvedSchema } from './types';

// ============================================
//  Статические схемы фиксированных типов
// ============================================

export const SCHEMAS: Record<EntityKind, EntitySchema> = {
	project: {
		kind: 'project',
		label: 'schema.project.label',
		labelPlural: 'schema.project.labelPlural',
		icon: 'folder',
		folder: '',
		layer: 'project',
		titleField: 'Name',
		fields: [{ key: 'summary', label: 'schema.project.fields.summary', type: 'text' }],
		links: [],
	},

	work: {
		kind: 'work',
		label: 'schema.work.label',
		labelPlural: 'schema.work.labelPlural',
		icon: 'pen-line',
		folder: '',
		layer: 'text',
		titleField: 'Name',
		fields: [
			{
				key: 'format',
				label: 'schema.work.fields.format',
				type: 'select',
				required: true,
				options: [
					{ value: 'Серия', color: '#9b59b6' },
					{ value: 'Ваншот', color: '#4a9eff' },
				],
			},
			{
				key: 'type',
				label: 'schema.work.fields.type',
				type: 'select',
				required: true,
				options: [
					{ value: 'Рассказ', color: '#4a9eff' },
					{ value: 'Сценарий', color: '#7ed321' },
				],
			},
			{
				key: 'status',
				label: 'schema.work.fields.status',
				type: 'status',
				options: [
					{ value: 'Обычное', color: '#888' },
					{ value: 'Избранное', color: '#f5c518' },
					{ value: 'Архив', color: '#c0392b' },
				],
			},
			{ key: 'summary', label: 'schema.work.fields.summary', type: 'text' },
		],
		links: [
			{ key: 'project', label: 'schema.work.links.project', target: 'project', single: true },
			{ key: 'books', label: 'schema.work.links.books', target: 'book', reverse: 'work' },
			{ key: 'arcs', label: 'schema.work.links.arcs', target: 'arc', reverse: 'work' },
			{ key: 'anchors', label: 'schema.work.links.anchors', target: 'anchor', reverse: 'work' },
		],
	},

	book: {
		kind: 'book',
		label: 'schema.book.label',
		labelPlural: 'schema.book.labelPlural',
		icon: 'book-open',
		folder: 'Книги',
		layer: 'text',
		titleField: 'Name',
		fields: [
			{
				key: 'genre',
				label: 'schema.book.fields.genre',
				type: 'multiselect',
				options: [
					{ value: 'Приключение', color: '#9b59b6' },
					{ value: 'Комедия', color: '#e67e22' },
					{ value: 'Триллер', color: '#f5a623' },
					{ value: 'Драма', color: '#4a9eff' },
					{ value: 'Фэнтези', color: '#7ed321' },
					{ value: 'Научная фантастика', color: '#00bcd4' },
					{ value: 'Хоррор', color: '#c0392b' },
					{ value: 'Романтика', color: '#e84393' },
					{ value: 'Детектив', color: '#8b5a2b' },
					{ value: 'Боевик', color: '#f5a623' },
				],
			},
			{
				key: 'format',
				label: 'schema.book.fields.format',
				type: 'select',
				required: true,
				options: [
					{ value: 'A4', color: '#c0392b' },
					{ value: 'WebToon', color: '#e67e22' },
				],
			},
			{ key: 'audience', label: 'schema.book.fields.audience', type: 'number' },
			{ key: 'idea', label: 'schema.book.fields.idea', type: 'text' },
			{ key: 'synopsis', label: 'schema.book.fields.synopsis', type: 'text' },
			{ key: 'completed', label: 'schema.book.fields.completed', type: 'checkbox' },
		],
		links: [
			{ key: 'work', label: 'schema.book.links.work', target: 'work', single: true, reverse: 'books' },
			{ key: 'chapters', label: 'schema.book.links.chapters', target: 'chapter', reverse: 'book' },
		],
	},

	arc: {
		kind: 'arc',
		label: 'schema.arc.label',
		labelPlural: 'schema.arc.labelPlural',
		icon: 'git-branch',
		folder: 'Арки',
		layer: 'text',
		titleField: 'Name',
		fields: [
			{ key: 'goal', label: 'schema.arc.fields.goal', type: 'text' },
			{ key: 'description', label: 'schema.arc.fields.description', type: 'text' },
		],
		links: [
			{ key: 'work', label: 'schema.arc.links.work', target: 'work', single: true, reverse: 'arcs' },
			{ key: 'books', label: 'schema.arc.links.books', target: 'book' },
			{ key: 'chapters', label: 'schema.arc.links.chapters', target: 'chapter', reverse: 'arc' },
			{ key: 'anchors', label: 'schema.arc.links.anchors', target: 'anchor', reverse: 'arc' },
			{ key: 'keyCharacters', label: 'schema.arc.links.keyCharacters', target: 'character', reverse: 'arcs' },
		],
	},

	anchor: {
		kind: 'anchor',
		label: 'schema.anchor.label',
		labelPlural: 'schema.anchor.labelPlural',
		icon: 'anchor',
		folder: 'Якоря',
		layer: 'text',
		titleField: 'Name',
		fields: [
			{ key: 'description', label: 'schema.anchor.fields.description', type: 'text' },
			{ key: 'date', label: 'schema.anchor.fields.date', type: 'text' },
			{ key: 'order', label: 'schema.anchor.fields.order', type: 'number' },
		],
		links: [
			{ key: 'work', label: 'schema.anchor.links.work', target: 'work', single: true, reverse: 'anchors' },
			{ key: 'arc', label: 'schema.anchor.links.arc', target: 'arc', single: true, reverse: 'anchors' },
			{ key: 'chapters', label: 'schema.anchor.links.chapters', target: 'chapter', reverse: 'anchors' },
			{ key: 'characters', label: 'schema.anchor.links.characters', target: 'character' },
		],
	},

	chapter: {
		kind: 'chapter',
		label: 'schema.chapter.label',
		labelPlural: 'schema.chapter.labelPlural',
		icon: 'scroll',
		folder: 'Главы',
		layer: 'text',
		titleField: 'Название',
		fields: [
			{
				key: 'status',
				label: 'schema.chapter.fields.status',
				type: 'status',
				required: true,
				options: [
					{ value: 'Создано', color: '#888' },
					{ value: 'В работе', color: '#4a9eff' },
					{ value: 'Черновик', color: '#f5a623' },
					{ value: 'Готово', color: '#7ed321' },
					{ value: 'Архив', color: '#c0392b' },
				],
			},
			{ key: 'synopsis', label: 'schema.chapter.fields.synopsis', type: 'text' },
		],
		links: [
			{ key: 'book', label: 'schema.chapter.links.book', target: 'book', single: true, reverse: 'chapters' },
			{ key: 'arc', label: 'schema.chapter.links.arc', target: 'arc', reverse: 'chapters' },
			{ key: 'anchors', label: 'schema.chapter.links.anchors', target: 'anchor', reverse: 'chapters' },
			{ key: 'characters', label: 'schema.chapter.links.characters', target: 'character', reverse: 'chapters' },
		],
	},

	page: {
		kind: 'page',
		label: 'schema.page.label',
		labelPlural: 'schema.page.labelPlural',
		icon: 'file-text',
		folder: 'Страницы',
		layer: 'text',
		titleField: 'Name',
		fields: [{ key: 'archived', label: 'schema.page.fields.archived', type: 'checkbox' }],
		links: [
			{ key: 'chapter', label: 'schema.page.links.chapter', target: 'chapter', single: true, reverse: 'pages' },
			{ key: 'characters', label: 'schema.page.links.characters', target: 'character', reverse: 'pages' },
		],
	},

	character: {
		kind: 'character',
		label: 'schema.character.label',
		labelPlural: 'schema.character.labelPlural',
		icon: 'user',
		folder: 'Персонажи',
		layer: 'world',
		titleField: 'Name',
		fields: [
			// ── Основное ───────────────────────────────────────────────────────
			{
				key: 'type',
				label: 'schema.character.fields.type',
				type: 'select',
				tab: 'basic',
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
				label: 'schema.character.fields.role',
				type: 'select',
				tab: 'basic',
				options: [
					{ value: 'Главная', color: '#7ed321' },
					{ value: 'Ключевая', color: '#f5a623' },
					{ value: 'Второстепенная', color: '#4a9eff' },
					{ value: 'Эпизодическая', color: '#e84393' },
				],
			},
			{ key: 'age',      label: 'schema.character.fields.age',      type: 'number', tab: 'basic' },
			{ key: 'activity', label: 'schema.character.fields.activity',  type: 'text',   tab: 'basic' },
			{ key: 'summary',  label: 'schema.character.fields.summary',   type: 'text',   tab: 'basic' },
			// ── Характеристики → История ───────────────────────────────────────
			{ key: 'storyGoalExternal', label: 'schema.character.fields.storyGoalExternal', type: 'text', tab: 'characteristics', section: 'story' },
			{ key: 'storyGoalInternal', label: 'schema.character.fields.storyGoalInternal', type: 'text', tab: 'characteristics', section: 'story' },
			{ key: 'initialBeliefs',    label: 'schema.character.fields.initialBeliefs',    type: 'text', tab: 'characteristics', section: 'story' },
			{ key: 'changedBeliefs',    label: 'schema.character.fields.changedBeliefs',    type: 'text', tab: 'characteristics', section: 'story' },
			{ key: 'changeDriver',      label: 'schema.character.fields.changeDriver',      type: 'text', tab: 'characteristics', section: 'story' },
			{ key: 'firstAppearance',   label: 'schema.character.fields.firstAppearance',   type: 'text', tab: 'characteristics', section: 'story' },
			{ key: 'plotInvolvement',   label: 'schema.character.fields.plotInvolvement',   type: 'text', tab: 'characteristics', section: 'story' },
			{ key: 'conflict',          label: 'schema.character.fields.conflict',          type: 'text', tab: 'characteristics', section: 'story' },
			{ key: 'decisiveMoment',    label: 'schema.character.fields.decisiveMoment',    type: 'text', tab: 'characteristics', section: 'story' },
			// ── Характеристики → Жизнь ────────────────────────────────────────
			{ key: 'skills',          label: 'schema.character.fields.skills',          type: 'text', tab: 'characteristics', section: 'life' },
			{ key: 'skillsOrigin',    label: 'schema.character.fields.skillsOrigin',    type: 'text', tab: 'characteristics', section: 'life' },
			{ key: 'strengthTalent',  label: 'schema.character.fields.strengthTalent',  type: 'text', tab: 'characteristics', section: 'life' },
			{ key: 'weakness',        label: 'schema.character.fields.weakness',        type: 'text', tab: 'characteristics', section: 'life' },
			{ key: 'hobbies',         label: 'schema.character.fields.hobbies',         type: 'text', tab: 'characteristics', section: 'life' },
			{ key: 'habits',          label: 'schema.character.fields.habits',          type: 'text', tab: 'characteristics', section: 'life' },
			{ key: 'health',          label: 'schema.character.fields.health',          type: 'text', tab: 'characteristics', section: 'life' },
			{ key: 'speech',          label: 'schema.character.fields.speech',          type: 'text', tab: 'characteristics', section: 'life' },
			{ key: 'pet',             label: 'schema.character.fields.pet',             type: 'text', tab: 'characteristics', section: 'life' },
			{ key: 'specialItems',    label: 'schema.character.fields.specialItems',    type: 'text', tab: 'characteristics', section: 'life' },
			{ key: 'residence',       label: 'schema.character.fields.residence',       type: 'text', tab: 'characteristics', section: 'life' },
			{ key: 'homeDescription', label: 'schema.character.fields.homeDescription', type: 'text', tab: 'characteristics', section: 'life' },
			{ key: 'neighbors',       label: 'schema.character.fields.neighbors',       type: 'text', tab: 'characteristics', section: 'life' },
			{ key: 'organizations',   label: 'schema.character.fields.organizations',   type: 'text', tab: 'characteristics', section: 'life' },
			{ key: 'income',          label: 'schema.character.fields.income',          type: 'text', tab: 'characteristics', section: 'life' },
			{ key: 'occupation',      label: 'schema.character.fields.occupation',      type: 'text', tab: 'characteristics', section: 'life' },
			{ key: 'jobTitle',        label: 'schema.character.fields.jobTitle',        type: 'text', tab: 'characteristics', section: 'life' },
			{ key: 'jobSatisfaction', label: 'schema.character.fields.jobSatisfaction', type: 'text', tab: 'characteristics', section: 'life' },
			// ── Характеристики → Мироощущение ─────────────────────────────────
			{ key: 'personalityTraits',  label: 'schema.character.fields.personalityTraits',  type: 'text', tab: 'characteristics', section: 'worldview' },
			{ key: 'moralValues',        label: 'schema.character.fields.moralValues',        type: 'text', tab: 'characteristics', section: 'worldview' },
			{ key: 'drivingForce',       label: 'schema.character.fields.drivingForce',       type: 'text', tab: 'characteristics', section: 'worldview' },
			{ key: 'discouragement',     label: 'schema.character.fields.discouragement',     type: 'text', tab: 'characteristics', section: 'worldview' },
			{ key: 'philosophicalViews', label: 'schema.character.fields.philosophicalViews', type: 'text', tab: 'characteristics', section: 'worldview' },
			{ key: 'biggestFear',        label: 'schema.character.fields.biggestFear',        type: 'text', tab: 'characteristics', section: 'worldview' },
			{ key: 'selfControl',        label: 'schema.character.fields.selfControl',        type: 'text', tab: 'characteristics', section: 'worldview' },
			{ key: 'intelligenceLevel',  label: 'schema.character.fields.intelligenceLevel',  type: 'text', tab: 'characteristics', section: 'worldview' },
			{ key: 'confidenceLevel',    label: 'schema.character.fields.confidenceLevel',    type: 'text', tab: 'characteristics', section: 'worldview' },
			// ── Биография ─────────────────────────────────────────────────────
			{ key: 'childhood',          label: 'schema.character.fields.childhood',          type: 'text', tab: 'biography' },
			{ key: 'importantPastEvent', label: 'schema.character.fields.importantPastEvent', type: 'text', tab: 'biography' },
			{ key: 'bestAchievement',    label: 'schema.character.fields.bestAchievement',    type: 'text', tab: 'biography' },
			{ key: 'otherAchievements',  label: 'schema.character.fields.otherAchievements',  type: 'text', tab: 'biography' },
			{ key: 'worstMoment',        label: 'schema.character.fields.worstMoment',        type: 'text', tab: 'biography' },
			{ key: 'failures',           label: 'schema.character.fields.failures',           type: 'text', tab: 'biography' },
			{ key: 'secrets',            label: 'schema.character.fields.secrets',            type: 'text', tab: 'biography' },
			{ key: 'bestMemories',       label: 'schema.character.fields.bestMemories',       type: 'text', tab: 'biography' },
			{ key: 'worstMemories',      label: 'schema.character.fields.worstMemories',      type: 'text', tab: 'biography' },
			// ── Внешность ─────────────────────────────────────────────────────
			{ key: 'height',             label: 'schema.character.fields.height',             type: 'text', tab: 'appearance' },
			{ key: 'weight',             label: 'schema.character.fields.weight',             type: 'text', tab: 'appearance' },
			{ key: 'build',              label: 'schema.character.fields.build',              type: 'text', tab: 'appearance' },
			{ key: 'skinColor',          label: 'schema.character.fields.skinColor',          type: 'text', tab: 'appearance' },
			{ key: 'hairstyle',          label: 'schema.character.fields.hairstyle',          type: 'text', tab: 'appearance' },
			{ key: 'hairColor',          label: 'schema.character.fields.hairColor',          type: 'text', tab: 'appearance' },
			{ key: 'eyeShape',           label: 'schema.character.fields.eyeShape',           type: 'text', tab: 'appearance' },
			{ key: 'eyeColor',           label: 'schema.character.fields.eyeColor',           type: 'text', tab: 'appearance' },
			{ key: 'faceShape',          label: 'schema.character.fields.faceShape',          type: 'text', tab: 'appearance' },
			{ key: 'distinctiveFeatures',label: 'schema.character.fields.distinctiveFeatures',type: 'text', tab: 'appearance' },
			{ key: 'otherFaceFeatures',  label: 'schema.character.fields.otherFaceFeatures',  type: 'text', tab: 'appearance' },
			{ key: 'posture',            label: 'schema.character.fields.posture',            type: 'text', tab: 'appearance' },
			{ key: 'otherAppearance',    label: 'schema.character.fields.otherAppearance',    type: 'text', tab: 'appearance' },
			{ key: 'ethnicity',          label: 'schema.character.fields.ethnicity',          type: 'text', tab: 'appearance' },
			{ key: 'clothing',           label: 'schema.character.fields.clothing',           type: 'text', tab: 'appearance' },
			{ key: 'accessories',        label: 'schema.character.fields.accessories',        type: 'text', tab: 'appearance' },
		],
		links: [
			{ key: 'project',     label: 'schema.character.links.project',     target: 'project',      single: true },
			{ key: 'works',       label: 'schema.character.links.works',       target: 'work' },
			{ key: 'arcs',        label: 'schema.character.links.arcs',        target: 'arc',           reverse: 'keyCharacters' },
			{ key: 'affiliation', label: 'schema.character.links.affiliation', target: 'categoryItem',  reverse: 'members' },
		],
	},

	category: {
		kind: 'category',
		label: 'schema.category.label',
		labelPlural: 'schema.category.labelPlural',
		icon: 'tag',
		folder: '',
		layer: 'world',
		titleField: 'Name',
		fields: [{ key: 'summary', label: 'schema.category.fields.summary', type: 'text' }],
		links: [{ key: 'project', label: 'schema.category.links.project', target: 'project', single: true }],
	},

	// Базовая схема элемента категории — поля/связи дополняются динамически.
	categoryItem: {
		kind: 'categoryItem',
		label: 'schema.categoryItem.label',
		labelPlural: 'schema.categoryItem.labelPlural',
		icon: 'circle-dot',
		folder: '',
		layer: 'world',
		titleField: 'Name',
		fields: [],
		links: [{ key: 'works', label: 'schema.categoryItem.links.works', target: 'work' }],
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
		icon: 'building-2',
		preset: 'organization',
		fields: [
			{
				key: 'type',
				label: 'schema.categoryPreset.organization.type',
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
			{ key: 'summary', label: 'schema.categoryPreset.organization.summary', type: 'text' },
		],
		linkDefs: [
			{ key: 'leader', label: 'schema.categoryPreset.organization.linkDefs.leader', target: 'character', single: true },
			{ key: 'members', label: 'schema.categoryPreset.organization.linkDefs.members', target: 'character', reverse: 'affiliation' },
		],
	},
	location: {
		icon: 'map-pin',
		preset: 'location',
		fields: [
			{
				key: 'type',
				label: 'schema.categoryPreset.location.type',
				type: 'select',
				options: [
					{ value: 'Локация', color: '#f5a623' },
					{ value: 'Город', color: '#e67e22' },
					{ value: 'Район', color: '#e84393' },
					{ value: 'Неизвестно', color: '#7ed321' },
				],
			},
			{ key: 'country', label: 'schema.categoryPreset.location.country', type: 'text' },
			{ key: 'summary', label: 'schema.categoryPreset.location.summary', type: 'text' },
		],
		linkDefs: [],
	},
	language: {
		icon: 'languages',
		preset: 'language',
		fields: [
			{
				key: 'type',
				label: 'schema.categoryPreset.language.type',
				type: 'select',
				options: [
					{ value: 'Официальный', color: '#4a9eff' },
					{ value: 'Диалект', color: '#f5a623' },
					{ value: 'Мёртвый', color: '#888' },
					{ value: 'Созданный', color: '#9b59b6' },
				],
			},
			{ key: 'region', label: 'schema.categoryPreset.language.region', type: 'text' },
			{ key: 'summary', label: 'schema.categoryPreset.language.summary', type: 'text' },
		],
		linkDefs: [],
	},

	custom: {
		icon: 'shapes',
		preset: 'custom',
		fields: [{ key: 'summary', label: 'schema.categoryPreset.custom.summary', type: 'text' }],
		linkDefs: [],
	},
};

export const PRESET_LABELS: Record<CategoryPreset, string> = {
	organization: 'schema.preset.organization',
	location: 'schema.preset.location',
	language: 'schema.preset.language',
	custom: 'schema.preset.custom',
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
