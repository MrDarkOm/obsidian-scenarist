import esbuild from "esbuild";
import process from "process";
import fs from "fs";
import builtins from "builtin-modules";

const prod = (process.argv[2] === "production");

// Obsidian автоматически грузит только styles.css в корне папки плагина.
function syncStyles() {
  try {
    fs.copyFileSync("styles/main.css", "styles.css");
  } catch (e) {
    console.error("styles copy failed:", e);
  }
}

const context = await esbuild.context({
  entryPoints: ["src/main.ts"],
  bundle: true,
  external: [
    "obsidian",
    "electron",
    "@codemirror/autocomplete",
    "@codemirror/collab",
    "@codemirror/commands",
    "@codemirror/language",
    "@codemirror/lint",
    "@codemirror/search",
    "@codemirror/state",
    "@codemirror/view",
    "@lezer/common",
    "@lezer/highlight",
    "@lezer/lr",
    ...builtins],
  format: "cjs",
  target: "es2018",
  logLevel: "info",
  sourcemap: prod ? false : "inline",
  treeShaking: true,
  outfile: "main.js",
});

if (prod) {
  await context.rebuild();
  syncStyles();
  process.exit(0);
} else {
  syncStyles();
  await context.watch();
}
