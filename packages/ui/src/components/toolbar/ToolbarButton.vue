<template>
  <ToolbarButton
    as-child
    class="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-slate-600 transition-colors hover:bg-slate-200/70 focus-visible:outline-3 focus-visible:outline-[#2563EB]/25 active:bg-slate-200 disabled:pointer-events-none disabled:opacity-50 dark:text-slate-300 dark:hover:bg-slate-700/70"
    :class="itemClasses"
  >
    <button type="button" :disabled="disabled">
      <slot />
    </button>
  </ToolbarButton>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ToolbarButton } from 'reka-ui'
import { cn } from '../../utils/cn'

export interface ToolbarButtonProps {
  size?: 'sm' | 'md'
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<ToolbarButtonProps>(), {
  size: 'md',
  disabled: false,
  class: ''
})

const itemClasses = computed(() =>
  cn(props.size === 'sm' ? 'size-7' : 'size-9', props.class)
)
</script>
