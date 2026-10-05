import { ref } from 'vue'
import { lookupLucideIcon } from './lucideResolver'
import type { IconResolver, IconSource, ResolvedIcon } from './types'

/**
 * 响应式版本号计数器，供 Icon 组件监听动态注册变更。
 */
export const iconRegistryVersion = ref(0)

const prefixResolvers = new Map<string, IconResolver>()
let defaultIconResolver: IconResolver | null = null

/**
 * 注册指定前缀的图标库解析器（前缀不区分大小写）。
 * 例如：`registerIconResolver('mdi', (name) => ...)`
 */
export function registerIconResolver(prefix: string, resolver: IconResolver): void {
  const normalized = prefix.trim().toLowerCase()
  if (!normalized) return
  prefixResolvers.set(normalized, resolver)
  iconRegistryVersion.value++
}

/**
 * 注销指定前缀的图标库解析器。
 */
export function unregisterIconResolver(prefix: string): void {
  const normalized = prefix.trim().toLowerCase()
  if (prefixResolvers.delete(normalized)) {
    iconRegistryVersion.value++
  }
}

/**
 * 设置未带前缀图标名称的默认解析器。
 */
export function setDefaultIconResolver(resolver: IconResolver | null | undefined): void {
  defaultIconResolver = resolver ?? null
  iconRegistryVersion.value++
}

/**
 * 判断字符串是否为内联 SVG 代码片段。
 */
export function looksLikeSvg(value: string): boolean {
  return /^\s*<svg[\s>]/i.test(value)
}

/**
 * 判断字符串是否为图像路径、网络 URL 或 Data URL。
 */
export function looksLikeImage(value: string): boolean {
  const trimmed = value.trim()
  if (
    /^(?:https?:)?\/\//i.test(trimmed) ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('./') ||
    trimmed.startsWith('../') ||
    trimmed.startsWith('data:image/')
  ) {
    return true
  }
  return /\.(svg|png|jpe?g|gif|webp|avif|ico)([?#].*)?$/i.test(trimmed)
}

/**
 * 解析带前缀的名称（例如 `'lucide:settings'` -> `{ prefix: 'lucide', name: 'settings' }`）。
 */
export function parsePrefixedName(
  value: string
): { prefix: string; name: string } | null {
  const trimmed = value.trim()
  const match = /^([a-zA-Z0-9_-]+):(.*)$/.exec(trimmed)
  if (!match) return null
  return {
    prefix: match[1].toLowerCase(),
    name: match[2].trim()
  }
}

/**
 * 分析给定的图标源类型归类。
 */
export function classifyIconSource(
  source: IconSource
): 'component' | 'svg' | 'image' | 'named' {
  if (typeof source !== 'string') {
    return 'component'
  }
  if (looksLikeSvg(source)) {
    return 'svg'
  }
  if (looksLikeImage(source)) {
    return 'image'
  }
  return 'named'
}

function isPromise<T>(value: unknown): value is Promise<T> {
  if (value === null || typeof value !== 'object') {
    return false
  }
  // SAFETY: duck-typing thenable checks whether `then` is callable.
  const candidate = value as { then?: unknown }
  return typeof candidate.then === 'function'
}

function normalizeResolved(result: IconSource | null | undefined): ResolvedIcon | null {
  if (!result) return null
  if (typeof result !== 'string') {
    return { kind: 'component', component: result }
  }
  const trimmed = result.trim()
  if (!trimmed) return null
  if (looksLikeSvg(trimmed)) {
    return { kind: 'svg', markup: trimmed }
  }
  if (looksLikeImage(trimmed)) {
    return { kind: 'image', src: trimmed }
  }
  return null
}

/**
 * 解析任意图标源为已规范化形态（支持同步返回或异步 Promise）。
 */
export function resolveIconSource(
  source: IconSource | null | undefined
): ResolvedIcon | Promise<ResolvedIcon | null> | null {
  if (!source) return null

  if (typeof source !== 'string') {
    return { kind: 'component', component: source }
  }

  const trimmed = source.trim()
  if (!trimmed) return null

  if (looksLikeSvg(trimmed)) {
    return { kind: 'svg', markup: trimmed }
  }

  if (looksLikeImage(trimmed)) {
    return { kind: 'image', src: trimmed }
  }

  const prefixed = parsePrefixedName(trimmed)
  if (prefixed) {
    const resolver = prefixResolvers.get(prefixed.prefix)
    if (resolver) {
      const outcome = resolver(prefixed.name)
      if (isPromise<IconSource | null | undefined>(outcome)) {
        return outcome.then(normalizeResolved)
      }
      return normalizeResolved(outcome)
    }

    if (prefixed.prefix === 'lucide') {
      return lookupLucideIcon(prefixed.name).then((comp) => {
        return comp ? { kind: 'component', component: comp } : null
      })
    }

    if (defaultIconResolver) {
      const outcome = defaultIconResolver(trimmed)
      if (isPromise<IconSource | null | undefined>(outcome)) {
        return outcome.then(normalizeResolved)
      }
      return normalizeResolved(outcome)
    }

    return null
  }

  if (defaultIconResolver) {
    const outcome = defaultIconResolver(trimmed)
    if (isPromise<IconSource | null | undefined>(outcome)) {
      return outcome.then(normalizeResolved)
    }
    return normalizeResolved(outcome)
  }

  return lookupLucideIcon(trimmed).then((comp) => {
    return comp ? { kind: 'component', component: comp } : null
  })
}
