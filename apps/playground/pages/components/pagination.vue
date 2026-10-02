<template>
  <div class="space-y-10">
    <DocPageHeader title="Pagination 分页" description="页码折叠窗口 + 前后翻页 + 汇总文案，v-model 双向绑定当前页。" />

    <DocExample title="基础" description="siblingCount 控制当前页两侧暴露页码数。" :code="rcCode0">
      <Pagination v-model="page" :total="128" :page-size="10" />
      <p class="mt-3 text-xs text-slate-400">第 {{ page }} / 13 页</p>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="pagination" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const page = ref(3)

const rcCode0 = `<Pagination v-model="page" :total="128" :page-size="10" />
<p class="mt-3 text-xs text-slate-400">第 {{ page }} / 13 页</p>`


const apiRows = [ { name: 'model-value', type: 'number', default: '1', description: 'v-model 当前页。' },
  { name: 'total', type: 'number', default: '0', description: '条目总数。' },
  { name: 'page-size', type: 'number', default: '10', description: '每页条数。' },
  { name: 'siblingCount', type: 'number', default: '1', description: '当前页两侧页码数。' },
  { name: 'showSummary', type: 'boolean', default: 'true', description: '底部汇总文案。' } ]
</script>
