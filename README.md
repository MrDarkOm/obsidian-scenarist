# Scenarist — Obsidian Plugin

Writing and worldbuilding tool for Obsidian. Manage works, books, arcs, chapters, characters and custom world categories — all inside your vault.

## Features

### Navigator panel
- **Project selector** — switch between projects or work without a project
- **Works** tab — hierarchy: Work → Books → Chapters / Arcs → Anchors; timeline button per work
- **Characters** tab — grouped by role (derived from schema options)
- **Custom category tabs** — Organizations, Locations, Languages or any type you define in settings
- Context menus on every entity (open card, open note, delete with confirmation modal)
- Search across all sections simultaneously

### Card view
- Inline editing of all properties
- Visual tag chips in header — click a tag opens Obsidian's global search
- Backlinks field (`[[wikilinks]]`)
- Relation chips with add / remove
- Breadcrumb navigation
- Character card has tabbed layout (Basic / Characteristics / Biography / Appearance)

### Timeline view
- Horizontal rail of anchors (key events) for a work
- Drag to reorder

### Board view
- Kanban of chapters by status

### Graph view
- Force-directed graph of all entities, scoped to active project
- Drag nodes to rearrange; positions are cached between renders

### Sidecar files (`.sc`)
Each `.md` note has a companion `.sc` JSON file (same name, different extension) that stores a snapshot of the entity. Clicking a `.sc` file in the vault tree opens a pinned card view for that entity. Sidecar files are written automatically and should not be edited manually.

### Settings
- Quick category types — toggle or create custom types with Lucide icon picker
- Edit icon & label of custom types
- Root folder, auto-create notes toggle

## Installation

### BRAT (recommended for beta users)
1. Install [BRAT](https://github.com/TfTHacker/obsidian42-brat) plugin
2. Run **BRAT: Add a beta plugin** → enter `MrDarkOm/obsidian-scenarist`

### Manual
1. Download `main.js`, `manifest.json`, `styles.css` from the [latest release](https://github.com/MrDarkOm/obsidian-scenarist/releases/latest)
2. Create folder `.obsidian/plugins/obsidian-scenarist/` in your vault
3. Copy the three files there
4. Enable the plugin in Settings → Community plugins

### Build from source
```bash
git clone https://github.com/MrDarkOm/obsidian-scenarist
cd obsidian-scenarist
npm install
npm run build
```

## Roadmap
- Frontmatter as source of truth + Bases integration
- Custom field editor per category
- Inline prose editing in chapter cards
- Notion data import
