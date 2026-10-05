<template>
  <section :class="cn('space-y-3', props.class)">
    <h3 v-if="props.title || $slots.title" class="text-base font-semibold tracking-tight text-[color:var(--foreground)]">
      <slot name="title">{{ props.title }}</slot>
    </h3>
    <DataTable :columns="columns" :rows="props.rows" :hoverable="false" :divide="true">
      <template #cell-name="{ value }">
        <code class="whitespace-nowrap font-mono text-[13px] font-medium text-[color:var(--primary)]">{{ value }}</code>
      </template>
      <template #cell-type="{ value }">
        <code class="font-mono text-[12px] text-[color:var(--foreground)]">{{ value }}</code>
      </template>
      <template #cell-default="{ value }">
        <code class="whitespace-nowrap font-mono text-[12px] text-[color:var(--muted-foreground)]">{{ value || '—' }}</code>
      </template>
      <template #cell-description="{ value }">
        <span class="text-[13px] leading-6 text-[color:var(--muted-foreground)]">{{ value }}</span>
      </template>
    </DataTable>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '../../utils/cn'
import DataTable from '../table/DataTable.vue'
import type { DataTableColumn } from '../table/types'
import type { ApiTableProps } from './types'

const props = withDefaults(defineProps<ApiTableProps>(), {
  title: 'API 参考',
  class: ''
})

const columns = computed<DataTableColumn[]>(() => [
  { key: 'name', label: '属性', slot: true },
  { key: 'type', label: '类型', slot: true },
  { key: 'default', label: '默认值', slot: true },
  { key: 'description', label: '说明', slot: true }
])
</script>
