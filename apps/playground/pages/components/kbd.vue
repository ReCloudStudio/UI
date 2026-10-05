<template>
  <div class="space-y-10">
    <PageHeader title="Kbd 按键提示" description="等宽键帽样式的快捷键展示，自动适配深浅色。" />

    <ComponentExample title="组合键" description="xs / sm / md 三档尺寸。" :code="rcCode0">
      <div class="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <span>全局搜索</span><Kbd>Ctrl</Kbd><Kbd>K</Kbd>
        <span class="ml-3">部署</span><Kbd>⌘</Kbd><Kbd>Enter</Kbd>
        <span class="ml-3">帮助</span><Kbd size="xs">?</Kbd>
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="kbd" />
  </div>
</template>

<script setup lang="ts">
const rcCode0 = `<div class="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
  <span>全局搜索</span><Kbd>Ctrl</Kbd><Kbd>K</Kbd>
  <span class="ml-3">部署</span><Kbd>⌘</Kbd><Kbd>Enter</Kbd>
  <span class="ml-3">帮助</span><Kbd size="xs">?</Kbd>
</div>`


const apiRows = [ { name: 'size', type: "'xs' | 'sm' | 'md'", default: 'sm', description: '键帽字号。' } ]
</script>
