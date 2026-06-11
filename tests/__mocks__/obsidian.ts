// Minimal Obsidian API mock for unit tests.
// Only covers what SyncEngine and other tested modules actually import.

export function normalizePath(path: string): string {
	return path
		.replace(/\\/g, '/')
		.replace(/\/+/g, '/')
		.replace(/^\//, '')
		.replace(/\/$/, '');
}

export class TFile {
	path: string;
	name: string;
	basename: string;
	extension: string;

	constructor(path = '') {
		this.path = path;
		this.name = path.split('/').pop() ?? '';
		this.basename = this.name.replace(/\.[^.]+$/, '');
		this.extension = this.name.includes('.') ? (this.name.split('.').pop() ?? '') : '';
	}
}

export class TFolder {
	path = '';
	name = '';
	children: TFile[] = [];
}

export class TAbstractFile {
	path = '';
	name = '';
}

export class Plugin {}
export class ItemView {}
export class WorkspaceLeaf {}
export class Modal {}
export class Setting {}
export class Notice {}
export class MarkdownRenderer {
	static async render() {}
}
