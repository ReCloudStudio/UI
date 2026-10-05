import { describe, expect, it } from "vitest";
import { filterCommands, scoreCommand } from "./commandMatcher";
import type { CommandItem } from "./types";

const items: CommandItem[] = [
  { id: "webhooks", label: "管理 Webhooks", keywords: ["webhook", "events"] },
  { id: "dashboard", label: "前往仪表盘", keywords: ["home", "dashboard"] },
  { id: "disabled", label: "已禁用命令", disabled: true },
];

describe("commandMatcher", () => {
  it("matches abbreviations as a subsequence", () => {
    expect(scoreCommand(items[0], "wh")).not.toBeNull();
    expect(scoreCommand(items[0], "wz")).toBeNull();
  });

  it("returns matches in descending relevance order", () => {
    expect(filterCommands(items, "dash").map((item) => item.id)).toEqual(["dashboard"]);
  });

  it("preserves the input order for an empty query", () => {
    expect(filterCommands(items, "").map((item) => item.id)).toEqual(items.map((item) => item.id));
  });
});
