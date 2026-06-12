import { TFile, normalizePath } from 'obsidian';
import { Entity, EntityKind } from '../models/types';
import { KINDS, SCHEMAS } from '../models/schema';
import { bodyTemplate } from '../templates';
import type ScenaristPlugin from '../main';

/**
 * Связывает граф (ScenaristStore) с .md-заметками.
 *
 * Запись frontmatter — через официальный Obsidian API `processFrontMatter`,
 * который гарантирует атомарность и не повреждает пользовательский контент.
 */
export class SyncEngine {
	private plugin: ScenaristPlugin;
	/**
	 * Пути файлов, куда плагин сам только что записал через processFrontMatter.
	 * Используется для подавления ложных срабатываний handleModify.
	 */
	private selfWrites: Set<string> = new Set();

	constructor(plugin: ScenaristPlugin) {
		this.plugin = plugin;
	}

	private get store() {
		return this.plugin.store;
	}
	private get vault() {
		return this.plugin.app.vault;
	}

	// ---- обход графа вверх ----
	private single(ids?: string[]): Entity | null {
		if (!ids || ids.length === 0) return null;
		return this.store.get(ids[0]);
	}
	private ownerWork(e: Entity): Entity | null {
		switch (e.kind) {
			case 'work':
				return e;
			case 'book':
			case 'arc':
			case 'anchor':
				return this.single(e.links['work']);
			case 'chapter': {
				const b = this.single(e.links['book']);
				return b ? this.single(b.links['work']) : null;
			}
			case 'page': {
				const c = this.single(e.links['chapter']);
				const b = c ? this.single(c.links['book']) : null;
				return b ? this.single(b.links['work']) : null;
			}
			default:
				return null;
		}
	}
	private ownerProjectName(e: Entity): string {
		let pid: string | null = null;
		if (e.kind === 'project') pid = e.id;
		else if ((e.links['project'] || []).length) pid = e.links['project'][0];
		else {
			const w = this.ownerWork(e);
			pid = w ? (w.links['project'] || [])[0] || null : null;
		}
		const p = pid ? this.store.get(pid) : null;
		return p ? this.safe(p.name) : '_Без проекта';
	}

	private safe(name: string): string {
		return name.replace(/[\\/:*?"<>|]/g, '-').trim() || 'Без имени';
	}

	/** Путь к заметке сущности. */
	buildPath(entity: Entity): string {
		const root = this.plugin.settings.rootFolder || 'Scenarist';
		const proj = this.ownerProjectName(entity);
		const projFolder = `${root}/${proj}`;
		const name = this.safe(entity.name);

		switch (entity.kind) {
			case 'project':
				return normalizePath(`${projFolder}/${name}.md`);
			case 'work':
				return normalizePath(`${projFolder}/${name}/${name}.md`);
			case 'character':
				return normalizePath(`${projFolder}/Персонажи/${name}.md`);
			case 'category':
				return normalizePath(`${projFolder}/${name}/${name}.md`);
			case 'categoryItem': {
				const cat = this.single(entity.links['category']);
				const catName = cat ? this.safe(cat.name) : 'Категория';
				return normalizePath(`${projFolder}/${catName}/${name}.md`);
			}
			default: {
				// book / arc / anchor / chapter / page
				const work = this.ownerWork(entity);
				const workName = work ? this.safe(work.name) : '_Без произведения';
				const folder = SCHEMAS[entity.kind].folder;
				return normalizePath(`${projFolder}/${workName}/${folder}/${name}.md`);
			}
		}
	}

	async ensureNote(entity: Entity): Promise<TFile | null> {
		const path = this.buildPath(entity);
		this.store.setFilePath(entity.id, path);

		let file = this.vault.getAbstractFileByPath(path);
		if (!file) {
			await this.ensureFolder(path);
			// Создаём файл с телом (без frontmatter — добавим через processFrontMatter)
			const body = bodyTemplate(entity.kind, entity.name);
			file = await this.vault.create(path, body);
		}

		// Синхронизируем frontmatter через официальный API
		if (file instanceof TFile) {
			await this.syncToNote(entity, file);
		}

		return file instanceof TFile ? file : null;
	}

	/**
	 * Синхронизирует frontmatter заметки с данными сущности.
	 * Использует `processFrontMatter` — атомарная операция, не трогает тело файла.
	 */
	async syncToNote(entity: Entity, fileArg?: TFile): Promise<void> {
		const file =
			fileArg ?? (entity.filePath ? (this.vault.getAbstractFileByPath(entity.filePath) as TFile | null) : null);
		if (!(file instanceof TFile)) return;

		this.selfWrites.add(file.path);

		await this.plugin.app.fileManager.processFrontMatter(file, (fm) => {
			fm['scenarist_id'] = entity.id;
			fm['kind'] = entity.kind;

			const schema = this.store.resolved(entity);

			// Поля-свойства
			for (const field of schema.fields) {
				const v = entity.props[field.key];
				if (v === undefined || v === null || v === '') {
					delete fm[field.key];
				} else {
					fm[field.key] = v;
				}
			}

			// Связи — записываем как wikilinks, пропуская служебный ключ 'project'
			for (const link of schema.links) {
				if (link.target === 'project') continue;
				const ids = entity.links[link.key] || [];
				const names = ids
					.map((id) => this.store.get(id))
					.filter((e): e is Entity => !!e)
					.map((e) => `[[${e.name}]]`);
				if (names.length) {
					fm[link.key] = names;
				} else {
					delete fm[link.key];
				}
			}
		});
	}

	async openNote(entity: Entity): Promise<void> {
		const file = await this.ensureNote(entity);
		if (file) await this.plugin.app.workspace.getLeaf(false).openFile(file);
	}

	/**
	 * Удаляет сущность из Store и перемещает её .md-файл в корзину.
	 * Для категорий удаляет файлы всех дочерних элементов тоже.
	 */
	async deleteEntity(id: string): Promise<void> {
		const ids: string[] = [id];
		const entity = this.store.get(id);
		if (entity?.kind === 'category') {
			for (const item of this.store.categoryItems(id)) ids.push(item.id);
		}

		for (const eid of ids) {
			const e = this.store.get(eid);
			if (e?.filePath) {
				const file = this.vault.getAbstractFileByPath(e.filePath);
				if (file instanceof TFile) {
					await this.plugin.app.fileManager.trashFile(file);
				}
			}
		}

		this.store.delete(id);
	}

	/**
	 * Обрабатывает внешнее изменение .md файла.
	 * Читает frontmatter через MetadataCache и обновляет Store.
	 */
	handleModify(file: TFile): void {
		// Игнорируем записи, сделанные самим плагином
		if (this.selfWrites.has(file.path)) {
			this.selfWrites.delete(file.path);
			return;
		}
		const entity = this.store.findByPath(file.path);
		if (!entity) return;

		const fm = this.plugin.app.metadataCache.getFileCache(file)?.frontmatter;
		if (!fm) return;

		const fields = this.store.resolved(entity).fields;
		let changed = false;
		for (const field of fields) {
			if (field.key in fm && entity.props[field.key] !== fm[field.key]) {
				entity.props[field.key] = fm[field.key] ?? null;
				changed = true;
			}
		}
		if (changed) void this.store.save();
	}

	handleRename(file: TFile, oldPath: string): void {
		const entity = this.store.findByPath(oldPath);
		if (!entity) return;

		// Переименовать sidecar JSON вместе с .md
		const oldSidecar = this.store.sidecarPath(oldPath);
		const newSidecar = this.store.sidecarPath(file.path);
		if (oldSidecar !== newSidecar) {
			const sf = this.vault.getAbstractFileByPath(oldSidecar);
			if (sf instanceof TFile) void this.vault.rename(sf, newSidecar);
		}

		this.store.setFilePath(entity.id, file.path);
		this.syncProjectLink(entity, file.path);
		this.plugin.refreshViews();
	}

	/**
	 * Вызывается при создании файла в vault (например, скопирован снаружи).
	 * MetadataCache может ещё не проиндексировать файл, поэтому откладываем на 600 мс.
	 */
	handleCreate(file: TFile): void {
		window.setTimeout(() => void this.processCreatedFile(file), 600);
	}

	/**
	 * Сканирует все .md-файлы vault:
	 * - обновляет filePath для сущностей, у которых путь устарел;
	 * - исправляет project-ссылку по расположению файла;
	 * - восстанавливает сущности из sidecar .sc (приоритет над frontmatter).
	 */
	async rescanVault(): Promise<void> {
		const { metadataCache } = this.plugin.app;
		const files = this.vault.getMarkdownFiles();
		let changed = false;

		for (const file of files) {
			// Приоритет: sidecar JSON > frontmatter
			const sidecar = await this.store.readSidecar(file.path);
			const fm = metadataCache.getFileCache(file)?.frontmatter;

			const id = sidecar?.id ?? (fm?.scenarist_id ? String(fm.scenarist_id) : null);
			if (!id) continue;

			const existing = this.store.get(id);

			if (existing) {
				if (existing.filePath !== file.path) {
					this.store.setFilePath(id, file.path);
					changed = true;
				}
				if (this.syncProjectLink(existing, file.path)) changed = true;
			} else if (sidecar) {
				// Полные данные из sidecar — включая links.project
				sidecar.filePath = file.path;
				this.store.importEntity(sidecar);
				changed = true;
			} else if (fm?.kind) {
				// Fallback: реконструкция из frontmatter
				this.importEntityFromFm(file, fm as Record<string, unknown>);
				changed = true;
			}
		}

		if (changed) {
			void this.store.save();
			this.plugin.refreshViews();
		}
	}

	// ---- private helpers ----

	/**
	 * По пути файла определяет проект (root/ProjectFolder/...) и
	 * обновляет project-ссылку у project-scoped сущностей если она отличается.
	 * Возвращает true если ссылка была изменена.
	 */
	private syncProjectLink(entity: Entity, filePath: string): boolean {
		const projectScoped: EntityKind[] = ['work', 'character', 'category', 'categoryItem'];
		if (!projectScoped.includes(entity.kind)) return false;

		const project = this.inferProjectFromPath(filePath);
		if (!project) return false;

		const currentPid = (entity.links['project'] || [])[0];
		if (currentPid === project.id) return false;

		entity.links['project'] = [project.id];
		entity.updatedAt = Date.now();
		return true;
	}

	/**
	 * Определяет проект по пути файла: root/{ProjectFolder}/...
	 * Ищет project-сущность, чьё safe(name) совпадает с именем папки.
	 */
	private inferProjectFromPath(filePath: string): Entity | null {
		const root = normalizePath(this.plugin.settings.rootFolder || 'Scenarist');
		const parts = filePath.split('/');
		// Минимум: root/project/file.md
		if (parts.length < 3) return null;
		if (parts[0] !== root) return null;
		const projFolder = parts[1];
		return (
			this.store.byKind('project').find(
				(p) => this.safe(p.name) === projFolder || p.name === projFolder
			) || null
		);
	}

	private async processCreatedFile(file: TFile): Promise<void> {
		const sidecar = await this.store.readSidecar(file.path);
		const fm = this.plugin.app.metadataCache.getFileCache(file)?.frontmatter;

		const id = sidecar?.id ?? (fm?.scenarist_id ? String(fm.scenarist_id) : null);
		if (!id) return;

		const existing = this.store.get(id);

		if (existing) {
			let changed = false;
			if (existing.filePath !== file.path) {
				this.store.setFilePath(id, file.path);
				changed = true;
			}
			if (this.syncProjectLink(existing, file.path)) changed = true;
			if (changed) {
				void this.store.save();
				this.plugin.refreshViews();
			}
		} else if (sidecar) {
			sidecar.filePath = file.path;
			this.store.importEntity(sidecar);
			this.plugin.refreshViews();
		} else if (fm?.kind) {
			this.importEntityFromFm(file, fm as Record<string, unknown>);
			this.plugin.refreshViews();
		}
	}

	/**
	 * Восстанавливает сущность из frontmatter файла и добавляет её в Store.
	 * Поля восстанавливаются; project-ссылка выводится из пути файла.
	 */
	private importEntityFromFm(file: TFile, fm: Record<string, unknown>): void {
		const kind = fm.kind as EntityKind;
		if (!KINDS.includes(kind)) return;

		const id = String(fm.scenarist_id);
		const schema = SCHEMAS[kind];

		const props: Record<string, string | number | boolean | null> = {};
		for (const field of schema.fields) {
			const v = fm[field.key];
			if (v !== undefined && v !== null) {
				props[field.key] = v as string | number | boolean | null;
			}
		}

		const links: Record<string, string[]> = {};
		const project = this.inferProjectFromPath(file.path);
		const projectScoped: EntityKind[] = ['work', 'character', 'category', 'categoryItem'];
		if (project && projectScoped.includes(kind)) {
			links['project'] = [project.id];
		}

		const entity: Entity = {
			id,
			kind,
			name: file.basename,
			filePath: file.path,
			props,
			links,
			createdAt: Date.now(),
			updatedAt: Date.now(),
		};

		this.store.importEntity(entity);
	}

	// ---- helpers ----
	private async ensureFolder(filePath: string): Promise<void> {
		const dir = filePath.split('/').slice(0, -1).join('/');
		if (!dir) return;
		let cur = '';
		for (const part of dir.split('/')) {
			cur = cur ? `${cur}/${part}` : part;
			if (!(await this.vault.adapter.exists(cur))) {
				try {
					await this.vault.createFolder(cur);
				} catch {
					/* уже есть */
				}
			}
		}
	}
}
