<template>
  <div class="space-y-10">
    <PageHeader title="Tooltip 文字提示" description="悬停即时提示，自动避开视口边缘。" />

    <ComponentExample title="四方向" :code="rcCode0">
      <div class="demo-grid">
        <Tooltip content="上方提示" side="top"><Button variant="outline" color="neutral">Top</Button></Tooltip>
        <Tooltip content="右侧提示" side="right"><Button variant="outline" color="neutral">Right</Button></Tooltip>
        <Tooltip content="下方提示，延迟 400ms 出现" side="bottom" :delay-duration="400"><Button variant="outline" color="neutral">Bottom</Button></Tooltip>
        <Tooltip content="左侧提示" side="left"><Button variant="outline" color="neutral">Left</Button></Tooltip>
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="tooltip" />
  </div>
</template>

<script setup lang="ts">
const rcCode0 = `<div class="demo-grid">
  <Tooltip content="上方提示" side="top"><Button variant="outline" color="neutral">Top</Button></Tooltip>
  <Tooltip content="右侧提示" side="right"><Button variant="outline" color="neutral">Right</Button></Tooltip>
  <Tooltip content="下方提示，延迟 400ms 出现" side="bottom" :delay-duration="400"><Button variant="outline" color="neutral">Bottom</Button></Tooltip>
  <Tooltip content="左侧提示" side="left"><Button variant="outline" color="neutral">Left</Button></Tooltip>
</div>`


const apiRows = [ { name: 'content', type: 'string', default: '—', description: '提示文本。' },
  { name: 'side', type: "'top' | 'right' | 'bottom' | 'left'", default: 'top', description: '偏好方向。' },
  { name: 'side-offset', type: 'number', default: '5', description: '与触发器的间距。' },
  { name: 'delay-duration', type: 'number', default: '150', description: '出现延迟（毫秒）。' } ]
</script>
