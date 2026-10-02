<template>
  <kbd :class="kbdClasses">
    <slot />
  </kbd>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils/cn'

export interface KbdProps {
  size?: 'xs' | 'sm' | 'md'
  class?: string
}

const props = withDefaults(defineProps<KbdProps>(), {
  size: 'sm',
  class: ''
})

const sizeClasses: Record<NonNullable<KbdProps['size']>, string> = {
  xs: 'h-4 min-w-4 px-1 text-[10px]',
  sm: 'h-5 min-w-5 px-1.5 text-xs',
  md: 'h-6 min-w-6 px-2 text-xs'
}

const kbdClasses = computed(() => {
  return cn(
    'inline-flex items-center justify-center rounded border border-slate-200/80 bg-slate-50 font-mono font-medium text-slate-600 shadow-[0_1px_0_0_rgba(148,163,184,0.25)] dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:shadow-[0_1px_0_0_rgba(15,23,42,0.8)]',
    sizeClasses[props.size],
    props.class
  )
})
</script>
