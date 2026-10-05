import { describe, expect, it } from "vitest";
import MarkdownRenderer from "./MarkdownRenderer.vue";
import { compileMarkdown } from "./compile";

describe("MarkdownRenderer component", () => {
  it("is exported as a valid Vue component", () => {
    expect(MarkdownRenderer).toBeDefined();
    expect(MarkdownRenderer.__name || MarkdownRenderer.name).toBe("MarkdownRenderer");
  });

  it("compiles AST and exposes metadata ready for renderer consumption", () => {
    const doc = compileMarkdown('# Hello ReCloud\n\n:::info{title="Doc"}\nBody\n:::');
    expect(doc.type).toBe("document");
    expect(doc.headings).toEqual([{ id: "hello-recloud", title: "Hello ReCloud", level: 1 }]);
    expect(doc.children).toHaveLength(2);
  });
});
