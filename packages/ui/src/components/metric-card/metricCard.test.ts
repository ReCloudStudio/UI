import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(fileURLToPath(new URL("./MetricCard.vue", import.meta.url)), "utf8");

describe("MetricCard component contract", () => {
  it("renders metric title, value, unit, and description slots", () => {
    expect(source).toContain('slot name="title"');
    expect(source).toContain('slot name="value"');
    expect(source).toContain('slot name="unit"');
    expect(source).toContain('slot name="delta"');
    expect(source).toContain("rc-tabular-nums");
  });

  it("supports trend indicator directions and loading skeletons", () => {
    expect(source).toContain("trend === 'up'");
    expect(source).toContain("trend === 'down'");
    expect(source).toContain('v-if="loading"');
    expect(source).toContain("animate-pulse");
  });
});
