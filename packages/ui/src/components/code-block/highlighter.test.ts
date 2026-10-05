import { describe, expect, it, vi } from "vitest";

import { getCodeBlockHighlighter } from "./highlighter";

describe("CodeBlock highlighter", () => {
  it("shares one process-wide Shiki core while loading requested grammars", async () => {
    const [typescript, repeatedTypescript, python] = await Promise.all([
      getCodeBlockHighlighter("typescript"),
      getCodeBlockHighlighter("typescript"),
      getCodeBlockHighlighter("python"),
    ]);

    expect(repeatedTypescript).toBe(typescript);
    expect(python).toBe(typescript);
    expect(typescript.getLoadedLanguages()).toEqual(
      expect.arrayContaining(["typescript", "ts", "python", "py"]),
    );
  });

  it("reuses the same pipeline after a separate SSR chunk evaluates the module", async () => {
    const first = await getCodeBlockHighlighter("typescript");

    vi.resetModules();
    const { getCodeBlockHighlighter: getHighlighterFromSeparateChunk } = await import(
      "./highlighter"
    );
    const second = await getHighlighterFromSeparateChunk("typescript");

    expect(second).toBe(first);
  });
});
