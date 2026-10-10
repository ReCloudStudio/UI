<template>
  <div class="space-y-10">
    <PageHeader
      title="LogViewer 日志查看器"
      description="专为云原生容器集群、CI/CD 构建流水线与函数执行监控打造的终端日志流查看器，支持日志级别着色、行号、关键字过滤与自动跟随滚屏。"
    />

    <ComponentExample
      title="控制台运维日志"
      description="包含时间戳、INFO / WARN / ERROR 状态级别标记、过滤搜索与自动跟踪滚屏（Follow）。"
      :code="codeLogs"
    >
      <div class="space-y-4">
        <div class="flex items-center gap-2">
          <Button size="xs" variant="solid" color="primary" @click="appendLog">追加日志行</Button>
          <Button size="xs" variant="ghost" color="neutral" @click="clearLogs">清空</Button>
        </div>
        <LogViewer
          :logs="sampleLogs"
          title="pod-worker-ingress-7b4c8f"
          height="16rem"
          show-line-numbers
          show-timestamps
          searchable
          copyable
          auto-scroll
        />
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="log-viewer" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, LogViewer } from '@recloudstudio/ui'
import type { LogEntry } from '@recloudstudio/ui'

const sampleLogs = ref<LogEntry[]>([
  { timestamp: '14:22:01.102', level: 'info', message: 'Starting application server on port :8080 (release mode)' },
  { timestamp: '14:22:01.320', level: 'info', message: 'Connecting to cluster Redis master redis-cluster-node-0.internal...' },
  { timestamp: '14:22:01.488', level: 'info', message: 'Database connection pool initialized (min=5, max=50)' },
  { timestamp: '14:22:02.012', level: 'warn', message: 'High query latency detected on replica node 3: 420ms' },
  { timestamp: '14:22:03.119', level: 'debug', message: 'Healthcheck heartbeat probe ACK received (latency=2ms)' },
  { timestamp: '14:22:04.550', level: 'error', message: 'Upstream gateway timed out: HTTP 504 Gateway Timeout while proxying request' },
  { timestamp: '14:22:04.601', level: 'info', message: 'Retrying transaction with backoff multiplier (attempt 1/3)...' },
  { timestamp: '14:22:05.120', level: 'info', message: 'Transaction recovered successfully in 519ms' }
])

let counter = 1
function appendLog() {
  const now = new Date().toTimeString().split(' ')[0] + '.' + Math.floor(Math.random() * 900 + 100)
  sampleLogs.value.push({
    timestamp: now,
    level: Math.random() > 0.8 ? 'warn' : 'info',
    message: `[Event ${counter++}] Processed batch webhook payload successfully from edge gateway`
  })
}

function clearLogs() {
  sampleLogs.value = []
}

const codeLogs = `<LogViewer
  :logs="sampleLogs"
  title="pod-worker-ingress-7b4c8f"
  height="16rem"
  show-line-numbers
  show-timestamps
  searchable
  copyable
  auto-scroll
/>`

const apiRows = [
  {
    name: 'logs',
    type: 'string[] | LogEntry[]',
    default: '[]',
    description: '日志列表，支持字符串数组或带 level、timestamp 的 LogEntry 对象数组。'
  },
  {
    name: 'title',
    type: 'string',
    default: "'Console Logs'",
    description: '顶部标题，或通过 #title 自定义插槽覆盖。'
  },
  {
    name: 'height',
    type: 'string',
    default: "'20rem'",
    description: '日志视口容器高度。'
  },
  {
    name: 'showLineNumbers',
    type: 'boolean',
    default: 'true',
    description: '是否显示等宽排版行号。'
  },
  {
    name: 'showTimestamps',
    type: 'boolean',
    default: 'false',
    description: '是否显示时间戳列。'
  },
  {
    name: 'searchable',
    type: 'boolean',
    default: 'true',
    description: '是否展示日志关键字过滤搜索框。'
  },
  {
    name: 'copyable',
    type: 'boolean',
    default: 'true',
    description: '是否提供一键复制全文操作。'
  },
  {
    name: 'autoScroll',
    type: 'boolean',
    default: 'true',
    description: '是否启用 Follow 尾部自动滚动模式。'
  },
  {
    name: 'wrap',
    type: 'boolean',
    default: 'false',
    description: '是否强制换行折行显示（默认开启横向滚动）。'
  }
]
</script>
