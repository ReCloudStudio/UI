<template>
  <div class="space-y-10">
    <PageHeader title="Toggle / ToggleGroup" description="按压态工具按钮：单个开关与互斥分组两种形态。" />

    <ComponentExample title="Toggle 按钮组" description="pressed 状态反色，适合富文本工具栏。" :code="rcCode0">
      <div class="flex items-center gap-2">
        <Toggle v-model="left"><AlignLeft class="h-4 w-4" /></Toggle>
        <Toggle v-model="center"><AlignCenter class="h-4 w-4" /></Toggle>
        <Toggle v-model="right"><AlignRight class="h-4 w-4" /></Toggle>
        <Separator orientation="vertical" class="mx-1 h-6" />
        <Toggle v-model="bold" size="sm"><Bold class="h-3.5 w-3.5" /></Toggle>
        <Toggle v-model="italic" size="sm"><Italic class="h-3.5 w-3.5" /></Toggle>
      </div>
    </ComponentExample>

    <ComponentExample title="ToggleGroup 互斥分组" description="单值互斥，选中项浮起白底。" :code="rcCode1">
      <ToggleGroup v-model="view" :options="[
        { label: '网格', value: 'grid' },
        { label: '列表', value: 'list' },
        { label: '拓扑', value: 'topo' }
      ]" />
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="toggle" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic } from '@recloudstudio/ui/icons'
const left = ref(true)
const center = ref(false)
const right = ref(false)
const bold = ref(false)
const italic = ref(false)
const view = ref('grid')

const rcCode0 = `<div class="flex items-center gap-2">
  <Toggle v-model="left"><AlignLeft class="h-4 w-4" /></Toggle>
  <Toggle v-model="center"><AlignCenter class="h-4 w-4" /></Toggle>
  <Toggle v-model="right"><AlignRight class="h-4 w-4" /></Toggle>
  <Separator orientation="vertical" class="mx-1 h-6" />
  <Toggle v-model="bold" size="sm"><Bold class="h-3.5 w-3.5" /></Toggle>
  <Toggle v-model="italic" size="sm"><Italic class="h-3.5 w-3.5" /></Toggle>
</div>`

const rcCode1 = `<ToggleGroup v-model="view" :options="[
  { label: '网格', value: 'grid' },
  { label: '列表', value: 'list' },
  { label: '拓扑', value: 'topo' }
]" />`


const apiRows = [ { name: 'model-value (Toggle)', type: 'boolean', default: 'false', description: '按压态。' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '方形按钮尺寸。' },
  { name: 'model-value (ToggleGroup)', type: 'string', default: '—', description: '选中项 value。' },
  { name: 'options', type: '{ label, value, icon?, disabled? }[]', default: '—', description: '分组选项。' } ]
</script>
