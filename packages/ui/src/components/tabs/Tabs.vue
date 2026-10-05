<template>
  <TabsRoot
    :model-value="modelValue"
    :class="cn('w-full', props.class)"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <TabsList class="inline-flex h-9 items-center justify-start rounded-lg bg-slate-100 dark:bg-slate-800/80 p-1 ring-1 ring-inset ring-slate-200/50 dark:ring-slate-700/50">
      <TabsTrigger
        v-for="tab in items"
        :key="tab.value"
        :value="tab.value"
        :disabled="tab.disabled"
        class="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium text-slate-600 dark:text-slate-400 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white dark:data-[state=active]:bg-[#0F172A] data-[state=active]:text-slate-900 dark:data-[state=active]:text-slate-100 data-[state=active]:shadow-xs cursor-pointer select-none"
      >
        <Icon :icon="tab.icon" v-if="tab.icon" size="0.875rem" class="mr-1.5" />
        {{ tab.label }}
      </TabsTrigger>
    </TabsList>

    <slot />
  </TabsRoot>
</template>

<script setup lang="ts">
import {
  TabsRoot,
  TabsList,
  TabsTrigger
} from 'reka-ui'
import { Icon, type IconSource } from '../icon'
import { cn } from '../../utils/cn'

export interface TabItem {
  label: string
  value: string
  icon?: IconSource
  disabled?: boolean
}

export interface TabsProps {
  modelValue?: string
  items: TabItem[]
  class?: string
}

const props = withDefaults(defineProps<TabsProps>(), {
  modelValue: '',
  class: ''
})

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>
