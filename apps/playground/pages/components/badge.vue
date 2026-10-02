<template>
  <div class="space-y-10">
    <DocPageHeader title="Badge 徽章" description="轻量状态标签，适合版本、运行状态和不打断阅读的辅助信息。支持微光状态圆点与四档尺寸。" />

    <DocExample title="变体与色彩" description="主色、中性与语义状态色，dot 属性渲染呼吸圆点。" :code="rcCode0">
      <div class="demo-grid">
        <Badge variant="solid" color="primary">Solid</Badge>
        <Badge variant="outline" color="primary">Outline</Badge>
        <Badge variant="soft" color="primary">Soft</Badge>
        <Badge variant="subtle" color="primary">Subtle</Badge>
        <Badge variant="soft" color="primary" dot>With Dot</Badge>
      </div>
      <div class="demo-grid mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <Badge variant="subtle" color="neutral">Neutral</Badge>
        <Badge variant="soft" color="success" dot>Operational</Badge>
        <Badge variant="soft" color="warning" dot>Degraded</Badge>
        <Badge variant="soft" color="error" dot>Outage</Badge>
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="badge" />
  </div>
</template>

<script setup lang="ts">
const rcCode0 = `<div class="demo-grid">
  <Badge variant="solid" color="primary">Solid</Badge>
  <Badge variant="outline" color="primary">Outline</Badge>
  <Badge variant="soft" color="primary">Soft</Badge>
  <Badge variant="subtle" color="primary">Subtle</Badge>
  <Badge variant="soft" color="primary" dot>With Dot</Badge>
</div>
<div class="demo-grid mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
  <Badge variant="subtle" color="neutral">Neutral</Badge>
  <Badge variant="soft" color="success" dot>Operational</Badge>
  <Badge variant="soft" color="warning" dot>Degraded</Badge>
  <Badge variant="soft" color="error" dot>Outage</Badge>
</div>`


const apiRows = [ { name: 'variant', type: "'solid' | 'outline' | 'soft' | 'subtle'", default: 'soft', description: '视觉变体。' },
  { name: 'color', type: "'primary' | 'neutral' | 'success' | 'warning' | 'error'", default: 'primary', description: '语义色。' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg'", default: 'sm', description: '字号与内边距。' },
  { name: 'dot', type: 'boolean', default: 'false', description: '左侧状态呼吸圆点。' } ]
</script>
