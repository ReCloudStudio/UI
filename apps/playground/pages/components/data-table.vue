<template>
  <div class="space-y-10">
    <PageHeader title="DataTable 数据表" description="面向控制台的受控增强表格：排序、分页、行选择与一致状态。" />

    <ComponentExample title="可控表格状态" description="排序、分页、选择状态由调用方保存；slot: true 的列查找 #cell-<key> 作用域插槽。" :code="rcCode0">
      <DataTable v-model:selected="selected" v-model:sortable="sort" v-model:page="page" :columns="columns" :rows="rows" row-key="name" selectable :page-size="2">
        <template #toolbar="{ selected, clearSelection }">
          <div class="flex items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-300"><span>已选择 {{ selected.length }} 个节点</span><Button v-if="selected.length" size="xs" variant="ghost" color="neutral" @click="clearSelection">取消选择</Button></div>
        </template>
        <template #cell-status="{ value }">
          <Badge :color="value === '在线' ? 'success' : value === '维护' ? 'warning' : 'neutral'" variant="soft" dot size="xs">{{ value }}</Badge>
        </template>
        <template #cell-actions>
          <Button size="xs" variant="ghost" color="neutral">管理</Button>
        </template>
      </DataTable>
    </ComponentExample>

    <ComponentExample title="密度控制与状态展示" description="通过 density 属性快速在紧凑模式 (compact)、标准模式 (default) 与宽松模式 (relaxed) 间切换，高密度表格采用更紧凑的行高并适配更密集的监控数据。" :code="rcCodeDensity">
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <span class="text-xs text-muted-foreground">显示密度：</span>
          <Button size="xs" :variant="density === 'compact' ? 'solid' : 'ghost'" color="neutral" @click="density = 'compact'">紧凑 (compact)</Button>
          <Button size="xs" :variant="density === 'default' ? 'solid' : 'ghost'" color="neutral" @click="density = 'default'">标准 (default)</Button>
          <Button size="xs" :variant="density === 'relaxed' ? 'solid' : 'ghost'" color="neutral" @click="density = 'relaxed'">宽松 (relaxed)</Button>
        </div>
        <DataTable :columns="columns" :rows="rows" :density="density" row-key="name">
          <template #cell-status="{ value }">
            <StatusBadge :status="value === '在线' ? 'online' : value === '维护' ? 'degraded' : 'offline'" :label="value" size="xs" />
          </template>
          <template #cell-actions>
            <Button size="xs" variant="ghost" color="neutral">管理</Button>
          </template>
        </DataTable>
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="data-table" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { DataTableDensity, DataTableSort } from '@recloudstudio/ui'
import { StatusBadge } from '@recloudstudio/ui'
const density = ref<DataTableDensity>('compact')
const columns = [
  { key: 'name', label: '节点' },
  { key: 'region', label: '地域' },
  { key: 'status', label: '状态', slot: true },
  { key: 'latency', label: '延迟', align: 'right' as const },
  { key: 'actions', label: '操作', align: 'right' as const, slot: true }
]
const page = ref(1)
const selected = ref<string[]>([])
const sort = ref<DataTableSort>()
const rows = ref([
  { name: 'hkg-edge-01', region: '中国香港', status: '在线', latency: '8ms' },
  { name: 'nrt-edge-02', region: '日本东京', status: '在线', latency: '14ms' },
  { name: 'fra-edge-04', region: '德国法兰克福', status: '维护', latency: '32ms' },
  { name: 'sjc-edge-03', region: '美国硅谷', status: '离线', latency: '—' }
])

const rcCode0 = `<DataTable
  v-model:selected="selected"
  v-model:sortable="sort"
  v-model:page="page"
  :columns="columns"
  :rows="rows"
  row-key="name"
  selectable
  :page-size="20"
>
  <template #toolbar="{ selected, clearSelection }">
    已选择 {{ selected.length }} 项
  </template>
  <template #cell-status="{ value }">
    <Badge :color="value === '在线' ? 'success' : value === '维护' ? 'warning' : 'neutral'" variant="soft" dot size="xs">{{ value }}</Badge>
  </template>
  <template #cell-actions>
    <Button size="xs" variant="ghost" color="neutral">管理</Button>
  </template>
</DataTable>`


const rcCodeDensity = `<DataTable :columns="columns" :rows="rows" density="compact" row-key="name">
  <template #cell-status="{ value }">
    <StatusBadge :status="value === '在线' ? 'online' : 'offline'" size="xs" />
  </template>
</DataTable>`

const apiRows = [ { name: 'columns', type: '{ key, label, width?, align?, slot?, sortable? }[]', default: '—', description: '列定义；sortable 开启受控列排序。' },
  { name: 'density', type: "'compact' | 'default' | 'relaxed'", default: "'default'", description: '表格行内间距密度模式。' },
  { name: 'rows / rowKey', type: 'Record<string, unknown>[] / string | function', default: '—', description: '行数据和稳定行标识。' },
  { name: 'v-model:selected', type: '(string | number)[]', default: '[]', description: '启用 selectable 后的受控行选择。' },
  { name: 'v-model:sortable', type: '{ key, direction } | undefined', default: '—', description: '受控排序状态，数据排序由调用方处理。' },
  { name: 'v-model:page / pageSize / total', type: 'number', default: '1 / 0 / rows.length', description: '受控分页；传 total 时适配服务端分页。' },
  { name: 'loading / error', type: 'boolean / string', default: 'false / —', description: '统一骨架加载与错误状态。' },
  { name: 'visibleColumnKeys', type: 'string[]', default: '全部列', description: '受控列显隐。' },
  { name: 'toolbar / empty / error / cell-<key>', type: 'slot', default: '—', description: '工具栏、状态与单元格插槽。' } ]
</script>
