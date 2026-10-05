<template>
  <div class="space-y-10">
    <PageHeader title="MultiSelect 多选" description="为告警渠道、区域、标签与成员分配提供可搜索、多标签的选择体验。" />

    <ComponentExample title="按区域筛选节点" description="已选项显示为可移除标签；可输入过滤、从分组选项中多选，或一键清除。" :code="rcCode0">
      <MultiSelect v-model="regions" :options="options" label="部署区域" hint="至少选择一个可用区域" placeholder="搜索区域…" />
      <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">已选择：{{ regions.length ? regions.join('、') : '无' }}</p>
    </ComponentExample>

    <ComponentExample title="禁用与校验状态" description="继承 Field 的标签、提示、必填和错误信息能力。" :code="rcCode1">
      <MultiSelect v-model="reviewers" :options="reviewerOptions" label="变更审批人" error="至少指定一位审批人" required />
    </ComponentExample>

    <ApiTable :rows="apiRows" />
    <DocPageNav name="multi-select" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const regions = ref(['hkg', 'nrt'])
const reviewers = ref<string[]>([])
const options = [
  { label: '中国香港 · HKG', value: 'hkg', group: '亚太' },
  { label: '日本东京 · NRT', value: 'nrt', group: '亚太' },
  { label: '德国法兰克福 · FRA', value: 'fra', group: '欧洲' },
  { label: '美国硅谷 · SJC', value: 'sjc', group: '美洲', disabled: true }
]
const reviewerOptions = [{ label: 'Lin Chen', value: 'lin' }, { label: 'Mira Wang', value: 'mira' }]
const rcCode0 = `<MultiSelect
  v-model="regions"
  :options="options"
  label="部署区域"
  placeholder="搜索区域…"
/>`
const rcCode1 = `<MultiSelect
  v-model="reviewers"
  :options="reviewerOptions"
  label="变更审批人"
  error="至少指定一位审批人"
  required
/>`
const apiRows = [
  { name: 'v-model', type: 'string[]', default: '[]', description: '已选选项值的受控数组。' },
  { name: 'options', type: '{ label, value, group?, disabled? }[]', default: '—', description: '支持分组和禁用状态的选项数据。' },
  { name: 'placeholder / emptyText', type: 'string', default: "'搜索并选择...' / '无匹配项'", description: '搜索输入与空结果文案。' },
  { name: 'clearable', type: 'boolean', default: 'true', description: '显示清除全部已选项的按钮。' },
  { name: 'label / hint / error / required', type: 'string / boolean', default: '—', description: '继承 Field 的表单语义与校验呈现。' },
  { name: 'clear', type: 'event', default: '—', description: '用户清除所有已选项时触发。' }
]
</script>
