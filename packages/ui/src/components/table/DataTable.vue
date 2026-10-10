<template>
  <div :class="cn('w-full overflow-hidden rounded-xl bg-card ring-1 ring-inset ring-border', props.class)">
    <div v-if="$slots.toolbar" class="border-b border-border px-4 py-3"><slot name="toolbar" :selected="selectedRows" :clear-selection="clearSelection" /></div>
    <div class="overflow-x-auto">
      <table :class="cn('w-full border-collapse text-left', tableTextClass)">
        <thead><tr class="border-b border-border bg-muted/80">
          <th v-if="selectable" :class="cn('w-11', headerCellClass)"><input type="checkbox" :checked="allPageSelected" :indeterminate="somePageSelected" :aria-label="tableLoc.selectAllAria" class="h-4 w-4 accent-primary" @change="togglePageSelection" /></th>
          <th v-for="col in visibleColumns" :key="col.key" :style="col.width ? { width: col.width } : undefined" :class="cn('text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap', headerCellClass, alignClass(col.align))">
            <button v-if="col.sortable" type="button" class="inline-flex items-center gap-1 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" @click="toggleSort(col.key)">{{ col.label }}<span aria-hidden="true" class="text-muted-foreground">{{ sortIcon(col.key) }}</span></button>
            <span v-else>{{ col.label }}</span>
          </th>
        </tr></thead>
        <tbody v-if="!loading && !error && pagedRows.length" :class="props.divide ? 'divide-y divide-border' : ''">
          <tr v-for="(row, index) in pagedRows" :key="rowKey(row, index)" :class="cn('transition-colors', hoverable ? 'hover:bg-muted/70' : '', isSelected(row, index) && 'bg-primary/10')">
            <td v-if="selectable" :class="bodyCellClass"><input type="checkbox" :checked="isSelected(row, index)" :aria-label="tableLoc.selectRowAria(index + 1)" class="h-4 w-4 accent-primary" @change="toggleRow(row, index)" /></td>
            <td v-for="col in visibleColumns" :key="col.key" :class="cn('align-middle text-foreground', bodyCellClass, alignClass(col.align))"><slot v-if="col.slot" :name="`cell-${col.key}`" :row="row" :value="row[col.key]" :index="index" /><span v-else class="whitespace-nowrap">{{ formatCell(row[col.key]) }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="loading" class="space-y-3 p-4" :aria-label="commonLoc.loading" role="status"><div v-for="row in 4" :key="row" class="flex gap-4"><Skeleton v-for="column in visibleColumns.length + Number(selectable)" :key="column" height="1.5rem" /></div></div>
    <div v-else-if="error" class="p-4"><slot name="error"><EmptyState :title="emptyLoc.loadFailed" :description="error"><template #icon><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M12 16h.01"/></svg></template></EmptyState></slot></div>
    <div v-else-if="!pagedRows.length" class="p-4"><slot name="empty"><EmptyState :title="effectiveEmptyText" /></slot></div>
    <div v-if="showPagination" class="flex flex-wrap items-center justify-between gap-3 border-t border-border px-4 py-3"><span class="text-xs text-muted-foreground">{{ paginationLoc.totalSummary(currentPage, pageCount, total) }}</span><div class="flex gap-1"><button :disabled="currentPage <= 1" class="inline-flex h-8 items-center justify-center rounded-lg px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40" @click="setPage(currentPage - 1)">{{ paginationLoc.prev }}</button><button :disabled="currentPage >= pageCount" class="inline-flex h-8 items-center justify-center rounded-lg px-3 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted disabled:pointer-events-none disabled:opacity-40" @click="setPage(currentPage + 1)">{{ paginationLoc.next }}</button></div></div>
  </div>
</template>

<script setup lang="ts" generic="T extends Record<string, unknown>">
import { computed } from 'vue'
import EmptyState from '../empty/EmptyState.vue'
import Skeleton from '../skeleton/Skeleton.vue'
import { cn } from '../../utils/cn'
import { useComponentLocale } from '../../locale'
import type { DataTableColumn, DataTableDensity, DataTableSort } from './types'

export interface DataTableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  columns?: DataTableColumn[]
  rows?: T[]
  rowKey?: keyof T | ((row: T, index: number) => string | number)
  selected?: Array<string | number>
  /** Controlled list of rendered column keys. Omit to show every column. */
  visibleColumnKeys?: string[]
  sortable?: DataTableSort | undefined
  density?: DataTableDensity
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

const props = withDefaults(defineProps<DataTableProps<T>>(), { columns: () => [], rows: () => [], rowKey: undefined, selected: () => [], visibleColumnKeys: undefined, sortable: undefined, density: 'default', page: 1, pageSize: 0, total: undefined, loading: false, error: '', selectable: false, hoverable: true, divide: true, emptyText: undefined, class: '' })
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
const tableTextClass = computed(() => (props.density === 'compact' ? 'text-xs' : 'text-sm'))
const headerCellClass = computed(() => {
  if (props.density === 'compact') return 'px-3 py-1.5'
  if (props.density === 'relaxed') return 'px-5 py-3.5'
  return 'px-4 py-2.5'
})
const bodyCellClass = computed(() => {
  if (props.density === 'compact') return 'px-3 py-2'
  if (props.density === 'relaxed') return 'px-5 py-4'
  return 'px-4 py-3'
})
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
