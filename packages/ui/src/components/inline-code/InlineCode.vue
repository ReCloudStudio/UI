<template>
  <span
    :class="[
      'inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono text-[0.875em] transition-colors',
      variantClasses,
      copyable ? 'cursor-pointer select-none hover:bg-slate-200/80 dark:hover:bg-slate-700/80' : '',
      props.class
    ]"
    :role="copyable ? 'button' : undefined"
    :tabindex="copyable ? 0 : undefined"
    :aria-label="copyable ? (copied ? '已复制' : '点击复制代码') : undefined"
    @click="copyable && handleCopy()"
    @keydown.enter.prevent="copyable && handleCopy()"
    @keydown.space.prevent="copyable && handleCopy()"
  >
    <slot>{{ code }}</slot>
    <span v-if="copyable" class="inline-flex shrink-0 items-center opacity-70">
      <svg v-if="copied" class="h-3 w-3 text-emerald-600 dark:text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
      </svg>
      <svg v-else class="h-3 w-3 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
      </svg>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import type { InlineCodeProps } from './types'

const props = withDefaults(defineProps<InlineCodeProps>(), {
  code: '',
  copyable: false,
  variant: 'subtle',
  class: ''
})

const slots = useSlots()
const copied = ref(false)

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'solid':
      return 'bg-slate-900 text-slate-100 dark:bg-slate-100 dark:text-slate-900'
    case 'outline':
      return 'border border-slate-300 bg-transparent text-slate-800 dark:border-slate-700 dark:text-slate-200'
    case 'subtle':
    default:
      return 'border border-slate-200/80 bg-slate-100/80 text-[#1D4ED8] dark:border-slate-800 dark:bg-slate-800/80 dark:text-[#70ACFE]'
  }
})

function getTextToCopy(): string {
  if (props.code) return props.code
  const defaultSlot = slots.default?.()
  if (!defaultSlot || defaultSlot.length === 0) return ''
  return defaultSlot.map((v) => (typeof v.children === 'string' ? v.children : '')).join('')
}

async function handleCopy() {
  const text = getTextToCopy()
  if (!text) return
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 1800)
  } catch {
    // clipboard failure fallback
  }
}
</script>
