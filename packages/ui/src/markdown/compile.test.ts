import { describe, expect, it } from "vitest";
import { compileMarkdown, slugifyHeading } from "./compile";

describe("compileMarkdown", () => {
  it("compiles commonmark blocks, inlines, and headings metadata", () => {
    const md = `
# Installation

Install the package via bun:

Here is an [example link](https://example.com).

\`\`\`bash
bun add @recloudstudio/ui
\`\`\`
`;

    const doc = compileMarkdown(md);
    expect(doc.headings).toEqual([{ id: "installation", title: "Installation", level: 1 }]);
    expect(doc.links).toEqual([{ href: "https://example.com", title: undefined, external: true }]);
    expect(doc.codeBlocks).toHaveLength(1);
    expect(doc.codeBlocks[0]?.language).toBe("bash");
    expect(doc.codeBlocks[0]?.code.trim()).toBe("bun add @recloudstudio/ui");
  });

  it("slugifies headings with duplicate deduplication", () => {
    expect(slugifyHeading("Quick Start Guide!")).toBe("quick-start-guide");

    const md = `
## Overview
### Overview
#### Overview
`;
    const doc = compileMarkdown(md);
    expect(doc.headings.map((h) => h.id)).toEqual(["overview", "overview-1", "overview-2"]);
  });

  it("compiles GFM tables and task lists", () => {
    const md = `
| Prop | Type | Default |
| :--- | :---: | ---: |
| content | string | '' |

- [x] Done task
- [ ] Todo task
`;

    const doc = compileMarkdown(md);
    const table = doc.children.find((child) => child.type === "table");
    expect(table).toBeDefined();
    if (table && table.type === "table") {
      expect(table.align).toEqual(["left", "center", "right"]);
      expect(table.children).toHaveLength(2);
    }

    const list = doc.children.find((child) => child.type === "list");
    expect(list).toBeDefined();
    if (list && list.type === "list") {
      expect(list.children[0]?.checked).toBe(true);
      expect(list.children[1]?.checked).toBe(false);
    }
  });

  it("compiles callout directives", () => {
    const md = `
:::warning{title="Sensitive Credential" collapsible="true"}
Never commit your secret token.
:::
`;

    const doc = compileMarkdown(md);
    const callout = doc.children.find((child) => child.type === "callout");
    expect(callout).toBeDefined();
    if (callout && callout.type === "callout") {
      expect(callout.calloutType).toBe("warning");
      expect(callout.title).toBe("Sensitive Credential");
      expect(callout.collapsible).toBe(true);
    }
  });

  it("compiles steps directives with deterministic step numbering", () => {
    const md = `
:::steps{startIndex="1"}
:::step{title="Install"}
Run bun add.
:::
:::step{title="Configure"}
Edit nuxt.config.ts.
:::
:::
`;

    const doc = compileMarkdown(md);
    const steps = doc.children.find((child) => child.type === "steps");
    expect(steps).toBeDefined();
    if (steps && steps.type === "steps") {
      expect(steps.children).toHaveLength(2);
      expect(steps.children[0]?.step).toBe(1);
      expect(steps.children[1]?.step).toBe(2);
      expect(steps.children[0]?.title).toBe("Install");
    }
  });

  it("compiles code-group directives into multi-tab structures", () => {
    const md = `
:::code-group

\`\`\`bash [bun]
bun add @recloudstudio/ui
\`\`\`

\`\`\`bash [pnpm]
pnpm add @recloudstudio/ui
\`\`\`

:::
`;

    const doc = compileMarkdown(md);
    const group = doc.children.find((child) => child.type === "codeGroup");
    expect(group).toBeDefined();
    if (group && group.type === "codeGroup") {
      expect(group.tabs.map((tab) => tab.label)).toEqual(["bun", "pnpm"]);
      expect(group.children).toHaveLength(2);
      expect(group.children[0]?.code.trim()).toBe("bun add @recloudstudio/ui");
    }
  });

  it("filters unsafe javascript protocols by default", () => {
    const md = `
[Click me](javascript:alert(1))
![Malicious](javascript:evil())
[Safe Link](https://worldexecute.me)
`;

    const doc = compileMarkdown(md);
    expect(doc.links).toEqual([
      { href: "https://worldexecute.me", title: undefined, external: true },
    ]);
  });
});
