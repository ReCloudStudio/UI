<template>
  <div class="space-y-10">
    <PageHeader title="Skeleton 骨架屏" description="内容加载占位，脉冲动画节奏统一。" />

    <ComponentExample title="占位组合" description="width/height 接受任意 CSS 长度。" :code="rcCode0">
      <div class="grid grid-cols-3 gap-3 max-w-md">
        <Skeleton height="4.5rem" />
        <Skeleton height="4.5rem" />
        <Skeleton height="4.5rem" />
      </div>
      <div class="mt-4 space-y-2 max-w-md">
        <Skeleton width="60%" height="1rem" />
        <Skeleton width="100%" height="0.75rem" />
        <Skeleton width="80%" height="0.75rem" />
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="skeleton" />
  </div>
</template>

<script setup lang="ts">
const rcCode0 = `<div class="grid grid-cols-3 gap-3 max-w-md">
  <Skeleton height="4.5rem" />
  <Skeleton height="4.5rem" />
  <Skeleton height="4.5rem" />
</div>
<div class="mt-4 space-y-2 max-w-md">
  <Skeleton width="60%" height="1rem" />
  <Skeleton width="100%" height="0.75rem" />
  <Skeleton width="80%" height="0.75rem" />
</div>`


const apiRows = [ { name: 'width / height', type: 'string', default: '100% / auto', description: 'CSS 尺寸。' },
  { name: 'class', type: 'string', default: '—', description: '追加圆角等覆写。' } ]
</script>
