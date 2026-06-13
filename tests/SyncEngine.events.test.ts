import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SyncEngine } from '../src/sync/SyncEngine';
import { TFile } from 'obsidian';
import type ScenaristPlugin from '../src/main';
import type { Entity } from '../src/models/types';

function makeFile(path: string): TFile {
	return new TFile(path);
}

function makeEntity(id: string, filePath: string): Entity {
	return {
		id,
		kind: 'character',
		name: 'Test',
		filePath,
		props: {},
		links: {},
		createdAt: 0,
		updatedAt: 0,
	};
}

// ---- Fix 1: фильтрация событий по расширению ----

describe('SyncEngine — handleCreate игнорирует .sc файлы (Fix 1)', () => {
	let engine: SyncEngine;
	const setFilePath = vi.fn();
	const readSidecar = vi.fn().mockResolvedValue(null);
	const entity = makeEntity('id1', 'Scenarist/Иван.md');

	beforeEach(() => {
		vi.useFakeTimers();
		setFilePath.mockClear();
		readSidecar.mockClear();

		engine = new SyncEngine({
			settings: { rootFolder: 'Scenarist' },
			store: {
				findByPath: (path: string) => (path === entity.filePath ? entity : null),
				setFilePath,
				get: vi.fn().mockReturnValue(null),
				sidecarPath: (fp: string) => fp.replace(/\.md$/, '.sc'),
				readSidecar,
				resolved: () => ({ fields: [], links: [] }),
				save: vi.fn().mockResolvedValue(undefined),
			},
			app: {
				metadataCache: { getFileCache: vi.fn().mockReturnValue(null) },
				fileManager: { trashFile: vi.fn().mockResolvedValue(undefined) },
				vault: {
					getAbstractFileByPath: vi.fn().mockReturnValue(null),
					getMarkdownFiles: vi.fn().mockReturnValue([]),
				},
			},
			refreshViews: vi.fn(),
		} as unknown as ScenaristPlugin);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('handleCreate для .sc не вызывает readSidecar', async () => {
		engine.handleCreate(makeFile('Scenarist/Иван.sc'));
		await vi.runAllTimersAsync();
		expect(readSidecar).not.toHaveBeenCalled();
	});

	it('handleCreate для .sc не меняет filePath сущности', async () => {
		engine.handleCreate(makeFile('Scenarist/Иван.sc'));
		await vi.runAllTimersAsync();
		expect(setFilePath).not.toHaveBeenCalled();
	});

	it('handleModify для .sc не обращается к store', () => {
		engine.handleModify(makeFile('Scenarist/Иван.sc'));
		expect(setFilePath).not.toHaveBeenCalled();
	});
});

// ---- Fix 3: deleteEntity удаляет sidecar ----

describe('SyncEngine — deleteEntity удаляет .sc sidecar (Fix 3)', () => {
	let engine: SyncEngine;
	const trashFile = vi.fn().mockResolvedValue(undefined);

	beforeEach(() => {
		vi.useFakeTimers();
		trashFile.mockClear();

		const entity = makeEntity('id1', 'Scenarist/Иван.md');
		const mdFile = new TFile('Scenarist/Иван.md');
		const scFile = new TFile('Scenarist/Иван.sc');

		engine = new SyncEngine({
			settings: { rootFolder: 'Scenarist' },
			store: {
				get: vi.fn().mockReturnValue(entity),
				delete: vi.fn(),
				sidecarPath: (fp: string) => fp.replace(/\.md$/, '.sc'),
				categoryItems: vi.fn().mockReturnValue([]),
				save: vi.fn().mockResolvedValue(undefined),
			},
			app: {
				vault: {
					getAbstractFileByPath: (path: string) => {
						if (path === 'Scenarist/Иван.md') return mdFile;
						if (path === 'Scenarist/Иван.sc') return scFile;
						return null;
					},
				},
				fileManager: { trashFile },
			},
			refreshViews: vi.fn(),
		} as unknown as ScenaristPlugin);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('deleteEntity удаляет .md файл', async () => {
		await engine.deleteEntity('id1');
		const paths = trashFile.mock.calls.map((c: unknown[]) => (c[0] as TFile).path);
		expect(paths).toContain('Scenarist/Иван.md');
	});

	it('deleteEntity удаляет .sc sidecar', async () => {
		await engine.deleteEntity('id1');
		const paths = trashFile.mock.calls.map((c: unknown[]) => (c[0] as TFile).path);
		expect(paths).toContain('Scenarist/Иван.sc');
	});
});

// ---- Fix 5: selfWrites временное окно ----

describe('SyncEngine — selfWrites тайм-окно (Fix 5)', () => {
	let engine: SyncEngine;
	const storeSave = vi.fn().mockResolvedValue(undefined);
	const processFrontMatter = vi.fn().mockResolvedValue(undefined);
	const filePath = 'Scenarist/Иван.md';

	function makeEngine() {
		const entity = makeEntity('id1', filePath);
		entity.props = { someField: 'old' };

		return new SyncEngine({
			settings: { rootFolder: 'Scenarist' },
			store: {
				findByPath: (path: string) => (path === filePath ? entity : null),
				get: vi.fn().mockReturnValue(entity),
				sidecarPath: (fp: string) => fp.replace(/\.md$/, '.sc'),
				resolved: () => ({
					fields: [{ key: 'someField', type: 'text', label: 'Field' }],
					links: [],
				}),
				save: storeSave,
			},
			app: {
				metadataCache: {
					getFileCache: vi.fn().mockReturnValue({
						frontmatter: { someField: 'new value' },
					}),
				},
				fileManager: { processFrontMatter },
				vault: {
					getAbstractFileByPath: (path: string) => new TFile(path),
				},
			},
			refreshViews: vi.fn(),
		} as unknown as ScenaristPlugin);
	}

	beforeEach(() => {
		vi.useFakeTimers();
		storeSave.mockClear();
		processFrontMatter.mockClear();
		engine = makeEngine();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('handleModify сразу после syncToNote игнорируется (< 1500 мс)', async () => {
		const entity = makeEntity('id1', filePath);
		await engine.syncToNote(entity, new TFile(filePath));
		storeSave.mockClear();

		engine.handleModify(makeFile(filePath));
		expect(storeSave).not.toHaveBeenCalled();
	});

	it('handleModify через 2 с после syncToNote обрабатывается', async () => {
		const entity = makeEntity('id1', filePath);
		await engine.syncToNote(entity, new TFile(filePath));
		storeSave.mockClear();

		// Advance 2 seconds without any modify (no ghost vault event)
		vi.advanceTimersByTime(2000);

		engine.handleModify(makeFile(filePath));
		expect(storeSave).toHaveBeenCalled();
	});
});
