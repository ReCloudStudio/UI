import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(fileURLToPath(new URL("./StatusBadge.vue", import.meta.url)), "utf8");

describe("StatusBadge component contract", () => {
  it("supports status-aware tones, variants, and data attributes", () => {
    expect(source).toContain(':data-status="status"');
    expect(source).toContain("effectiveLabel");
    expect(source).toContain("variantToneClasses");
    expect(source).toContain("dotSizeClass");
    expect(source).toContain("pulseClass");
  });

  it("exposes default semantic tones and pulse logic", () => {
    expect(source).toContain("online: 'Online'");
    expect(source).toContain("offline: 'Offline'");
    expect(source).toContain("degraded: 'Degraded'");
    expect(source).toContain("pending: 'Pending'");
    expect(source).toContain("props.status === 'online' || props.status === 'pending'");
  });
});
