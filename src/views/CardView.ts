import { FileView, WorkspaceLeaf, MarkdownRenderer, Notice, TFile, ViewStateResult, setIcon } from 'obsidian';
import { Entity, EntityKind, FieldDef, isValidEntity } from '../models/types';
import { CreateEntityModal } from '../modals/CreateEntityModal';
import type ScenaristPlugin from '../main';
import { t } from '../i18n';

export const CARD_VIEW = 'scenarist-card';
export const ENTITY_FILE_VIEW = 'scenarist-entity-file';

/** Скрытые из секции «Связи» структурные ключи. */
const STRUCTURAL = new Set(['project', 'category']);

/** Текстовые поля которые рендерятся большими (3+ строки). */
const LONG_FIELDS = new Set(['summary', 'synopsis', 'description', 'idea', 'goal']);

export class CardView extends FileView {
	protected plugin: ScenaristPlugin;
	private unsub: Array<() => void> = [];
	protected _rendering = false;
	private _renderPending = false;
	protected _charTab = 'basic';
	/** Если задан — вкладка закреплена за конкретной сущностью (не следит за навигатором). */
	public pinnedId: string | null = null;
	/** Cleanup fn for any open lightbox (removes overlay + keydown listener). */
	private _closeLightbox: (() => void) | null = null;

	constructor(leaf: WorkspaceLeaf, plugin: ScenaristPlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType() {
		return CARD_VIEW;
	}
	getDisplayText() {
		return this.current()?.name || 'Scenarist';
	}
	getIcon() {
		return 'film';
	}

	getState(): Record<string, unknown> {
		// Сохраняем file-состояние FileView (для .sc вкладок) + pinnedId
		return { ...super.getState(), pinnedId: this.pinnedId };
	}

	async setState(state: Record<string, unknown>, result: ViewStateResult): Promise<void> {
		// FileView сам загрузит файл из state.file и вызовет onLoadFile (важно для .sc вкладок)
		await super.setState(state, result);
		if (state && 'pinnedId' in state && state.pinnedId) {
			this.pinnedId = state.pinnedId as string;
		}
		this._charTab = 'basic';
		await this.render();
	}

	async onOpen() {
		this.unsub.push(this.plugin.store.onChange(() => this.scheduleRender()));
		// Следим за выбором только для незакреплённых вкладок
		this.unsub.push(this.plugin.onSelect(() => { if (!this.pinnedId) this.scheduleRender(); }));
		this.render();
	}
	async onClose() {
		this.unsub.forEach((u) => u());
		this._closeLightbox?.();
	}

	refresh() {
		this.render();
	}

	/** Debounced re-entrant-safe render scheduler. */
	protected scheduleRender() {
		if (this._rendering) {
			this._renderPending = true;
			return;
		}
		this.render();
	}

	private current(): Entity | null {
		const id = this.pinnedId ?? this.plugin.selectedId;
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

	protected async render() {
		if (this._rendering) {
			this._renderPending = true;
			return;
		}
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
				empty.createEl('p', { text: t('card.empty') });
				empty.createEl('p', {
					cls: 'scenarist-empty-hint',
					text: t('card.emptyHint'),
				});
				return;
			}

			const card = root.createDiv('scenarist-card');
			this.renderHeader(card, entity);
			if (entity.kind === 'character') {
				await this.renderCharacterTabs(card, entity);
			} else {
				this.renderProps(card, entity);
				if (entity.kind === 'category') this.renderCategoryItems(card, entity);
				this.renderRelations(card, entity);
				await this.renderBody(card, entity);
			}
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
			case 'page':
				return this.single(e.links['chapter']);
			case 'chapter':
				return this.single(e.links['book']);
			case 'book':
			case 'arc':
			case 'anchor':
				return this.single(e.links['work']);
			case 'categoryItem':
				return this.single(e.links['category']);
			case 'work':
			case 'character':
			case 'category':
				return this.single(e.links['project']);
			default:
				return null;
		}
	}

	private renderHeader(card: HTMLElement, entity: Entity) {
		const schema = this.plugin.store.resolved(entity);

		const top = card.createDiv('scenarist-card-top');
		if (this.plugin.canGoBack()) {
			const back = top.createEl('button', { cls: 'scenarist-card-back', attr: { title: t('card.back') } });
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
		trail.createEl('span', { cls: 'scenarist-crumb current', text: t(schema.label, undefined, schema.label) });

		const spacer = top.createDiv('scenarist-flex-spacer');

		const openBtn = top.createEl('button', { cls: 'scenarist-card-note-btn', attr: { title: t('card.openNote') } });
		setIcon(openBtn, 'external-link');
		openBtn.createEl('span', { text: t('card.noteLabel') });
		openBtn.onclick = () => this.plugin.sync.openNote(entity);

		// Заголовок (иконка-бокс + название)
		const titleRow = card.createDiv('scenarist-card-titlerow');
		const iconBox = titleRow.createEl('span', { cls: 'scenarist-card-icon' });
		this.renderIconInto(iconBox, schema.icon);

		const title = titleRow.createEl('input', { cls: 'scenarist-card-title' });
		title.value = entity.name;
		title.placeholder = t('card.noName');
		title.onchange = () => {
			const v = title.value.trim();
			if (v && v !== entity.name) {
				void this.plugin.sync.renameEntity(entity.id, v);
			}
		};

		if (entity.kind === 'character') {
			titleRow.addClass('has-avatar');
			this.renderAvatarBox(titleRow, entity);
		}

		// Теги (для персонажей рендерятся внутри таба «Основное»)
		if (entity.kind !== 'character') {
			this.renderTagsHeader(card, entity);
		}
	}

	/** Строка тегов под заголовком. */
	private renderTagsHeader(card: HTMLElement, entity: Entity) {
		const rawTags = entity.props['tags'];
		const tags = rawTags
			? String(rawTags)
					.split(',')
					.map((tg) => tg.trim())
					.filter(Boolean)
			: [];

		const row = card.createDiv('scenarist-card-tags');

		for (const tag of tags) {
			const chip = row.createEl('span', { cls: 'scenarist-tag-chip' });
			const text = chip.createEl('span', { cls: 'scenarist-tag-chip-text', text: '#' + tag });
			text.title = t('card.findTag', { tag });
			text.onclick = (e) => {
				e.stopPropagation();
				this.openTagSearch(tag);
			};
			const x = chip.createEl('span', { cls: 'scenarist-tag-chip-x', text: '×' });
			x.title = t('card.removeTag');
			x.onclick = (e) => {
				e.stopPropagation();
				const next = tags.filter((tg) => tg !== tag);
				this.commitProp(entity, 'tags', next.length ? next.join(', ') : null);
			};
		}

		const addBtn = row.createEl('button', { cls: 'scenarist-tag-add', text: t('card.addTag') });
		addBtn.onclick = () => {
			addBtn.addClass('is-hidden');
			const inp = row.createEl('input', { cls: 'scenarist-tag-input' });
			inp.placeholder = t('card.tagPlaceholder');
			inp.focus();
			const commit = () => {
				const val = inp.value.trim().replace(/^#/, '');
				if (val && !tags.includes(val)) {
					this.commitProp(entity, 'tags', [...tags, val].join(', '));
				}
			};
			inp.addEventListener('keydown', (e) => {
				if (e.key === 'Enter') {
					commit();
				}
				if (e.key === 'Escape') {
					inp.remove();
					addBtn.removeClass('is-hidden');
				}
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
			row.createEl('div', { cls: 'scenarist-prop-label', text: t(field.label, undefined, field.label) });
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
		row.createEl('div', { cls: 'scenarist-prop-label', text: t('card.noteLinks') });
		const valWrap = row.createDiv('scenarist-prop-value');
		const chipRow = valWrap.createDiv('scenarist-card-tags scenarist-link-chips scenarist-no-margin');

		const commitLinks = (newLinks: string[]) => {
			const val = newLinks.length ? newLinks.map((l) => `[[${l}]]`).join(', ') : null;
			this.commitProp(entity, 'backlinks', val);
		};

		for (const link of links) {
			const chip = chipRow.createEl('span', { cls: 'scenarist-link-chip' });
			const text = chip.createEl('span', { cls: 'scenarist-tag-chip-text', text: `[[${link}]]` });
			text.title = t('card.openLink', { link });
			text.onclick = (e) => {
				e.stopPropagation();
				this.openObsidianLink(link);
			};
			const x = chip.createEl('span', { cls: 'scenarist-tag-chip-x', text: '×' });
			x.onclick = (e) => {
				e.stopPropagation();
				commitLinks(links.filter((l) => l !== link));
			};
		}

		const addBtn = chipRow.createEl('button', { cls: 'scenarist-tag-add', text: t('card.addLink') });
		addBtn.onclick = () => {
			addBtn.addClass('is-hidden');
			const inp = chipRow.createEl('input', { cls: 'scenarist-tag-input scenarist-link-input' });
			inp.placeholder = t('card.linkPlaceholder');
			inp.focus();
			const commit = () => {
				const val = inp.value.trim().replace(/^\[\[|\]\]$/g, '');
				if (val && !links.includes(val)) commitLinks([...links, val]);
			};
			inp.addEventListener('keydown', (e) => {
				if (e.key === 'Enter') commit();
				if (e.key === 'Escape') {
					inp.remove();
					addBtn.removeClass('is-hidden');
				}
			});
			inp.addEventListener('blur', commit);
		};
	}

	/** Открыть wikilink через Obsidian. */
	private openObsidianLink(linkText: string) {
		this.app.workspace.openLinkText(linkText, '', false);
	}

	private renderFieldControl(
		wrap: HTMLElement,
		entity: Entity,
		field: {
			key: string;
			label: string;
			type: string;
			required?: boolean;
			options?: { value: string; color: string }[];
		}
	) {
		const val = entity.props[field.key];

		// ── Мульти-выбор (жанры) ────────────────────────────────────────────────
		if (field.type === 'multiselect') {
			const selected = val
				? String(val)
						.split(',')
						.map((v) => v.trim())
						.filter(Boolean)
				: [];
			const settingsOpts: string[] = this.plugin.settings.genreOptions?.length
				? this.plugin.settings.genreOptions
				: (field.options || []).map((o) => o.value);
			const optMap = new Map((field.options || []).map((o) => [o.value, o.color]));

			const chipRow = wrap.createDiv('scenarist-card-tags scenarist-genre-chips scenarist-no-margin');

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
				sel.createEl('option', { value: '', text: t('card.addGenre') });
				available.forEach((o) => sel.createEl('option', { value: o, text: o }));
				sel.createEl('option', { value: '__new__', text: t('card.addNewGenre') });

				sel.onchange = async () => {
					if (!sel.value) return;
					if (sel.value === '__new__') {
						sel.addClass('is-hidden');
						const inp = chipRow.createEl('input', { cls: 'scenarist-tag-input' });
						inp.placeholder = t('card.newGenrePlaceholder');
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
							} else {
								sel.value = '';
								sel.removeClass('is-hidden');
								renderChips();
							}
						};
						inp.addEventListener('keydown', (e) => {
							if (e.key === 'Enter') {
								doAdd();
							}
							if (e.key === 'Escape') {
								inp.remove();
								sel.removeClass('is-hidden');
								sel.value = '';
							}
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

			(field.options || []).forEach((o) => {
				const opt = sel.createEl('option', { value: o.value, text: o.value });
				if (o.value === val) opt.selected = true;
			});

			if (!val && field.options?.length) {
				sel.value = field.options[0].value;
				// Visual default only — committed on explicit user change
			}

			const updateDot = () => {
				const opt = (field.options || []).find((o) => o.value === sel.value);
				if (opt) {
					dot.style.setProperty('--dot-color', opt.color);
					dot.removeClass('scenarist-dot-hidden');
				} else {
					dot.addClass('scenarist-dot-hidden');
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
			inp.value = val !== null && val !== undefined ? String(val) : '';
			inp.onchange = () => {
				const n = parseFloat(inp.value);
				this.commitProp(entity, field.key, isNaN(n) ? null : n);
			};
			return;
		}

		// ── Text / date → textarea ───────────────────────────────────────────────
		const ta = wrap.createEl('textarea', { cls: 'scenarist-prop-textarea' });
		ta.value = val !== null && val !== undefined ? String(val) : '';
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
		head.createEl('div', { cls: 'scenarist-card-section-title', text: t('card.items', { count: items.length }) });
		const add = head.createEl('button', { cls: 'scenarist-card-edit-btn', text: t('card.addItem') });
		add.onclick = () =>
			new CreateEntityModal(this.app, this.plugin, {
				kind: 'categoryItem',
				categoryId: cat.id,
				titleHint: t('modal.newEntity', { label: cat.name }),
			}).open();

		const chips = section.createDiv('scenarist-rel-chips');
		if (items.length === 0) {
			chips.createEl('span', { cls: 'scenarist-muted', text: t('card.emptyItems') });
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
		section.createEl('div', { cls: 'scenarist-card-section-title', text: t('card.relations') });
		const blocks: HTMLElement[] = [];

		for (const link of schema.links) {
			if (STRUCTURAL.has(link.key)) continue;
			const el = this.renderLinkEditor(
				entity,
				link.key,
				t(link.label, undefined, link.label),
				link.target,
				!!link.single
			);
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
			const target_entity = this.plugin.store.get(tid);
			if (!target_entity) continue;
			const chip = chips.createEl('span', { cls: 'scenarist-rel-chip' });
			const chipIcon = chip.createEl('span', { cls: 'scenarist-rel-chip-icon' });
			this.renderIconInto(chipIcon, this.plugin.store.resolved(target_entity).icon);
			chip.createEl('span', { text: target_entity.name });
			chip.onclick = () => this.plugin.navigateTo(tid);
			const x = chip.createEl('span', { cls: 'scenarist-rel-x', text: '×' });
			x.onclick = (e) => {
				e.stopPropagation();
				this.plugin.store.setLink(
					entity.id,
					key,
					current.filter((c) => c !== tid)
				);
				this.plugin.sync.syncToNote(this.plugin.store.get(entity.id)!);
			};
		}

		if (candidates.length > 0) {
			const sel = chips.createEl('select', { cls: 'scenarist-rel-add' });
			sel.createEl('option', { value: '', text: t('card.addRelation') });
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
		wrap.createDiv('scenarist-rel-label').textContent = t('card.backlinks.' + key, undefined, key);
		const chips = wrap.createDiv('scenarist-rel-chips');
		for (const id of ids) {
			const entity = this.plugin.store.get(id);
			if (!entity) continue;
			const chip = chips.createEl('span', { cls: 'scenarist-rel-chip readonly' });
			const chipIcon = chip.createEl('span', { cls: 'scenarist-rel-chip-icon' });
			this.renderIconInto(chipIcon, this.plugin.store.resolved(entity).icon);
			chip.createEl('span', { text: entity.name });
			chip.onclick = () => this.plugin.navigateTo(id);
		}
		return wrap;
	}

	// ---- аватар персонажа ----
	private renderAvatarBox(titleRow: HTMLElement, entity: Entity) {
		const avatarVal = entity.props['avatar'] ? String(entity.props['avatar']) : null;
		const box = titleRow.createDiv('scenarist-char-avatar');

		if (avatarVal) {
			const file = this.plugin.app.vault.getAbstractFileByPath(avatarVal);
			if (file instanceof TFile) {
				const url = this.plugin.app.vault.getResourcePath(file);
				box.createEl('img', { cls: 'scenarist-char-avatar-img', attr: { src: url, alt: entity.name } });
				const del = box.createDiv('scenarist-char-avatar-del');
				setIcon(del, 'x');
				del.title = t('card.avatar.remove');
				del.onclick = (e) => {
					e.stopPropagation();
					this.commitProp(entity, 'avatar', null);
				};
			} else {
				this.renderAvatarPlaceholder(box);
			}
		} else {
			this.renderAvatarPlaceholder(box);
		}

		box.title = t('card.avatar.tooltip');
		box.onclick = (e) => {
			if ((e.target as HTMLElement).closest('.scenarist-char-avatar-del')) return;
			const input = document.createElement('input');
			input.type = 'file';
			input.accept = 'image/*';
			input.onchange = async () => {
				const file = input.files?.[0];
				if (!file) return;
				const path = await this.saveImageToVault(entity, file, 'avatar');
				if (path) this.commitProp(entity, 'avatar', path);
			};
			input.click();
		};
	}

	private renderAvatarPlaceholder(box: HTMLElement) {
		const ph = box.createDiv('scenarist-char-avatar-ph');
		setIcon(ph, 'image');
		box.createEl('span', { cls: 'scenarist-char-avatar-hint', text: t('card.avatar.set') });
	}

	// ---- сохранение изображения в vault ----
	private getAssetsFolder(entity: Entity): string {
		const dir = entity.filePath.includes('/')
			? entity.filePath.substring(0, entity.filePath.lastIndexOf('/'))
			: '';
		return dir ? `${dir}/assets` : 'assets';
	}

	private nameSlug(entity: Entity): string {
		return entity.name.replace(/[/\\:*?"<>|]/g, '').replace(/\s+/g, '_');
	}

	private async saveImageToVault(
		entity: Entity,
		file: File,
		type: 'avatar' | 'ref' | 'draw'
	): Promise<string | null> {
		if (!entity.filePath) return null;
		try {
			const assets = this.getAssetsFolder(entity);
			if (!this.plugin.app.vault.getAbstractFileByPath(assets)) {
				await this.plugin.app.vault.createFolder(assets);
			}
			const slug = this.nameSlug(entity);
			const dot = file.name.lastIndexOf('.');
			const ext = dot !== -1 ? file.name.slice(dot).toLowerCase() : '';

			let destPath: string;
			if (type === 'avatar') {
				destPath = `${assets}/${slug}_avatar${ext}`;
			} else {
				let n = 1;
				while (this.plugin.app.vault.getAbstractFileByPath(`${assets}/${slug}_${type}_${n}${ext}`)) n++;
				destPath = `${assets}/${slug}_${type}_${n}${ext}`;
			}
			const buffer = await file.arrayBuffer();
			const existing = this.plugin.app.vault.getAbstractFileByPath(destPath);
			if (existing instanceof TFile) {
				await this.plugin.app.vault.modifyBinary(existing, buffer);
			} else {
				await this.plugin.app.vault.createBinary(destPath, buffer);
			}
			return destPath;
		} catch {
			return null;
		}
	}

	// ---- лайтбокс ----
	private openLightbox(url: string) {
		this._closeLightbox?.();

		const overlay = document.createElement('div');
		overlay.className = 'scenarist-lightbox';

		const close = () => {
			overlay.remove();
			document.removeEventListener('keydown', onKey);
			this._closeLightbox = null;
		};
		const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };

		this._closeLightbox = close;
		overlay.onclick = close;

		const img = document.createElement('img');
		img.className = 'scenarist-lightbox-img';
		img.src = url;
		img.onclick = (e) => e.stopPropagation();
		overlay.appendChild(img);

		document.addEventListener('keydown', onKey);
		document.body.appendChild(overlay);
	}

	// ---- галерея изображений ----
	private renderImageGallery(
		container: HTMLElement,
		entity: Entity,
		propKey: string,
		title: string,
		fileType: 'ref' | 'draw'
	) {
		const rawVal = entity.props[propKey] ? String(entity.props[propKey]) : '';
		const paths = rawVal.split(',').map((p) => p.trim()).filter(Boolean);

		const section = container.createDiv('scenarist-card-section');
		const head = section.createDiv('scenarist-card-body-head');
		head.createEl('div', { cls: 'scenarist-card-section-title', text: title });

		const addBtn = head.createEl('button', { cls: 'scenarist-card-edit-btn' });
		setIcon(addBtn, 'plus');
		addBtn.createEl('span', { text: t('card.gallery.add') });
		addBtn.onclick = () => {
			const input = document.createElement('input');
			input.type = 'file';
			input.accept = 'image/*';
			input.multiple = true;
			input.onchange = async () => {
				const files = Array.from(input.files || []);
				if (!files.length) return;
				const newPaths = [...paths];
				for (const f of files) {
					const p = await this.saveImageToVault(entity, f, fileType);
					if (p) newPaths.push(p);
				}
				this.commitProp(entity, propKey, newPaths.join(', ') || null);
			};
			input.click();
		};

		const grid = section.createDiv('scenarist-img-gallery');

		if (paths.length === 0) {
			grid.createEl('span', { cls: 'scenarist-muted', text: t('card.gallery.empty') });
			return;
		}

		for (const imgPath of paths) {
			const file = this.plugin.app.vault.getAbstractFileByPath(imgPath);
			if (!(file instanceof TFile)) continue;
			const url = this.plugin.app.vault.getResourcePath(file);
			const cell = grid.createDiv('scenarist-img-cell');
			cell.createEl('img', { cls: 'scenarist-img-thumb', attr: { src: url } }).onclick = () =>
				this.openLightbox(url);
			const del = cell.createDiv('scenarist-img-del');
			setIcon(del, 'x');
			del.onclick = (e) => {
				e.stopPropagation();
				this.commitProp(entity, propKey, paths.filter((p) => p !== imgPath).join(', ') || null);
			};
		}
	}

	// ---- вкладки персонажа ----
	private async renderCharacterTabs(card: HTMLElement, entity: Entity): Promise<void> {
		const allFields = this.plugin.store.resolved(entity).fields;
		const byTab = (id: string) => allFields.filter((f) => f.tab === id);

		const tabDefs = [
			{ id: 'basic',           label: t('card.tab.basic') },
			{ id: 'characteristics', label: t('card.tab.characteristics') },
			{ id: 'biography',       label: t('card.tab.biography') },
			{ id: 'appearance',      label: t('card.tab.appearance') },
		];

		const tabBar = card.createDiv('scenarist-card-tabbar');
		const sections: Record<string, HTMLElement> = {};
		for (const tab of tabDefs) {
			sections[tab.id] = card.createDiv('scenarist-card-tab-section');
		}

		const setTab = (id: string) => {
			this._charTab = id;
			tabBar.querySelectorAll('.scenarist-card-tab-btn').forEach((el) => {
				(el as HTMLElement).toggleClass('is-active', (el as HTMLElement).dataset.tab === id);
			});
			for (const [key, el] of Object.entries(sections)) {
				el.toggleClass('is-hidden', key !== id);
			}
		};

		for (const tab of tabDefs) {
			const btn = tabBar.createEl('button', { cls: 'scenarist-card-tab-btn', text: tab.label });
			btn.dataset.tab = tab.id;
			btn.onclick = () => setTab(tab.id);
		}

		// === Основное ===
		const basicFields = byTab('basic');
		if (basicFields.length > 0) {
			const sec = sections['basic'].createDiv('scenarist-card-section');
			for (const field of basicFields) {
				const row = sec.createDiv('scenarist-prop');
				row.createEl('div', { cls: 'scenarist-prop-label', text: t(field.label, undefined, field.label) });
				this.renderFieldControl(row.createDiv('scenarist-prop-value'), entity, field);
			}
			this.renderBacklinksProp(sec, entity);
			// Теги — под ссылками на заметки
			this.renderTagsHeader(sec, entity);
		}
		this.renderRelations(sections['basic'], entity);

		// === Характеристики (с подразделами) ===
		this.renderFieldsWithSections(sections['characteristics'], entity, byTab('characteristics'));

		// === Биография ===
		this.renderFieldsWithSections(sections['biography'], entity, byTab('biography'));
		await this.renderBody(sections['biography'], entity);

		// === Внешность ===
		this.renderFieldsWithSections(sections['appearance'], entity, byTab('appearance'));
		this.renderImageGallery(sections['appearance'], entity, 'references', t('card.gallery.references'), 'ref');
		this.renderImageGallery(sections['appearance'], entity, 'sketches',   t('card.gallery.sketches'),   'draw');

		setTab(this._charTab);
	}

	/** Рендер группы полей с автозаголовками подразделов. */
	private renderFieldsWithSections(container: HTMLElement, entity: Entity, fields: FieldDef[]) {
		if (fields.length === 0) return;
		const sec = container.createDiv('scenarist-card-section');
		let lastSection = '';
		for (const field of fields) {
			if (field.section && field.section !== lastSection) {
				lastSection = field.section;
				sec.createEl('div', {
					cls: 'scenarist-prop-section-head',
					text: t(`card.section.${field.section}`, undefined, field.section),
				});
			}
			const row = sec.createDiv('scenarist-prop');
			row.createEl('div', { cls: 'scenarist-prop-label', text: t(field.label, undefined, field.label) });
			this.renderFieldControl(row.createDiv('scenarist-prop-value'), entity, field);
		}
	}

	// ---- тело ----
	private async renderBody(card: HTMLElement, entity: Entity) {
		const section = card.createDiv('scenarist-card-section scenarist-card-body');
		const head = section.createDiv('scenarist-card-body-head');
		head.createEl('div', { cls: 'scenarist-card-section-title', text: t('card.text') });
		const editBtn = head.createEl('button', { cls: 'scenarist-card-edit-btn' });
		setIcon(editBtn, 'pencil');
		editBtn.createEl('span', { text: t('card.edit') });
		editBtn.onclick = () => this.plugin.sync.openNote(entity);

		const file = entity.filePath ? this.plugin.app.vault.getAbstractFileByPath(entity.filePath) : null;
		const target = section.createDiv('scenarist-card-body-render markdown-rendered');

		if (file instanceof TFile) {
			const raw = await this.plugin.app.vault.cachedRead(file);
			const body = this.stripFrontmatter(raw).trim();
			if (body) {
				await MarkdownRenderer.render(this.plugin.app, body, target, file.path, this);
			} else {
				target.createEl('p', { cls: 'scenarist-muted', text: t('card.emptyBody') });
			}
		} else {
			target.createEl('p', {
				cls: 'scenarist-muted',
				text: t('card.noteNotCreated'),
			});
		}
	}

	/** Открыть встроенный поиск Obsidian с фильтром по тегу. */
	private openTagSearch(tag: string) {
		const query = `tag:#${tag}`;
		try {
			const search = (this.app as any).internalPlugins?.getPluginById?.('global-search');
			if (search?.enabled && search.instance?.openGlobalSearch) {
				search.instance.openGlobalSearch(query);
				return;
			}
			// Fallback: open the search pane via command API
			const opened = (this.app as any).commands?.executeCommandById?.('global-search:open');
			if (!opened) new Notice(`tag:#${tag}`);
		} catch {
			new Notice(`tag:#${tag}`);
		}
	}

	/**
	 * Убирает YAML frontmatter из контента для рендеринга тела заметки.
	 * Используется ТОЛЬКО для чтения/отображения — никогда для записи.
	 * Запись frontmatter происходит исключительно через SyncEngine.syncToNote
	 * (app.fileManager.processFrontMatter).
	 */
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

/**
 * Файловый вью для .sc-файлов в дереве vault.
 * Отдельный тип (не CARD_VIEW) — Obsidian не перепутает его с главной панелью
 * и будет открывать каждый файл в НОВОЙ вкладке.
 */
export class EntityFileView extends CardView {
	getViewType() {
		return ENTITY_FILE_VIEW;
	}

	canAcceptExtension(extension: string): boolean {
		return extension === 'sc';
	}

	async onLoadFile(file: TFile): Promise<void> {
		try {
			const raw = await this.app.vault.read(file);
			const data = JSON.parse(raw);
			if (!isValidEntity(data)) {
				new Notice('Scenarist: invalid .sc file — ' + file.basename);
				return;
			}
			if (!this.plugin.store.get(data.id)) {
				this.plugin.store.importEntity(data);
			}
			this.pinnedId = data.id;
			this._charTab = 'basic';
			await this.render();
		} catch {
			/* повреждённый файл — показываем пустую карточку */
		}
	}

	async onUnloadFile(_file: TFile): Promise<void> {
		this.pinnedId = null;
		this.scheduleRender();
	}
}
