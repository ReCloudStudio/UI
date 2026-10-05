<template>
  <div class="space-y-10">
    <PageHeader title="PrevNext 翻页导航" description="用于长篇指南、API 手册与教程底部的上下篇连续导航卡片。" />

    <ComponentExample title="基础双向导航" description="提供左右两侧卡片，支持上一篇与下一篇标题与描述。" :code="codeBasic">
      <div class="max-w-2xl">
        <PrevNext
          :prev="{ title: 'TreeView 树形视图', to: '/components/tree-view', description: '层级结构导航与资源树。' }"
          :next="{ title: 'Callout 提示块', to: '/components/callout', description: '多种语义状态的信息提示卡片。' }"
        />
      </div>
    </ComponentExample>

    <ComponentExample title="单侧导航（首末篇）" description="当只有上一篇或下一篇时，空缺侧保持布局优雅对齐。" :code="codeSingle">
      <div class="space-y-4 max-w-2xl">
        <PrevNext
          :next="{ title: '开始快速上手', to: '/components/steps' }"
          next-label="下一章"
        />
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />
    <DocPageNav name="prev-next" />
  </div>
</template>

<script setup lang="ts">
const codeBasic = `<PrevNext
  :prev="{ title: 'TreeView 树形视图', to: '/components/tree-view' }"
  :next="{ title: 'Callout 提示块', to: '/components/callout' }"
/>`

const codeSingle = `<PrevNext
  :next="{ title: '开始快速上手', to: '/components/steps' }"
  next-label="下一章"
/>`

const apiRows = [
  { name: 'prev', type: 'PrevNextItem', default: '—', description: '上一篇配置：title、href?、to?、description?。' },
  { name: 'next', type: 'PrevNextItem', default: '—', description: '下一篇配置：title、href?、to?、description?。' },
  { name: 'prevLabel', type: 'string', default: '依国际化配置', description: '上一篇小标签文本。' },
  { name: 'nextLabel', type: 'string', default: '依国际化配置', description: '下一篇小标签文本。' }
]
</script>
