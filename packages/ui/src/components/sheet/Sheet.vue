<template>
  <DialogRoot :open="props.open" @update:open="$emit('update:open', $event)">
    <DialogTrigger v-if="$slots.trigger" as-child><slot name="trigger" /></DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogContent :class="contentClasses" :style="{ '--sheet-size': props.size }">
        <div v-if="title || description || $slots.header" class="shrink-0 border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <slot name="header">
            <DialogTitle v-if="title" class="pr-8 text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">{{ title }}</DialogTitle>
            <DialogDescription v-if="description" class="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{{ description }}</DialogDescription>
          </slot>
        </div>

        <div class="min-h-0 grow overflow-y-auto px-5 py-5"><slot /></div>

        <div v-if="$slots.footer" class="shrink-0 border-t border-slate-200 px-5 py-4 dark:border-slate-800"><slot name="footer" /></div>

        <DialogClose aria-label="关闭" class="absolute top-3.5 right-3.5 rounded-md p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-300">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogRoot, DialogTitle, DialogTrigger } from 'reka-ui'
import { cn } from '../../utils/cn'

export interface SheetProps {
  open?: boolean
  side?: 'left' | 'right' | 'top' | 'bottom'
  /** CSS size value; width for left/right and height for top/bottom. */
  size?: string
  title?: string
  description?: string
  class?: string
}

const props = withDefaults(defineProps<SheetProps>(), {
  open: undefined,
  side: 'right',
  size: '28rem',
  title: '',
  description: '',
  class: ''
})

defineEmits<{
  (event: 'update:open', value: boolean): void
}>()

const contentClasses = computed(() => {
  const position = {
    right: 'top-0 right-0 h-dvh w-[var(--sheet-size)] data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
    left: 'top-0 left-0 h-dvh w-[var(--sheet-size)] data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
    top: 'top-0 left-0 h-[var(--sheet-size)] w-full data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
    bottom: 'bottom-0 left-0 h-[var(--sheet-size)] w-full data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom'
  }[props.side]

  return cn(
    'fixed z-50 flex max-w-full flex-col bg-white shadow-2xl outline-none ring-1 ring-slate-200 dark:bg-[#0F172A] dark:ring-slate-800 data-[state=open]:animate-in data-[state=closed]:animate-out',
    position,
    props.class
  )
})
</script>
