import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("merges conflicting Tailwind classes", () => {
    expect(cn("px-2", false, "px-4", "text-sm")).toBe("px-4 text-sm");
  });
});
