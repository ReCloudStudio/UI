<template>
  <div class="space-y-10">
    <PageHeader title="Toolbar 工具条" description="编辑器式按钮组：role=toolbar、方向键循环焦点与分隔线。" />

    <ComponentExample title="格式工具栏" description="ToolbarButton 包裹原生 button，ToolbarSeparator 自动方向感知。" :code="rcCode0">
      <div class="flex items-center gap-4">
        <Toolbar>
          <ToolbarButton aria-label="撤销">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3" /></svg>
          </ToolbarButton>
          <ToolbarButton aria-label="重做">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m15 14 5-5-5-5M20 9H10a6 6 0 0 0 0 12h3" /></svg>
          </ToolbarButton>
          <ToolbarSeparator />
          <ToolbarButton aria-label="加粗"><Bold class="h-4 w-4" /></ToolbarButton>
          <ToolbarButton disabled aria-label="删除">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /></svg>
          </ToolbarButton>
        </Toolbar>
        <VisuallyHidden>仅供屏幕阅读器的工具条说明</VisuallyHidden>
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="toolbar" />
  </div>
</template>

<script setup lang="ts">
import { Bold } from '@recloudstudio/ui/icons'

const rcCode0 = `<div class="flex items-center gap-4">
  <Toolbar>
    <ToolbarButton aria-label="撤销">
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3" /></svg>
    </ToolbarButton>
    <ToolbarButton aria-label="重做">
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m15 14 5-5-5-5M20 9H10a6 6 0 0 0 0 12h3" /></svg>
    </ToolbarButton>
    <ToolbarSeparator />
    <ToolbarButton aria-label="加粗"><Bold class="h-4 w-4" /></ToolbarButton>
    <ToolbarButton disabled aria-label="删除">
      <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /></svg>
    </ToolbarButton>
  </Toolbar>
  <VisuallyHidden>仅供屏幕阅读器的工具条说明</VisuallyHidden>
</div>`


const apiRows = [ { name: 'Toolbar orientation', type: "'horizontal' | 'vertical'", default: 'horizontal', description: '排列方向。' },
  { name: 'ToolbarButton size', type: "'sm' | 'md'", default: 'md', description: '28 / 36px 方形按钮。' },
  { name: 'ToolbarButton disabled', type: 'boolean', default: 'false', description: '禁用并移出焦点循环。' },
  { name: 'ToolbarSeparator', type: 'component', default: '—', description: '方向自适应分隔线。' } ]
</script>
