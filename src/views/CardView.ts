import { ItemView, WorkspaceLeaf, MarkdownRenderer, TFile, setIcon } from 'obsidian';
import { Entity, EntityKind } from '../models/types';
import { CreateEntityModal } from '../modals/CreateEntityModal';
import type ScenaristPlugin from '../main';

export const CARD_VIEW = 'scenarist-card';

const BACKLINK_LABELS: Record<string, string> = {
	chapters: 'Появляется в главах',
	pages: 'Появляется на страницах',
	members: 'Участники',
	arcs: 'Арки',
	books: 'Книги',
	anchors: 'Якоря',
	works: 'Произведения',
};

/** Скрытые из секции «Связи» структурные ключи. */
const STRUCTURAL = new Set(['project', 'category']);

/** Текстовые поля которые рендерятся большими (3+ строки). */
const LONG_FIELDS = new Set([
	'summary', 'synopsis', 'description', 'idea', 'goal',
]);

export class CardView extends ItemView {
	private plugin: ScenaristPlugin;
	private unsub: Array<() => void> = [];
	private _rendering = false;
	private _renderPending = false;

	constructor(leaf: WorkspaceLeaf, plugin: ScenaristPlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType() { return CARD_VIEW; }
	getDisplayText() { return this.current()?.name || 'Scenarist'; }
	getIcon() { return 'film'; }

	async onOpen() {
		this.unsub.push(this.plugin.store.onChange(() => this.scheduleRender()));
		this.unsub.push(this.plugin.onSelect(() => this.scheduleRender()));
		this.render();
	}
	async onClose() { this.unsub.forEach((u) => u()); }

	/** Debounced re-entrant-safe render scheduler. */
	private scheduleRender() {
		if (this._rendering) {
			this._renderPending = true;
			return;
		}
		this.render();
	}

	private current(): Entity | null {
		const id = this.plugin.selectedId;
		return id ? this.plugin.store.get(id) : null;
	}
	private single(ids?: string[]): Entity | null {
		if (!ids || !ids.length) return null;
		return this.plugin.store.get(ids[0]);
	}

	// ── Render Lucide icon or emoji into element ─────────────────────────────
	private renderIconInto(el: HTMLElement, iconStr: string) {
		if ([...iconStr].length <= 2) {
			el.textContent = iconStr; // emoji fallback
		} else {
			setIcon(el, iconStr);
		}
	}

	private async render() {
		if (this._rendering) { this._renderPending = true; return; }
		this._rendering = true;
		try {
		const root = this.containerEl.children[1] as HTMLElement;
		root.empty();
		root.addClass('scenarist-card-view');

		const entity = this.current();
		if (!entity) {
			const empty = root.createDiv('scenarist-empty');
			const iconBox = empty.createDiv('scenarist-empty-icon');
			setIcon(iconBox, 'layers');
			empty.createEl('p', { text: 'Выберите элемент в навигаторе' });
			empty.createEl('p', { cls: 'scenarist-empty-hint', text: 'Нажмите на произведение, персонажа или главу слева' });
			return;
		}

		const card = root.createDiv('scenarist-card');
		this.renderHeader(card, entity);
		this.renderProps(card, entity);
		if (entity.kind === 'category') this.renderCategoryItems(card, entity);
		this.renderRelations(card, entity);
		await this.renderBody(card, entity);
		} finally {
			this._rendering = false;
			if (this._renderPending) {
				this._renderPending = false;
				setTimeout(() => this.render(), 0);
			}
		}
	}

	// ---- шапка + крошки ----
	private parentOf(e: Entity): Entity | null {
		switch (e.kind) {
			case 'page':      return this.single(e.links['chapter']);
			case 'chapter':   return this.single(e.links['book']);
			case 'book':
			case 'arc':
			case 'anchor':    return this.single(e.links['work']);
			case 'categoryItem': return this.single(e.links['category']);
			case 'work':
			case 'character':
			case 'category':  return this.single(e.links['project']);
			default:          return null;
		}
	}

	private renderHeader(card: HTMLElement, entity: Entity) {
		const schema = this.plugin.store.resolved(entity);

		const top = card.createDiv('scenarist-card-top');
		if (this.plugin.canGoBack()) {
			const back = top.createEl('button', { cls: 'scenarist-card-back', attr: { title: 'Назад' } });
			setIcon(back, 'arrow-left');
			back.onclick = () => this.plugin.back();
		}

		// Хлебные крошки
		const crumbs: Entity[] = [];
		let p = this.parentOf(entity);
		let guard = 0;
		while (p && guard++ < 8) {
			crumbs.unshift(p);
			p = this.parentOf(p);
		}
		const trail = top.createDiv('scenarist-crumbs');
		crumbs.forEach((cr) => {
			const crSchema = this.plugin.store.resolved(cr);
			const a = trail.createEl('span', { cls: 'scenarist-crumb' });
			const iconSpan = a.createEl('span', { cls: 'scenarist-crumb-icon' });
			this.renderIconInto(iconSpan, crSchema.icon);
			a.createEl('span', { text: cr.name });
			a.onclick = () => this.plugin.navigateTo(cr.id);
			trail.createEl('span', { cls: 'scenarist-crumb-sep', text: '/' });
		});
		trail.createEl('span', { cls: 'scenarist-crumb current', text: schema.label });

		const spacer = top.createDiv();
		spacer.style.flex = '1';

		const openBtn = top.createEl('button', { cls: 'scenarist-card-note-btn', attr: { title: 'Открыть заметку' } });
		setIcon(openBtn, 'external-link');
		openBtn.createEl('span', { text: 'Заметка' });
		openBtn.onclick = () => this.plugin.sync.openNote(entity);

		// Заголовок (иконка-бокс + название)
		const titleRow = card.createDiv('scenarist-card-titlerow');
		const iconBox = titleRow.createEl('span', { cls: 'scenarist-card-icon' });
		this.renderIconInto(iconBox, schema.icon);

		const title = titleRow.createEl('input', { cls: 'scenarist-card-title' });
		title.value = entity.name;
		title.placeholder = 'Без названия';
		title.onchange = () => {
			const v = title.value.trim();
			if (v && v !== entity.name) {
				this.plugin.store.rename(entity.id, v);
				this.plugin.sync.syncToNote(this.plugin.store.get(entity.id)!);
			}
		};

		// Теги
		this.renderTagsHeader(card, entity);
	}

	/** Строка тегов под заголовком. */
	private renderTagsHeader(card: HTMLElement, entity: Entity) {
		const rawTags = entity.props['tags'];
		const tags = rawTags
			? String(rawTags).split(',').map((t) => t.trim()).filter(Boolean)
			: [];

		const row = card.createDiv('scenarist-card-tags');

		for (const tag of tags) {
			const chip = row.createEl('span', { cls: 'scenarist-tag-chip' });
			const text = chip.createEl('span', { cls: 'scenarist-tag-chip-text', text: '#' + tag });
			text.title = `Найти #${tag} в vault`;
			text.onclick = (e) => {
				e.stopPropagation();
				this.openTagSearch(tag);
			};
			const x = chip.createEl('span', { cls: 'scenarist-tag-chip-x', text: '×' });
			x.title = 'Удалить тег';
			x.onclick = (e) => {
				e.stopPropagation();
				const next = tags.filter((t) => t !== tag);
				this.commitProp(entity, 'tags', next.length ? next.join(', ') : null);
			};
		}

		const addBtn = row.createEl('button', { cls: 'scenarist-tag-add', text: '+ тег' });
		addBtn.onclick = () => {
			addBtn.style.display = 'none';
			const inp = row.createEl('input', { cls: 'scenarist-tag-input' });
			inp.placeholder = 'тег…';
			inp.focus();
			const commit = () => {
				const val = inp.value.trim().replace(/^#/, '');
				if (val && !tags.includes(val)) {
					this.commitProp(entity, 'tags', [...tags, val].join(', '));
				}
			};
			inp.addEventListener('keydown', (e) => {
				if (e.key === 'Enter') { commit(); }
				if (e.key === 'Escape') { inp.remove(); addBtn.style.display = ''; }
			});
			inp.addEventListener('blur', commit);
		};
	}

	// ---- свойства ----
	private renderProps(card: HTMLElement, entity: Entity) {
		const fields = this.plugin.store.resolved(entity).fields;
		const section = card.createDiv('scenarist-card-section');

		for (const field of fields) {
			const row = section.createDiv('scenarist-prop');
			row.createEl('div', { cls: 'scenarist-prop-label', text: field.label });
			const valWrap = row.createDiv('scenarist-prop-value');
			this.renderFieldControl(valWrap, entity, field);
		}

		this.renderBacklinksProp(section, entity);
	}

	/** Поле ссылок на заметки — чипы. */
	private renderBacklinksProp(section: HTMLElement, entity: Entity) {
		const rawVal = entity.props['backlinks'] ? String(entity.props['backlinks']) : '';
		const links: string[] = [];
		const re = /\[\[([^\]]+)\]\]/g;
		let m: RegExpExecArray | null;
		while ((m = re.exec(rawVal)) !== null) links.push(m[1]);

		const row = section.createDiv('scenarist-prop');
		row.createEl('div', { cls: 'scenarist-prop-label', text: 'Ссылки на заметки' });
		const valWrap = row.createDiv('scenarist-prop-value');
		const chipRow = valWrap.createDiv('scenarist-card-tags scenarist-link-chips');
		chipRow.style.margin = '0';

		const commitLinks = (newLinks: string[]) => {
			const val = newLinks.length ? newLinks.map((l) => `[[${l}]]`).join(', ') : null;
			this.commitProp(entity, 'backlinks', val);
		};

		for (const link of links) {
			const chip = chipRow.createEl('span', { cls: 'scenarist-link-chip' });
			const text = chip.createEl('span', { cls: 'scenarist-tag-chip-text', text: `[[${link}]]` });
			text.title = `Открыть: ${link}`;
			text.onclick = (e) => { e.stopPropagation(); this.openObsidianLink(link); };
			const x = chip.createEl('span', { cls: 'scenarist-tag-chip-x', text: '×' });
			x.onclick = (e) => { e.stopPropagation(); commitLinks(links.filter((l) => l !== link)); };
		}

		const addBtn = chipRow.createEl('button', { cls: 'scenarist-tag-add', text: '+ ссылка' });
		addBtn.onclick = () => {
			addBtn.style.display = 'none';
			const inp = chipRow.createEl('input', { cls: 'scenarist-tag-input' });
			inp.placeholder = 'Название заметки…';
			inp.style.width = '160px';
			inp.focus();
			const commit = () => {
				let val = inp.value.trim().replace(/^\[\[|\]\]$/g, '');
				if (val && !links.includes(val)) commitLinks([...links, val]);
			};
			inp.addEventListener('keydown', (e) => {
				if (e.key === 'Enter') commit();
				if (e.key === 'Escape') { inp.remove(); addBtn.style.display = ''; }
			});
			inp.addEventListener('blur', commit);
		};
	}

	/** Открыть wikilink через Obsidian. */
	private openObsidianLink(linkText: string) {
		this.app.workspace.openLinkText(linkText, '', false);
	}

	private renderFieldControl(wrap: HTMLElement, entity: Entity, field: { key: string; label: string; type: string; required?: boolean; options?: { value: string; color: string }[] }) {
		const val = entity.props[field.key];

		// ── Мульти-выбор (жанры) ────────────────────────────────────────────────
		if (field.type === 'multiselect') {
			const selected = val ? String(val).split(',').map((v) => v.trim()).filter(Boolean) : [];
			const settingsOpts: string[] = this.plugin.settings.genreOptions?.length
				? this.plugin.settings.genreOptions
				: (field.options || []).map((o) => o.value);
			const optMap = new Map((field.options || []).map((o) => [o.value, o.color]));

			const chipRow = wrap.createDiv('scenarist-card-tags scenarist-genre-chips');
			chipRow.style.margin = '0';

			const commitGenres = (next: string[]) =>
				this.commitProp(entity, field.key, next.length ? next.join(', ') : null);

			const renderChips = () => {
				chipRow.empty();
				for (const v of selected) {
					const color = optMap.get(v) || '#888';
					const chip = chipRow.createEl('span', { cls: 'scenarist-genre-chip' });
					chip.style.setProperty('--chip-color', color);
					chip.createEl('span', { text: v });
					const x = chip.createEl('span', { cls: 'scenarist-tag-chip-x', text: '×' });
					x.onclick = () => commitGenres(selected.filter((s) => s !== v));
				}
				const available = settingsOpts.filter((o) => !selected.includes(o));
				const sel = chipRow.createEl('select', { cls: 'scenarist-genre-add' });
				sel.createEl('option', { value: '', text: '＋ жанр…' });
				available.forEach((o) => sel.createEl('option', { value: o, text: o }));
				sel.createEl('option', { value: '__new__', text: '＋ Добавить свой…' });

				sel.onchange = async () => {
					if (!sel.value) return;
					if (sel.value === '__new__') {
						sel.style.display = 'none';
						const inp = chipRow.createEl('input', { cls: 'scenarist-tag-input' });
						inp.placeholder = 'Новый жанр…';
						inp.focus();
						const doAdd = async () => {
							const newG = inp.value.trim();
							if (newG) {
								if (!this.plugin.settings.genreOptions.includes(newG)) {
									this.plugin.settings.genreOptions.push(newG);
									await this.plugin.saveSettings();
								}
								if (!selected.includes(newG)) {
									selected.push(newG);
									optMap.set(newG, '#888');
									commitGenres(selected);
								}
							} else { sel.value = ''; sel.style.display = ''; renderChips(); }
						};
						inp.addEventListener('keydown', (e) => {
							if (e.key === 'Enter') { doAdd(); }
							if (e.key === 'Escape') { inp.remove(); sel.style.display = ''; sel.value = ''; }
						});
						inp.addEventListener('blur', doAdd);
					} else {
						selected.push(sel.value);
						commitGenres(selected);
					}
				};
			};
			renderChips();
			return;
		}

		// ── Select / Status — с цветной точкой ─────────────────────────────────
		if (field.type === 'select' || field.type === 'status') {
			const selWrap = wrap.createDiv('scenarist-select-wrap');
			const dot = selWrap.createDiv('scenarist-select-dot');
			const sel = selWrap.createEl('select', { cls: 'scenarist-prop-select' });

			if (!field.required) sel.createEl('option', { value: '', text: '—' });
			(field.options || []).forEach((o) => {
				const opt = sel.createEl('option', { value: o.value, text: o.value });
				if (o.value === val) opt.selected = true;
			});

			if (field.required && !val && field.options?.length) {
				sel.value = field.options[0].value;
				queueMicrotask(() => this.commitProp(entity, field.key, field.options![0].value));
			}

			const updateDot = () => {
				const opt = (field.options || []).find((o) => o.value === sel.value);
				if (opt) {
					dot.style.background = opt.color;
					dot.style.opacity = '1';
				} else {
					dot.style.background = 'transparent';
					dot.style.opacity = '0';
				}
			};
			updateDot();

			sel.onchange = () => {
				updateDot();
				this.commitProp(entity, field.key, sel.value || null);
			};
			return;
		}

		// ── Checkbox ────────────────────────────────────────────────────────────
		if (field.type === 'checkbox') {
			const cb = wrap.createEl('input', { cls: 'scenarist-prop-check' });
			cb.type = 'checkbox';
			cb.checked = val === true;
			cb.onchange = () => this.commitProp(entity, field.key, cb.checked);
			return;
		}

		// ── Number ──────────────────────────────────────────────────────────────
		if (field.type === 'number') {
			const inp = wrap.createEl('input', { cls: 'scenarist-prop-input' });
			inp.type = 'number';
			inp.value = val != null ? String(val) : '';
			inp.onchange = () => {
				const n = parseFloat(inp.value);
				this.commitProp(entity, field.key, isNaN(n) ? null : n);
			};
			return;
		}

		// ── Text / date → textarea ───────────────────────────────────────────────
		const ta = wrap.createEl('textarea', { cls: 'scenarist-prop-textarea' });
		ta.value = val != null ? String(val) : '';
		ta.placeholder = '—';
		ta.rows = LONG_FIELDS.has(field.key) ? 3 : 1;
		this.autoGrow(ta);
		ta.oninput = () => this.autoGrow(ta);
		ta.onchange = () => this.commitProp(entity, field.key, ta.value || null);
	}

	private autoGrow(ta: HTMLTextAreaElement) {
		ta.style.height = 'auto';
		const minLines = ta.rows || 1;
		const lineH = 22;
		ta.style.height = Math.max(ta.scrollHeight, minLines * lineH) + 'px';
	}

	private commitProp(entity: Entity, key: string, value: string | number | boolean | null) {
		this.plugin.store.setProp(entity.id, key, value);
		this.plugin.sync.syncToNote(this.plugin.store.get(entity.id)!);
	}

	// ---- элементы категории ----
	private renderCategoryItems(card: HTMLElement, cat: Entity) {
		const items = this.plugin.store.categoryItems(cat.id);
		const section = card.createDiv('scenarist-card-section');
		const head = section.createDiv('scenarist-card-body-head');
		head.createEl('div', { cls: 'scenarist-card-section-title', text: `Элементы (${items.length})` });
		const add = head.createEl('button', { cls: 'scenarist-card-edit-btn', text: '＋ элемент' });
		add.onclick = () =>
			new CreateEntityModal(this.app, this.plugin, {
				kind: 'categoryItem',
				categoryId: cat.id,
				titleHint: `Новый: ${cat.name}`,
			}).open();

		const chips = section.createDiv('scenarist-rel-chips');
		if (items.length === 0) {
			chips.createEl('span', { cls: 'scenarist-muted', text: 'Пока пусто.' });
		}
		for (const it of items) {
			const chip = chips.createEl('span', { cls: 'scenarist-rel-chip' });
			const chipIcon = chip.createEl('span', { cls: 'scenarist-rel-chip-icon' });
			this.renderIconInto(chipIcon, this.plugin.store.resolved(it).icon);
			chip.createEl('span', { text: it.name });
			chip.onclick = () => this.plugin.navigateTo(it.id);
		}
	}

	// ---- связи ----
	private renderRelations(card: HTMLElement, entity: Entity) {
		const schema = this.plugin.store.resolved(entity);
		const linkKeys = new Set(schema.links.map((l) => l.key));
		const section = card.createDiv('scenarist-card-section');
		section.createEl('div', { cls: 'scenarist-card-section-title', text: 'Связи' });
		const blocks: HTMLElement[] = [];

		for (const link of schema.links) {
			if (STRUCTURAL.has(link.key)) continue;
			const el = this.renderLinkEditor(entity, link.key, link.label, link.target, !!link.single);
			if (el) {
				section.appendChild(el);
				blocks.push(el);
			}
		}
		for (const key of Object.keys(entity.links)) {
			if (linkKeys.has(key) || STRUCTURAL.has(key)) continue;
			const ids = entity.links[key];
			if (!ids || !ids.length) continue;
			const el = this.renderBacklinks(key, ids);
			section.appendChild(el);
			blocks.push(el);
		}
		if (blocks.length === 0) section.remove();
	}

	private renderLinkEditor(
		entity: Entity,
		key: string,
		label: string,
		target: EntityKind,
		single: boolean
	): HTMLElement | null {
		const current = entity.links[key] || [];
		const candidates = this.plugin.store
			.byKind(target)
			.filter((c) => c.id !== entity.id && !current.includes(c.id));
		if (current.length === 0 && candidates.length === 0) return null;

		const wrap = document.createElement('div');
		wrap.className = 'scenarist-rel-group';
		const lbl = wrap.createDiv('scenarist-rel-label');
		lbl.textContent = label;
		const chips = wrap.createDiv('scenarist-rel-chips');

		for (const tid of current) {
			const t = this.plugin.store.get(tid);
			if (!t) continue;
			const chip = chips.createEl('span', { cls: 'scenarist-rel-chip' });
			const chipIcon = chip.createEl('span', { cls: 'scenarist-rel-chip-icon' });
			this.renderIconInto(chipIcon, this.plugin.store.resolved(t).icon);
			chip.createEl('span', { text: t.name });
			chip.onclick = () => this.plugin.navigateTo(tid);
			const x = chip.createEl('span', { cls: 'scenarist-rel-x', text: '×' });
			x.onclick = (e) => {
				e.stopPropagation();
				this.plugin.store.setLink(entity.id, key, current.filter((c) => c !== tid));
				this.plugin.sync.syncToNote(this.plugin.store.get(entity.id)!);
			};
		}

		if (candidates.length > 0) {
			const sel = chips.createEl('select', { cls: 'scenarist-rel-add' });
			sel.createEl('option', { value: '', text: '+ добавить…' });
			candidates.forEach((c) => sel.createEl('option', { value: c.id, text: c.name }));
			sel.onchange = () => {
				if (!sel.value) return;
				const next = single ? [sel.value] : [...current, sel.value];
				this.plugin.store.setLink(entity.id, key, next);
				this.plugin.sync.syncToNote(this.plugin.store.get(entity.id)!);
			};
		}
		return wrap;
	}

	private renderBacklinks(key: string, ids: string[]): HTMLElement {
		const wrap = document.createElement('div');
		wrap.className = 'scenarist-rel-group backlinks';
		wrap.createDiv('scenarist-rel-label').textContent = BACKLINK_LABELS[key] || key;
		const chips = wrap.createDiv('scenarist-rel-chips');
		for (const id of ids) {
			const t = this.plugin.store.get(id);
			if (!t) continue;
			const chip = chips.createEl('span', { cls: 'scenarist-rel-chip readonly' });
			const chipIcon = chip.createEl('span', { cls: 'scenarist-rel-chip-icon' });
			this.renderIconInto(chipIcon, this.plugin.store.resolved(t).icon);
			chip.createEl('span', { text: t.name });
			chip.onclick = () => this.plugin.navigateTo(id);
		}
		return wrap;
	}

	// ---- тело ----
	private async renderBody(card: HTMLElement, entity: Entity) {
		const section = card.createDiv('scenarist-card-section scenarist-card-body');
		const head = section.createDiv('scenarist-card-body-head');
		head.createEl('div', { cls: 'scenarist-card-section-title', text: 'Текст' });
		const editBtn = head.createEl('button', { cls: 'scenarist-card-edit-btn' });
		setIcon(editBtn, 'pencil');
		editBtn.createEl('span', { text: 'Редактировать' });
		editBtn.onclick = () => this.plugin.sync.openNote(entity);

		const file = entity.filePath
			? this.plugin.app.vault.getAbstractFileByPath(entity.filePath)
			: null;
		const target = section.createDiv('scenarist-card-body-render markdown-rendered');

		if (file instanceof TFile) {
			const raw = await this.plugin.app.vault.cachedRead(file);
			const body = this.stripFrontmatter(raw).trim();
			if (body) {
				await MarkdownRenderer.render(this.plugin.app, body, target, file.path, this);
			} else {
				target.createEl('p', { cls: 'scenarist-muted', text: 'Пусто.' });
			}
		} else {
			target.createEl('p', {
				cls: 'scenarist-muted',
				text: 'Заметка ещё не создана — нажмите «Редактировать».',
			});
		}
	}

	/** Открыть встроенный поиск Obsidian с фильтром по тегу. */
	private openTagSearch(tag: string) {
		const query = `tag:#${tag}`;
		const search = (this.app as any).internalPlugins?.getPluginById?.('global-search');
		if (search?.enabled && search.instance?.openGlobalSearch) {
			search.instance.openGlobalSearch(query);
			return;
		}
		(this.app as any).commands?.executeCommandById?.('global-search:open');
	}

	private stripFrontmatter(content: string): string {
		if (content.startsWith('---')) {
			const end = content.indexOf('\n---', 3);
			if (end !== -1) {
				const after = content.indexOf('\n', end + 1);
				return after !== -1 ? content.slice(after + 1) : '';
			}
		}
		return content;
	}
}
