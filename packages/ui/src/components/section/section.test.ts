import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(fileURLToPath(new URL("./Section.vue", import.meta.url)), "utf8");

describe("Section component contract", () => {
  it("supports spacing and variant tokens", () => {
    expect(source).toContain("variantClasses[variant]");
    expect(source).toContain("spacingClasses[spacing]");
    expect(source).toContain("spacing: 'md'");
  });

  it("embeds Container when enabled", () => {
    expect(source).toContain('<Container v-if="container"');
    expect(source).toContain(':size="containerSize"');
  });

  it("provides header and title slot customization", () => {
    expect(source).toContain('<slot name="header">');
    expect(source).toContain('<slot name="title">{{ title }}</slot>');
    expect(source).toContain('<slot name="description">{{ description }}</slot>');
  });
});
