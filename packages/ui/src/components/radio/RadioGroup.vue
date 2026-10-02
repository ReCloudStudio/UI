<template>
  <div :class="cn('space-y-2.5', props.class)">
    <span v-if="props.label" class="block text-sm font-medium text-slate-700 dark:text-slate-300">
      {{ props.label }}
    </span>
    <RadioGroupRoot
      :model-value="props.modelValue"
      :disabled="props.disabled"
      :orientation="props.orientation"
      :class="props.orientation === 'horizontal' ? 'flex flex-wrap items-center gap-5' : 'space-y-2.5'"
      @update:model-value="$emit('update:modelValue', $event as string)"
    >
      <label
        v-for="opt in props.options"
        :key="opt.value"
        :class="cn('flex cursor-pointer select-none items-start gap-2.5', props.orientation === 'horizontal' ? 'items-center' : '', opt.disabled ? 'pointer-events-none opacity-50' : '')"
      >
        <RadioGroupItem
          :value="opt.value"
          :disabled="opt.disabled"
          class="relative grid h-4 w-4 shrink-0 cursor-pointer place-items-center rounded-full border border-slate-300 bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 dark:border-slate-600 dark:bg-slate-900 dark:focus-visible:ring-offset-[#090E17] data-[state=checked]:border-[#2563EB] dark:data-[state=checked]:border-[#70ACFE]"
        >
          <RadioGroupIndicator class="flex items-center justify-center">
            <span class="h-2 w-2 rounded-full bg-[#2563EB] dark:bg-[#70ACFE]" />
          </RadioGroupIndicator>
        </RadioGroupItem>
        <span class="min-w-0">
          <span class="block text-sm text-slate-700 dark:text-slate-200">{{ opt.label }}</span>
          <span v-if="opt.description" class="block text-sm text-slate-500 dark:text-slate-400">{{ opt.description }}</span>
        </span>
      </label>
    </RadioGroupRoot>
  </div>
</template>

<script setup lang="ts">
import { RadioGroupRoot, RadioGroupItem, RadioGroupIndicator } from 'reka-ui'
import { cn } from '../../utils/cn'

export interface RadioOption {
  label: string
  value: string
  description?: string
  disabled?: boolean
}

export interface RadioGroupProps {
  modelValue?: string
  options: RadioOption[]
  label?: string
  disabled?: boolean
  orientation?: 'horizontal' | 'vertical'
  class?: string
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: '',
  label: '',
  disabled: false,
  orientation: 'vertical',
  class: ''
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
