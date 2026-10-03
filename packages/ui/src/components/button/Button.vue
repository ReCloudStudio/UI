<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="$emit('click', $event)"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-0.5 mr-2 h-4 w-4 shrink-0"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
    <slot name="leading" />
    <slot />
    <slot name="trailing" />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils/cn'

export interface ButtonProps {
  variant?: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link' | 'primary' | 'secondary' | 'destructive'
  color?: 'primary' | 'neutral' | 'error' | 'warning' | 'success'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon'
  disabled?: boolean
  loading?: boolean
  block?: boolean
  type?: 'button' | 'submit' | 'reset'
  class?: string
}

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'solid',
  color: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  block: false,
  type: 'button',
  class: ''
})

defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

// 映射向后兼容的 legacy variant
const normalizedVariant = computed(() => {
  if (props.variant === 'primary') return 'solid'
  if (props.variant === 'secondary') return 'soft'
  if (props.variant === 'destructive') return 'solid'
  return props.variant
})

const effectiveColor = computed(() => {
  if (props.variant === 'destructive') return 'error'
  return props.color
})

const baseClasses = 'inline-flex items-center justify-center rounded-lg font-semibold tracking-[-0.01em] transition-all duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#090E17] disabled:opacity-50 disabled:pointer-events-none select-none active:scale-[0.98] cursor-pointer'

const variantColorClasses = computed(() => {
  const v = normalizedVariant.value
  const c = effectiveColor.value

  if (v === 'solid') {
    if (c === 'neutral') {
      return 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-xs'
    }
    if (c === 'error') {
      return 'bg-red-600 text-white hover:bg-red-700 shadow-xs'
    }
    if (c === 'warning') {
      return 'bg-amber-500 text-white hover:bg-amber-600 shadow-xs'
    }
    if (c === 'success') {
      return 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
    }
    // primary (ReCloud Studio signature)
    return 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] active:bg-[#1E40AF] shadow-xs'
  }

  if (v === 'outline') {
    if (c === 'neutral') {
      return 'bg-transparent ring-1 ring-inset ring-slate-300 dark:ring-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 shadow-xs'
    }
    if (c === 'error') {
      return 'bg-transparent ring-1 ring-inset ring-red-300 dark:ring-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30'
    }
    return 'bg-transparent ring-1 ring-inset ring-blue-300 dark:ring-blue-800/70 text-[#2563EB] dark:text-[#70ACFE] hover:bg-blue-50/60 dark:hover:bg-blue-950/30 shadow-xs'
  }

  if (v === 'soft') {
    if (c === 'neutral') {
      return 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:text-slate-200 dark:hover:bg-slate-700/80'
    }
    if (c === 'error') {
      return 'bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950/50 dark:text-red-400 dark:hover:bg-red-900/50'
    }
    return 'bg-blue-50 text-[#1E63CE] hover:bg-blue-100/80 dark:bg-blue-950/50 dark:text-[#70ACFE] dark:hover:bg-blue-900/50'
  }

  if (v === 'subtle') {
    if (c === 'neutral') {
      return 'bg-slate-50 text-slate-700 ring-1 ring-inset ring-slate-200/80 hover:bg-slate-100 dark:bg-slate-900/60 dark:text-slate-300 dark:ring-slate-800 dark:hover:bg-slate-800'
    }
    return 'bg-blue-50/70 text-[#1E63CE] ring-1 ring-inset ring-blue-200/60 hover:bg-blue-100/60 dark:bg-blue-950/30 dark:text-[#70ACFE] dark:ring-blue-900/40 dark:hover:bg-blue-900/40'
  }

  if (v === 'ghost') {
    if (c === 'neutral') {
      return 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/70'
    }
    if (c === 'error') {
      return 'bg-transparent text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40'
    }
    return 'bg-transparent text-[#2563EB] hover:bg-blue-50/70 dark:text-[#70ACFE] dark:hover:bg-blue-950/40'
  }

  if (v === 'link') {
    return 'bg-transparent text-[#2563EB] hover:underline p-0 h-auto dark:text-[#70ACFE]'
  }

  return ''
})

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  xs: 'h-7 px-2.5 text-xs gap-1',
  sm: 'h-8 px-3 text-sm gap-1.5',
  md: 'h-10 px-3.5 text-sm gap-2',
  lg: 'h-11 px-4 text-base gap-2',
  xl: 'h-12 px-5 text-base gap-2.5',
  icon: 'h-9 w-9 p-0 text-sm'
}

const buttonClasses = computed(() => {
  return cn(
    baseClasses,
    props.block && 'w-full',
    variantColorClasses.value,
    sizeClasses[props.size],
    props.class
  )
})
</script>
