<template>
  <div class="space-y-10">
    <DocPageHeader title="HoverCard 悬停卡片" description="悬停预览卡片：人员信息、节点详情等低承诺交互。" />

    <DocExample title="人员卡片" description="openDelay / closeDelay 可调。" :code="rcCode0">
      <HoverCard>
        <template #trigger>
          <Button variant="outline" color="neutral">悬停查看</Button>
        </template>
        <div class="space-y-2">
          <div class="flex items-center gap-2.5">
            <Avatar fallback="RS" size="sm" />
            <div>
              <p class="text-sm font-semibold text-slate-900 dark:text-white">ReCloud Studio</p>
              <p class="text-xs text-slate-500">边缘云平台 · 2026</p>
            </div>
          </div>
          <p class="text-xs leading-relaxed text-slate-600 dark:text-slate-400">悬停 300ms 后自动展开，离开 200ms 后关闭。</p>
        </div>
      </HoverCard>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="hover-card" />
  </div>
</template>

<script setup lang="ts">
const rcCode0 = `<HoverCard>
  <template #trigger>
    <Button variant="outline" color="neutral">悬停查看</Button>
  </template>
  <div class="space-y-2">
    <div class="flex items-center gap-2.5">
      <Avatar fallback="RS" size="sm" />
      <div>
        <p class="text-sm font-semibold text-slate-900 dark:text-white">ReCloud Studio</p>
        <p class="text-xs text-slate-500">边缘云平台 · 2026</p>
      </div>
    </div>
    <p class="text-xs leading-relaxed text-slate-600 dark:text-slate-400">悬停 300ms 后自动展开，离开 200ms 后关闭。</p>
  </div>
</HoverCard>`


const apiRows = [ { name: 'open-delay / close-delay', type: 'number', default: '300 / 200', description: '开关闭延迟（毫秒）。' },
  { name: 'side / side-offset', type: "'top' | … | number", default: 'bottom / 6', description: '弹出方位。' },
  { name: 'trigger / default', type: 'slot', default: '—', description: '触发元素与卡片内容。' } ]
</script>
