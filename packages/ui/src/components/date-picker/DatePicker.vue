<template>
  <div class="w-full" :class="props.class">
    <label v-if="label" class="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-200">{{ label }}</label>
    <PopoverRoot v-model:open="open">
      <PopoverTrigger as-child>
        <button type="button" :disabled="disabled" class="flex h-10 w-full items-center gap-2 rounded-lg bg-white px-3.5 text-left text-sm text-slate-900 shadow-xs ring-1 ring-inset ring-slate-300 transition-all hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] disabled:cursor-not-allowed disabled:opacity-50 dark:bg-[#0F172A] dark:text-slate-100 dark:ring-slate-700 dark:hover:bg-slate-900 dark:focus-visible:ring-[#70ACFE]">
          <svg class="h-4 w-4 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 11h18" /></svg>
          <span :class="displayValue ? '' : 'text-slate-400 dark:text-slate-500'">{{ displayValue || placeholder }}</span>
        </button>
      </PopoverTrigger>
      <PopoverPortal>
        <PopoverContent side="bottom" align="start" :side-offset="6" class="z-50 w-[19rem] rounded-xl bg-white p-3 shadow-xl ring-1 ring-slate-200 outline-none dark:bg-[#0F172A] dark:ring-slate-800">
          <div class="mb-3 flex items-center justify-between">
            <button type="button" class="grid h-8 w-8 place-items-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100" aria-label="上个月" @click="visibleMonth = addMonths(visibleMonth, -1)">‹</button>
            <span class="text-sm font-semibold text-slate-800 dark:text-slate-100">{{ monthLabel }}</span>
            <button type="button" class="grid h-8 w-8 place-items-center rounded-md text-slate-500 hover:bg-slate-100 hover:text-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100" aria-label="下个月" @click="visibleMonth = addMonths(visibleMonth, 1)">›</button>
          </div>
          <div class="mb-1 grid grid-cols-7 text-center text-[11px] font-medium text-slate-400 dark:text-slate-500"><span v-for="day in weekdays" :key="day">{{ day }}</span></div>
          <div role="grid" :aria-label="monthLabel" class="grid grid-cols-7 gap-0.5">
            <button v-for="day in days" :key="day.key" type="button" role="gridcell" :disabled="isDisabled(day.key)" :aria-selected="modelValue === day.key" :class="dayClasses(day)" @click="selectDay(day.key)">{{ day.date.getDate() }}</button>
          </div>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import { addMonths, formatDate, monthDays, parseDateKey, toDateKey } from './dateUtils'
import { cn } from '../../utils/cn'

export interface DatePickerProps {
  modelValue?: string
  placeholder?: string
  label?: string
  min?: string
  max?: string
  disabledDates?: string[] | ((date: string) => boolean)
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<DatePickerProps>(), { modelValue: '', placeholder: '选择日期', label: '', min: '', max: '', disabledDates: undefined, disabled: false, class: '' })
const emit = defineEmits<{ (event: 'update:modelValue', value: string): void }>()
const open = ref(false)
const visibleMonth = ref(parseDateKey(props.modelValue) ?? new Date())
const weekdays = ['一', '二', '三', '四', '五', '六', '日']
const days = computed(() => monthDays(visibleMonth.value))
const monthLabel = computed(() => new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long' }).format(visibleMonth.value))
const displayValue = computed(() => formatDate(props.modelValue))

watch(() => props.modelValue, (value) => {
  const parsed = parseDateKey(value)
  if (parsed) visibleMonth.value = parsed
})

function isDisabled(date: string) {
  if (props.min && date < props.min) return true
  if (props.max && date > props.max) return true
  return Array.isArray(props.disabledDates) ? props.disabledDates.includes(date) : props.disabledDates?.(date) ?? false
}

function selectDay(date: string) {
  if (isDisabled(date)) return
  emit('update:modelValue', date)
  open.value = false
}

function dayClasses(day: { key: string; outside: boolean }) {
  return cn(
    'grid h-9 place-items-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] disabled:pointer-events-none disabled:opacity-35 dark:focus-visible:ring-[#70ACFE]',
    day.outside ? 'text-slate-400 dark:text-slate-600' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800',
    day.key === toDateKey(new Date()) && 'font-semibold text-[#2563EB] dark:text-[#70ACFE]',
    props.modelValue === day.key && 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] dark:bg-[#70ACFE] dark:text-slate-950 dark:hover:bg-[#70ACFE]'
  )
}
</script>
