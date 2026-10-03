<template>
  <div class="space-y-10">
    <DocPageHeader title="Rating 评分" description="星级评分，支持只读展示与语义色。" />

    <DocExample title="交互与只读" description="点击任一星级会连续填充此前所有星标，支持方向键调整。" :code="rcCode0">
      <div class="flex items-center gap-6">
        <div class="space-y-1">
          <Rating v-model="val" />
          <p class="text-xs text-slate-500 dark:text-slate-400">当前 {{ val }} / 5</p>
        </div>
        <div class="space-y-1">
          <Rating :model-value="4" color="warning" readonly />
          <p class="text-xs text-slate-500 dark:text-slate-400">客户满意度（只读）</p>
        </div>
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="rating" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const val = ref(4)

const rcCode0 = `<div class="flex items-center gap-6">
  <div class="space-y-1">
    <Rating v-model="val" />
    <p class="text-xs text-slate-500 dark:text-slate-400">当前 {{ val }} / 5</p>
  </div>
  <div class="space-y-1">
    <Rating :model-value="4" color="warning" readonly />
    <p class="text-xs text-slate-500 dark:text-slate-400">客户满意度（只读）</p>
  </div>
</div>`


const apiRows = [ { name: 'model-value', type: 'number', default: '0', description: 'v-model 分值。' },
  { name: 'length', type: 'number', default: '5', description: '星数。' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '星标尺寸。' },
  { name: 'color', type: "'primary' | 'warning' | 'neutral'", default: 'primary', description: '填充色。' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '只读展示。' } ]
</script>
