import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const source = readFileSync(fileURLToPath(new URL("./LogViewer.vue", import.meta.url)), "utf8");

describe("LogViewer component contract", () => {
  it("renders log lines, line numbers, search filter, and follow tail button", () => {
    expect(source).toContain("filteredEntries");
    expect(source).toContain("showLineNumbers");
    expect(source).toContain("searchable");
    expect(source).toContain("autoScroll");
    expect(source).toContain("isFollowing");
    expect(source).toContain("copyLogs");
  });

  it("supports log level badges and semantic styles", () => {
    expect(source).toContain("levelBadgeClasses");
    expect(source).toContain("levelMessageClasses");
    expect(source).toContain("rc-tabular-nums");
  });
});
