import type { Component } from "vue";
import type { CalloutType } from "../components/callout";
import type { CodeGroupTab } from "../components/code-group";

export interface MarkdownSourcePosition {
  start: { line: number; column: number; offset?: number };
  end: { line: number; column: number; offset?: number };
}

export type MarkdownHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export interface MarkdownHeading {
  id: string;
  title: string;
  level: MarkdownHeadingLevel;
}

export interface MarkdownLinkMeta {
  href: string;
  title?: string;
  external: boolean;
}

export interface MarkdownCodeBlockMeta {
  code: string;
  language: string;
  title?: string;
  copyable?: boolean;
  collapsible?: boolean;
  collapsed?: boolean;
  highlightLines?: number[];
}

export interface MarkdownTextNode {
  type: "text";
  value: string;
}

export interface MarkdownInlineCodeNode {
  type: "inlineCode";
  value: string;
}

export interface MarkdownEmphasisNode {
  type: "emphasis";
  children: MarkdownInlineNode[];
}

export interface MarkdownStrongNode {
  type: "strong";
  children: MarkdownInlineNode[];
}

export interface MarkdownDeleteNode {
  type: "delete";
  children: MarkdownInlineNode[];
}

export interface MarkdownLinkNode {
  type: "link";
  url: string;
  title?: string;
  external: boolean;
  children: MarkdownInlineNode[];
}

export interface MarkdownImageNode {
  type: "image";
  url: string;
  alt?: string;
  title?: string;
}

export interface MarkdownBreakNode {
  type: "break";
}

export type MarkdownInlineNode =
  | MarkdownTextNode
  | MarkdownInlineCodeNode
  | MarkdownEmphasisNode
  | MarkdownStrongNode
  | MarkdownDeleteNode
  | MarkdownLinkNode
  | MarkdownImageNode
  | MarkdownBreakNode;

export interface MarkdownHeadingNode {
  type: "heading";
  level: MarkdownHeadingLevel;
  id: string;
  title: string;
  children: MarkdownInlineNode[];
}

export interface MarkdownParagraphNode {
  type: "paragraph";
  children: MarkdownInlineNode[];
}

export interface MarkdownBlockquoteNode {
  type: "blockquote";
  children: MarkdownBlockNode[];
}

export interface MarkdownListNode {
  type: "list";
  ordered: boolean;
  start?: number;
  spread?: boolean;
  children: MarkdownListItemNode[];
}

export interface MarkdownListItemNode {
  type: "listItem";
  checked?: boolean | null;
  children: MarkdownBlockNode[];
}

export interface MarkdownTableNode {
  type: "table";
  align?: ("left" | "right" | "center" | null)[];
  children: MarkdownTableRowNode[];
}

export interface MarkdownTableRowNode {
  type: "tableRow";
  children: MarkdownTableCellNode[];
}

export interface MarkdownTableCellNode {
  type: "tableCell";
  isHeader?: boolean;
  align?: "left" | "right" | "center" | null;
  children: MarkdownInlineNode[];
}

export interface MarkdownCodeBlockNode extends MarkdownCodeBlockMeta {
  type: "codeBlock";
}

export interface MarkdownThematicBreakNode {
  type: "thematicBreak";
}

export interface MarkdownCalloutNode {
  type: "callout";
  calloutType: CalloutType;
  title?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
  children: MarkdownBlockNode[];
}

export interface MarkdownStepsNode {
  type: "steps";
  startIndex?: number;
  children: MarkdownStepItemNode[];
}

export interface MarkdownStepItemNode {
  type: "step";
  title: string;
  description?: string;
  step?: number;
  children: MarkdownBlockNode[];
}

export interface MarkdownCodeGroupNode {
  type: "codeGroup";
  tabs: CodeGroupTab[];
  children: MarkdownCodeBlockNode[];
}

export type MarkdownBlockNode =
  | MarkdownHeadingNode
  | MarkdownParagraphNode
  | MarkdownBlockquoteNode
  | MarkdownListNode
  | MarkdownTableNode
  | MarkdownCodeBlockNode
  | MarkdownThematicBreakNode
  | MarkdownCalloutNode
  | MarkdownStepsNode
  | MarkdownCodeGroupNode;

export interface MarkdownDocument {
  type: "document";
  children: MarkdownBlockNode[];
  headings: MarkdownHeading[];
  links: MarkdownLinkMeta[];
  codeBlocks: MarkdownCodeBlockMeta[];
}

export interface MarkdownSanitizeOptions {
  allowRawHtml?: boolean;
  allowedProtocols?: string[];
}

export interface MarkdownFeatures {
  gfm?: boolean;
  directives?: boolean;
  codeGroups?: boolean;
  callouts?: boolean;
  steps?: boolean;
}

export interface CompileMarkdownOptions {
  baseUrl?: string;
  features?: MarkdownFeatures;
  sanitize?: MarkdownSanitizeOptions | false;
}

export interface MarkdownComponentRegistry {
  heading?: Component;
  paragraph?: Component;
  inlineCode?: Component;
  codeBlock?: Component;
  link?: Component;
  image?: Component;
  blockquote?: Component;
  list?: Component;
  listItem?: Component;
  table?: Component;
  thematicBreak?: Component;
  callout?: Component;
  steps?: Component;
  stepItem?: Component;
  codeGroup?: Component;
}

export interface MarkdownRendererProps {
  content?: string;
  ast?: MarkdownDocument;
  components?: MarkdownComponentRegistry;
  baseUrl?: string;
  features?: MarkdownFeatures;
  sanitize?: MarkdownSanitizeOptions | false;
  class?: string;
}
