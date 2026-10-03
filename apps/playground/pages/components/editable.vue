<template>
  <div class="space-y-10">
    <DocPageHeader title="Editable 行内编辑" description="点击即改的文本：虚线预览、进入编辑自动全选、Enter 提交 Esc 取消。" />

    <DocExample title="基础" description="失焦或取消恢复原值。" :code="rcCode0">
      <div class="flex items-center gap-3">
        <Editable v-model="name" placeholder="点击编辑集群名称" />
        <Badge variant="outline" color="neutral" size="xs">集群别名</Badge>
      </div>
      <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">当前值：{{ name || '（空）' }}</p>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="editable" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const name = ref('gateway-prod-east')

const rcCode0 = `<div class="flex items-center gap-3">
  <Editable v-model="name" placeholder="点击编辑集群名称" />
  <Badge variant="outline" color="neutral" size="xs">集群别名</Badge>
</div>
<p class="mt-3 text-xs text-slate-500 dark:text-slate-400">当前值：{{ name || '（空）' }}</p>`


const apiRows = [ { name: 'model-value', type: 'string', default: '—', description: 'v-model 文本。' },
  { name: 'placeholder', type: 'string', default: '点击编辑…', description: '空值占位。' },
  { name: 'disabled / readonly', type: 'boolean', default: 'false', description: '禁止编辑。' } ]
</script>
