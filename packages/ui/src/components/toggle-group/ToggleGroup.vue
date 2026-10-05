<template>
  <ToggleGroupRoot
    :model-value="props.modelValue"
    type="single"
    :disabled="props.disabled"
    :roving-focus="true"
    :class="groupClasses"
    @update:model-value="$emit('update:modelValue', ($event as string) ?? '')"
  >
    <ToggleGroupItem
      v-for="opt in props.options"
      :key="opt.value"
      :value="opt.value"
      :disabled="opt.disabled"
      :title="opt.label"
      class="relative inline-flex h-10 flex-1 select-none items-center justify-center gap-1.5 rounded-md px-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] disabled:cursor-not-allowed disabled:opacity-50 data-[state=on]:bg-white data-[state=on]:text-slate-900 data-[state=on]:shadow-xs dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200 dark:data-[state=on]:bg-slate-800 dark:data-[state=on]:text-white"
    >
      <Icon :icon="opt.icon" v-if="opt.icon" size="1rem" />
      <span>{{ opt.label }}</span>
    </ToggleGroupItem>
  </ToggleGroupRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ToggleGroupRoot, ToggleGroupItem } from 'reka-ui'
import { Icon, type IconSource } from '../icon'
import { cn } from '../../utils/cn'

export interface ToggleGroupOption {
  label: string
  value: string
  icon?: IconSource
  disabled?: boolean
}

export interface ToggleGroupProps {
  modelValue?: string
  options: ToggleGroupOption[]
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<ToggleGroupProps>(), {
  modelValue: '',
  disabled: false,
  class: ''
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const groupClasses = computed(() => {
  return cn(
    'inline-flex w-full items-center justify-center gap-1 rounded-lg bg-slate-100/80 dark:bg-slate-800/80 ring-1 ring-inset ring-slate-200/60 dark:ring-slate-700/60 p-1 disabled:opacity-50',
    props.class
  )
})
</script>
