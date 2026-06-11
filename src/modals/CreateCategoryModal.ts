import { App, Modal, Notice } from 'obsidian';
import { CategoryPreset } from '../models/types';
import { CATEGORY_PRESETS, PRESET_LABELS } from '../models/schema';
import type ScenaristPlugin from '../main';
import { t } from '../i18n';

/**
 * Создание категории.
 * @param defaultPreset — если задан, пресет пре-выбран и выбор пресета скрыт.
 */
export class CreateCategoryModal extends Modal {
	private plugin: ScenaristPlugin;
	private defaultPreset?: CategoryPreset;

	constructor(app: App, plugin: ScenaristPlugin, defaultPreset?: CategoryPreset) {
		super(app);
		this.plugin = plugin;
		this.defaultPreset = defaultPreset;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.addClass('scenarist-modal');

		const fixedPreset = this.defaultPreset;
		const def = fixedPreset ? CATEGORY_PRESETS[fixedPreset] : null;

		const presetLabel = fixedPreset ? t(PRESET_LABELS[fixedPreset]) : '';
		contentEl.createEl('h2', {
			text: def ? t('modal.newCategoryPreset', { preset: presetLabel }) : t('modal.newCategory'),
			cls: 'scenarist-modal-title',
		});

		let preset: CategoryPreset = fixedPreset || 'organization';
		const nameInputHolder: { el?: HTMLInputElement } = {};

		// Показываем выбор пресета только если не задан defaultPreset
		if (!fixedPreset) {
			const presetRow = contentEl.createDiv('scenarist-form-row');
			presetRow.createEl('label', { text: t('modal.categoryType'), cls: 'scenarist-label' });
			const wrap = presetRow.createDiv('scenarist-choice');

			const PRESETS: Array<[CategoryPreset, string]> = [
				['organization', t('modal.presets.organization')],
				['location', t('modal.presets.location')],
				['language', t('modal.presets.language')],
				['custom', t('modal.presets.custom')],
			];

			const mk = (p: CategoryPreset, desc: string) => {
				const pDef = CATEGORY_PRESETS[p];
				const b = wrap.createEl('button', { cls: 'scenarist-choice-btn' });
				b.createEl('div', { cls: 'scenarist-choice-title', text: `${pDef.icon} ${t(PRESET_LABELS[p])}` });
				b.createEl('div', { cls: 'scenarist-choice-desc', text: desc });
				if (p === preset) b.addClass('active');
				b.onclick = () => {
					preset = p;
					wrap.querySelectorAll('.scenarist-choice-btn').forEach((e) => e.removeClass('active'));
					b.addClass('active');
					if (nameInputHolder.el && !nameInputHolder.el.value)
						nameInputHolder.el.placeholder = t('modal.categoryNamePlaceholder', { preset: t(PRESET_LABELS[p]) });
				};
			};
			for (const [p, desc] of PRESETS) mk(p, desc);
		}

		const nameRow = contentEl.createDiv('scenarist-form-row');
		nameRow.createEl('label', { text: t('modal.categoryName'), cls: 'scenarist-label' });
		const nameInput = nameRow.createEl('input', {
			cls: 'scenarist-input',
			placeholder: fixedPreset
				? t('modal.categoryNamePlaceholder', { preset: presetLabel })
				: t('modal.categoryNameGenericPlaceholder'),
		});
		nameInputHolder.el = nameInput;

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
			const cat = this.plugin.store.createCategory(preset, name);
			if (this.plugin.settings.autoCreateNotes) await this.plugin.sync.ensureNote(this.plugin.store.get(cat.id)!);
			this.plugin.navigateTo(cat.id);
			new Notice(t('modal.categoryCreated', { name }));
			this.close();
		};

		nameInput.focus();
	}

	onClose() {
		this.contentEl.empty();
	}
}
