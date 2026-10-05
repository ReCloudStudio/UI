import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(fileURLToPath(new URL("./ApiTable.vue", import.meta.url)), "utf8");

describe("ApiTable component contract", () => {
  it("renders API metadata through DataTable", () => {
    expect(source).toContain('<DataTable :columns="columns" :rows="props.rows"');
    expect(source).toContain("{ key: 'name', label: '属性', slot: true }");
    expect(source).toContain("{ key: 'description', label: '说明', slot: true }");
  });

  it("formats names, types, defaults, and descriptions semantically", () => {
    expect(source).toContain("template #cell-name");
    expect(source).toContain("template #cell-type");
    expect(source).toContain("value || '—'");
  });
});
