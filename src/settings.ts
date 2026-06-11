import { App, PluginSettingTab, Setting, Modal, Notice, setIcon } from 'obsidian';
import type ScenaristPlugin from './main';
import { CategoryPreset } from './models/types';

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
	categoryQuickTypes: DEFAULT_QUICK_TYPES.map((t) => ({ ...t })),
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
		containerEl.createEl('h2', { text: 'Scenarist — Настройки' });

		containerEl.createEl('h3', { text: 'Общие' });

		new Setting(containerEl)
			.setName('Корневая папка')
			.setDesc('Папка в vault, где Scenarist хранит заметки')
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
			.setName('Автосоздание заметок')
			.setDesc('Создавать .md-заметку при добавлении сущности')
			.addToggle((toggle) =>
				toggle.setValue(this.plugin.settings.autoCreateNotes).onChange(async (value) => {
					this.plugin.settings.autoCreateNotes = value;
					await this.plugin.saveSettings();
				})
			);

		containerEl.createEl('h3', { text: 'Быстрые типы категорий' });
		containerEl.createEl('p', {
			cls: 'setting-item-description',
			text: 'Кнопки-вкладки в навигаторе. Включите нужные или добавьте свой тип.',
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
						.setTooltip('Редактировать')
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
						.setTooltip('Удалить')
						.setWarning()
						.onClick(async () => {
							this.plugin.settings.categoryQuickTypes = this.plugin.settings.categoryQuickTypes.filter(
								(t) => t.id !== qt.id
							);
							await this.plugin.saveSettings();
							this.display();
						})
				);
			}
		}

		new Setting(containerEl)
			.setName('Добавить пользовательский тип')
			.setDesc('Выберите иконку и задайте название')
			.addButton((btn) =>
				btn
					.setButtonText('＋ Добавить')
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
		contentEl.createEl('h2', { text: 'Новый тип категории', cls: 'scenarist-modal-title' });

		// ── Пикер иконок ──────────────────────────────────────────────────────
		const iconRow = contentEl.createDiv('scenarist-form-row');
		iconRow.createEl('label', { text: 'Иконка', cls: 'scenarist-label' });

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
		nameRow.createEl('label', { text: 'Название', cls: 'scenarist-label' });
		const nameInput = nameRow.createEl('input', {
			cls: 'scenarist-input',
			placeholder: 'Например: Артефакты',
		});

		// ── Кнопки ────────────────────────────────────────────────────────────
		const btns = contentEl.createDiv('scenarist-modal-buttons');
		btns.createEl('button', { cls: 'scenarist-btn', text: 'Отмена' }).onclick = () => this.close();

		const createBtn = btns.createEl('button', { cls: 'scenarist-btn-primary', text: 'Добавить' });
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
			new Notice(`Добавлен тип: ${label}`);
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
		contentEl.createEl('h2', { text: 'Редактировать тип', cls: 'scenarist-modal-title' });

		// ── Поле названия ─────────────────────────────────────────────────────
		const nameRow = contentEl.createDiv('scenarist-form-row');
		nameRow.createEl('label', { text: 'Название', cls: 'scenarist-label' });
		const nameInput = nameRow.createEl('input', {
			cls: 'scenarist-input',
			placeholder: 'Например: Артефакты',
		});
		nameInput.value = this.currentLabel;

		// ── Пикер иконок ──────────────────────────────────────────────────────
		const iconRow = contentEl.createDiv('scenarist-form-row');
		iconRow.createEl('label', { text: 'Иконка', cls: 'scenarist-label' });

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
		btns.createEl('button', { cls: 'scenarist-btn', text: 'Отмена' }).onclick = () => this.close();
		const saveBtn = btns.createEl('button', { cls: 'scenarist-btn-primary', text: 'Сохранить' });
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
