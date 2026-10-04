<template>
  <div :class="cn('w-full overflow-x-auto rounded-xl ring-1 ring-inset ring-slate-200 dark:ring-slate-800 bg-white dark:bg-[#0F172A]', props.class)">
    <table class="w-full border-collapse text-left text-sm">
      <thead>
        <tr class="border-b border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/60">
          <th
            v-for="col in props.columns"
            :key="col.key"
            :class="cn('px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap', col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left')"
            :style="col.width ? { width: col.width } : undefined"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody :class="props.divide ? 'divide-y divide-slate-100 dark:divide-slate-800' : ''">
        <tr
          v-for="(row, idx) in props.rows"
          :key="idx"
          :class="cn('transition-colors', props.hoverable ? 'hover:bg-slate-50/70 dark:hover:bg-slate-900/40' : '')"
        >
          <td
            v-for="col in props.columns"
            :key="col.key"
            :class="cn('px-4 py-3 text-slate-700 dark:text-slate-300 align-middle', col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left')"
          >
            <slot v-if="col.slot" :name="`cell-${col.key}`" :row="row" :value="row[col.key]" />
            <span v-else class="whitespace-nowrap">{{ formatCell(row[col.key]) }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="!props.rows || props.rows.length === 0" class="px-4 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
      {{ props.emptyText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { cn } from '../../utils/cn'

export interface DataTableColumn {
  key: string
  label: string
  width?: string
  align?: 'left' | 'center' | 'right'
  slot?: boolean
}

export interface DataTableProps {
  columns?: DataTableColumn[]
  rows?: Record<string, any>[]
  hoverable?: boolean
  divide?: boolean
  emptyText?: string
  class?: string
}

const props = withDefaults(defineProps<DataTableProps>(), {
  columns: () => [],
  rows: () => [],
  hoverable: true,
  divide: true,
  emptyText: '暂无数据',
  class: ''
})

function formatCell(value: unknown) {
  if (value === null || value === undefined) return '-'
  return String(value)
}
</script>
