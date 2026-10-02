<template>
  <AccordionRoot
    v-if="props.type === 'multiple'"
    :model-value="(props.modelValue as string[])"
    type="multiple"
    :collapsible="true"
    :disabled="props.disabled"
    :class="cn('w-full', props.class)"
    @update:model-value="$emit('update:modelValue', $event as string[])"
  >
    <AccordionItem
      v-for="item in props.items"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
      class="border-b border-slate-200 dark:border-slate-800 last:border-b-0"
    >
      <AccordionHeader class="flex">
        <AccordionTrigger class="group flex flex-1 cursor-pointer select-none items-center justify-between gap-3 py-3.5 text-left text-sm font-medium text-slate-900 outline-none transition-colors hover:text-[#2563EB] focus-visible:text-[#2563EB] dark:text-slate-100 dark:hover:text-[#70ACFE] disabled:cursor-not-allowed disabled:opacity-50">
          {{ item.title }}
          <svg class="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent class="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
        <div class="pb-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {{ item.content }}
        </div>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
  <AccordionRoot
    v-else
    :model-value="(props.modelValue as string)"
    type="single"
    :collapsible="props.collapsible"
    :disabled="props.disabled"
    :class="cn('w-full', props.class)"
    @update:model-value="$emit('update:modelValue', $event as string)"
  >
    <AccordionItem
      v-for="item in props.items"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
      class="border-b border-slate-200 dark:border-slate-800 last:border-b-0"
    >
      <AccordionHeader class="flex">
        <AccordionTrigger class="group flex flex-1 cursor-pointer select-none items-center justify-between gap-3 py-3.5 text-left text-sm font-medium text-slate-900 outline-none transition-colors hover:text-[#2563EB] focus-visible:text-[#2563EB] dark:text-slate-100 dark:hover:text-[#70ACFE] disabled:cursor-not-allowed disabled:opacity-50">
          {{ item.title }}
          <svg class="h-4 w-4 shrink-0 text-slate-400 transition-transform duration-200 group-data-[state=open]:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent class="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
        <div class="pb-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
          {{ item.content }}
        </div>
      </AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>

<script setup lang="ts">
import {
  AccordionRoot,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent
} from 'reka-ui'
import { cn } from '../../utils/cn'

export interface AccordionItemData {
  value: string
  title: string
  content?: string
  disabled?: boolean
}

export interface AccordionProps {
  items: AccordionItemData[]
  modelValue?: string | string[]
  type?: 'single' | 'multiple'
  collapsible?: boolean
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<AccordionProps>(), {
  modelValue: undefined,
  type: 'single',
  collapsible: true,
  disabled: false,
  class: ''
})

defineEmits<{
  (e: 'update:modelValue', value: string | string[]): void
}>()
</script>
