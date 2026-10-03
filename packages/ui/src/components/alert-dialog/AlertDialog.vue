<template>
  <AlertDialogRoot v-model:open="open">
    <span class="contents" @click="open = true">
      <slot name="trigger" />
    </span>
    <AlertDialogPortal>
      <AlertDialogOverlay class="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-xs data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <AlertDialogContent
        :class="cn('fixed left-[50%] top-[50%] z-50 grid w-full max-w-md translate-x-[-50%] translate-y-[-50%] gap-4 rounded-xl ring-1 ring-inset ring-slate-200 dark:ring-slate-800 bg-white dark:bg-[#0F172A] p-6 shadow-xl duration-150 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95', props.class)"
      >
        <div class="space-y-1.5">
          <AlertDialogTitle class="text-base font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {{ props.title }}
          </AlertDialogTitle>
          <AlertDialogDescription class="text-sm leading-6 text-slate-500 dark:text-slate-400">
            {{ props.description }}
          </AlertDialogDescription>
        </div>
        <div class="flex justify-end gap-2.5">
          <AlertDialogCancel as-child>
            <button class="inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium text-slate-700 ring-1 ring-inset ring-slate-300 dark:text-slate-200 dark:ring-slate-700 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]">
              {{ props.cancelText }}
            </button>
          </AlertDialogCancel>
          <AlertDialogAction as-child>
            <button :class="actionClasses">
              {{ props.actionText }}
            </button>
          </AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  AlertDialogRoot, AlertDialogPortal, AlertDialogOverlay, AlertDialogContent,
  AlertDialogTitle, AlertDialogDescription, AlertDialogCancel, AlertDialogAction
} from 'reka-ui'
import { cn } from '../../utils/cn'

export interface AlertDialogProps {
  title?: string
  description?: string
  actionText?: string
  cancelText?: string
  destructive?: boolean
  class?: string
}

const props = withDefaults(defineProps<AlertDialogProps>(), {
  title: '',
  description: '',
  actionText: '确认',
  cancelText: '取消',
  destructive: false,
  class: ''
})

const open = defineModel<boolean>('open', { default: false })

const actionClasses = computed(() => {
  return cn(
    'inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-semibold text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0F172A]',
    props.destructive
      ? 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500'
      : 'bg-[#2563EB] hover:bg-[#1D4ED8] focus-visible:ring-[#2563EB]'
  )
})
</script>
