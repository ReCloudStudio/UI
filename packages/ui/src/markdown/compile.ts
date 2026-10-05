import { toString as nodeToString } from "mdast-util-to-string";
import type {
  BlockContent,
  Blockquote,
  Code,
  DefinitionContent,
  Heading,
  Html,
  Image,
  InlineCode,
  Link,
  List,
  ListItem,
  Paragraph,
  PhrasingContent,
  Root,
  Table,
  TableCell,
  TableRow,
} from "mdast";
import remarkDirective from "remark-directive";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";
import type { CalloutType } from "../components/callout";
import type { CodeGroupTab } from "../components/code-group";
import type {
  CompileMarkdownOptions,
  MarkdownBlockNode,
  MarkdownCalloutNode,
  MarkdownCodeBlockMeta,
  MarkdownCodeBlockNode,
  MarkdownCodeGroupNode,
  MarkdownDocument,
  MarkdownHeading,
  MarkdownHeadingLevel,
  MarkdownInlineNode,
  MarkdownLinkMeta,
  MarkdownListItemNode,
  MarkdownSanitizeOptions,
  MarkdownStepItemNode,
  MarkdownStepsNode,
  MarkdownTableCellNode,
  MarkdownTableNode,
  MarkdownTableRowNode,
} from "./types";

const DEFAULT_PROTOCOLS = ["http:", "https:", "mailto:", "tel:"];

interface DirectiveNode {
  type: "containerDirective" | "leafDirective" | "textDirective";
  name: string;
  attributes?: Record<string, string | number | boolean | null | undefined>;
  children?: (BlockContent | DefinitionContent | PhrasingContent)[];
}

const isSafeUrl = (url: string, allowedProtocols = DEFAULT_PROTOCOLS): boolean => {
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (
    trimmed.startsWith("#") ||
    trimmed.startsWith("/") ||
    trimmed.startsWith("./") ||
    trimmed.startsWith("../")
  ) {
    return true;
  }

  try {
    const parsed = new URL(trimmed, "https://example.com");
    return allowedProtocols.includes(parsed.protocol);
  } catch {
    return false;
  }
};

const resolveUrl = (url: string, baseUrl?: string): string => {
  const trimmed = url.trim();
  if (!baseUrl || !trimmed) return trimmed;
  if (trimmed.startsWith("#") || /^[a-z]+:/i.test(trimmed)) return trimmed;

  try {
    return new URL(trimmed, baseUrl).toString();
  } catch {
    return trimmed;
  }
};

export const slugifyHeading = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const parseCodeMeta = (
  rawLang = "",
  rawMeta = "",
): {
  language: string;
  title?: string;
  copyable?: boolean;
  collapsible?: boolean;
  collapsed?: boolean;
  highlightLines?: number[];
} => {
  const [langToken] = rawLang.trim().split(/\s+/);
  const language = langToken || "text";
  const meta = `${rawLang.slice(language.length)} ${rawMeta}`.trim();

  const titleMatch = meta.match(/title=(?:"([^"]+)"|'([^']+)'|([^\s]+))/);
  const labelMatch = meta.match(/\[([^\]]+)\]/);
  const copyable = !meta.includes("no-copy");
  const collapsible = meta.includes("collapsible");
  const collapsed = meta.includes("collapsed");

  let highlightLines: number[] | undefined;
  const linesMatch = meta.match(/\{([\d,\s-]+)\}/);
  if (linesMatch?.[1]) {
    const lines = new Set<number>();
    const parts = linesMatch[1].split(",");
    for (const part of parts) {
      const trimmed = part.trim();
      if (trimmed.includes("-")) {
        const [start = Number.NaN, end = Number.NaN] = trimmed
          .split("-")
          .map((v) => Number.parseInt(v, 10));
        if (!Number.isNaN(start) && !Number.isNaN(end)) {
          for (let i = Math.min(start, end); i <= Math.max(start, end); i += 1) {
            lines.add(i);
          }
        }
      } else {
        const line = Number.parseInt(trimmed, 10);
        if (!Number.isNaN(line)) lines.add(line);
      }
    }
    highlightLines = Array.from(lines).sort((a, b) => a - b);
  }

  return {
    language,
    title: titleMatch?.[1] ?? titleMatch?.[2] ?? titleMatch?.[3] ?? labelMatch?.[1],
    copyable,
    collapsible,
    collapsed,
    highlightLines,
  };
};

class MarkdownCompilerContext {
  headings: MarkdownHeading[] = [];
  links: MarkdownLinkMeta[] = [];
  codeBlocks: MarkdownCodeBlockMeta[] = [];
  private headingCounts = new Map<string, number>();

  constructor(
    public readonly baseUrl?: string,
    public readonly sanitize: MarkdownSanitizeOptions | false = {},
  ) {}

  createHeadingId(rawText: string): string {
    const base = slugifyHeading(rawText) || "section";
    const count = this.headingCounts.get(base) ?? 0;
    this.headingCounts.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  }

  filterUrl(rawUrl: string): { url: string; safe: boolean; external: boolean } {
    const resolved = resolveUrl(rawUrl, this.baseUrl);
    if (this.sanitize === false) {
      return {
        url: resolved,
        safe: true,
        external: /^https?:\/\//i.test(resolved),
      };
    }

    const protocols = this.sanitize.allowedProtocols ?? DEFAULT_PROTOCOLS;
    const safe = isSafeUrl(resolved, protocols);
    const external = /^https?:\/\//i.test(resolved);
    return {
      url: safe ? resolved : "",
      safe,
      external,
    };
  }
}

const compileInlineNodes = (
  nodes: PhrasingContent[],
  context: MarkdownCompilerContext,
): MarkdownInlineNode[] => {
  const result: MarkdownInlineNode[] = [];

  for (const node of nodes) {
    switch (node.type) {
      case "text":
        result.push({ type: "text", value: node.value });
        break;
      case "inlineCode":
        result.push({ type: "inlineCode", value: (node as InlineCode).value });
        break;
      case "emphasis":
        result.push({
          type: "emphasis",
          children: compileInlineNodes(node.children, context),
        });
        break;
      case "strong":
        result.push({
          type: "strong",
          children: compileInlineNodes(node.children, context),
        });
        break;
      case "delete":
        result.push({
          type: "delete",
          children: compileInlineNodes(node.children, context),
        });
        break;
      case "break":
        result.push({ type: "break" });
        break;
      case "link": {
        const linkNode = node as Link;
        const { url, safe, external } = context.filterUrl(linkNode.url);
        if (!safe && linkNode.url) {
          result.push(...compileInlineNodes(linkNode.children, context));
          break;
        }
        const title = linkNode.title ?? undefined;
        context.links.push({ href: url, title, external });
        result.push({
          type: "link",
          url,
          title,
          external,
          children: compileInlineNodes(linkNode.children, context),
        });
        break;
      }
      case "image": {
        const imageNode = node as Image;
        const { url, safe } = context.filterUrl(imageNode.url);
        if (!safe) break;
        result.push({
          type: "image",
          url,
          alt: imageNode.alt ?? undefined,
          title: imageNode.title ?? undefined,
        });
        break;
      }
      case "html": {
        if (context.sanitize === false || context.sanitize.allowRawHtml) {
          result.push({ type: "text", value: (node as Html).value });
        }
        break;
      }
      default:
        if (
          "children" in node &&
          Array.isArray((node as { children: PhrasingContent[] }).children)
        ) {
          result.push(
            ...compileInlineNodes((node as { children: PhrasingContent[] }).children, context),
          );
        }
        break;
    }
  }

  return result;
};

const compileCalloutDirective = (
  node: DirectiveNode,
  context: MarkdownCompilerContext,
): MarkdownCalloutNode => {
  const validTypes: CalloutType[] = ["note", "tip", "info", "warning", "danger"];
  const calloutType = validTypes.includes(node.name as CalloutType)
    ? (node.name as CalloutType)
    : "info";

  const attrs = node.attributes ?? {};
  const title = typeof attrs.title === "string" ? attrs.title : undefined;
  const collapsible = attrs.collapsible === true || attrs.collapsible === "true";
  const defaultOpen = !(attrs.defaultOpen === false || attrs.defaultOpen === "false");

  const children = compileBlockNodes(
    (node.children ?? []) as (BlockContent | DefinitionContent)[],
    context,
  );

  return {
    type: "callout",
    calloutType,
    title,
    collapsible,
    defaultOpen,
    children,
  };
};

const compileStepsDirective = (
  node: DirectiveNode,
  context: MarkdownCompilerContext,
): MarkdownStepsNode => {
  const attrs = node.attributes ?? {};
  const startIndex =
    typeof attrs.startIndex === "number"
      ? attrs.startIndex
      : typeof attrs.startIndex === "string"
        ? Number.parseInt(attrs.startIndex, 10) || 1
        : 1;

  const children: MarkdownStepItemNode[] = [];
  let stepIndex = startIndex;

  for (const child of node.children ?? []) {
    const isDirective = child.type === "containerDirective" || child.type === "leafDirective";
    if (!isDirective) continue;

    const dir = child as DirectiveNode;
    if (dir.name === "step") {
      const childAttrs = dir.attributes ?? {};
      const title = typeof childAttrs.title === "string" ? childAttrs.title : `Step ${stepIndex}`;
      const description =
        typeof childAttrs.description === "string" ? childAttrs.description : undefined;
      const stepValue =
        typeof childAttrs.step === "number"
          ? childAttrs.step
          : typeof childAttrs.step === "string"
            ? Number.parseInt(childAttrs.step, 10) || stepIndex
            : stepIndex;

      const stepChildren = compileBlockNodes(
        (dir.children ?? []) as (BlockContent | DefinitionContent)[],
        context,
      );

      children.push({
        type: "step",
        title,
        description,
        step: stepValue,
        children: stepChildren,
      });

      stepIndex += 1;
    }
  }

  return {
    type: "steps",
    startIndex,
    children,
  };
};

const compileCodeGroupDirective = (
  node: DirectiveNode,
  context: MarkdownCompilerContext,
): MarkdownCodeGroupNode => {
  const tabs: CodeGroupTab[] = [];
  const children: MarkdownCodeBlockNode[] = [];

  let index = 0;
  for (const child of node.children ?? []) {
    if (child.type === "code") {
      const codeNode = child as Code;
      const meta = parseCodeMeta(codeNode.lang ?? "", codeNode.meta ?? "");
      const codeMeta: MarkdownCodeBlockMeta = {
        code: codeNode.value,
        language: meta.language,
        title: meta.title,
        copyable: meta.copyable,
        collapsible: meta.collapsible,
        collapsed: meta.collapsed,
        highlightLines: meta.highlightLines,
      };

      context.codeBlocks.push(codeMeta);
      children.push({
        type: "codeBlock",
        ...codeMeta,
      });

      const tabLabel = meta.title || meta.language || `Tab ${index + 1}`;
      tabs.push({
        label: tabLabel,
        key: `${index}-${tabLabel}`,
      });
      index += 1;
    }
  }

  return {
    type: "codeGroup",
    tabs,
    children,
  };
};

const compileTableNode = (node: Table, context: MarkdownCompilerContext): MarkdownTableNode => {
  const align = node.align ?? [];
  const children: MarkdownTableRowNode[] = [];

  node.children.forEach((rowNode: TableRow, rowIndex: number) => {
    const isHeader = rowIndex === 0;
    const cells: MarkdownTableCellNode[] = rowNode.children.map(
      (cell: TableCell, colIndex: number) => ({
        type: "tableCell",
        isHeader,
        align: align[colIndex] ?? null,
        children: compileInlineNodes(cell.children, context),
      }),
    );

    children.push({
      type: "tableRow",
      children: cells,
    });
  });

  return {
    type: "table",
    align,
    children,
  };
};

const compileBlockNodes = (
  nodes: (BlockContent | DefinitionContent)[],
  context: MarkdownCompilerContext,
): MarkdownBlockNode[] => {
  const result: MarkdownBlockNode[] = [];

  let index = 0;
  while (index < nodes.length) {
    const node = nodes[index];
    if (!node) {
      index += 1;
      continue;
    }

    // SAFETY: remark-directive registers custom container/leaf directives in unist AST
    const candidateDirectiveNode = node as unknown as DirectiveNode;
    const isStepsDirective =
      (node.type === "containerDirective" || node.type === "leafDirective") &&
      candidateDirectiveNode.name === "steps";

    if (isStepsDirective) {
      const stepsDir = candidateDirectiveNode;
      const compiledSteps = compileStepsDirective(stepsDir, context);

      // Fallback for flat fence syntax where step directives sit next to steps container
      if (compiledSteps.children.length <= 1) {
        let peek = index + 1;
        let autoStepIndex = compiledSteps.children.length + (compiledSteps.startIndex ?? 1);
        while (peek < nodes.length) {
          const nextNode = nodes[peek];
          // SAFETY: remark-directive registers custom container/leaf directives in unist AST
          const candidateDirective = nextNode as unknown as DirectiveNode;
          const isStepDirective =
            Boolean(nextNode) &&
            (nextNode?.type === "containerDirective" || nextNode?.type === "leafDirective") &&
            candidateDirective.name === "step";

          if (isStepDirective && nextNode) {
            const stepDir = candidateDirective;
            const childAttrs = stepDir.attributes ?? {};
            const title =
              typeof childAttrs.title === "string" ? childAttrs.title : `Step ${autoStepIndex}`;
            const description =
              typeof childAttrs.description === "string" ? childAttrs.description : undefined;
            const stepValue =
              typeof childAttrs.step === "number"
                ? childAttrs.step
                : typeof childAttrs.step === "string"
                  ? Number.parseInt(childAttrs.step, 10) || autoStepIndex
                  : autoStepIndex;

            const stepChildren = compileBlockNodes(
              (stepDir.children ?? []) as (BlockContent | DefinitionContent)[],
              context,
            );

            compiledSteps.children.push({
              type: "step",
              title,
              description,
              step: stepValue,
              children: stepChildren,
            });

            autoStepIndex += 1;
            peek += 1;
            continue;
          }

          // SAFETY: checking raw trailing directive fence artifacts emitted as paragraphs by unist
          const rawParagraph = nextNode as unknown as { children?: { value?: string }[] };
          const isOrphanDirectiveFence =
            Boolean(nextNode) &&
            nextNode?.type === "paragraph" &&
            rawParagraph.children?.[0]?.value?.trim() === ":::";

          if (isOrphanDirectiveFence) {
            peek += 1;
          }
          break;
        }
        index = peek - 1;
      }

      result.push(compiledSteps);
      index += 1;
      continue;
    }

    switch (node.type) {
      case "heading": {
        const headingNode = node as Heading;
        const text = nodeToString(headingNode).trim();
        const id = context.createHeadingId(text);
        const level = Math.min(Math.max(headingNode.depth, 1), 6) as MarkdownHeadingLevel;
        const headingMeta: MarkdownHeading = { id, title: text, level };
        context.headings.push(headingMeta);
        result.push({
          type: "heading",
          level,
          id,
          title: text,
          children: compileInlineNodes(headingNode.children, context),
        });
        break;
      }
      case "paragraph": {
        const paragraphNode = node as Paragraph;
        result.push({
          type: "paragraph",
          children: compileInlineNodes(paragraphNode.children, context),
        });
        break;
      }
      case "blockquote": {
        const quoteNode = node as Blockquote;
        result.push({
          type: "blockquote",
          children: compileBlockNodes(quoteNode.children, context),
        });
        break;
      }
      case "list": {
        const listNode = node as List;
        const items: MarkdownListItemNode[] = listNode.children.map((item: ListItem) => ({
          type: "listItem",
          checked: item.checked ?? null,
          children: compileBlockNodes(item.children, context),
        }));
        result.push({
          type: "list",
          ordered: listNode.ordered ?? false,
          start: listNode.start ?? undefined,
          spread: listNode.spread ?? false,
          children: items,
        });
        break;
      }
      case "table": {
        result.push(compileTableNode(node as Table, context));
        break;
      }
      case "code": {
        const codeNode = node as Code;
        const meta = parseCodeMeta(codeNode.lang ?? "", codeNode.meta ?? "");
        const codeMeta: MarkdownCodeBlockMeta = {
          code: codeNode.value,
          language: meta.language,
          title: meta.title,
          copyable: meta.copyable,
          collapsible: meta.collapsible,
          collapsed: meta.collapsed,
          highlightLines: meta.highlightLines,
        };
        context.codeBlocks.push(codeMeta);
        result.push({
          type: "codeBlock",
          ...codeMeta,
        });
        break;
      }
      case "thematicBreak": {
        result.push({ type: "thematicBreak" });
        break;
      }
      case "html": {
        if (context.sanitize === false || context.sanitize.allowRawHtml) {
          result.push({
            type: "paragraph",
            children: [{ type: "text", value: (node as Html).value }],
          });
        }
        break;
      }
      case "containerDirective":
      case "leafDirective": {
        // SAFETY: remark-directive registers custom AST node types that are not part of standard mdast BlockContent
        const directiveNode = node as unknown as DirectiveNode;
        if (directiveNode.name === "steps") {
          result.push(compileStepsDirective(directiveNode, context));
        } else if (directiveNode.name === "code-group") {
          result.push(compileCodeGroupDirective(directiveNode, context));
        } else {
          result.push(compileCalloutDirective(directiveNode, context));
        }
        break;
      }
      default:
        break;
    }
    index += 1;
  }

  return result;
};

export const compileMarkdown = (
  rawMarkdown: string,
  options: CompileMarkdownOptions = {},
): MarkdownDocument => {
  const processor = unified().use(remarkParse);

  if (options.features?.gfm !== false) {
    processor.use(remarkGfm);
  }

  if (options.features?.directives !== false) {
    processor.use(remarkDirective);
  }

  const rootAst = processor.parse(rawMarkdown || "") as Root;
  const context = new MarkdownCompilerContext(options.baseUrl, options.sanitize);
  const children = compileBlockNodes(
    rootAst.children as (BlockContent | DefinitionContent)[],
    context,
  );

  return {
    type: "document",
    children,
    headings: context.headings,
    links: context.links,
    codeBlocks: context.codeBlocks,
  };
};
