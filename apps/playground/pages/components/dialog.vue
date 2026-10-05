<template>
  <div class="space-y-10">
    <PageHeader title="Dialog 对话框" description="模态弹层：遮罩模糊、焦点圈闭与 Esc 关闭，支持 header/footer 结构插槽。" />

    <ComponentExample title="表单弹层" description="trigger 插槽或受控 open 均可。" :code="rcCode0">
      <Button variant="solid" color="primary" @click="open = true">打开对话框</Button>
      <Dialog v-model:open="open" title="配置虚拟网络网段" description="更新当前 VPC 的 CIDR 规则，此操作将同步至边界安全网关。">
        <div class="space-y-3 py-1">
          <Input placeholder="10.0.0.0/16" label="目标 CIDR 网段" />
          <Banner color="warning" title="路由警告">变更可能导致活跃的持久长连接短暂重连。</Banner>
        </div>
        <template #footer>
          <Button variant="outline" color="neutral" @click="open = false">取消</Button>
          <Button variant="solid" color="primary" @click="open = false">确认应用</Button>
        </template>
      </Dialog>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="dialog" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)

const rcCode0 = `<Button variant="solid" color="primary" @click="open = true">打开对话框</Button>
<Dialog v-model:open="open" title="配置虚拟网络网段" description="更新当前 VPC 的 CIDR 规则，此操作将同步至边界安全网关。">
  <div class="space-y-3 py-1">
    <Input placeholder="10.0.0.0/16" label="目标 CIDR 网段" />
    <Banner color="warning" title="路由警告">变更可能导致活跃的持久长连接短暂重连。</Banner>
  </div>
  <template #footer>
    <Button variant="outline" color="neutral" @click="open = false">取消</Button>
    <Button variant="solid" color="primary" @click="open = false">确认应用</Button>
  </template>
</Dialog>`


const apiRows = [ { name: 'open', type: 'boolean', default: 'false', description: 'v-model:open 受控展开。' },
  { name: 'title / description', type: 'string', default: '—', description: '头部文案。' },
  { name: 'trigger / header / footer', type: 'slot', default: '—', description: '结构插槽。' } ]
</script>
