<template>
  <div class="space-y-10">
    <DocPageHeader title="Input 输入框" description="带标签、提示文案与错误态的文本输入；标签、说明和错误状态会自动关联至原生控件。" />

    <DocExample title="基础用法" description="hint 与 error 互斥，error 时环线转为红色。" :code="rcCode0">
      <div class="grid gap-5 sm:grid-cols-2">
        <Input v-model="text" label="集群标识符" placeholder="请输入节点名称…" hint="由小写字母、数字及横线组成" />
        <Input v-model="err" label="API 端点" error="该端点未通过 TLS 证书校验" />
      </div>
    </DocExample>

    <DocExample title="尺寸与前后缀" description="leading / trailing 插槽嵌入图标与单位。" :code="rcCode1">
      <div class="grid gap-5 sm:grid-cols-2">
        <Input v-model="s1" size="sm" placeholder="Small" />
        <Input v-model="s2" size="lg" placeholder="Large" />
        <Input v-model="s3" placeholder="gateway.recloud.studio">
          <template #leading><span class="pl-3 text-slate-400 text-sm">https://</span></template>
        </Input>
        <Input v-model="s4" placeholder="搜索节点…" disabled />
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="input" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const text = ref('')
const err = ref('edge-http://insecure')
const s1 = ref('')
const s2 = ref('')
const s3 = ref('')
const s4 = ref('')

const rcCode0 = `<div class="grid gap-5 sm:grid-cols-2">
  <Input v-model="text" label="集群标识符" placeholder="请输入节点名称…" hint="由小写字母、数字及横线组成" />
  <Input v-model="err" label="API 端点" error="该端点未通过 TLS 证书校验" />
</div>`

const rcCode1 = `<div class="grid gap-5 sm:grid-cols-2">
  <Input v-model="s1" size="sm" placeholder="Small" />
  <Input v-model="s2" size="lg" placeholder="Large" />
  <Input v-model="s3" placeholder="gateway.recloud.studio">
    <template #leading><span class="pl-3 text-slate-400 text-sm">https://</span></template>
  </Input>
  <Input v-model="s4" placeholder="搜索节点…" disabled />
</div>`


const apiRows = [ { name: 'model-value', type: 'string | number', default: '—', description: 'v-model 绑定值。' },
  { name: 'id', type: 'string', default: '自动生成', description: '原生控件 ID，可用于稳定 SSR 输出。' },
  { name: 'label / hint / error', type: 'string', default: '—', description: '标签、说明与错误文案，会自动关联至控件。' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: 'md', description: '36 / 40 / 44px 高度。' },
  { name: 'type', type: 'string', default: 'text', description: '原生 input 类型。' },
  { name: 'disabled / readonly / required', type: 'boolean', default: 'false', description: '状态控制。' },
  { name: 'leading / trailing', type: 'slot', default: '—', description: '框内前后缀。' } ]
</script>
