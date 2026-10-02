<template>
  <div :class="bannerClasses">
    <div class="flex items-start gap-3">
      <div v-if="$slots.icon || variant" class="shrink-0 mt-0.5">
        <slot name="icon">
          <!-- Information icon -->
          <svg v-if="effectiveColor === 'primary'" class="w-4 h-4 text-[#2563EB] dark:text-[#70ACFE]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <!-- Success icon -->
          <svg v-else-if="effectiveColor === 'success'" class="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <!-- Warning icon -->
          <svg v-else-if="effectiveColor === 'warning'" class="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <!-- Error icon -->
          <svg v-else-if="effectiveColor === 'error'" class="w-4 h-4 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </slot>
      </div>
      <div class="flex-1 min-w-0">
        <h4 v-if="title" class="text-sm font-medium tracking-tight mb-0.5">
          {{ title }}
        </h4>
        <div class="text-xs leading-relaxed opacity-90">
          <slot>{{ description }}</slot>
        </div>
      </div>
      <div v-if="$slots.action" class="shrink-0 self-center">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils/cn'

export interface BannerProps {
  title?: string
  description?: string
  variant?: 'outline' | 'soft' | 'subtle' | 'info' | 'success' | 'warning' | 'destructive'
  color?: 'primary' | 'neutral' | 'success' | 'warning' | 'error'
  class?: string
}

const props = withDefaults(defineProps<BannerProps>(), {
  title: '',
  description: '',
  variant: 'outline',
  color: 'primary',
  class: ''
})

// 向后兼容
const effectiveColor = computed(() => {
  if (props.variant === 'info') return 'primary'
  if (props.variant === 'success') return 'success'
  if (props.variant === 'warning') return 'warning'
  if (props.variant === 'destructive') return 'error'
  return props.color
})

const colorStyles = computed(() => {
  const c = effectiveColor.value
  if (c === 'neutral') {
    return 'bg-slate-50 dark:bg-slate-900/60 ring-1 ring-inset ring-slate-200 dark:ring-slate-800 text-slate-800 dark:text-slate-200'
  }
  if (c === 'success') {
    return 'bg-emerald-50/70 dark:bg-emerald-950/40 ring-1 ring-inset ring-emerald-200 dark:ring-emerald-900/60 text-emerald-900 dark:text-emerald-200'
  }
  if (c === 'warning') {
    return 'bg-amber-50/70 dark:bg-amber-950/40 ring-1 ring-inset ring-amber-200 dark:ring-amber-900/60 text-amber-900 dark:text-amber-200'
  }
  if (c === 'error') {
    return 'bg-red-50/70 dark:bg-red-950/40 ring-1 ring-inset ring-red-200 dark:ring-red-900/60 text-red-900 dark:text-red-200'
  }
  return 'bg-blue-50/70 dark:bg-blue-950/40 ring-1 ring-inset ring-blue-200 dark:ring-blue-900/60 text-blue-950 dark:text-blue-100'
})

const bannerClasses = computed(() => {
  return cn(
    'relative w-full rounded-lg p-3.5 transition-colors shadow-xs',
    colorStyles.value,
    props.class
  )
})
</script>
