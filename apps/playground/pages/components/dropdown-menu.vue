<template>
  <div class="space-y-10">
    <PageHeader title="DropdownMenu 下拉菜单" description="操作菜单：图标、快捷键提示、分隔线与破坏性项，全键盘可达。" />

    <ComponentExample title="实例操作" description="items 数组声明式定义，separator 项仅渲染分隔线。" :code="rcCode0">
      <DropdownMenu :items="[
        { label: '查看拓扑分析', onSelect: () => toast({ title: '导航至拓扑分析视图' }) },
        { label: '复制连接字符串', onSelect: () => toast({ title: '已复制凭证至剪贴板', variant: 'success' }) },
        { separator: true },
        { label: '删除该实例', destructive: true, onSelect: () => toast({ title: '实例已终止', variant: 'destructive' }) }
      ]">
        <template #trigger>
          <Button variant="outline" color="neutral">选项菜单</Button>
        </template>
      </DropdownMenu>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="dropdown-menu" />
  </div>
</template>

<script setup lang="ts">
import { useToast } from '@recloudstudio/ui'
const { toast } = useToast()

const rcCode0 = `<DropdownMenu :items="[
  { label: '查看拓扑分析', onSelect: () => toast({ title: '导航至拓扑分析视图' }) },
  { label: '复制连接字符串', onSelect: () => toast({ title: '已复制凭证至剪贴板', variant: 'success' }) },
  { separator: true },
  { label: '删除该实例', destructive: true, onSelect: () => toast({ title: '实例已终止', variant: 'destructive' }) }
]">
  <template #trigger>
    <Button variant="outline" color="neutral">选项菜单</Button>
  </template>
</DropdownMenu>`


const apiRows = [ { name: 'items', type: '{ label, icon?, disabled?, destructive?, separator?, onSelect? }[]', default: '—', description: '菜单项。' },
  { name: 'side-offset', type: 'number', default: '4', description: '浮层偏移。' },
  { name: 'trigger', type: 'slot', default: '—', description: '触发元素。' } ]
</script>
