<template>
  <div
    :class="cardClasses"
  >
    <div class="flex items-center justify-between gap-2">
      <div class="truncate text-xs font-medium text-muted-foreground">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="$slots.icon || $slots.action" class="flex items-center gap-1.5 shrink-0 text-muted-foreground">
        <slot name="icon" />
        <slot name="action" />
      </div>
    </div>

    <div v-if="loading" class="mt-3 space-y-2">
      <div class="h-7 w-28 animate-pulse rounded bg-muted" />
      <div class="h-4 w-40 animate-pulse rounded bg-muted/60" />
    </div>

    <div v-else class="mt-2 space-y-1">
      <div class="flex items-baseline gap-1.5">
        <span class="text-2xl font-semibold tracking-tight text-foreground rc-tabular-nums">
          <slot name="value">{{ value }}</slot>
        </span>
        <span v-if="unit" class="text-xs text-muted-foreground">
          <slot name="unit">{{ unit }}</slot>
        </span>
      </div>

      <div
        v-if="hasTrendInfo || description"
        class="flex flex-wrap items-center gap-1.5 text-xs"
      >
        <span
          v-if="hasTrendInfo"
          :class="trendColorClass"
          class="inline-flex items-center gap-0.5 font-medium rc-tabular-nums"
        >
          <svg
            v-if="trend === 'up'"
            class="h-3.5 w-3.5 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-else-if="trend === 'down'"
            class="h-3.5 w-3.5 shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96-4.158V3.75A.75.75 0 0110 3z"
              clip-rule="evenodd"
            />
          </svg>
          <slot name="delta">{{ delta }}</slot>
        </span>

        <span
          v-if="deltaDescription"
          class="text-muted-foreground"
        >
          {{ deltaDescription }}
        </span>

        <span
          v-else-if="description"
          class="text-muted-foreground"
        >
          {{ description }}
        </span>
      </div>
    </div>

    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils/cn'
import type { MetricCardProps } from './types'

const props = withDefaults(defineProps<MetricCardProps>(), {
  title: '',
  value: '',
  unit: '',
  delta: '',
  trend: undefined,
  deltaDescription: '',
  description: '',
  loading: false,
  hoverable: false,
  class: ''
})

const hasTrendInfo = computed(() => {
  return props.delta !== '' || props.trend !== undefined
})

const trendColorClass = computed(() => {
  if (props.trend === 'up') return 'text-emerald-600 dark:text-emerald-400'
  if (props.trend === 'down') return 'text-red-600 dark:text-red-400'
  return 'text-muted-foreground'
})

const cardClasses = computed(() => {
  return cn(
    'relative rounded-xl bg-card p-4 ring-1 ring-inset ring-border transition-all duration-150',
    props.hoverable && 'hover:ring-primary/40 hover:shadow-sm cursor-pointer',
    props.class
  )
})
</script>
