import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(fileURLToPath(new URL("./SearchInput.vue", import.meta.url)), "utf8");
const indexSource = readFileSync(fileURLToPath(new URL("./index.ts", import.meta.url)), "utf8");

describe("SearchInput & SearchBox component contract", () => {
  it("exports SearchInput and SearchBox aliases", () => {
    expect(indexSource).toContain("export { default as SearchInput }");
    expect(indexSource).toContain("export { default as SearchBox }");
    expect(indexSource).toContain("types");
  });

  it("supports sizes, variants, and debounce", () => {
    expect(source).toContain("sizeContainerClasses[size]");
    expect(source).toContain("variantClasses[variant]");
    expect(source).toContain("debounce: 300");
    expect(source).toContain("variant: 'default'");
  });

  it("provides accessible role and search interaction", () => {
    expect(source).toContain('role="searchbox"');
    expect(source).toContain(":aria-label=\"ariaLabel || placeholder || '搜索'\"");
    expect(source).toContain("emit('search', val)");
    expect(source).toContain("emit('submit', currentVal)");
  });

  it("supports clearable button and loading state", () => {
    expect(source).toContain('v-else-if="clearable && hasValue && !disabled && !readonly"');
    expect(source).toContain("emit('clear')");
    expect(source).toContain('v-if="loading"');
  });

  it("supports suggestions dropdown and keyboard navigation", () => {
    expect(source).toContain('role="listbox"');
    expect(source).toContain('role="option"');
    expect(source).toContain("event.key === 'ArrowDown'");
    expect(source).toContain("event.key === 'ArrowUp'");
    expect(source).toContain("event.key === 'Enter'");
    expect(source).toContain("event.key === 'Escape'");
    expect(source).toContain("emit('select', item)");
  });

  it("supports shortcut key and global focus trigger", () => {
    expect(source).toContain("shortcut");
    expect(source).toContain("enableGlobalShortcut");
    expect(source).toContain("window.addEventListener('keydown', handleGlobalShortcut)");
  });
});
