<template>
  <div class="space-y-10">
    <DocPageHeader title="Checkbox 复选框" description="布尔复选项，勾选动画与焦点环线跟随品牌色。" />

    <DocExample title="状态" :code="rcCode0">
      <div class="flex flex-wrap items-center gap-6">
        <Checkbox v-model="checked" label="跨可用区冗余" />
        <Checkbox :model-value="true" disabled label="已锁定策略" />
        <Checkbox v-model="checked" disabled label="禁用未选" />
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="checkbox" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const checked = ref(true)

const rcCode0 = `<div class="flex flex-wrap items-center gap-6">
  <Checkbox v-model="checked" label="跨可用区冗余" />
  <Checkbox :model-value="true" disabled label="已锁定策略" />
  <Checkbox v-model="checked" disabled label="禁用未选" />
</div>`


const apiRows = [ { name: 'model-value', type: 'boolean', default: 'false', description: 'v-model 勾选态。' },
  { name: 'label', type: 'string', default: '—', description: '关联文本。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '禁用。' } ]
</script>
