<template>
  <span :class="badgeClasses">
    <span
      v-if="dot"
      :class="['h-1.5 w-1.5 rounded-full shrink-0', dotClasses]"
    />
    <slot name="leading" />
    <slot />
    <slot name="trailing" />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils/cn'

export interface BadgeProps {
  variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'brand' | 'secondary' | 'success' | 'warning' | 'destructive'
  color?: 'primary' | 'neutral' | 'success' | 'warning' | 'error'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  dot?: boolean
  class?: string
}

const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'soft',
  color: 'primary',
  size: 'sm',
  dot: false,
  class: ''
})

// 向后兼容
const effectiveVariant = computed(() => {
  if (props.variant === 'brand') return 'soft'
  if (props.variant === 'secondary') return 'subtle'
  if (props.variant === 'destructive') return 'soft'
  return props.variant
})

const effectiveColor = computed(() => {
  if (props.variant === 'destructive') return 'error'
  if (props.variant === 'secondary') return 'neutral'
  return props.color
})

const variantClasses = computed(() => {
  const v = effectiveVariant.value
  const c = effectiveColor.value

  if (v === 'solid') {
    if (c === 'neutral') return 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
    if (c === 'success') return 'bg-emerald-600 text-white'
    if (c === 'warning') return 'bg-amber-500 text-white'
    if (c === 'error') return 'bg-red-600 text-white'
    return 'bg-[#2563EB] text-white'
  }

  if (v === 'outline') {
    if (c === 'neutral') return 'ring-1 ring-inset ring-slate-300 dark:ring-slate-700 text-slate-700 dark:text-slate-300 bg-transparent'
    if (c === 'success') return 'ring-1 ring-inset ring-emerald-300 dark:ring-emerald-800 text-emerald-700 dark:text-emerald-400 bg-transparent'
    if (c === 'warning') return 'ring-1 ring-inset ring-amber-300 dark:ring-amber-800 text-amber-700 dark:text-amber-400 bg-transparent'
    if (c === 'error') return 'ring-1 ring-inset ring-red-300 dark:ring-red-800 text-red-700 dark:text-red-400 bg-transparent'
    return 'ring-1 ring-inset ring-blue-300 dark:ring-blue-800 text-[#2563EB] dark:text-[#70ACFE] bg-transparent'
  }

  if (v === 'soft') {
    if (c === 'neutral') return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
    if (c === 'success') return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
    if (c === 'warning') return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400'
    if (c === 'error') return 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-400'
    return 'bg-blue-50 text-[#1E63CE] dark:bg-blue-950/60 dark:text-[#70ACFE]'
  }

  // subtle (soft background + delicate border ring)
  if (c === 'neutral') return 'bg-slate-50 text-slate-700 ring-1 ring-inset ring-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:ring-slate-800'
  if (c === 'success') return 'bg-emerald-50/70 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-900/60'
  if (c === 'warning') return 'bg-amber-50/70 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-900/60'
  if (c === 'error') return 'bg-red-50/70 text-red-700 ring-1 ring-inset ring-red-200 dark:bg-red-950/40 dark:text-red-400 dark:ring-red-900/60'
  return 'bg-blue-50/70 text-[#1E63CE] ring-1 ring-inset ring-blue-200 dark:bg-blue-950/40 dark:text-[#70ACFE] dark:ring-blue-900/60'
})

const dotColors = computed(() => {
  const c = effectiveColor.value
  if (c === 'neutral') return 'bg-slate-500'
  if (c === 'success') return 'bg-emerald-500 animate-pulse'
  if (c === 'warning') return 'bg-amber-500'
  if (c === 'error') return 'bg-red-500'
  return 'bg-[#2563EB] dark:bg-[#70ACFE]'
})

const sizeClasses: Record<NonNullable<BadgeProps['size']>, string> = {
  xs: 'text-[10px] px-1.5 py-0.5 gap-1 font-medium',
  sm: 'text-xs px-2 py-0.5 gap-1.5 font-medium',
  md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
  lg: 'text-sm px-3 py-1 gap-2 font-medium'
}

const badgeClasses = computed(() => {
  return cn(
    'inline-flex items-center rounded-full select-none transition-colors tracking-tight',
    variantClasses.value,
    sizeClasses[props.size],
    props.class
  )
})

const dotClasses = computed(() => dotColors.value)
</script>
