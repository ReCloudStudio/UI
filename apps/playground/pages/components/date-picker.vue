<template>
  <div class="space-y-10">
    <DocPageHeader title="DatePicker 日期选择" description="适用于备份、事件和任务记录的单日期与日期范围筛选，采用稳定的 YYYY-MM-DD 值。" />

    <DocExample title="日期范围筛选" description="范围选择器内置快捷范围；日期禁用和边界由调用方以本地日期键控制。" :code="rcCode0">
      <div class="grid gap-4 sm:grid-cols-2">
        <DatePicker v-model="date" label="执行日期" min="2026-01-01" />
        <DateRangePicker v-model="range" label="事件时间范围" :presets="presets" />
      </div>
      <p class="mt-3 font-mono text-xs text-slate-500 dark:text-slate-400">日期：{{ date }} · 范围：{{ range?.start }} → {{ range?.end }}</p>
    </DocExample>

    <DocApiTable :rows="apiRows" />
    <DocPageNav name="date-picker" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DateRangeValue } from '@recloudstudio/ui'

const date = ref('2026-10-04')
const range = ref<DateRangeValue>({ start: '2026-09-28', end: '2026-10-04' })
const presets = [
  { label: '今天', value: { start: '2026-10-04', end: '2026-10-04' } },
  { label: '近 7 天', value: { start: '2026-09-28', end: '2026-10-04' } },
  { label: '本月', value: { start: '2026-10-01', end: '2026-10-04' } }
]

const rcCode0 = `<script setup lang="ts">
import { ref } from 'vue'
const date = ref('2026-10-04')
const range = ref({ start: '2026-09-28', end: '2026-10-04' })
<\/script>

<template>
  <DatePicker v-model="date" label="执行日期" min="2026-01-01" />
  <DateRangePicker v-model="range" label="事件时间范围" :presets="presets" />
<\/template>`

const apiRows = [
  { name: 'v-model', type: 'string', default: '—', description: 'DatePicker 绑定 YYYY-MM-DD 本地日期键。' },
  { name: 'v-model', type: '{ start: string; end: string }', default: '—', description: 'DateRangePicker 绑定起止日期键。' },
  { name: 'min / max', type: 'string', default: '—', description: '可选的 YYYY-MM-DD 可选日期边界。' },
  { name: 'disabled-dates', type: 'string[] | (date) => boolean', default: '—', description: '禁用指定日期或自定义禁用规则。' },
  { name: 'presets', type: '{ label, value }[]', default: '[]', description: 'DateRangePicker 中的快捷日期范围。' }
]
</script>
