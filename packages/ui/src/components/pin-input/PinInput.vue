<template>
  <PinInputRoot
    :model-value="modelValue"
    :type="type"
    :mask="mask"
    :otp="otp"
    :disabled="disabled"
    class="flex items-center gap-1.5"
    :class="props.class"
    @update:model-value="onUpdate($event as (string | number | undefined)[])"
  >
    <PinInputInput
      v-for="(id, index) in inputs"
      :key="id"
      :index="index"
      class="h-11 w-10 rounded-lg bg-white text-center text-sm font-semibold tracking-wide text-slate-900 shadow-xs outline-none ring-1 ring-inset ring-slate-300 transition-all placeholder:text-slate-300 focus:ring-2 focus:ring-[#2563EB] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#0F172A] dark:text-slate-100 dark:ring-slate-700 dark:focus:ring-[#70ACFE]"
    />
  </PinInputRoot>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { PinInputRoot, PinInputInput } from 'reka-ui'

export interface PinInputProps {
  modelValue?: string[]
  length?: number
  otp?: boolean
  mask?: boolean
  type?: 'text' | 'number'
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<PinInputProps>(), {
  modelValue: () => [],
  length: 0,
  otp: false,
  mask: false,
  type: 'number',
  disabled: false,
  class: ''
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void
}>()

function onUpdate(value: (string | number | undefined)[]) {
  emit('update:modelValue', value.map((v) => (v == null ? '' : String(v))))
}

const inputs = computed(() => {
  const total = props.length > 0 ? props.length : props.otp ? 6 : 4
  return Array.from({ length: total }, (_, i) => `pin-${i}`)
})
</script>
