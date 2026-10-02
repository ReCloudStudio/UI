<template>
  <div class="space-y-10">
    <DocPageHeader title="RadioGroup 单选组" description="带描述文本的选项组，支持纵向与横向排布。" />

    <DocExample title="调度策略选择" description="description 渲染在选项下方，disabled 项灰化。" :code="rcCode0">
      <RadioGroup v-model="mode" label="调度模式" :options="[
        { label: '自动就近接入', value: 'auto', description: '按实时网络质量选择最优边缘节点' },
        { label: '固定地域锁定', value: 'pinned', description: '始终使用指定地域节点' },
        { label: '自定义权重', value: 'custom', disabled: true }
      ]" />
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="radio-group" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const mode = ref('auto')

const rcCode0 = `<RadioGroup v-model="mode" label="调度模式" :options="[
  { label: '自动就近接入', value: 'auto', description: '按实时网络质量选择最优边缘节点' },
  { label: '固定地域锁定', value: 'pinned', description: '始终使用指定地域节点' },
  { label: '自定义权重', value: 'custom', disabled: true }
]" />`


const apiRows = [ { name: 'model-value', type: 'string', default: '—', description: 'v-model 选中值。' },
  { name: 'options', type: '{ label, value, description?, disabled? }[]', default: '—', description: '选项列表。' },
  { name: 'label', type: 'string', default: '—', description: '组标签。' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: 'vertical', description: '排布方向。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '整组禁用。' } ]
</script>
