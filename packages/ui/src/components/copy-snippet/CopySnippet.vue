<template>
  <div :class="snippetClasses">
    <!-- Header tabs when multiple commands are provided -->
    <div
      v-if="hasTabs"
      class="flex items-center gap-1 border-b border-border bg-muted/60 px-2 py-1 text-xs"
    >
      <button
        v-for="(item, index) in commands"
        :key="item.label"
        type="button"
        :class="cn(
          'rounded px-2.5 py-1 font-medium transition-colors',
          activeTabIndex === index
            ? 'bg-card text-foreground shadow-xs'
            : 'text-muted-foreground hover:text-foreground'
        )"
        @click="activeTabIndex = index"
      >
        {{ item.label }}
      </button>
    </div>

    <!-- Command line and copy button -->
    <div class="flex items-center justify-between gap-3 px-3 py-2">
      <div class="flex min-w-0 flex-1 items-center gap-2 font-mono text-xs text-foreground">
        <span
          v-if="effectivePrefix"
          class="select-none font-semibold text-muted-foreground"
          aria-hidden="true"
        >
          {{ effectivePrefix }}
        </span>
        <code class="truncate select-all text-foreground">
          {{ activeCommandText }}
        </code>
      </div>

      <button
        v-if="copyable"
        type="button"
        class="inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        :aria-label="copied ? '已复制' : '复制命令'"
        @click="copyCommand"
      >
        <svg
          v-if="!copied"
          class="h-3.5 w-3.5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        <svg
          v-else
          class="h-3.5 w-3.5 text-emerald-500 dark:text-emerald-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="m5 13 4 4L19 7" />
        </svg>
        <span>{{ copied ? '已复制' : '复制' }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '../../utils/cn'
import type { CopySnippetProps } from './types'

const props = withDefaults(defineProps<CopySnippetProps>(), {
  command: '',
  commands: () => [],
  prefix: '$',
  variant: 'subtle',
  copyable: true,
  class: ''
})

const activeTabIndex = ref(0)
const copied = ref(false)

const hasTabs = computed(() => props.commands.length > 1)

const activeCommandItem = computed(() => {
  if (props.commands.length > 0) {
    return props.commands[activeTabIndex.value] || props.commands[0]
  }
  return null
})

const activeCommandText = computed(() => {
  if (activeCommandItem.value) {
    return activeCommandItem.value.command
  }
  return props.command
})

const effectivePrefix = computed(() => {
  if (activeCommandItem.value && activeCommandItem.value.prefix !== undefined) {
    return activeCommandItem.value.prefix
  }
  return props.prefix
})

const variantClasses: Record<NonNullable<CopySnippetProps['variant']>, string> = {
  subtle: 'bg-muted/50 ring-1 ring-inset ring-border',
  outline: 'bg-card ring-1 ring-inset ring-border shadow-xs',
  ghost: 'bg-transparent border border-dashed border-border'
}

const snippetClasses = computed(() => {
  return cn(
    'relative overflow-hidden rounded-xl transition-colors',
    variantClasses[props.variant],
    props.class
  )
})

async function copyCommand() {
  const text = activeCommandText.value
  if (!text) return
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // fallback
  }
}
</script>
