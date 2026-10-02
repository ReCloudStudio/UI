<template>
  <div
    class="fixed bottom-4 right-4 z-50 flex max-h-screen w-full max-w-sm flex-col gap-2.5 pointer-events-none p-4"
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    <transition-group
      enter-active-class="transition duration-200 ease-out transform"
      enter-from-class="translate-y-2 opacity-0 scale-95"
      enter-to-class="translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in transform"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-for="item in toasts"
        :key="item.id"
        :class="[
          'pointer-events-auto flex items-start gap-3 rounded-lg p-3.5 shadow-md ring-1 ring-inset backdrop-blur-md',
          getVariantClasses(item.variant)
        ]"
      >
        <div class="flex-1 min-w-0">
          <h5 v-if="item.title" class="text-xs font-semibold mb-0.5 tracking-tight">
            {{ item.title }}
          </h5>
          <p v-if="item.description" class="text-xs opacity-90 leading-relaxed">
            {{ item.description }}
          </p>
        </div>
        <button
          type="button"
          class="shrink-0 rounded-md p-1 opacity-60 hover:opacity-100 transition-opacity"
          :aria-label="`关闭${item.title ? `：${item.title}` : '通知'}`"
          @click="dismiss(item.id!)"
        >
          <svg class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToast, type ToastOptions } from './useToast'

const { toasts, dismiss } = useToast()

function getVariantClasses(variant: ToastOptions['variant']) {
  switch (variant) {
    case 'success':
      return 'bg-emerald-50/95 dark:bg-emerald-950/90 ring-emerald-200 dark:ring-emerald-800 text-emerald-900 dark:text-emerald-100'
    case 'warning':
      return 'bg-amber-50/95 dark:bg-amber-950/90 ring-amber-200 dark:ring-amber-800 text-amber-900 dark:text-amber-100'
    case 'destructive':
      return 'bg-red-50/95 dark:bg-red-950/90 ring-red-200 dark:ring-red-800 text-red-900 dark:text-red-100'
    case 'info':
    default:
      return 'bg-blue-50/95 dark:bg-blue-950/90 ring-blue-200 dark:ring-blue-800 text-blue-900 dark:text-blue-100'
  }
}
</script>
