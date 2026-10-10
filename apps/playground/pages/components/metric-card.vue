<template>
  <div class="space-y-10">
    <PageHeader
      title="MetricCard 统计卡片"
      description="专为云控制台、资源仪表盘与运营监控打造的核心指标卡片，集成数值统计、趋势波动分析、单位标注与加载骨架。"
    />

    <ComponentExample
      title="指标网格"
      description="组合展示吞吐量、响应延时、错误率和在线实例等典型指标。"
      :code="codeGrid"
    >
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="API 请求量"
          value="2,481,200"
          unit="reqs"
          delta="+14.2%"
          trend="up"
          delta-description="较上周"
        />
        <MetricCard
          title="平均响应耗时"
          value="42"
          unit="ms"
          delta="-8.4%"
          trend="down"
          delta-description="较上周"
        />
        <MetricCard
          title="系统异常率"
          value="0.04"
          unit="%"
          delta="+0.01%"
          trend="up"
          delta-description="较昨日"
        />
        <MetricCard
          title="活跃服务节点"
          value="128"
          unit="nodes"
          description="正常运行中"
          hoverable
        />
      </div>
    </ComponentExample>

    <ComponentExample
      title="加载态骨架"
      description="开启 loading 属性时展示平滑脉冲骨架屏。"
      :code="codeLoading"
    >
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MetricCard
          title="实时网络吞吐"
          value="1.24"
          unit="Gbps"
          loading
        />
        <MetricCard
          title="实时 CPU 使用率"
          value="38.5"
          unit="%"
          delta="+2.1%"
          trend="up"
          loading
        />
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="metric-card" />
  </div>
</template>

<script setup lang="ts">
import { MetricCard } from '@recloudstudio/ui'

const codeGrid = `<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
  <MetricCard
    title="API 请求量"
    value="2,481,200"
    unit="reqs"
    delta="+14.2%"
    trend="up"
    delta-description="较上周"
  />
  <MetricCard
    title="平均响应耗时"
    value="42"
    unit="ms"
    delta="-8.4%"
    trend="down"
    delta-description="较上周"
  />
  <MetricCard
    title="系统异常率"
    value="0.04"
    unit="%"
    delta="+0.01%"
    trend="up"
    delta-description="较昨日"
  />
  <MetricCard
    title="活跃服务节点"
    value="128"
    unit="nodes"
    description="正常运行中"
    hoverable
  />
</div>`

const codeLoading = `<MetricCard
  title="实时网络吞吐"
  value="1.24"
  unit="Gbps"
  loading
/>`

const apiRows = [
  {
    name: 'title',
    type: 'string',
    default: "''",
    description: '指标标题文本或通过 #title 插槽自定义。'
  },
  {
    name: 'value',
    type: 'string | number',
    default: "''",
    description: '核心指标数值，自动应用 tabular numbers。'
  },
  {
    name: 'unit',
    type: 'string',
    default: "''",
    description: '指标单位。'
  },
  {
    name: 'delta',
    type: 'string | number',
    default: "''",
    description: '波动变化幅度数值或文本。'
  },
  {
    name: 'trend',
    type: "'up' | 'down' | 'neutral'",
    default: 'undefined',
    description: '趋势方向，自动适配涨跌箭头与语义色彩。'
  },
  {
    name: 'deltaDescription',
    type: 'string',
    default: "''",
    description: '趋势对齐基准（如较上周）。'
  },
  {
    name: 'description',
    type: 'string',
    default: "''",
    description: '辅助说明文本。'
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: '是否展示加载占位骨架屏。'
  },
  {
    name: 'hoverable',
    type: 'boolean',
    default: 'false',
    description: '是否支持悬停高亮反馈。'
  }
]
</script>
