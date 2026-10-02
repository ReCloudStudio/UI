<template>
  <div class="space-y-10">
    <DocPageHeader title="Accordion 手风琴" description="单开 / 多开折叠问答，chevron 旋转与展开动画。" />

    <DocExample title="单开模式" description="type=multiple 允许多项同时展开。" :code="rcCode0">
      <Accordion v-model="value" :items="[
        { value: 'quota', title: '配额与限额', content: '每个账户默认包含 256 个边缘节点、50 Gbps 突发带宽与 3 个可用区冗余组。' },
        { value: 'billing', title: '计费口径', content: '按小时粒度结算，入站流量免费，出站 Anycast 流量按阶梯单价计费。' },
        { value: 'compliance', title: '合规与审计', content: '全量操作审计日志保留 180 天，支持导出至对象存储归档。' }
      ]" />
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="accordion" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref('quota')

const rcCode0 = `<Accordion v-model="value" :items="[
  { value: 'quota', title: '配额与限额', content: '每个账户默认包含 256 个边缘节点、50 Gbps 突发带宽与 3 个可用区冗余组。' },
  { value: 'billing', title: '计费口径', content: '按小时粒度结算，入站流量免费，出站 Anycast 流量按阶梯单价计费。' },
  { value: 'compliance', title: '合规与审计', content: '全量操作审计日志保留 180 天，支持导出至对象存储归档。' }
]" />`


const apiRows = [ { name: 'items', type: '{ value, title, content?, disabled? }[]', default: '—', description: '条目定义。' },
  { name: 'model-value', type: 'string | string[]', default: '—', description: '展开项 value。' },
  { name: 'type', type: "'single' | 'multiple'", default: 'single', description: '折叠模式。' },
  { name: 'collapsible', type: 'boolean', default: 'true', description: 'single 模式允许全部收起。' } ]
</script>
