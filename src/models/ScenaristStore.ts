import { nanoid } from 'nanoid';
import { CategoryPreset, Entity, EntityKind, NO_PROJECT, ScenaristIndex, INDEX_VERSION } from './types';
import { CATEGORY_PRESETS, findLinkDef, resolveSchema, SCHEMAS } from './schema';
import type ScenaristPlugin from '../main';

/**
 * Путь к индексу — хранится в папке плагина (.obsidian/plugins/…),
 * а НЕ в корне vault. Пользователь его не видит и не трогает.
 */
const INDEX_PATH = '.obsidian/plugins/obsidian-scenarist/scenarist-index.json';

/**
 * Старый путь (до рефакторинга). При первом load() мигрируется автоматически.
 */
const LEGACY_INDEX_PATH = '.scenarist/index.json';

/**
 * Граф всех сущностей. Источник истины для панелей.
 * Персистируется в INDEX_PATH.
 *
 * Содержит вторичные индексы для O(1)-доступа по kind и path.
 */
export class ScenaristStore {
	private plugin: ScenaristPlugin;
	private entities: Map<string, Entity> = new Map();
	private activeProjectId: string | null = NO_PROJECT;
	private listeners: Array<() => void> = [];
	private saveTimer: number | null = null;

	// ---- Вторичные индексы ----
	/** kind → Set<id> */
	private byKindIndex: Map<EntityKind, Set<string>> = new Map();
	/** filePath → id */
	private byPathIndex: Map<string, string> = new Map();

	constructor(plugin: ScenaristPlugin) {
		this.plugin = plugin;
	}

	// ---- подписки ----
	onChange(fn: () => void): () => void {
		this.listeners.push(fn);
		return () => {
			this.listeners = this.listeners.filter((l) => l !== fn);
		};
	}
	private notify() {
		this.listeners.forEach((fn) => fn());
	}

	// ---- доступ ----
	get(id: string): Entity | null {
		return this.entities.get(id) || null;
	}
	all(): Entity[] {
		return Array.from(this.entities.values());
	}

	/** O(1) — использует вторичный индекс. */
	byKind(kind: EntityKind): Entity[] {
		const ids = this.byKindIndex.get(kind);
		if (!ids) return [];
		const result: Entity[] = [];
		for (const id of ids) {
			const e = this.entities.get(id);
			if (e) result.push(e);
		}
		return result;
	}

	/** O(1) — использует вторичный индекс. */
	findByPath(path: string): Entity | null {
		const id = this.byPathIndex.get(path);
		return id ? (this.entities.get(id) ?? null) : null;
	}

	// ---- проекты ----
	getProjects(): Entity[] {
		return this.byKind('project');
	}
	getActiveProjectId(): string {
		return this.activeProjectId || NO_PROJECT;
	}
	getActiveProject(): Entity | null {
		const id = this.getActiveProjectId();
		return id === NO_PROJECT ? null : this.entities.get(id) || null;
	}
	setActiveProject(id: string) {
		this.activeProjectId = id;
		this.scheduleSave();
		this.notify();
	}
	/** Принадлежит ли сущность активному проекту (по связи project). */
	inActiveProject(e: Entity): boolean {
		const pid = this.getActiveProjectId();
		const linked = e.links['project'] || [];
		if (pid === NO_PROJECT) return linked.length === 0;
		return linked.includes(pid);
	}
	/** Project-level сущности (work/character/category) активного проекта. */
	byKindForProject(kind: EntityKind): Entity[] {
		return this.byKind(kind).filter((e) => this.inActiveProject(e));
	}

	// ---- категории ----
	categoryItems(categoryId: string): Entity[] {
		return this.byKind('categoryItem').filter((e) => (e.links['category'] || []).includes(categoryId));
	}

	// ---- мутации ----
	create(kind: EntityKind, name: string): Entity {
		const entity: Entity = {
			id: this.generateId(),
			kind,
			name,
			filePath: '',
			props: {},
			links: {},
			createdAt: Date.now(),
			updatedAt: Date.now(),
		};
		this.entities.set(entity.id, entity);
		this.indexAdd(entity);
		this.attachToActiveProject(entity);
		this.scheduleSave();
		this.notify();
		return entity;
	}

	createProject(name: string): Entity {
		const p: Entity = {
			id: this.generateId(),
			kind: 'project',
			name,
			filePath: '',
			props: {},
			links: {},
			createdAt: Date.now(),
			updatedAt: Date.now(),
		};
		this.entities.set(p.id, p);
		this.indexAdd(p);
		this.activeProjectId = p.id;
		this.scheduleSave();
		this.notify();
		return p;
	}

	createCategory(preset: CategoryPreset, name: string): Entity {
		const def = CATEGORY_PRESETS[preset];
		const cat = this.create('category', name);
		cat.categorySchema = {
			icon: def.icon,
			preset: def.preset,
			fields: def.fields.map((f) => ({ ...f })),
			linkDefs: def.linkDefs.map((l) => ({ ...l })),
		};
		this.scheduleSave();
		this.notify();
		return cat;
	}

	createItem(categoryId: string, name: string): Entity {
		const item = this.create('categoryItem', name);
		this.setLink(item.id, 'category', [categoryId]);
		return item;
	}

	/** Привязать project-level сущность к активному проекту. */
	private attachToActiveProject(e: Entity) {
		const projectScoped: EntityKind[] = ['work', 'character', 'category', 'categoryItem'];
		if (!projectScoped.includes(e.kind)) return;
		const pid = this.getActiveProjectId();
		if (pid !== NO_PROJECT) e.links['project'] = [pid];
	}

	rename(id: string, name: string) {
		const e = this.entities.get(id);
		if (!e) return;
		e.name = name;
		e.updatedAt = Date.now();
		this.scheduleSave();
		this.notify();
	}

	setProp(id: string, key: string, value: string | number | boolean | null) {
		const e = this.entities.get(id);
		if (!e) return;
		e.props[key] = value;
		e.updatedAt = Date.now();
		this.scheduleSave();
		this.notify();
	}

	setFilePath(id: string, filePath: string) {
		const e = this.entities.get(id);
		if (!e) return;
		// Обновляем path-индекс
		if (e.filePath) this.byPathIndex.delete(e.filePath);
		e.filePath = filePath;
		if (filePath) this.byPathIndex.set(filePath, id);
		this.scheduleSave();
	}

	/** Установить связь с поддержкой реципрокности (LinkDef.reverse). */
	setLink(id: string, key: string, targetIds: string[]) {
		const e = this.entities.get(id);
		if (!e) return;
		const prev = e.links[key] || [];
		const removed = prev.filter((t) => !targetIds.includes(t));
		const added = targetIds.filter((t) => !prev.includes(t));

		e.links[key] = [...targetIds];
		e.updatedAt = Date.now();

		const def = findLinkDef(e, key, this);
		const reverse = def?.reverse;
		if (reverse) {
			for (const tid of added) this.addReverse(tid, reverse, id);
			for (const tid of removed) this.removeReverse(tid, reverse, id);
		}
		this.scheduleSave();
		this.notify();
	}

	private addReverse(id: string, key: string, value: string) {
		const e = this.entities.get(id);
		if (!e) return;
		const cur = new Set(e.links[key] || []);
		cur.add(value);
		e.links[key] = Array.from(cur);
		e.updatedAt = Date.now();
	}
	private removeReverse(id: string, key: string, value: string) {
		const e = this.entities.get(id);
		if (!e) return;
		e.links[key] = (e.links[key] || []).filter((v) => v !== value);
		e.updatedAt = Date.now();
	}

	delete(id: string) {
		const e = this.entities.get(id);
		if (!e) return;

		// удалить элементы категории вместе с ней
		if (e.kind === 'category') {
			for (const item of this.categoryItems(id)) this.delete(item.id);
		}

		// снять реципрокные связи
		for (const key of Object.keys(e.links)) {
			const def = findLinkDef(e, key, this);
			if (def?.reverse) {
				for (const tid of e.links[key]) this.removeReverse(tid, def.reverse, id);
			}
		}
		// почистить любые упоминания
		for (const other of this.entities.values()) {
			for (const key of Object.keys(other.links)) {
				if (other.links[key].includes(id)) {
					other.links[key] = other.links[key].filter((v) => v !== id);
				}
			}
		}

		this.indexRemove(e);
		this.entities.delete(id);
		if (this.activeProjectId === id) this.activeProjectId = NO_PROJECT;
		this.scheduleSave();
		this.notify();
	}

	/**
	 * Вставить сущность с уже известным ID (восстановление из frontmatter).
	 * Не привязывает к активному проекту — данные берутся как есть.
	 */
	importEntity(entity: Entity): void {
		if (this.entities.has(entity.id)) return;
		this.entities.set(entity.id, entity);
		this.indexAdd(entity);
		this.scheduleSave();
		this.notify();
	}

	schema(kind: EntityKind) {
		return SCHEMAS[kind];
	}
	resolved(entity: Entity) {
		return resolveSchema(entity, this);
	}

	// ---- вторичные индексы ----

	private indexAdd(e: Entity) {
		let set = this.byKindIndex.get(e.kind);
		if (!set) {
			set = new Set();
			this.byKindIndex.set(e.kind, set);
		}
		set.add(e.id);
		if (e.filePath) this.byPathIndex.set(e.filePath, e.id);
	}

	private indexRemove(e: Entity) {
		this.byKindIndex.get(e.kind)?.delete(e.id);
		if (e.filePath) this.byPathIndex.delete(e.filePath);
	}

	private rebuildIndexes() {
		this.byKindIndex.clear();
		this.byPathIndex.clear();
		for (const e of this.entities.values()) {
			this.indexAdd(e);
		}
	}

	// ---- персистентность ----
	async load() {
		try {
			const adapter = this.plugin.app.vault.adapter;
			let raw: string | null = null;

			// Попытка загрузить из нового пути
			try {
				raw = await adapter.read(INDEX_PATH);
			} catch {
				// Не нашли — пробуем легаси-путь (миграция)
				try {
					raw = await adapter.read(LEGACY_INDEX_PATH);
					console.log('Scenarist: мигрируем index.json из .scenarist/ в папку плагина');
				} catch {
					// Первый запуск — файла нет ни там ни там
				}
			}

			if (raw) {
				const data = JSON.parse(raw) as ScenaristIndex;
				this.entities.clear();
				(data.entities || []).forEach((e) => {
					e.props = e.props || {};
					e.links = e.links || {};
					this.entities.set(e.id, e);
				});
				this.activeProjectId = data.activeProjectId || NO_PROJECT;
				this.migrateCategoryIcons();
			}

			this.rebuildIndexes();

			// Если мигрировали — сразу сохраняем в новое место
			if (raw) await this.save();
		} catch (err) {
			console.error('Scenarist: ошибка загрузки индекса', err);
		}
		this.notify();
	}

	/** Мигрирует старые emoji-иконки в categorySchema.icon → Lucide-имена. */
	private migrateCategoryIcons() {
		const emojiMap: Record<string, string> = {
			'♛': 'building-2',
			'📍': 'map-pin',
			'🌐': 'languages',
			'⬡': 'shapes',
			'🗂': 'tag',
		};
		let changed = false;
		for (const entity of this.entities.values()) {
			if (entity.kind === 'category' && entity.categorySchema) {
				const mapped = emojiMap[entity.categorySchema.icon];
				if (mapped) {
					entity.categorySchema.icon = mapped;
					changed = true;
				}
			}
		}
		if (changed) this.scheduleSave();
	}

	private scheduleSave() {
		if (this.saveTimer !== null) window.clearTimeout(this.saveTimer);
		this.saveTimer = window.setTimeout(() => this.save(), 400);
	}

	async save() {
		const index: ScenaristIndex = {
			version: INDEX_VERSION,
			activeProjectId: this.activeProjectId,
			entities: this.all(),
		};
		const adapter = this.plugin.app.vault.adapter;
		try {
			const dir = INDEX_PATH.split('/').slice(0, -1).join('/');
			if (!(await adapter.exists(dir))) await adapter.mkdir(dir);
			await adapter.write(INDEX_PATH, JSON.stringify(index, null, 2));

			// Записать sidecar-файлы рядом с .md
			for (const entity of this.entities.values()) {
				if (entity.filePath) {
					try {
						await adapter.write(this.sidecarPath(entity.filePath), JSON.stringify(entity, null, 2));
					} catch {
						// файл .md ещё не создан — пропускаем
					}
				}
			}
		} catch (e) {
			console.error('Scenarist: не удалось сохранить индекс', e);
		}
	}

	/** Путь к sidecar-файлу рядом с .md заметкой. */
	sidecarPath(filePath: string): string {
		return filePath.replace(/\.md$/, '.scenarist.json');
	}

	/** Прочитать sidecar-файл и вернуть Entity, или null если его нет. */
	async readSidecar(filePath: string): Promise<Entity | null> {
		try {
			const raw = await this.plugin.app.vault.adapter.read(this.sidecarPath(filePath));
			return JSON.parse(raw) as Entity;
		} catch {
			return null;
		}
	}

	// ---- утилиты ----
	private generateId(): string {
		return nanoid(12);
	}
}
