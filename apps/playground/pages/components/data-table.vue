<template>
  <div class="space-y-10">
    <DocPageHeader title="DataTable 数据表" description="轻量数据表：列对齐、悬浮行与按列插槽富渲染。" />

    <DocExample title="插槽单元格" description="slot: true 的列查找 #cell-<key> 作用域插槽。" :code="rcCode0">
      <DataTable :columns="columns" :rows="rows">
        <template #cell-status="{ value }">
          <Badge :color="value === '在线' ? 'success' : value === '维护' ? 'warning' : 'neutral'" variant="soft" dot size="xs">{{ value }}</Badge>
        </template>
        <template #cell-actions>
          <Button size="xs" variant="ghost" color="neutral">管理</Button>
        </template>
      </DataTable>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="data-table" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const columns = [
  { key: 'name', label: '节点' },
  { key: 'region', label: '地域' },
  { key: 'status', label: '状态', slot: true },
  { key: 'latency', label: '延迟', align: 'right' as const },
  { key: 'actions', label: '操作', align: 'right' as const, slot: true }
]
const rows = ref([
  { name: 'hkg-edge-01', region: '中国香港', status: '在线', latency: '8ms' },
  { name: 'nrt-edge-02', region: '日本东京', status: '在线', latency: '14ms' },
  { name: 'fra-edge-04', region: '德国法兰克福', status: '维护', latency: '32ms' },
  { name: 'sjc-edge-03', region: '美国硅谷', status: '离线', latency: '—' }
])

const rcCode0 = `<DataTable :columns="columns" :rows="rows">
  <template #cell-status="{ value }">
    <Badge :color="value === '在线' ? 'success' : value === '维护' ? 'warning' : 'neutral'" variant="soft" dot size="xs">{{ value }}</Badge>
  </template>
  <template #cell-actions>
    <Button size="xs" variant="ghost" color="neutral">管理</Button>
  </template>
</DataTable>`


const apiRows = [ { name: 'columns', type: '{ key, label, width?, align?, slot? }[]', default: '—', description: '列定义。' },
  { name: 'rows', type: 'Record<string, any>[]', default: '—', description: '行数据。' },
  { name: 'hoverable / divide', type: 'boolean', default: 'true', description: '悬浮高亮与行分割线。' },
  { name: 'emptyText', type: 'string', default: '暂无数据', description: '空态文案。' },
  { name: 'cell-<key>', type: 'slot', default: '—', description: '作用域插槽 { row, value }。' } ]
</script>
