<template>
  <div :class="cn('w-full overflow-hidden rounded-xl bg-white ring-1 ring-inset ring-slate-200 dark:bg-[#0F172A] dark:ring-slate-800', props.class)">
    <div v-if="$slots.toolbar" class="border-b border-slate-200 px-4 py-3 dark:border-slate-800"><slot name="toolbar" :selected="selectedRows" :clear-selection="clearSelection" /></div>
    <div class="overflow-x-auto">
      <table class="w-full border-collapse text-left text-sm">
        <thead><tr class="border-b border-slate-200 bg-slate-50/80 dark:border-slate-800 dark:bg-slate-900/60">
          <th v-if="selectable" class="w-11 px-4 py-2.5"><input type="checkbox" :checked="allPageSelected" :indeterminate="somePageSelected" :aria-label="tableLoc.selectAllAria" class="h-4 w-4 accent-[#2563EB]" @change="togglePageSelection" /></th>
          <th v-for="col in visibleColumns" :key="col.key" :style="col.width ? { width: col.width } : undefined" :class="cn('px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 whitespace-nowrap', alignClass(col.align))">
            <button v-if="col.sortable" type="button" class="inline-flex items-center gap-1 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:hover:text-slate-100" @click="toggleSort(col.key)">{{ col.label }}<span aria-hidden="true" class="text-slate-400">{{ sortIcon(col.key) }}</span></button>
            <span v-else>{{ col.label }}</span>
          </th>
        </tr></thead>
        <tbody v-if="!loading && !error && pagedRows.length" :class="props.divide ? 'divide-y divide-slate-100 dark:divide-slate-800' : ''">
          <tr v-for="(row, index) in pagedRows" :key="rowKey(row, index)" :class="cn('transition-colors', hoverable ? 'hover:bg-slate-50/70 dark:hover:bg-slate-900/40' : '', isSelected(row, index) && 'bg-blue-50/70 dark:bg-blue-950/20')">
            <td v-if="selectable" class="px-4 py-3"><input type="checkbox" :checked="isSelected(row, index)" :aria-label="tableLoc.selectRowAria(index + 1)" class="h-4 w-4 accent-[#2563EB]" @change="toggleRow(row, index)" /></td>
            <td v-for="col in visibleColumns" :key="col.key" :class="cn('px-4 py-3 align-middle text-slate-700 dark:text-slate-300', alignClass(col.align))"><slot v-if="col.slot" :name="`cell-${col.key}`" :row="row" :value="row[col.key]" :index="index" /><span v-else class="whitespace-nowrap">{{ formatCell(row[col.key]) }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="loading" class="space-y-3 p-4" :aria-label="commonLoc.loading" role="status"><div v-for="row in 4" :key="row" class="flex gap-4"><Skeleton v-for="column in visibleColumns.length + Number(selectable)" :key="column" height="1.5rem" /></div></div>
    <div v-else-if="error" class="p-4"><slot name="error"><EmptyState :title="emptyLoc.loadFailed" :description="error"><template #icon><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg></template></EmptyState></slot></div>
    <div v-else-if="!pagedRows.length" class="p-4"><slot name="empty"><EmptyState :title="effectiveEmptyText" /></slot></div>
    <div v-if="showPagination" class="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-3 dark:border-slate-800"><span class="text-xs text-slate-500 dark:text-slate-400">{{ paginationLoc.totalSummary(currentPage, pageCount, total) }}</span><div class="flex gap-1"><button :disabled="currentPage <= 1" class="inline-flex h-8 items-center justify-center rounded-lg px-3 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-40 dark:text-slate-300 dark:hover:bg-slate-800" @click="setPage(currentPage - 1)">{{ paginationLoc.prev }}</button><button :disabled="currentPage >= pageCount" class="inline-flex h-8 items-center justify-center rounded-lg px-3 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100 disabled:pointer-events-none disabled:opacity-40 dark:text-slate-300 dark:hover:bg-slate-800" @click="setPage(currentPage + 1)">{{ paginationLoc.next }}</button></div></div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, unknown>">
import { computed } from 'vue'
import EmptyState from '../empty/EmptyState.vue'
import Skeleton from '../skeleton/Skeleton.vue'
import { cn } from '../../utils/cn'
import { useComponentLocale } from '../../locale'
import type { DataTableColumn, DataTableSort } from './types'

export interface DataTableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  columns?: DataTableColumn[]
  rows?: T[]
  rowKey?: keyof T | ((row: T, index: number) => string | number)
  selected?: Array<string | number>
  /** Controlled list of rendered column keys. Omit to show every column. */
  visibleColumnKeys?: string[]
  sortable?: DataTableSort | undefined
  page?: number
  pageSize?: number
  total?: number
  loading?: boolean
  error?: string
  selectable?: boolean
  hoverable?: boolean
  divide?: boolean
  emptyText?: string
  class?: string
}

const props = withDefaults(defineProps<DataTableProps<T>>(), { columns: () => [], rows: () => [], rowKey: undefined, selected: () => [], visibleColumnKeys: undefined, sortable: undefined, page: 1, pageSize: 0, total: undefined, loading: false, error: '', selectable: false, hoverable: true, divide: true, emptyText: undefined, class: '' })
const emit = defineEmits<{ (event: 'update:selected', value: Array<string | number>): void; (event: 'update:visibleColumnKeys', value: string[]): void; (event: 'update:sortable', value: DataTableSort | undefined): void; (event: 'update:page', value: number): void }>()
const emptyLoc = useComponentLocale('empty')
const paginationLoc = useComponentLocale('pagination')
const commonLoc = useComponentLocale('common')
const tableLoc = useComponentLocale('table')
const effectiveEmptyText = computed(() => props.emptyText ?? emptyLoc.value.defaultTitle)
const visibleColumns = computed(() => props.visibleColumnKeys ? props.columns.filter((column) => props.visibleColumnKeys!.includes(column.key)) : props.columns)
const showPagination = computed(() => props.pageSize > 0)
const total = computed(() => props.total ?? props.rows.length)
const pageCount = computed(() => Math.max(1, Math.ceil(total.value / Math.max(props.pageSize, 1))))
const currentPage = computed(() => Math.min(Math.max(props.page, 1), pageCount.value))
const pagedRows = computed(() => { if (!showPagination.value || props.total !== undefined) return props.rows; const start = (currentPage.value - 1) * props.pageSize; return props.rows.slice(start, start + props.pageSize) })
const selectedRows = computed(() => props.rows.filter((row, index) => props.selected.includes(rowKey(row, index))))
const pageKeys = computed(() => pagedRows.value.map((row, index) => rowKey(row, index)))
const allPageSelected = computed(() => pageKeys.value.length > 0 && pageKeys.value.every((key) => props.selected.includes(key)))
const somePageSelected = computed(() => !allPageSelected.value && pageKeys.value.some((key) => props.selected.includes(key)))
function rowKey(row: T, index: number): string | number { const key = props.rowKey; return typeof key === 'function' ? key(row, index) : key ? String(row[key] ?? index) : index }
function alignClass(align?: DataTableColumn['align']) { return align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left' }
function formatCell(value: unknown) { return value === null || value === undefined ? '-' : String(value) }
function isSelected(row: T, index: number) { return props.selected.includes(rowKey(row, index)) }
function toggleRow(row: T, index: number) { const key = rowKey(row, index); emit('update:selected', props.selected.includes(key) ? props.selected.filter((value) => value !== key) : [...props.selected, key]) }
function togglePageSelection() { const keys = pageKeys.value; emit('update:selected', allPageSelected.value ? props.selected.filter((key) => !keys.includes(key)) : [...new Set([...props.selected, ...keys])]) }
function clearSelection() { emit('update:selected', []) }
function toggleSort(key: string) { const next: DataTableSort = props.sortable?.key === key && props.sortable.direction === 'asc' ? { key, direction: 'desc' } : { key, direction: 'asc' }; emit('update:sortable', props.sortable?.key === key && props.sortable.direction === 'desc' ? undefined : next) }
function sortIcon(key: string) { return props.sortable?.key === key ? props.sortable.direction === 'asc' ? '↑' : '↓' : '↕' }
function setPage(value: number) { emit('update:page', Math.min(Math.max(value, 1), pageCount.value)) }
</script>
