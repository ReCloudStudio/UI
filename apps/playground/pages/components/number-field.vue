<template>
  <div class="space-y-10">
    <DocPageHeader title="NumberField 数字输入" description="带步进按钮的数字输入，支持边界与只读模式。" />

    <DocExample title="基础与尺寸" description="左右步进按钮，超界自动夹取。" :code="rcCode0">
      <div class="grid gap-5 sm:grid-cols-2 max-w-lg">
        <NumberField v-model="n1" label="节点数量" :min="1" :max="99" />
        <NumberField v-model="n2" label="批量步长" :min="0" :max="1000" :step="10" size="lg" />
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="number-field" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const n1 = ref(12)
const n2 = ref(50)

const rcCode0 = `<div class="grid gap-5 sm:grid-cols-2 max-w-lg">
  <NumberField v-model="n1" label="节点数量" :min="1" :max="99" />
  <NumberField v-model="n2" label="批量步长" :min="0" :max="1000" :step="10" size="lg" />
</div>`


const apiRows = [ { name: 'model-value', type: 'number', default: '0', description: 'v-model 数值。' },
  { name: 'min / max / step', type: 'number', default: '—', description: '边界与步长。' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '高度。' },
  { name: 'label', type: 'string', default: '—', description: '上方标签。' },
  { name: 'disabled / readonly', type: 'boolean', default: 'false', description: '状态控制。' } ]
</script>
