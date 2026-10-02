<template>
  <div class="space-y-10">
    <DocPageHeader title="Label 标签" description="与表单控件关联的无障碍标签，required 自动追加红色星号。" />

    <DocExample title="基础" description="for 绑定控件 id，点击聚焦。" :code="rcCode0">
      <div class="flex items-center gap-3 max-w-xs">
        <Label for="api-key" required>API Key</Label>
        <Input id="api-key" v-model="key" class="flex-1" placeholder="rc_live_…" />
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="label" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const key = ref('')

const rcCode0 = `<div class="flex items-center gap-3 max-w-xs">
  <Label for="api-key" required>API Key</Label>
  <Input id="api-key" v-model="key" class="flex-1" placeholder="rc_live_…" />
</div>`


const apiRows = [ { name: 'for', type: 'string', default: '—', description: '关联控件 id。' },
  { name: 'required', type: 'boolean', default: 'false', description: '显示必填星号。' } ]
</script>
