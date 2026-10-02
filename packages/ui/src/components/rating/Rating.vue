<template>
  <RatingRoot
    v-slot="{ modelValue: rating }"
    :model-value="modelValue"
    :length="length"
    :readonly="readonly"
    class="inline-flex items-center gap-0.5"
    :class="props.class"
    @update:model-value="$emit('update:modelValue', $event as number)"
  >
    <RatingItem
      v-for="item in items"
      :key="item.item"
      :item="item.item"
      class="relative"
      :class="props.readonly ? 'cursor-default' : 'cursor-pointer'"
    >
      <span
        class="block text-slate-200 dark:text-slate-700"
        v-html="starSvg"
      />
      <RatingItemIndicator
        :step="item.item"
        class="absolute inset-0 block overflow-hidden"
        :class="starColorClass"
        :style="{ width: `${((rating ?? 0) - (item.item - 1)) * 100}%` }"
      >
        <span v-html="starSvg" />
      </RatingItemIndicator>
    </RatingItem>
  </RatingRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RatingRoot, RatingItem, RatingItemIndicator } from 'reka-ui'

export interface RatingProps {
  modelValue?: number
  length?: number
  size?: 'sm' | 'md' | 'lg'
  color?: 'primary' | 'warning' | 'neutral'
  readonly?: boolean
  class?: string
}

const props = withDefaults(defineProps<RatingProps>(), {
  modelValue: 0,
  length: 5,
  size: 'md',
  color: 'primary',
  readonly: false,
  class: ''
})

defineEmits<{
  (e: 'update:modelValue', value: number): void
}>()

const items = computed(() =>
  Array.from({ length: props.length }, (_, i) => ({ item: i + 1 }))
)

const starSize = computed(() => (props.size === 'sm' ? 14 : props.size === 'lg' ? 24 : 18))

const starSvg = computed(
  () =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="${starSize.value}" height="${starSize.value}" viewBox="0 0 24 24" fill="currentColor" class="pointer-events-none block"><path d="M11.48 3.5c.18-.46.86-.46 1.04 0l2.34 5.9c.09.23.3.38.55.41l6.13.76c.48.06.67.65.31.97l-4.57 4.28c-.19.17-.27.43-.21.67l1.29 6.03c.1.48-.41.85-.85.6l-5.4-3.1a.7.7 0 0 0-.68 0l-5.4 3.1c-.44.25-.95-.12-.85-.6l1.29-6.03c.06-.24-.02-.5-.21-.67L3.47 11.5c-.36-.32-.17-.91.31-.97l6.13-.76c.25-.03.46-.18.55-.41l1.02-5.86Z"/></svg>`
)

const starColorClass = computed(() => {
  if (props.color === 'warning') return 'text-amber-500 dark:text-amber-400'
  if (props.color === 'neutral') return 'text-slate-500 dark:text-slate-400'
  return 'text-[#2563EB] dark:text-[#70ACFE]'
})
</script>
