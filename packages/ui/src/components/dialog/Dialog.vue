<template>
  <DialogRoot :open="open" @update:open="$emit('update:open', $event)">
    <slot name="trigger" />
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogContent :class="contentClasses">
        <div v-if="title || $slots.header" class="mb-3">
          <slot name="header">
            <DialogTitle v-if="title" class="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              {{ title }}
            </DialogTitle>
            <DialogDescription v-if="description" class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              {{ description }}
            </DialogDescription>
          </slot>
        </div>

        <div class="py-1">
          <slot />
        </div>

        <div v-if="$slots.footer" class="mt-5 flex justify-end gap-2.5">
          <slot name="footer" />
        </div>

        <DialogClose class="absolute right-3.5 top-3.5 rounded-md p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:text-slate-500 dark:hover:text-slate-300 dark:hover:bg-slate-800 transition-colors">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from 'reka-ui'
import { cn } from '../../utils/cn'

export interface DialogProps {
  open?: boolean
  title?: string
  description?: string
  class?: string
}

const props = withDefaults(defineProps<DialogProps>(), {
  open: false,
  title: '',
  description: '',
  class: ''
})

defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const contentClasses = computed(() => {
  return cn(
    'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl ring-1 ring-inset ring-slate-200 dark:ring-slate-800 bg-white dark:bg-[#0F172A] p-6 shadow-xl duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    props.class
  )
})
</script>
