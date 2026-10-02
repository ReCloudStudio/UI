<template>
  <ScrollAreaRoot :class="cn('relative overflow-hidden', props.class)" :style="{ '--scrollbar-size': '8px' }">
    <ScrollAreaViewport class="h-full w-full rounded-[inherit]" :style="{ maxHeight: props.maxHeight }">
      <slot />
    </ScrollAreaViewport>
    <ScrollAreaScrollbar orientation="vertical" class="flex w-1.5 touch-none select-none col-start-2 row-start-1 h-full py-1.5">
      <ScrollAreaThumb class="relative flex-1 rounded-full bg-slate-300 dark:bg-slate-600" />
    </ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>

<script setup lang="ts">
import { ScrollAreaRoot, ScrollAreaViewport, ScrollAreaScrollbar, ScrollAreaThumb, ScrollAreaCorner } from 'reka-ui'
import { cn } from '../../utils/cn'

export interface ScrollAreaProps {
  maxHeight?: string
  class?: string
}

const props = withDefaults(defineProps<ScrollAreaProps>(), {
  maxHeight: '18rem',
  class: ''
})
</script>
