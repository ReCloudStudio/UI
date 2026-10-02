<template>
  <div class="w-full">
    <label v-if="label" class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :rows="rows"
      :class="textareaClasses"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
    <p v-if="error" class="text-xs text-red-500 dark:text-red-400 mt-1.5">
      {{ error }}
    </p>
    <p v-else-if="hint" class="text-xs text-slate-500 dark:text-slate-400 mt-1.5">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils/cn'

export interface TextareaProps {
  modelValue?: string
  placeholder?: string
  label?: string
  hint?: string
  error?: string
  rows?: number
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  class?: string
}

const props = withDefaults(defineProps<TextareaProps>(), {
  modelValue: '',
  placeholder: '',
  label: '',
  hint: '',
  error: '',
  rows: 4,
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

const textareaClasses = computed(() => {
  return cn(
    'w-full rounded-lg bg-white dark:bg-[#0F172A] p-3 text-sm text-slate-900 dark:text-slate-100 transition-all duration-150 outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500 disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-900/60 ring-1 ring-inset resize-y shadow-xs',
    props.error
      ? 'ring-red-500 focus:ring-2 focus:ring-red-500'
      : 'ring-slate-300 dark:ring-slate-700 focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#70ACFE]',
    props.class
  )
})
</script>
