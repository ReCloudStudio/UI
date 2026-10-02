<template>
  <div class="w-full">
    <label v-if="label" class="block text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative flex items-center">
      <div v-if="$slots.leading" class="absolute left-3 text-slate-400 dark:text-slate-500 pointer-events-none flex items-center">
        <slot name="leading" />
      </div>
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :class="inputClasses"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      <div v-if="$slots.trailing" class="absolute right-3 text-slate-400 dark:text-slate-500 flex items-center">
        <slot name="trailing" />
      </div>
    </div>
    <p v-if="error" class="text-sm text-red-600 dark:text-red-400 mt-2">
      {{ error }}
    </p>
    <p v-else-if="hint" class="text-sm text-slate-500 dark:text-slate-400 mt-2">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { cn } from '../../utils/cn'

export interface InputProps {
  modelValue?: string | number
  type?: string
  placeholder?: string
  label?: string
  hint?: string
  error?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  class?: string
}

const props = withDefaults(defineProps<InputProps>(), {
  modelValue: '',
  type: 'text',
  placeholder: '',
  label: '',
  hint: '',
  error: '',
  size: 'md',
  disabled: false,
  readonly: false,
  required: false,
  class: ''
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}>()

const slots = useSlots()

const sizeClasses: Record<NonNullable<InputProps['size']>, string> = {
  sm: 'h-9 text-sm px-3',
  md: 'h-10 text-sm px-3.5',
  lg: 'h-11 text-base px-4'
}

const inputClasses = computed(() => {
  return cn(
    'w-full rounded-lg bg-white dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 transition-all duration-150 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-900/60 ring-1 ring-inset shadow-xs',
    sizeClasses[props.size],
    slots.leading ? 'pl-9' : '',
    slots.trailing ? 'pr-9' : '',
    props.error
      ? 'ring-red-500 focus:ring-2 focus:ring-red-500'
      : 'ring-slate-300 dark:ring-slate-700 focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#70ACFE]',
    props.class
  )
})
</script>
