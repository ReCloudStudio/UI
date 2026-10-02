<template>
  <div class="w-full">
    <label v-if="label" class="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
      {{ label }}
    </label>
    <SelectRoot
      :model-value="modelValue"
      :disabled="disabled"
      @update:model-value="$emit('update:modelValue', $event)"
    >
      <SelectTrigger :class="triggerClasses">
        <SelectValue :placeholder="placeholder" />
        <SelectIcon class="text-slate-400 dark:text-slate-500">
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </SelectIcon>
      </SelectTrigger>

      <SelectPortal>
        <SelectContent
          position="popper"
          :side-offset="4"
          class="z-50 min-w-[8rem] overflow-hidden rounded-lg bg-white dark:bg-[#0F172A] text-slate-900 dark:text-slate-100 ring-1 ring-inset ring-slate-200 dark:ring-slate-800 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
        >
          <SelectViewport class="p-1">
            <SelectItem
              v-for="opt in options"
              :key="opt.value"
              :value="opt.value"
              :disabled="opt.disabled"
              class="relative flex w-full cursor-pointer select-none items-center rounded-md py-1.5 pl-3 pr-8 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-slate-100 dark:focus:bg-slate-800"
            >
              <SelectItemText>{{ opt.label }}</SelectItemText>
              <SelectItemIndicator class="absolute right-2 flex items-center justify-center text-[#2563EB] dark:text-[#70ACFE]">
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </SelectItemIndicator>
            </SelectItem>
          </SelectViewport>
        </SelectContent>
      </SelectPortal>
    </SelectRoot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectIcon,
  SelectPortal,
  SelectContent,
  SelectViewport,
  SelectItem,
  SelectItemText,
  SelectItemIndicator
} from 'reka-ui'
import { cn } from '../../utils/cn'

export interface SelectOption {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps {
  modelValue?: string
  options: SelectOption[]
  placeholder?: string
  label?: string
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<SelectProps>(), {
  modelValue: '',
  placeholder: '请选择...',
  label: '',
  disabled: false,
  class: ''
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const triggerClasses = computed(() => {
  return cn(
    'flex h-9 w-full items-center justify-between rounded-lg bg-white dark:bg-[#0F172A] px-3 py-1.5 text-sm text-slate-900 dark:text-slate-100 ring-1 ring-inset ring-slate-300 dark:ring-slate-700 shadow-xs transition-all focus:outline-none focus:ring-2 focus:ring-[#2563EB] dark:focus:ring-[#70ACFE] disabled:cursor-not-allowed disabled:opacity-50',
    props.class
  )
})
</script>
