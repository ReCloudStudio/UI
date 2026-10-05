<template>
  <div class="space-y-10">
    <PageHeader title="AnchorHeading 锚点标题" description="悬停时展示 # 锚点图标，点击自动复制指向该小节的直接链接。" />

    <ComponentExample title="各级标题示例" description="支持 as 属性配置 h1 到 h6 各级标题，且自动根据标题正文生成 URL-friendly 的 ID。" :code="codeBasic">
      <div class="space-y-6 max-w-2xl pl-8">
        <AnchorHeading as="h2">快速上手指南</AnchorHeading>
        <p class="text-sm text-slate-600 dark:text-slate-400">本小节介绍如何将组件库快速接入现有项目。</p>

        <AnchorHeading as="h3">前置要求</AnchorHeading>
        <p class="text-sm text-slate-600 dark:text-slate-400">请确保 Node.js >= 18 或使用 Bun 运行时。</p>

        <AnchorHeading as="h4">可选依赖项</AnchorHeading>
        <p class="text-sm text-slate-600 dark:text-slate-400">如需使用代码块高亮，可按需集成 Shiki。</p>
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />
    <DocPageNav name="anchor-heading" />
  </div>
</template>

<script setup lang="ts">
const codeBasic = `<AnchorHeading as="h2">快速上手指南</AnchorHeading>
<p>本小节介绍如何将组件库快速接入现有项目。</p>

<AnchorHeading as="h3">前置要求</AnchorHeading>
<p>请确保 Node.js >= 18 或使用 Bun 运行时。</p>`

const apiRows = [
  { name: 'as', type: "'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'", default: "'h2'", description: 'HTML 标题语义级别。' },
  { name: 'id', type: 'string', default: '依文本自动 slugify', description: '标题的 DOM 唯一标识符，用作 URL Hash。' },
  { name: 'copyable', type: 'boolean', default: 'true', description: '是否在点击锚点符号时复制链接到剪贴板。' },
  { name: 'slot: default', type: 'slot', default: '—', description: '标题展示文本。' }
]
</script>
