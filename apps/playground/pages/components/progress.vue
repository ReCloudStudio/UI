<template>
  <div class="space-y-10">
    <DocPageHeader title="Progress 进度条" description="任务进度与百分比，带标签行与语义色。" />

    <DocExample title="色彩与尺寸" description="aria=progressbar 无障碍语义。" :code="rcCode0">
      <div class="space-y-4 max-w-md">
        <Progress :value="72" label="节点同步进度" show-value color="primary" />
        <Progress :value="100" label="健康检查" color="success" size="sm" />
        <Progress :value="34" label="存储用量" color="warning" size="sm" />
        <Progress :value="12" label="异常实例" color="error" size="sm" />
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="progress" />
  </div>
</template>

<script setup lang="ts">
const rcCode0 = `<div class="space-y-4 max-w-md">
  <Progress :value="72" label="节点同步进度" show-value color="primary" />
  <Progress :value="100" label="健康检查" color="success" size="sm" />
  <Progress :value="34" label="存储用量" color="warning" size="sm" />
  <Progress :value="12" label="异常实例" color="error" size="sm" />
</div>`


const apiRows = [ { name: 'value / max', type: 'number', default: '0 / 100', description: '当前值与上限。' },
  { name: 'label', type: 'string', default: '—', description: '左侧标签。' },
  { name: 'showValue', type: 'boolean', default: 'false', description: '右侧百分比。' },
  { name: 'color', type: "'primary' | 'success' | 'warning' | 'error' | 'neutral'", default: 'primary', description: '进度条色。' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '轨道高度。' } ]
</script>
