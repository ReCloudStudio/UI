import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(fileURLToPath(new URL("./DataTable.vue", import.meta.url)), "utf8");

describe("DataTable component contract", () => {
  it("supports density configurations and cell class calculations", () => {
    expect(source).toContain("density?: DataTableDensity");
    expect(source).toContain("density: 'default'");
    expect(source).toContain("tableTextClass");
    expect(source).toContain("headerCellClass");
    expect(source).toContain("bodyCellClass");
  });

  it("adjusts padding and text size across compact, default, and relaxed densities", () => {
    expect(source).toContain("props.density === 'compact' ? 'text-xs' : 'text-sm'");
    expect(source).toContain("props.density === 'compact'");
    expect(source).toContain("props.density === 'relaxed'");
    expect(source).toContain("'px-3 py-1.5'");
    expect(source).toContain("'px-3 py-2'");
  });
});
