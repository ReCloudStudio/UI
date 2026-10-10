<template>
  <div class="space-y-10">
    <PageHeader
      title="StatusBadge 状态徽章"
      description="面向控制台服务治理、任务管道、容器节点与资源巡检的语义化状态标识，内置状态圆点与呼吸动效。"
    />

    <ComponentExample
      title="核心状态语义"
      description="支持 online、offline、degraded、pending、info 与 neutral 预设语义。"
      :code="codePresets"
    >
      <div class="flex flex-wrap gap-3">
        <StatusBadge status="online" />
        <StatusBadge status="pending" />
        <StatusBadge status="degraded" />
        <StatusBadge status="offline" />
        <StatusBadge status="info" />
        <StatusBadge status="neutral" />
      </div>
    </ComponentExample>

    <ComponentExample
      title="视觉变体与自定义文案"
      description="支持 subtle、soft、outline、solid 四种层级，并可覆盖展示文本或关闭圆点。"
      :code="codeVariants"
    >
      <div class="space-y-3">
        <div class="flex flex-wrap items-center gap-3">
          <StatusBadge status="online" variant="subtle" label="Cluster Healthy" />
          <StatusBadge status="online" variant="soft" label="Cluster Healthy" />
          <StatusBadge status="online" variant="outline" label="Cluster Healthy" />
          <StatusBadge status="online" variant="solid" label="Cluster Healthy" />
        </div>
        <div class="flex flex-wrap items-center gap-3">
          <StatusBadge status="degraded" :dot="false" label="No Dot" />
          <StatusBadge status="offline" :pulse="true" label="Critical Alert" />
          <StatusBadge status="pending" size="xs" label="Deploying" />
          <StatusBadge status="pending" size="md" label="Deploying" />
          <StatusBadge status="pending" size="lg" label="Deploying" />
        </div>
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="status-badge" />
  </div>
</template>

<script setup lang="ts">
import { StatusBadge } from '@recloudstudio/ui'

const codePresets = `<div class="flex flex-wrap gap-3">
  <StatusBadge status="online" />
  <StatusBadge status="pending" />
  <StatusBadge status="degraded" />
  <StatusBadge status="offline" />
  <StatusBadge status="info" />
  <StatusBadge status="neutral" />
</div>`

const codeVariants = `<div class="flex flex-wrap items-center gap-3">
  <StatusBadge status="online" variant="subtle" label="Cluster Healthy" />
  <StatusBadge status="online" variant="soft" label="Cluster Healthy" />
  <StatusBadge status="online" variant="outline" label="Cluster Healthy" />
  <StatusBadge status="online" variant="solid" label="Cluster Healthy" />
</div>`

const apiRows = [
  {
    name: 'status',
    type: "'online' | 'offline' | 'degraded' | 'pending' | 'info' | 'neutral'",
    default: "'online'",
    description: '核心状态语义。'
  },
  {
    name: 'label',
    type: 'string',
    default: "''",
    description: '自定义展示文本。缺省使用状态内置英文标识。'
  },
  {
    name: 'variant',
    type: "'subtle' | 'soft' | 'outline' | 'solid'",
    default: "'subtle'",
    description: '视觉层级变体。'
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg'",
    default: "'sm'",
    description: '尺寸规格。'
  },
  {
    name: 'dot',
    type: 'boolean',
    default: 'true',
    description: '是否展示前置状态圆点。'
  },
  {
    name: 'pulse',
    type: 'boolean',
    default: 'undefined',
    description: '是否开启圆点呼吸动效。缺省对 online 与 pending 启用。'
  }
]
</script>
