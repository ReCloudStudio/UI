<template>
  <SliderRoot
    :model-value="modelArray"
    :min="min"
    :max="max"
    :step="step"
    :orientation="orientation"
    :disabled="disabled"
    class="relative flex w-full touch-none select-none items-center data-[orientation=vertical]:h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-center"
    :class="props.class"
    @update:model-value="onSlide"
  >
    <span v-if="props.label" class="sr-only">{{ props.label }}</span>
    <SliderTrack class="relative grow overflow-hidden rounded-full bg-slate-200 data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5 dark:bg-slate-700">
      <SliderRange class="absolute rounded-full bg-[#2563EB] data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full dark:bg-[#70ACFE]" />
    </SliderTrack>
    <SliderThumb
      v-for="(_, index) in thumbs"
      :key="index"
      class="block size-4 shrink-0 rounded-full border-2 border-[#2563EB] bg-white shadow-sm transition-colors focus-visible:outline-3 focus-visible:outline-[#2563EB]/25 dark:border-[#70ACFE] dark:bg-slate-950"
    />
  </SliderRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { SliderRoot, SliderTrack, SliderRange, SliderThumb } from 'reka-ui'

export interface SliderProps {
  modelValue?: number | number[]
  min?: number
  max?: number
  step?: number
  orientation?: 'horizontal' | 'vertical'
  disabled?: boolean
  label?: string
  class?: string
}

const props = withDefaults(defineProps<SliderProps>(), {
  modelValue: 50,
  min: 0,
  max: 100,
  step: 1,
  orientation: 'horizontal',
  disabled: false,
  label: '',
  class: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | number[]): void
}>()

const thumbs = computed(() =>
  Array.isArray(props.modelValue) ? props.modelValue : [props.modelValue]
)

const modelArray = computed(() =>
  Array.isArray(props.modelValue) ? [...props.modelValue] : [props.modelValue as number]
)

function onSlide(value: number[] | undefined) {
  const next = value ?? []
  if (Array.isArray(props.modelValue)) emit('update:modelValue', next)
  else emit('update:modelValue', next[0] ?? props.min)
}
</script>
