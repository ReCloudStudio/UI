<template>
  <div class="space-y-10">
    <PageHeader title="ResizablePanel 可调面板" description="为日志、资源详情和编辑器工作区提供可拖拽且可键盘操作的分栏布局。" />

    <ComponentExample title="双栏工作区" description="拖动中间分隔线，或聚焦后通过方向键调整左侧面板；Home / End 跳到最小或最大尺寸。" :code="rcCode0">
      <ResizablePanel v-model="panelSize" class="h-72 rounded-xl ring-1 ring-slate-200 dark:ring-slate-800" :min="160" :max="420">
        <template #first><div class="h-full bg-slate-50 p-4 dark:bg-slate-900/70"><p class="text-xs font-semibold uppercase tracking-wider text-slate-500">资源</p><div class="mt-3 space-y-1"><button v-for="item in resources" :key="item" class="block w-full rounded-lg px-2.5 py-2 text-left text-sm text-slate-600 hover:bg-white hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white">{{ item }}</button></div></div></template>
        <template #second><div class="flex h-full flex-col bg-white p-5 dark:bg-[#0F172A]"><p class="text-xs font-semibold uppercase tracking-wider text-slate-500">部署日志</p><CodeBlock :code="deployLog" language="log" filename="deploy.log" :icon="false" max-height="11rem" class="mt-4 flex-1" /><p class="mt-3 text-xs text-slate-500">左侧宽度：{{ panelSize }}px</p></div></template>
      </ResizablePanel>
    </ComponentExample>

    <ApiTable :rows="apiRows" />
    <DocPageNav name="resizable-panel" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const panelSize = ref(240)
const resources = ['production', 'staging', 'preview-482']
const deployLog = `$ deploy production
✓ Building image
✓ Migrating database
✓ Service healthy`
const rcCode0 = `<ResizablePanel v-model="sidebarWidth" :min="160" :max="480">
  <template #first><ResourceSidebar /></template>
  <template #second><LogViewer /></template>
</ResizablePanel>`
const apiRows = [
  { name: 'v-model', type: 'number', default: '280', description: '第一个面板的受控像素尺寸。省略时组件维护内部尺寸。' },
  { name: 'defaultSize', type: 'number', default: '280', description: '非受控模式的初始尺寸。' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: '分栏方向；horizontal 为左右面板。' },
  { name: 'min / max / step', type: 'number', default: '160 / 自动 / 16', description: '尺寸边界与键盘调整步长。' },
  { name: 'resizeStart / resizeEnd', type: 'event', default: '—', description: '拖拽开始和结束事件，结束时提供最终尺寸。' },
  { name: 'first / second', type: 'slot', default: '—', description: '两个面板的内容插槽。' }
]
</script>
