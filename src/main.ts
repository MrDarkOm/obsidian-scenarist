import { Plugin, TFile, TAbstractFile, WorkspaceLeaf } from 'obsidian';
import { ScenaristSettingsTab, ScenaristSettings, DEFAULT_SETTINGS, DEFAULT_QUICK_TYPES } from './settings';
import { ScenaristStore } from './models/ScenaristStore';
import { SyncEngine } from './sync/SyncEngine';
import { NavigatorView, NAVIGATOR_VIEW } from './views/NavigatorView';
import { CardView, CARD_VIEW } from './views/CardView';
import { BoardView, BOARD_VIEW } from './views/BoardView';
import { GraphView, GRAPH_VIEW } from './views/GraphView';
import { TimelineView, TIMELINE_VIEW } from './views/TimelineView';
import { CreateEntityModal } from './modals/CreateEntityModal';
import { CreateWorkModal } from './modals/CreateWorkModal';
import { CreateCategoryModal } from './modals/CreateCategoryModal';

export default class ScenaristPlugin extends Plugin {
	settings: ScenaristSettings;
	store: ScenaristStore;
	sync: SyncEngine;
	selectedId: string | null = null;
	timelineWorkId: string | null = null;
	private selectListeners: Array<() => void> = [];
	private history: string[] = [];

	async onload() {
		await this.loadSettings();
		this.store = new ScenaristStore(this);
		this.sync = new SyncEngine(this);
		await this.store.load();

		this.registerView(NAVIGATOR_VIEW, (leaf) => new NavigatorView(leaf, this));
		this.registerView(CARD_VIEW, (leaf) => new CardView(leaf, this));
		this.registerView(BOARD_VIEW, (leaf) => new BoardView(leaf, this));
		this.registerView(GRAPH_VIEW, (leaf) => new GraphView(leaf, this));
		this.registerView(TIMELINE_VIEW, (leaf) => new TimelineView(leaf, this));

		this.addRibbonIcon('film', 'Scenarist', () => this.activateLayout());

		this.addCommand({ id: 'open-scenarist', name: 'Открыть Scenarist', callback: () => this.activateLayout() });
		this.addCommand({ id: 'open-board', name: 'Открыть доску глав', callback: () => this.openCentre(BOARD_VIEW) });
		this.addCommand({ id: 'open-graph', name: 'Открыть граф связей', callback: () => this.openCentre(GRAPH_VIEW) });
		this.addCommand({
			id: 'new-project',
			name: 'Новый проект',
			callback: () => new CreateEntityModal(this.app, this, { kind: 'project', titleHint: 'Новый проект' }).open(),
		});
		this.addCommand({
			id: 'new-work',
			name: 'Новое произведение (Серия/Ваншот)',
			callback: () => new CreateWorkModal(this.app, this).open(),
		});
		this.addCommand({
			id: 'new-character',
			name: 'Новый персонаж',
			callback: () => new CreateEntityModal(this.app, this, { kind: 'character' }).open(),
		});
		this.addCommand({
			id: 'new-category',
			name: 'Новая категория',
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

		this.app.workspace.onLayoutReady(() => {
			if (this.app.workspace.getLeavesOfType(NAVIGATOR_VIEW).length === 0) this.activateLayout();
		});
	}

	onunload() {
		this.store.save();
	}

	// ---- выбор и навигация ----
	select(id: string | null) {
		this.selectedId = id;
		if (id) void this.ensureCard();
		this.selectListeners.forEach((fn) => fn());
	}
	navigateTo(id: string) {
		if (this.selectedId && this.selectedId !== id) this.history.push(this.selectedId);
		this.select(id);
	}
	canGoBack(): boolean {
		return this.history.length > 0;
	}
	back() {
		const prev = this.history.pop();
		if (prev) this.select(prev);
	}
	onSelect(fn: () => void): () => void {
		this.selectListeners.push(fn);
		return () => {
			this.selectListeners = this.selectListeners.filter((l) => l !== fn);
		};
	}
	refreshViews() {
		this.store.save();
		this.selectListeners.forEach((fn) => fn());
	}

	async openTimeline(workId: string) {
		this.timelineWorkId = workId;
		await this.openCentre(TIMELINE_VIEW);
		this.selectListeners.forEach((fn) => fn());
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

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());

		// Миграция: обновляем иконки системных типов, если там остались старые emoji
		let migrated = false;
		for (const qt of this.settings.categoryQuickTypes) {
			if (qt.isDefault) {
				const def = DEFAULT_QUICK_TYPES.find((d) => d.id === qt.id);
				if (def && [...qt.icon].length <= 2) {
					qt.icon = def.icon;   // заменяем emoji → Lucide-имя из дефолтов
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
