<template>
  <Field :id="id" :label="label" :hint="hint" :error="error" :required="required">
    <template #default="field">
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      :id="field.id"
      :aria-describedby="field.describedby"
      :aria-invalid="field.invalid || undefined"
      :rows="rows"
      :class="textareaClasses"
      @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
    </template>
  </Field>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Field from '../field/Field.vue'
import { cn } from '../../utils/cn'

export interface TextareaProps {
  modelValue?: string
  placeholder?: string
  id?: string
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
  id: undefined,
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
