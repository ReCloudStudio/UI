<template>
  <label class="inline-flex items-center gap-2.5 cursor-pointer select-none">
    <SwitchRoot
      :model-value="props.modelValue"
      :disabled="props.disabled"
      :class="rootClasses"
      @update:model-value="emit('update:modelValue', $event as boolean)"
    >
      <SwitchThumb :class="thumbClasses" />
    </SwitchRoot>
    <span v-if="props.label || $slots.default" class="text-sm font-medium text-slate-700 dark:text-slate-200">
      <slot>{{ props.label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SwitchRoot, SwitchThumb } from 'reka-ui'
import { cn } from '../../utils/cn'

export interface SwitchProps {
  modelValue?: boolean
  label?: string
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  class?: string
}

const props = withDefaults(defineProps<SwitchProps>(), {
  modelValue: false,
  label: '',
  disabled: false,
  size: 'md',
  class: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const SIZE = {
  sm: { track: 'h-4 w-7', thumb: 'size-3', offset: 'translate-x-3' },
  md: { track: 'h-5 w-9', thumb: 'size-4', offset: 'translate-x-4' },
  lg: { track: 'h-6 w-11', thumb: 'size-5', offset: 'translate-x-5' }
} as const

const rootClasses = computed(() => {
  return cn(
    'relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#090E17] disabled:cursor-not-allowed disabled:opacity-50',
    SIZE[props.size].track,
    props.modelValue
      ? 'bg-[#2563EB]'
      : 'bg-slate-200 dark:bg-slate-700',
    props.class
  )
})

const thumbClasses = computed(() => {
  return cn(
    'pointer-events-none block rounded-full bg-white shadow-xs ring-0 transition-transform duration-200 ease-in-out',
    SIZE[props.size].thumb,
    props.modelValue ? SIZE[props.size].offset : 'translate-x-0'
  )
})
</script>
