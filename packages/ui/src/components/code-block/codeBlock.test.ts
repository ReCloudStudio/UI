import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(fileURLToPath(new URL("./CodeBlock.vue", import.meta.url)), "utf8");
const highlighter = readFileSync(
  fileURLToPath(new URL("./highlighter.ts", import.meta.url)),
  "utf8",
);

describe("CodeBlock component contract", () => {
  it("keeps the actual scrolling region keyboard and screen-reader accessible", () => {
    expect(source).toContain(':tabindex="isCollapsed ? -1 : 0"');
    expect(source).toContain('role="region"');
    expect(source).toContain(':aria-label="regionLabel"');
    expect(source).toContain(':aria-hidden="isCollapsed || undefined"');
    expect(source).toContain('role="status" aria-live="polite"');
    expect(source).toContain("delete node.properties.tabindex");
  });

  it("uses adaptive line-number gutters that keep wrapped continuations out of the gutter", () => {
    expect(source).toContain("[padding-left:calc(2rem+var(--rc-ln-w))]");
    expect(source).toContain("[&_.line]:relative");
    expect(source).toContain("before:left-[calc(-1*(var(--rc-ln-w)+1rem))]");
    expect(source).toContain("style['--rc-ln-w']");
    expect(source).toContain("max(1.5rem, ");
  });

  it("animates collapsible content without moving the header border", () => {
    expect(source).toContain("border-b px-3.5");
    expect(source).toContain("isCollapsed.value ? 'border-transparent'");
    expect(source).toContain("isCollapsed.value ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'");
    expect(source).toContain("transition-[grid-template-rows]");
    expect(source).not.toContain('v-show="!isCollapsed"');
  });

  it("shows a scroll-aware fade only while max-height content remains below", () => {
    expect(source).toContain('@scroll.passive="syncBottomFade"');
    expect(source).toContain("element.scrollHeight - element.scrollTop - element.clientHeight > 4");
    expect(source).toContain(
      "[mask-image:linear-gradient(to_bottom,#000_calc(100%_-_2.5rem),transparent)]",
    );
  });

  it("loads the core and individual grammars lazily with retryable caches", () => {
    expect(highlighter).toContain("langs: []");
    expect(highlighter).toContain("loadCodeBlockGrammar(grammar)");
    expect(highlighter).toContain("highlighter.loadLanguage(language)");
    expect(highlighter).toContain("highlighterPromise = undefined");
    expect(highlighter).toContain("grammarPromises.delete(grammar)");
  });
});
