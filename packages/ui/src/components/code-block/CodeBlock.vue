<template>
  <section :class="codeBlockClasses">
    <header v-if="hasHeader" :class="headerClasses">
      <component
        :is="collapsible ? 'button' : 'div'"
        v-bind="collapsible ? { type: 'button', 'aria-expanded': !isCollapsed, 'aria-controls': bodyId } : {}"
        :class="titleClasses"
        @click="toggleCollapsed"
      >
        <svg v-if="collapsible" :class="cn('h-3.5 w-3.5 shrink-0 text-slate-500 transition-transform duration-200', !isCollapsed && 'rotate-90')" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
        <span v-else class="h-2 w-2 shrink-0 rounded-full bg-blue-400 shadow-[0_0_0_3px_rgba(96,165,250,0.12)]" aria-hidden="true" />
        <span v-if="filename" class="truncate font-mono text-xs font-medium text-slate-200">{{ filename }}</span>
        <span v-if="language" class="font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">{{ language }}</span>
        <span v-if="collapsible" class="shrink-0 text-xs font-medium text-slate-400">{{ isCollapsed ? '展开代码' : '收起代码' }}</span>
      </component>
      <button
        v-if="copyable"
        type="button"
        class="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
        :aria-label="copied ? '代码已复制' : '复制代码'"
        @click="copyCode"
      >
        <svg v-if="!copied" class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
        <svg v-else class="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 13 4 4L19 7" /></svg>
        {{ copied ? '已复制' : '复制' }}
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
import { computed, onBeforeUnmount, shallowRef, useId, watch } from 'vue'
import { cn } from '../../utils/cn'

export interface CodeBlockProps {
  code?: string
  language?: string
  filename?: string
  copyable?: boolean
  showLineNumbers?: boolean
  wrap?: boolean
  maxHeight?: string
  /** Show a toggle in the header that collapses the code body. Use `v-model:collapsed` to control it. */
  collapsible?: boolean
  class?: string
}

const props = withDefaults(defineProps<CodeBlockProps>(), {
  code: '',
  language: '',
  filename: '',
  copyable: true,
  showLineNumbers: false,
  wrap: false,
  maxHeight: '',
  collapsible: false,
  class: ''
})

/** Collapsed state; only takes effect when `collapsible` is set. Works uncontrolled without v-model. */
const collapsed = defineModel<boolean>('collapsed', { default: false })

const bodyId = useId()
const copied = shallowRef(false)
/** Highlight result tagged with the source it was produced for, so stale output is never shown. */
const highlighted = shallowRef<{ key: string; html: string } | null>(null)
let copyTimer: ReturnType<typeof setTimeout> | undefined
let highlighterPromise: Promise<Awaited<ReturnType<typeof createHighlighter>>> | undefined
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
const hasHeader = computed(() => Boolean(props.filename || props.language || props.copyable || props.collapsible))
const sourceKey = computed(() => `${props.language}\u0000${props.code}`)

const headerClasses = computed(() => {
  return cn(
    'flex min-h-10 items-center justify-between gap-3 px-3.5',
    !isCollapsed.value && 'border-b border-slate-800/80'
  )
})

const titleClasses = computed(() => {
  return cn(
    'flex min-w-0 items-center gap-2',
    props.collapsible &&
      '-ml-1.5 rounded-md px-1.5 py-1 text-left transition-colors hover:bg-slate-800/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400'
  )
})

const codeBlockClasses = computed(() => {
  return cn(
    'overflow-hidden rounded-xl border border-slate-800 bg-[#0b1220] shadow-sm dark:border-slate-700 dark:bg-[#080d16]',
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
    '[&>pre]:m-0 [&>pre]:rounded-none [&>pre]:p-4 [&>pre]:bg-transparent! [&>pre]:text-[#e1e4e8] [&>pre]:shadow-none!',
    '[&>pre]:font-mono [&>pre]:text-[13px] [&>pre]:leading-6',
    '[&_code]:block [&_code]:bg-transparent [&_code]:p-0 [&_code]:[font:inherit]',
    props.wrap
      ? '[&>pre]:whitespace-pre-wrap [&>pre]:[overflow-wrap:anywhere]'
      : '[&>pre]:min-w-max [&>pre]:whitespace-pre',
    props.showLineNumbers &&
      '[&>pre]:[counter-reset:line] [&_.line]:before:inline-block [&_.line]:before:w-6 [&_.line]:before:mr-5 [&_.line]:before:text-right [&_.line]:before:text-slate-600 [&_.line]:before:select-none [&_.line]:before:[counter-increment:line] [&_.line]:before:content-[counter(line)]'
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

onBeforeUnmount(() => {
  if (copyTimer !== undefined) {
    clearTimeout(copyTimer)
  }
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
    { default: theme },
    ...languages
  ] = await Promise.all([
    import('shiki/core'),
    import('shiki/engine/javascript'),
    import('shiki/dist/themes/github-dark.mjs'),
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
    themes: [theme],
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
        theme: 'github-dark',
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

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
</script>
