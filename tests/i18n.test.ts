import { describe, it, expect, beforeEach } from 'vitest';
import { t, setLocale, detectLang } from '../src/i18n';

describe('t() — translation helper', () => {
	beforeEach(() => setLocale('ru'));

	it('returns translated string for known key', () => {
		expect(t('nav.search')).toBe('Поиск…');
	});

	it('falls back to key when path is missing', () => {
		expect(t('nav.nonexistentKey')).toBe('nav.nonexistentKey');
	});

	it('returns custom fallback when provided and key is missing', () => {
		expect(t('nav.nonexistentKey', undefined, 'default value')).toBe('default value');
	});

	it('interpolates {{var}} placeholders', () => {
		expect(t('nav.deleteConfirmTitle', { name: 'Hero' })).toBe('Удалить «Hero»?');
	});

	it('interpolates multiple vars', () => {
		setLocale('en');
		expect(t('nav.deleteConfirmTextCategory', { count: 5 })).toContain('5');
	});

	it('leaves unknown vars as-is (key name)', () => {
		// t() replaces {{k}} with vars[k] ?? k (the key name itself as fallback)
		expect(t('nav.deleteConfirmTitle', {})).toBe('Удалить «name»?');
	});

	it('returns key when intermediate node is not an object', () => {
		// e.g. nav.search is a string, so nav.search.nested is not found
		expect(t('nav.search.nested')).toBe('nav.search.nested');
	});
});

describe('setLocale / t() — locale switching', () => {
	it('uses ru locale by default', () => {
		setLocale('ru');
		expect(t('nav.search')).toBe('Поиск…');
	});

	it('switches to en locale', () => {
		setLocale('en');
		expect(t('nav.search')).toBe('Search…');
	});

	it('falls back to ru for unknown locale', () => {
		setLocale('fr');
		expect(t('nav.search')).toBe('Поиск…');
	});
});

describe('detectLang()', () => {
	it('returns "en" when moment locale is "en"', () => {
		(window as any).moment = { locale: () => 'en' };
		expect(detectLang()).toBe('en');
	});

	it('returns "ru" when moment locale is "ru"', () => {
		(window as any).moment = { locale: () => 'ru' };
		expect(detectLang()).toBe('ru');
	});

	it('matches prefix (ru-RU → ru)', () => {
		(window as any).moment = { locale: () => 'ru-RU' };
		expect(detectLang()).toBe('ru');
	});

	it('defaults to "en" for unknown locale', () => {
		(window as any).moment = { locale: () => 'fr' };
		expect(detectLang()).toBe('en');
	});
});
