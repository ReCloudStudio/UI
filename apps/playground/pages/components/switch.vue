<template>
  <div class="space-y-10">
    <PageHeader title="Switch 开关" description="即时生效的切换开关，适合配置项的启停控制。" />

    <ComponentExample title="尺寸与状态" :code="rcCode0">
      <div class="flex flex-wrap items-center gap-6">
        <Switch v-model="on" size="sm" label="紧凑开关" />
        <Switch v-model="on" label="标准开关" />
        <Switch v-model="on" size="lg" label="宽松开关" />
        <Switch :model-value="true" disabled label="强制开启" />
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="switch" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const on = ref(true)

const rcCode0 = `<div class="flex flex-wrap items-center gap-6">
  <Switch v-model="on" size="sm" label="紧凑开关" />
  <Switch v-model="on" label="标准开关" />
  <Switch v-model="on" size="lg" label="宽松开关" />
  <Switch :model-value="true" disabled label="强制开启" />
</div>`


const apiRows = [ { name: 'model-value', type: 'boolean', default: 'false', description: 'v-model 开启态。' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '轨道尺寸。' },
  { name: 'label', type: 'string', default: '—', description: '关联文本。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '禁用。' } ]
</script>
