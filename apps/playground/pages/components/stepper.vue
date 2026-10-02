<template>
  <div class="space-y-10">
    <DocPageHeader title="Stepper 步骤条" description="多步流程进度指示：当前步高亮、已完成打勾、支持点击跳步。" />

    <DocExample title="部署向导" description="第 {{ step }} 步 / 共 4 步；linear 模式下必须按序完成。" :code="rcCode0">
      <Stepper v-model="step" :steps="[
        { step: 1, title: '基础信息' },
        { step: 2, title: '网络拓扑' },
        { step: 3, title: '安全策略' },
        { step: 4, title: '确认部署' }
      ]" />
      <div class="mt-5 flex justify-end gap-2">
        <Button variant="outline" color="neutral" size="sm" :disabled="step <= 1" @click="step--">上一步</Button>
        <Button variant="solid" color="primary" size="sm" :disabled="step >= 4" @click="step++">下一步</Button>
      </div>
    </DocExample>

    <DocExample title="纵向布局" description="orientation=vertical 适合侧栏流程。" :code="rcCode1">
      <Stepper :model-value="2" orientation="vertical" :steps="[
        { step: 1, title: '提交申请', description: '已创建工单 #4821' },
        { step: 2, title: '资源审批', description: '等待配额组确认' },
        { step: 3, title: '节点交付' }
      ]" />
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="stepper" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const step = ref(2)

const rcCode0 = `<Stepper v-model="step" :steps="[
  { step: 1, title: '基础信息' },
  { step: 2, title: '网络拓扑' },
  { step: 3, title: '安全策略' },
  { step: 4, title: '确认部署' }
]" />
<div class="mt-5 flex justify-end gap-2">
  <Button variant="outline" color="neutral" size="sm" :disabled="step <= 1" @click="step--">上一步</Button>
  <Button variant="solid" color="primary" size="sm" :disabled="step >= 4" @click="step++">下一步</Button>
</div>`

const rcCode1 = `<Stepper :model-value="2" orientation="vertical" :steps="[
  { step: 1, title: '提交申请', description: '已创建工单 #4821' },
  { step: 2, title: '资源审批', description: '等待配额组确认' },
  { step: 3, title: '节点交付' }
]" />`


const apiRows = [ { name: 'model-value', type: 'number', default: '1', description: 'v-model 当前步骤号。' },
  { name: 'steps', type: '{ step, title, description?, completed?, disabled? }[]', default: '—', description: '步骤定义。' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: 'horizontal', description: '排布方向。' },
  { name: 'linear', type: 'boolean', default: 'false', description: '强制按序进行。' } ]
</script>
