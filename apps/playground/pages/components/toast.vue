<template>
  <div class="space-y-10">
    <PageHeader title="Toast 吐司提示" description="全局操作反馈队列：四类语义样式、自动堆叠与滑出动画。" />

    <ComponentExample title="触发反馈" description="toast(options) 由 useToast 提供，需在应用根部挂载 ToastProvider。" :code="rcCode0">
      <div class="demo-grid">
        <Button variant="soft" color="neutral" @click="fire('信息提示', 'info')">Info</Button>
        <Button variant="soft" color="success" @click="fire('操作已成功执行', 'success')">Success</Button>
        <Button variant="soft" color="warning" @click="fire('检测到配置预警', 'warning')">Warning</Button>
        <Button variant="soft" color="error" @click="fire('实例终止失败', 'destructive')">Destructive</Button>
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="toast" />
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@recloudstudio/ui'
const { toast } = useToast()
function fire(title: string, variant: 'info' | 'success' | 'warning' | 'destructive' = 'info') {
  toast({ title, description: `触发于 ${new Date().toLocaleTimeString()}`, variant })
}

const rcCode0 = `<div class="demo-grid">
  <Button variant="soft" color="neutral" @click="fire('信息提示', 'info')">Info</Button>
  <Button variant="soft" color="success" @click="fire('操作已成功执行', 'success')">Success</Button>
  <Button variant="soft" color="warning" @click="fire('检测到配置预警', 'warning')">Warning</Button>
  <Button variant="soft" color="error" @click="fire('实例终止失败', 'destructive')">Destructive</Button>
</div>`


const apiRows = [ { name: 'ToastProvider', type: 'component', default: '—', description: '队列容器（挂一次即可）。' },
  { name: 'useToast()', type: 'composable', default: '—', description: '返回 { toast, dismiss }。' },
  { name: 'options.title / description', type: 'string', default: '—', description: '标题与说明。' },
  { name: 'options.variant', type: "'info' | 'success' | 'warning' | 'destructive'", default: 'info', description: '语义样式。' },
  { name: 'options.duration', type: 'number', default: '4500', description: '自动关闭毫秒数。' } ]
</script>
