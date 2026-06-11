import { App, Modal, Notice } from 'obsidian';
import type ScenaristPlugin from '../main';

/** Создание произведения: Серия (много книг) или Ваншот (одна книга) + тип. */
export class CreateWorkModal extends Modal {
	private plugin: ScenaristPlugin;

	constructor(app: App, plugin: ScenaristPlugin) {
		super(app);
		this.plugin = plugin;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.addClass('scenarist-modal');
		contentEl.createEl('h2', { text: 'Новое произведение', cls: 'scenarist-modal-title' });

		// формат: серия / ваншот
		const fmtRow = contentEl.createDiv('scenarist-form-row');
		fmtRow.createEl('label', { text: 'Формат', cls: 'scenarist-label' });
		const fmtWrap = fmtRow.createDiv('scenarist-choice');
		let format: 'Серия' | 'Ваншот' = 'Серия';
		const mkChoice = (val: 'Серия' | 'Ваншот', desc: string) => {
			const b = fmtWrap.createEl('button', { cls: 'scenarist-choice-btn', text: '' });
			b.createEl('div', { cls: 'scenarist-choice-title', text: val });
			b.createEl('div', { cls: 'scenarist-choice-desc', text: desc });
			if (val === format) b.addClass('active');
			b.onclick = () => {
				format = val;
				fmtWrap.querySelectorAll('.scenarist-choice-btn').forEach((e) => e.removeClass('active'));
				b.addClass('active');
			};
		};
		mkChoice('Серия', 'Несколько книг (томов)');
		mkChoice('Ваншот', 'Одна книга');

		// тип
		const typeRow = contentEl.createDiv('scenarist-form-row');
		typeRow.createEl('label', { text: 'Тип', cls: 'scenarist-label' });
		const typeSel = typeRow.createEl('select', { cls: 'scenarist-select' });
		['Рассказ', 'Сценарий'].forEach((t) => typeSel.createEl('option', { value: t, text: t }));

		// имя
		const nameRow = contentEl.createDiv('scenarist-form-row');
		nameRow.createEl('label', { text: 'Название', cls: 'scenarist-label' });
		const nameInput = nameRow.createEl('input', {
			cls: 'scenarist-input',
			placeholder: 'Название произведения…',
		});

		const btns = contentEl.createDiv('scenarist-modal-buttons');
		btns.createEl('button', { cls: 'scenarist-btn', text: 'Отмена' }).onclick = () => this.close();
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
			const store = this.plugin.store;
			const work = store.create('work', name);
			store.setProp(work.id, 'format', format);
			store.setProp(work.id, 'type', typeSel.value);

			// Ваншот — сразу создаём единственную (неявную) книгу
			if (format === 'Ваншот') {
				const book = store.create('book', name);
				store.setLink(book.id, 'work', [work.id]);
				if (this.plugin.settings.autoCreateNotes) await this.plugin.sync.ensureNote(store.get(book.id)!);
			}

			if (this.plugin.settings.autoCreateNotes) await this.plugin.sync.ensureNote(store.get(work.id)!);

			this.plugin.navigateTo(work.id);
			new Notice(`Создано произведение: ${name}`);
			this.close();
		};

		nameInput.focus();
	}

	onClose() {
		this.contentEl.empty();
	}
}
