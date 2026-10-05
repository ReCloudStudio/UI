import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(fileURLToPath(new URL("./Navbar.vue", import.meta.url)), "utf8");

describe("Navbar component contract", () => {
  it("exposes dialog state to the mobile menu trigger", () => {
    expect(source).toContain(':aria-expanded="mobileOpen"');
    expect(source).toContain('aria-haspopup="dialog"');
    expect(source).toContain('@click="mobileOpen = !mobileOpen"');
    expect(source).toContain(':open="mobileOpen"');
  });

  it("uses semantic primary and ring tokens for brand and interactive states", () => {
    expect(source).toContain("bg-[color:var(--primary)]");
    expect(source).toContain("focus-visible:ring-[color:var(--ring)]");
    expect(source).not.toContain("#2563EB");
  });
});
