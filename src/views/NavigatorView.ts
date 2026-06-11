import { ItemView, WorkspaceLeaf, Menu, Notice, setIcon } from 'obsidian';
import { Entity, NO_PROJECT } from '../models/types';
import { SCHEMAS } from '../models/schema';
import { CreateEntityModal } from '../modals/CreateEntityModal';
import { CreateWorkModal } from '../modals/CreateWorkModal';
import { CreateCategoryModal } from '../modals/CreateCategoryModal';
import type ScenaristPlugin from '../main';
import { QuickCategoryType } from '../settings';

export const NAVIGATOR_VIEW = 'scenarist-navigator';

const CHAR_ROLES = ['Главная', 'Ключевая', 'Второстепенная', 'Эпизодическая'];

/** Lucide-иконки для статичных вкладок и типов сущностей. */
const ENTITY_ICON: Record<string, string> = {
	work: 'pen-line',
	book: 'book-open',
	arc: 'git-branch',
	anchor: 'anchor',
	chapter: 'scroll',
	character: 'user',
	project: 'folder',
	page: 'file-text',
	category: 'tag',
	categoryItem: 'circle-dot',
};

export class NavigatorView extends ItemView {
	private plugin: ScenaristPlugin;
	private unsub: Array<() => void> = [];
	private expanded: Set<string> = new Set();
	private search = '';
	private tab = 'work';

	constructor(leaf: WorkspaceLeaf, plugin: ScenaristPlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType() {
		return NAVIGATOR_VIEW;
	}
	getDisplayText() {
		return 'Scenarist';
	}
	getIcon() {
		return 'film';
	}

	async onOpen() {
		this.unsub.push(this.plugin.store.onChange(() => this.render()));
		this.unsub.push(this.plugin.onSelect(() => this.render()));
		this.render();
	}
	async onClose() {
		this.unsub.forEach((u) => u());
	}

	private get store() {
		return this.plugin.store;
	}

	private enabledQuickTypes(): QuickCategoryType[] {
		return (this.plugin.settings.categoryQuickTypes || []).filter((t) => t.enabled);
	}

	private resolveTab() {
		const valid = new Set(['work', 'character', ...this.enabledQuickTypes().map((t) => t.id)]);
		if (!valid.has(this.tab)) this.tab = 'work';
	}

	private matches(e: Entity): boolean {
		return !this.search || e.name.toLowerCase().includes(this.search.toLowerCase());
	}
	private isOpen(key: string): boolean {
		return this.expanded.has(key) || this.search.length > 0;
	}
	private toggle(key: string) {
		if (this.expanded.has(key)) this.expanded.delete(key);
		else this.expanded.add(key);
		this.render();
	}

	// ── Вставить иконку: Lucide-имя или короткий emoji ──────────────────────
	private typeIcon(parent: HTMLElement, iconOrEmoji: string): HTMLElement {
		const span = parent.createEl('span', { cls: 'scenarist-type-icon' });
		if ([...iconOrEmoji].length <= 2) {
			span.textContent = iconOrEmoji; // emoji
		} else {
			setIcon(span, iconOrEmoji); // Lucide
		}
		return span;
	}

	private render() {
		this.resolveTab();

		const searchWasFocused = document.activeElement?.classList.contains('scenarist-search') === true;

		const c = this.containerEl.children[1] as HTMLElement;
		c.empty();
		c.addClass('scenarist-panel', 'scenarist-navigator');

		this.renderSearch(c);
		this.renderProjectBar(c);
		this.renderTabs(c);

		const body = c.createDiv('scenarist-nav-body');
		if (this.search.trim()) {
			this.renderAllSearchResults(body);
		} else if (this.tab === 'work') {
			this.renderWorkTab(body);
		} else if (this.tab === 'character') {
			this.renderCharacterTab(body);
		} else {
			const qt = this.enabledQuickTypes().find((t) => t.id === this.tab);
			if (qt) this.renderCategoryTypeTab(body, qt);
		}

		if (searchWasFocused) {
			const inp = c.querySelector('.scenarist-search') as HTMLInputElement | null;
			if (inp) {
				inp.focus();
				inp.setSelectionRange(inp.value.length, inp.value.length);
			}
		}
	}

	// ── поиск ──────────────────────────────────────────────────────────────────
	private renderSearch(c: HTMLElement) {
		const wrap = c.createDiv('scenarist-search-wrap');
		const input = wrap.createEl('input', {
			cls: 'scenarist-search',
			placeholder: 'Поиск…',
			type: 'text',
		});
		input.value = this.search;
		input.oninput = () => {
			this.search = input.value;
			this.render();
		};
	}

	// ── результаты поиска по всем разделам ─────────────────────────────────────
	private renderAllSearchResults(body: HTMLElement) {
		let totalFound = 0;

		const works = this.store.byKindForProject('work').filter((w) => this.workHasMatch(w));
		if (works.length > 0) {
			this.searchSectionTitle(body, 'Произведения');
			for (const work of works) this.renderWorkBlock(body, work);
			totalFound += works.length;
		}

		const chars = this.store.byKindForProject('character').filter((c) => this.matches(c));
		if (chars.length > 0) {
			this.searchSectionTitle(body, 'Персонажи');
			const pills = body.createDiv('scenarist-pills');
			pills.style.paddingLeft = '12px';
			for (const ch of chars) this.renderPill(pills, ch);
			totalFound += chars.length;
		}

		for (const qt of this.enabledQuickTypes()) {
			const cats = this.store.byKindForProject('category').filter((c) => c.categorySchema?.preset === qt.preset);
			const matching = cats.filter(
				(cat) => this.matches(cat) || this.store.categoryItems(cat.id).some((i) => this.matches(i))
			);
			if (matching.length > 0) {
				this.searchSectionTitle(body, qt.label);
				for (const cat of matching) {
					const items = this.store.categoryItems(cat.id).filter((i) => this.matches(i));
					this.chipGroup(
						body,
						`cat:${cat.id}`,
						qt.icon,
						cat.name,
						items,
						() =>
							new CreateEntityModal(this.app, this.plugin, {
								kind: 'categoryItem',
								categoryId: cat.id,
								titleHint: `Новый: ${cat.name}`,
							}).open(),
						() => this.plugin.navigateTo(cat.id),
						cat
					);
				}
				totalFound += matching.length;
			}
		}

		if (totalFound === 0) {
			body.createDiv('scenarist-tree-empty').setText('Ничего не найдено');
		}
	}

	private searchSectionTitle(parent: HTMLElement, text: string) {
		parent.createDiv('scenarist-search-section').setText(text);
	}

	// ── проектная панель ───────────────────────────────────────────────────────
	private renderProjectBar(c: HTMLElement) {
		const bar = c.createDiv('scenarist-projbar');

		const gear = bar.createEl('button', { cls: 'clickable-icon scenarist-proj-settings' });
		setIcon(gear, 'settings');
		gear.setAttribute('aria-label', 'Настройки Scenarist');
		gear.onclick = () => {
			const setting = (this.app as any).setting;
			if (setting) {
				setting.open();
				setting.openTabById(this.plugin.manifest.id);
			}
		};

		const sel = bar.createEl('select', { cls: 'scenarist-work-select' });
		const none = sel.createEl('option', { value: NO_PROJECT, text: '— Без проекта' });
		if (this.store.getActiveProjectId() === NO_PROJECT) none.selected = true;
		this.store.getProjects().forEach((p) => {
			const o = sel.createEl('option', { value: p.id, text: p.name });
			if (p.id === this.store.getActiveProjectId()) o.selected = true;
		});
		sel.onchange = () => this.store.setActiveProject(sel.value);

		const add = bar.createEl('button', { cls: 'clickable-icon scenarist-proj-add' });
		setIcon(add, 'plus');
		add.setAttribute('aria-label', 'Создать проект');
		add.onclick = () =>
			new CreateEntityModal(this.app, this.plugin, {
				kind: 'project',
				titleHint: 'Новый проект',
			}).open();
	}

	// ── вкладки ────────────────────────────────────────────────────────────────
	private renderTabs(c: HTMLElement) {
		const row = c.createDiv('scenarist-tabs-icons');
		this.makeTabBtn(row, 'work', 'palette', 'Произведения');
		this.makeTabBtn(row, 'character', 'user', 'Персонажи');
		// Динамические вкладки — icon теперь всегда Lucide-имя
		for (const qt of this.enabledQuickTypes()) {
			this.makeTabBtn(row, qt.id, qt.icon, qt.label);
		}
	}

	private makeTabBtn(row: HTMLElement, id: string, icon: string, title: string) {
		const b = row.createEl('button', {
			cls: `clickable-icon scenarist-tab-icon${this.tab === id ? ' is-active' : ''}`,
			attr: { 'aria-label': title, title },
		});
		// Lucide-иконка; emoji-fallback для старых пользовательских данных
		if ([...icon].length <= 2) {
			b.textContent = icon;
			b.style.fontSize = '15px';
		} else {
			setIcon(b, icon);
		}
		b.onclick = () => {
			this.tab = id;
			this.render();
		};
	}

	// ── вкладка: Произведения ──────────────────────────────────────────────────
	private renderWorkTab(body: HTMLElement) {
		this.tabHeader(
			body,
			'Произведения',
			() => new CreateWorkModal(this.app, this.plugin).open(),
			'Создать произведение'
		);
		const works = this.store.byKindForProject('work');
		if (works.length === 0) {
			body.createDiv('scenarist-tree-empty').setText('Нет произведений');
			return;
		}
		for (const work of works) this.renderWorkBlock(body, work);
	}

	private workHasMatch(work: Entity): boolean {
		if (this.matches(work)) return true;
		for (const b of this.linked(work, 'books', 'book')) {
			if (this.matches(b)) return true;
			if (this.linked(b, 'chapters', 'chapter').some((c) => this.matches(c))) return true;
		}
		if (this.linked(work, 'arcs', 'arc').some((a) => this.matches(a))) return true;
		if (this.linked(work, 'anchors', 'anchor').some((a) => this.matches(a))) return true;
		return false;
	}

	private renderWorkBlock(body: HTMLElement, work: Entity) {
		const key = `w:${work.id}`;
		const open = this.isOpen(key);
		const head = body.createDiv('scenarist-work-head');
		head.createEl('span', { cls: 'scenarist-chevron', text: open ? '▾' : '▸' });
		this.typeIcon(head, ENTITY_ICON.work);
		const title = head.createEl('span', { cls: 'scenarist-work-title', text: work.name });
		title.onclick = (e) => {
			e.stopPropagation();
			this.plugin.navigateTo(work.id);
		};

		const tl = head.createEl('button', { cls: 'clickable-icon' });
		setIcon(tl, 'clock');
		tl.setAttribute('aria-label', 'Таймлайн');
		tl.onclick = (e) => {
			e.stopPropagation();
			this.plugin.openTimeline(work.id);
		};

		const addBtn = head.createEl('button', { cls: 'clickable-icon' });
		setIcon(addBtn, 'plus');
		addBtn.setAttribute('aria-label', 'Добавить');
		addBtn.onclick = (e) => {
			e.stopPropagation();
			this.workAddMenu(e, work);
		};

		head.onclick = () => this.toggle(key);
		head.addEventListener('contextmenu', (e) => {
			e.preventDefault();
			e.stopPropagation();
			this.contextMenu(e, work);
		});

		if (!open) return;

		const inner = body.createDiv('scenarist-work-inner');
		for (const b of this.linked(work, 'books', 'book')) {
			const chapters = this.linked(b, 'chapters', 'chapter').filter((c) => this.matches(c));
			this.chipGroup(
				inner,
				`b:${b.id}`,
				ENTITY_ICON.book,
				b.name,
				chapters,
				() =>
					new CreateEntityModal(this.app, this.plugin, {
						kind: 'chapter',
						parentLinks: [{ key: 'book', id: b.id }],
						titleHint: 'Новая глава',
					}).open(),
				undefined,
				b
			);
		}
		const arcs = this.linked(work, 'arcs', 'arc').filter((a) => this.matches(a));
		this.chipGroup(inner, `arcs:${work.id}`, ENTITY_ICON.arc, 'Арки', arcs, () =>
			new CreateEntityModal(this.app, this.plugin, {
				kind: 'arc',
				parentLinks: [{ key: 'work', id: work.id }],
				titleHint: 'Новая арка',
			}).open()
		);
		const anchors = this.linked(work, 'anchors', 'anchor').filter((a) => this.matches(a));
		this.chipGroup(inner, `anch:${work.id}`, ENTITY_ICON.anchor, 'Якоря', anchors, () =>
			new CreateEntityModal(this.app, this.plugin, {
				kind: 'anchor',
				parentLinks: [{ key: 'work', id: work.id }],
				titleHint: 'Новый якорь',
			}).open()
		);
	}

	// ── вкладка: Персонажи ─────────────────────────────────────────────────────
	private renderCharacterTab(body: HTMLElement) {
		this.tabHeader(
			body,
			'Персонажи',
			() => new CreateEntityModal(this.app, this.plugin, { kind: 'character' }).open(),
			'Создать персонажа'
		);
		const chars = this.store.byKindForProject('character');
		for (const role of CHAR_ROLES) {
			const inRole = chars.filter((c) => c.props['role'] === role);
			this.chipGroup(body, `role:${role}`, ENTITY_ICON.character, role, inRole, () =>
				new CreateEntityModal(this.app, this.plugin, {
					kind: 'character',
					presetProps: { role },
					titleHint: `Новый персонаж (${role.toLowerCase()})`,
				}).open()
			);
		}
		const noRole = chars.filter((c) => !CHAR_ROLES.includes(String(c.props['role'])));
		if (noRole.length > 0) {
			this.chipGroup(body, 'role:none', ENTITY_ICON.character, 'Без роли', noRole, () =>
				new CreateEntityModal(this.app, this.plugin, { kind: 'character' }).open()
			);
		}
	}

	// ── вкладка: тип категории ─────────────────────────────────────────────────
	private renderCategoryTypeTab(body: HTMLElement, qt: QuickCategoryType) {
		this.tabHeader(
			body,
			qt.label,
			() => new CreateCategoryModal(this.app, this.plugin, qt.preset).open(),
			`Создать: ${qt.label}`
		);

		const cats = this.store.byKindForProject('category').filter((c) => c.categorySchema?.preset === qt.preset);

		if (cats.length === 0) {
			body.createDiv('scenarist-tree-empty').setText(`Нет ${qt.label.toLowerCase()}. Нажмите + чтобы создать.`);
			return;
		}
		for (const cat of cats) {
			const items = this.store.categoryItems(cat.id);
			this.chipGroup(
				body,
				`cat:${cat.id}`,
				qt.icon,
				cat.name,
				items,
				() =>
					new CreateEntityModal(this.app, this.plugin, {
						kind: 'categoryItem',
						categoryId: cat.id,
						titleHint: `Новый: ${cat.name}`,
					}).open(),
				() => this.plugin.navigateTo(cat.id),
				cat
			);
		}
	}

	// ── общие ──────────────────────────────────────────────────────────────────
	private tabHeader(body: HTMLElement, title: string, onAdd: () => void, addLabel: string) {
		const head = body.createDiv('scenarist-tab-head');
		head.createEl('span', { cls: 'scenarist-tab-title', text: title });
		const add = head.createEl('button', { cls: 'clickable-icon' });
		setIcon(add, 'plus');
		add.setAttribute('aria-label', addLabel);
		add.onclick = onAdd;
	}

	private chipGroup(
		parent: HTMLElement,
		key: string,
		icon: string,
		title: string,
		items: Entity[],
		onAdd: () => void,
		onTitleClick?: () => void,
		headerEntity?: Entity
	) {
		const open = this.isOpen(key);
		const head = parent.createDiv('scenarist-group-header');
		head.createEl('span', { cls: 'scenarist-chevron', text: open ? '▾' : '▸' });
		this.typeIcon(head, icon);
		const t = head.createEl('span', { cls: 'scenarist-group-title', text: title });
		head.createEl('span', { cls: 'scenarist-count-badge', text: String(items.length) });

		if (onTitleClick) {
			t.addClass('linkable');
			t.onclick = (e) => {
				e.stopPropagation();
				onTitleClick();
			};
		}
		head.onclick = () => this.toggle(key);
		if (headerEntity) {
			head.addEventListener('contextmenu', (e) => {
				e.preventDefault();
				e.stopPropagation();
				this.contextMenu(e, headerEntity);
			});
		}
		if (!open) return;

		const pills = parent.createDiv('scenarist-pills');
		for (const item of items) this.renderPill(pills, item);
		const add = pills.createEl('button', { cls: 'scenarist-pill add' });
		setIcon(add, 'plus');
		add.setAttribute('aria-label', 'Добавить');
		add.onclick = onAdd;
	}

	private renderPill(parent: HTMLElement, entity: Entity) {
		const pill = parent.createEl('button', { cls: 'scenarist-pill' });
		if (this.plugin.selectedId === entity.id) pill.addClass('selected');
		if (entity.kind === 'chapter') {
			const opt = SCHEMAS.chapter.fields
				.find((f) => f.key === 'status')
				?.options?.find((o) => o.value === entity.props['status']);
			const dot = pill.createEl('span', { cls: 'scenarist-pill-dot' });
			dot.style.background = opt ? opt.color : '#555';
		}
		pill.createEl('span', { text: entity.name });
		pill.onclick = () => this.plugin.navigateTo(entity.id);
		pill.addEventListener('dblclick', () => this.plugin.sync.openNote(entity));
		pill.addEventListener('contextmenu', (e) => {
			e.preventDefault();
			this.contextMenu(e, entity);
		});
	}

	// ── хелперы ────────────────────────────────────────────────────────────────
	private linked(e: Entity, key: string, kind: string): Entity[] {
		return (e.links[key] || [])
			.map((id) => this.store.get(id))
			.filter((x): x is Entity => !!x && x.kind === (kind as Entity['kind']));
	}

	private workAddMenu(e: MouseEvent, work: Entity) {
		const menu = new Menu();
		const mk = (label: string, kind: 'book' | 'arc' | 'anchor', icon: string) =>
			menu.addItem((i) =>
				i
					.setTitle(label)
					.setIcon(icon)
					.onClick(() =>
						new CreateEntityModal(this.app, this.plugin, {
							kind,
							parentLinks: [{ key: 'work', id: work.id }],
							titleHint: `Новый: ${label}`,
						}).open()
					)
			);
		mk('Книга', 'book', 'book-open');
		mk('Арка', 'arc', 'git-branch');
		mk('Якорь', 'anchor', 'anchor');
		menu.showAtMouseEvent(e);
	}

	private contextMenu(e: MouseEvent, entity: Entity) {
		const menu = new Menu();
		menu.addItem((i) =>
			i
				.setTitle('Открыть карточку')
				.setIcon('info')
				.onClick(() => this.plugin.navigateTo(entity.id))
		);
		menu.addItem((i) =>
			i
				.setTitle('Открыть заметку')
				.setIcon('file-text')
				.onClick(() => this.plugin.sync.openNote(entity))
		);
		menu.addSeparator();
		menu.addItem((i) =>
			i
				.setTitle('Удалить')
				.setIcon('trash')
				.onClick(async () => {
					await this.plugin.sync.deleteEntity(entity.id);
					new Notice(`Удалено: ${entity.name}`);
				})
		);
		menu.showAtMouseEvent(e);
	}
}
