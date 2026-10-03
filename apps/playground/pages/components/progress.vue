<template>
  <div class="space-y-10">
    <DocPageHeader title="Progress 进度条" description="任务进度、百分比与完成数量，带标签行与语义色。" />

    <DocExample title="数值显示、色彩与尺寸" description="可单独显示百分比、完成数量，或同时显示两者。" :code="rcCode0">
      <div class="space-y-4 max-w-md">
        <Progress :value="72" label="节点同步进度" value-display="percentage" color="primary" />
        <Progress :value="8" :max="12" label="健康检查" value-display="fraction" color="success" size="sm" />
        <Progress :value="34" :max="50" label="存储用量" value-display="both" color="warning" size="sm" />
        <Progress :value="12" label="异常实例" color="error" size="sm" />
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="progress" />
  </div>
</template>

<script setup lang="ts">
const rcCode0 = `<div class="space-y-4 max-w-md">
  <Progress :value="72" label="节点同步进度" value-display="percentage" color="primary" />
  <Progress :value="8" :max="12" label="健康检查" value-display="fraction" color="success" size="sm" />
  <Progress :value="34" :max="50" label="存储用量" value-display="both" color="warning" size="sm" />
  <Progress :value="12" label="异常实例" color="error" size="sm" />
</div>`


const apiRows = [ { name: 'value / max', type: 'number', default: '0 / 100', description: '当前值与上限。' },
  { name: 'label', type: 'string', default: '—', description: '左侧标签。' },
  { name: 'value-display', type: "'percentage' | 'fraction' | 'both'", default: '—', description: '右侧显示百分比、当前值/上限，或两者。' },
  { name: 'show-value', type: 'boolean', default: 'false', description: '兼容属性，等同 value-display="percentage"。' },
  { name: 'color', type: "'primary' | 'success' | 'warning' | 'error' | 'neutral'", default: 'primary', description: '进度条色。' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '轨道高度。' } ]
</script>
