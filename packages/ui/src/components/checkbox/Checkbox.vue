<template>
  <label class="inline-flex items-center gap-2.5 cursor-pointer select-none">
    <CheckboxRoot
      :model-value="props.modelValue"
      :disabled="props.disabled"
      :class="rootClasses"
      @update:model-value="emit('update:modelValue', $event === true)"
    >
      <CheckboxIndicator class="flex items-center justify-center text-white">
        <svg class="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </CheckboxIndicator>
    </CheckboxRoot>
    <span v-if="label || $slots.default" class="text-sm font-medium text-slate-700 dark:text-slate-200">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { CheckboxRoot, CheckboxIndicator } from 'reka-ui'
import { cn } from '../../utils/cn'

export interface CheckboxProps {
  modelValue?: boolean
  label?: string
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  label: '',
  disabled: false,
  class: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const rootClasses = computed(() => {
  return cn(
    'peer h-4 w-4 shrink-0 rounded ring-1 ring-inset focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#090E17] disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
    props.modelValue
      ? 'bg-[#2563EB] ring-[#2563EB] text-white'
      : 'bg-white dark:bg-[#0F172A] ring-slate-300 dark:ring-slate-700',
    props.class
  )
})
</script>
