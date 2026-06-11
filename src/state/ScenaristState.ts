import type ScenaristPlugin from '../main';

/**
 * Управляет состоянием UI: выбранный элемент, история навигации,
 * подписки на смену выбора, workId для таймлайна.
 *
 * Выделено из ScenaristPlugin для разделения ответственности.
 */
export class ScenaristState {
	selectedId: string | null = null;
	timelineWorkId: string | null = null;

	private history: string[] = [];
	private listeners: Array<() => void> = [];
	private saveTimer: number | null = null;

	constructor(private plugin: ScenaristPlugin) {}

	// ---- навигация ----

	select(id: string | null) {
		this.selectedId = id;
		this.plugin.settings.lastSelectedId = id ?? undefined;
		this.debounceSave();
		this.notify();
	}

	navigateTo(id: string) {
		if (this.selectedId && this.selectedId !== id) {
			this.history.push(this.selectedId);
		}
		this.select(id);
	}

	back() {
		const prev = this.history.pop();
		if (prev) this.select(prev);
	}

	canGoBack(): boolean {
		return this.history.length > 0;
	}

	// ---- подписки ----

	/** Подписаться на смену выбора. Возвращает функцию отписки. */
	onSelect(fn: () => void): () => void {
		this.listeners.push(fn);
		return () => {
			this.listeners = this.listeners.filter((l) => l !== fn);
		};
	}

	/** Сообщить всем подписчикам об изменении (используется при обновлении Store). */
	notify() {
		this.listeners.forEach((fn) => fn());
	}

	// ---- сброс ----

	/** Вызывается при onunload: немедленно сохраняем settings без debounce. */
	flushSave() {
		if (this.saveTimer !== null) {
			window.clearTimeout(this.saveTimer);
			this.saveTimer = null;
		}
	}

	// ---- private ----

	private debounceSave() {
		if (this.saveTimer !== null) window.clearTimeout(this.saveTimer);
		this.saveTimer = window.setTimeout(() => {
			this.saveTimer = null;
			void this.plugin.saveSettings();
		}, 800);
	}
}
