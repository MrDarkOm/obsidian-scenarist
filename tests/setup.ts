// ScenaristStore uses `window.setTimeout` / `window.clearTimeout` (Obsidian DOM context).
// In Node test environment, expose globalThis as `window` so those calls resolve.
Object.defineProperty(globalThis, 'window', { value: globalThis, writable: true });
