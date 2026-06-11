import { TFile, normalizePath } from 'obsidian';
import { Entity } from '../models/types';
import { SCHEMAS } from '../models/schema';
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
		if (entity) this.store.setFilePath(entity.id, file.path);
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
