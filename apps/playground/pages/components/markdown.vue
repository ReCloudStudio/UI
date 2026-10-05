<template>
  <div class="space-y-10">
    <DocPageHeader
      title="Markdown 渲染系统"
      description="基于 unified/remark 与 ReCloud UI 内容原语的受控 Markdown/GFM 渲染系统，内置锚点标题、Shiki 代码高亮、表格、任务列表以及 :::info / :::steps / :::code-group 等文档扩展指令。"
    />

    <DocExample
      title="全功能示例文档"
      description="直接将 Markdown 字符串渲染为 ReCloud 设计系统的富文本、代码块与扩展容器，同时支持目录（TOC）联动。"
      :code="sampleMarkdown"
    >
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div class="lg:col-span-3">
          <div class="rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0B1220]">
            <MarkdownRenderer :content="sampleMarkdown" @headings="headings = $event" />
          </div>
        </div>
        <div class="lg:col-span-1">
          <div class="sticky top-20 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-[#0B1220]">
            <Toc :items="headings" />
          </div>
        </div>
      </div>
    </DocExample>

    <DocExample
      title="安全策略与协议过滤"
      description="默认开启严格的协议过滤与安全策略，阻止 javascript: 协议并规范化外部链接。"
      :code="unsafeSample"
    >
      <div class="rounded-xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0B1220]">
        <MarkdownRenderer :content="unsafeSample" />
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />
    <DocPageNav name="markdown" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { MarkdownRenderer, type MarkdownHeading } from '@recloudstudio/ui/markdown'

const headings = ref<MarkdownHeading[]>([])

const sampleMarkdown = `# 快速上手 ReCloud UI

ReCloud UI 提供面向开发者控制台与文档系统的全套高保真组件。

## 安装指南

你可以通过常用的包管理器安装核心库与样式：

:::code-group

\`\`\`bash [bun]
bun add @recloudstudio/ui
\`\`\`

\`\`\`bash [pnpm]
pnpm add @recloudstudio/ui
\`\`\`

\`\`\`bash [npm]
npm install @recloudstudio/ui
\`\`\`

:::

:::info{title="Nuxt 4 兼容性"}
该渲染系统完整支持 Nuxt 4 SSR 与客户端 Hydration，静态预渲染期间共享同一个 Shiki 高亮器。
:::

## 配置步骤

跟随下方步骤完成初始化：

:::steps{startIndex="1"}

:::step{title="注册模块"}
在 \`nuxt.config.ts\` 中将模块加入 \`modules\` 列表。
:::

:::step{title="导入样式"}
如果未使用模块注入，请手动在入口引入 \`@recloudstudio/ui/style.css\`。
:::

:::step{title="启动开发服务器"}
运行 \`bun dev\` 打开 Playground 预览。
:::

:::

## 特性对比

| 特性 | 普通 Markdown | ReCloud Markdown 系统 |
| :--- | :---: | ---: |
| 标题锚点 | 否 | 是（支持一键复制） |
| 代码高亮 | 纯文本/基础样式 | Shiki 进程级多语言高亮 |
| 交互式指令 | 无 | :::callout, :::steps, :::code-group |
`

const unsafeSample = `### 安全测试

- [正常链接（新窗口打开）](https://worldexecute.me)
- [被过滤的恶意脚本链接](javascript:alert('XSS'))
- 内联代码如 \`const safe = true\` 正确安全呈现。
`

const apiRows = [
  { name: 'content', type: 'string', default: "''", description: '原始 Markdown 字符串。' },
  { name: 'ast', type: 'MarkdownDocument', default: 'undefined', description: '预编译的 AST 树，适用于构建期预解析与静态站缓存。' },
  { name: 'components', type: 'MarkdownComponentRegistry', default: '{}', description: '自定义节点渲染组件注册表，覆盖标题、段落、代码块、链接等。' },
  { name: 'baseUrl', type: 'string', default: 'undefined', description: '相对 URL 解析基准路径。' },
  { name: 'features', type: 'MarkdownFeatures', default: '{}', description: '特性开关，如 gfm、directives、steps、codeGroups。' },
  { name: 'sanitize', type: 'MarkdownSanitizeOptions | false', default: '{}', description: '安全净化配置，支持自定义允许协议与 HTML 放行策略。' },
  { name: '@headings', type: '(headings: MarkdownHeading[]) => void', default: '—', description: '提取标题元数据事件，可直接绑定至 Toc 组件。' }
]
</script>
