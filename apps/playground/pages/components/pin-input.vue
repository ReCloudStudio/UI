<template>
  <div class="space-y-10">
    <PageHeader title="PinInput 验证码" description="分段验证码 / OTP 输入，自动跳格与退格回退。" />

    <ComponentExample title="OTP 与掩码" description="otp 模式 6 位，mask 隐藏输入。" :code="rcCode0">
      <div class="flex flex-wrap items-end gap-8">
        <div class="space-y-2">
          <Label>短信验证码 (OTP)</Label>
          <PinInput v-model="otp" otp />
        </div>
        <div class="space-y-2">
          <Label>密钥掩码</Label>
          <PinInput v-model="masked" :length="4" mask />
        </div>
      </div>
      <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">OTP 值：{{ otp.join('') || '—' }}</p>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="pin-input" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const otp = ref<string[]>([])
const masked = ref<string[]>([])

const rcCode0 = `<div class="flex flex-wrap items-end gap-8">
  <div class="space-y-2">
    <Label>短信验证码 (OTP)</Label>
    <PinInput v-model="otp" otp />
  </div>
  <div class="space-y-2">
    <Label>密钥掩码</Label>
    <PinInput v-model="masked" :length="4" mask />
  </div>
</div>
<p class="mt-3 text-xs text-slate-500 dark:text-slate-400">OTP 值：{{ otp.join('') || '—' }}</p>`


const apiRows = [ { name: 'model-value', type: 'string[]', default: '[]', description: 'v-model 分段字符数组。' },
  { name: 'length', type: 'number', default: 'otp ? 6 : 4', description: '段数。' },
  { name: 'otp', type: 'boolean', default: 'false', description: 'OTP 模式（自动跳格、粘贴填充）。' },
  { name: 'mask', type: 'boolean', default: 'false', description: '掩码显示。' },
  { name: 'type', type: "'text' | 'number'", default: 'number', description: '输入字符集。' } ]
</script>
