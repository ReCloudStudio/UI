<template>
  <div class="space-y-10">
    <DocPageHeader title="Card 卡片" description="控制台内容的标准容器：标题、描述、操作区与主体分割层级，内嵌环线取代厚重描边。" />

    <DocExample title="结构层级" description="header 的 action 插槽与 footer 分割线自动生成。" :code="rcCode0">
      <Card title="集群健康检查" description="过去 24 小时的可用性遥测" padding="md">
        <template #action><Badge color="success" variant="soft" dot>99.99%</Badge></template>
        <div class="space-y-2">
          <Progress :value="92" label="SLA 达成率" show-value />
          <p class="text-sm text-slate-600 dark:text-slate-400">128 个边缘节点中 2 个处于维护窗口，流量已自动旁路。</p>
        </div>
        <template #footer>
          <div class="flex justify-end gap-2">
            <Button size="sm" variant="ghost" color="neutral">稍后处理</Button>
            <Button size="sm" variant="solid" color="primary">查看拓扑</Button>
          </div>
        </template>
      </Card>
    </DocExample>

    <DocExample title="变体与交互" description="outline / soft / subtle 三种表面与 hoverable 微交互。" :code="rcCode1">
      <div class="grid gap-4 sm:grid-cols-3">
        <Card variant="outline" title="Outline" description="默认内嵌环线"><p class="text-sm text-slate-500 dark:text-slate-400">最通用的表面。</p></Card>
        <Card variant="soft" title="Soft" description="柔和底色"><p class="text-sm text-slate-500 dark:text-slate-400">用于嵌套层级。</p></Card>
        <Card variant="subtle" hoverable title="Hoverable" description="悬停抬升"><p class="text-sm text-slate-500 dark:text-slate-400">可点击的卡片入口。</p></Card>
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="card" />
  </div>
</template>

<script setup lang="ts">
const rcCode0 = `<Card title="集群健康检查" description="过去 24 小时的可用性遥测" padding="md">
  <template #action><Badge color="success" variant="soft" dot>99.99%</Badge></template>
  <div class="space-y-2">
    <Progress :value="92" label="SLA 达成率" show-value />
    <p class="text-sm text-slate-600 dark:text-slate-400">128 个边缘节点中 2 个处于维护窗口，流量已自动旁路。</p>
  </div>
  <template #footer>
    <div class="flex justify-end gap-2">
      <Button size="sm" variant="ghost" color="neutral">稍后处理</Button>
      <Button size="sm" variant="solid" color="primary">查看拓扑</Button>
    </div>
  </template>
</Card>`

const rcCode1 = `<div class="grid gap-4 sm:grid-cols-3">
  <Card variant="outline" title="Outline" description="默认内嵌环线"><p class="text-sm text-slate-500 dark:text-slate-400">最通用的表面。</p></Card>
  <Card variant="soft" title="Soft" description="柔和底色"><p class="text-sm text-slate-500 dark:text-slate-400">用于嵌套层级。</p></Card>
  <Card variant="subtle" hoverable title="Hoverable" description="悬停抬升"><p class="text-sm text-slate-500 dark:text-slate-400">可点击的卡片入口。</p></Card>
</div>`


const apiRows = [ { name: 'title / description', type: 'string', default: '—', description: '头部标题与副标题。' },
  { name: 'variant', type: "'outline' | 'soft' | 'subtle'", default: 'outline', description: '表面层级。' },
  { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", default: 'md', description: '主体内边距。' },
  { name: 'accent', type: 'boolean', default: 'false', description: '顶部品牌渐变强调条。' },
  { name: 'hoverable', type: 'boolean', default: 'false', description: '悬停时环线与阴影变化。' },
  { name: 'action / footer', type: 'slot', default: '—', description: '头部右侧操作 / 底部分割区。' } ]
</script>
