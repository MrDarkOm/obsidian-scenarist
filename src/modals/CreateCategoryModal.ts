import { App, Modal, Notice } from 'obsidian';
import { CategoryPreset } from '../models/types';
import { CATEGORY_PRESETS, PRESET_LABELS } from '../models/schema';
import type ScenaristPlugin from '../main';

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

		contentEl.createEl('h2', {
			text: def ? `${def.icon} Новая категория: ${PRESET_LABELS[fixedPreset!]}` : '🗂 Новая категория',
			cls: 'scenarist-modal-title',
		});

		let preset: CategoryPreset = fixedPreset || 'organization';
		const nameInputHolder: { el?: HTMLInputElement } = {};

		// Показываем выбор пресета только если не задан defaultPreset
		if (!fixedPreset) {
			const presetRow = contentEl.createDiv('scenarist-form-row');
			presetRow.createEl('label', { text: 'Тип категории', cls: 'scenarist-label' });
			const wrap = presetRow.createDiv('scenarist-choice');

			const PRESETS: Array<[CategoryPreset, string]> = [
				['organization', 'Поля: тип, лидер, участники'],
				['location',     'Поля: тип, страна'],
				['language',     'Поля: тип, регион'],
				['custom',       'Пустая, поля добавите позже'],
			];

			const mk = (p: CategoryPreset, desc: string) => {
				const pDef = CATEGORY_PRESETS[p];
				const b = wrap.createEl('button', { cls: 'scenarist-choice-btn' });
				b.createEl('div', { cls: 'scenarist-choice-title', text: `${pDef.icon} ${PRESET_LABELS[p]}` });
				b.createEl('div', { cls: 'scenarist-choice-desc', text: desc });
				if (p === preset) b.addClass('active');
				b.onclick = () => {
					preset = p;
					wrap.querySelectorAll('.scenarist-choice-btn').forEach((e) => e.removeClass('active'));
					b.addClass('active');
					if (nameInputHolder.el && !nameInputHolder.el.value)
						nameInputHolder.el.placeholder = `Напр. «${PRESET_LABELS[p]}»…`;
				};
			};
			for (const [p, desc] of PRESETS) mk(p, desc);
		}

		const nameRow = contentEl.createDiv('scenarist-form-row');
		nameRow.createEl('label', { text: 'Название категории', cls: 'scenarist-label' });
		const nameInput = nameRow.createEl('input', {
			cls: 'scenarist-input',
			placeholder: fixedPreset
				? `Напр. «${PRESET_LABELS[fixedPreset]}»…`
				: 'Напр. «Организации», «Локации»…',
		});
		nameInputHolder.el = nameInput;

		const btns = contentEl.createDiv('scenarist-modal-buttons');
		btns.createEl('button', { cls: 'scenarist-btn', text: 'Отмена' }).onclick = () =>
			this.close();
		const createBtn = btns.createEl('button', {
			cls: 'scenarist-btn-primary',
			text: 'Создать',
		});
		createBtn.onclick = async () => {
			const name = nameInput.value.trim();
			if (!name) {
				nameInput.addClass('error');
				return;
			}
			const cat = this.plugin.store.createCategory(preset, name);
			if (this.plugin.settings.autoCreateNotes)
				await this.plugin.sync.ensureNote(this.plugin.store.get(cat.id)!);
			this.plugin.navigateTo(cat.id);
			new Notice(`Создана категория: ${name}`);
			this.close();
		};

		nameInput.focus();
	}

	onClose() {
		this.contentEl.empty();
	}
}
