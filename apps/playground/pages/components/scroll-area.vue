<template>
  <div class="space-y-10">
    <DocPageHeader title="ScrollArea 滚动区" description="自定义纤细滚动条的受限视口，深浅色自动适配。" />

    <DocExample title="节点列表" description="max-height 接受任意 CSS 长度。" :code="rcCode0">
      <ScrollArea max-height="12rem" class="max-w-sm">
        <div class="space-y-1 pr-3">
          <div v-for="(node, i) in nodes" :key="node" class="flex items-center justify-between rounded-lg px-3 py-2 text-sm ring-1 ring-inset ring-slate-200/70 dark:ring-slate-800/70">
            <span class="font-mono text-xs text-slate-700 dark:text-slate-300">{{ node }}</span>
            <Badge :color="i % 4 === 3 ? 'warning' : 'success'" variant="soft" size="xs">{{ i % 4 === 3 ? '维护' : '健康' }}</Badge>
          </div>
        </div>
      </ScrollArea>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="scroll-area" />
  </div>
</template>

<script setup lang="ts">
const nodes = ['hkg-edge-01', 'nrt-edge-02', 'sjc-edge-03', 'fra-edge-04', 'sin-edge-05', 'iad-edge-06', 'gru-edge-07', 'syd-edge-08', 'nrt-edge-09', 'hkg-edge-10']

const rcCode0 = `<ScrollArea max-height="12rem" class="max-w-sm">
  <div class="space-y-1 pr-3">
    <div v-for="(node, i) in nodes" :key="node" class="flex items-center justify-between rounded-lg px-3 py-2 text-sm ring-1 ring-inset ring-slate-200/70 dark:ring-slate-800/70">
      <span class="font-mono text-xs text-slate-700 dark:text-slate-300">{{ node }}</span>
      <Badge :color="i % 4 === 3 ? 'warning' : 'success'" variant="soft" size="xs">{{ i % 4 === 3 ? '维护' : '健康' }}</Badge>
    </div>
  </div>
</ScrollArea>`


const apiRows = [ { name: 'max-height', type: 'string', default: '18rem', description: '视口最大高度。' } ]
</script>
