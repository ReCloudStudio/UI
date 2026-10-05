import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(fileURLToPath(new URL("./Hero.vue", import.meta.url)), "utf8");

describe("Hero component contract", () => {
  it("supports center, split, and minimal layouts", () => {
    expect(source).toContain("layout === 'center'");
    expect(source).toContain("layout === 'split'");
    expect(source).toContain("layout: 'center'");
  });

  it("renders CTA controls with public click events and action overrides", () => {
    expect(source).toContain("@click=\"$emit('primary-click')\"");
    expect(source).toContain("@click=\"$emit('secondary-click')\"");
    expect(source).toContain('<slot name="primary-action">');
    expect(source).toContain('<slot name="secondary-action">');
  });

  it("uses semantic primary tokens for badges and primary CTAs", () => {
    expect(source).toContain("bg-[color:var(--primary)]");
    expect(source).toContain("hover:bg-[color:var(--primary-hover)]");
    expect(source).not.toContain("#2563EB");
  });
});
