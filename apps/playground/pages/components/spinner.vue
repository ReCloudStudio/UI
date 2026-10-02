<template>
  <div class="space-y-10">
    <DocPageHeader title="Spinner 加载" description="role=status 的环形加载指示器，颜色跟随文本继承。" />

    <DocExample title="尺寸" description="xs 到 lg 四档；color 语义色。" :code="rcCode0">
      <div class="demo-grid">
        <span class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Spinner size="xs" /> 校验中…</span>
        <span class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Spinner size="sm" color="primary" /> 部署中…</span>
        <span class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Spinner size="md" /> 同步中…</span>
        <Spinner size="lg" class="text-[#2563EB] dark:text-[#70ACFE]" />
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="spinner" />
  </div>
</template>

<script setup lang="ts">
const rcCode0 = `<div class="demo-grid">
  <span class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Spinner size="xs" /> 校验中…</span>
  <span class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Spinner size="sm" color="primary" /> 部署中…</span>
  <span class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Spinner size="md" /> 同步中…</span>
  <Spinner size="lg" class="text-[#2563EB] dark:text-[#70ACFE]" />
</div>`


const apiRows = [ { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: 'md', description: '直径。' },
  { name: 'color', type: "'primary' | 'neutral' | 'success' | 'warning' | 'error'", default: 'neutral', description: '语义色，默认继承 currentColor。' } ]
</script>
