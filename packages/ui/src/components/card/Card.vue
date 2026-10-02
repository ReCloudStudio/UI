<template>
  <div :class="cardClasses">
    <div
      v-if="accent"
      class="h-1 w-full bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"
    />
    <div
      v-if="$slots.header || title"
      class="px-5 py-4 flex items-center justify-between"
    >
      <slot name="header">
        <div>
          <h3 v-if="title" class="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            {{ title }}
          </h3>
          <p v-if="description" class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {{ description }}
          </p>
        </div>
        <slot name="action" />
      </slot>
    </div>

    <div :class="bodyClasses">
      <slot />
    </div>

    <div
      v-if="$slots.footer"
      class="px-5 py-3.5 bg-slate-50/50 dark:bg-slate-900/50"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils/cn'

export interface CardProps {
  title?: string
  description?: string
  variant?: 'outline' | 'soft' | 'subtle'
  accent?: boolean
  hoverable?: boolean
  padding?: 'none' | 'sm' | 'md' | 'lg'
  class?: string
}

const props = withDefaults(defineProps<CardProps>(), {
  title: '',
  description: '',
  variant: 'outline',
  accent: false,
  hoverable: false,
  padding: 'md',
  class: ''
})

const variantClasses: Record<NonNullable<CardProps['variant']>, string> = {
  outline: 'bg-white dark:bg-[#0F172A] ring-1 ring-inset ring-slate-200 dark:ring-slate-800 divide-y divide-slate-100 dark:divide-slate-800 shadow-xs',
  soft: 'bg-slate-50 dark:bg-slate-900/80 divide-y divide-slate-200/50 dark:divide-slate-800/80',
  subtle: 'bg-slate-50/60 dark:bg-slate-900/40 ring-1 ring-inset ring-slate-200/60 dark:ring-slate-800/60 divide-y divide-slate-200/40 dark:divide-slate-800/50'
}

const paddingClasses: Record<NonNullable<CardProps['padding']>, string> = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6'
}

const cardClasses = computed(() => {
  return cn(
    'relative rounded-xl overflow-hidden transition-all duration-150',
    variantClasses[props.variant],
    props.hoverable && 'hover:ring-slate-300 dark:hover:ring-slate-700 hover:shadow-sm cursor-pointer',
    props.class
  )
})

const bodyClasses = computed(() => {
  return cn(paddingClasses[props.padding])
})
</script>
