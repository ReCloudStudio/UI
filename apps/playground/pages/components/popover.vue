<template>
  <div class="space-y-10">
    <DocPageHeader title="Popover 浮层" description="轻量内容弹层：标题、关闭按钮与表单友好焦点管理。" />

    <DocExample title="限流设置" description="受控时 v-model:open。" :code="rcCode0">
      <Popover title="速率限制设置" show-close align="center">
        <template #trigger>
          <Button variant="outline" color="neutral">气泡面板</Button>
        </template>
        <p class="mb-2 text-sm text-slate-600 dark:text-slate-400">为当前网关分组配置全局限流规则，超出阈值的请求将返回 429。</p>
        <div class="flex items-center gap-2">
          <Badge variant="subtle" color="primary">RPS 10,000</Badge>
          <Badge variant="subtle" color="neutral">Burst 20,000</Badge>
        </div>
      </Popover>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="popover" />
  </div>
</template>

<script setup lang="ts">
const rcCode0 = `<Popover title="速率限制设置" show-close align="center">
  <template #trigger>
    <Button variant="outline" color="neutral">气泡面板</Button>
  </template>
  <p class="mb-2 text-sm text-slate-600 dark:text-slate-400">为当前网关分组配置全局限流规则，超出阈值的请求将返回 429。</p>
  <div class="flex items-center gap-2">
    <Badge variant="subtle" color="primary">RPS 10,000</Badge>
    <Badge variant="subtle" color="neutral">Burst 20,000</Badge>
  </div>
</Popover>`


const apiRows = [ { name: 'open', type: 'boolean', default: '—', description: 'v-model:open。' },
  { name: 'title', type: 'string', default: '—', description: '面板标题。' },
  { name: 'show-close', type: 'boolean', default: 'false', description: '右上角关闭按钮。' },
  { name: 'align', type: "'start' | 'center' | 'end'", default: 'center', description: '对齐方式。' } ]
</script>
