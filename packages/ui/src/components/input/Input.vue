<template>
  <Field :id="id" :label="label" :hint="hint" :error="error" :required="required">
    <template #default="field">
    <div :class="inputClasses">
      <div v-if="$slots.leading" class="pointer-events-none flex shrink-0 items-center font-medium text-slate-500 dark:text-slate-400">
        <slot name="leading" />
      </div>
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :id="field.id"
        :aria-describedby="field.describedby"
        :aria-invalid="field.invalid || undefined"
        :class="controlClasses"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @focus="$emit('focus', $event)"
        @blur="$emit('blur', $event)"
      />
      <div v-if="$slots.trailing" class="flex shrink-0 items-center font-medium text-slate-500 dark:text-slate-400">
        <slot name="trailing" />
      </div>
    </div>
    </template>
  </Field>
</template>

<script setup lang="ts">
import { computed, useSlots } from 'vue'
import Field from '../field/Field.vue'
import { cn } from '../../utils/cn'

export interface InputProps {
  modelValue?: string | number
  type?: string
  id?: string
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
  id: undefined,
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
  sm: 'h-9 px-3 text-sm',
  md: 'h-10 px-3.5 text-sm',
  lg: 'h-11 px-4 text-base'
}

const inputClasses = computed(() => {
  return cn(
    'flex w-full items-center gap-2 rounded-lg bg-white text-slate-900 shadow-xs ring-1 ring-inset transition-all duration-150 focus-within:ring-2 dark:bg-[#0F172A] dark:text-slate-100 disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-900/60',
    sizeClasses[props.size],
    props.error
      ? 'ring-red-500 focus-within:ring-red-500'
      : 'ring-slate-300 focus-within:ring-[#2563EB] dark:ring-slate-700 dark:focus-within:ring-[#70ACFE]',
    props.class
  )
})

const controlClasses = computed(() => cn(
  'min-w-0 flex-1 bg-transparent outline-none placeholder:text-slate-400 disabled:cursor-not-allowed dark:placeholder:text-slate-500'
))
</script>
