<template>
  <span :class="spinnerClasses" role="status" aria-label="加载中">
    <svg class="animate-spin" viewBox="0 0 24 24" fill="none" :width="px" :height="px">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" />
      <path class="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils/cn'

export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  class?: string
}

const props = withDefaults(defineProps<SpinnerProps>(), {
  size: 'md',
  class: ''
})

const sizeMap: Record<NonNullable<SpinnerProps['size']>, string> = {
  xs: '0.875rem',
  sm: '1rem',
  md: '1.25rem',
  lg: '1.75rem'
}

const px = computed(() => sizeMap[props.size])

const spinnerClasses = computed(() => {
  return cn('inline-flex items-center justify-center text-slate-400 dark:text-slate-500', props.class)
})
</script>
