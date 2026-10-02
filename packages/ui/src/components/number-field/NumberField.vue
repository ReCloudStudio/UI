<template>
  <div class="w-full">
    <label
      v-if="props.label"
      class="mb-1.5 block text-xs font-medium text-slate-700 dark:text-slate-300"
    >
      {{ props.label }}
    </label>
    <NumberFieldRoot
      :model-value="modelValue"
      :min="min"
      :max="max"
      :step="step"
      :disabled="disabled"
      :readonly="readonly"
      class="flex h-10 w-full items-stretch overflow-hidden rounded-lg bg-white shadow-xs ring-1 ring-inset ring-slate-300 transition-all focus-within:ring-2 focus-within:ring-[#2563EB] dark:bg-[#0F172A] dark:ring-slate-700 dark:focus-within:ring-[#70ACFE] disabled:opacity-50"
      :class="[sizeClass, props.class]"
      @update:model-value="$emit('update:modelValue', $event as number)"
    >
      <NumberFieldDecrement
        class="flex w-10 shrink-0 items-center justify-center border-r border-slate-200 text-slate-500 transition-colors select-none hover:bg-slate-50 active:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/60"
        aria-label="减少"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M5 12h14" /></svg>
      </NumberFieldDecrement>
      <NumberFieldInput
        class="min-w-0 grow bg-transparent px-3 text-center text-sm text-slate-900 outline-none disabled:cursor-not-allowed dark:text-slate-100"
      />
      <NumberFieldIncrement
        class="flex w-10 shrink-0 items-center justify-center border-l border-slate-200 text-slate-500 transition-colors select-none hover:bg-slate-50 active:bg-slate-100 dark:border-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/60"
        aria-label="增加"
      >
        <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M12 5v14M5 12h14" /></svg>
      </NumberFieldIncrement>
    </NumberFieldRoot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  NumberFieldRoot,
  NumberFieldInput,
  NumberFieldDecrement,
  NumberFieldIncrement
} from 'reka-ui'
import { cn } from '../../utils/cn'

export interface NumberFieldProps {
  modelValue?: number
  label?: string
  min?: number
  max?: number
  step?: number
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  readonly?: boolean
  class?: string
}

const props = withDefaults(defineProps<NumberFieldProps>(), {
  modelValue: 0,
  label: '',
  min: undefined,
  max: undefined,
  step: 1,
  size: 'md',
  disabled: false,
  readonly: false,
  class: ''
})

defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const sizeClass = computed(() =>
  cn(
    props.size === 'sm' && 'h-9 text-sm',
    props.size === 'lg' && 'h-11 text-base'
  )
)
</script>
