<template>
  <div class="space-y-10">
    <PageHeader title="VisuallyHidden 隐藏文本" description="视觉隐藏但屏幕阅读器可读的辅助文本。" />

    <ComponentExample title="用法" :code="rcCode0">
      <div class="flex items-center gap-3">
        <Spinner />
        <VisuallyHidden>正在同步集群配置，请勿刷新页面</VisuallyHidden>
        <span class="text-xs text-slate-500 dark:text-slate-400">（上方文本对屏幕阅读器可见，视觉上隐藏）</span>
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="visually-hidden" />
  </div>
</template>

<script setup lang="ts">
const rcCode0 = `<div class="flex items-center gap-3">
  <Spinner />
  <VisuallyHidden>正在同步集群配置，请勿刷新页面</VisuallyHidden>
  <span class="text-xs text-slate-500 dark:text-slate-400">（上方文本对屏幕阅读器可见，视觉上隐藏）</span>
</div>`


const apiRows = [ { name: 'default', type: 'slot', default: '—', description: '需要无障碍朗读的内容。' } ]
</script>
