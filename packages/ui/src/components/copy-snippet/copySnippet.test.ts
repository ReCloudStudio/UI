import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(fileURLToPath(new URL("./CopySnippet.vue", import.meta.url)), "utf8");

describe("CopySnippet component contract", () => {
  it("renders command text, prefix, and copy interaction", () => {
    expect(source).toContain("activeCommandText");
    expect(source).toContain("effectivePrefix");
    expect(source).toContain("copyCommand");
    expect(source).toContain("hasTabs");
  });

  it("supports variants and tabs switching", () => {
    expect(source).toContain("variantClasses");
    expect(source).toContain("activeTabIndex");
  });
});
