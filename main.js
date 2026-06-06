var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ScenaristPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian11 = require("obsidian");

// src/settings.ts
var import_obsidian = require("obsidian");
var DEFAULT_QUICK_TYPES = [
  { id: "org", label: "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438", icon: "building-2", preset: "organization", enabled: true, isDefault: true },
  { id: "loc", label: "\u041B\u043E\u043A\u0430\u0446\u0438\u0438", icon: "map-pin", preset: "location", enabled: true, isDefault: true },
  { id: "lang", label: "\u042F\u0437\u044B\u043A\u0438", icon: "languages", preset: "language", enabled: false, isDefault: true }
];
var DEFAULT_GENRE_OPTIONS = [
  "\u041F\u0440\u0438\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435",
  "\u041A\u043E\u043C\u0435\u0434\u0438\u044F",
  "\u0422\u0440\u0438\u043B\u043B\u0435\u0440",
  "\u0414\u0440\u0430\u043C\u0430",
  "\u0424\u044D\u043D\u0442\u0435\u0437\u0438",
  "\u041D\u0430\u0443\u0447\u043D\u0430\u044F \u0444\u0430\u043D\u0442\u0430\u0441\u0442\u0438\u043A\u0430",
  "\u0425\u043E\u0440\u0440\u043E\u0440",
  "\u0420\u043E\u043C\u0430\u043D\u0442\u0438\u043A\u0430",
  "\u0414\u0435\u0442\u0435\u043A\u0442\u0438\u0432",
  "\u0411\u043E\u0435\u0432\u0438\u043A"
];
var DEFAULT_SETTINGS = {
  rootFolder: "Scenarist",
  autoCreateNotes: true,
  categoryQuickTypes: DEFAULT_QUICK_TYPES.map((t) => ({ ...t })),
  genreOptions: [...DEFAULT_GENRE_OPTIONS]
};
var ScenaristSettingsTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "Scenarist \u2014 \u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438" });
    containerEl.createEl("h3", { text: "\u041E\u0431\u0449\u0438\u0435" });
    new import_obsidian.Setting(containerEl).setName("\u041A\u043E\u0440\u043D\u0435\u0432\u0430\u044F \u043F\u0430\u043F\u043A\u0430").setDesc("\u041F\u0430\u043F\u043A\u0430 \u0432 vault, \u0433\u0434\u0435 Scenarist \u0445\u0440\u0430\u043D\u0438\u0442 \u0437\u0430\u043C\u0435\u0442\u043A\u0438").addText(
      (text) => text.setPlaceholder("Scenarist").setValue(this.plugin.settings.rootFolder).onChange(async (value) => {
        this.plugin.settings.rootFolder = value.trim() || "Scenarist";
        await this.plugin.saveSettings();
      })
    );
    new import_obsidian.Setting(containerEl).setName("\u0410\u0432\u0442\u043E\u0441\u043E\u0437\u0434\u0430\u043D\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043E\u043A").setDesc("\u0421\u043E\u0437\u0434\u0430\u0432\u0430\u0442\u044C .md-\u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u043F\u0440\u0438 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D\u0438\u0438 \u0441\u0443\u0449\u043D\u043E\u0441\u0442\u0438").addToggle(
      (toggle) => toggle.setValue(this.plugin.settings.autoCreateNotes).onChange(async (value) => {
        this.plugin.settings.autoCreateNotes = value;
        await this.plugin.saveSettings();
      })
    );
    containerEl.createEl("h3", { text: "\u0411\u044B\u0441\u0442\u0440\u044B\u0435 \u0442\u0438\u043F\u044B \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0439" });
    containerEl.createEl("p", {
      cls: "setting-item-description",
      text: "\u041A\u043D\u043E\u043F\u043A\u0438-\u0432\u043A\u043B\u0430\u0434\u043A\u0438 \u0432 \u043D\u0430\u0432\u0438\u0433\u0430\u0442\u043E\u0440\u0435. \u0412\u043A\u043B\u044E\u0447\u0438\u0442\u0435 \u043D\u0443\u0436\u043D\u044B\u0435 \u0438\u043B\u0438 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0441\u0432\u043E\u0439 \u0442\u0438\u043F."
    });
    this.renderQuickTypes(containerEl);
  }
  renderQuickTypes(containerEl) {
    for (const qt of this.plugin.settings.categoryQuickTypes) {
      const s = new import_obsidian.Setting(containerEl).setName(qt.label).addToggle(
        (toggle) => toggle.setValue(qt.enabled).onChange(async (val) => {
          qt.enabled = val;
          await this.plugin.saveSettings();
        })
      );
      const iconEl = document.createElement("span");
      iconEl.classList.add("scenarist-setting-icon");
      if ([...qt.icon].length <= 2) {
        iconEl.textContent = qt.icon;
      } else {
        (0, import_obsidian.setIcon)(iconEl, qt.icon);
      }
      s.nameEl.prepend(iconEl);
      if (!qt.isDefault) {
        s.addButton(
          (btn) => btn.setIcon("pencil").setTooltip("\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C").onClick(() => {
            new EditQuickTypeModal(this.app, qt.icon, qt.label, async (newIcon, newLabel) => {
              qt.icon = newIcon;
              qt.label = newLabel;
              await this.plugin.saveSettings();
              this.display();
            }).open();
          })
        );
        s.addButton(
          (btn) => btn.setIcon("trash").setTooltip("\u0423\u0434\u0430\u043B\u0438\u0442\u044C").setWarning().onClick(async () => {
            this.plugin.settings.categoryQuickTypes = this.plugin.settings.categoryQuickTypes.filter((t) => t.id !== qt.id);
            await this.plugin.saveSettings();
            this.display();
          })
        );
      }
    }
    new import_obsidian.Setting(containerEl).setName("\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u0442\u0438\u043F").setDesc("\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u043A\u043E\u043D\u043A\u0443 \u0438 \u0437\u0430\u0434\u0430\u0439\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435").addButton(
      (btn) => btn.setButtonText("\uFF0B \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C").setCta().onClick(() => new AddQuickTypeModal(this.app, this.plugin, () => this.display()).open())
    );
  }
};
var LUCIDE_PICKER_ICONS = [
  // Люди / роли
  "user",
  "users",
  "user-check",
  "user-cog",
  "crown",
  "shield",
  // Власть / организации
  "building-2",
  "landmark",
  "flag",
  "swords",
  "handshake",
  "network",
  // Места / мир
  "map-pin",
  "map",
  "compass",
  "globe",
  "mountain",
  "home",
  // Природа / стихии
  "trees",
  "flame",
  "droplets",
  "zap",
  "wind",
  "cloud",
  // Документы / знания
  "book-open",
  "scroll",
  "pen-line",
  "feather",
  "brain",
  "graduation-cap",
  // Структуры / связи
  "git-branch",
  "layers",
  "shapes",
  "tag",
  "anchor",
  "link",
  // Предметы
  "gem",
  "key",
  "lock",
  "star",
  "heart",
  "target",
  // Время / прочее
  "hourglass",
  "clock",
  "moon",
  "sun",
  "infinity",
  "eye"
];
var AddQuickTypeModal = class extends import_obsidian.Modal {
  constructor(app, plugin, onDone) {
    super(app);
    this.selectedIcon = "shapes";
    this.plugin = plugin;
    this.onDone = onDone;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.addClass("scenarist-modal");
    contentEl.createEl("h2", { text: "\u041D\u043E\u0432\u044B\u0439 \u0442\u0438\u043F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438", cls: "scenarist-modal-title" });
    const iconRow = contentEl.createDiv("scenarist-form-row");
    iconRow.createEl("label", { text: "\u0418\u043A\u043E\u043D\u043A\u0430", cls: "scenarist-label" });
    const pickerWrap = iconRow.createDiv("scenarist-icon-picker");
    const preview = pickerWrap.createDiv("scenarist-icon-preview");
    (0, import_obsidian.setIcon)(preview, this.selectedIcon);
    const grid = pickerWrap.createDiv("scenarist-icon-grid");
    for (const iconName of LUCIDE_PICKER_ICONS) {
      const cell = grid.createEl("button", {
        cls: `scenarist-icon-cell${iconName === this.selectedIcon ? " selected" : ""}`,
        attr: { type: "button", title: iconName }
      });
      (0, import_obsidian.setIcon)(cell, iconName);
      cell.onclick = () => {
        this.selectedIcon = iconName;
        preview.empty();
        (0, import_obsidian.setIcon)(preview, iconName);
        grid.querySelectorAll(".scenarist-icon-cell").forEach((b) => b.removeClass("selected"));
        cell.addClass("selected");
      };
    }
    const nameRow = contentEl.createDiv("scenarist-form-row");
    nameRow.createEl("label", { text: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435", cls: "scenarist-label" });
    const nameInput = nameRow.createEl("input", {
      cls: "scenarist-input",
      placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u0410\u0440\u0442\u0435\u0444\u0430\u043A\u0442\u044B"
    });
    const btns = contentEl.createDiv("scenarist-modal-buttons");
    btns.createEl("button", { cls: "scenarist-btn", text: "\u041E\u0442\u043C\u0435\u043D\u0430" }).onclick = () => this.close();
    const createBtn = btns.createEl("button", { cls: "scenarist-btn-primary", text: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C" });
    createBtn.onclick = async () => {
      const label = nameInput.value.trim();
      if (!label) {
        nameInput.addClass("error");
        return;
      }
      this.plugin.settings.categoryQuickTypes.push({
        id: "custom_" + Date.now(),
        label,
        icon: this.selectedIcon,
        preset: "custom",
        enabled: true,
        isDefault: false
      });
      await this.plugin.saveSettings();
      new import_obsidian.Notice(`\u0414\u043E\u0431\u0430\u0432\u043B\u0435\u043D \u0442\u0438\u043F: ${label}`);
      this.close();
      this.onDone();
    };
    nameInput.focus();
  }
  onClose() {
    this.contentEl.empty();
  }
};
var EditQuickTypeModal = class extends import_obsidian.Modal {
  constructor(app, currentIcon, currentLabel, onSave) {
    super(app);
    this.currentIcon = currentIcon;
    this.currentLabel = currentLabel;
    this.selectedIcon = [...currentIcon].length <= 2 ? "shapes" : currentIcon;
    this.onSave = onSave;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.addClass("scenarist-modal");
    contentEl.createEl("h2", { text: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0442\u0438\u043F", cls: "scenarist-modal-title" });
    const nameRow = contentEl.createDiv("scenarist-form-row");
    nameRow.createEl("label", { text: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435", cls: "scenarist-label" });
    const nameInput = nameRow.createEl("input", {
      cls: "scenarist-input",
      placeholder: "\u041D\u0430\u043F\u0440\u0438\u043C\u0435\u0440: \u0410\u0440\u0442\u0435\u0444\u0430\u043A\u0442\u044B"
    });
    nameInput.value = this.currentLabel;
    const iconRow = contentEl.createDiv("scenarist-form-row");
    iconRow.createEl("label", { text: "\u0418\u043A\u043E\u043D\u043A\u0430", cls: "scenarist-label" });
    const pickerWrap = iconRow.createDiv("scenarist-icon-picker");
    const preview = pickerWrap.createDiv("scenarist-icon-preview");
    (0, import_obsidian.setIcon)(preview, this.selectedIcon);
    const grid = pickerWrap.createDiv("scenarist-icon-grid");
    for (const iconName of LUCIDE_PICKER_ICONS) {
      const cell = grid.createEl("button", {
        cls: `scenarist-icon-cell${iconName === this.selectedIcon ? " selected" : ""}`,
        attr: { type: "button", title: iconName }
      });
      (0, import_obsidian.setIcon)(cell, iconName);
      cell.onclick = () => {
        this.selectedIcon = iconName;
        preview.empty();
        (0, import_obsidian.setIcon)(preview, iconName);
        grid.querySelectorAll(".scenarist-icon-cell").forEach((b) => b.removeClass("selected"));
        cell.addClass("selected");
      };
    }
    const btns = contentEl.createDiv("scenarist-modal-buttons");
    btns.createEl("button", { cls: "scenarist-btn", text: "\u041E\u0442\u043C\u0435\u043D\u0430" }).onclick = () => this.close();
    const saveBtn = btns.createEl("button", { cls: "scenarist-btn-primary", text: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C" });
    saveBtn.onclick = () => {
      const label = nameInput.value.trim();
      if (!label) {
        nameInput.addClass("error");
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
};

// src/models/types.ts
var INDEX_VERSION = 2;
var NO_PROJECT = "__none__";

// src/models/schema.ts
var SCHEMAS = {
  project: {
    kind: "project",
    label: "\u041F\u0440\u043E\u0435\u043A\u0442",
    labelPlural: "\u041F\u0440\u043E\u0435\u043A\u0442\u044B",
    icon: "folder",
    folder: "",
    layer: "project",
    titleField: "Name",
    fields: [{ key: "summary", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", type: "text" }],
    links: []
  },
  work: {
    kind: "work",
    label: "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435",
    labelPlural: "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F",
    icon: "pen-line",
    folder: "",
    layer: "text",
    titleField: "Name",
    fields: [
      {
        key: "format",
        label: "\u0424\u043E\u0440\u043C\u0430\u0442",
        type: "select",
        required: true,
        options: [
          { value: "\u0421\u0435\u0440\u0438\u044F", color: "#9b59b6" },
          { value: "\u0412\u0430\u043D\u0448\u043E\u0442", color: "#4a9eff" }
        ]
      },
      {
        key: "type",
        label: "\u0422\u0438\u043F",
        type: "select",
        required: true,
        options: [
          { value: "\u0420\u0430\u0441\u0441\u043A\u0430\u0437", color: "#4a9eff" },
          { value: "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439", color: "#7ed321" }
        ]
      },
      {
        key: "status",
        label: "\u0421\u0442\u0430\u0442\u0443\u0441",
        type: "status",
        options: [
          { value: "\u041E\u0431\u044B\u0447\u043D\u043E\u0435", color: "#888" },
          { value: "\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435", color: "#f5c518" },
          { value: "\u0410\u0440\u0445\u0438\u0432", color: "#c0392b" }
        ]
      },
      { key: "summary", label: "\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", type: "text" }
    ],
    links: [
      { key: "project", label: "\u041F\u0440\u043E\u0435\u043A\u0442", target: "project", single: true },
      { key: "books", label: "\u041A\u043D\u0438\u0433\u0438", target: "book", reverse: "work" },
      { key: "arcs", label: "\u0410\u0440\u043A\u0438", target: "arc", reverse: "work" },
      { key: "anchors", label: "\u042F\u043A\u043E\u0440\u044F", target: "anchor", reverse: "work" }
    ]
  },
  book: {
    kind: "book",
    label: "\u041A\u043D\u0438\u0433\u0430",
    labelPlural: "\u041A\u043D\u0438\u0433\u0438",
    icon: "book-open",
    folder: "\u041A\u043D\u0438\u0433\u0438",
    layer: "text",
    titleField: "Name",
    fields: [
      {
        key: "genre",
        label: "\u0416\u0430\u043D\u0440",
        type: "multiselect",
        options: [
          { value: "\u041F\u0440\u0438\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0435", color: "#9b59b6" },
          { value: "\u041A\u043E\u043C\u0435\u0434\u0438\u044F", color: "#e67e22" },
          { value: "\u0422\u0440\u0438\u043B\u043B\u0435\u0440", color: "#f5a623" },
          { value: "\u0414\u0440\u0430\u043C\u0430", color: "#4a9eff" },
          { value: "\u0424\u044D\u043D\u0442\u0435\u0437\u0438", color: "#7ed321" },
          { value: "\u041D\u0430\u0443\u0447\u043D\u0430\u044F \u0444\u0430\u043D\u0442\u0430\u0441\u0442\u0438\u043A\u0430", color: "#00bcd4" },
          { value: "\u0425\u043E\u0440\u0440\u043E\u0440", color: "#c0392b" },
          { value: "\u0420\u043E\u043C\u0430\u043D\u0442\u0438\u043A\u0430", color: "#e84393" },
          { value: "\u0414\u0435\u0442\u0435\u043A\u0442\u0438\u0432", color: "#8b5a2b" },
          { value: "\u0411\u043E\u0435\u0432\u0438\u043A", color: "#f5a623" }
        ]
      },
      {
        key: "format",
        label: "\u0424\u043E\u0440\u043C\u0430\u0442",
        type: "select",
        required: true,
        options: [
          { value: "A4", color: "#c0392b" },
          { value: "WebToon", color: "#e67e22" }
        ]
      },
      { key: "audience", label: "\u0412\u043E\u0437\u0440\u0430\u0441\u0442\u043D\u0430\u044F \u0430\u0443\u0434\u0438\u0442\u043E\u0440\u0438\u044F", type: "number" },
      { key: "idea", label: "\u0418\u0434\u0435\u044F", type: "text" },
      { key: "synopsis", label: "\u0421\u0438\u043D\u043E\u043F\u0441\u0438\u0441", type: "text" },
      { key: "completed", label: "\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043D\u043E", type: "checkbox" }
    ],
    links: [
      { key: "work", label: "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435", target: "work", single: true, reverse: "books" },
      { key: "chapters", label: "\u0413\u043B\u0430\u0432\u044B", target: "chapter", reverse: "book" }
    ]
  },
  arc: {
    kind: "arc",
    label: "\u0410\u0440\u043A\u0430",
    labelPlural: "\u0410\u0440\u043A\u0438",
    icon: "git-branch",
    folder: "\u0410\u0440\u043A\u0438",
    layer: "text",
    titleField: "Name",
    fields: [
      { key: "goal", label: "\u0426\u0435\u043B\u044C", type: "text" },
      { key: "description", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", type: "text" }
    ],
    links: [
      { key: "work", label: "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435", target: "work", single: true, reverse: "arcs" },
      { key: "books", label: "\u041A\u043D\u0438\u0433\u0438", target: "book" },
      { key: "chapters", label: "\u0413\u043B\u0430\u0432\u044B", target: "chapter", reverse: "arc" },
      { key: "anchors", label: "\u042F\u043A\u043E\u0440\u044F", target: "anchor", reverse: "arc" },
      { key: "keyCharacters", label: "\u041A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438", target: "character" }
    ]
  },
  anchor: {
    kind: "anchor",
    label: "\u042F\u043A\u043E\u0440\u044C",
    labelPlural: "\u042F\u043A\u043E\u0440\u044F",
    icon: "anchor",
    folder: "\u042F\u043A\u043E\u0440\u044F",
    layer: "text",
    titleField: "Name",
    fields: [
      { key: "description", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F", type: "text" },
      { key: "date", label: "\u0414\u0430\u0442\u0430 / \u043C\u043E\u043C\u0435\u043D\u0442", type: "text" },
      { key: "order", label: "\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u043D\u0430 \u0442\u0430\u0439\u043C\u043B\u0430\u0439\u043D\u0435", type: "number" }
    ],
    links: [
      { key: "work", label: "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435", target: "work", single: true, reverse: "anchors" },
      { key: "arc", label: "\u0410\u0440\u043A\u0430", target: "arc", single: true, reverse: "anchors" },
      { key: "chapters", label: "\u0413\u043B\u0430\u0432\u044B", target: "chapter", reverse: "anchors" },
      { key: "characters", label: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438", target: "character" }
    ]
  },
  chapter: {
    kind: "chapter",
    label: "\u0413\u043B\u0430\u0432\u0430",
    labelPlural: "\u0413\u043B\u0430\u0432\u044B",
    icon: "scroll",
    folder: "\u0413\u043B\u0430\u0432\u044B",
    layer: "text",
    titleField: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435",
    fields: [
      {
        key: "status",
        label: "\u0421\u0442\u0430\u0442\u0443\u0441",
        type: "status",
        required: true,
        options: [
          { value: "\u0421\u043E\u0437\u0434\u0430\u043D\u043E", color: "#888" },
          { value: "\u0412 \u0440\u0430\u0431\u043E\u0442\u0435", color: "#4a9eff" },
          { value: "\u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A", color: "#f5a623" },
          { value: "\u0413\u043E\u0442\u043E\u0432\u043E", color: "#7ed321" },
          { value: "\u0410\u0440\u0445\u0438\u0432", color: "#c0392b" }
        ]
      },
      { key: "synopsis", label: "\u0421\u0438\u043D\u043E\u043F\u0441\u0438\u0441", type: "text" }
    ],
    links: [
      { key: "book", label: "\u041A\u043D\u0438\u0433\u0430", target: "book", single: true, reverse: "chapters" },
      { key: "arc", label: "\u0410\u0440\u043A\u0430", target: "arc", reverse: "chapters" },
      { key: "anchors", label: "\u042F\u043A\u043E\u0440\u044F", target: "anchor", reverse: "chapters" },
      { key: "characters", label: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438", target: "character", reverse: "chapters" }
    ]
  },
  page: {
    kind: "page",
    label: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430",
    labelPlural: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u044B",
    icon: "file-text",
    folder: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u044B",
    layer: "text",
    titleField: "Name",
    fields: [{ key: "archived", label: "\u0410\u0440\u0445\u0438\u0432", type: "checkbox" }],
    links: [
      { key: "chapter", label: "\u0413\u043B\u0430\u0432\u0430", target: "chapter", single: true, reverse: "pages" },
      { key: "characters", label: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438", target: "character", reverse: "pages" }
    ]
  },
  character: {
    kind: "character",
    label: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436",
    labelPlural: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438",
    icon: "user",
    folder: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438",
    layer: "world",
    titleField: "Name",
    fields: [
      {
        key: "type",
        label: "\u0422\u0438\u043F",
        type: "select",
        options: [
          { value: "\u041F\u0440\u043E\u0442\u0430\u0433\u043E\u043D\u0438\u0441\u0442", color: "#7ed321" },
          { value: "\u0410\u043D\u0442\u0430\u0433\u043E\u043D\u0438\u0441\u0442", color: "#c0392b" },
          { value: "\u041F\u0440\u0435\u0441\u0442\u0443\u043F\u043D\u0438\u043A", color: "#8b5a2b" },
          { value: "\u0421\u043E\u044E\u0437\u043D\u0438\u043A", color: "#4a9eff" },
          { value: "\u041D\u0435\u0439\u0442\u0440\u0430\u043B\u044C\u043D\u044B\u0439", color: "#9b59b6" }
        ]
      },
      {
        key: "role",
        label: "\u0420\u043E\u043B\u044C \u0432 \u0438\u0441\u0442\u043E\u0440\u0438\u0438",
        type: "select",
        options: [
          { value: "\u0413\u043B\u0430\u0432\u043D\u0430\u044F", color: "#7ed321" },
          { value: "\u041A\u043B\u044E\u0447\u0435\u0432\u0430\u044F", color: "#f5a623" },
          { value: "\u0412\u0442\u043E\u0440\u043E\u0441\u0442\u0435\u043F\u0435\u043D\u043D\u0430\u044F", color: "#4a9eff" },
          { value: "\u042D\u043F\u0438\u0437\u043E\u0434\u0438\u0447\u0435\u0441\u043A\u0430\u044F", color: "#e84393" }
        ]
      },
      { key: "age", label: "\u0412\u043E\u0437\u0440\u0430\u0441\u0442", type: "number" },
      { key: "activity", label: "\u0414\u0435\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C", type: "text" },
      { key: "summary", label: "\u041A\u0440\u0430\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", type: "text" }
    ],
    links: [
      { key: "project", label: "\u041F\u0440\u043E\u0435\u043A\u0442", target: "project", single: true },
      { key: "works", label: "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F", target: "work" },
      { key: "affiliation", label: "\u041F\u0440\u0438\u043D\u0430\u0434\u043B\u0435\u0436\u043D\u043E\u0441\u0442\u044C", target: "categoryItem", reverse: "members" },
      { key: "original", label: "\u041E\u0440\u0438\u0433\u0438\u043D\u0430\u043B", target: "character", single: true, reverse: "otherVersions" },
      { key: "otherVersions", label: "\u0412 \u0434\u0440\u0443\u0433\u0438\u0445 \u0438\u0441\u0442\u043E\u0440\u0438\u044F\u0445", target: "character", reverse: "original" }
    ]
  },
  category: {
    kind: "category",
    label: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",
    labelPlural: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438",
    icon: "tag",
    folder: "",
    layer: "world",
    titleField: "Name",
    fields: [{ key: "summary", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438", type: "text" }],
    links: [{ key: "project", label: "\u041F\u0440\u043E\u0435\u043A\u0442", target: "project", single: true }]
  },
  // Базовая схема элемента категории — поля/связи дополняются динамически.
  categoryItem: {
    kind: "categoryItem",
    label: "\u042D\u043B\u0435\u043C\u0435\u043D\u0442",
    labelPlural: "\u042D\u043B\u0435\u043C\u0435\u043D\u0442\u044B",
    icon: "circle-dot",
    folder: "",
    layer: "world",
    titleField: "Name",
    fields: [],
    links: [{ key: "works", label: "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F", target: "work" }]
  }
};
var CATEGORY_PRESETS = {
  organization: {
    icon: "building-2",
    preset: "organization",
    fields: [
      {
        key: "type",
        label: "\u0422\u0438\u043F",
        type: "select",
        options: [
          { value: "\u0421\u043B\u0435\u0434\u043E\u0432\u0430\u0442\u0435\u043B\u0438", color: "#f5a623" },
          { value: "\u041F\u0440\u0435\u0441\u0442\u0443\u043F\u043D\u0438\u043A\u0438", color: "#e84393" },
          { value: "\u0421\u041C\u0418", color: "#c0392b" },
          { value: "\u041C\u0435\u0436\u0434\u0443\u043D\u0430\u0440\u043E\u0434\u043D\u0430\u044F \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F", color: "#9b59b6" },
          { value: "\u0421\u043E\u0431\u0438\u0440\u0430\u0442\u0435\u043B\u044C\u043D\u0430\u044F \u0433\u0440\u0443\u043F\u043F\u0430", color: "#8b5a2b" },
          { value: "\u0414\u0440\u0443\u0433\u043E\u0435", color: "#7ed321" }
        ]
      },
      { key: "summary", label: "\u041A\u043E\u0440\u043E\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", type: "text" }
    ],
    linkDefs: [
      { key: "leader", label: "\u041B\u0438\u0434\u0435\u0440", target: "character", single: true },
      { key: "members", label: "\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438", target: "character", reverse: "affiliation" }
    ]
  },
  location: {
    icon: "map-pin",
    preset: "location",
    fields: [
      {
        key: "type",
        label: "\u0422\u0438\u043F",
        type: "select",
        options: [
          { value: "\u041B\u043E\u043A\u0430\u0446\u0438\u044F", color: "#f5a623" },
          { value: "\u0413\u043E\u0440\u043E\u0434", color: "#e67e22" },
          { value: "\u0420\u0430\u0439\u043E\u043D", color: "#e84393" },
          { value: "\u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E", color: "#7ed321" }
        ]
      },
      { key: "country", label: "\u0421\u0442\u0440\u0430\u043D\u0430", type: "text" },
      { key: "summary", label: "\u041A\u043E\u0440\u043E\u0442\u043A\u043E\u0435 \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", type: "text" }
    ],
    linkDefs: []
  },
  language: {
    icon: "languages",
    preset: "language",
    fields: [
      {
        key: "type",
        label: "\u0422\u0438\u043F",
        type: "select",
        options: [
          { value: "\u041E\u0444\u0438\u0446\u0438\u0430\u043B\u044C\u043D\u044B\u0439", color: "#4a9eff" },
          { value: "\u0414\u0438\u0430\u043B\u0435\u043A\u0442", color: "#f5a623" },
          { value: "\u041C\u0451\u0440\u0442\u0432\u044B\u0439", color: "#888" },
          { value: "\u0421\u043E\u0437\u0434\u0430\u043D\u043D\u044B\u0439", color: "#9b59b6" }
        ]
      },
      { key: "region", label: "\u0420\u0435\u0433\u0438\u043E\u043D", type: "text" },
      { key: "summary", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", type: "text" }
    ],
    linkDefs: []
  },
  custom: {
    icon: "shapes",
    preset: "custom",
    fields: [{ key: "summary", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", type: "text" }],
    linkDefs: []
  }
};
var PRESET_LABELS = {
  organization: "\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u044F",
  location: "\u041B\u043E\u043A\u0430\u0446\u0438\u044F",
  language: "\u042F\u0437\u044B\u043A",
  custom: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0430\u044F"
};
function resolveSchema(entity, store) {
  if (entity.kind === "categoryItem") {
    const catId = (entity.links["category"] || [])[0];
    const category = catId ? store.get(catId) : null;
    const def = category == null ? void 0 : category.categorySchema;
    const base = SCHEMAS.categoryItem;
    if (def) {
      return {
        icon: def.icon,
        label: category ? category.name : base.label,
        fields: def.fields,
        links: [...base.links, ...def.linkDefs]
      };
    }
    return { icon: base.icon, label: base.label, fields: base.fields, links: base.links };
  }
  const s = SCHEMAS[entity.kind];
  if (!s) {
    const base = SCHEMAS.categoryItem;
    return { icon: base.icon, label: entity.kind, fields: [], links: base.links };
  }
  return { icon: s.icon, label: s.label, fields: s.fields, links: s.links };
}
function findLinkDef(entity, key, store) {
  return resolveSchema(entity, store).links.find((l) => l.key === key) || null;
}

// src/models/ScenaristStore.ts
var INDEX_PATH = ".scenarist/index.json";
var ScenaristStore = class {
  constructor(plugin) {
    this.entities = /* @__PURE__ */ new Map();
    this.activeProjectId = NO_PROJECT;
    this.listeners = [];
    this.saveTimer = null;
    this.plugin = plugin;
  }
  // ---- подписки ----
  onChange(fn) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }
  notify() {
    this.listeners.forEach((fn) => fn());
  }
  // ---- доступ ----
  get(id) {
    return this.entities.get(id) || null;
  }
  all() {
    return Array.from(this.entities.values());
  }
  byKind(kind) {
    return this.all().filter((e) => e.kind === kind);
  }
  // ---- проекты ----
  getProjects() {
    return this.byKind("project");
  }
  getActiveProjectId() {
    return this.activeProjectId || NO_PROJECT;
  }
  getActiveProject() {
    const id = this.getActiveProjectId();
    return id === NO_PROJECT ? null : this.entities.get(id) || null;
  }
  setActiveProject(id) {
    this.activeProjectId = id;
    this.scheduleSave();
    this.notify();
  }
  /** Принадлежит ли сущность активному проекту (по связи project). */
  inActiveProject(e) {
    const pid = this.getActiveProjectId();
    const linked = e.links["project"] || [];
    if (pid === NO_PROJECT)
      return linked.length === 0;
    return linked.includes(pid);
  }
  /** Project-level сущности (work/character/category) активного проекта. */
  byKindForProject(kind) {
    return this.byKind(kind).filter((e) => this.inActiveProject(e));
  }
  // ---- категории ----
  categoryItems(categoryId) {
    return this.byKind("categoryItem").filter(
      (e) => (e.links["category"] || []).includes(categoryId)
    );
  }
  // ---- мутации ----
  create(kind, name) {
    const entity = {
      id: this.generateId(),
      kind,
      name,
      filePath: "",
      props: {},
      links: {},
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    this.entities.set(entity.id, entity);
    this.attachToActiveProject(entity);
    this.scheduleSave();
    this.notify();
    return entity;
  }
  createProject(name) {
    const p = {
      id: this.generateId(),
      kind: "project",
      name,
      filePath: "",
      props: {},
      links: {},
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    this.entities.set(p.id, p);
    this.activeProjectId = p.id;
    this.scheduleSave();
    this.notify();
    return p;
  }
  createCategory(preset, name) {
    const def = CATEGORY_PRESETS[preset];
    const cat = this.create("category", name);
    cat.categorySchema = {
      icon: def.icon,
      preset: def.preset,
      fields: def.fields.map((f) => ({ ...f })),
      linkDefs: def.linkDefs.map((l) => ({ ...l }))
    };
    this.scheduleSave();
    this.notify();
    return cat;
  }
  createItem(categoryId, name) {
    const item = this.create("categoryItem", name);
    this.setLink(item.id, "category", [categoryId]);
    return item;
  }
  /** Привязать project-level сущность к активному проекту. */
  attachToActiveProject(e) {
    const projectScoped = ["work", "character", "category", "categoryItem"];
    if (!projectScoped.includes(e.kind))
      return;
    const pid = this.getActiveProjectId();
    if (pid !== NO_PROJECT)
      e.links["project"] = [pid];
  }
  rename(id, name) {
    const e = this.entities.get(id);
    if (!e)
      return;
    e.name = name;
    e.updatedAt = Date.now();
    this.scheduleSave();
    this.notify();
  }
  setProp(id, key, value) {
    const e = this.entities.get(id);
    if (!e)
      return;
    e.props[key] = value;
    e.updatedAt = Date.now();
    this.scheduleSave();
    this.notify();
  }
  setFilePath(id, filePath) {
    const e = this.entities.get(id);
    if (!e)
      return;
    e.filePath = filePath;
    this.scheduleSave();
  }
  /** Установить связь с поддержкой реципрокности (LinkDef.reverse). */
  setLink(id, key, targetIds) {
    const e = this.entities.get(id);
    if (!e)
      return;
    const prev = e.links[key] || [];
    const removed = prev.filter((t) => !targetIds.includes(t));
    const added = targetIds.filter((t) => !prev.includes(t));
    e.links[key] = [...targetIds];
    e.updatedAt = Date.now();
    const def = findLinkDef(e, key, this);
    const reverse = def == null ? void 0 : def.reverse;
    if (reverse) {
      for (const tid of added)
        this.addReverse(tid, reverse, id);
      for (const tid of removed)
        this.removeReverse(tid, reverse, id);
    }
    this.scheduleSave();
    this.notify();
  }
  addReverse(id, key, value) {
    const e = this.entities.get(id);
    if (!e)
      return;
    const cur = new Set(e.links[key] || []);
    cur.add(value);
    e.links[key] = Array.from(cur);
    e.updatedAt = Date.now();
  }
  removeReverse(id, key, value) {
    const e = this.entities.get(id);
    if (!e)
      return;
    e.links[key] = (e.links[key] || []).filter((v) => v !== value);
    e.updatedAt = Date.now();
  }
  delete(id) {
    const e = this.entities.get(id);
    if (!e)
      return;
    if (e.kind === "category") {
      for (const item of this.categoryItems(id))
        this.delete(item.id);
    }
    for (const key of Object.keys(e.links)) {
      const def = findLinkDef(e, key, this);
      if (def == null ? void 0 : def.reverse) {
        for (const tid of e.links[key])
          this.removeReverse(tid, def.reverse, id);
      }
    }
    for (const other of this.entities.values()) {
      for (const key of Object.keys(other.links)) {
        if (other.links[key].includes(id)) {
          other.links[key] = other.links[key].filter((v) => v !== id);
        }
      }
    }
    this.entities.delete(id);
    if (this.activeProjectId === id)
      this.activeProjectId = NO_PROJECT;
    this.scheduleSave();
    this.notify();
  }
  findByPath(path) {
    for (const e of this.entities.values())
      if (e.filePath === path)
        return e;
    return null;
  }
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
  }
  schema(kind) {
    return SCHEMAS[kind];
  }
  resolved(entity) {
    return resolveSchema(entity, this);
  }
  // ---- персистентность ----
  async load() {
    try {
      const raw = await this.plugin.app.vault.adapter.read(INDEX_PATH);
      const data = JSON.parse(raw);
      this.entities.clear();
      (data.entities || []).forEach((e) => {
        e.props = e.props || {};
        e.links = e.links || {};
        this.entities.set(e.id, e);
      });
      this.activeProjectId = data.activeProjectId || NO_PROJECT;
      this.migrateCategoryIcons();
    } catch (e) {
    }
    this.notify();
  }
  /** Мигрирует старые emoji-иконки в categorySchema.icon → Lucide-имена. */
  migrateCategoryIcons() {
    const emojiMap = {
      "\u265B": "building-2",
      "\u{1F4CD}": "map-pin",
      "\u{1F310}": "languages",
      "\u2B21": "shapes",
      "\u{1F5C2}": "tag"
    };
    let changed = false;
    for (const entity of this.entities.values()) {
      if (entity.kind === "category" && entity.categorySchema) {
        const mapped = emojiMap[entity.categorySchema.icon];
        if (mapped) {
          entity.categorySchema.icon = mapped;
          changed = true;
        }
      }
    }
    if (changed)
      this.scheduleSave();
  }
  scheduleSave() {
    if (this.saveTimer !== null)
      window.clearTimeout(this.saveTimer);
    this.saveTimer = window.setTimeout(() => this.save(), 400);
  }
  async save() {
    const index = {
      version: INDEX_VERSION,
      activeProjectId: this.activeProjectId,
      entities: this.all()
    };
    const adapter = this.plugin.app.vault.adapter;
    try {
      if (!await adapter.exists(".scenarist"))
        await adapter.mkdir(".scenarist");
      await adapter.write(INDEX_PATH, JSON.stringify(index, null, 2));
    } catch (e) {
      console.error("Scenarist: \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0438\u043D\u0434\u0435\u043A\u0441", e);
    }
  }
};

// src/sync/SyncEngine.ts
var import_obsidian2 = require("obsidian");

// src/templates/index.ts
function bodyTemplate(kind, name) {
  switch (kind) {
    case "character":
      return characterBody(name);
    case "project":
      return `# ${name}

## \u041E \u043F\u0440\u043E\u0435\u043A\u0442\u0435
> *\u0427\u0442\u043E \u044D\u0442\u043E \u0437\u0430 \u0432\u0441\u0435\u043B\u0435\u043D\u043D\u0430\u044F / \u0441\u0431\u043E\u0440\u043D\u0438\u043A \u0438\u0441\u0442\u043E\u0440\u0438\u0439.*

## \u0417\u0430\u043C\u0435\u0442\u043A\u0438
- 
`;
    case "work":
      return `# ${name}

## \u041B\u043E\u0433\u043B\u0430\u0439\u043D
> *\u041E\u0434\u043D\u043E \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435, \u043E \u0447\u0451\u043C \u044D\u0442\u043E.*

## \u0422\u0435\u043C\u044B
- 
`;
    case "book":
      return `# ${name}

## \u0421\u0438\u043D\u043E\u043F\u0441\u0438\u0441

## \u0418\u0434\u0435\u044F

`;
    case "arc":
      return `# ${name}

## \u0426\u0435\u043B\u044C \u0430\u0440\u043A\u0438

## \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435

## \u041A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F
- 
`;
    case "anchor":
      return `# ${name}

## \u0427\u0442\u043E \u043F\u0440\u043E\u0438\u0441\u0445\u043E\u0434\u0438\u0442
> *\u0421\u0443\u0442\u044C \u043A\u043B\u044E\u0447\u0435\u0432\u043E\u0433\u043E \u0441\u043E\u0431\u044B\u0442\u0438\u044F.*

## \u041F\u043E\u0441\u043B\u0435\u0434\u0441\u0442\u0432\u0438\u044F
- 
`;
    case "chapter":
      return `# ${name}

## \u0421\u0438\u043D\u043E\u043F\u0441\u0438\u0441

---

## \u0421\u0446\u0435\u043D\u0430

> *\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435 \u043E\u0431\u0441\u0442\u0430\u043D\u043E\u0432\u043A\u0438.*

`;
    case "page":
      return `# ${name}

> *\u0421\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B / \u0440\u0430\u0441\u043A\u0430\u0434\u0440\u043E\u0432\u043A\u0430.*

`;
    case "categoryItem":
      return `# ${name}

## \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435

## \u0414\u0435\u0442\u0430\u043B\u0438

`;
    default:
      return `# ${name}
`;
  }
}
function characterBody(name) {
  return `# ${name}

> [!info] \u0425\u0430\u0440\u0430\u043A\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043A\u0430
> *\u041A\u0442\u043E \u044D\u0442\u043E \u0432 \u043E\u0434\u043D\u043E\u043C \u0430\u0431\u0437\u0430\u0446\u0435.*

> [!note] \u0411\u0438\u043E\u0433\u0440\u0430\u0444\u0438\u044F
> *\u041A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u0432\u0435\u0445\u0438 \u0436\u0438\u0437\u043D\u0438.*

> [!abstract] \u0412\u043D\u0435\u0448\u043D\u043E\u0441\u0442\u044C
> *\u041A\u0430\u043A \u0432\u044B\u0433\u043B\u044F\u0434\u0438\u0442.*

---

## \u041D\u0430\u0441\u0442\u043E\u044F\u0449\u0435\u0435 \u0438\u043C\u044F


## \u041C\u0435\u0441\u0442\u043E \u0438 \u0434\u0430\u0442\u0430 \u0440\u043E\u0436\u0434\u0435\u043D\u0438\u044F (\u0432\u043E\u0437\u0440\u0430\u0441\u0442)


## \u0421\u0435\u043C\u044C\u044F \u0438 \u043E\u0442\u043D\u043E\u0448\u0435\u043D\u0438\u044F


## \u0412\u0438\u0437\u0443\u0430\u043B \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430

`;
}

// src/sync/SyncEngine.ts
var SyncEngine = class {
  constructor(plugin) {
    this.selfWrites = /* @__PURE__ */ new Set();
    this.plugin = plugin;
  }
  get store() {
    return this.plugin.store;
  }
  get vault() {
    return this.plugin.app.vault;
  }
  // ---- обход графа вверх ----
  single(ids) {
    if (!ids || ids.length === 0)
      return null;
    return this.store.get(ids[0]);
  }
  ownerWork(e) {
    switch (e.kind) {
      case "work":
        return e;
      case "book":
      case "arc":
      case "anchor":
        return this.single(e.links["work"]);
      case "chapter": {
        const b = this.single(e.links["book"]);
        return b ? this.single(b.links["work"]) : null;
      }
      case "page": {
        const c = this.single(e.links["chapter"]);
        const b = c ? this.single(c.links["book"]) : null;
        return b ? this.single(b.links["work"]) : null;
      }
      default:
        return null;
    }
  }
  ownerProjectName(e) {
    let pid = null;
    if (e.kind === "project")
      pid = e.id;
    else if ((e.links["project"] || []).length)
      pid = e.links["project"][0];
    else {
      const w = this.ownerWork(e);
      pid = w ? (w.links["project"] || [])[0] || null : null;
    }
    const p = pid ? this.store.get(pid) : null;
    return p ? this.safe(p.name) : "_\u0411\u0435\u0437 \u043F\u0440\u043E\u0435\u043A\u0442\u0430";
  }
  safe(name) {
    return name.replace(/[\\/:*?"<>|]/g, "-").trim() || "\u0411\u0435\u0437 \u0438\u043C\u0435\u043D\u0438";
  }
  /** Путь к заметке сущности. */
  buildPath(entity) {
    const root = this.plugin.settings.rootFolder || "Scenarist";
    const proj = this.ownerProjectName(entity);
    const projFolder = `${root}/${proj}`;
    const name = this.safe(entity.name);
    switch (entity.kind) {
      case "project":
        return (0, import_obsidian2.normalizePath)(`${projFolder}/${name}.md`);
      case "work":
        return (0, import_obsidian2.normalizePath)(`${projFolder}/${name}/${name}.md`);
      case "character":
        return (0, import_obsidian2.normalizePath)(`${projFolder}/\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438/${name}.md`);
      case "category":
        return (0, import_obsidian2.normalizePath)(`${projFolder}/${name}/${name}.md`);
      case "categoryItem": {
        const cat = this.single(entity.links["category"]);
        const catName = cat ? this.safe(cat.name) : "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F";
        return (0, import_obsidian2.normalizePath)(`${projFolder}/${catName}/${name}.md`);
      }
      default: {
        const work = this.ownerWork(entity);
        const workName = work ? this.safe(work.name) : "_\u0411\u0435\u0437 \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F";
        const folder = SCHEMAS[entity.kind].folder;
        return (0, import_obsidian2.normalizePath)(`${projFolder}/${workName}/${folder}/${name}.md`);
      }
    }
  }
  async ensureNote(entity) {
    const path = this.buildPath(entity);
    this.store.setFilePath(entity.id, path);
    let file = this.vault.getAbstractFileByPath(path);
    if (!file) {
      await this.ensureFolder(path);
      const content = this.buildFrontmatter(entity) + bodyTemplate(entity.kind, entity.name);
      this.selfWrites.add(path);
      file = await this.vault.create(path, content);
    } else if (file instanceof import_obsidian2.TFile) {
      await this.syncToNote(entity);
    }
    return file instanceof import_obsidian2.TFile ? file : null;
  }
  async syncToNote(entity) {
    const file = this.vault.getAbstractFileByPath(entity.filePath);
    if (!(file instanceof import_obsidian2.TFile))
      return;
    const old = await this.vault.read(file);
    const body = this.stripFrontmatter(old);
    const next = this.buildFrontmatter(entity) + body;
    if (next === old)
      return;
    this.selfWrites.add(entity.filePath);
    await this.vault.modify(file, next);
  }
  async openNote(entity) {
    const file = await this.ensureNote(entity);
    if (file)
      await this.plugin.app.workspace.getLeaf(false).openFile(file);
  }
  handleModify(file) {
    var _a, _b;
    if (this.selfWrites.has(file.path)) {
      this.selfWrites.delete(file.path);
      return;
    }
    const entity = this.store.findByPath(file.path);
    if (!entity)
      return;
    const fm = (_a = this.plugin.app.metadataCache.getFileCache(file)) == null ? void 0 : _a.frontmatter;
    if (!fm)
      return;
    const fields = this.store.resolved(entity).fields;
    let changed = false;
    for (const field of fields) {
      if (field.key in fm && entity.props[field.key] !== fm[field.key]) {
        entity.props[field.key] = (_b = fm[field.key]) != null ? _b : null;
        changed = true;
      }
    }
    if (changed)
      this.store.save();
  }
  handleRename(file, oldPath) {
    const entity = this.store.findByPath(oldPath);
    if (entity)
      this.store.setFilePath(entity.id, file.path);
  }
  // ---- frontmatter ----
  buildFrontmatter(entity) {
    const schema = this.store.resolved(entity);
    const lines = ["---", `scenarist_id: ${entity.id}`, `kind: ${entity.kind}`];
    for (const field of schema.fields) {
      const v = entity.props[field.key];
      if (v === void 0 || v === null || v === "")
        continue;
      lines.push(`${field.key}: ${this.yaml(v)}`);
    }
    for (const link of schema.links) {
      if (link.target === "project")
        continue;
      const ids = entity.links[link.key] || [];
      const names = ids.map((id) => this.store.get(id)).filter((e) => !!e).map((e) => `"[[${e.name}]]"`);
      if (names.length)
        lines.push(`${link.key}: [${names.join(", ")}]`);
    }
    lines.push("---", "");
    return lines.join("\n");
  }
  yaml(v) {
    if (typeof v === "number" || typeof v === "boolean")
      return String(v);
    const s = String(v);
    return /[:#\[\]{}"'\n]/.test(s) ? JSON.stringify(s) : s;
  }
  stripFrontmatter(content) {
    if (content.startsWith("---")) {
      const end = content.indexOf("\n---", 3);
      if (end !== -1) {
        const after = content.indexOf("\n", end + 1);
        return after !== -1 ? content.slice(after + 1) : "";
      }
    }
    return content;
  }
  async ensureFolder(filePath) {
    const dir = filePath.split("/").slice(0, -1).join("/");
    if (!dir)
      return;
    let cur = "";
    for (const part of dir.split("/")) {
      cur = cur ? `${cur}/${part}` : part;
      if (!await this.vault.adapter.exists(cur)) {
        try {
          await this.vault.createFolder(cur);
        } catch (e) {
        }
      }
    }
  }
};

// src/views/NavigatorView.ts
var import_obsidian6 = require("obsidian");

// src/modals/CreateEntityModal.ts
var import_obsidian3 = require("obsidian");
var CreateEntityModal = class extends import_obsidian3.Modal {
  constructor(app, plugin, opts) {
    super(app);
    this.plugin = plugin;
    this.opts = opts;
  }
  defs() {
    if (this.opts.kind === "categoryItem" && this.opts.categoryId) {
      const cat = this.plugin.store.get(this.opts.categoryId);
      const def = cat == null ? void 0 : cat.categorySchema;
      return {
        icon: (def == null ? void 0 : def.icon) || "\u2B21",
        label: cat ? cat.name : "\u042D\u043B\u0435\u043C\u0435\u043D\u0442",
        fields: (def == null ? void 0 : def.fields) || [],
        links: [...SCHEMAS.categoryItem.links, ...(def == null ? void 0 : def.linkDefs) || []]
      };
    }
    const s = SCHEMAS[this.opts.kind];
    return { icon: s.icon, label: s.label, fields: s.fields, links: s.links };
  }
  onOpen() {
    var _a;
    const { contentEl } = this;
    const { icon, label, fields, links } = this.defs();
    const hidden = /* @__PURE__ */ new Set(["project", "category"]);
    (this.opts.parentLinks || []).forEach((p) => hidden.add(p.key));
    contentEl.addClass("scenarist-modal");
    contentEl.createEl("h2", {
      text: `${icon} ${this.opts.titleHint || "\u041D\u043E\u0432\u044B\u0439: " + label}`,
      cls: "scenarist-modal-title"
    });
    const nameRow = contentEl.createDiv("scenarist-form-row");
    nameRow.createEl("label", { text: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435", cls: "scenarist-label" });
    const nameInput = nameRow.createEl("input", {
      cls: "scenarist-input",
      placeholder: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u2026"
    });
    const fieldInputs = {};
    for (const field of fields) {
      if (field.type === "multiselect")
        continue;
      const row = contentEl.createDiv("scenarist-form-row");
      row.createEl("label", { text: field.label, cls: "scenarist-label" });
      if (field.type === "select" || field.type === "status") {
        const sel = row.createEl("select", { cls: "scenarist-select" });
        if (!field.required)
          sel.createEl("option", { value: "", text: "\u2014" });
        (field.options || []).forEach(
          (o) => sel.createEl("option", { value: o.value, text: o.value })
        );
        if (field.required && ((_a = field.options) == null ? void 0 : _a.length))
          sel.value = field.options[0].value;
        fieldInputs[field.key] = sel;
      } else if (field.type === "checkbox") {
        const cb = row.createEl("input");
        cb.type = "checkbox";
        fieldInputs[field.key] = cb;
      } else {
        const inp = row.createEl("input", { cls: "scenarist-input" });
        inp.type = field.type === "number" ? "number" : "text";
        fieldInputs[field.key] = inp;
      }
    }
    const linkInputs = {};
    for (const link of links) {
      if (hidden.has(link.key))
        continue;
      const candidates = this.plugin.store.byKind(link.target);
      if (candidates.length === 0)
        continue;
      const row = contentEl.createDiv("scenarist-form-row");
      row.createEl("label", {
        text: link.label + (link.single ? "" : " (\u043C\u043E\u0436\u043D\u043E \u043D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E)"),
        cls: "scenarist-label"
      });
      const sel = row.createEl("select", { cls: "scenarist-select" });
      sel.multiple = !link.single;
      sel.size = link.single ? 1 : Math.min(4, candidates.length);
      if (link.single)
        sel.createEl("option", { value: "", text: "\u2014" });
      candidates.forEach((c) => sel.createEl("option", { value: c.id, text: c.name }));
      linkInputs[link.key] = sel;
    }
    const btns = contentEl.createDiv("scenarist-modal-buttons");
    btns.createEl("button", { cls: "scenarist-btn", text: "\u041E\u0442\u043C\u0435\u043D\u0430" }).onclick = () => this.close();
    const createBtn = btns.createEl("button", {
      cls: "scenarist-btn-primary",
      text: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C"
    });
    createBtn.onclick = async () => {
      const name = nameInput.value.trim();
      if (!name) {
        nameInput.addClass("error");
        return;
      }
      const store = this.plugin.store;
      let entity;
      if (this.opts.kind === "project") {
        entity = store.createProject(name);
      } else if (this.opts.kind === "categoryItem" && this.opts.categoryId) {
        entity = store.createItem(this.opts.categoryId, name);
      } else {
        entity = store.create(this.opts.kind, name);
      }
      for (const p of this.opts.parentLinks || [])
        store.setLink(entity.id, p.key, [p.id]);
      for (const [k, v] of Object.entries(this.opts.presetProps || {}))
        store.setProp(entity.id, k, v);
      for (const field of fields) {
        const el = fieldInputs[field.key];
        if (!el)
          continue;
        if (field.type === "checkbox") {
          store.setProp(entity.id, field.key, el.checked);
        } else if (field.type === "number") {
          const n = parseFloat(el.value);
          if (!isNaN(n))
            store.setProp(entity.id, field.key, n);
        } else if (el.value) {
          store.setProp(entity.id, field.key, el.value);
        }
      }
      for (const link of links) {
        const sel = linkInputs[link.key];
        if (!sel)
          continue;
        const ids = Array.from(sel.selectedOptions).map((o) => o.value).filter(Boolean);
        if (ids.length)
          store.setLink(entity.id, link.key, ids);
      }
      if (this.plugin.settings.autoCreateNotes) {
        await this.plugin.sync.ensureNote(store.get(entity.id));
      }
      this.plugin.navigateTo(entity.id);
      new import_obsidian3.Notice(`\u0421\u043E\u0437\u0434\u0430\u043D\u043E: ${name}`);
      this.close();
    };
    nameInput.focus();
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/CreateWorkModal.ts
var import_obsidian4 = require("obsidian");
var CreateWorkModal = class extends import_obsidian4.Modal {
  constructor(app, plugin) {
    super(app);
    this.plugin = plugin;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.addClass("scenarist-modal");
    contentEl.createEl("h2", { text: "\u041D\u043E\u0432\u043E\u0435 \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435", cls: "scenarist-modal-title" });
    const fmtRow = contentEl.createDiv("scenarist-form-row");
    fmtRow.createEl("label", { text: "\u0424\u043E\u0440\u043C\u0430\u0442", cls: "scenarist-label" });
    const fmtWrap = fmtRow.createDiv("scenarist-choice");
    let format = "\u0421\u0435\u0440\u0438\u044F";
    const mkChoice = (val, desc) => {
      const b = fmtWrap.createEl("button", { cls: "scenarist-choice-btn", text: "" });
      b.createEl("div", { cls: "scenarist-choice-title", text: val });
      b.createEl("div", { cls: "scenarist-choice-desc", text: desc });
      if (val === format)
        b.addClass("active");
      b.onclick = () => {
        format = val;
        fmtWrap.querySelectorAll(".scenarist-choice-btn").forEach(
          (e) => e.removeClass("active")
        );
        b.addClass("active");
      };
    };
    mkChoice("\u0421\u0435\u0440\u0438\u044F", "\u041D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043A\u043D\u0438\u0433 (\u0442\u043E\u043C\u043E\u0432)");
    mkChoice("\u0412\u0430\u043D\u0448\u043E\u0442", "\u041E\u0434\u043D\u0430 \u043A\u043D\u0438\u0433\u0430");
    const typeRow = contentEl.createDiv("scenarist-form-row");
    typeRow.createEl("label", { text: "\u0422\u0438\u043F", cls: "scenarist-label" });
    const typeSel = typeRow.createEl("select", { cls: "scenarist-select" });
    ["\u0420\u0430\u0441\u0441\u043A\u0430\u0437", "\u0421\u0446\u0435\u043D\u0430\u0440\u0438\u0439"].forEach((t) => typeSel.createEl("option", { value: t, text: t }));
    const nameRow = contentEl.createDiv("scenarist-form-row");
    nameRow.createEl("label", { text: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435", cls: "scenarist-label" });
    const nameInput = nameRow.createEl("input", {
      cls: "scenarist-input",
      placeholder: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F\u2026"
    });
    const btns = contentEl.createDiv("scenarist-modal-buttons");
    btns.createEl("button", { cls: "scenarist-btn", text: "\u041E\u0442\u043C\u0435\u043D\u0430" }).onclick = () => this.close();
    const createBtn = btns.createEl("button", {
      cls: "scenarist-btn-primary",
      text: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C"
    });
    createBtn.onclick = async () => {
      const name = nameInput.value.trim();
      if (!name) {
        nameInput.addClass("error");
        return;
      }
      const store = this.plugin.store;
      const work = store.create("work", name);
      store.setProp(work.id, "format", format);
      store.setProp(work.id, "type", typeSel.value);
      if (format === "\u0412\u0430\u043D\u0448\u043E\u0442") {
        const book = store.create("book", name);
        store.setLink(book.id, "work", [work.id]);
        if (this.plugin.settings.autoCreateNotes)
          await this.plugin.sync.ensureNote(store.get(book.id));
      }
      if (this.plugin.settings.autoCreateNotes)
        await this.plugin.sync.ensureNote(store.get(work.id));
      this.plugin.navigateTo(work.id);
      new import_obsidian4.Notice(`\u0421\u043E\u0437\u0434\u0430\u043D\u043E \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435: ${name}`);
      this.close();
    };
    nameInput.focus();
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/modals/CreateCategoryModal.ts
var import_obsidian5 = require("obsidian");
var CreateCategoryModal = class extends import_obsidian5.Modal {
  constructor(app, plugin, defaultPreset) {
    super(app);
    this.plugin = plugin;
    this.defaultPreset = defaultPreset;
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.addClass("scenarist-modal");
    const fixedPreset = this.defaultPreset;
    const def = fixedPreset ? CATEGORY_PRESETS[fixedPreset] : null;
    contentEl.createEl("h2", {
      text: def ? `\u041D\u043E\u0432\u0430\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F: ${PRESET_LABELS[fixedPreset]}` : "\u041D\u043E\u0432\u0430\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",
      cls: "scenarist-modal-title"
    });
    let preset = fixedPreset || "organization";
    const nameInputHolder = {};
    if (!fixedPreset) {
      const presetRow = contentEl.createDiv("scenarist-form-row");
      presetRow.createEl("label", { text: "\u0422\u0438\u043F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438", cls: "scenarist-label" });
      const wrap = presetRow.createDiv("scenarist-choice");
      const PRESETS = [
        ["organization", "\u041F\u043E\u043B\u044F: \u0442\u0438\u043F, \u043B\u0438\u0434\u0435\u0440, \u0443\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438"],
        ["location", "\u041F\u043E\u043B\u044F: \u0442\u0438\u043F, \u0441\u0442\u0440\u0430\u043D\u0430"],
        ["language", "\u041F\u043E\u043B\u044F: \u0442\u0438\u043F, \u0440\u0435\u0433\u0438\u043E\u043D"],
        ["custom", "\u041F\u0443\u0441\u0442\u0430\u044F, \u043F\u043E\u043B\u044F \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u0435 \u043F\u043E\u0437\u0436\u0435"]
      ];
      const mk = (p, desc) => {
        const pDef = CATEGORY_PRESETS[p];
        const b = wrap.createEl("button", { cls: "scenarist-choice-btn" });
        b.createEl("div", { cls: "scenarist-choice-title", text: `${pDef.icon} ${PRESET_LABELS[p]}` });
        b.createEl("div", { cls: "scenarist-choice-desc", text: desc });
        if (p === preset)
          b.addClass("active");
        b.onclick = () => {
          preset = p;
          wrap.querySelectorAll(".scenarist-choice-btn").forEach((e) => e.removeClass("active"));
          b.addClass("active");
          if (nameInputHolder.el && !nameInputHolder.el.value)
            nameInputHolder.el.placeholder = `\u041D\u0430\u043F\u0440. \xAB${PRESET_LABELS[p]}\xBB\u2026`;
        };
      };
      for (const [p, desc] of PRESETS)
        mk(p, desc);
    }
    const nameRow = contentEl.createDiv("scenarist-form-row");
    nameRow.createEl("label", { text: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438", cls: "scenarist-label" });
    const nameInput = nameRow.createEl("input", {
      cls: "scenarist-input",
      placeholder: fixedPreset ? `\u041D\u0430\u043F\u0440. \xAB${PRESET_LABELS[fixedPreset]}\xBB\u2026` : "\u041D\u0430\u043F\u0440. \xAB\u041E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438\xBB, \xAB\u041B\u043E\u043A\u0430\u0446\u0438\u0438\xBB\u2026"
    });
    nameInputHolder.el = nameInput;
    const btns = contentEl.createDiv("scenarist-modal-buttons");
    btns.createEl("button", { cls: "scenarist-btn", text: "\u041E\u0442\u043C\u0435\u043D\u0430" }).onclick = () => this.close();
    const createBtn = btns.createEl("button", {
      cls: "scenarist-btn-primary",
      text: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C"
    });
    createBtn.onclick = async () => {
      const name = nameInput.value.trim();
      if (!name) {
        nameInput.addClass("error");
        return;
      }
      const cat = this.plugin.store.createCategory(preset, name);
      if (this.plugin.settings.autoCreateNotes)
        await this.plugin.sync.ensureNote(this.plugin.store.get(cat.id));
      this.plugin.navigateTo(cat.id);
      new import_obsidian5.Notice(`\u0421\u043E\u0437\u0434\u0430\u043D\u0430 \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F: ${name}`);
      this.close();
    };
    nameInput.focus();
  }
  onClose() {
    this.contentEl.empty();
  }
};

// src/views/NavigatorView.ts
var NAVIGATOR_VIEW = "scenarist-navigator";
var CHAR_ROLES = ["\u0413\u043B\u0430\u0432\u043D\u0430\u044F", "\u041A\u043B\u044E\u0447\u0435\u0432\u0430\u044F", "\u0412\u0442\u043E\u0440\u043E\u0441\u0442\u0435\u043F\u0435\u043D\u043D\u0430\u044F", "\u042D\u043F\u0438\u0437\u043E\u0434\u0438\u0447\u0435\u0441\u043A\u0430\u044F"];
var ENTITY_ICON = {
  work: "pen-line",
  book: "book-open",
  arc: "git-branch",
  anchor: "anchor",
  chapter: "scroll",
  character: "user",
  project: "folder",
  page: "file-text",
  category: "tag",
  categoryItem: "circle-dot"
};
var NavigatorView = class extends import_obsidian6.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.unsub = [];
    this.expanded = /* @__PURE__ */ new Set();
    this.search = "";
    this.tab = "work";
    this.plugin = plugin;
  }
  getViewType() {
    return NAVIGATOR_VIEW;
  }
  getDisplayText() {
    return "Scenarist";
  }
  getIcon() {
    return "film";
  }
  async onOpen() {
    this.unsub.push(this.plugin.store.onChange(() => this.render()));
    this.unsub.push(this.plugin.onSelect(() => this.render()));
    this.render();
  }
  async onClose() {
    this.unsub.forEach((u) => u());
  }
  get store() {
    return this.plugin.store;
  }
  enabledQuickTypes() {
    return (this.plugin.settings.categoryQuickTypes || []).filter((t) => t.enabled);
  }
  resolveTab() {
    const valid = /* @__PURE__ */ new Set(["work", "character", ...this.enabledQuickTypes().map((t) => t.id)]);
    if (!valid.has(this.tab))
      this.tab = "work";
  }
  matches(e) {
    return !this.search || e.name.toLowerCase().includes(this.search.toLowerCase());
  }
  isOpen(key) {
    return this.expanded.has(key) || this.search.length > 0;
  }
  toggle(key) {
    if (this.expanded.has(key))
      this.expanded.delete(key);
    else
      this.expanded.add(key);
    this.render();
  }
  // ── Вставить иконку: Lucide-имя или короткий emoji ──────────────────────
  typeIcon(parent, iconOrEmoji) {
    const span = parent.createEl("span", { cls: "scenarist-type-icon" });
    if ([...iconOrEmoji].length <= 2) {
      span.textContent = iconOrEmoji;
    } else {
      (0, import_obsidian6.setIcon)(span, iconOrEmoji);
    }
    return span;
  }
  render() {
    var _a;
    this.resolveTab();
    const searchWasFocused = ((_a = document.activeElement) == null ? void 0 : _a.classList.contains("scenarist-search")) === true;
    const c = this.containerEl.children[1];
    c.empty();
    c.addClass("scenarist-panel", "scenarist-navigator");
    this.renderSearch(c);
    this.renderProjectBar(c);
    this.renderTabs(c);
    const body = c.createDiv("scenarist-nav-body");
    if (this.search.trim()) {
      this.renderAllSearchResults(body);
    } else if (this.tab === "work") {
      this.renderWorkTab(body);
    } else if (this.tab === "character") {
      this.renderCharacterTab(body);
    } else {
      const qt = this.enabledQuickTypes().find((t) => t.id === this.tab);
      if (qt)
        this.renderCategoryTypeTab(body, qt);
    }
    if (searchWasFocused) {
      const inp = c.querySelector(".scenarist-search");
      if (inp) {
        inp.focus();
        inp.setSelectionRange(inp.value.length, inp.value.length);
      }
    }
  }
  // ── поиск ──────────────────────────────────────────────────────────────────
  renderSearch(c) {
    const wrap = c.createDiv("scenarist-search-wrap");
    const input = wrap.createEl("input", {
      cls: "scenarist-search",
      placeholder: "\u041F\u043E\u0438\u0441\u043A\u2026",
      type: "text"
    });
    input.value = this.search;
    input.oninput = () => {
      this.search = input.value;
      this.render();
    };
  }
  // ── результаты поиска по всем разделам ─────────────────────────────────────
  renderAllSearchResults(body) {
    let totalFound = 0;
    const works = this.store.byKindForProject("work").filter((w) => this.workHasMatch(w));
    if (works.length > 0) {
      this.searchSectionTitle(body, "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F");
      for (const work of works)
        this.renderWorkBlock(body, work);
      totalFound += works.length;
    }
    const chars = this.store.byKindForProject("character").filter((c) => this.matches(c));
    if (chars.length > 0) {
      this.searchSectionTitle(body, "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438");
      const pills = body.createDiv("scenarist-pills");
      pills.style.paddingLeft = "12px";
      for (const ch of chars)
        this.renderPill(pills, ch);
      totalFound += chars.length;
    }
    for (const qt of this.enabledQuickTypes()) {
      const cats = this.store.byKindForProject("category").filter((c) => {
        var _a;
        return ((_a = c.categorySchema) == null ? void 0 : _a.preset) === qt.preset;
      });
      const matching = cats.filter(
        (cat) => this.matches(cat) || this.store.categoryItems(cat.id).some((i) => this.matches(i))
      );
      if (matching.length > 0) {
        this.searchSectionTitle(body, qt.label);
        for (const cat of matching) {
          const items = this.store.categoryItems(cat.id).filter((i) => this.matches(i));
          this.chipGroup(
            body,
            `cat:${cat.id}`,
            qt.icon,
            cat.name,
            items,
            () => new CreateEntityModal(this.app, this.plugin, {
              kind: "categoryItem",
              categoryId: cat.id,
              titleHint: `\u041D\u043E\u0432\u044B\u0439: ${cat.name}`
            }).open(),
            () => this.plugin.navigateTo(cat.id),
            cat
          );
        }
        totalFound += matching.length;
      }
    }
    if (totalFound === 0) {
      body.createDiv("scenarist-tree-empty").setText("\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E");
    }
  }
  searchSectionTitle(parent, text) {
    parent.createDiv("scenarist-search-section").setText(text);
  }
  // ── проектная панель ───────────────────────────────────────────────────────
  renderProjectBar(c) {
    const bar = c.createDiv("scenarist-projbar");
    const gear = bar.createEl("button", { cls: "clickable-icon scenarist-proj-settings" });
    (0, import_obsidian6.setIcon)(gear, "settings");
    gear.setAttribute("aria-label", "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 Scenarist");
    gear.onclick = () => {
      const setting = this.app.setting;
      if (setting) {
        setting.open();
        setting.openTabById(this.plugin.manifest.id);
      }
    };
    const sel = bar.createEl("select", { cls: "scenarist-work-select" });
    const none = sel.createEl("option", { value: NO_PROJECT, text: "\u2014 \u0411\u0435\u0437 \u043F\u0440\u043E\u0435\u043A\u0442\u0430" });
    if (this.store.getActiveProjectId() === NO_PROJECT)
      none.selected = true;
    this.store.getProjects().forEach((p) => {
      const o = sel.createEl("option", { value: p.id, text: p.name });
      if (p.id === this.store.getActiveProjectId())
        o.selected = true;
    });
    sel.onchange = () => this.store.setActiveProject(sel.value);
    const add = bar.createEl("button", { cls: "clickable-icon scenarist-proj-add" });
    (0, import_obsidian6.setIcon)(add, "plus");
    add.setAttribute("aria-label", "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0440\u043E\u0435\u043A\u0442");
    add.onclick = () => new CreateEntityModal(this.app, this.plugin, {
      kind: "project",
      titleHint: "\u041D\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u0435\u043A\u0442"
    }).open();
  }
  // ── вкладки ────────────────────────────────────────────────────────────────
  renderTabs(c) {
    const row = c.createDiv("scenarist-tabs-icons");
    this.makeTabBtn(row, "work", "palette", "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F");
    this.makeTabBtn(row, "character", "user", "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438");
    for (const qt of this.enabledQuickTypes()) {
      this.makeTabBtn(row, qt.id, qt.icon, qt.label);
    }
  }
  makeTabBtn(row, id, icon, title) {
    const b = row.createEl("button", {
      cls: `clickable-icon scenarist-tab-icon${this.tab === id ? " is-active" : ""}`,
      attr: { "aria-label": title, title }
    });
    if ([...icon].length <= 2) {
      b.textContent = icon;
      b.style.fontSize = "15px";
    } else {
      (0, import_obsidian6.setIcon)(b, icon);
    }
    b.onclick = () => {
      this.tab = id;
      this.render();
    };
  }
  // ── вкладка: Произведения ──────────────────────────────────────────────────
  renderWorkTab(body) {
    this.tabHeader(
      body,
      "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F",
      () => new CreateWorkModal(this.app, this.plugin).open(),
      "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435"
    );
    const works = this.store.byKindForProject("work");
    if (works.length === 0) {
      body.createDiv("scenarist-tree-empty").setText("\u041D\u0435\u0442 \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0439");
      return;
    }
    for (const work of works)
      this.renderWorkBlock(body, work);
  }
  workHasMatch(work) {
    if (this.matches(work))
      return true;
    for (const b of this.linked(work, "books", "book")) {
      if (this.matches(b))
        return true;
      if (this.linked(b, "chapters", "chapter").some((c) => this.matches(c)))
        return true;
    }
    if (this.linked(work, "arcs", "arc").some((a) => this.matches(a)))
      return true;
    if (this.linked(work, "anchors", "anchor").some((a) => this.matches(a)))
      return true;
    return false;
  }
  renderWorkBlock(body, work) {
    const key = `w:${work.id}`;
    const open = this.isOpen(key);
    const head = body.createDiv("scenarist-work-head");
    head.createEl("span", { cls: "scenarist-chevron", text: open ? "\u25BE" : "\u25B8" });
    this.typeIcon(head, ENTITY_ICON.work);
    const title = head.createEl("span", { cls: "scenarist-work-title", text: work.name });
    title.onclick = (e) => {
      e.stopPropagation();
      this.plugin.navigateTo(work.id);
    };
    const tl = head.createEl("button", { cls: "clickable-icon" });
    (0, import_obsidian6.setIcon)(tl, "clock");
    tl.setAttribute("aria-label", "\u0422\u0430\u0439\u043C\u043B\u0430\u0439\u043D");
    tl.onclick = (e) => {
      e.stopPropagation();
      this.plugin.openTimeline(work.id);
    };
    const addBtn = head.createEl("button", { cls: "clickable-icon" });
    (0, import_obsidian6.setIcon)(addBtn, "plus");
    addBtn.setAttribute("aria-label", "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C");
    addBtn.onclick = (e) => {
      e.stopPropagation();
      this.workAddMenu(e, work);
    };
    head.onclick = () => this.toggle(key);
    head.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.contextMenu(e, work);
    });
    if (!open)
      return;
    const inner = body.createDiv("scenarist-work-inner");
    for (const b of this.linked(work, "books", "book")) {
      const chapters = this.linked(b, "chapters", "chapter").filter((c) => this.matches(c));
      this.chipGroup(
        inner,
        `b:${b.id}`,
        ENTITY_ICON.book,
        b.name,
        chapters,
        () => new CreateEntityModal(this.app, this.plugin, {
          kind: "chapter",
          parentLinks: [{ key: "book", id: b.id }],
          titleHint: "\u041D\u043E\u0432\u0430\u044F \u0433\u043B\u0430\u0432\u0430"
        }).open(),
        void 0,
        b
      );
    }
    const arcs = this.linked(work, "arcs", "arc").filter((a) => this.matches(a));
    this.chipGroup(
      inner,
      `arcs:${work.id}`,
      ENTITY_ICON.arc,
      "\u0410\u0440\u043A\u0438",
      arcs,
      () => new CreateEntityModal(this.app, this.plugin, {
        kind: "arc",
        parentLinks: [{ key: "work", id: work.id }],
        titleHint: "\u041D\u043E\u0432\u0430\u044F \u0430\u0440\u043A\u0430"
      }).open()
    );
    const anchors = this.linked(work, "anchors", "anchor").filter((a) => this.matches(a));
    this.chipGroup(
      inner,
      `anch:${work.id}`,
      ENTITY_ICON.anchor,
      "\u042F\u043A\u043E\u0440\u044F",
      anchors,
      () => new CreateEntityModal(this.app, this.plugin, {
        kind: "anchor",
        parentLinks: [{ key: "work", id: work.id }],
        titleHint: "\u041D\u043E\u0432\u044B\u0439 \u044F\u043A\u043E\u0440\u044C"
      }).open()
    );
  }
  // ── вкладка: Персонажи ─────────────────────────────────────────────────────
  renderCharacterTab(body) {
    this.tabHeader(
      body,
      "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438",
      () => new CreateEntityModal(this.app, this.plugin, { kind: "character" }).open(),
      "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430"
    );
    const chars = this.store.byKindForProject("character");
    for (const role of CHAR_ROLES) {
      const inRole = chars.filter((c) => c.props["role"] === role);
      this.chipGroup(
        body,
        `role:${role}`,
        ENTITY_ICON.character,
        role,
        inRole,
        () => new CreateEntityModal(this.app, this.plugin, {
          kind: "character",
          presetProps: { role },
          titleHint: `\u041D\u043E\u0432\u044B\u0439 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436 (${role.toLowerCase()})`
        }).open()
      );
    }
    const noRole = chars.filter((c) => !CHAR_ROLES.includes(String(c.props["role"])));
    if (noRole.length > 0) {
      this.chipGroup(
        body,
        "role:none",
        ENTITY_ICON.character,
        "\u0411\u0435\u0437 \u0440\u043E\u043B\u0438",
        noRole,
        () => new CreateEntityModal(this.app, this.plugin, { kind: "character" }).open()
      );
    }
  }
  // ── вкладка: тип категории ─────────────────────────────────────────────────
  renderCategoryTypeTab(body, qt) {
    this.tabHeader(
      body,
      qt.label,
      () => new CreateCategoryModal(this.app, this.plugin, qt.preset).open(),
      `\u0421\u043E\u0437\u0434\u0430\u0442\u044C: ${qt.label}`
    );
    const cats = this.store.byKindForProject("category").filter((c) => {
      var _a;
      return ((_a = c.categorySchema) == null ? void 0 : _a.preset) === qt.preset;
    });
    if (cats.length === 0) {
      body.createDiv("scenarist-tree-empty").setText(`\u041D\u0435\u0442 ${qt.label.toLowerCase()}. \u041D\u0430\u0436\u043C\u0438\u0442\u0435 + \u0447\u0442\u043E\u0431\u044B \u0441\u043E\u0437\u0434\u0430\u0442\u044C.`);
      return;
    }
    for (const cat of cats) {
      const items = this.store.categoryItems(cat.id);
      this.chipGroup(
        body,
        `cat:${cat.id}`,
        qt.icon,
        cat.name,
        items,
        () => new CreateEntityModal(this.app, this.plugin, {
          kind: "categoryItem",
          categoryId: cat.id,
          titleHint: `\u041D\u043E\u0432\u044B\u0439: ${cat.name}`
        }).open(),
        () => this.plugin.navigateTo(cat.id),
        cat
      );
    }
  }
  // ── общие ──────────────────────────────────────────────────────────────────
  tabHeader(body, title, onAdd, addLabel) {
    const head = body.createDiv("scenarist-tab-head");
    head.createEl("span", { cls: "scenarist-tab-title", text: title });
    const add = head.createEl("button", { cls: "clickable-icon" });
    (0, import_obsidian6.setIcon)(add, "plus");
    add.setAttribute("aria-label", addLabel);
    add.onclick = onAdd;
  }
  chipGroup(parent, key, icon, title, items, onAdd, onTitleClick, headerEntity) {
    const open = this.isOpen(key);
    const head = parent.createDiv("scenarist-group-header");
    head.createEl("span", { cls: "scenarist-chevron", text: open ? "\u25BE" : "\u25B8" });
    this.typeIcon(head, icon);
    const t = head.createEl("span", { cls: "scenarist-group-title", text: title });
    head.createEl("span", { cls: "scenarist-count-badge", text: String(items.length) });
    if (onTitleClick) {
      t.addClass("linkable");
      t.onclick = (e) => {
        e.stopPropagation();
        onTitleClick();
      };
    }
    head.onclick = () => this.toggle(key);
    if (headerEntity) {
      head.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.contextMenu(e, headerEntity);
      });
    }
    if (!open)
      return;
    const pills = parent.createDiv("scenarist-pills");
    for (const item of items)
      this.renderPill(pills, item);
    const add = pills.createEl("button", { cls: "scenarist-pill add" });
    (0, import_obsidian6.setIcon)(add, "plus");
    add.setAttribute("aria-label", "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C");
    add.onclick = onAdd;
  }
  renderPill(parent, entity) {
    var _a, _b;
    const pill = parent.createEl("button", { cls: "scenarist-pill" });
    if (this.plugin.selectedId === entity.id)
      pill.addClass("selected");
    if (entity.kind === "chapter") {
      const opt = (_b = (_a = SCHEMAS.chapter.fields.find((f) => f.key === "status")) == null ? void 0 : _a.options) == null ? void 0 : _b.find((o) => o.value === entity.props["status"]);
      const dot = pill.createEl("span", { cls: "scenarist-pill-dot" });
      dot.style.background = opt ? opt.color : "#555";
    }
    pill.createEl("span", { text: entity.name });
    pill.onclick = () => this.plugin.navigateTo(entity.id);
    pill.addEventListener("dblclick", () => this.plugin.sync.openNote(entity));
    pill.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      this.contextMenu(e, entity);
    });
  }
  // ── хелперы ────────────────────────────────────────────────────────────────
  linked(e, key, kind) {
    return (e.links[key] || []).map((id) => this.store.get(id)).filter((x) => !!x && x.kind === kind);
  }
  workAddMenu(e, work) {
    const menu = new import_obsidian6.Menu();
    const mk = (label, kind, icon) => menu.addItem(
      (i) => i.setTitle(label).setIcon(icon).onClick(
        () => new CreateEntityModal(this.app, this.plugin, {
          kind,
          parentLinks: [{ key: "work", id: work.id }],
          titleHint: `\u041D\u043E\u0432\u044B\u0439: ${label}`
        }).open()
      )
    );
    mk("\u041A\u043D\u0438\u0433\u0430", "book", "book-open");
    mk("\u0410\u0440\u043A\u0430", "arc", "git-branch");
    mk("\u042F\u043A\u043E\u0440\u044C", "anchor", "anchor");
    menu.showAtMouseEvent(e);
  }
  contextMenu(e, entity) {
    const menu = new import_obsidian6.Menu();
    menu.addItem(
      (i) => i.setTitle("\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0443").setIcon("info").onClick(() => this.plugin.navigateTo(entity.id))
    );
    menu.addItem(
      (i) => i.setTitle("\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043A\u0443").setIcon("file-text").onClick(() => this.plugin.sync.openNote(entity))
    );
    menu.addSeparator();
    menu.addItem(
      (i) => i.setTitle("\u0423\u0434\u0430\u043B\u0438\u0442\u044C").setIcon("trash").onClick(() => {
        this.store.delete(entity.id);
        new import_obsidian6.Notice(`\u0423\u0434\u0430\u043B\u0435\u043D\u043E: ${entity.name}`);
      })
    );
    menu.showAtMouseEvent(e);
  }
};

// src/views/CardView.ts
var import_obsidian7 = require("obsidian");
var CARD_VIEW = "scenarist-card";
var BACKLINK_LABELS = {
  chapters: "\u041F\u043E\u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0432 \u0433\u043B\u0430\u0432\u0430\u0445",
  pages: "\u041F\u043E\u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430\u0445",
  members: "\u0423\u0447\u0430\u0441\u0442\u043D\u0438\u043A\u0438",
  arcs: "\u0410\u0440\u043A\u0438",
  books: "\u041A\u043D\u0438\u0433\u0438",
  anchors: "\u042F\u043A\u043E\u0440\u044F",
  works: "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F"
};
var STRUCTURAL = /* @__PURE__ */ new Set(["project", "category"]);
var LONG_FIELDS = /* @__PURE__ */ new Set([
  "summary",
  "synopsis",
  "description",
  "idea",
  "goal"
]);
var CardView = class extends import_obsidian7.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.unsub = [];
    this._rendering = false;
    this._renderPending = false;
    this.plugin = plugin;
  }
  getViewType() {
    return CARD_VIEW;
  }
  getDisplayText() {
    var _a;
    return ((_a = this.current()) == null ? void 0 : _a.name) || "Scenarist";
  }
  getIcon() {
    return "film";
  }
  async onOpen() {
    this.unsub.push(this.plugin.store.onChange(() => this.scheduleRender()));
    this.unsub.push(this.plugin.onSelect(() => this.scheduleRender()));
    this.render();
  }
  async onClose() {
    this.unsub.forEach((u) => u());
  }
  /** Debounced re-entrant-safe render scheduler. */
  scheduleRender() {
    if (this._rendering) {
      this._renderPending = true;
      return;
    }
    this.render();
  }
  current() {
    const id = this.plugin.selectedId;
    return id ? this.plugin.store.get(id) : null;
  }
  single(ids) {
    if (!ids || !ids.length)
      return null;
    return this.plugin.store.get(ids[0]);
  }
  // ── Render Lucide icon or emoji into element ─────────────────────────────
  renderIconInto(el, iconStr) {
    if ([...iconStr].length <= 2) {
      el.textContent = iconStr;
    } else {
      (0, import_obsidian7.setIcon)(el, iconStr);
    }
  }
  async render() {
    if (this._rendering) {
      this._renderPending = true;
      return;
    }
    this._rendering = true;
    try {
      const root = this.containerEl.children[1];
      root.empty();
      root.addClass("scenarist-card-view");
      const entity = this.current();
      if (!entity) {
        const empty = root.createDiv("scenarist-empty");
        const iconBox = empty.createDiv("scenarist-empty-icon");
        (0, import_obsidian7.setIcon)(iconBox, "layers");
        empty.createEl("p", { text: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0432 \u043D\u0430\u0432\u0438\u0433\u0430\u0442\u043E\u0440\u0435" });
        empty.createEl("p", { cls: "scenarist-empty-hint", text: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435, \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0430 \u0438\u043B\u0438 \u0433\u043B\u0430\u0432\u0443 \u0441\u043B\u0435\u0432\u0430" });
        return;
      }
      const card = root.createDiv("scenarist-card");
      this.renderHeader(card, entity);
      this.renderProps(card, entity);
      if (entity.kind === "category")
        this.renderCategoryItems(card, entity);
      this.renderRelations(card, entity);
      await this.renderBody(card, entity);
    } finally {
      this._rendering = false;
      if (this._renderPending) {
        this._renderPending = false;
        setTimeout(() => this.render(), 0);
      }
    }
  }
  // ---- шапка + крошки ----
  parentOf(e) {
    switch (e.kind) {
      case "page":
        return this.single(e.links["chapter"]);
      case "chapter":
        return this.single(e.links["book"]);
      case "book":
      case "arc":
      case "anchor":
        return this.single(e.links["work"]);
      case "categoryItem":
        return this.single(e.links["category"]);
      case "work":
      case "character":
      case "category":
        return this.single(e.links["project"]);
      default:
        return null;
    }
  }
  renderHeader(card, entity) {
    const schema = this.plugin.store.resolved(entity);
    const top = card.createDiv("scenarist-card-top");
    if (this.plugin.canGoBack()) {
      const back = top.createEl("button", { cls: "scenarist-card-back", attr: { title: "\u041D\u0430\u0437\u0430\u0434" } });
      (0, import_obsidian7.setIcon)(back, "arrow-left");
      back.onclick = () => this.plugin.back();
    }
    const crumbs = [];
    let p = this.parentOf(entity);
    let guard = 0;
    while (p && guard++ < 8) {
      crumbs.unshift(p);
      p = this.parentOf(p);
    }
    const trail = top.createDiv("scenarist-crumbs");
    crumbs.forEach((cr) => {
      const crSchema = this.plugin.store.resolved(cr);
      const a = trail.createEl("span", { cls: "scenarist-crumb" });
      const iconSpan = a.createEl("span", { cls: "scenarist-crumb-icon" });
      this.renderIconInto(iconSpan, crSchema.icon);
      a.createEl("span", { text: cr.name });
      a.onclick = () => this.plugin.navigateTo(cr.id);
      trail.createEl("span", { cls: "scenarist-crumb-sep", text: "/" });
    });
    trail.createEl("span", { cls: "scenarist-crumb current", text: schema.label });
    const spacer = top.createDiv();
    spacer.style.flex = "1";
    const openBtn = top.createEl("button", { cls: "scenarist-card-note-btn", attr: { title: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0437\u0430\u043C\u0435\u0442\u043A\u0443" } });
    (0, import_obsidian7.setIcon)(openBtn, "external-link");
    openBtn.createEl("span", { text: "\u0417\u0430\u043C\u0435\u0442\u043A\u0430" });
    openBtn.onclick = () => this.plugin.sync.openNote(entity);
    const titleRow = card.createDiv("scenarist-card-titlerow");
    const iconBox = titleRow.createEl("span", { cls: "scenarist-card-icon" });
    this.renderIconInto(iconBox, schema.icon);
    const title = titleRow.createEl("input", { cls: "scenarist-card-title" });
    title.value = entity.name;
    title.placeholder = "\u0411\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F";
    title.onchange = () => {
      const v = title.value.trim();
      if (v && v !== entity.name) {
        this.plugin.store.rename(entity.id, v);
        this.plugin.sync.syncToNote(this.plugin.store.get(entity.id));
      }
    };
    this.renderTagsHeader(card, entity);
  }
  /** Строка тегов под заголовком. */
  renderTagsHeader(card, entity) {
    const rawTags = entity.props["tags"];
    const tags = rawTags ? String(rawTags).split(",").map((t) => t.trim()).filter(Boolean) : [];
    const row = card.createDiv("scenarist-card-tags");
    for (const tag of tags) {
      const chip = row.createEl("span", { cls: "scenarist-tag-chip" });
      const text = chip.createEl("span", { cls: "scenarist-tag-chip-text", text: "#" + tag });
      text.title = `\u041D\u0430\u0439\u0442\u0438 #${tag} \u0432 vault`;
      text.onclick = (e) => {
        e.stopPropagation();
        this.openTagSearch(tag);
      };
      const x = chip.createEl("span", { cls: "scenarist-tag-chip-x", text: "\xD7" });
      x.title = "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0442\u0435\u0433";
      x.onclick = (e) => {
        e.stopPropagation();
        const next = tags.filter((t) => t !== tag);
        this.commitProp(entity, "tags", next.length ? next.join(", ") : null);
      };
    }
    const addBtn = row.createEl("button", { cls: "scenarist-tag-add", text: "+ \u0442\u0435\u0433" });
    addBtn.onclick = () => {
      addBtn.style.display = "none";
      const inp = row.createEl("input", { cls: "scenarist-tag-input" });
      inp.placeholder = "\u0442\u0435\u0433\u2026";
      inp.focus();
      const commit = () => {
        const val = inp.value.trim().replace(/^#/, "");
        if (val && !tags.includes(val)) {
          this.commitProp(entity, "tags", [...tags, val].join(", "));
        }
      };
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          commit();
        }
        if (e.key === "Escape") {
          inp.remove();
          addBtn.style.display = "";
        }
      });
      inp.addEventListener("blur", commit);
    };
  }
  // ---- свойства ----
  renderProps(card, entity) {
    const fields = this.plugin.store.resolved(entity).fields;
    const section = card.createDiv("scenarist-card-section");
    for (const field of fields) {
      const row = section.createDiv("scenarist-prop");
      row.createEl("div", { cls: "scenarist-prop-label", text: field.label });
      const valWrap = row.createDiv("scenarist-prop-value");
      this.renderFieldControl(valWrap, entity, field);
    }
    this.renderBacklinksProp(section, entity);
  }
  /** Поле ссылок на заметки — чипы. */
  renderBacklinksProp(section, entity) {
    const rawVal = entity.props["backlinks"] ? String(entity.props["backlinks"]) : "";
    const links = [];
    const re = /\[\[([^\]]+)\]\]/g;
    let m;
    while ((m = re.exec(rawVal)) !== null)
      links.push(m[1]);
    const row = section.createDiv("scenarist-prop");
    row.createEl("div", { cls: "scenarist-prop-label", text: "\u0421\u0441\u044B\u043B\u043A\u0438 \u043D\u0430 \u0437\u0430\u043C\u0435\u0442\u043A\u0438" });
    const valWrap = row.createDiv("scenarist-prop-value");
    const chipRow = valWrap.createDiv("scenarist-card-tags scenarist-link-chips");
    chipRow.style.margin = "0";
    const commitLinks = (newLinks) => {
      const val = newLinks.length ? newLinks.map((l) => `[[${l}]]`).join(", ") : null;
      this.commitProp(entity, "backlinks", val);
    };
    for (const link of links) {
      const chip = chipRow.createEl("span", { cls: "scenarist-link-chip" });
      const text = chip.createEl("span", { cls: "scenarist-tag-chip-text", text: `[[${link}]]` });
      text.title = `\u041E\u0442\u043A\u0440\u044B\u0442\u044C: ${link}`;
      text.onclick = (e) => {
        e.stopPropagation();
        this.openObsidianLink(link);
      };
      const x = chip.createEl("span", { cls: "scenarist-tag-chip-x", text: "\xD7" });
      x.onclick = (e) => {
        e.stopPropagation();
        commitLinks(links.filter((l) => l !== link));
      };
    }
    const addBtn = chipRow.createEl("button", { cls: "scenarist-tag-add", text: "+ \u0441\u0441\u044B\u043B\u043A\u0430" });
    addBtn.onclick = () => {
      addBtn.style.display = "none";
      const inp = chipRow.createEl("input", { cls: "scenarist-tag-input" });
      inp.placeholder = "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438\u2026";
      inp.style.width = "160px";
      inp.focus();
      const commit = () => {
        let val = inp.value.trim().replace(/^\[\[|\]\]$/g, "");
        if (val && !links.includes(val))
          commitLinks([...links, val]);
      };
      inp.addEventListener("keydown", (e) => {
        if (e.key === "Enter")
          commit();
        if (e.key === "Escape") {
          inp.remove();
          addBtn.style.display = "";
        }
      });
      inp.addEventListener("blur", commit);
    };
  }
  /** Открыть wikilink через Obsidian. */
  openObsidianLink(linkText) {
    this.app.workspace.openLinkText(linkText, "", false);
  }
  renderFieldControl(wrap, entity, field) {
    var _a, _b;
    const val = entity.props[field.key];
    if (field.type === "multiselect") {
      const selected = val ? String(val).split(",").map((v) => v.trim()).filter(Boolean) : [];
      const settingsOpts = ((_a = this.plugin.settings.genreOptions) == null ? void 0 : _a.length) ? this.plugin.settings.genreOptions : (field.options || []).map((o) => o.value);
      const optMap = new Map((field.options || []).map((o) => [o.value, o.color]));
      const chipRow = wrap.createDiv("scenarist-card-tags scenarist-genre-chips");
      chipRow.style.margin = "0";
      const commitGenres = (next) => this.commitProp(entity, field.key, next.length ? next.join(", ") : null);
      const renderChips = () => {
        chipRow.empty();
        for (const v of selected) {
          const color = optMap.get(v) || "#888";
          const chip = chipRow.createEl("span", { cls: "scenarist-genre-chip" });
          chip.style.setProperty("--chip-color", color);
          chip.createEl("span", { text: v });
          const x = chip.createEl("span", { cls: "scenarist-tag-chip-x", text: "\xD7" });
          x.onclick = () => commitGenres(selected.filter((s) => s !== v));
        }
        const available = settingsOpts.filter((o) => !selected.includes(o));
        const sel = chipRow.createEl("select", { cls: "scenarist-genre-add" });
        sel.createEl("option", { value: "", text: "\uFF0B \u0436\u0430\u043D\u0440\u2026" });
        available.forEach((o) => sel.createEl("option", { value: o, text: o }));
        sel.createEl("option", { value: "__new__", text: "\uFF0B \u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0432\u043E\u0439\u2026" });
        sel.onchange = async () => {
          if (!sel.value)
            return;
          if (sel.value === "__new__") {
            sel.style.display = "none";
            const inp = chipRow.createEl("input", { cls: "scenarist-tag-input" });
            inp.placeholder = "\u041D\u043E\u0432\u044B\u0439 \u0436\u0430\u043D\u0440\u2026";
            inp.focus();
            const doAdd = async () => {
              const newG = inp.value.trim();
              if (newG) {
                if (!this.plugin.settings.genreOptions.includes(newG)) {
                  this.plugin.settings.genreOptions.push(newG);
                  await this.plugin.saveSettings();
                }
                if (!selected.includes(newG)) {
                  selected.push(newG);
                  optMap.set(newG, "#888");
                  commitGenres(selected);
                }
              } else {
                sel.value = "";
                sel.style.display = "";
                renderChips();
              }
            };
            inp.addEventListener("keydown", (e) => {
              if (e.key === "Enter") {
                doAdd();
              }
              if (e.key === "Escape") {
                inp.remove();
                sel.style.display = "";
                sel.value = "";
              }
            });
            inp.addEventListener("blur", doAdd);
          } else {
            selected.push(sel.value);
            commitGenres(selected);
          }
        };
      };
      renderChips();
      return;
    }
    if (field.type === "select" || field.type === "status") {
      const selWrap = wrap.createDiv("scenarist-select-wrap");
      const dot = selWrap.createDiv("scenarist-select-dot");
      const sel = selWrap.createEl("select", { cls: "scenarist-prop-select" });
      if (!field.required)
        sel.createEl("option", { value: "", text: "\u2014" });
      (field.options || []).forEach((o) => {
        const opt = sel.createEl("option", { value: o.value, text: o.value });
        if (o.value === val)
          opt.selected = true;
      });
      if (field.required && !val && ((_b = field.options) == null ? void 0 : _b.length)) {
        sel.value = field.options[0].value;
        queueMicrotask(() => this.commitProp(entity, field.key, field.options[0].value));
      }
      const updateDot = () => {
        const opt = (field.options || []).find((o) => o.value === sel.value);
        if (opt) {
          dot.style.background = opt.color;
          dot.style.opacity = "1";
        } else {
          dot.style.background = "transparent";
          dot.style.opacity = "0";
        }
      };
      updateDot();
      sel.onchange = () => {
        updateDot();
        this.commitProp(entity, field.key, sel.value || null);
      };
      return;
    }
    if (field.type === "checkbox") {
      const cb = wrap.createEl("input", { cls: "scenarist-prop-check" });
      cb.type = "checkbox";
      cb.checked = val === true;
      cb.onchange = () => this.commitProp(entity, field.key, cb.checked);
      return;
    }
    if (field.type === "number") {
      const inp = wrap.createEl("input", { cls: "scenarist-prop-input" });
      inp.type = "number";
      inp.value = val != null ? String(val) : "";
      inp.onchange = () => {
        const n = parseFloat(inp.value);
        this.commitProp(entity, field.key, isNaN(n) ? null : n);
      };
      return;
    }
    const ta = wrap.createEl("textarea", { cls: "scenarist-prop-textarea" });
    ta.value = val != null ? String(val) : "";
    ta.placeholder = "\u2014";
    ta.rows = LONG_FIELDS.has(field.key) ? 3 : 1;
    this.autoGrow(ta);
    ta.oninput = () => this.autoGrow(ta);
    ta.onchange = () => this.commitProp(entity, field.key, ta.value || null);
  }
  autoGrow(ta) {
    ta.style.height = "auto";
    const minLines = ta.rows || 1;
    const lineH = 22;
    ta.style.height = Math.max(ta.scrollHeight, minLines * lineH) + "px";
  }
  commitProp(entity, key, value) {
    this.plugin.store.setProp(entity.id, key, value);
    this.plugin.sync.syncToNote(this.plugin.store.get(entity.id));
  }
  // ---- элементы категории ----
  renderCategoryItems(card, cat) {
    const items = this.plugin.store.categoryItems(cat.id);
    const section = card.createDiv("scenarist-card-section");
    const head = section.createDiv("scenarist-card-body-head");
    head.createEl("div", { cls: "scenarist-card-section-title", text: `\u042D\u043B\u0435\u043C\u0435\u043D\u0442\u044B (${items.length})` });
    const add = head.createEl("button", { cls: "scenarist-card-edit-btn", text: "\uFF0B \u044D\u043B\u0435\u043C\u0435\u043D\u0442" });
    add.onclick = () => new CreateEntityModal(this.app, this.plugin, {
      kind: "categoryItem",
      categoryId: cat.id,
      titleHint: `\u041D\u043E\u0432\u044B\u0439: ${cat.name}`
    }).open();
    const chips = section.createDiv("scenarist-rel-chips");
    if (items.length === 0) {
      chips.createEl("span", { cls: "scenarist-muted", text: "\u041F\u043E\u043A\u0430 \u043F\u0443\u0441\u0442\u043E." });
    }
    for (const it of items) {
      const chip = chips.createEl("span", { cls: "scenarist-rel-chip" });
      const chipIcon = chip.createEl("span", { cls: "scenarist-rel-chip-icon" });
      this.renderIconInto(chipIcon, this.plugin.store.resolved(it).icon);
      chip.createEl("span", { text: it.name });
      chip.onclick = () => this.plugin.navigateTo(it.id);
    }
  }
  // ---- связи ----
  renderRelations(card, entity) {
    const schema = this.plugin.store.resolved(entity);
    const linkKeys = new Set(schema.links.map((l) => l.key));
    const section = card.createDiv("scenarist-card-section");
    section.createEl("div", { cls: "scenarist-card-section-title", text: "\u0421\u0432\u044F\u0437\u0438" });
    const blocks = [];
    for (const link of schema.links) {
      if (STRUCTURAL.has(link.key))
        continue;
      const el = this.renderLinkEditor(entity, link.key, link.label, link.target, !!link.single);
      if (el) {
        section.appendChild(el);
        blocks.push(el);
      }
    }
    for (const key of Object.keys(entity.links)) {
      if (linkKeys.has(key) || STRUCTURAL.has(key))
        continue;
      const ids = entity.links[key];
      if (!ids || !ids.length)
        continue;
      const el = this.renderBacklinks(key, ids);
      section.appendChild(el);
      blocks.push(el);
    }
    if (blocks.length === 0)
      section.remove();
  }
  renderLinkEditor(entity, key, label, target, single) {
    const current = entity.links[key] || [];
    const candidates = this.plugin.store.byKind(target).filter((c) => c.id !== entity.id && !current.includes(c.id));
    if (current.length === 0 && candidates.length === 0)
      return null;
    const wrap = document.createElement("div");
    wrap.className = "scenarist-rel-group";
    const lbl = wrap.createDiv("scenarist-rel-label");
    lbl.textContent = label;
    const chips = wrap.createDiv("scenarist-rel-chips");
    for (const tid of current) {
      const t = this.plugin.store.get(tid);
      if (!t)
        continue;
      const chip = chips.createEl("span", { cls: "scenarist-rel-chip" });
      const chipIcon = chip.createEl("span", { cls: "scenarist-rel-chip-icon" });
      this.renderIconInto(chipIcon, this.plugin.store.resolved(t).icon);
      chip.createEl("span", { text: t.name });
      chip.onclick = () => this.plugin.navigateTo(tid);
      const x = chip.createEl("span", { cls: "scenarist-rel-x", text: "\xD7" });
      x.onclick = (e) => {
        e.stopPropagation();
        this.plugin.store.setLink(entity.id, key, current.filter((c) => c !== tid));
        this.plugin.sync.syncToNote(this.plugin.store.get(entity.id));
      };
    }
    if (candidates.length > 0) {
      const sel = chips.createEl("select", { cls: "scenarist-rel-add" });
      sel.createEl("option", { value: "", text: "+ \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C\u2026" });
      candidates.forEach((c) => sel.createEl("option", { value: c.id, text: c.name }));
      sel.onchange = () => {
        if (!sel.value)
          return;
        const next = single ? [sel.value] : [...current, sel.value];
        this.plugin.store.setLink(entity.id, key, next);
        this.plugin.sync.syncToNote(this.plugin.store.get(entity.id));
      };
    }
    return wrap;
  }
  renderBacklinks(key, ids) {
    const wrap = document.createElement("div");
    wrap.className = "scenarist-rel-group backlinks";
    wrap.createDiv("scenarist-rel-label").textContent = BACKLINK_LABELS[key] || key;
    const chips = wrap.createDiv("scenarist-rel-chips");
    for (const id of ids) {
      const t = this.plugin.store.get(id);
      if (!t)
        continue;
      const chip = chips.createEl("span", { cls: "scenarist-rel-chip readonly" });
      const chipIcon = chip.createEl("span", { cls: "scenarist-rel-chip-icon" });
      this.renderIconInto(chipIcon, this.plugin.store.resolved(t).icon);
      chip.createEl("span", { text: t.name });
      chip.onclick = () => this.plugin.navigateTo(id);
    }
    return wrap;
  }
  // ---- тело ----
  async renderBody(card, entity) {
    const section = card.createDiv("scenarist-card-section scenarist-card-body");
    const head = section.createDiv("scenarist-card-body-head");
    head.createEl("div", { cls: "scenarist-card-section-title", text: "\u0422\u0435\u043A\u0441\u0442" });
    const editBtn = head.createEl("button", { cls: "scenarist-card-edit-btn" });
    (0, import_obsidian7.setIcon)(editBtn, "pencil");
    editBtn.createEl("span", { text: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C" });
    editBtn.onclick = () => this.plugin.sync.openNote(entity);
    const file = entity.filePath ? this.plugin.app.vault.getAbstractFileByPath(entity.filePath) : null;
    const target = section.createDiv("scenarist-card-body-render markdown-rendered");
    if (file instanceof import_obsidian7.TFile) {
      const raw = await this.plugin.app.vault.cachedRead(file);
      const body = this.stripFrontmatter(raw).trim();
      if (body) {
        await import_obsidian7.MarkdownRenderer.render(this.plugin.app, body, target, file.path, this);
      } else {
        target.createEl("p", { cls: "scenarist-muted", text: "\u041F\u0443\u0441\u0442\u043E." });
      }
    } else {
      target.createEl("p", {
        cls: "scenarist-muted",
        text: "\u0417\u0430\u043C\u0435\u0442\u043A\u0430 \u0435\u0449\u0451 \u043D\u0435 \u0441\u043E\u0437\u0434\u0430\u043D\u0430 \u2014 \u043D\u0430\u0436\u043C\u0438\u0442\u0435 \xAB\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C\xBB."
      });
    }
  }
  /** Открыть встроенный поиск Obsidian с фильтром по тегу. */
  openTagSearch(tag) {
    var _a, _b, _c, _d, _e;
    const query = `tag:#${tag}`;
    const search = (_b = (_a = this.app.internalPlugins) == null ? void 0 : _a.getPluginById) == null ? void 0 : _b.call(_a, "global-search");
    if ((search == null ? void 0 : search.enabled) && ((_c = search.instance) == null ? void 0 : _c.openGlobalSearch)) {
      search.instance.openGlobalSearch(query);
      return;
    }
    (_e = (_d = this.app.commands) == null ? void 0 : _d.executeCommandById) == null ? void 0 : _e.call(_d, "global-search:open");
  }
  stripFrontmatter(content) {
    if (content.startsWith("---")) {
      const end = content.indexOf("\n---", 3);
      if (end !== -1) {
        const after = content.indexOf("\n", end + 1);
        return after !== -1 ? content.slice(after + 1) : "";
      }
    }
    return content;
  }
};

// src/views/BoardView.ts
var import_obsidian8 = require("obsidian");
var BOARD_VIEW = "scenarist-board";
var BoardView = class extends import_obsidian8.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.unsub = [];
    this.plugin = plugin;
  }
  getViewType() {
    return BOARD_VIEW;
  }
  getDisplayText() {
    return "\u0414\u043E\u0441\u043A\u0430 \u0433\u043B\u0430\u0432";
  }
  getIcon() {
    return "kanban-square";
  }
  async onOpen() {
    this.unsub.push(this.plugin.store.onChange(() => this.render()));
    this.render();
  }
  async onClose() {
    this.unsub.forEach((u) => u());
  }
  projectChapters() {
    const works = this.plugin.store.byKindForProject("work");
    const bookIds = /* @__PURE__ */ new Set();
    works.forEach((w) => (w.links["books"] || []).forEach((id) => bookIds.add(id)));
    return this.plugin.store.byKind("chapter").filter((ch) => (ch.links["book"] || []).some((id) => bookIds.has(id)));
  }
  render() {
    var _a;
    const c = this.containerEl.children[1];
    c.empty();
    c.addClass("scenarist-panel", "scenarist-board");
    const header = c.createDiv("scenarist-panel-header");
    header.createEl("span", { cls: "scenarist-panel-title", text: "\u{1F5C2} \u0414\u043E\u0441\u043A\u0430 \u0433\u043B\u0430\u0432" });
    const statuses = ((_a = SCHEMAS.chapter.fields.find((f) => f.key === "status")) == null ? void 0 : _a.options) || [];
    const chapters = this.projectChapters();
    if (chapters.length === 0) {
      c.createDiv("scenarist-empty").createEl("p", { text: "\u041D\u0435\u0442 \u0433\u043B\u0430\u0432 \u0432 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u043C \u043F\u0440\u043E\u0435\u043A\u0442\u0435" });
      return;
    }
    const board = c.createDiv("scenarist-board-columns");
    for (const status of statuses) {
      const col = board.createDiv("scenarist-board-col");
      const head = col.createDiv("scenarist-board-col-head");
      const dot = head.createEl("span", { cls: "scenarist-status-dot" });
      dot.style.background = status.color;
      head.createEl("span", { text: status.value });
      const cards = chapters.filter((ch) => ch.props["status"] === status.value);
      head.createEl("span", { cls: "scenarist-count-badge", text: String(cards.length) });
      const drop = col.createDiv("scenarist-board-drop");
      drop.addEventListener("dragover", (e) => {
        e.preventDefault();
        drop.addClass("dragover");
      });
      drop.addEventListener("dragleave", () => drop.removeClass("dragover"));
      drop.addEventListener("drop", (e) => {
        var _a2;
        e.preventDefault();
        drop.removeClass("dragover");
        const id = (_a2 = e.dataTransfer) == null ? void 0 : _a2.getData("text/plain");
        if (id) {
          this.plugin.store.setProp(id, "status", status.value);
          const ch = this.plugin.store.get(id);
          if (ch)
            this.plugin.sync.syncToNote(ch);
        }
      });
      for (const ch of cards)
        this.renderCard(drop, ch);
    }
    const noStatus = chapters.filter(
      (ch) => !statuses.some((s) => s.value === ch.props["status"])
    );
    if (noStatus.length > 0) {
      const col = board.createDiv("scenarist-board-col");
      col.createDiv("scenarist-board-col-head").createEl("span", { text: "\u0411\u0435\u0437 \u0441\u0442\u0430\u0442\u0443\u0441\u0430" });
      const drop = col.createDiv("scenarist-board-drop");
      for (const ch of noStatus)
        this.renderCard(drop, ch);
    }
  }
  renderCard(container, ch) {
    const card = container.createDiv("scenarist-board-card");
    card.draggable = true;
    card.createEl("div", { cls: "scenarist-board-card-title", text: ch.name });
    const synopsis = ch.props["synopsis"];
    if (typeof synopsis === "string" && synopsis) {
      card.createEl("div", {
        cls: "scenarist-board-card-desc",
        text: synopsis.slice(0, 90) + (synopsis.length > 90 ? "\u2026" : "")
      });
    }
    card.addEventListener("dragstart", (e) => {
      var _a;
      (_a = e.dataTransfer) == null ? void 0 : _a.setData("text/plain", ch.id);
      card.addClass("dragging");
    });
    card.addEventListener("dragend", () => card.removeClass("dragging"));
    card.onclick = () => this.plugin.navigateTo(ch.id);
    card.ondblclick = () => this.plugin.sync.openNote(ch);
  }
};

// src/views/GraphView.ts
var import_obsidian9 = require("obsidian");
var GRAPH_VIEW = "scenarist-graph";
var SVG_NS = "http://www.w3.org/2000/svg";
var NODE_COLORS = {
  work: "#9b59b6",
  character: "#4a9eff",
  categoryItem: "#f5a623",
  arc: "#1abc9c",
  anchor: "#e84393",
  book: "#7ed321"
};
var GRAPH_KINDS = ["work", "character", "categoryItem", "arc", "anchor"];
var GraphView = class extends import_obsidian9.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.unsub = [];
    this.plugin = plugin;
  }
  getViewType() {
    return GRAPH_VIEW;
  }
  getDisplayText() {
    return "\u0413\u0440\u0430\u0444 \u0441\u0432\u044F\u0437\u0435\u0439";
  }
  getIcon() {
    return "git-fork";
  }
  async onOpen() {
    this.unsub.push(this.plugin.store.onChange(() => this.render()));
    this.unsub.push(this.plugin.onSelect(() => this.render()));
    this.render();
  }
  async onClose() {
    this.unsub.forEach((u) => u());
  }
  render() {
    const c = this.containerEl.children[1];
    c.empty();
    c.addClass("scenarist-panel", "scenarist-graph");
    const entities = this.plugin.store.all().filter((e) => GRAPH_KINDS.includes(e.kind) && this.plugin.store.inActiveProject(e));
    if (entities.length === 0) {
      c.createDiv("scenarist-empty").createEl("p", {
        text: "\u041D\u0435\u0442 \u0441\u0443\u0449\u043D\u043E\u0441\u0442\u0435\u0439 \u0434\u043B\u044F \u0433\u0440\u0430\u0444\u0430 \u0432 \u044D\u0442\u043E\u043C \u043F\u0440\u043E\u0435\u043A\u0442\u0435"
      });
      return;
    }
    const W = 800;
    const H = 600;
    const idSet = new Set(entities.map((e) => e.id));
    const nodes = entities.map((e, i) => {
      const a = i / entities.length * Math.PI * 2;
      return { e, x: W / 2 + Math.cos(a) * 180, y: H / 2 + Math.sin(a) * 180, vx: 0, vy: 0 };
    });
    const index = new Map(nodes.map((n) => [n.e.id, n]));
    const edges = [];
    const seen = /* @__PURE__ */ new Set();
    for (const n of nodes) {
      for (const key of Object.keys(n.e.links)) {
        for (const tid of n.e.links[key]) {
          if (!idSet.has(tid))
            continue;
          const k = [n.e.id, tid].sort().join("|");
          if (seen.has(k))
            continue;
          seen.add(k);
          const t = index.get(tid);
          if (t)
            edges.push([n, t]);
        }
      }
    }
    this.simulate(nodes, edges, W, H);
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    svg.addClass("scenarist-graph-svg");
    c.appendChild(svg);
    const edgeEls = edges.map(([a, b]) => {
      const line = document.createElementNS(SVG_NS, "line");
      line.setAttribute("class", "scenarist-graph-edge");
      this.setLine(line, a, b);
      svg.appendChild(line);
      return { line, a, b };
    });
    for (const n of nodes)
      this.renderNode(svg, n, edgeEls);
    const legend = c.createDiv("scenarist-graph-legend");
    const labels = {
      work: "\u041F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F",
      character: "\u041F\u0435\u0440\u0441\u043E\u043D\u0430\u0436\u0438",
      categoryItem: "\u041A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u0438",
      arc: "\u0410\u0440\u043A\u0438",
      anchor: "\u042F\u043A\u043E\u0440\u044F"
    };
    for (const kind of GRAPH_KINDS) {
      const item = legend.createDiv("scenarist-legend-item");
      const dot = item.createEl("span", { cls: "scenarist-status-dot" });
      dot.style.background = NODE_COLORS[kind] || "#888";
      item.createEl("span", { text: labels[kind] });
    }
  }
  setLine(line, a, b) {
    line.setAttribute("x1", String(a.x));
    line.setAttribute("y1", String(a.y));
    line.setAttribute("x2", String(b.x));
    line.setAttribute("y2", String(b.y));
  }
  /** Простая force-directed раскладка (Fruchterman–Reingold-подобная). */
  simulate(nodes, edges, W, H) {
    const area = W * H;
    const k = Math.sqrt(area / Math.max(nodes.length, 1)) * 0.8;
    let temp = W / 8;
    const iterations = 250;
    for (let it = 0; it < iterations; it++) {
      for (const n of nodes) {
        n.vx = 0;
        n.vy = 0;
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          let dx = a.x - b.x;
          let dy = a.y - b.y;
          let dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
          const rep = k * k / dist;
          const ux = dx / dist;
          const uy = dy / dist;
          a.vx += ux * rep;
          a.vy += uy * rep;
          b.vx -= ux * rep;
          b.vy -= uy * rep;
        }
      }
      for (const [a, b] of edges) {
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        let dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
        const att = dist * dist / k;
        const ux = dx / dist;
        const uy = dy / dist;
        a.vx -= ux * att;
        a.vy -= uy * att;
        b.vx += ux * att;
        b.vy += uy * att;
      }
      for (const n of nodes) {
        const disp = Math.sqrt(n.vx * n.vx + n.vy * n.vy) || 0.01;
        n.x += n.vx / disp * Math.min(disp, temp);
        n.y += n.vy / disp * Math.min(disp, temp);
        n.x = Math.max(40, Math.min(W - 40, n.x));
        n.y = Math.max(40, Math.min(H - 40, n.y));
      }
      temp *= 0.95;
    }
  }
  renderNode(svg, n, edgeEls) {
    const g = document.createElementNS(SVG_NS, "g");
    g.setAttribute("class", "scenarist-graph-node");
    const place = () => g.setAttribute("transform", `translate(${n.x}, ${n.y})`);
    place();
    const circle = document.createElementNS(SVG_NS, "circle");
    const selected = n.e.id === this.plugin.selectedId;
    circle.setAttribute("r", selected ? "11" : "7");
    circle.setAttribute("fill", NODE_COLORS[n.e.kind] || "#888");
    if (selected)
      circle.setAttribute("stroke", "var(--text-normal)");
    g.appendChild(circle);
    const label = document.createElementNS(SVG_NS, "text");
    label.setAttribute("y", "22");
    label.setAttribute("text-anchor", "middle");
    label.setAttribute("class", "scenarist-graph-label");
    label.textContent = n.e.name;
    g.appendChild(label);
    let dragging = false;
    g.addEventListener("mousedown", (ev) => {
      dragging = true;
      ev.preventDefault();
    });
    const move = (ev) => {
      if (!dragging)
        return;
      const pt = this.svgPoint(svg, ev);
      n.x = pt.x;
      n.y = pt.y;
      place();
      for (const e of edgeEls)
        if (e.a === n || e.b === n)
          this.setLine(e.line, e.a, e.b);
    };
    const up = () => {
      dragging = false;
    };
    svg.addEventListener("mousemove", move);
    svg.addEventListener("mouseup", up);
    svg.addEventListener("mouseleave", up);
    g.addEventListener("click", () => {
      if (!dragging)
        this.plugin.navigateTo(n.e.id);
    });
    svg.appendChild(g);
  }
  svgPoint(svg, ev) {
    const rect = svg.getBoundingClientRect();
    const vb = svg.viewBox.baseVal;
    const x = (ev.clientX - rect.left) / rect.width * vb.width;
    const y = (ev.clientY - rect.top) / rect.height * vb.height;
    return { x, y };
  }
};

// src/views/TimelineView.ts
var import_obsidian10 = require("obsidian");
var TIMELINE_VIEW = "scenarist-timeline";
var TimelineView = class extends import_obsidian10.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.unsub = [];
    this.plugin = plugin;
  }
  getViewType() {
    return TIMELINE_VIEW;
  }
  getDisplayText() {
    return "\u0422\u0430\u0439\u043C\u043B\u0430\u0439\u043D";
  }
  getIcon() {
    return "clock";
  }
  async onOpen() {
    this.unsub.push(this.plugin.store.onChange(() => this.render()));
    this.render();
  }
  async onClose() {
    this.unsub.forEach((u) => u());
  }
  anchorsOf(workId) {
    return this.plugin.store.byKind("anchor").filter((a) => (a.links["work"] || []).includes(workId)).sort((a, b) => {
      var _a, _b;
      const oa = Number((_a = a.props["order"]) != null ? _a : 1e9);
      const ob = Number((_b = b.props["order"]) != null ? _b : 1e9);
      return oa - ob || a.createdAt - b.createdAt;
    });
  }
  render() {
    const c = this.containerEl.children[1];
    c.empty();
    c.addClass("scenarist-panel", "scenarist-timeline-view");
    const workId = this.plugin.timelineWorkId;
    const work = workId ? this.plugin.store.get(workId) : null;
    const header = c.createDiv("scenarist-panel-header");
    header.createEl("span", {
      cls: "scenarist-panel-title",
      text: work ? `\u{1F552} \u0422\u0430\u0439\u043C\u043B\u0430\u0439\u043D \u2014 ${work.name}` : "\u{1F552} \u0422\u0430\u0439\u043C\u043B\u0430\u0439\u043D"
    });
    if (!work) {
      c.createDiv("scenarist-empty").createEl("p", {
        text: "\u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0442\u0430\u0439\u043C\u043B\u0430\u0439\u043D \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F \u0438\u0437 \u043D\u0430\u0432\u0438\u0433\u0430\u0442\u043E\u0440\u0430"
      });
      return;
    }
    const anchors = this.anchorsOf(work.id);
    if (anchors.length === 0) {
      c.createDiv("scenarist-empty").createEl("p", {
        text: "\u041D\u0435\u0442 \u044F\u043A\u043E\u0440\u0435\u0439. \u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u043A\u043B\u044E\u0447\u0435\u0432\u044B\u0435 \u0441\u043E\u0431\u044B\u0442\u0438\u044F \u0447\u0435\u0440\u0435\u0437 \xAB\uFF0B\xBB \u0443 \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u044F."
      });
      return;
    }
    const rail = c.createDiv("scenarist-tl-rail");
    anchors.forEach((a, idx) => this.renderNode(rail, a, idx, anchors));
  }
  renderNode(rail, anchor, index, all) {
    const node = rail.createDiv("scenarist-tl-node");
    node.draggable = true;
    const dot = node.createDiv("scenarist-tl-dot");
    dot.setText("\u2693");
    const card = node.createDiv("scenarist-tl-card");
    card.createEl("div", { cls: "scenarist-tl-title", text: anchor.name });
    const date = anchor.props["date"];
    if (date)
      card.createEl("div", { cls: "scenarist-tl-date", text: String(date) });
    const desc = anchor.props["description"];
    if (typeof desc === "string" && desc) {
      card.createEl("div", {
        cls: "scenarist-tl-desc",
        text: desc.slice(0, 70) + (desc.length > 70 ? "\u2026" : "")
      });
    }
    card.onclick = () => this.plugin.navigateTo(anchor.id);
    card.ondblclick = () => this.plugin.sync.openNote(anchor);
    node.addEventListener("dragstart", (e) => {
      var _a;
      (_a = e.dataTransfer) == null ? void 0 : _a.setData("text/plain", anchor.id);
      node.addClass("dragging");
    });
    node.addEventListener("dragend", () => node.removeClass("dragging"));
    node.addEventListener("dragover", (e) => e.preventDefault());
    node.addEventListener("drop", (e) => {
      var _a;
      e.preventDefault();
      const draggedId = (_a = e.dataTransfer) == null ? void 0 : _a.getData("text/plain");
      if (!draggedId || draggedId === anchor.id)
        return;
      this.reorder(draggedId, index, all);
    });
  }
  reorder(draggedId, targetIndex, all) {
    const ids = all.map((a) => a.id).filter((id) => id !== draggedId);
    ids.splice(targetIndex, 0, draggedId);
    ids.forEach((id, i) => this.plugin.store.setProp(id, "order", i + 1));
    ids.forEach((id) => {
      const e = this.plugin.store.get(id);
      if (e)
        this.plugin.sync.syncToNote(e);
    });
  }
};

// src/main.ts
var ScenaristPlugin = class extends import_obsidian11.Plugin {
  constructor() {
    super(...arguments);
    this.selectedId = null;
    this.timelineWorkId = null;
    this.selectListeners = [];
    this.history = [];
    this.selectionSaveTimer = null;
  }
  async onload() {
    await this.loadSettings();
    this.store = new ScenaristStore(this);
    this.sync = new SyncEngine(this);
    await this.store.load();
    if (this.settings.lastSelectedId) {
      const restored = this.store.get(this.settings.lastSelectedId);
      if (restored)
        this.selectedId = this.settings.lastSelectedId;
    }
    this.registerView(NAVIGATOR_VIEW, (leaf) => new NavigatorView(leaf, this));
    this.registerView(CARD_VIEW, (leaf) => new CardView(leaf, this));
    this.registerView(BOARD_VIEW, (leaf) => new BoardView(leaf, this));
    this.registerView(GRAPH_VIEW, (leaf) => new GraphView(leaf, this));
    this.registerView(TIMELINE_VIEW, (leaf) => new TimelineView(leaf, this));
    this.addRibbonIcon("film", "Scenarist", () => this.activateLayout());
    this.addCommand({ id: "open-scenarist", name: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C Scenarist", callback: () => this.activateLayout() });
    this.addCommand({ id: "open-board", name: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0434\u043E\u0441\u043A\u0443 \u0433\u043B\u0430\u0432", callback: () => this.openCentre(BOARD_VIEW) });
    this.addCommand({ id: "open-graph", name: "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0433\u0440\u0430\u0444 \u0441\u0432\u044F\u0437\u0435\u0439", callback: () => this.openCentre(GRAPH_VIEW) });
    this.addCommand({
      id: "new-project",
      name: "\u041D\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u0435\u043A\u0442",
      callback: () => new CreateEntityModal(this.app, this, { kind: "project", titleHint: "\u041D\u043E\u0432\u044B\u0439 \u043F\u0440\u043E\u0435\u043A\u0442" }).open()
    });
    this.addCommand({
      id: "new-work",
      name: "\u041D\u043E\u0432\u043E\u0435 \u043F\u0440\u043E\u0438\u0437\u0432\u0435\u0434\u0435\u043D\u0438\u0435 (\u0421\u0435\u0440\u0438\u044F/\u0412\u0430\u043D\u0448\u043E\u0442)",
      callback: () => new CreateWorkModal(this.app, this).open()
    });
    this.addCommand({
      id: "new-character",
      name: "\u041D\u043E\u0432\u044B\u0439 \u043F\u0435\u0440\u0441\u043E\u043D\u0430\u0436",
      callback: () => new CreateEntityModal(this.app, this, { kind: "character" }).open()
    });
    this.addCommand({
      id: "new-category",
      name: "\u041D\u043E\u0432\u0430\u044F \u043A\u0430\u0442\u0435\u0433\u043E\u0440\u0438\u044F",
      callback: () => new CreateCategoryModal(this.app, this).open()
    });
    this.addSettingTab(new ScenaristSettingsTab(this.app, this));
    this.registerEvent(
      this.app.vault.on("modify", (file) => {
        if (file instanceof import_obsidian11.TFile)
          this.sync.handleModify(file);
      })
    );
    this.registerEvent(
      this.app.vault.on("rename", (file, oldPath) => {
        if (file instanceof import_obsidian11.TFile)
          this.sync.handleRename(file, oldPath);
      })
    );
    this.app.workspace.onLayoutReady(() => {
      if (this.app.workspace.getLeavesOfType(NAVIGATOR_VIEW).length === 0)
        this.activateLayout();
    });
  }
  onunload() {
    if (this.selectionSaveTimer !== null) {
      window.clearTimeout(this.selectionSaveTimer);
      this.selectionSaveTimer = null;
    }
    this.store.save();
    void this.saveSettings();
  }
  // ---- выбор и навигация ----
  select(id) {
    this.selectedId = id;
    this.settings.lastSelectedId = id != null ? id : void 0;
    this.debounceSaveSelection();
    if (id)
      void this.ensureCard();
    this.selectListeners.forEach((fn) => fn());
  }
  debounceSaveSelection() {
    if (this.selectionSaveTimer !== null)
      window.clearTimeout(this.selectionSaveTimer);
    this.selectionSaveTimer = window.setTimeout(() => {
      this.selectionSaveTimer = null;
      this.saveSettings();
    }, 800);
  }
  navigateTo(id) {
    if (this.selectedId && this.selectedId !== id)
      this.history.push(this.selectedId);
    this.select(id);
  }
  canGoBack() {
    return this.history.length > 0;
  }
  back() {
    const prev = this.history.pop();
    if (prev)
      this.select(prev);
  }
  onSelect(fn) {
    this.selectListeners.push(fn);
    return () => {
      this.selectListeners = this.selectListeners.filter((l) => l !== fn);
    };
  }
  refreshViews() {
    this.store.save();
    this.selectListeners.forEach((fn) => fn());
  }
  async openTimeline(workId) {
    this.timelineWorkId = workId;
    await this.openCentre(TIMELINE_VIEW);
    this.selectListeners.forEach((fn) => fn());
  }
  // ---- лейаут ----
  async activateLayout() {
    const { workspace } = this.app;
    let nav = workspace.getLeavesOfType(NAVIGATOR_VIEW)[0];
    if (!nav) {
      nav = workspace.getLeftLeaf(false);
      await nav.setViewState({ type: NAVIGATOR_VIEW, active: true });
    }
    await this.ensureCard();
    workspace.revealLeaf(nav);
  }
  async ensureCard() {
    let card = this.app.workspace.getLeavesOfType(CARD_VIEW)[0];
    if (!card) {
      card = this.app.workspace.getLeaf(false);
      await card.setViewState({ type: CARD_VIEW, active: true });
    }
    this.app.workspace.revealLeaf(card);
    return card;
  }
  async openCentre(type) {
    const existing = this.app.workspace.getLeavesOfType(type)[0];
    const leaf = existing || this.app.workspace.getLeaf("tab");
    await leaf.setViewState({ type, active: true });
    this.app.workspace.revealLeaf(leaf);
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    let migrated = false;
    for (const qt of this.settings.categoryQuickTypes) {
      if (qt.isDefault) {
        const def = DEFAULT_QUICK_TYPES.find((d) => d.id === qt.id);
        if (def && [...qt.icon].length <= 2) {
          qt.icon = def.icon;
          migrated = true;
        }
      }
    }
    if (migrated)
      await this.saveSettings();
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
