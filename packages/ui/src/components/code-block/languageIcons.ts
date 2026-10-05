import type { IconSource } from '../icon'

/**
 * 语言与文件扩展名到内置 SVG 图标的规范化映射。
 */
export const LANGUAGE_ICONS: Record<string, string> = {
  // TypeScript
  ts: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#3178C6"/><path d="M4 8h8M8 8v11" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M19 11.5c-1-1-3-1-4 0s0 2.5 1.5 3 2.5 1 2.5 2.5-1.5 2-3 1.5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,
  typescript: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#3178C6"/><path d="M4 8h8M8 8v11" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M19 11.5c-1-1-3-1-4 0s0 2.5 1.5 3 2.5 1 2.5 2.5-1.5 2-3 1.5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,
  tsx: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#3178C6"/><path d="M4 8h8M8 8v11" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M19 11.5c-1-1-3-1-4 0s0 2.5 1.5 3 2.5 1 2.5 2.5-1.5 2-3 1.5" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,

  // JavaScript
  js: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#F7DF1E"/><path d="M8 12v5a2 2 0 0 1-2 2H5" stroke="#000" stroke-width="2" stroke-linecap="round"/><path d="M18 13c-1-1-3-1-4 0s0 2.5 1.5 3 2.5 1 2.5 2.5-1.5 2-3 1.5" stroke="#000" stroke-width="2" stroke-linecap="round"/></svg>`,
  javascript: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#F7DF1E"/><path d="M8 12v5a2 2 0 0 1-2 2H5" stroke="#000" stroke-width="2" stroke-linecap="round"/><path d="M18 13c-1-1-3-1-4 0s0 2.5 1.5 3 2.5 1 2.5 2.5-1.5 2-3 1.5" stroke="#000" stroke-width="2" stroke-linecap="round"/></svg>`,
  jsx: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#F7DF1E"/><path d="M8 12v5a2 2 0 0 1-2 2H5" stroke="#000" stroke-width="2" stroke-linecap="round"/><path d="M18 13c-1-1-3-1-4 0s0 2.5 1.5 3 2.5 1 2.5 2.5-1.5 2-3 1.5" stroke="#000" stroke-width="2" stroke-linecap="round"/></svg>`,

  // Vue
  vue: `<svg viewBox="0 0 24 24" fill="none"><path d="M2 3h4.5L12 13 17.5 3H22L12 20 2 3z" fill="#41B883"/><path d="M6.5 3h4L12 5.5 13.5 3h4L12 12 6.5 3z" fill="#35495E"/></svg>`,
  'vue-html': `<svg viewBox="0 0 24 24" fill="none"><path d="M2 3h4.5L12 13 17.5 3H22L12 20 2 3z" fill="#41B883"/><path d="M6.5 3h4L12 5.5 13.5 3h4L12 12 6.5 3z" fill="#35495E"/></svg>`,

  // HTML
  html: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 2l1.6 18 6.4 2 6.4-2L20 2H4z" fill="#E34F26"/><path d="M12 4v16.1l4.9-1.5 1.2-13.6H12z" fill="#EF652A"/><path d="M8 7h8m-8 4h7.5m-7.5 4h5l-.5 2.5-2.5.7-2.5-.7-.2-1.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  // CSS
  css: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 2l1.6 18 6.4 2 6.4-2L20 2H4z" fill="#1572B6"/><path d="M12 4v16.1l4.9-1.5 1.2-13.6H12z" fill="#33A9DC"/><path d="M8 7h8m-8 4h7.5m-7.5 4h5l-.5 2.5-2.5.7-2.5-.7-.2-1.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  // JSON
  json: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#292929"/><path d="M8 7c-1.5 0-2 1-2 2.5v1c0 1-.5 1.5-1.5 1.5 1 0 1.5.5 1.5 1.5v1c0 1.5.5 2.5 2 2.5m8-10c1.5 0 2 1 2 2.5v1c0 1 .5 1.5 1.5 1.5-1 0-1.5.5-1.5 1.5v1c0 1.5-.5 2.5-2 2.5" stroke="#CBCB41" stroke-width="1.8" stroke-linecap="round"/></svg>`,

  // Shell / Bash / Sh / Zsh
  bash: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#293138"/><path d="M6 8l4 4-4 4m6 1h6" stroke="#4EAA25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  sh: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#293138"/><path d="M6 8l4 4-4 4m6 1h6" stroke="#4EAA25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  shell: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#293138"/><path d="M6 8l4 4-4 4m6 1h6" stroke="#4EAA25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  shellscript: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#293138"/><path d="M6 8l4 4-4 4m6 1h6" stroke="#4EAA25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  zsh: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#293138"/><path d="M6 8l4 4-4 4m6 1h6" stroke="#4EAA25" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  // Log
  log: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#334155"/><path d="M7 7h10M7 11h10M7 15h6" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/></svg>`,

  // Python
  python: `<svg viewBox="0 0 24 24" fill="none"><path d="M11.8 3c-4.2 0-3.9 1.8-3.9 1.8l.04 1.9h4v.6H6.3s-2.5.3-2.5 3.9 2.2 3.8 2.2 3.8h1.3v-1.9c0-2.2 1.9-2.1 1.9-2.1h3.9s1.8 0 1.8-1.8V5.3s.3-2.3-3.1-2.3zm-1.2 1.2a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z" fill="#3776AB"/><path d="M12.2 21c4.2 0 3.9-1.8 3.9-1.8l-.04-1.9h-4v-.6h5.6s2.5-.3 2.5-3.9-2.2-3.8-2.2-3.8h-1.3v1.9c0 2.2-1.9 2.1-1.9 2.1h-3.9s-1.8 0-1.8 1.8v3.9s-.3 2.3 3.1 2.3zm1.2-1.2a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z" fill="#FFD43B"/></svg>`,
  py: `<svg viewBox="0 0 24 24" fill="none"><path d="M11.8 3c-4.2 0-3.9 1.8-3.9 1.8l.04 1.9h4v.6H6.3s-2.5.3-2.5 3.9 2.2 3.8 2.2 3.8h1.3v-1.9c0-2.2 1.9-2.1 1.9-2.1h3.9s1.8 0 1.8-1.8V5.3s.3-2.3-3.1-2.3zm-1.2 1.2a.7.7 0 1 1 0 1.4.7.7 0 0 1 0-1.4z" fill="#3776AB"/><path d="M12.2 21c4.2 0 3.9-1.8 3.9-1.8l-.04-1.9h-4v-.6h5.6s2.5-.3 2.5-3.9-2.2-3.8-2.2-3.8h-1.3v1.9c0 2.2-1.9 2.1-1.9 2.1h-3.9s-1.8 0-1.8 1.8v3.9s-.3 2.3 3.1 2.3zm1.2-1.2a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4z" fill="#FFD43B"/></svg>`,

  // Rust
  rust: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#000"/><path d="M8 8h5a2 2 0 0 1 0 4H8v4m5-4l3 4" stroke="#DEA584" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  rs: `<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" fill="#000"/><path d="M8 8h5a2 2 0 0 1 0 4H8v4m5-4l3 4" stroke="#DEA584" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  // Go
  go: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#00ADD8"/><path d="M6 12h5a4 4 0 1 1-4-4" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M14 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" stroke="#fff" stroke-width="2"/></svg>`,
  golang: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#00ADD8"/><path d="M6 12h5a4 4 0 1 1-4-4" stroke="#fff" stroke-width="2" stroke-linecap="round"/><path d="M14 12a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" stroke="#fff" stroke-width="2"/></svg>`,

  // Markdown
  md: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#083FA1"/><path d="M4 16V8l3.5 4.5L11 8v8m5-6v6m-2.5-3.5L16 14l2.5-3.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  markdown: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#083FA1"/><path d="M4 16V8l3.5 4.5L11 8v8m5-6v6m-2.5-3.5L16 14l2.5-3.5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,

  // YAML / TOML
  yaml: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#CB171E"/><path d="M6 7l3.5 5.5L13 7m-3.5 5.5V17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  yml: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#CB171E"/><path d="M6 7l3.5 5.5L13 7m-3.5 5.5V17" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  toml: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#9C4121"/><path d="M6 8h8M10 8v8" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`,

  // SQL
  sql: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#00758F"/><ellipse cx="12" cy="7" rx="6" ry="3" stroke="#fff" stroke-width="1.8"/><path d="M6 7v10c0 1.7 2.7 3 6 3s6-1.3 6-3V7" stroke="#fff" stroke-width="1.8"/><path d="M6 12c0 1.7 2.7 3 6 3s6-1.3 6-3" stroke="#fff" stroke-width="1.8"/></svg>`,

  // Docker
  docker: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#2496ED"/><path d="M4 14c1-4 5-5 12-4 1-2 3-3 5-3-.3 2 .2 3-.5 4 1 2 0 5-6 5-4 0-8-1-10.5-2z" fill="#fff"/></svg>`,
  dockerfile: `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#2496ED"/><path d="M4 14c1-4 5-5 12-4 1-2 3-3 5-3-.3 2 .2 3-.5 4 1 2 0 5-6 5-4 0-8-1-10.5-2z" fill="#fff"/></svg>`
}

/**
 * 默认通用代码文件图标（当无法匹配到具体语言时使用）。
 */
export const DEFAULT_CODE_ICON = `<svg viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="4" fill="#475569"/><path d="M8 9l-3 3 3 3m8-6l3 3-3 3m-4-7l-2 8" stroke="#F1F5F9" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`

/**
 * 从文件名提取可能的文件扩展名（不带点，小写）。
 * 例如：`App.vue` -> `vue`，`config.test.ts` -> `ts`，`Dockerfile` -> `dockerfile`。
 */
export function extractExtension(filename: string): string {
  if (!filename) return ''
  const trimmed = filename.trim().toLowerCase()
  if (trimmed === 'dockerfile') return 'dockerfile'

  const lastDot = trimmed.lastIndexOf('.')
  if (lastDot === -1 || lastDot === trimmed.length - 1) return ''
  return trimmed.slice(lastDot + 1)
}

/**
 * 根据语言或文件名解析对应的编程语言图标源。
 */
export function resolveCodeBlockIcon(
  explicitIcon: IconSource | boolean | undefined,
  language: string | undefined,
  filename: string | undefined
): IconSource | null {
  // 显式为 false 时禁用图标
  if (explicitIcon === false) {
    return null
  }

  // 显式提供了自定义图标（非 boolean），优先使用
  if (explicitIcon && typeof explicitIcon !== 'boolean') {
    return explicitIcon
  }

  // 尝试根据 language 匹配
  const normLang = language?.trim().toLowerCase()
  if (normLang && LANGUAGE_ICONS[normLang]) {
    return LANGUAGE_ICONS[normLang]
  }

  // 尝试根据 filename 扩展名匹配
  if (filename) {
    const ext = extractExtension(filename)
    if (ext && LANGUAGE_ICONS[ext]) {
      return LANGUAGE_ICONS[ext]
    }
  }

  // 如果显式设置了 icon === true，但未匹配到具体语言，使用通用代码文件图标兜底
  if (explicitIcon === true) {
    return DEFAULT_CODE_ICON
  }

  return null
}
