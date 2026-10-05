<template>
  <div class="space-y-10">
    <PageHeader title="ContextMenu 右键菜单" description="在指定区域右键唤起的上下文操作菜单，与 DropdownMenu 共享 item 协议。" />

    <ComponentExample title="拓扑区域右键" description="默认插槽即右键触发区。" :code="rcCode0">
      <ContextMenu :items="[
        { label: '刷新拓扑', onSelect: () => toast({ title: '拓扑数据已刷新', variant: 'success' }) },
        { label: '导出配置', onSelect: () => toast({ title: '配置导出中…' }) },
        { separator: true },
        { label: '隔离节点', destructive: true, onSelect: () => toast({ title: '节点已隔离', variant: 'destructive' }) }
      ]">
        <div class="rounded-lg ring-1 ring-inset ring-slate-200 dark:ring-slate-800 bg-slate-50/70 dark:bg-slate-900/40 px-4 py-6 text-sm text-slate-500 dark:text-slate-400 select-none text-center">
          在此区域点击右键
        </div>
      </ContextMenu>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="context-menu" />
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@recloudstudio/ui'
const { toast } = useToast()

const rcCode0 = `<ContextMenu :items="[
  { label: '刷新拓扑', onSelect: () => toast({ title: '拓扑数据已刷新', variant: 'success' }) },
  { label: '导出配置', onSelect: () => toast({ title: '配置导出中…' }) },
  { separator: true },
  { label: '隔离节点', destructive: true, onSelect: () => toast({ title: '节点已隔离', variant: 'destructive' }) }
]">
  <div class="rounded-lg ring-1 ring-inset ring-slate-200 dark:ring-slate-800 bg-slate-50/70 dark:bg-slate-900/40 px-4 py-6 text-sm text-slate-500 dark:text-slate-400 select-none text-center">
    在此区域点击右键
  </div>
</ContextMenu>`


const apiRows = [ { name: 'items', type: '{ label, icon?, disabled?, destructive?, separator?, onSelect? }[]', default: '—', description: '菜单项。' },
  { name: 'default', type: 'slot', default: '—', description: '右键触发区域。' } ]
</script>
