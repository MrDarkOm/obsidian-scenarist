import { App, PluginSettingTab, Setting, Modal, Notice, setIcon } from 'obsidian';
import type ScenaristPlugin from './main';
import { CategoryPreset } from './models/types';
import { t } from './i18n';

export interface QuickCategoryType {
	id: string;
	label: string;
	/** Lucide-имя иконки (для всех типов, включая пользовательские). */
	icon: string;
	preset: CategoryPreset;
	enabled: boolean;
	isDefault: boolean;
}

export interface ScenaristSettings {
	rootFolder: string;
	autoCreateNotes: boolean;
	categoryQuickTypes: QuickCategoryType[];
	/** Список доступных жанров (расширяется пользователем). */
	genreOptions: string[];
	/** Последний открытый entity — восстанавливается при следующем запуске. */
	lastSelectedId?: string;
}

export const DEFAULT_QUICK_TYPES: QuickCategoryType[] = [
	{ id: 'org', label: 'Организации', icon: 'building-2', preset: 'organization', enabled: true, isDefault: true },
	{ id: 'loc', label: 'Локации', icon: 'map-pin', preset: 'location', enabled: true, isDefault: true },
	{ id: 'lang', label: 'Языки', icon: 'languages', preset: 'language', enabled: false, isDefault: true },
];

export const DEFAULT_GENRE_OPTIONS: string[] = [
	'Приключение',
	'Комедия',
	'Триллер',
	'Драма',
	'Фэнтези',
	'Научная фантастика',
	'Хоррор',
	'Романтика',
	'Детектив',
	'Боевик',
];

export const DEFAULT_SETTINGS: ScenaristSettings = {
	rootFolder: 'Scenarist',
	autoCreateNotes: true,
	categoryQuickTypes: DEFAULT_QUICK_TYPES.map((qt) => ({ ...qt })),
	genreOptions: [...DEFAULT_GENRE_OPTIONS],
};

// -------------------------------------------------------

export class ScenaristSettingsTab extends PluginSettingTab {
	plugin: ScenaristPlugin;

	constructor(app: App, plugin: ScenaristPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display() {
		const { containerEl } = this;
		containerEl.empty();
		containerEl.createEl('h2', { text: t('settings.title') });

		containerEl.createEl('h3', { text: t('settings.general') });

		new Setting(containerEl)
			.setName(t('settings.rootFolder'))
			.setDesc(t('settings.rootFolderDesc'))
			.addText((text) =>
				text
					.setPlaceholder('Scenarist')
					.setValue(this.plugin.settings.rootFolder)
					.onChange(async (value) => {
						this.plugin.settings.rootFolder = value.trim() || 'Scenarist';
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName(t('settings.autoCreate'))
			.setDesc(t('settings.autoCreateDesc'))
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.autoCreateNotes).onChange(async (value) => {
					this.plugin.settings.autoCreateNotes = value;
					await this.plugin.saveSettings();
				})
			);

		containerEl.createEl('h3', { text: t('settings.quickTypes') });
		containerEl.createEl('p', {
			cls: 'setting-item-description',
			text: t('settings.quickTypesDesc'),
		});

		this.renderQuickTypes(containerEl);
	}

	private renderQuickTypes(containerEl: HTMLElement) {
		for (const qt of this.plugin.settings.categoryQuickTypes) {
			const s = new Setting(containerEl).setName(qt.label).addToggle((toggle) =>
				toggle.setValue(qt.enabled).onChange(async (val) => {
					qt.enabled = val;
					await this.plugin.saveSettings();
				})
			);

			// Инжектируем иконку в nameEl (уже в DOM — setIcon работает корректно)
			const iconEl = document.createElement('span');
			iconEl.classList.add('scenarist-setting-icon');
			if ([...qt.icon].length <= 2) {
				iconEl.textContent = qt.icon; // старый emoji-формат
			} else {
				setIcon(iconEl, qt.icon); // Lucide
			}
			s.nameEl.prepend(iconEl);

			if (!qt.isDefault) {
				// Кнопка редактирования — только для пользовательских типов
				s.addButton((btn) =>
					btn
						.setIcon('pencil')
						.setTooltip(t('settings.editTooltip'))
						.onClick(() => {
							new EditQuickTypeModal(this.app, qt.icon, qt.label, async (newIcon, newLabel) => {
								qt.icon = newIcon;
								qt.label = newLabel;
								await this.plugin.saveSettings();
								this.display();
							}).open();
						})
				);
				// Кнопка удаления
				s.addButton((btn) =>
					btn
						.setIcon('trash')
						.setTooltip(t('settings.deleteTooltip'))
						.setWarning()
						.onClick(async () => {
							this.plugin.settings.categoryQuickTypes = this.plugin.settings.categoryQuickTypes.filter(
								(qt2) => qt2.id !== qt.id
							);
							await this.plugin.saveSettings();
							this.display();
						})
				);
			}
		}

		new Setting(containerEl)
			.setName(t('settings.addCustomType'))
			.setDesc(t('settings.addCustomTypeDesc'))
			.addButton((btn) =>
				btn
					.setButtonText(t('settings.addCustomTypeBtn'))
					.setCta()
					.onClick(() => new AddQuickTypeModal(this.app, this.plugin, () => this.display()).open())
			);
	}
}

// -------------------------------------------------------

/** Иконки доступные в пикере (Lucide, тематика: творчество, миры, персонажи). */
const LUCIDE_PICKER_ICONS: string[] = [
	// Люди / роли
	'user',
	'users',
	'user-check',
	'user-cog',
	'crown',
	'shield',
	// Власть / организации
	'building-2',
	'landmark',
	'flag',
	'swords',
	'handshake',
	'network',
	// Места / мир
	'map-pin',
	'map',
	'compass',
	'globe',
	'mountain',
	'home',
	// Природа / стихии
	'trees',
	'flame',
	'droplets',
	'zap',
	'wind',
	'cloud',
	// Документы / знания
	'book-open',
	'scroll',
	'pen-line',
	'feather',
	'brain',
	'graduation-cap',
	// Структуры / связи
	'git-branch',
	'layers',
	'shapes',
	'tag',
	'anchor',
	'link',
	// Предметы
	'gem',
	'key',
	'lock',
	'star',
	'heart',
	'target',
	// Время / прочее
	'hourglass',
	'clock',
	'moon',
	'sun',
	'infinity',
	'eye',
];

class AddQuickTypeModal extends Modal {
	private plugin: ScenaristPlugin;
	private onDone: () => void;
	private selectedIcon = 'shapes';

	constructor(app: App, plugin: ScenaristPlugin, onDone: () => void) {
		super(app);
		this.plugin = plugin;
		this.onDone = onDone;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.addClass('scenarist-modal');
		contentEl.createEl('h2', { text: t('modal.newCategoryType'), cls: 'scenarist-modal-title' });

		// ── Пикер иконок ──────────────────────────────────────────────────────
		const iconRow = contentEl.createDiv('scenarist-form-row');
		iconRow.createEl('label', { text: t('modal.icon'), cls: 'scenarist-label' });

		const pickerWrap = iconRow.createDiv('scenarist-icon-picker');

		// Превью
		const preview = pickerWrap.createDiv('scenarist-icon-preview');
		setIcon(preview, this.selectedIcon);

		// Сетка
		const grid = pickerWrap.createDiv('scenarist-icon-grid');
		for (const iconName of LUCIDE_PICKER_ICONS) {
			const cell = grid.createEl('button', {
				cls: `scenarist-icon-cell${iconName === this.selectedIcon ? ' selected' : ''}`,
				attr: { type: 'button', title: iconName },
			});
			setIcon(cell, iconName);

			cell.onclick = () => {
				this.selectedIcon = iconName;
				preview.empty();
				setIcon(preview, iconName);
				grid.querySelectorAll('.scenarist-icon-cell').forEach((b) => b.removeClass('selected'));
				cell.addClass('selected');
			};
		}

		// ── Название ──────────────────────────────────────────────────────────
		const nameRow = contentEl.createDiv('scenarist-form-row');
		nameRow.createEl('label', { text: t('modal.typeName'), cls: 'scenarist-label' });
		const nameInput = nameRow.createEl('input', {
			cls: 'scenarist-input',
			placeholder: t('modal.typeNamePlaceholder'),
		});

		// ── Кнопки ────────────────────────────────────────────────────────────
		const btns = contentEl.createDiv('scenarist-modal-buttons');
		btns.createEl('button', { cls: 'scenarist-btn', text: t('modal.cancel') }).onclick = () => this.close();

		const createBtn = btns.createEl('button', { cls: 'scenarist-btn-primary', text: t('modal.add') });
		createBtn.onclick = async () => {
			const label = nameInput.value.trim();
			if (!label) {
				nameInput.addClass('error');
				return;
			}

			this.plugin.settings.categoryQuickTypes.push({
				id: 'custom_' + Date.now(),
				label,
				icon: this.selectedIcon,
				preset: 'custom',
				enabled: true,
				isDefault: false,
			});
			await this.plugin.saveSettings();
			new Notice(t('modal.typeAdded', { label }));
			this.close();
			this.onDone();
		};

		nameInput.focus();
	}

	onClose() {
		this.contentEl.empty();
	}
}

// -------------------------------------------------------
/** Модал редактирования пользовательского типа: иконка + название. */
class EditQuickTypeModal extends Modal {
	private currentIcon: string;
	private currentLabel: string;
	private onSave: (icon: string, label: string) => void;
	private selectedIcon: string;

	constructor(app: App, currentIcon: string, currentLabel: string, onSave: (icon: string, label: string) => void) {
		super(app);
		this.currentIcon = currentIcon;
		this.currentLabel = currentLabel;
		// Если сохранена emoji — стартуем с 'shapes'; иначе — с текущей Lucide-иконкой
		this.selectedIcon = [...currentIcon].length <= 2 ? 'shapes' : currentIcon;
		this.onSave = onSave;
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.addClass('scenarist-modal');
		contentEl.createEl('h2', { text: t('modal.editType'), cls: 'scenarist-modal-title' });

		// ── Поле названия ─────────────────────────────────────────────────────
		const nameRow = contentEl.createDiv('scenarist-form-row');
		nameRow.createEl('label', { text: t('modal.typeName'), cls: 'scenarist-label' });
		const nameInput = nameRow.createEl('input', {
			cls: 'scenarist-input',
			placeholder: t('modal.typeNamePlaceholder'),
		});
		nameInput.value = this.currentLabel;

		// ── Пикер иконок ──────────────────────────────────────────────────────
		const iconRow = contentEl.createDiv('scenarist-form-row');
		iconRow.createEl('label', { text: t('modal.icon'), cls: 'scenarist-label' });

		const pickerWrap = iconRow.createDiv('scenarist-icon-picker');

		const preview = pickerWrap.createDiv('scenarist-icon-preview');
		setIcon(preview, this.selectedIcon);

		const grid = pickerWrap.createDiv('scenarist-icon-grid');
		for (const iconName of LUCIDE_PICKER_ICONS) {
			const cell = grid.createEl('button', {
				cls: `scenarist-icon-cell${iconName === this.selectedIcon ? ' selected' : ''}`,
				attr: { type: 'button', title: iconName },
			});
			setIcon(cell, iconName);
			cell.onclick = () => {
				this.selectedIcon = iconName;
				preview.empty();
				setIcon(preview, iconName);
				grid.querySelectorAll('.scenarist-icon-cell').forEach((b) => b.removeClass('selected'));
				cell.addClass('selected');
			};
		}

		const btns = contentEl.createDiv('scenarist-modal-buttons');
		btns.createEl('button', { cls: 'scenarist-btn', text: t('modal.cancel') }).onclick = () => this.close();
		const saveBtn = btns.createEl('button', { cls: 'scenarist-btn-primary', text: t('modal.save') });
		saveBtn.onclick = () => {
			const label = nameInput.value.trim();
			if (!label) {
				nameInput.addClass('error');
				return;
			}
			this.onSave(this.selectedIcon, label);
			this.close();
		};

		nameInput.focus();
	}

	onClose() {
		this.contentEl.empty();
	}
}
