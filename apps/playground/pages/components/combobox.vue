<template>
  <div class="space-y-10">
    <DocPageHeader title="Combobox 组合框" description="可搜索的下拉选择，支持分组、多选与清除按钮。" />

    <DocExample title="分组搜索" description="输入即过滤，分组标题自动聚合。" :code="rcCode0">
      <Combobox v-model="value" :options="options" label="边缘节点" placeholder="搜索节点…" />
      <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">当前值：{{ value }}</p>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="combobox" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('hkg-edge-01')
const options = [
  { label: 'hkg-edge-01', value: 'hkg-edge-01', group: '亚太' },
  { label: 'nrt-edge-02', value: 'nrt-edge-02', group: '亚太' },
  { label: 'sjc-edge-03', value: 'sjc-edge-03', group: '美洲' },
  { label: 'fra-edge-04', value: 'fra-edge-04', group: '欧洲', disabled: true }
]

const rcCode0 = `<Combobox v-model="value" :options="options" label="边缘节点" placeholder="搜索节点…" />
<p class="mt-3 text-xs text-slate-500 dark:text-slate-400">当前值：{{ value }}</p>`


const apiRows = [ { name: 'model-value', type: 'string | string[]', default: '—', description: 'v-model；multiple 时为数组。' },
  { name: 'options', type: '{ label, value, group?, disabled? }[]', default: '—', description: '选项数据。' },
  { name: 'multiple', type: 'boolean', default: 'false', description: '多选模式。' },
  { name: 'placeholder / label / emptyText', type: 'string', default: '—', description: '占位与文案。' },
  { name: 'noClear', type: 'boolean', default: 'false', description: '隐藏清除按钮。' } ]
</script>
