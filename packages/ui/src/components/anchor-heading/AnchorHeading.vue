<template>
  <component
    :is="as"
    :id="effectiveId"
    :class="[
      'group relative flex items-center scroll-mt-20 tracking-tight font-semibold text-slate-900 dark:text-slate-100',
      sizeClasses,
      props.class
    ]"
  >
    <a
      v-if="effectiveId"
      :href="`#${effectiveId}`"
      class="absolute -left-6 top-1/2 -translate-y-1/2 p-1 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none hover:text-[#2563EB] dark:hover:text-[#70ACFE]"
      :aria-label="docsLoc.copyLink"
      @click="handleClick"
    >
      <span class="font-mono text-base font-medium select-none">#</span>
    </a>
    <slot />
    <span
      v-if="justCopied"
      class="ml-2 inline-flex items-center rounded bg-emerald-500/10 px-1.5 py-0.5 text-xs font-normal text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
    >
      {{ docsLoc.copiedLink }}
    </span>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import { useComponentLocale } from '../../locale'
import type { AnchorHeadingProps } from './types'

const props = withDefaults(defineProps<AnchorHeadingProps>(), {
  as: 'h2',
  id: undefined,
  copyable: true,
  class: ''
})

const docsLoc = useComponentLocale('docs')
const slots = useSlots()
const justCopied = ref(false)

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const effectiveId = computed(() => {
  if (props.id) return props.id
  const defaultSlot = slots.default?.()
  if (!defaultSlot || defaultSlot.length === 0) return undefined
  const text = defaultSlot
    .map((vnode) => (typeof vnode.children === 'string' ? vnode.children : ''))
    .join('')
  return text ? slugify(text) : undefined
})

const sizeClasses = computed(() => {
  switch (props.as) {
    case 'h1':
      return 'text-2xl sm:text-3xl font-bold my-6'
    case 'h2':
      return 'text-xl sm:text-2xl font-semibold mt-10 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800'
    case 'h3':
      return 'text-lg sm:text-xl font-semibold mt-8 mb-3'
    case 'h4':
      return 'text-base font-semibold mt-6 mb-2'
    case 'h5':
    case 'h6':
      return 'text-sm font-semibold mt-4 mb-2'
    default:
      return 'text-xl font-semibold'
  }
})

async function handleClick(e: MouseEvent) {
  if (!props.copyable || !effectiveId.value) return
  if (typeof window !== 'undefined') {
    const url = new URL(window.location.href)
    url.hash = effectiveId.value
    try {
      await navigator.clipboard.writeText(url.toString())
      justCopied.value = true
      setTimeout(() => {
        justCopied.value = false
      }, 1600)
    } catch {
      // ignore
    }
  }
}
</script>
