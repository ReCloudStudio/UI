import type { Highlighter } from 'shiki'

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = import('shiki').then((shiki) =>
      shiki.createHighlighter({
        themes: ['github-light', 'github-dark'],
        langs: ['vue', 'ts', 'js', 'json', 'bash', 'css', 'html']
      })
    ) as Promise<Highlighter>
  }
  return highlighterPromise
}

export async function highlightCode(code: string, lang = 'vue'): Promise<string> {
  try {
    const shiki = await getHighlighter()
    if (!shiki.getLoadedLanguages().includes(lang)) {
      await shiki.loadLanguage(lang as never)
    }
    return shiki.codeToHtml(code, {
      lang,
      themes: { light: 'github-light', dark: 'github-dark' }
    })
  } catch {
    return `<pre class="shiki-fallback"><code>${code.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</code></pre>`
  }
}

export function detectLang(code: string): string {
  const first = code.trimStart().slice(0, 40)
  if (/^(# |npm |bun |pnpm |yarn |npx )/.test(first)) return 'bash'
  if (/^\/\//.test(first) && /defineNuxtConfig|export default/.test(code)) return 'ts'
  if (/^<(template|script|div|Button|Input|Badge|Card)/i.test(first)) return 'vue'
  if (/^[{[]/.test(first)) return 'json'
  return 'vue'
}
