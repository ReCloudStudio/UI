import { describe, expect, it } from 'vitest'
import {
  CODE_BLOCK_GRAMMARS,
  CODE_BLOCK_GRAMMAR_IDS,
  DEFAULT_CODE_ICON,
  loadCodeBlockGrammar,
  LANGUAGE_ICONS,
  extractExtension,
  resolveCodeBlockGrammar,
  resolveCodeBlockIcon
} from './languages'

const LEGACY_LANGUAGE_KEYS = [
  'bash',
  'css',
  'docker',
  'dockerfile',
  'go',
  'golang',
  'html',
  'javascript',
  'js',
  'json',
  'jsx',
  'log',
  'markdown',
  'md',
  'py',
  'python',
  'rs',
  'rust',
  'sh',
  'shell',
  'shellscript',
  'sql',
  'toml',
  'ts',
  'tsx',
  'typescript',
  'vue',
  'vue-html',
  'yaml',
  'yml',
  'zsh'
]

describe('CodeBlock languages', () => {
  it('extracts extensions from filenames correctly', () => {
    expect(extractExtension('App.vue')).toBe('vue')
    expect(extractExtension('config.test.ts')).toBe('ts')
    expect(extractExtension('style.min.css')).toBe('css')
    expect(extractExtension('Dockerfile')).toBe('dockerfile')
    expect(extractExtension('README.md')).toBe('md')
    expect(extractExtension('file-without-ext')).toBe('')
    expect(extractExtension('')).toBe('')
  })

  it('resolves icons from canonical ids and aliases', () => {
    expect(resolveCodeBlockIcon(undefined, 'ts', undefined)).toBe(LANGUAGE_ICONS.ts)
    expect(resolveCodeBlockIcon(undefined, 'typescript', undefined)).toBe(
      LANGUAGE_ICONS.typescript
    )
    expect(resolveCodeBlockIcon(undefined, 'vue', undefined)).toBe(LANGUAGE_ICONS.vue)
    expect(resolveCodeBlockIcon(undefined, 'bash', undefined)).toBe(LANGUAGE_ICONS.bash)
    expect(resolveCodeBlockIcon(undefined, 'python', undefined)).toBe(LANGUAGE_ICONS.python)
    expect(resolveCodeBlockIcon(undefined, 'rust', undefined)).toBe(LANGUAGE_ICONS.rust)
    expect(resolveCodeBlockIcon(undefined, 'json', undefined)).toBe(LANGUAGE_ICONS.json)
    expect(resolveCodeBlockIcon(undefined, 'sql', undefined)).toBe(LANGUAGE_ICONS.sql)
  })

  it('resolves icons from filename extensions when language is absent', () => {
    expect(resolveCodeBlockIcon(undefined, undefined, 'deploy.sh')).toBe(LANGUAGE_ICONS.sh)
    expect(resolveCodeBlockIcon(undefined, undefined, 'schema.prisma.sql')).toBe(
      LANGUAGE_ICONS.sql
    )
    expect(resolveCodeBlockIcon(undefined, undefined, 'config.yaml')).toBe(
      LANGUAGE_ICONS.yaml
    )
    expect(resolveCodeBlockIcon(undefined, undefined, 'Dockerfile')).toBe(
      LANGUAGE_ICONS.dockerfile
    )
  })

  it('respects explicit icon overrides', () => {
    expect(resolveCodeBlockIcon(false, 'ts', 'main.ts')).toBeNull()

    const customIcon = 'lucide:file-code'
    expect(resolveCodeBlockIcon(customIcon, 'ts', 'main.ts')).toBe(customIcon)

    expect(resolveCodeBlockIcon(true, 'unknown-lang-xyz', 'data.unknown')).toBe(
      DEFAULT_CODE_ICON
    )
    expect(resolveCodeBlockIcon(undefined, 'unknown-lang-xyz', 'data.unknown')).toBeNull()
  })

  it('resolves aliases, Vue snippets and unknown languages to loadable grammars', () => {
    expect(resolveCodeBlockGrammar('ts', 'const value = 1')).toBe('typescript')
    expect(resolveCodeBlockGrammar('bash', 'echo hello')).toBe('shellscript')
    expect(resolveCodeBlockGrammar('dockerfile', 'FROM oven/bun')).toBe('docker')
    expect(resolveCodeBlockGrammar('vue', '<template><div /></template>')).toBe('vue')
    expect(resolveCodeBlockGrammar('vue', '<div><Button /></div>')).toBe('vue-html')
    expect(resolveCodeBlockGrammar('unknown', 'plain text')).toBe('log')
    expect(resolveCodeBlockGrammar('', 'plain text')).toBe('log')
  })

  it('keeps every registered grammar paired with exactly one lazy loader', () => {
    expect([...CODE_BLOCK_GRAMMARS].sort()).toEqual([...CODE_BLOCK_GRAMMAR_IDS].sort())
  })

  it('loads a registered grammar in the format accepted by shiki', async () => {
    const language = loadCodeBlockGrammar('python')
    expect(language).not.toBeNull()
    if (!language) throw new Error('Python grammar loader is missing')

    const { createHighlighterCore } = await import('shiki/core')
    const { createJavaScriptRegexEngine } = await import('shiki/engine/javascript')
    const highlighter = await createHighlighterCore({
      themes: [],
      langs: [],
      engine: createJavaScriptRegexEngine()
    })
    await highlighter.loadLanguage(language)

    expect(highlighter.getLoadedLanguages()).toEqual(expect.arrayContaining(['python', 'py']))
  })

  it('preserves every previously published language icon key', () => {
    expect(Object.keys(LANGUAGE_ICONS)).toEqual(expect.arrayContaining(LEGACY_LANGUAGE_KEYS))
  })
})
