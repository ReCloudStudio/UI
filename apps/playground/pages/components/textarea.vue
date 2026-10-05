<template>
  <div class="space-y-10">
    <PageHeader title="Textarea 文本域" description="多行文本输入，与 Input 共享标签与错误态体系。" />

    <ComponentExample title="基础" description="rows 控制初始高度。" :code="rcCode0">
      <Textarea v-model="val" label="服务注释" placeholder="补充集群用途、负责人与回滚方案…" hint="最多 500 字" :rows="4" />
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="textarea" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const val = ref('用于承载 ReCloud Studio 生产环境前端网关集群。')

const rcCode0 = `<Textarea v-model="val" label="服务注释" placeholder="补充集群用途、负责人与回滚方案…" hint="最多 500 字" :rows="4" />`


const apiRows = [ { name: 'model-value', type: 'string', default: '—', description: 'v-model 绑定值。' },
  { name: 'rows', type: 'number', default: '4', description: '初始行数。' },
  { name: 'label / hint / error', type: 'string', default: '—', description: '同 Input。' },
  { name: 'disabled / readonly / required', type: 'boolean', default: 'false', description: '状态控制。' } ]
</script>
