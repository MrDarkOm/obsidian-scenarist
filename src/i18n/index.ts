import { ru } from './ru';
import { en } from './en';

const LOCALES: Record<string, typeof ru> = { ru, en };

let translations: typeof ru = ru;
let currentLang = 'ru';

/** Определяет язык по локали Obsidian (window.moment.locale()). */
export function detectLang(): string {
	const locale: string = (window as any).moment?.locale?.() ?? 'en';
	return Object.keys(LOCALES).find((l) => locale.startsWith(l)) ?? 'en';
}

export function setLocale(lang: string): void {
	translations = LOCALES[lang] ?? ru;
	currentLang = LOCALES[lang] ? lang : 'ru';
}

export function getLang(): string {
	return currentLang;
}

/**
 * Translate a dot-path key, optionally interpolating {{var}} placeholders.
 * Falls back to `fallback` (or the key itself) when the key is not found.
 */
export function t(key: string, vars?: Record<string, string | number>, fallback?: string): string {
	const parts = key.split('.');
	let node: unknown = translations;
	for (const p of parts) {
		if (node === null || node === undefined || typeof node !== 'object') return fallback ?? key;
		node = (node as Record<string, unknown>)[p];
	}
	if (typeof node !== 'string') return fallback ?? key;
	if (vars === undefined) return node;
	return node.replace(/\{\{(\w+)\}\}/g, (_, k: string) => String(vars[k] ?? k));
}
