import type { HighlighterCore } from 'shiki/core'

import { loadCodeBlockGrammar } from './languages'

let highlighterPromise: Promise<HighlighterCore> | undefined
const grammarPromises = new Map<string, Promise<void>>()

const createHighlighter = async (): Promise<HighlighterCore> => {
  const [
    { createHighlighterCore },
    { createJavaScriptRegexEngine },
    { default: darkTheme },
    { default: lightTheme }
  ] = await Promise.all([
    import('shiki/core'),
    import('shiki/engine/javascript'),
    import('shiki/dist/themes/github-dark.mjs'),
    import('shiki/dist/themes/github-light.mjs')
  ])

  return createHighlighterCore({
    themes: [darkTheme, lightTheme],
    langs: [],
    engine: createJavaScriptRegexEngine()
  })
}

const getHighlighter = (): Promise<HighlighterCore> => {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter().catch((error: unknown) => {
      highlighterPromise = undefined
      grammarPromises.clear()
      throw error
    })
  }
  return highlighterPromise
}

const loadGrammar = (grammar: string): Promise<void> => {
  const existing = grammarPromises.get(grammar)
  if (existing) return existing

  const promise = getHighlighter().then(async (highlighter) => {
    if (highlighter.getLoadedLanguages().includes(grammar)) return

    const language = loadCodeBlockGrammar(grammar)
    if (!language) throw new Error(`Unsupported CodeBlock grammar: ${grammar}`)
    await highlighter.loadLanguage(language)
  })

  grammarPromises.set(grammar, promise)
  promise.catch(() => {
    if (grammarPromises.get(grammar) === promise) grammarPromises.delete(grammar)
  })
  return promise
}

/** Return the shared highlighter after its requested grammar has loaded. */
export const getCodeBlockHighlighter = async (grammar: string): Promise<HighlighterCore> => {
  const highlighter = await getHighlighter()
  await loadGrammar(grammar)
  return highlighter
}
