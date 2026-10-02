<template>
  <CollapsibleRoot
    :open="props.open"
    :disabled="props.disabled"
    :class="cn('w-full rounded-lg bg-slate-50/70 ring-1 ring-inset ring-slate-200/70 dark:bg-slate-900/50 dark:ring-slate-800/70', props.class)"
    @update:open="$emit('update:open', $event)"
  >
    <CollapsibleTrigger class="flex w-full cursor-pointer select-none items-center justify-between gap-3 rounded-lg px-4 py-3 text-sm font-medium text-slate-900 outline-none transition-colors hover:bg-slate-100/70 focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:text-slate-100 dark:hover:bg-slate-800/60 disabled:cursor-not-allowed disabled:opacity-50">
      <span class="flex items-center gap-2">
        <svg v-if="!props.open" class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5-5 5M6 7l5 5-5 5" /></svg>
        <svg v-else class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4L3 9m5 5l5-5m-5 5V4" transform="rotate(90 12 12)" /></svg>
        <slot name="title">{{ props.title }}</slot>
      </span>
      <slot name="trigger-extra" />
    </CollapsibleTrigger>
    <CollapsibleContent class="overflow-hidden border-t border-slate-200/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 dark:border-slate-800/70">
      <div class="px-4 py-3.5 text-sm leading-6 text-slate-600 dark:text-slate-400">
        <slot />
      </div>
    </CollapsibleContent>
  </CollapsibleRoot>
</template>

<script setup lang="ts">
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from 'reka-ui'
import { cn } from '../../utils/cn'

export interface CollapsiblePanelProps {
  open?: boolean
  title?: string
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<CollapsiblePanelProps>(), {
  open: false,
  title: '',
  disabled: false,
  class: ''
})

defineEmits<{
  (e: 'update:open', value: boolean): void
}>()
</script>
