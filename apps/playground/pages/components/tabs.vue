<template>
  <div class="space-y-10">
    <PageHeader title="Tabs 标签页" description="视图切换标签，pill 风格容器与内容面板插槽，基于 Reka UI 键盘导航。" />

    <ComponentExample title="基础与内容面板" description="items 定义标签，TabsContent 按 value 匹配面板。" :code="rcCode0">
      <Tabs v-model="tab" :items="[
        { label: '拓扑概览', value: 'overview' },
        { label: '性能监控', value: 'monitoring' },
        { label: '安全策略', value: 'settings', disabled: true }
      ]">
        <TabsContent value="overview">
          <div class="mt-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/40 ring-1 ring-inset ring-slate-200/60 dark:ring-slate-800/60 text-sm">
            当前已挂载 128 个全球边缘计算节点，平均端到端延迟 12ms。
          </div>
        </TabsContent>
        <TabsContent value="monitoring">
          <div class="mt-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/40 ring-1 ring-inset ring-slate-200/60 dark:ring-slate-800/60 text-sm">
            CPU 平均利用率 28%，内存占用 42%，无丢包记录。
          </div>
        </TabsContent>
      </Tabs>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="tabs" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const tab = ref('overview')

const rcCode0 = `<Tabs v-model="tab" :items="[
  { label: '拓扑概览', value: 'overview' },
  { label: '性能监控', value: 'monitoring' },
  { label: '安全策略', value: 'settings', disabled: true }
]">
  <TabsContent value="overview">
    <div class="mt-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/40 ring-1 ring-inset ring-slate-200/60 dark:ring-slate-800/60 text-sm">
      当前已挂载 128 个全球边缘计算节点，平均端到端延迟 12ms。
    </div>
  </TabsContent>
  <TabsContent value="monitoring">
    <div class="mt-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/40 ring-1 ring-inset ring-slate-200/60 dark:ring-slate-800/60 text-sm">
      CPU 平均利用率 28%，内存占用 42%，无丢包记录。
    </div>
  </TabsContent>
</Tabs>`


const apiRows = [ { name: 'model-value', type: 'string', default: '—', description: 'v-model 激活标签 value。' },
  { name: 'items', type: '{ label, value, icon?, disabled? }[]', default: '—', description: '标签定义。' },
  { name: 'TabsContent', type: 'component', default: '—', description: 'value 匹配的内容面板。' } ]
</script>
