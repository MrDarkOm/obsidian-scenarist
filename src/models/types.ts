// ============================================
//  Scenarist — core data model (0.3.0)
// ============================================

/** Все типы сущностей. */
export type EntityKind =
	| 'project' // Проект (верхний контейнер)
	| 'work' // Произведение (Серия/Ваншот)
	| 'book' // Книга
	| 'arc' // Арка
	| 'anchor' // Якорь (ключевое событие)
	| 'chapter' // Глава
	| 'page' // Страница
	| 'character' // Персонаж (на уровне проекта)
	| 'category' // Категория = определение типа (на уровне проекта)
	| 'categoryItem'; // Элемент категории (динамическая схема)

export type WorkFormat = 'series' | 'oneshot';
export type CategoryPreset = 'organization' | 'location' | 'language' | 'custom';

export type FieldType = 'select' | 'status' | 'multiselect' | 'number' | 'text' | 'checkbox' | 'date';

export interface FieldOption {
	value: string;
	color: string;
}

export interface FieldDef {
	key: string;
	label: string;
	type: FieldType;
	options?: FieldOption[];
	/** Нельзя оставить пустым — первый вариант выбирается по умолчанию. */
	required?: boolean;
	/** Группа вкладки (например 'basic', 'characteristics', 'biography', 'appearance'). */
	tab?: string;
	/** Подраздел внутри вкладки (ключ для перевода, например 'story', 'life'). */
	section?: string;
}

export interface LinkDef {
	key: string;
	label: string;
	target: EntityKind;
	single?: boolean;
	/** Ключ обратной связи на целевой сущности (реципрокность). */
	reverse?: string;
}

export interface EntitySchema {
	kind: EntityKind;
	label: string;
	labelPlural: string;
	icon: string;
	folder: string;
	layer: 'project' | 'text' | 'world';
	titleField: string;
	fields: FieldDef[];
	links: LinkDef[];
}

/** Динамическая схема, хранимая прямо на сущности-категории. */
export interface CategorySchemaDef {
	icon: string;
	preset: CategoryPreset;
	fields: FieldDef[];
	linkDefs: LinkDef[];
}

/** Разрешённая (эффективная) схема сущности для рендера. */
export interface ResolvedSchema {
	icon: string;
	label: string;
	fields: FieldDef[];
	links: LinkDef[];
}

export interface Entity {
	id: string;
	kind: EntityKind;
	name: string;
	filePath: string;
	props: Record<string, string | number | boolean | null>;
	links: Record<string, string[]>;
	/** Только для kind === 'category': определение её динамической схемы. */
	categorySchema?: CategorySchemaDef;
	createdAt: number;
	updatedAt: number;
}

export interface ScenaristIndex {
	version: number;
	activeProjectId: string | null;
	entities: Entity[];
}

export const INDEX_VERSION = 2;

/** Сентинел «Без проекта». */
export const NO_PROJECT = '__none__';

/** Минимальная проверка структуры перед импортом из .sc / frontmatter. */
export function isValidEntity(data: unknown): data is Entity {
	if (!data || typeof data !== 'object') return false;
	const d = data as Record<string, unknown>;
	return (
		typeof d.id === 'string' && d.id.length > 0 &&
		typeof d.kind === 'string' && d.kind.length > 0 &&
		typeof d.name === 'string' &&
		typeof d.props === 'object' && d.props !== null && !Array.isArray(d.props) &&
		typeof d.links === 'object' && d.links !== null && !Array.isArray(d.links)
	);
}
