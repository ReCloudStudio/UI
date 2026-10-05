<template>
  <div class="space-y-10">
    <PageHeader title="Slider 滑块" description="单值或区间滑动输入，键盘方向键可调，焦点光环清晰。" />

    <ComponentExample title="单值与区间" description="modelValue 传数组即进入双柄区间模式。" :code="rcCode0">
      <div class="space-y-5 max-w-md">
        <div>
          <Label>带宽上限 · {{ cap }}%</Label>
          <Slider v-model="cap" :min="0" :max="100" class="mt-3 pr-2" />
        </div>
        <div>
          <Label>延迟区间 · {{ range[0] }}–{{ range[1] }} ms</Label>
          <Slider v-model="range" :min="10" :max="200" class="mt-3 pr-2" />
        </div>
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="slider" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const cap = ref(64)
const range = ref([40, 120])

const rcCode0 = `<div class="space-y-5 max-w-md">
  <div>
    <Label>带宽上限 · {{ cap }}%</Label>
    <Slider v-model="cap" :min="0" :max="100" class="mt-3 pr-2" />
  </div>
  <div>
    <Label>延迟区间 · {{ range[0] }}–{{ range[1] }} ms</Label>
    <Slider v-model="range" :min="10" :max="200" class="mt-3 pr-2" />
  </div>
</div>`


const apiRows = [ { name: 'model-value', type: 'number | number[]', default: '0', description: 'v-model；数组为区间模式。' },
  { name: 'min / max / step', type: 'number', default: '0 / 100 / 1', description: '数值范围。' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: 'horizontal', description: '方向。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '禁用。' } ]
</script>
