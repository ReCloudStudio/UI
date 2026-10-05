import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(fileURLToPath(new URL("./PageHeader.vue", import.meta.url)), "utf8");

describe("PageHeader component contract", () => {
  it("renders documentation metadata with semantic heading hierarchy", () => {
    expect(source).toContain("<header");
    expect(source).toContain("<h1");
    expect(source).toContain("props.group");
    expect(source).toContain("<Badge");
  });
});
