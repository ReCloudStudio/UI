<template>
  <div class="space-y-10">
    <PageHeader title="Select 选择器" description="基于 Reka UI 的无障碍下拉：键盘导航、类型高亮与品牌色选中标记。" />

    <ComponentExample title="基础" description="options 支持 disabled 项。" :code="rcCode0">
      <div class="grid gap-5 sm:grid-cols-2">
        <Select v-model="region" label="目标地域" :options="[
          { label: '中国香港 (HKG)', value: 'hkg' },
          { label: '日本东京 (NRT)', value: 'nrt' },
          { label: '德国法兰克福 (FRA)', value: 'fra' },
          { label: '美国硅谷 (SJC)', value: 'sjc' }
        ]" />
        <Select v-model="region" label="禁用示例" :options="[{ label: '不可选', value: 'x' }]" disabled />
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="select" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const region = ref('hkg')

const rcCode0 = `<div class="grid gap-5 sm:grid-cols-2">
  <Select v-model="region" label="目标地域" :options="[
    { label: '中国香港 (HKG)', value: 'hkg' },
    { label: '日本东京 (NRT)', value: 'nrt' },
    { label: '德国法兰克福 (FRA)', value: 'fra' },
    { label: '美国硅谷 (SJC)', value: 'sjc' }
  ]" />
  <Select v-model="region" label="禁用示例" :options="[{ label: '不可选', value: 'x' }]" disabled />
</div>`


const apiRows = [ { name: 'model-value', type: 'string', default: '—', description: 'v-model 选中值。' },
  { name: 'options', type: '{ label, value, disabled? }[]', default: '—', description: '选项列表。' },
  { name: 'placeholder', type: 'string', default: '请选择…', description: '未选中占位。' },
  { name: 'label', type: 'string', default: '—', description: '上方标签。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '禁用。' } ]
</script>
