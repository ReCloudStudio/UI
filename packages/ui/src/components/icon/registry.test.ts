import { describe, expect, it } from 'vitest'
import { toPascalCase } from './lucideResolver'
import {
  classifyIconSource,
  looksLikeImage,
  looksLikeSvg,
  parsePrefixedName,
  registerIconResolver,
  resolveIconSource,
  setDefaultIconResolver,
  unregisterIconResolver
} from './registry'

describe('Icon registry and classification', () => {
  it('correctly converts naming conventions to PascalCase', () => {
    expect(toPascalCase('settings')).toBe('Settings')
    expect(toPascalCase('arrow-left')).toBe('ArrowLeft')
    expect(toPascalCase('circle_alert')).toBe('CircleAlert')
    expect(toPascalCase('folder open')).toBe('FolderOpen')
    expect(toPascalCase('ChevronRight')).toBe('ChevronRight')
    expect(toPascalCase('')).toBe('')
  })

  it('classifies SVG markup, image paths, and named icons accurately', () => {
    expect(looksLikeSvg('<svg viewBox="0 0 24 24"><path /></svg>')).toBe(true)
    expect(looksLikeSvg('  <svg class="h-4">')).toBe(true)
    expect(looksLikeSvg('settings')).toBe(false)

    expect(looksLikeImage('/icons/app.svg')).toBe(true)
    expect(looksLikeImage('./logo.png')).toBe(true)
    expect(looksLikeImage('../assets/hero.webp')).toBe(true)
    expect(looksLikeImage('https://example.com/icon.svg')).toBe(true)
    expect(looksLikeImage('data:image/svg+xml;base64,PHN2Zz4...')).toBe(true)
    expect(looksLikeImage('lucide:settings')).toBe(false)

    expect(classifyIconSource('<svg></svg>')).toBe('svg')
    expect(classifyIconSource('/brand.png')).toBe('image')
    expect(classifyIconSource('lucide:settings')).toBe('named')
    expect(classifyIconSource({ render: () => null })).toBe('component')
  })

  it('parses prefixed names accurately', () => {
    expect(parsePrefixedName('lucide:settings')).toEqual({
      prefix: 'lucide',
      name: 'settings'
    })
    expect(parsePrefixedName('MDI:home-outline')).toEqual({
      prefix: 'mdi',
      name: 'home-outline'
    })
    expect(parsePrefixedName('plain-name')).toBeNull()
  })

  it('resolves direct Vue component sources synchronously', () => {
    const dummyComponent = { name: 'DummyIcon' }
    const result = resolveIconSource(dummyComponent)
    expect(result).toEqual({ kind: 'component', component: dummyComponent })
  })

  it('resolves inline SVG markup synchronously', () => {
    const svgCode = '<svg viewBox="0 0 16 16"><circle cx="8" cy="8" r="4" /></svg>'
    const result = resolveIconSource(svgCode)
    expect(result).toEqual({ kind: 'svg', markup: svgCode })
  })

  it('resolves image URLs synchronously', () => {
    const url = 'https://ui.worldexecute.me/icon.svg'
    const result = resolveIconSource(url)
    expect(result).toEqual({ kind: 'image', src: url })
  })

  it('supports registering and unregistering custom prefix resolvers', async () => {
    const customSvg = '<svg viewBox="0 0 24 24"><path d="M0 0h24v24H0z" /></svg>'
    registerIconResolver('testcustom', (name) => {
      if (name === 'check') return customSvg
      if (name === 'image') return '/resolved.png'
      return null
    })

    const checkResult = resolveIconSource('testcustom:check')
    expect(checkResult).toEqual({ kind: 'svg', markup: customSvg })

    const imgResult = resolveIconSource('testcustom:image')
    expect(imgResult).toEqual({ kind: 'image', src: '/resolved.png' })

    const unknownResult = resolveIconSource('testcustom:missing')
    expect(unknownResult).toBeNull()

    unregisterIconResolver('testcustom')
    const unregistered = resolveIconSource('testcustom:check')
    // After unregistration, unregistered prefix with no default resolver resolves to null
    expect(unregistered).toBeNull()
  })

  it('supports asynchronous custom resolvers', async () => {
    registerIconResolver('testasync', async (name) => {
      if (name === 'rocket') {
        return '<svg id="rocket"></svg>'
      }
      return null
    })

    const promise = resolveIconSource('testasync:rocket')
    expect(promise).toBeInstanceOf(Promise)
    const resolved = await promise
    expect(resolved).toEqual({ kind: 'svg', markup: '<svg id="rocket"></svg>' })

    unregisterIconResolver('testasync')
  })

  it('falls back to default resolver for unknown prefixes and bare names', async () => {
    setDefaultIconResolver((name) => {
      if (name === 'app-logo') return '/logo.svg'
      if (name === 'unknown:test') return '<svg id="fallback"></svg>'
      return null
    })

    const bareResult = resolveIconSource('app-logo')
    expect(bareResult).toEqual({ kind: 'image', src: '/logo.svg' })

    const prefixResult = resolveIconSource('unknown:test')
    expect(prefixResult).toEqual({ kind: 'svg', markup: '<svg id="fallback"></svg>' })

    setDefaultIconResolver(null)
  })

  it('resolves lucide icons asynchronously via built-in resolver', async () => {
    const outcome = resolveIconSource('lucide:settings')
    expect(outcome).toBeInstanceOf(Promise)
    const resolved = await outcome
    expect(resolved).not.toBeNull()
    expect(resolved?.kind).toBe('component')
  })
})
