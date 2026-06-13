import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SyncEngine } from '../src/sync/SyncEngine';
import { TFile } from 'obsidian';
import type ScenaristPlugin from '../src/main';
import type { Entity } from '../src/models/types';
import { isValidEntity } from '../src/models/types';

function makeEntity(id: string, kind: Entity['kind'], name: string, filePath = ''): Entity {
	return { id, kind, name, filePath, props: {}, links: {}, createdAt: 0, updatedAt: 0 };
}

// ---- Fix 9: коллизии имён ----

describe('SyncEngine — ensureNote суффикс при коллизии (Fix 9)', () => {
	let engine: SyncEngine;
	const setFilePath = vi.fn();
	const existingEntity = makeEntity('other-id', 'character', 'Иван', 'Scenarist/_Без проекта/Персонажи/Иван.md');

	beforeEach(() => {
		vi.useFakeTimers();
		setFilePath.mockClear();

		engine = new SyncEngine({
			settings: { rootFolder: 'Scenarist' },
			store: {
				get: vi.fn().mockReturnValue(null),
				findByPath: (path: string) => {
					// 'Иван.md' is owned by another entity; 'Иван (2).md' is free
					if (path === 'Scenarist/_Без проекта/Персонажи/Иван.md') return existingEntity;
					return null;
				},
				setFilePath,
				resolved: () => ({ fields: [], links: [] }),
				save: vi.fn().mockResolvedValue(undefined),
			},
			app: {
				vault: {
					getAbstractFileByPath: vi.fn().mockReturnValue(null),
					create: vi.fn().mockResolvedValue(new TFile('Scenarist/_Без проекта/Персонажи/Иван (2).md')),
					adapter: { exists: vi.fn().mockResolvedValue(true), mkdir: vi.fn() },
				},
				fileManager: {
					processFrontMatter: vi.fn().mockResolvedValue(undefined),
				},
			},
			refreshViews: vi.fn(),
		} as unknown as ScenaristPlugin);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('ensureNote выбирает суффикс (2) при коллизии', async () => {
		const entity = makeEntity('my-id', 'character', 'Иван');
		await engine.ensureNote(entity);
		// Should call setFilePath with the (2) variant, not the base path
		expect(setFilePath).toHaveBeenCalledWith(
			'my-id',
			expect.stringContaining('Иван (2).md'),
		);
	});
});

// ---- Fix 10: isValidEntity ----

describe('isValidEntity — валидация (Fix 10)', () => {
	it('возвращает true для корректной сущности', () => {
		const valid = makeEntity('abc', 'character', 'Test');
		expect(isValidEntity(valid)).toBe(true);
	});

	it('возвращает false для null', () => {
		expect(isValidEntity(null)).toBe(false);
	});

	it('возвращает false для объекта без id', () => {
		expect(isValidEntity({ kind: 'character', name: 'Test', props: {}, links: {} })).toBe(false);
	});

	it('возвращает false когда props — массив', () => {
		expect(isValidEntity({ id: 'abc', kind: 'character', name: 'Test', props: [], links: {} })).toBe(false);
	});

	it('возвращает false когда links — массив', () => {
		expect(isValidEntity({ id: 'abc', kind: 'character', name: 'Test', props: {}, links: [] })).toBe(false);
	});

	it('возвращает false для строки', () => {
		expect(isValidEntity('{"id":"abc"}')).toBe(false);
	});
});
