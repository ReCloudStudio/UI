<template>
  <div class="space-y-10">
    <DocPageHeader title="Steps 文档步骤" description="面向快速上手、环境部署与排错排查文档的垂直向导步骤列表。" />

    <DocExample title="自动编号步骤" description="Steps 自动管理子项的序号索引与连接线。" :code="codeBasic">
      <Steps class="max-w-2xl">
        <StepItem title="安装组件库依赖" description="通过 Bun 或 npm 将 ReCloud UI 引入项目。">
          <p>在工程根目录运行：</p>
          <InlineCode code="bun add @recloudstudio/ui" :copyable="true" />
        </StepItem>
        <StepItem title="引入样式与设计令牌" description="在应用入口导入全局样式。">
          <p>在你的应用入口文件顶部引入：</p>
          <InlineCode code="import '@recloudstudio/ui/style.css'" :copyable="true" />
        </StepItem>
        <StepItem title="使用组件" description="直接在 Vue 模板中声明组件即可。">
          <p>例如：引入 <InlineCode code="<Button>点击操作</Button>" />。</p>
        </StepItem>
      </Steps>
    </DocExample>

    <DocApiTable :rows="apiRows" />
    <DocPageNav name="steps" />
  </div>
</template>

<script setup lang="ts">
const codeBasic = `<Steps>
  <StepItem title="安装依赖" description="引入 ReCloud UI">
    <InlineCode code="bun add @recloudstudio/ui" :copyable="true" />
  </StepItem>
  <StepItem title="引入样式">
    <InlineCode code="import '@recloudstudio/ui/style.css'" />
  </StepItem>
  <StepItem title="使用组件">
    <Button>开始体验</Button>
  </StepItem>
</Steps>`

const apiRows = [
  { name: 'startIndex', type: 'number', default: '1', description: 'Steps 容器的起始序号。' },
  { name: 'StepItem.title', type: 'string', default: "''", description: '步骤标题。' },
  { name: 'StepItem.description', type: 'string', default: "''", description: '步骤辅助说明。' },
  { name: 'StepItem.step', type: 'number | string', default: '自动计算', description: '手动覆盖当前步骤的标记字符或数字。' },
  { name: 'slot: default', type: 'slot', default: '—', description: '步骤主体内容。' }
]
</script>
