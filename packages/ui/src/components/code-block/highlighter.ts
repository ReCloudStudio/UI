import type { HighlighterCore } from "shiki/core";

import { loadCodeBlockGrammar } from "./languages";

interface HighlighterCache {
  highlighterPromise?: Promise<HighlighterCore>;
  grammarPromises: Map<string, Promise<void>>;
}

/**
 * Nuxt may emit auto-imported components into separate SSR chunks. A Symbol.for-backed cache
 * gives every module instance in the same prerender process one Shiki pipeline and grammar cache.
 */
const CACHE_KEY = Symbol.for("@recloudstudio/ui/code-block-highlighter");
const globalCache = globalThis as typeof globalThis & Record<symbol, HighlighterCache | undefined>;

const getCache = (): HighlighterCache => {
  const existing = globalCache[CACHE_KEY];
  if (existing) return existing;

  const cache: HighlighterCache = { grammarPromises: new Map() };
  globalCache[CACHE_KEY] = cache;
  return cache;
};

const createHighlighter = async (): Promise<HighlighterCore> => {
  const [
    { createHighlighterCore },
    { createJavaScriptRegexEngine },
    { default: darkTheme },
    { default: lightTheme },
  ] = await Promise.all([
    import("shiki/core"),
    import("shiki/engine/javascript"),
    import("shiki/dist/themes/github-dark.mjs"),
    import("shiki/dist/themes/github-light.mjs"),
  ]);

  return createHighlighterCore({
    themes: [darkTheme, lightTheme],
    langs: [],
    engine: createJavaScriptRegexEngine(),
  });
};

const getHighlighter = (): Promise<HighlighterCore> => {
  const cache = getCache();
  if (!cache.highlighterPromise) {
    cache.highlighterPromise = createHighlighter().catch((error: unknown) => {
      cache.highlighterPromise = undefined;
      cache.grammarPromises.clear();
      throw error;
    });
  }
  return cache.highlighterPromise;
};

const loadGrammar = (grammar: string): Promise<void> => {
  const cache = getCache();
  const existing = cache.grammarPromises.get(grammar);
  if (existing) return existing;

  const promise = getHighlighter().then(async (highlighter) => {
    if (highlighter.getLoadedLanguages().includes(grammar)) return;

    const language = loadCodeBlockGrammar(grammar);
    if (!language) throw new Error(`Unsupported CodeBlock grammar: ${grammar}`);
    await highlighter.loadLanguage(language);
  });

  cache.grammarPromises.set(grammar, promise);
  promise.catch(() => {
    if (cache.grammarPromises.get(grammar) === promise) cache.grammarPromises.delete(grammar);
  });
  return promise;
};

/** Return the shared highlighter after its requested grammar has loaded. */
export const getCodeBlockHighlighter = async (grammar: string): Promise<HighlighterCore> => {
  const highlighter = await getHighlighter();
  await loadGrammar(grammar);
  return highlighter;
};
