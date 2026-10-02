<template>
  <div class="space-y-10">
    <DocPageHeader title="Separator 分隔线" description="水平与垂直方向分割线，自动适配主题。" />

    <DocExample title="方向" :code="rcCode0">
      <div class="space-y-4 max-w-md">
        <div class="space-y-1">
          <p class="text-sm text-slate-700 dark:text-slate-300">基础信息</p>
          <Separator />
          <p class="text-sm text-slate-500 dark:text-slate-400">分隔线自动适配深浅色主题。</p>
        </div>
        <div class="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          <span>可用性 99.99%</span>
          <Separator orientation="vertical" class="h-5" />
          <span>延迟 12ms</span>
          <Separator orientation="vertical" class="h-5" />
          <span>丢包 0%</span>
        </div>
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="separator" />
  </div>
</template>

<script setup lang="ts">
const rcCode0 = `<div class="space-y-4 max-w-md">
  <div class="space-y-1">
    <p class="text-sm text-slate-700 dark:text-slate-300">基础信息</p>
    <Separator />
    <p class="text-sm text-slate-500 dark:text-slate-400">分隔线自动适配深浅色主题。</p>
  </div>
  <div class="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
    <span>可用性 99.99%</span>
    <Separator orientation="vertical" class="h-5" />
    <span>延迟 12ms</span>
    <Separator orientation="vertical" class="h-5" />
    <span>丢包 0%</span>
  </div>
</div>`


const apiRows = [ { name: 'orientation', type: "'horizontal' | 'vertical'", default: 'horizontal', description: '方向。' },
  { name: 'decorative', type: 'boolean', default: 'true', description: '纯装饰（aria-hidden）。' } ]
</script>
