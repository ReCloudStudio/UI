<template>
  <div class="space-y-10">
    <DocPageHeader title="CommandPalette 命令面板" description="面向开发者工具的全局导航与操作入口；支持分组、模糊检索、键盘导航与可选快捷键。" />

    <DocExample title="命令与导航" description="按下 Ctrl/⌘ K 或点击按钮，使用方向键和 Enter 选择命令。" :code="rcCode0">
      <Button @click="open = true">打开命令面板 <Kbd class="ml-2">⌘ K</Kbd></Button>
      <CommandPalette v-model:open="open" :groups="groups" shortcut="mod+k" @select="selectCommand" />
      <p v-if="selected" class="mt-3 text-xs text-slate-500 dark:text-slate-400">最近选择：{{ selected }}</p>
    </DocExample>

    <DocApiTable :rows="apiRows" />
    <DocPageNav name="command-palette" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CommandGroup, CommandItem } from '@recloudstudio/ui'

const open = ref(false)
const selected = ref('')

const groups: CommandGroup[] = [
  {
    heading: '导航',
    items: [
      { id: 'dashboard', label: '前往仪表盘', description: '查看服务总览', keywords: ['home', 'dashboard'], shortcut: ['G', 'D'] },
      { id: 'webhooks', label: '管理 Webhooks', description: '查看投递和规则', keywords: ['events', 'hooks'], shortcut: ['G', 'W'] }
    ]
  },
  {
    heading: '操作',
    items: [
      { id: 'new-webhook', label: '新建 Webhook', description: '创建新的事件投递规则', shortcut: ['C'] },
      { id: 'refresh', label: '刷新数据', description: '重新获取当前页面数据', shortcut: ['R'], keepOpen: true },
      { id: 'disabled', label: '维护中操作', disabled: true }
    ]
  }
]

function selectCommand(item: CommandItem) {
  selected.value = item.label
}

const rcCode0 = `<script setup lang="ts">
import { ref } from 'vue'
import type { CommandGroup, CommandItem } from '@recloudstudio/ui'

const open = ref(false)
const groups: CommandGroup[] = [{
  heading: '操作',
  items: [{ id: 'refresh', label: '刷新数据', shortcut: ['R'] }]
}]

function selectCommand(item: CommandItem) {
  refreshData()
}
<\/script>

<template>
  <Button @click="open = true">打开命令面板</Button>
  <CommandPalette
    v-model:open="open"
    :groups="groups"
    shortcut="mod+k"
    @select="selectCommand"
  />
<\/template>`

const apiRows = [
  { name: 'groups', type: 'CommandGroup[]', default: '—', description: '分组命令数据；条目支持 id、label、description、keywords、shortcut、icon、disabled、keepOpen。' },
  { name: 'v-model:open', type: 'boolean', default: 'false', description: '控制命令面板开关。' },
  { name: 'v-model:query', type: 'string', default: '—', description: '可选的受控查询文本。' },
  { name: 'shortcut', type: 'string', default: '—', description: '可选全局快捷键，如 mod+k、shift+mod+p。' },
  { name: 'filter', type: '(items, query) => CommandItem[]', default: '内置模糊匹配', description: '替换检索与排序策略。' },
  { name: 'select', type: '(item: CommandItem) => void', default: '—', description: '选择非禁用命令时触发。' }
]
</script>
