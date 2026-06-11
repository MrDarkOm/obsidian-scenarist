import { describe, it, expect, beforeEach } from 'vitest';
import { SyncEngine } from '../src/sync/SyncEngine';
import type ScenaristPlugin from '../src/main';
import type { Entity, EntityKind } from '../src/models/types';

function makeEntity(
	id: string,
	kind: EntityKind,
	name: string,
	links: Record<string, string[]> = {},
): Entity {
	return { id, kind, name, filePath: '', props: {}, links, createdAt: 0, updatedAt: 0 };
}

describe('SyncEngine.buildPath', () => {
	const registry = new Map<string, Entity>();

	const mockPlugin = {
		settings: { rootFolder: 'Scenarist' },
		store: {
			get: (id: string) => registry.get(id) ?? null,
			resolved: () => ({ fields: [], links: [] }),
		},
	} as unknown as ScenaristPlugin;

	let engine: SyncEngine;

	beforeEach(() => {
		registry.clear();
		engine = new SyncEngine(mockPlugin);
	});

	function reg(id: string, kind: EntityKind, name: string, links: Record<string, string[]> = {}): Entity {
		const e = makeEntity(id, kind, name, links);
		registry.set(id, e);
		return e;
	}

	it('project → projFolder/Name.md', () => {
		const proj = reg('p1', 'project', 'TestProject');
		expect(engine.buildPath(proj)).toBe('Scenarist/TestProject/TestProject.md');
	});

	it('work → projFolder/Name/Name.md', () => {
		reg('p1', 'project', 'TestProject');
		const work = reg('w1', 'work', 'MyWork', { project: ['p1'] });
		expect(engine.buildPath(work)).toBe('Scenarist/TestProject/MyWork/MyWork.md');
	});

	it('character → projFolder/Персонажи/Name.md', () => {
		reg('p1', 'project', 'TestProject');
		const char = reg('c1', 'character', 'Иван', { project: ['p1'] });
		expect(engine.buildPath(char)).toBe('Scenarist/TestProject/Персонажи/Иван.md');
	});

	it('category → projFolder/Name/Name.md', () => {
		reg('p1', 'project', 'TestProject');
		const cat = reg('cat1', 'category', 'Организации', { project: ['p1'] });
		expect(engine.buildPath(cat)).toBe('Scenarist/TestProject/Организации/Организации.md');
	});

	it('categoryItem → projFolder/CategoryName/Name.md', () => {
		reg('p1', 'project', 'TestProject');
		reg('cat1', 'category', 'Организации', { project: ['p1'] });
		const item = reg('i1', 'categoryItem', 'SPECTRE', { category: ['cat1'], project: ['p1'] });
		expect(engine.buildPath(item)).toBe('Scenarist/TestProject/Организации/SPECTRE.md');
	});

	it('book → projFolder/WorkName/Книги/Name.md', () => {
		reg('p1', 'project', 'TestProject');
		reg('w1', 'work', 'MyWork', { project: ['p1'] });
		const book = reg('b1', 'book', 'Book One', { work: ['w1'] });
		expect(engine.buildPath(book)).toBe('Scenarist/TestProject/MyWork/Книги/Book One.md');
	});

	it('arc → projFolder/WorkName/Арки/Name.md', () => {
		reg('p1', 'project', 'TestProject');
		reg('w1', 'work', 'MyWork', { project: ['p1'] });
		const arc = reg('a1', 'arc', 'MyArc', { work: ['w1'] });
		expect(engine.buildPath(arc)).toBe('Scenarist/TestProject/MyWork/Арки/MyArc.md');
	});

	it('anchor → projFolder/WorkName/Якоря/Name.md', () => {
		reg('p1', 'project', 'TestProject');
		reg('w1', 'work', 'MyWork', { project: ['p1'] });
		const anchor = reg('an1', 'anchor', 'Событие 1', { work: ['w1'] });
		expect(engine.buildPath(anchor)).toBe('Scenarist/TestProject/MyWork/Якоря/Событие 1.md');
	});

	it('chapter → projFolder/WorkName/Главы/Name.md (через book)', () => {
		reg('p1', 'project', 'TestProject');
		reg('w1', 'work', 'MyWork', { project: ['p1'] });
		reg('b1', 'book', 'Book One', { work: ['w1'] });
		const chapter = reg('ch1', 'chapter', 'Глава 1', { book: ['b1'] });
		expect(engine.buildPath(chapter)).toBe('Scenarist/TestProject/MyWork/Главы/Глава 1.md');
	});

	it('page → projFolder/WorkName/Страницы/Name.md (через chapter → book)', () => {
		reg('p1', 'project', 'TestProject');
		reg('w1', 'work', 'MyWork', { project: ['p1'] });
		reg('b1', 'book', 'Book One', { work: ['w1'] });
		reg('ch1', 'chapter', 'Глава 1', { book: ['b1'] });
		const page = reg('pg1', 'page', 'Стр. 1', { chapter: ['ch1'] });
		expect(engine.buildPath(page)).toBe('Scenarist/TestProject/MyWork/Страницы/Стр. 1.md');
	});

	it('entity без project-ссылки → _Без проекта', () => {
		const char = reg('c1', 'character', 'Иван');
		expect(engine.buildPath(char)).toBe('Scenarist/_Без проекта/Персонажи/Иван.md');
	});

	it('chapter без book → _Без произведения в пути', () => {
		const chapter = reg('ch1', 'chapter', 'Глава-сирота', {});
		expect(engine.buildPath(chapter)).toBe('Scenarist/_Без проекта/_Без произведения/Главы/Глава-сирота.md');
	});

	it('спецсимволы в имени заменяются на -', () => {
		reg('p1', 'project', 'TestProject');
		const char = reg('c1', 'character', 'Иван/Петров:Дубль', { project: ['p1'] });
		expect(engine.buildPath(char)).toBe('Scenarist/TestProject/Персонажи/Иван-Петров-Дубль.md');
	});

	it('спецсимволы в имени проекта тоже экранируются', () => {
		const proj = reg('p1', 'project', 'My:Project');
		expect(engine.buildPath(proj)).toBe('Scenarist/My-Project/My-Project.md');
	});
});
