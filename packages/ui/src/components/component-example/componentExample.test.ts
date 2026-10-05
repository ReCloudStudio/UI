import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(
  fileURLToPath(new URL("./ComponentExample.vue", import.meta.url)),
  "utf8",
);
const types = readFileSync(fileURLToPath(new URL("./types.ts", import.meta.url)), "utf8");

describe("ComponentExample component contract", () => {
  it("composes Card and CodeBlock around the preview and source", () => {
    expect(source).toContain('<Card v-if="$slots.default" variant="outline" padding="none">');
    expect(source).toContain("<CodeBlock");
    expect(source).toContain('v-model:collapsed="codeCollapsed"');
  });

  it("supports contextual metadata and expanded source control", () => {
    expect(types).toContain("title?: string");
    expect(types).toContain("description?: string");
    expect(types).toContain("badge?: string");
    expect(source).toContain("expanded: true");
  });
});
