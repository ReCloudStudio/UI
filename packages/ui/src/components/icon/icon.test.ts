import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { Icon } from './index'

describe('Icon component', () => {
  it('is exported as a Vue component', () => {
    expect(Icon).toBeDefined()
    expect(Icon.name || Icon.__name).toBe('ReIcon')
  })

  it('implements accessibility semantics, sizing, and slot fallbacks in template', () => {
    const sfcPath = resolve(__dirname, './Icon.vue')
    const source = readFileSync(sfcPath, 'utf-8')

    // Accessibility: label given sets role="img" and aria-label; absent sets aria-hidden="true"
    expect(source).toContain(':role="label ? \'img\' : undefined"')
    expect(source).toContain(':aria-label="label || undefined"')
    expect(source).toContain(':aria-hidden="label ? undefined : \'true\'"')

    // Rendering branches: component, svg markup, image src, slot fallback
    expect(source).toContain("resolved?.kind === 'component'")
    expect(source).toContain("resolved?.kind === 'svg'")
    expect(source).toContain("resolved?.kind === 'image'")
    expect(source).toContain('<slot v-else />')

    // Size binding
    expect(source).toContain(':style="sizeStyle"')
  })
})
