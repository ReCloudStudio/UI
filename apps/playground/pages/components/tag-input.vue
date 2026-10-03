<template>
  <div class="space-y-10">
    <DocPageHeader title="TagInput 标签输入" description="将逗号分隔的文本转为可编辑、可删除的标签集合。" />

    <DocExample title="筛选值" description="输入后按 Enter、逗号或失焦即可添加；支持粘贴多个值。" :code="basicCode">
      <div class="max-w-xl space-y-3">
        <TagInput v-model="tags" label="筛选标签" placeholder="输入服务、地区或角色..." hint="支持 Enter、逗号与粘贴多个值。" />
        <p class="text-sm text-slate-500 dark:text-slate-400">当前值：{{ tags.join(', ') || '—' }}</p>
      </div>
    </DocExample>

    <DocExample title="自定义分隔符与数量限制" description="用多个分隔符接收批量角色 ID，并限制最多五项。" :code="advancedCode">
      <TagInput
        v-model="roleIds"
        label="Discord Role IDs"
        placeholder="输入角色 ID"
        :separator="[',', ';', '\n']"
        :max="5"
      />
    </DocExample>

    <DocApiTable :rows="apiRows" />
    <DocPageNav name="tag-input" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tags = ref(['生产环境', '香港'])
const roleIds = ref(['1234567890'])

const basicCode = `<TagInput
  v-model="tags"
  label="筛选标签"
  placeholder="输入服务、地区或角色..."
  hint="支持 Enter、逗号与粘贴多个值。"
/>`

const advancedCode = `<TagInput
  v-model="roleIds"
  label="Discord Role IDs"
  :separator="[',', ';', '\\n']"
  :max="5"
/>`

const apiRows = [
  { name: 'model-value', type: 'string[]', default: '[]', description: 'v-model 标签值数组。' },
  { name: 'placeholder', type: 'string', default: '输入标签...', description: '无标签时的输入提示。' },
  { name: 'separator', type: 'string | string[]', default: "','", description: '用于批量拆分输入和粘贴内容的分隔符。' },
  { name: 'unique', type: 'boolean', default: 'true', description: '是否忽略重复标签。' },
  { name: 'max', type: 'number', default: '—', description: '可添加标签的最大数量。' },
  { name: 'add-on-paste', type: 'boolean', default: 'true', description: '是否将粘贴内容按分隔符批量添加。' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '输入框尺寸。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '禁用添加和删除操作。' }
]
</script>
