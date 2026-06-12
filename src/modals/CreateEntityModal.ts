import { App, Modal, Notice } from 'obsidian';
import { EntityKind, FieldDef, LinkDef } from '../models/types';
import { SCHEMAS } from '../models/schema';
import type ScenaristPlugin from '../main';
import { t } from '../i18n';

export interface CreateOpts {
	kind: EntityKind;
	categoryId?: string; // для categoryItem
	parentLinks?: { key: string; id: string }[]; // напр. {book}, {chapter}, {work}
	presetProps?: Record<string, string | number | boolean>; // предзаполнить поля (напр. роль)
	titleHint?: string;
}

/** Создание любой сущности: поля по (динамической) схеме + пикеры связей. */
export class CreateEntityModal extends Modal {
	private plugin: ScenaristPlugin;
	private opts: CreateOpts;

	constructor(app: App, plugin: ScenaristPlugin, opts: CreateOpts) {
		super(app);
		this.plugin = plugin;
		this.opts = opts;
	}

	private defs(): { icon: string; label: string; fields: FieldDef[]; links: LinkDef[] } {
		if (this.opts.kind === 'categoryItem' && this.opts.categoryId) {
			const cat = this.plugin.store.get(this.opts.categoryId);
			const def = cat?.categorySchema;
			return {
				icon: def?.icon || '⬡',
				label: cat ? cat.name : t('schema.categoryItem.label'),
				fields: def?.fields || [],
				links: [...SCHEMAS.categoryItem.links, ...(def?.linkDefs || [])],
			};
		}
		const s = SCHEMAS[this.opts.kind];
		return { icon: s.icon, label: t(s.label), fields: s.fields, links: s.links };
	}

	onOpen() {
		const { contentEl } = this;
		const { icon, label, links } = this.defs();
		// Для сущностей с табами показываем только базовые поля (basic или без таба)
		const fields = this.defs().fields.filter((f) => !f.tab || f.tab === 'basic');
		const hidden = new Set<string>(['project', 'category']);
		(this.opts.parentLinks || []).forEach((p) => hidden.add(p.key));

		contentEl.addClass('scenarist-modal');
		contentEl.createEl('h2', {
			text: `${icon} ${this.opts.titleHint || t('modal.newEntity', { label })}`,
			cls: 'scenarist-modal-title',
		});

		const nameRow = contentEl.createDiv('scenarist-form-row');
		nameRow.createEl('label', { text: t('modal.name'), cls: 'scenarist-label' });
		const nameInput = nameRow.createEl('input', {
			cls: 'scenarist-input',
			placeholder: t('modal.namePlaceholder'),
		});

		const fieldInputs: Record<string, HTMLInputElement | HTMLSelectElement> = {};
		for (const field of fields) {
			// Мульти-выбор в модалке создания не показываем (можно задать в карточке)
			if (field.type === 'multiselect') continue;

			const row = contentEl.createDiv('scenarist-form-row');
			row.createEl('label', { text: t(field.label, undefined, field.label), cls: 'scenarist-label' });
			if (field.type === 'select' || field.type === 'status') {
				const sel = row.createEl('select', { cls: 'scenarist-select' });
				if (!field.required) sel.createEl('option', { value: '', text: '—' });
				(field.options || []).forEach((o) => sel.createEl('option', { value: o.value, text: o.value }));
				// Обязательное поле — предвыбираем первый вариант
				if (field.required && field.options?.length) sel.value = field.options[0].value;
				fieldInputs[field.key] = sel;
			} else if (field.type === 'checkbox') {
				const cb = row.createEl('input');
				cb.type = 'checkbox';
				fieldInputs[field.key] = cb;
			} else {
				const inp = row.createEl('input', { cls: 'scenarist-input' });
				inp.type = field.type === 'number' ? 'number' : 'text';
				fieldInputs[field.key] = inp;
			}
		}

		const linkInputs: Record<string, HTMLSelectElement> = {};
		for (const link of links) {
			if (hidden.has(link.key)) continue;
			const candidates = this.plugin.store.byKind(link.target);
			if (candidates.length === 0) continue;
			const row = contentEl.createDiv('scenarist-form-row');
			row.createEl('label', {
				text: t(link.label, undefined, link.label) + (link.single ? '' : t('modal.multipleHint')),
				cls: 'scenarist-label',
			});
			const sel = row.createEl('select', { cls: 'scenarist-select' });
			sel.multiple = !link.single;
			sel.size = link.single ? 1 : Math.min(4, candidates.length);
			if (link.single) sel.createEl('option', { value: '', text: '—' });
			candidates.forEach((c) => sel.createEl('option', { value: c.id, text: c.name }));
			linkInputs[link.key] = sel;
		}

		const btns = contentEl.createDiv('scenarist-modal-buttons');
		btns.createEl('button', { cls: 'scenarist-btn', text: t('modal.cancel') }).onclick = () => this.close();
		const createBtn = btns.createEl('button', {
			cls: 'scenarist-btn-primary',
			text: t('modal.create'),
		});
		createBtn.onclick = async () => {
			const name = nameInput.value.trim();
			if (!name) {
				nameInput.addClass('error');
				return;
			}
			const store = this.plugin.store;
			let entity;
			if (this.opts.kind === 'project') {
				entity = store.createProject(name);
			} else if (this.opts.kind === 'categoryItem' && this.opts.categoryId) {
				entity = store.createItem(this.opts.categoryId, name);
			} else {
				entity = store.create(this.opts.kind, name);
			}

			for (const p of this.opts.parentLinks || []) store.setLink(entity.id, p.key, [p.id]);
			for (const [k, v] of Object.entries(this.opts.presetProps || {})) store.setProp(entity.id, k, v);

			for (const field of fields) {
				const el = fieldInputs[field.key];
				if (!el) continue;
				if (field.type === 'checkbox') {
					store.setProp(entity.id, field.key, (el as HTMLInputElement).checked);
				} else if (field.type === 'number') {
					const n = parseFloat((el as HTMLInputElement).value);
					if (!isNaN(n)) store.setProp(entity.id, field.key, n);
				} else if (el.value) {
					store.setProp(entity.id, field.key, el.value);
				}
			}
			for (const link of links) {
				const sel = linkInputs[link.key];
				if (!sel) continue;
				const ids = Array.from(sel.selectedOptions)
					.map((o) => o.value)
					.filter(Boolean);
				if (ids.length) store.setLink(entity.id, link.key, ids);
			}

			if (this.plugin.settings.autoCreateNotes) {
				await this.plugin.sync.ensureNote(store.get(entity.id)!);
			}
			this.plugin.navigateTo(entity.id);
			new Notice(t('modal.created', { name }));
			this.close();
		};

		nameInput.focus();
	}

	onClose() {
		this.contentEl.empty();
	}
}
