import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(fileURLToPath(new URL("./InlineCode.vue", import.meta.url)), "utf8");

describe("InlineCode component contract", () => {
  it("decorates each wrapped line independently without overflowing narrow containers", () => {
    expect(source).toContain("'inline rounded-md");
    expect(source).toContain("[overflow-wrap:anywhere]");
    expect(source).toContain("[box-decoration-break:clone]");
    expect(source).toContain("[-webkit-box-decoration-break:clone]");
    expect(source).not.toContain("'inline-flex min-w-0");
  });
});
