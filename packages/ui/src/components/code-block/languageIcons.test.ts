import { describe, expect, it } from 'vitest'
import {
  DEFAULT_CODE_ICON,
  LANGUAGE_ICONS,
  extractExtension,
  resolveCodeBlockIcon
} from './languageIcons'

describe('languageIcons', () => {
  it('extracts extensions from filenames correctly', () => {
    expect(extractExtension('App.vue')).toBe('vue')
    expect(extractExtension('config.test.ts')).toBe('ts')
    expect(extractExtension('style.min.css')).toBe('css')
    expect(extractExtension('Dockerfile')).toBe('dockerfile')
    expect(extractExtension('README.md')).toBe('md')
    expect(extractExtension('file-without-ext')).toBe('')
    expect(extractExtension('')).toBe('')
  })

  it('resolves icons based on language accurately', () => {
    expect(resolveCodeBlockIcon(undefined, 'ts', undefined)).toBe(LANGUAGE_ICONS.ts)
    expect(resolveCodeBlockIcon(undefined, 'typescript', undefined)).toBe(LANGUAGE_ICONS.typescript)
    expect(resolveCodeBlockIcon(undefined, 'vue', undefined)).toBe(LANGUAGE_ICONS.vue)
    expect(resolveCodeBlockIcon(undefined, 'bash', undefined)).toBe(LANGUAGE_ICONS.bash)
    expect(resolveCodeBlockIcon(undefined, 'python', undefined)).toBe(LANGUAGE_ICONS.python)
    expect(resolveCodeBlockIcon(undefined, 'rust', undefined)).toBe(LANGUAGE_ICONS.rust)
    expect(resolveCodeBlockIcon(undefined, 'json', undefined)).toBe(LANGUAGE_ICONS.json)
    expect(resolveCodeBlockIcon(undefined, 'sql', undefined)).toBe(LANGUAGE_ICONS.sql)
  })

  it('resolves icons based on filename extension when language is not provided', () => {
    expect(resolveCodeBlockIcon(undefined, undefined, 'deploy.sh')).toBe(LANGUAGE_ICONS.sh)
    expect(resolveCodeBlockIcon(undefined, undefined, 'schema.prisma.sql')).toBe(LANGUAGE_ICONS.sql)
    expect(resolveCodeBlockIcon(undefined, undefined, 'config.yaml')).toBe(LANGUAGE_ICONS.yaml)
    expect(resolveCodeBlockIcon(undefined, undefined, 'Dockerfile')).toBe(LANGUAGE_ICONS.dockerfile)
  })

  it('respects explicit icon overrides', () => {
    // icon: false explicitly disables icon
    expect(resolveCodeBlockIcon(false, 'ts', 'main.ts')).toBeNull()

    // icon: custom string or component overrides matched language
    const customIcon = 'lucide:file-code'
    expect(resolveCodeBlockIcon(customIcon, 'ts', 'main.ts')).toBe(customIcon)

    // icon: true falls back to DEFAULT_CODE_ICON when language is unrecognized
    expect(resolveCodeBlockIcon(true, 'unknown-lang-xyz', 'data.unknown')).toBe(DEFAULT_CODE_ICON)

    // icon: undefined returns null when language/filename is unrecognized
    expect(resolveCodeBlockIcon(undefined, 'unknown-lang-xyz', 'data.unknown')).toBeNull()
  })
})
