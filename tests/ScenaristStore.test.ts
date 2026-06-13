import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ScenaristStore } from '../src/models/ScenaristStore';
import type ScenaristPlugin from '../src/main';

function makeMockPlugin(overrides: { read?: () => Promise<string> } = {}) {
	return {
		app: {
			vault: {
				adapter: {
					read: overrides.read ?? vi.fn().mockRejectedValue(new Error('not found')),
					write: vi.fn().mockResolvedValue(undefined),
					exists: vi.fn().mockResolvedValue(true),
					mkdir: vi.fn().mockResolvedValue(undefined),
				},
			},
		},
	} as unknown as ScenaristPlugin;
}

describe('ScenaristStore — вторичные индексы', () => {
	let store: ScenaristStore;

	beforeEach(() => {
		vi.useFakeTimers();
		store = new ScenaristStore(makeMockPlugin());
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('byKind возвращает только что созданную сущность', () => {
		const e = store.create('character', 'Иван');
		expect(store.byKind('character')).toContainEqual(e);
	});

	it('byKind возвращает пустой массив для незаполненного вида', () => {
		expect(store.byKind('chapter')).toEqual([]);
	});

	it('byKind не возвращает удалённую сущность', () => {
		const e = store.create('character', 'Иван');
		store.delete(e.id);
		expect(store.byKind('character')).not.toContainEqual(e);
	});

	it('byKind фильтрует по виду корректно', () => {
		store.create('character', 'Иван');
		store.create('character', 'Мария');
		store.create('chapter', 'Глава 1');
		expect(store.byKind('character')).toHaveLength(2);
		expect(store.byKind('chapter')).toHaveLength(1);
	});

	it('findByPath возвращает null для неизвестного пути', () => {
		expect(store.findByPath('unknown/path.md')).toBeNull();
	});

	it('findByPath находит сущность после setFilePath', () => {
		const e = store.create('character', 'Иван');
		store.setFilePath(e.id, 'Scenarist/Иван.md');
		expect(store.findByPath('Scenarist/Иван.md')).toEqual(e);
	});

	it('findByPath обновляется при повторном setFilePath', () => {
		const e = store.create('character', 'Иван');
		store.setFilePath(e.id, 'old/Иван.md');
		store.setFilePath(e.id, 'new/Иван.md');
		expect(store.findByPath('old/Иван.md')).toBeNull();
		expect(store.findByPath('new/Иван.md')).toEqual(e);
	});

	it('findByPath возвращает null после удаления сущности', () => {
		const e = store.create('character', 'Иван');
		store.setFilePath(e.id, 'Scenarist/Иван.md');
		store.delete(e.id);
		expect(store.findByPath('Scenarist/Иван.md')).toBeNull();
	});
});

describe('ScenaristStore — реципрокные связи', () => {
	let store: ScenaristStore;

	beforeEach(() => {
		vi.useFakeTimers();
		store = new ScenaristStore(makeMockPlugin());
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('setLink(work, books) обновляет book.work', () => {
		const work = store.create('work', 'Тест');
		const book = store.create('book', 'Книга 1');
		store.setLink(work.id, 'books', [book.id]);
		expect(store.get(book.id)?.links['work']).toContain(work.id);
	});

	it('снятие ссылки work.books очищает book.work', () => {
		const work = store.create('work', 'Тест');
		const book = store.create('book', 'Книга 1');
		store.setLink(work.id, 'books', [book.id]);
		store.setLink(work.id, 'books', []);
		expect(store.get(book.id)?.links['work'] ?? []).not.toContain(work.id);
	});

	it('setLink(book, chapters) обновляет chapter.book', () => {
		const book = store.create('book', 'Книга 1');
		const chapter = store.create('chapter', 'Глава 1');
		store.setLink(book.id, 'chapters', [chapter.id]);
		expect(store.get(chapter.id)?.links['book']).toContain(book.id);
	});

	it('setLink(work, arcs) обновляет arc.work', () => {
		const work = store.create('work', 'Тест');
		const arc = store.create('arc', 'Арка 1');
		store.setLink(work.id, 'arcs', [arc.id]);
		expect(store.get(arc.id)?.links['work']).toContain(work.id);
	});
});

describe('ScenaristStore — single-link реципрокность (Fix 4)', () => {
	let store: ScenaristStore;

	beforeEach(() => {
		vi.useFakeTimers();
		store = new ScenaristStore(makeMockPlugin());
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('перенос главы в другую книгу убирает её из старой книги', () => {
		const bookA = store.create('book', 'Книга А');
		const bookB = store.create('book', 'Книга Б');
		const chapter = store.create('chapter', 'Глава 1');

		store.setLink(bookA.id, 'chapters', [chapter.id]);
		expect(store.get(chapter.id)?.links['book']).toEqual([bookA.id]);
		expect(store.get(bookA.id)?.links['chapters']).toContain(chapter.id);

		// Перенос в bookB
		store.setLink(bookB.id, 'chapters', [chapter.id]);
		expect(store.get(chapter.id)?.links['book']).toEqual([bookB.id]);
		expect(store.get(bookA.id)?.links['chapters']).not.toContain(chapter.id);
		expect(store.get(bookB.id)?.links['chapters']).toContain(chapter.id);
	});

	it('chapter.book содержит только одну книгу', () => {
		const bookA = store.create('book', 'Книга А');
		const bookB = store.create('book', 'Книга Б');
		const chapter = store.create('chapter', 'Глава 1');

		store.setLink(bookA.id, 'chapters', [chapter.id]);
		store.setLink(bookB.id, 'chapters', [chapter.id]);
		expect(store.get(chapter.id)?.links['book']).toHaveLength(1);
		expect(store.get(chapter.id)?.links['book']).toEqual([bookB.id]);
	});
});

describe('ScenaristStore — загрузка и миграция', () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it('загружает сущности из файла и восстанавливает индексы', async () => {
		vi.useFakeTimers();
		const data = JSON.stringify({
			version: 2,
			activeProjectId: null,
			entities: [
				{
					id: 'abc123',
					kind: 'character',
					name: 'Иван',
					filePath: 'Scenarist/Иван.md',
					props: {},
					links: {},
					createdAt: 0,
					updatedAt: 0,
				},
			],
		});

		const store = new ScenaristStore(
			makeMockPlugin({ read: vi.fn().mockResolvedValue(data) }),
		);
		await store.load();

		expect(store.all()).toHaveLength(1);
		expect(store.get('abc123')?.name).toBe('Иван');
		expect(store.byKind('character')).toHaveLength(1);
		expect(store.findByPath('Scenarist/Иван.md')?.id).toBe('abc123');
	});

	it('при пустом vault первый запуск не падает — индекс пуст', async () => {
		vi.useFakeTimers();
		const store = new ScenaristStore(makeMockPlugin());
		await store.load();
		expect(store.all()).toHaveLength(0);
	});

	it('мигрирует из legacy-пути и сохраняет в новый', async () => {
		vi.useFakeTimers();
		const legacyData = JSON.stringify({
			version: 2,
			activeProjectId: null,
			entities: [
				{
					id: 'abc123',
					kind: 'character',
					name: 'Иван',
					filePath: '',
					props: {},
					links: {},
					createdAt: 0,
					updatedAt: 0,
				},
			],
		});

		const adapter = {
			read: vi
				.fn()
				.mockRejectedValueOnce(new Error('not found')) // новый путь
				.mockResolvedValueOnce(legacyData), // legacy-путь
			write: vi.fn().mockResolvedValue(undefined),
			exists: vi.fn().mockResolvedValue(true),
			mkdir: vi.fn().mockResolvedValue(undefined),
		};
		const plugin = { app: { vault: { adapter } } } as unknown as ScenaristPlugin;

		const store = new ScenaristStore(plugin);
		await store.load();

		expect(store.get('abc123')?.name).toBe('Иван');
		expect(adapter.write).toHaveBeenCalledWith(
			expect.stringContaining('obsidian-scenarist/scenarist-index.json'),
			expect.any(String),
		);
	});
});
