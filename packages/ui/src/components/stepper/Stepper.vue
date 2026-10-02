<template>
  <StepperRoot
    :model-value="props.modelValue"
    :orientation="props.orientation"
    :linear="props.linear"
    :class="cn('w-full', props.orientation === 'vertical' ? 'flex flex-col gap-6' : 'flex w-full items-start justify-between gap-2', props.class)"
    @update:model-value="$emit('update:modelValue', Number($event))"
  >
    <StepperItem
      v-for="(step, idx) in props.steps"
      :key="step.step"
      :step="step.step"
      :completed="step.completed ?? step.step < props.modelValue"
      :disabled="step.disabled"
      :class="cn('group flex flex-1 gap-3 outline-none', props.orientation === 'vertical' ? 'flex-col !flex-initial' : 'flex-col items-center')"
    >
      <div :class="cn('flex w-full items-center gap-3', props.orientation === 'horizontal' ? 'flex-row' : 'flex-row')">
        <StepperTrigger class="flex cursor-pointer select-none items-center gap-3 rounded-lg p-1 outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] disabled:cursor-not-allowed">
          <StepperIndicator
            :class="cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ring-1 ring-inset',
              'ring-slate-200 bg-white text-slate-400 dark:ring-slate-700 dark:bg-slate-900 dark:text-slate-500',
              'group-data-[state=active]:bg-[#2563EB] group-data-[state=active]:text-white group-data-[state=active]:ring-[#2563EB] dark:group-data-[state=active]:bg-[#70ACFE] dark:group-data-[state=active]:text-slate-950 dark:group-data-[state=active]:ring-[#70ACFE]',
              'group-data-[state=completed]:bg-emerald-500 group-data-[state=completed]:text-white group-data-[state=completed]:ring-emerald-500'
            )"
          >
            <svg v-if="step.step < props.modelValue || step.completed" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
            <span v-else>{{ idx + 1 }}</span>
          </StepperIndicator>
          <StepperTitle class="text-sm font-medium text-slate-900 dark:text-slate-100">
            {{ step.title }}
          </StepperTitle>
        </StepperTrigger>
        <StepperSeparator
          v-if="idx < props.steps.length - 1 && props.orientation !== 'vertical'"
          class="mx-2 h-0.5 flex-1 rounded-full bg-slate-200 group-data-[state=completed]:bg-emerald-500 dark:bg-slate-700"
        />
      </div>
      <StepperDescription v-if="step.description" class="pl-11 text-sm text-slate-500 dark:text-slate-400">
        {{ step.description }}
      </StepperDescription>
    </StepperItem>
  </StepperRoot>
</template>

<script setup lang="ts">
import {
  StepperRoot,
  StepperItem,
  StepperTrigger,
  StepperIndicator,
  StepperTitle,
  StepperDescription,
  StepperSeparator
} from 'reka-ui'
import { cn } from '../../utils/cn'

export interface StepData {
  step: number
  title: string
  description?: string
  completed?: boolean
  disabled?: boolean
}

export interface StepperProps {
  steps: StepData[]
  modelValue?: number
  orientation?: 'horizontal' | 'vertical'
  linear?: boolean
  class?: string
}

const props = withDefaults(defineProps<StepperProps>(), {
  modelValue: 1,
  orientation: 'horizontal',
  linear: true,
  class: ''
})

defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()
</script>
