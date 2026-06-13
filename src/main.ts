import { Plugin, TFile, TAbstractFile, WorkspaceLeaf } from 'obsidian';
import { ScenaristSettingsTab, ScenaristSettings, DEFAULT_SETTINGS, DEFAULT_QUICK_TYPES } from './settings';
import { ScenaristStore } from './models/ScenaristStore';
import { SyncEngine } from './sync/SyncEngine';
import { ScenaristState } from './state/ScenaristState';
import { NavigatorView, NAVIGATOR_VIEW } from './views/NavigatorView';
import { CardView, CARD_VIEW, EntityFileView, ENTITY_FILE_VIEW } from './views/CardView';
import { BoardView, BOARD_VIEW } from './views/BoardView';
import { GraphView, GRAPH_VIEW } from './views/GraphView';
import { TimelineView, TIMELINE_VIEW } from './views/TimelineView';
import { CreateEntityModal } from './modals/CreateEntityModal';
import { CreateWorkModal } from './modals/CreateWorkModal';
import { CreateCategoryModal } from './modals/CreateCategoryModal';
import { setLocale, detectLang, t } from './i18n';

export default class ScenaristPlugin extends Plugin {
	settings!: ScenaristSettings;
	store!: ScenaristStore;
	sync!: SyncEngine;
	/** Состояние UI: выбранный элемент, навигация, подписки. */
	state!: ScenaristState;

	// ── Обратная совместимость для views, которые читают plugin.selectedId ──
	get selectedId(): string | null {
		return this.state.selectedId;
	}
	get timelineWorkId(): string | null {
		return this.state.timelineWorkId;
	}

	async onload() {
		await this.loadSettings();
		setLocale(detectLang());

		this.store = new ScenaristStore(this);
		this.sync = new SyncEngine(this);
		this.state = new ScenaristState(this);
		await this.store.load();

		// Восстанавливаем последний открытый элемент
		if (this.settings.lastSelectedId) {
			const restored = this.store.get(this.settings.lastSelectedId);
			if (restored) this.state.selectedId = this.settings.lastSelectedId;
		}

		this.registerView(NAVIGATOR_VIEW, (leaf) => new NavigatorView(leaf, this));
		this.registerView(CARD_VIEW, (leaf) => new CardView(leaf, this));
		this.registerView(ENTITY_FILE_VIEW, (leaf) => new EntityFileView(leaf, this));
		this.registerView(BOARD_VIEW, (leaf) => new BoardView(leaf, this));
		this.registerView(GRAPH_VIEW, (leaf) => new GraphView(leaf, this));
		this.registerView(TIMELINE_VIEW, (leaf) => new TimelineView(leaf, this));

		this.addRibbonIcon('film', t('commands.ribbon'), () => this.activateLayout());

		this.addCommand({ id: 'open-scenarist', name: t('commands.openScenarist'), callback: () => this.activateLayout() });
		this.addCommand({ id: 'open-board', name: t('commands.openBoard'), callback: () => this.openCentre(BOARD_VIEW) });
		this.addCommand({ id: 'open-graph', name: t('commands.openGraph'), callback: () => this.openCentre(GRAPH_VIEW) });
		this.addCommand({
			id: 'new-project',
			name: t('commands.newProject'),
			callback: () =>
				new CreateEntityModal(this.app, this, { kind: 'project', titleHint: t('nav.newProject') }).open(),
		});
		this.addCommand({
			id: 'new-work',
			name: t('commands.newWork'),
			callback: () => new CreateWorkModal(this.app, this).open(),
		});
		this.addCommand({
			id: 'new-character',
			name: t('commands.newCharacter'),
			callback: () => new CreateEntityModal(this.app, this, { kind: 'character' }).open(),
		});
		this.addCommand({
			id: 'new-category',
			name: t('commands.newCategory'),
			callback: () => new CreateCategoryModal(this.app, this).open(),
		});

		this.addSettingTab(new ScenaristSettingsTab(this.app, this));

		this.registerEvent(
			this.app.vault.on('modify', (file: TAbstractFile) => {
				if (file instanceof TFile) this.sync.handleModify(file);
			})
		);
		this.registerEvent(
			this.app.vault.on('rename', (file: TAbstractFile, oldPath: string) => {
				if (file instanceof TFile) this.sync.handleRename(file, oldPath);
			})
		);
		this.registerEvent(
			this.app.vault.on('create', (file: TAbstractFile) => {
				if (file instanceof TFile) this.sync.handleCreate(file);
			})
		);

		this.addCommand({
			id: 'rescan-vault',
			name: t('commands.rescanVault'),
			callback: () => void this.sync.rescanVault(),
		});

		this.app.workspace.onLayoutReady(() => {
			if (this.app.workspace.getLeavesOfType(NAVIGATOR_VIEW).length === 0) this.activateLayout();
			this.injectMarkdownButtons();
			void this.sync.rescanVault();
		});

		this.registerEvent(this.app.workspace.on('active-leaf-change', () => this.injectMarkdownButtons()));
		this.registerEvent(this.app.workspace.on('layout-change', () => this.injectMarkdownButtons()));

		// .sc файлы открываются как закреплённые карточки сущности (отдельный тип — не CARD_VIEW)
		this.registerExtensions(['sc'], ENTITY_FILE_VIEW);
	}

	onunload() {
		this.state.cancelPendingSave();
		void this.store.save();
		void this.saveSettings();
	}

	// ---- делегируем в state ----

	select(id: string | null) {
		this.state.select(id);
		if (id) void this.ensureCard();
	}

	navigateTo(id: string) {
		this.state.navigateTo(id);
		void this.ensureCard();
	}

	/**
	 * Открыть сущность как .sc-файл во вкладке (так же, как клик по файлу в дереве).
	 * Если вкладка уже открыта — фокусирует её. Если .sc-файла нет — создаёт.
	 * Фолбэк на главную панель, если у сущности ещё нет .md-заметки.
	 */
	async openEntity(id: string) {
		const entity = this.store.get(id);
		if (!entity) return;

		// Гарантируем наличие .md (а значит и пути для .sc)
		if (!entity.filePath && this.settings.autoCreateNotes) {
			await this.sync.ensureNote(entity);
		}
		if (!entity.filePath) {
			this.navigateTo(id);
			return;
		}

		const scPath = this.store.sidecarPath(entity.filePath);

		// Уже открыта вкладка с этим файлом? — фокусируем
		const existing = this.findScLeaf(scPath);
		if (existing) {
			this.app.workspace.revealLeaf(existing);
			return;
		}

		// Файл существует в vault?
		let file = this.app.vault.getAbstractFileByPath(scPath);
		if (!(file instanceof TFile)) {
			try {
				file = await this.app.vault.create(scPath, JSON.stringify(entity, null, 2));
			} catch {
				// возможно уже есть на диске, но не в индексе — пропускаем
				file = this.app.vault.getAbstractFileByPath(scPath);
			}
		}

		if (file instanceof TFile) {
			await this.app.workspace.getLeaf('tab').openFile(file);
		} else {
			this.navigateTo(id);
		}
	}

	/** Найти открытую вкладку EntityFileView с данным путём .sc-файла. */
	private findScLeaf(scPath: string): WorkspaceLeaf | null {
		let found: WorkspaceLeaf | null = null;
		this.app.workspace.getLeavesOfType(ENTITY_FILE_VIEW).forEach((leaf) => {
			// Use getViewState() to avoid accessing leaf.view when it may be a DeferredView (Obsidian ≥1.7.2)
			const statePath = leaf.getViewState()?.state?.file as string | undefined;
			if (statePath && statePath === scPath) found = leaf;
		});
		return found;
	}

	back() {
		this.state.back();
	}

	canGoBack(): boolean {
		return this.state.canGoBack();
	}

	onSelect(fn: () => void): () => void {
		return this.state.onSelect(fn);
	}

	refreshViews() {
		this.state.notify();
	}

	/** Принудительно перерисовать все открытые вью (например, после смены языка). */
	refreshAllViews() {
		const views = [NAVIGATOR_VIEW, CARD_VIEW, BOARD_VIEW, GRAPH_VIEW, TIMELINE_VIEW];
		for (const type of views) {
			this.app.workspace.getLeavesOfType(type).forEach((leaf) => {
				(leaf.view as any).refresh?.();
			});
		}
	}

	async openTimeline(workId: string) {
		this.state.timelineWorkId = workId;
		await this.openCentre(TIMELINE_VIEW);
		this.state.notify();
	}

	// ---- лейаут ----
	async activateLayout() {
		const { workspace } = this.app;
		let nav = workspace.getLeavesOfType(NAVIGATOR_VIEW)[0];
		if (!nav) {
			nav = workspace.getLeftLeaf(false)!;
			await nav.setViewState({ type: NAVIGATOR_VIEW, active: true });
		}
		await this.ensureCard();
		workspace.revealLeaf(nav);
	}

	private async ensureCard(): Promise<WorkspaceLeaf> {
		let card = this.app.workspace.getLeavesOfType(CARD_VIEW)[0];
		if (!card) {
			card = this.app.workspace.getLeaf(false);
			await card.setViewState({ type: CARD_VIEW, active: true });
		}
		this.app.workspace.revealLeaf(card);
		return card;
	}

	private async openCentre(type: string) {
		const existing = this.app.workspace.getLeavesOfType(type)[0];
		const leaf: WorkspaceLeaf = existing || this.app.workspace.getLeaf('tab');
		await leaf.setViewState({ type, active: true });
		this.app.workspace.revealLeaf(leaf);
	}

	injectMarkdownButtons() {
		this.app.workspace.iterateAllLeaves((leaf) => {
			if (leaf.view.getViewType() !== 'markdown') return;

			const viewEl = leaf.view.containerEl;
			const file: TFile | null = (leaf.view as any).file ?? null;

			viewEl.querySelectorAll('.scenarist-md-open-btn').forEach((el) => el.remove());
			if (!file) return;

			const entity = this.store.findByPath(file.path);
			if (!entity) return;

			const btn = (leaf.view as any).addAction(
				'film',
				t('commands.openInScenarist'),
				() => this.navigateTo(entity.id)
			) as HTMLElement;
			btn.addClass('scenarist-md-open-btn');
		});
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());

		// Миграция: обновляем иконки системных типов, если там остались старые emoji
		let migrated = false;
		for (const qt of this.settings.categoryQuickTypes) {
			if (qt.isDefault) {
				const def = DEFAULT_QUICK_TYPES.find((d) => d.id === qt.id);
				if (def && [...qt.icon].length <= 2) {
					qt.icon = def.icon; // заменяем emoji → Lucide-имя из дефолтов
					migrated = true;
				}
			}
		}
		if (migrated) await this.saveSettings();
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
