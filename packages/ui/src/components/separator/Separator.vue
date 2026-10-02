<template>
  <div :class="cn('shrink-0 bg-slate-200 dark:bg-slate-800', props.orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px', props.class)" :role="props.decorative ? undefined : 'separator'" :aria-orientation="props.decorative ? undefined : props.orientation" />
</template>

<script setup lang="ts">
import { cn } from '../../utils/cn'

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  class?: string
}

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
  decorative: true,
  class: ''
})
</script>
