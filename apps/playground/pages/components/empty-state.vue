<template>
  <div class="space-y-10">
    <DocPageHeader title="EmptyState 空状态" description="空数据页面的引导容器：图标、标题、描述与操作区。" />

    <DocExample title="基础" description="icon 插槽与默认操作区插槽。" :code="rcCode0">
      <EmptyState title="暂无待处理告警" description="新的网络事件和可用性告警将在这里出现。" class="py-7">
        <template #icon><BrandLogo :size="20" /></template>
        <Button size="sm" variant="outline" color="neutral">查看事件中心</Button>
      </EmptyState>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="empty-state" />
  </div>
</template>

<script setup lang="ts">
import { BrandLogo } from '@recloudstudio/ui/icons'

const rcCode0 = `<EmptyState title="暂无待处理告警" description="新的网络事件和可用性告警将在这里出现。" class="py-7">
  <template #icon><BrandLogo :size="20" /></template>
  <Button size="sm" variant="outline" color="neutral">查看事件中心</Button>
</EmptyState>`


const apiRows = [ { name: 'title', type: 'string', required: true, description: '主标题。' },
  { name: 'description', type: 'string', default: '—', description: '辅助说明。' },
  { name: 'icon', type: 'slot', default: '—', description: '顶部图标区。' },
  { name: 'default', type: 'slot', default: '—', description: '底部操作按钮。' } ]
</script>
