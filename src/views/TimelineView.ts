import { ItemView, WorkspaceLeaf } from 'obsidian';
import { Entity } from '../models/types';
import type ScenaristPlugin from '../main';
import { t } from '../i18n';

export const TIMELINE_VIEW = 'scenarist-timeline';

/** Лента ключевых событий (якорей) произведения, упорядоченных по полю order. */
export class TimelineView extends ItemView {
	private plugin: ScenaristPlugin;
	private unsub: Array<() => void> = [];

	constructor(leaf: WorkspaceLeaf, plugin: ScenaristPlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType() {
		return TIMELINE_VIEW;
	}
	getDisplayText() {
		return t('timeline.title');
	}
	getIcon() {
		return 'clock';
	}

	async onOpen() {
		this.unsub.push(this.plugin.store.onChange(() => this.render()));
		this.render();
	}
	async onClose() {
		this.unsub.forEach((u) => u());
	}

	refresh() {
		this.render();
	}

	private anchorsOf(workId: string): Entity[] {
		return this.plugin.store
			.byKind('anchor')
			.filter((a) => (a.links['work'] || []).includes(workId))
			.sort((a, b) => {
				const oa = Number(a.props['order'] ?? 1e9);
				const ob = Number(b.props['order'] ?? 1e9);
				return oa - ob || a.createdAt - b.createdAt;
			});
	}

	private render() {
		const c = this.containerEl.children[1] as HTMLElement;
		c.empty();
		c.addClass('scenarist-panel', 'scenarist-timeline-view');

		const workId = this.plugin.timelineWorkId;
		const work = workId ? this.plugin.store.get(workId) : null;

		const header = c.createDiv('scenarist-panel-header');
		header.createEl('span', {
			cls: 'scenarist-panel-title',
			text: work ? '🕒 ' + t('timeline.titleWork', { name: work.name }) : '🕒 ' + t('timeline.title'),
		});

		if (!work) {
			c.createDiv('scenarist-empty').createEl('p', {
				text: t('timeline.noWork'),
			});
			return;
		}

		const anchors = this.anchorsOf(work.id);
		if (anchors.length === 0) {
			c.createDiv('scenarist-empty').createEl('p', {
				text: t('timeline.noAnchors'),
			});
			return;
		}

		const rail = c.createDiv('scenarist-tl-rail');
		anchors.forEach((a, idx) => this.renderNode(rail, a, idx, anchors));
	}

	private renderNode(rail: HTMLElement, anchor: Entity, index: number, all: Entity[]) {
		const node = rail.createDiv('scenarist-tl-node');
		node.draggable = true;

		const dot = node.createDiv('scenarist-tl-dot');
		dot.setText('⚓');
		const card = node.createDiv('scenarist-tl-card');
		card.createEl('div', { cls: 'scenarist-tl-title', text: anchor.name });
		const date = anchor.props['date'];
		if (date) card.createEl('div', { cls: 'scenarist-tl-date', text: String(date) });
		const desc = anchor.props['description'];
		if (typeof desc === 'string' && desc) {
			card.createEl('div', {
				cls: 'scenarist-tl-desc',
				text: desc.slice(0, 70) + (desc.length > 70 ? '…' : ''),
			});
		}

		card.onclick = () => this.plugin.navigateTo(anchor.id);
		card.ondblclick = () => this.plugin.sync.openNote(anchor);

		node.addEventListener('dragstart', (e) => {
			e.dataTransfer?.setData('text/plain', anchor.id);
			node.addClass('dragging');
		});
		node.addEventListener('dragend', () => node.removeClass('dragging'));
		node.addEventListener('dragover', (e) => e.preventDefault());
		node.addEventListener('drop', (e) => {
			e.preventDefault();
			const draggedId = e.dataTransfer?.getData('text/plain');
			if (!draggedId || draggedId === anchor.id) return;
			this.reorder(draggedId, index, all);
		});
	}

	private reorder(draggedId: string, targetIndex: number, all: Entity[]) {
		const ids = all.map((a) => a.id).filter((id) => id !== draggedId);
		ids.splice(targetIndex, 0, draggedId);
		ids.forEach((id, i) => this.plugin.store.setProp(id, 'order', i + 1));
		ids.forEach((id) => {
			const e = this.plugin.store.get(id);
			if (e) this.plugin.sync.syncToNote(e);
		});
	}
}
