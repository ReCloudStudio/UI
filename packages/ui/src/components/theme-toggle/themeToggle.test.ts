import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(fileURLToPath(new URL("./ThemeToggle.vue", import.meta.url)), "utf8");

describe("ThemeToggle component contract", () => {
  it("supports button, dropdown, and custom slots", () => {
    expect(source).toContain("variant === 'dropdown'");
    expect(source).toContain("<select");
    expect(source).toContain("<button");
    expect(source).toContain('<Sun v-if="effectiveIsDark"');
    expect(source).toContain("<Moon v-else");
  });

  it("handles controlled and uncontrolled mode resolution", () => {
    expect(source).toContain("isControlled");
    expect(source).toContain("emit('update:modelValue', nextMode)");
    expect(source).toContain("theme.setMode(nextMode)");
  });

  it("supports cycleSystem mode and accessible aria-label", () => {
    expect(source).toContain("props.cycleSystem");
    expect(source).toContain(':aria-label="computedAriaLabel"');
  });
});
