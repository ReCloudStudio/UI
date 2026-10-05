import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { Footer } from "./index";

const source = readFileSync(fileURLToPath(new URL("./Footer.vue", import.meta.url)), "utf8");
const types = readFileSync(fileURLToPath(new URL("./types.ts", import.meta.url)), "utf8");

describe("Footer component contract", () => {
  it("is exported as a Vue component", () => {
    expect(Footer).toBeDefined();
  });

  it("renders configured footer links and keeps the default copyright SSR-safe", () => {
    expect(source).toContain('v-for="link in col.links"');
    expect(source).toContain("'© ReCloud Studio. All rights reserved.'");
    expect(source).not.toContain("new Date()");
  });

  it("uses semantic tokens and exposes social customization through its slot", () => {
    expect(source).toContain("hover:text-[color:var(--primary)]");
    expect(source).toContain('<slot name="socials">');
  });

  it("maps supported social icon names and falls back to the accessible text name", () => {
    expect(types).toContain("icon?: string");
    expect(source).toContain("normalizedIcon === 'github' || normalizedIcon === 'discord'");
    expect(source).toContain("normalizedIcon === 'twitter' || normalizedIcon === 'x'");
    expect(source).toContain("socialIcon(s.icon) === 'github'");
    expect(source).toContain("socialIcon(s.icon) === 'discord'");
    expect(source).toContain("socialIcon(s.icon) === 'twitter'");
    expect(source).toContain('<span v-else class="text-xs font-medium">{{ s.name }}</span>');
    expect(source).toContain(':aria-label="s.name"');
  });
});
