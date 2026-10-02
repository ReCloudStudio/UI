<template>
  <div class="space-y-10">
    <DocPageHeader title="AspectRatio 宽高比" description="固定比例容器，用于视频、截图与封面占位。" />

    <DocExample title="16:9 媒体区" description="缩放宽度时高度自动保持比例。" :code="rcCode0">
      <AspectRatio :ratio="16 / 9" class="max-w-md">
        <div class="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#C8E0FD] via-[#70ACFE] to-[#3069C9] text-sm font-semibold text-white">
          16 : 9 品牌渐变媒体区
        </div>
      </AspectRatio>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="aspect-ratio" />
  </div>
</template>

<script setup lang="ts">
const rcCode0 = `<AspectRatio :ratio="16 / 9" class="max-w-md">
  <div class="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#C8E0FD] via-[#70ACFE] to-[#3069C9] text-sm font-semibold text-white">
    16 : 9 品牌渐变媒体区
  </div>
</AspectRatio>`


const apiRows = [ { name: 'ratio', type: 'number', default: '16 / 9', description: '宽 / 高 数值比。' } ]
</script>
