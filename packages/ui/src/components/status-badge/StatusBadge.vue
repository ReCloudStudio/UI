<template>
  <span :class="badgeClasses" :data-status="status">
    <span
      v-if="dot"
      :class="['shrink-0 rounded-full', dotSizeClass, dotColorClass, pulseClass]"
      aria-hidden="true"
    />
    <slot name="leading" />
    <slot>{{ effectiveLabel }}</slot>
    <slot name="trailing" />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils/cn'
import type {
  StatusBadgeProps,
  StatusBadgeSize,
  StatusBadgeTone,
  StatusBadgeVariant
} from './types'

const props = withDefaults(defineProps<StatusBadgeProps>(), {
  status: 'online',
  label: '',
  variant: 'subtle',
  size: 'sm',
  dot: true,
  pulse: undefined,
  class: ''
})

const defaultLabels: Record<StatusBadgeTone, string> = {
  online: 'Online',
  offline: 'Offline',
  degraded: 'Degraded',
  pending: 'Pending',
  info: 'Info',
  neutral: 'Unknown'
}

const effectiveLabel = computed(() => props.label || defaultLabels[props.status])

const sizeClasses: Record<StatusBadgeSize, string> = {
  xs: 'text-[10px] px-1.5 py-0.5 gap-1 font-medium',
  sm: 'text-xs px-2 py-0.5 gap-1.5 font-medium',
  md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
  lg: 'text-sm px-3 py-1 gap-2 font-medium'
}

const dotSizes: Record<StatusBadgeSize, string> = {
  xs: 'h-1.5 w-1.5',
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2 w-2'
}

const variantToneClasses: Record<StatusBadgeVariant, Record<StatusBadgeTone, string>> = {
  solid: {
    online: 'bg-emerald-600 text-white',
    offline: 'bg-red-600 text-white',
    degraded: 'bg-amber-500 text-white',
    pending: 'bg-primary text-primary-foreground',
    info: 'bg-sky-600 text-white',
    neutral: 'bg-muted-foreground text-background'
  },
  soft: {
    online: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
    offline: 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-400',
    degraded: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400',
    pending: 'bg-primary/10 text-primary',
    info: 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300',
    neutral: 'bg-muted text-muted-foreground'
  },
  outline: {
    online: 'bg-transparent ring-1 ring-inset ring-emerald-300 text-emerald-700 dark:ring-emerald-800 dark:text-emerald-400',
    offline: 'bg-transparent ring-1 ring-inset ring-red-300 text-red-700 dark:ring-red-800 dark:text-red-400',
    degraded: 'bg-transparent ring-1 ring-inset ring-amber-300 text-amber-700 dark:ring-amber-800 dark:text-amber-400',
    pending: 'bg-transparent ring-1 ring-inset ring-ring text-primary',
    info: 'bg-transparent ring-1 ring-inset ring-sky-300 text-sky-700 dark:ring-sky-800 dark:text-sky-300',
    neutral: 'bg-transparent ring-1 ring-inset ring-border text-muted-foreground'
  },
  subtle: {
    online: 'bg-emerald-50/70 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:ring-emerald-900/60',
    offline: 'bg-red-50/70 text-red-700 ring-1 ring-inset ring-red-200 dark:bg-red-950/40 dark:text-red-400 dark:ring-red-900/60',
    degraded: 'bg-amber-50/70 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-900/60',
    pending: 'bg-primary/10 text-primary ring-1 ring-inset ring-primary/20',
    info: 'bg-sky-50/70 text-sky-700 ring-1 ring-inset ring-sky-200 dark:bg-sky-950/40 dark:text-sky-300 dark:ring-sky-900/60',
    neutral: 'bg-card text-muted-foreground ring-1 ring-inset ring-border'
  }
}

const dotColors: Record<StatusBadgeTone, string> = {
  online: 'bg-emerald-500',
  offline: 'bg-red-500',
  degraded: 'bg-amber-500',
  pending: 'bg-primary',
  info: 'bg-sky-500',
  neutral: 'bg-muted-foreground'
}

const shouldPulse = computed(() => {
  if (typeof props.pulse === 'boolean') {
    return props.pulse
  }
  return props.status === 'online' || props.status === 'pending'
})

const dotSizeClass = computed(() => dotSizes[props.size])
const dotColorClass = computed(() => dotColors[props.status])
const pulseClass = computed(() => (shouldPulse.value ? 'animate-pulse' : ''))

const badgeClasses = computed(() => {
  return cn(
    'inline-flex items-center rounded-full select-none transition-colors tracking-tight',
    variantToneClasses[props.variant][props.status],
    sizeClasses[props.size],
    props.class
  )
})
</script>
