<template>
  <ToggleRoot
    :model-value="props.modelValue"
    :disabled="props.disabled"
    :class="toggleClasses"
    @update:model-value="$emit('update:modelValue', $event === true)"
  >
    <slot />
  </ToggleRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Toggle as ToggleRoot } from 'reka-ui'
import { cn } from '../../utils/cn'

export interface ToggleProps {
  modelValue?: boolean
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

const props = withDefaults(defineProps<ToggleProps>(), {
  modelValue: false,
  disabled: false,
  size: 'md',
  class: ''
})

defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const sizeClasses: Record<NonNullable<ToggleProps['size']>, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-11 w-11'
}

const toggleClasses = computed(() => {
  return cn(
    'inline-flex shrink-0 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#090E17] disabled:cursor-not-allowed disabled:opacity-50 data-[state=on]:bg-slate-900 data-[state=on]:text-white dark:data-[state=on]:bg-slate-100 dark:data-[state=on]:text-slate-900',
    sizeClasses[props.size],
    props.class
  )
})
</script>
