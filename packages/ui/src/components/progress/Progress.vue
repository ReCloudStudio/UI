<template>
  <div class="space-y-1.5">
    <div v-if="label || showValue" class="flex items-center justify-between gap-4 text-sm">
      <span v-if="label" class="font-medium text-slate-700 dark:text-slate-200">{{ label }}</span>
      <span v-if="showValue" class="tabular-nums text-slate-500 dark:text-slate-400">{{ normalizedValue }}%</span>
    </div>
    <div
      :class="cn('relative overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800', sizeClasses, props.class)"
      role="progressbar"
      :aria-label="label"
      aria-valuemin="0"
      :aria-valuemax="max"
      :aria-valuenow="value"
    >
      <div :class="cn('h-full rounded-full transition-[width] duration-300 ease-out', colorClasses)" :style="{ width: `${normalizedValue}%` }" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils/cn'

export interface ProgressProps {
  value?: number
  max?: number
  label?: string
  showValue?: boolean
  color?: 'primary' | 'success' | 'warning' | 'error' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

const props = withDefaults(defineProps<ProgressProps>(), {
  value: 0,
  max: 100,
  label: '',
  showValue: false,
  color: 'primary',
  size: 'md',
  class: ''
})

const normalizedValue = computed(() => Math.round(Math.min(Math.max((props.value / props.max) * 100, 0), 100)))

const sizeClasses = computed(() => ({ sm: 'h-1.5', md: 'h-2', lg: 'h-3' }[props.size]))
const colorClasses = computed(() => ({
  primary: 'bg-[#2563EB] dark:bg-[#70ACFE]',
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  error: 'bg-red-500',
  neutral: 'bg-slate-500 dark:bg-slate-400'
}[props.color]))
</script>
