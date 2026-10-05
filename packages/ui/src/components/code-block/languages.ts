import type { LanguageInput } from "shiki/core";

import type { IconSource } from "../icon";

/* -------------------------------------------------------------------------- */
/* Inline SVG icons                                                            */
/* -------------------------------------------------------------------------- */

const ICON_TYPESCRIPT = `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#3178C6"/><path d="M4 8h8M8 8v11" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M19 11.5c-1-1-3-1-4 0s0 2.5 1.5 3 2.5 1 2.5 2.5-1.5 2-3 1.5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`;

const ICON_JAVASCRIPT = `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#F7DF1E"/><path d="M8 12v5a2 2 0 0 1-2 2H5" stroke="#000" stroke-width="2" stroke-linecap="round"/><path d="M18 13c-1-1-3-1-4 0s0 2.5 1.5 3 2.5 1 2.5 2.5-1.5 2-3 1.5" stroke="#000" stroke-width="2" stroke-linecap="round"/></svg>`;

const ICON_VUE = `<svg viewBox="0 0 24 24" fill="none"><path d="M2 3h4.5L12 13 17.5 3H22L12 20 2 3z" fill="#41B883"/><path d="M6.5 3h4L12 5.5 13.5 3h4L12 12 6.5 3z" fill="#35495E"/></svg>`;

const ICON_HTML = `<svg viewBox="0 0 24 24" fill="none"><path d="M4 2l1.6 18 6.4 2 6.4-2L20 2H4z" fill="#E34F26"/><path d="M12 4v16.1l4.9-1.5 1.2-13.6H12z" fill="#EF652A"/><path d="M8 7h8m-8 4h7.5m-7.5 4h5l-.5 2.5-2.5.7-2.5-.7-.2-1.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const ICON_CSS = `<svg viewBox="0 0 24 24" fill="none"><path d="M4 2l1.6 18 6.4 2 6.4-2L20 2H4z" fill="#1572B6"/><path d="M12 4v16.1l4.9-1.5 1.2-13.6H12z" fill="#33A9DC"/><path d="M8 7h8m-8 4h7.5m-7.5 4h5l-.5 2.5-2.5.7-2.5-.7-.2-1.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const ICON_JSON = `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#292929"/><path d="M8 7c-1.5 0-2 1-2 2.5v1c0 1-.5 1.5-1.5 1.5 1 0 1.5.5 1.5 1.5v1c0 1.5.5 2.5 2 2.5m8-10c1.5 0 2 1 2 2.5v1c0 1 .5 1.5 1.5 1.5-1 0-1.5.5-1.5 1.5v1c0 1.5-.5 2.5-2 2.5" stroke="#CBCB41" stroke-width="1.8" stroke-linecap="round"/></svg>`;

const ICON_SHELL = `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#293138"/><path d="M6 8l4 4-4 4m6 1h6" stroke="#4EAA25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const ICON_LOG = `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#334155"/><path d="M7 7h10M7 11h10M7 15h6" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/></svg>`;

const ICON_PYTHON = `<svg viewBox="0 0 24 24" fill="none"><path d="M11.8 3c-4.2 0-3.9 1.8-3.9 1.8l.04 1.9h4v.6H6.3s-2.5.3-2.5 3.9 2.2 3.8 2.2 3.8h1.3v-1.9c0-2.2 1.9-2.1 1.9-2.1h3.9s1.8 0 1.8-1.8V5.3s.3-2.3-3.1-2.3zm-1.2 1.2a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z" fill="#3776AB"/><path d="M12.2 21c4.2 0 3.9-1.8 3.9-1.8l-.04-1.9h-4v-.6h5.6s2.5-.3 2.5-3.9-2.2-3.8-2.2-3.8h-1.3v1.9c0 2.2-1.9 2.1-1.9 2.1h-3.9s-1.8 0-1.8 1.8v3.9s-.3 2.3 3.1 2.3zm1.2-1.2a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z" fill="#FFD43B"/></svg>`;

const ICON_RUST = `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#000"/><path d="M8 8h5a2 2 0 0 1 0 4H8v4m5-4l3 4" stroke="#DEA584" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const ICON_GO = `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#00ADD8"/><path d="M6 12h5a4 4 0 1 1-4-4" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M14 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" stroke="#fff" stroke-width="2"/></svg>`;

const ICON_MARKDOWN = `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#083FA1"/><path d="M4 16V8l3.5 4.5L11 8v8m5-6v6m-2.5-3.5L16 14l2.5-3.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const ICON_YAML = `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#CB171E"/><path d="M6 7l3.5 5.5L13 7m-3.5 5.5V17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const ICON_TOML = `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#9C4121"/><path d="M6 8h8M10 8v8" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`;

const ICON_SQL = `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#00758F"/><ellipse cx="12" cy="7" rx="6" ry="3" stroke="#fff" stroke-width="1.8"/><path d="M6 7v10c0 1.7 2.7 3 6 3s6-1.3 6-3V7" stroke="#fff" stroke-width="1.8"/><path d="M6 12c0 1.7 2.7 3 6 3s6-1.3 6-3" stroke="#fff" stroke-width="1.8"/></svg>`;

const ICON_DOCKER = `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#2496ED"/><path d="M4 14c1-4 5-5 12-4 1-2 3-3 5-3-.3 2 .2 3-.5 4 1 2 0 5-6 5-4 0-8-1-10.5-2z" fill="#fff"/></svg>`;

/** Generic fallback shown when `icon` is `true` but no language can be matched. */
export const DEFAULT_CODE_ICON = `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#475569"/><path d="M8 9l-3 3 3 3m8-6l3 3-3 3m-4-7l-2 8" stroke="#F1F5F9" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

/* -------------------------------------------------------------------------- */
/* Single language registry                                                    */
/* -------------------------------------------------------------------------- */

interface CodeBlockLanguage {
  /** shiki grammar id; this is the grammar actually loaded for the language. */
  grammar: string;
  /** Inline SVG markup rendered in the header. */
  icon: string;
  /** Additional spellings accepted by the `language` prop and by file extensions. */
  aliases?: readonly string[];
}

/**
 * The single source of truth for CodeBlock languages. Because an entry owns its icon,
 * its shiki grammar and every accepted spelling, a language can never be advertised
 * with an icon that the highlighter cannot back up.
 */
const LANGUAGES: Record<string, CodeBlockLanguage> = {
  css: { grammar: "css", icon: ICON_CSS },
  docker: { grammar: "docker", icon: ICON_DOCKER, aliases: ["dockerfile"] },
  go: { grammar: "go", icon: ICON_GO, aliases: ["golang"] },
  html: { grammar: "html", icon: ICON_HTML },
  javascript: { grammar: "javascript", icon: ICON_JAVASCRIPT, aliases: ["cjs", "js", "mjs"] },
  json: { grammar: "json", icon: ICON_JSON },
  jsx: { grammar: "jsx", icon: ICON_JAVASCRIPT },
  log: { grammar: "log", icon: ICON_LOG },
  markdown: { grammar: "markdown", icon: ICON_MARKDOWN, aliases: ["md"] },
  python: { grammar: "python", icon: ICON_PYTHON, aliases: ["py"] },
  rust: { grammar: "rust", icon: ICON_RUST, aliases: ["rs"] },
  shellscript: {
    grammar: "shellscript",
    icon: ICON_SHELL,
    aliases: ["bash", "sh", "shell", "zsh"],
  },
  sql: { grammar: "sql", icon: ICON_SQL },
  toml: { grammar: "toml", icon: ICON_TOML },
  tsx: { grammar: "tsx", icon: ICON_TYPESCRIPT },
  typescript: {
    grammar: "typescript",
    icon: ICON_TYPESCRIPT,
    aliases: ["cts", "mts", "ts"],
  },
  vue: { grammar: "vue", icon: ICON_VUE },
  "vue-html": { grammar: "vue-html", icon: ICON_VUE },
  yaml: { grammar: "yaml", icon: ICON_YAML, aliases: ["yml"] },
};

/** Every spelling (canonical id plus aliases) mapped to its canonical language id. */
const LANGUAGE_INDEX: Record<string, string> = {};

/** Every spelling mapped to its header icon, derived from `LANGUAGES` so it cannot drift. */
const LANGUAGE_ICON_INDEX: Record<string, string> = {};

Object.entries(LANGUAGES).forEach(([id, entry]) => {
  const spellings = [id, ...(entry.aliases ?? [])];
  spellings.forEach((spelling) => {
    LANGUAGE_INDEX[spelling] = id;
    LANGUAGE_ICON_INDEX[spelling] = entry.icon;
  });
});

/**
 * Language and file-extension to built-in SVG icon lookup, covering every canonical
 * id and every alias of the registry.
 */
export const LANGUAGE_ICONS: Record<string, string> = LANGUAGE_ICON_INDEX;

/** Grammar ids referenced by the registry; kept in sync with `GRAMMAR_LOADERS` by tests. */
export const CODE_BLOCK_GRAMMARS: readonly string[] = [
  ...new Set(Object.values(LANGUAGES).map((entry) => entry.grammar)),
];

/* -------------------------------------------------------------------------- */
/* Resolvers                                                                   */
/* -------------------------------------------------------------------------- */

const SFC_BLOCK_RE = /^<(template|script|style)[\s>]/m;

/** Normalize a spelling, returning `''` when nothing usable was provided. */
const normalizeSpelling = (value: string | undefined): string => value?.trim().toLowerCase() ?? "";

/** Resolve an arbitrary spelling to its canonical language id, or `null` when unknown. */
const canonicalLanguage = (value: string | undefined): string | null => {
  const spelling = normalizeSpelling(value);
  return LANGUAGE_INDEX[spelling] ?? null;
};

/** Look up the icon for a spelling, or `null` when the language is unknown. */
const lookupIcon = (value: string | undefined): string | null => {
  const spelling = normalizeSpelling(value);
  if (!spelling) return null;
  return LANGUAGE_ICON_INDEX[spelling] ?? null;
};

/**
 * Extract a lowercase file extension without the leading dot.
 * `App.vue` -> `vue`, `config.test.ts` -> `ts`, `Dockerfile` -> `dockerfile`.
 */
export const extractExtension = (filename: string): string => {
  if (!filename) return "";
  const trimmed = filename.trim().toLowerCase();
  if (trimmed === "dockerfile") return "dockerfile";

  const lastDot = trimmed.lastIndexOf(".");
  if (lastDot === -1 || lastDot === trimmed.length - 1) return "";
  return trimmed.slice(lastDot + 1);
};

/**
 * Resolve the header icon from an explicit `icon` prop, the `language` prop or the
 * `filename` extension, in that order.
 */
export const resolveCodeBlockIcon = (
  explicitIcon: IconSource | boolean | undefined,
  language: string | undefined,
  filename: string | undefined,
): IconSource | null => {
  // Explicitly disabled.
  if (explicitIcon === false) return null;

  // An explicit icon source always wins.
  if (explicitIcon && typeof explicitIcon !== "boolean") return explicitIcon;

  const extension = filename ? extractExtension(filename) : "";
  const icon = lookupIcon(language) ?? lookupIcon(extension);
  if (icon) return icon;

  // `icon: true` promises an icon even when the language stays unknown.
  if (explicitIcon === true) return DEFAULT_CODE_ICON;

  return null;
};

/**
 * Resolve the shiki grammar for a `language` value and code snippet.
 * Unknown languages fall back to `log` instead of guessing a highlighter they cannot load.
 */
export const resolveCodeBlockGrammar = (language: string | undefined, code: string): string => {
  const canonical = canonicalLanguage(language);
  if (!canonical) return "log";
  // The `vue` grammar only tokenizes inside SFC blocks; bare template snippets
  // (e.g. `<div><Button v-model="x" /></div>`) need the template grammar instead.
  if (canonical === "vue" && !SFC_BLOCK_RE.test(code)) return "vue-html";
  return LANGUAGES[canonical]?.grammar ?? "log";
};

/* -------------------------------------------------------------------------- */
/* shiki grammar loading                                                       */
/* -------------------------------------------------------------------------- */

/**
 * Lazy loaders for every grammar the registry can resolve. Kept in sync with
 * `LANGUAGES` by `languages.test.ts`.
 */
const GRAMMAR_LOADERS: Record<string, () => LanguageInput> = {
  css: () => import("shiki/dist/langs/css.mjs"),
  docker: () => import("shiki/dist/langs/docker.mjs"),
  go: () => import("shiki/dist/langs/go.mjs"),
  html: () => import("shiki/dist/langs/html.mjs"),
  javascript: () => import("shiki/dist/langs/javascript.mjs"),
  json: () => import("shiki/dist/langs/json.mjs"),
  jsx: () => import("shiki/dist/langs/jsx.mjs"),
  log: () => import("shiki/dist/langs/log.mjs"),
  markdown: () => import("shiki/dist/langs/markdown.mjs"),
  python: () => import("shiki/dist/langs/python.mjs"),
  rust: () => import("shiki/dist/langs/rust.mjs"),
  shellscript: () => import("shiki/dist/langs/shellscript.mjs"),
  sql: () => import("shiki/dist/langs/sql.mjs"),
  toml: () => import("shiki/dist/langs/toml.mjs"),
  tsx: () => import("shiki/dist/langs/tsx.mjs"),
  typescript: () => import("shiki/dist/langs/typescript.mjs"),
  vue: () => import("shiki/dist/langs/vue.mjs"),
  "vue-html": () => import("shiki/dist/langs/vue-html.mjs"),
  yaml: () => import("shiki/dist/langs/yaml.mjs"),
};

/** Grammar ids covered by `GRAMMAR_LOADERS`, exported so tests can assert full coverage. */
export const CODE_BLOCK_GRAMMAR_IDS: readonly string[] = Object.keys(GRAMMAR_LOADERS);

/**
 * Import a single shiki grammar on demand. Returns `null` for an unknown grammar;
 * callers cache the promise so each grammar is fetched at most once per session.
 */
export const loadCodeBlockGrammar = (grammar: string): LanguageInput | null => {
  const loader = GRAMMAR_LOADERS[grammar];
  return loader ? loader() : null;
};
