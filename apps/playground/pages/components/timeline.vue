<template>
  <div class="space-y-10">
    <DocPageHeader title="Timeline 时间线" description="以清晰的状态脉络呈现部署、审计操作和资源变更历史。" />
    <DocExample title="部署操作日志" description="内置成功、警告、失败和信息状态；支持操作者、时间、说明及元数据。" :code="rcCode0">
      <Timeline :items="deploymentEvents" class="max-w-2xl" />
    </DocExample>
    <DocExample title="自定义标记" description="通过 marker 插槽将时间线节点替换为版本号、头像或业务图标。" :code="rcCode1">
      <Timeline :items="releaseEvents" class="max-w-2xl">
        <template #marker="{ index }"><span class="text-[10px] font-bold">{{ index + 1 }}</span></template>
      </Timeline>
    </DocExample>
    <DocApiTable :rows="apiRows" />
    <DocPageNav name="timeline" />
  </div>
</template>

<script setup lang="ts">
const deploymentEvents = [
  { id: 'build', title: '构建已完成', description: '镜像 recloud/gateway:2026.04.18 已推送至生产仓库。', timestamp: '10:32', status: 'success', actor: 'CI Pipeline', metadata: 'sha: 7af19c2' },
  { id: 'review', title: '变更已批准', description: '生产环境策略检查通过，开始滚动部署。', timestamp: '10:35', status: 'info', actor: 'Lin Chen' },
  { id: 'rollback', title: '健康检查延迟升高', description: '一个实例未能在预期时间内就绪，系统继续观察。', timestamp: '10:38', status: 'warning', actor: 'Deploy Controller' }
]
const releaseEvents = [
  { id: 'v3', title: 'v3.8.0 发布', description: '加入速率限制策略和审计字段。', timestamp: '今天', status: 'success' },
  { id: 'v2', title: 'v3.7.0 发布', description: '优化集群节点同步。', timestamp: '上周', status: 'info' }
]
const rcCode0 = `<Timeline :items="deploymentEvents" />`
const rcCode1 = `<Timeline :items="releaseEvents">
  <template #marker="{ index }">{{ index + 1 }}</template>
</Timeline>`
const apiRows = [
  { name: 'items', type: 'TimelineItem[]', default: '—', description: '时间线项目：id、title、description?、timestamp?、status?、actor?、avatar?、metadata?。' },
  { name: 'status', type: "'default' | 'info' | 'success' | 'warning' | 'error'", default: "'default'", description: '决定节点标记的颜色和默认图标。' },
  { name: 'label', type: 'string', default: "'时间线'", description: '列表的无障碍标签。' },
  { name: 'marker', type: 'slot', default: '—', description: '自定义节点标记，接收 item 和 index。' },
  { name: 'details', type: 'slot', default: '—', description: '在操作者与元数据之后追加详情。' }
]
</script>
