<template>
  <div :class="fieldClasses">
    <label v-if="label" :for="id" class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
      {{ label }}
      <span v-if="required" class="text-red-500" aria-hidden="true">*</span>
    </label>
    <slot :id="id" :describedby="describedby" :invalid="invalid" />
    <p v-if="error" :id="errorId" class="mt-1.5 text-sm text-red-600 dark:text-red-400">
      {{ error }}
    </p>
    <p v-else-if="hint" :id="hintId" class="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'
import { cn } from '../../utils/cn'

export interface FieldProps {
  id?: string
  label?: string
  hint?: string
  error?: string
  required?: boolean
  class?: string
}

const props = withDefaults(defineProps<FieldProps>(), {
  id: undefined,
  label: '',
  hint: '',
  error: '',
  required: false,
  class: ''
})

const generatedId = useId()
const id = computed(() => props.id || `field-${generatedId}`)
const hintId = computed(() => `${id.value}-hint`)
const errorId = computed(() => `${id.value}-error`)
const describedby = computed(() => (props.error ? errorId.value : props.hint ? hintId.value : undefined))
const invalid = computed(() => Boolean(props.error))
const fieldClasses = computed(() => cn('w-full', props.class))
</script>
