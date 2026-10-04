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
          <div v-if="presets.length" class="mb-3 flex flex-wrap gap-1 border-b border-slate-100 pb-3 dark:border-slate-800">
            <button v-for="preset in presets" :key="preset.label" type="button" class="rounded-md px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:text-slate-300 dark:hover:bg-slate-800" @click="applyPreset(preset.value)">{{ preset.label }}</button>
          </div>
          <div class="mb-3 flex items-center justify-between">
            <button type="button" class="grid h-8 w-8 place-items-center rounded-md text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800" aria-label="上个月" @click="visibleMonth = addMonths(visibleMonth, -1)">‹</button>
            <span class="text-sm font-semibold text-slate-800 dark:text-slate-100">{{ monthLabel }}</span>
            <button type="button" class="grid h-8 w-8 place-items-center rounded-md text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800" aria-label="下个月" @click="visibleMonth = addMonths(visibleMonth, 1)">›</button>
          </div>
          <div class="mb-1 grid grid-cols-7 text-center text-[11px] font-medium text-slate-400 dark:text-slate-500"><span v-for="day in weekdays" :key="day">{{ day }}</span></div>
          <div role="grid" :aria-label="monthLabel" class="grid grid-cols-7 gap-0.5">
            <button v-for="day in days" :key="day.key" type="button" role="gridcell" :disabled="isDisabled(day.key)" :aria-selected="isSelected(day.key)" :class="dayClasses(day)" @click="selectDay(day.key)">{{ day.date.getDate() }}</button>
          </div>
          <p v-if="pendingStart" class="mt-3 text-center text-xs text-slate-500 dark:text-slate-400">已选择开始日期，请选择结束日期。</p>
        </PopoverContent>
      </PopoverPortal>
    </PopoverRoot>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { PopoverContent, PopoverPortal, PopoverRoot, PopoverTrigger } from 'reka-ui'
import { addMonths, compareDateKeys, formatDate, monthDays, parseDateKey, toDateKey, type DateRangeValue } from './dateUtils'
import { cn } from '../../utils/cn'

export interface DateRangePreset { label: string; value: DateRangeValue }
export interface DateRangePickerProps {
  modelValue?: DateRangeValue | undefined
  placeholder?: string
  label?: string
  min?: string
  max?: string
  disabledDates?: string[] | ((date: string) => boolean)
  presets?: DateRangePreset[]
  disabled?: boolean
  class?: string
}

const props = withDefaults(defineProps<DateRangePickerProps>(), { modelValue: undefined, placeholder: '选择日期范围', label: '', min: '', max: '', disabledDates: undefined, presets: () => [], disabled: false, class: '' })
const emit = defineEmits<{ (event: 'update:modelValue', value: DateRangeValue | undefined): void }>()
const open = ref(false)
const pendingStart = ref<string>()
const visibleMonth = ref(parseDateKey(props.modelValue?.start) ?? new Date())
const weekdays = ['一', '二', '三', '四', '五', '六', '日']
const days = computed(() => monthDays(visibleMonth.value))
const monthLabel = computed(() => new Intl.DateTimeFormat(undefined, { year: 'numeric', month: 'long' }).format(visibleMonth.value))
const displayValue = computed(() => props.modelValue ? `${formatDate(props.modelValue.start)} — ${formatDate(props.modelValue.end)}` : '')

watch(() => props.modelValue?.start, (value) => { const parsed = parseDateKey(value); if (parsed) visibleMonth.value = parsed })

function isDisabled(date: string) {
  if (props.min && date < props.min) return true
  if (props.max && date > props.max) return true
  return Array.isArray(props.disabledDates) ? props.disabledDates.includes(date) : props.disabledDates?.(date) ?? false
}
function isSelected(date: string) { return Boolean(props.modelValue && date >= props.modelValue.start && date <= props.modelValue.end) }
function selectDay(date: string) {
  if (isDisabled(date)) return
  if (!pendingStart.value) { pendingStart.value = date; return }
  const [start, end] = compareDateKeys(pendingStart.value, date) <= 0 ? [pendingStart.value, date] : [date, pendingStart.value]
  emit('update:modelValue', { start, end })
  pendingStart.value = undefined
  open.value = false
}
function applyPreset(value: DateRangeValue) { emit('update:modelValue', value); pendingStart.value = undefined; open.value = false }
function dayClasses(day: { key: string; outside: boolean }) {
  const selected = isSelected(day.key)
  return cn('grid h-9 place-items-center rounded-md text-sm transition-colors disabled:pointer-events-none disabled:opacity-35', day.outside ? 'text-slate-400 dark:text-slate-600' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800', selected && 'rounded-none bg-blue-50 text-[#1D4ED8] dark:bg-blue-950/60 dark:text-[#93C5FD]', (props.modelValue?.start === day.key || props.modelValue?.end === day.key) && 'rounded-md bg-[#2563EB] font-medium text-white dark:bg-[#70ACFE] dark:text-slate-950', day.key === toDateKey(new Date()) && !selected && 'font-semibold text-[#2563EB] dark:text-[#70ACFE]')
}
</script>
