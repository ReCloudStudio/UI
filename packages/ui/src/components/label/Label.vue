<template>
  <LabelRoot :for="props.for" :class="labelClasses">
    <slot />
    <span v-if="props.required" class="ml-0.5 text-red-500">*</span>
  </LabelRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Label as LabelRoot } from 'reka-ui'
import { cn } from '../../utils/cn'

export interface LabelProps {
  for?: string
  required?: boolean
  class?: string
}

const props = withDefaults(defineProps<LabelProps>(), {
  for: undefined,
  required: false,
  class: ''
})

const labelClasses = computed(() => {
  return cn(
    'block text-sm font-medium text-slate-700 dark:text-slate-300 select-none',
    props.class
  )
})
</script>
