<template>
  <section :class="codeBlockClasses">
    <header v-if="hasHeader" :class="headerClasses">
      <component
        :is="collapsible ? 'button' : 'div'"
        v-bind="collapsible ? { type: 'button', 'aria-expanded': !isCollapsed, 'aria-controls': bodyId } : {}"
        :class="titleClasses"
        @click="toggleCollapsed"
      >
        <svg v-if="collapsible" :class="cn('h-3.5 w-3.5 shrink-0 text-[var(--code-muted)] transition-transform duration-200', !isCollapsed && 'rotate-90')" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        <Icon v-if="effectiveIcon" :icon="effectiveIcon" size="1rem" class="shrink-0" />
        <span v-else-if="!collapsible" class="h-2 w-2 shrink-0 rounded-full bg-[var(--code-accent)] shadow-[0_0_0_3px_rgb(59_130_246_/_0.12)]" aria-hidden="true" />
        <span v-if="filename" class="truncate font-mono text-xs font-medium text-[var(--code-foreground)]">{{ filename }}</span>
        <span v-if="language" class="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--code-muted)]">{{ language }}</span>
        <span v-if="collapsible" class="shrink-0 text-xs font-medium text-[var(--code-muted)]">{{ isCollapsed ? commonLoc.expandCode : commonLoc.collapseCode }}</span>
      </component>
      <button
        v-if="copyable"
        type="button"
        class="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-[var(--code-muted)] transition-colors hover:bg-[var(--code-hover)] hover:text-[var(--code-foreground)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]"
        :aria-label="copied ? commonLoc.copied : commonLoc.copy"
        @click="copyCode"
      >
        <svg v-if="!copied" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
        <svg v-else class="h-3.5 w-3.5 text-[var(--success)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 13 4 4L19 7" /></svg>
        {{ copied ? commonLoc.copied : commonLoc.copy }}
      </button>
    </header>

    <div
      v-show="!isCollapsed"
      :id="bodyId"
      :class="contentClasses"
      :style="maxHeight ? { maxHeight } : undefined"
      v-html="renderedHtml"
    />
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, shallowRef, useId, watch } from 'vue'
import { Icon } from '../icon'
import { resolveCodeBlockIcon } from './languageIcons'
import { cn } from '../../utils/cn'
import { useComponentLocale } from '../../locale'
import type { CodeBlockProps } from './types'

const props = withDefaults(defineProps<CodeBlockProps>(), {
  code: '',
  language: '',
  filename: '',
  icon: undefined,
  copyable: true,
  showLineNumbers: false,
  wrap: false,
  maxHeight: '',
  collapsible: false,
  class: ''
})

/** Collapsed state; only takes effect when `collapsible` is set. Works uncontrolled without v-model. */
const collapsed = defineModel<boolean>('collapsed', { default: false })
const commonLoc = useComponentLocale('common')

const bodyId = useId()
const copied = shallowRef(false)
/** Highlight result tagged with the source it was produced for, so stale output is never shown. */
const highlighted = shallowRef<{ key: string; html: string } | null>(null)
const colorTheme = shallowRef<'github-dark' | 'github-light'>(getColorTheme())
let copyTimer: ReturnType<typeof setTimeout> | undefined
let highlighterPromise: Promise<Awaited<ReturnType<typeof createHighlighter>>> | undefined
let themeObserver: MutationObserver | undefined
let highlightVersion = 0

const languageAliases: Record<string, string> = {
  bash: 'shellscript',
  js: 'javascript',
  sh: 'shellscript',
  shell: 'shellscript',
  ts: 'typescript'
}
const supportedLanguages = new Set(['css', 'html', 'javascript', 'json', 'log', 'shellscript', 'typescript', 'vue', 'vue-html'])
/** A Vue SFC has at least one top-level block; anything else is a template fragment. */
const SFC_BLOCK_RE = /^<(template|script|style)[\s>]/m
/**
 * Component-owned class for the rendered <pre>. Shiki's default `shiki` class is replaced so
 * host-app global rules (e.g. `pre.shiki { background: ... !important }`) cannot override it.
 */
const PRE_CLASS = 'rc-code-block-pre'

const isCollapsed = computed(() => props.collapsible && collapsed.value)
const effectiveIcon = computed(() => resolveCodeBlockIcon(props.icon, props.language, props.filename))
const hasHeader = computed(() => Boolean(props.filename || props.language || props.copyable || props.collapsible || effectiveIcon.value))
const sourceKey = computed(() => `${colorTheme.value}\u0000${props.language}\u0000${props.code}`)

const headerClasses = computed(() => {
  return cn(
    'flex min-h-10 items-center justify-between gap-3 px-3.5',
    !isCollapsed.value && 'border-b border-[var(--code-border)]'
  )
})

const titleClasses = computed(() => {
  return cn(
    'flex min-w-0 items-center gap-2',
    props.collapsible &&
      '-ml-1.5 rounded-md px-1.5 py-1 text-left transition-colors hover:bg-[var(--code-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ring)]'
  )
})

const codeBlockClasses = computed(() => {
  return cn(
    'overflow-hidden rounded-xl border border-[var(--code-border)] bg-[var(--code-background)] text-[var(--code-foreground)] shadow-sm',
    props.class
  )
})

/**
 * Styles for the v-html content. Written as Tailwind arbitrary variants instead of `<style scoped>`:
 * the library build extracts SFC styles into a separate CSS file that consumers never import,
 * while Tailwind utilities are picked up from source like every other component.
 */
const contentClasses = computed(() => {
  return cn(
    'overflow-auto',
    '[&>pre]:m-0 [&>pre]:rounded-none [&>pre]:p-4 [&>pre]:bg-transparent! [&>pre]:text-[var(--code-foreground)] [&>pre]:shadow-none!',
    '[&>pre]:font-mono [&>pre]:text-[13px] [&>pre]:leading-6',
    '[&_code]:block [&_code]:bg-transparent [&_code]:p-0 [&_code]:[font:inherit]',
    props.wrap
      ? '[&>pre]:whitespace-pre-wrap [&>pre]:[overflow-wrap:anywhere]'
      : '[&>pre]:min-w-max [&>pre]:whitespace-pre',
    props.showLineNumbers &&
      '[&>pre]:[counter-reset:line] [&_.line]:before:inline-block [&_.line]:before:w-6 [&_.line]:before:mr-5 [&_.line]:before:text-right [&_.line]:before:text-[var(--code-muted)] [&_.line]:before:select-none [&_.line]:before:[counter-increment:line] [&_.line]:before:content-[counter(line)]'
  )
})

/** Show raw escaped code (same line structure as Shiki) while the highlighter loads or on error. */
const fallbackHtml = computed(() => {
  const lines = props.code.split('\n').map((line) => `<span class="line">${escapeHtml(line)}</span>`)
  return `<pre class="${PRE_CLASS}"><code>${lines.join('\n')}</code></pre>`
})

/** Use highlighted output when it matches the current source, otherwise fall back to plain escaped code. */
const renderedHtml = computed(() => {
  return highlighted.value?.key === sourceKey.value ? highlighted.value.html : fallbackHtml.value
})

function toggleCollapsed() {
  if (props.collapsible) collapsed.value = !collapsed.value
}

onMounted(() => {
  const root = document.documentElement
  const updateColorTheme = () => {
    colorTheme.value = getColorTheme()
  }

  updateColorTheme()
  themeObserver = new MutationObserver(updateColorTheme)
  themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
})

onBeforeUnmount(() => {
  if (copyTimer !== undefined) {
    clearTimeout(copyTimer)
  }
  themeObserver?.disconnect()
  // Invalidate any in-flight highlight so it won't write to an unmounted ref.
  highlightVersion++
})

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    if (copyTimer !== undefined) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => (copied.value = false), 1600)
  } catch {
    copied.value = false
  }
}

async function createHighlighter() {
  const [
    { createHighlighterCore },
    { createJavaScriptRegexEngine },
    { default: darkTheme },
    { default: lightTheme },
    ...languages
  ] = await Promise.all([
    import('shiki/core'),
    import('shiki/engine/javascript'),
    import('shiki/dist/themes/github-dark.mjs'),
    import('shiki/dist/themes/github-light.mjs'),
    import('shiki/dist/langs/css.mjs'),
    import('shiki/dist/langs/html.mjs'),
    import('shiki/dist/langs/javascript.mjs'),
    import('shiki/dist/langs/json.mjs'),
    import('shiki/dist/langs/log.mjs'),
    import('shiki/dist/langs/shellscript.mjs'),
    import('shiki/dist/langs/typescript.mjs'),
    import('shiki/dist/langs/vue.mjs'),
    import('shiki/dist/langs/vue-html.mjs')
  ])

  return createHighlighterCore({
    themes: [darkTheme, lightTheme],
    langs: languages.map(({ default: lang }) => lang),
    engine: createJavaScriptRegexEngine()
  })
}

function getHighlighter() {
  highlighterPromise ??= createHighlighter()
  return highlighterPromise
}

function resolveLanguage(language: string, code: string) {
  const normalized = languageAliases[language.toLowerCase()] ?? language.toLowerCase()
  if (!supportedLanguages.has(normalized)) return 'log'
  // The `vue` grammar only tokenizes inside SFC blocks; bare template snippets
  // (e.g. `<div><Button v-model="x" /></div>`) need the template grammar instead.
  if (normalized === 'vue' && !SFC_BLOCK_RE.test(code)) return 'vue-html'
  return normalized
}

watch(
  [sourceKey, isCollapsed],
  async ([key, hidden]) => {
    // Defer highlighting until the body is visible; skip if already highlighted.
    if (hidden || highlighted.value?.key === key) return
    const version = ++highlightVersion
    try {
      const highlighter = await getHighlighter()
      // Guard against stale async results when props changed during await.
      if (version !== highlightVersion) return
      const html = highlighter.codeToHtml(props.code, {
        lang: resolveLanguage(props.language, props.code),
        theme: colorTheme.value,
        transformers: [
          {
            pre(node) {
              node.properties.class = PRE_CLASS
            }
          }
        ]
      })
      highlighted.value = { key, html }
    } catch {
      // Leave `highlighted` untouched: the key mismatch keeps the plain fallback visible.
    }
  },
  { immediate: true }
)

function getColorTheme() {
  if (typeof document === 'undefined') return 'github-light'
  return document.documentElement.dataset.theme === 'dark' ? 'github-dark' : 'github-light'
}

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
</script>
