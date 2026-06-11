import { ItemView, WorkspaceLeaf } from 'obsidian';
import { Entity, EntityKind } from '../models/types';
import type ScenaristPlugin from '../main';
import { t } from '../i18n';

export const GRAPH_VIEW = 'scenarist-graph';
const SVG_NS = 'http://www.w3.org/2000/svg';

const NODE_COLORS: Partial<Record<EntityKind, string>> = {
	work: '#9b59b6',
	character: '#4a9eff',
	categoryItem: '#f5a623',
	arc: '#1abc9c',
	anchor: '#e84393',
	book: '#7ed321',
};
const GRAPH_KINDS: EntityKind[] = ['work', 'character', 'categoryItem', 'arc', 'anchor'];

interface Node {
	e: Entity;
	x: number;
	y: number;
	vx: number;
	vy: number;
}

/** Граф связей с force-directed раскладкой и перетаскиванием узлов. */
export class GraphView extends ItemView {
	private plugin: ScenaristPlugin;
	private unsub: Array<() => void> = [];

	constructor(leaf: WorkspaceLeaf, plugin: ScenaristPlugin) {
		super(leaf);
		this.plugin = plugin;
	}

	getViewType() {
		return GRAPH_VIEW;
	}
	getDisplayText() {
		return t('commands.openGraph');
	}
	getIcon() {
		return 'git-fork';
	}

	async onOpen() {
		this.unsub.push(this.plugin.store.onChange(() => this.render()));
		this.unsub.push(this.plugin.onSelect(() => this.render()));
		this.render();
	}
	async onClose() {
		this.unsub.forEach((u) => u());
	}

	refresh() {
		this.render();
	}

	private render() {
		const c = this.containerEl.children[1] as HTMLElement;
		c.empty();
		c.addClass('scenarist-panel', 'scenarist-graph');

		const entities = this.plugin.store
			.all()
			.filter((e) => GRAPH_KINDS.includes(e.kind) && this.plugin.store.inActiveProject(e));

		if (entities.length === 0) {
			c.createDiv('scenarist-empty').createEl('p', {
				text: t('graph.empty'),
			});
			return;
		}

		const W = 800;
		const H = 600;
		const idSet = new Set(entities.map((e) => e.id));
		const nodes: Node[] = entities.map((e, i) => {
			const a = (i / entities.length) * Math.PI * 2;
			return { e, x: W / 2 + Math.cos(a) * 180, y: H / 2 + Math.sin(a) * 180, vx: 0, vy: 0 };
		});
		const index = new Map(nodes.map((n) => [n.e.id, n]));

		const edges: Array<[Node, Node]> = [];
		const seen = new Set<string>();
		for (const n of nodes) {
			for (const key of Object.keys(n.e.links)) {
				for (const tid of n.e.links[key]) {
					if (!idSet.has(tid)) continue;
					const k = [n.e.id, tid].sort().join('|');
					if (seen.has(k)) continue;
					seen.add(k);
					const tgt = index.get(tid);
					if (tgt) edges.push([n, tgt]);
				}
			}
		}

		this.simulate(nodes, edges, W, H);

		const svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
		svg.addClass('scenarist-graph-svg');
		c.appendChild(svg);

		const edgeEls = edges.map(([a, b]) => {
			const line = document.createElementNS(SVG_NS, 'line');
			line.setAttribute('class', 'scenarist-graph-edge');
			this.setLine(line, a, b);
			svg.appendChild(line);
			return { line, a, b };
		});

		for (const n of nodes) this.renderNode(svg, n, edgeEls);

		const legend = c.createDiv('scenarist-graph-legend');
		const legendKeys: Array<[EntityKind, string]> = [
			['work', t('graph.legend.work')],
			['character', t('graph.legend.character')],
			['categoryItem', t('graph.legend.categoryItem')],
			['arc', t('graph.legend.arc')],
			['anchor', t('graph.legend.anchor')],
		];
		for (const [kind, label] of legendKeys) {
			const item = legend.createDiv('scenarist-legend-item');
			const dot = item.createEl('span', { cls: 'scenarist-status-dot' });
			dot.style.background = NODE_COLORS[kind] || '#888';
			item.createEl('span', { text: label });
		}
	}

	private setLine(line: Element, a: Node, b: Node) {
		line.setAttribute('x1', String(a.x));
		line.setAttribute('y1', String(a.y));
		line.setAttribute('x2', String(b.x));
		line.setAttribute('y2', String(b.y));
	}

	/** Простая force-directed раскладка (Fruchterman–Reingold-подобная). */
	private simulate(nodes: Node[], edges: Array<[Node, Node]>, W: number, H: number) {
		const area = W * H;
		const k = Math.sqrt(area / Math.max(nodes.length, 1)) * 0.8;
		let temp = W / 8;
		const iterations = 250;

		for (let it = 0; it < iterations; it++) {
			for (const n of nodes) {
				n.vx = 0;
				n.vy = 0;
			}
			// репульсия
			for (let i = 0; i < nodes.length; i++) {
				for (let j = i + 1; j < nodes.length; j++) {
					const a = nodes[i];
					const b = nodes[j];
					const dx = a.x - b.x;
					const dy = a.y - b.y;
					const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
					const rep = (k * k) / dist;
					const ux = dx / dist;
					const uy = dy / dist;
					a.vx += ux * rep;
					a.vy += uy * rep;
					b.vx -= ux * rep;
					b.vy -= uy * rep;
				}
			}
			// притяжение по рёбрам
			for (const [a, b] of edges) {
				const dx = a.x - b.x;
				const dy = a.y - b.y;
				const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
				const att = (dist * dist) / k;
				const ux = dx / dist;
				const uy = dy / dist;
				a.vx -= ux * att;
				a.vy -= uy * att;
				b.vx += ux * att;
				b.vy += uy * att;
			}
			// смещение с охлаждением
			for (const n of nodes) {
				const disp = Math.sqrt(n.vx * n.vx + n.vy * n.vy) || 0.01;
				n.x += (n.vx / disp) * Math.min(disp, temp);
				n.y += (n.vy / disp) * Math.min(disp, temp);
				n.x = Math.max(40, Math.min(W - 40, n.x));
				n.y = Math.max(40, Math.min(H - 40, n.y));
			}
			temp *= 0.95;
		}
	}

	private renderNode(svg: SVGSVGElement, n: Node, edgeEls: Array<{ line: Element; a: Node; b: Node }>) {
		const g = document.createElementNS(SVG_NS, 'g');
		g.setAttribute('class', 'scenarist-graph-node');
		const place = () => g.setAttribute('transform', `translate(${n.x}, ${n.y})`);
		place();

		const circle = document.createElementNS(SVG_NS, 'circle');
		const selected = n.e.id === this.plugin.selectedId;
		circle.setAttribute('r', selected ? '11' : '7');
		circle.setAttribute('fill', NODE_COLORS[n.e.kind] || '#888');
		if (selected) circle.setAttribute('stroke', 'var(--text-normal)');
		g.appendChild(circle);

		const label = document.createElementNS(SVG_NS, 'text');
		label.setAttribute('y', '22');
		label.setAttribute('text-anchor', 'middle');
		label.setAttribute('class', 'scenarist-graph-label');
		label.textContent = n.e.name;
		g.appendChild(label);

		// перетаскивание
		let dragging = false;
		g.addEventListener('mousedown', (ev) => {
			dragging = true;
			ev.preventDefault();
		});
		const move = (ev: MouseEvent) => {
			if (!dragging) return;
			const pt = this.svgPoint(svg, ev);
			n.x = pt.x;
			n.y = pt.y;
			place();
			for (const e of edgeEls) if (e.a === n || e.b === n) this.setLine(e.line, e.a, e.b);
		};
		const up = () => {
			dragging = false;
		};
		svg.addEventListener('mousemove', move);
		svg.addEventListener('mouseup', up);
		svg.addEventListener('mouseleave', up);

		g.addEventListener('click', () => {
			if (!dragging) this.plugin.navigateTo(n.e.id);
		});
		svg.appendChild(g);
	}

	private svgPoint(svg: SVGSVGElement, ev: MouseEvent): { x: number; y: number } {
		const rect = svg.getBoundingClientRect();
		const vb = svg.viewBox.baseVal;
		const x = ((ev.clientX - rect.left) / rect.width) * vb.width;
		const y = ((ev.clientY - rect.top) / rect.height) * vb.height;
		return { x, y };
	}
}
