<template>
  <ToolbarRoot
    :orientation="orientation"
    class="inline-flex items-center gap-1 rounded-xl bg-slate-100/80 p-1 ring-1 ring-inset ring-slate-200 data-[orientation=vertical]:flex-col dark:bg-slate-800/60 dark:ring-slate-700"
    :class="props.class"
  >
    <slot />
  </ToolbarRoot>
</template>

<script setup lang="ts">
import { ToolbarRoot } from 'reka-ui'

export interface ToolbarProps {
  orientation?: 'horizontal' | 'vertical'
  class?: string
}

const props = withDefaults(defineProps<ToolbarProps>(), {
  orientation: 'horizontal',
  class: ''
})
</script>
