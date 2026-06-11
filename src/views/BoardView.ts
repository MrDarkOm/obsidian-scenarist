import { ItemView, WorkspaceLeaf } from 'obsidian';
import { Entity } from '../models/types';
import { SCHEMAS } from '../models/schema';
import type ScenaristPlugin from '../main';

export const BOARD_VIEW = 'scenarist-board';

/** Канбан глав по статусам (главы активного проекта). Drag меняет статус. */
export class BoardView extends ItemView {
	private plugin: ScenaristPlugin;
	private unsub: Array<() => void> = [];

	constructor(leaf: WorkspaceLeaf, plugin: ScenaristPlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType() {
		return BOARD_VIEW;
	}
	getDisplayText() {
		return 'Доска глав';
	}
	getIcon() {
		return 'kanban-square';
	}

	async onOpen() {
		this.unsub.push(this.plugin.store.onChange(() => this.render()));
		this.render();
	}
	async onClose() {
		this.unsub.forEach((u) => u());
	}

	private projectChapters(): Entity[] {
		const works = this.plugin.store.byKindForProject('work');
		const bookIds = new Set<string>();
		works.forEach((w) => (w.links['books'] || []).forEach((id) => bookIds.add(id)));
		return this.plugin.store
			.byKind('chapter')
			.filter((ch) => (ch.links['book'] || []).some((id) => bookIds.has(id)));
	}

	private render() {
		const c = this.containerEl.children[1] as HTMLElement;
		c.empty();
		c.addClass('scenarist-panel', 'scenarist-board');

		const header = c.createDiv('scenarist-panel-header');
		header.createEl('span', { cls: 'scenarist-panel-title', text: '🗂 Доска глав' });

		const statuses = SCHEMAS.chapter.fields.find((f) => f.key === 'status')?.options || [];
		const chapters = this.projectChapters();

		if (chapters.length === 0) {
			c.createDiv('scenarist-empty').createEl('p', { text: 'Нет глав в активном проекте' });
			return;
		}

		const board = c.createDiv('scenarist-board-columns');
		for (const status of statuses) {
			const col = board.createDiv('scenarist-board-col');
			const head = col.createDiv('scenarist-board-col-head');
			const dot = head.createEl('span', { cls: 'scenarist-status-dot' });
			dot.style.background = status.color;
			head.createEl('span', { text: status.value });
			const cards = chapters.filter((ch) => ch.props['status'] === status.value);
			head.createEl('span', { cls: 'scenarist-count-badge', text: String(cards.length) });

			const drop = col.createDiv('scenarist-board-drop');
			drop.addEventListener('dragover', (e) => {
				e.preventDefault();
				drop.addClass('dragover');
			});
			drop.addEventListener('dragleave', () => drop.removeClass('dragover'));
			drop.addEventListener('drop', (e) => {
				e.preventDefault();
				drop.removeClass('dragover');
				const id = e.dataTransfer?.getData('text/plain');
				if (id) {
					this.plugin.store.setProp(id, 'status', status.value);
					const ch = this.plugin.store.get(id);
					if (ch) this.plugin.sync.syncToNote(ch);
				}
			});
			for (const ch of cards) this.renderCard(drop, ch);
		}

		const noStatus = chapters.filter((ch) => !statuses.some((s) => s.value === ch.props['status']));
		if (noStatus.length > 0) {
			const col = board.createDiv('scenarist-board-col');
			col.createDiv('scenarist-board-col-head').createEl('span', { text: 'Без статуса' });
			const drop = col.createDiv('scenarist-board-drop');
			for (const ch of noStatus) this.renderCard(drop, ch);
		}
	}

	private renderCard(container: HTMLElement, ch: Entity) {
		const card = container.createDiv('scenarist-board-card');
		card.draggable = true;
		card.createEl('div', { cls: 'scenarist-board-card-title', text: ch.name });
		const synopsis = ch.props['synopsis'];
		if (typeof synopsis === 'string' && synopsis) {
			card.createEl('div', {
				cls: 'scenarist-board-card-desc',
				text: synopsis.slice(0, 90) + (synopsis.length > 90 ? '…' : ''),
			});
		}
		card.addEventListener('dragstart', (e) => {
			e.dataTransfer?.setData('text/plain', ch.id);
			card.addClass('dragging');
		});
		card.addEventListener('dragend', () => card.removeClass('dragging'));
		card.onclick = () => this.plugin.navigateTo(ch.id);
		card.ondblclick = () => this.plugin.sync.openNote(ch);
	}
}
