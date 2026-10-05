import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(fileURLToPath(new URL("./Container.vue", import.meta.url)), "utf8");

describe("Container component contract", () => {
  it("supports max-width size options and padding rhythm", () => {
    expect(source).toContain("sizeClasses[size]");
    expect(source).toContain("padded ? 'px-4 sm:px-6 lg:px-8' : ''");
    expect(source).toContain("size: 'xl'");
    expect(source).toContain("as: 'div'");
  });

  it("provides comprehensive size maps", () => {
    expect(source).toContain("max-w-2xl");
    expect(source).toContain("max-w-4xl");
    expect(source).toContain("max-w-7xl");
    expect(source).toContain("max-w-screen-2xl");
  });
});
