<template>
  <div class="space-y-10">
    <DocPageHeader title="CodeBlock 代码块" description="带编程语言图标、文件标识、复制操作、行号和自动换行的深色代码展示容器。" />

    <DocExample title="编程语言图标显示" description="默认根据 language 或 filename 自动匹配内置编程语言图标；亦可显式关闭（icon: false）或自定义传入图标源。" :code="iconExampleCode">
      <div class="space-y-4">
        <!-- 自动匹配 Vue / TypeScript / Bash / Python / SQL 图标 -->
        <CodeBlock :code="componentCode" language="vue" filename="StatusCard.vue" class="max-w-2xl" />
        <CodeBlock :code="configCode" language="ts" filename="config.ts" class="max-w-2xl" />
        <CodeBlock :code="shellCode" language="bash" filename="deploy.sh" class="max-w-2xl" />
        <!-- 显式禁用图标（保留小圆点） -->
        <CodeBlock :code="logCode" language="log" filename="output.log" :icon="false" class="max-w-2xl" />
      </div>
    </DocExample>

    <DocExample title="行号与换行" description="长内容可保留行号，并按需自动换行。" :code="lineNumberCode">
      <CodeBlock :code="configCode" language="ts" filename="config.ts" show-line-numbers wrap class="max-w-2xl" />
    </DocExample>

    <DocExample title="受限高度" description="使用 max-height 为长日志保留滚动区域。" :code="scrollCode">
      <CodeBlock :code="logCode" language="log" filename="deploy.log" show-line-numbers max-height="12rem" class="max-w-2xl" />
    </DocExample>

    <DocExample title="可折叠" description="开启 collapsible 后可点击标题栏展开 / 收起，折叠状态可通过 v-model:collapsed 受控。收起时不会触发高亮。" :code="collapsibleCode">
      <CodeBlock v-model:collapsed="collapsed" :code="componentCode" language="vue" filename="StatusCard.vue" collapsible class="max-w-2xl" />
    </DocExample>

    <DocApiTable :rows="apiRows" />
    <DocPageNav name="code-block" />
  </div>
</template>

<script setup lang="ts">
const collapsed = ref(true)

const componentCode = `<template>
  <Card>
    <p>部署状态正常</p>
  </Card>
</template>`

const configCode = `export default defineConfig({
  endpoint: 'https://api.example.com/v1/projects/production',
  retry: 3
})`

const shellCode = `#!/usr/bin/env bash
set -euo pipefail
bun run build
docker build -t app:latest .`

const logCode = `[10:12:01] Building application
[10:12:04] Validating types
[10:12:08] Uploading assets
[10:12:12] Deploying to production
[10:12:16] Deployment complete`

const iconExampleCode = `<!-- 自动根据 language 或 filename 渲染对应语言图标 -->
<CodeBlock :code="componentCode" language="vue" filename="StatusCard.vue" />
<CodeBlock :code="configCode" language="ts" filename="config.ts" />
<CodeBlock :code="shellCode" language="bash" filename="deploy.sh" />

<!-- 禁用图标，回退至圆点指示器 -->
<CodeBlock :code="logCode" language="log" filename="output.log" :icon="false" />`

const lineNumberCode = `<CodeBlock
  :code="configCode"
  language="ts"
  filename="config.ts"
  show-line-numbers
  wrap
/>`

const scrollCode = `<CodeBlock
  :code="logCode"
  language="log"
  filename="deploy.log"
  show-line-numbers
  max-height="12rem"
/>`

const collapsibleCode = `<CodeBlock
  v-model:collapsed="collapsed"
  :code="componentCode"
  language="vue"
  filename="StatusCard.vue"
  collapsible
/>`

const apiRows = [
  { name: 'code', type: 'string', default: "''", description: '要展示和复制的源代码。' },
  { name: 'language', type: 'string', default: "''", description: '语言标识，用于展示、高亮以及默认匹配语言图标。' },
  { name: 'filename', type: 'string', default: "''", description: '标题栏中的文件名，其扩展名亦可参与语言图标自动匹配。' },
  { name: 'icon', type: 'IconSource | boolean', default: 'undefined', description: '编程语言图标。true 强制显示；false 禁用显示；支持自定义传入 IconSource。缺省时自动尝试匹配。' },
  { name: 'copyable', type: 'boolean', default: 'true', description: '是否显示复制按钮。' },
  { name: 'showLineNumbers', type: 'boolean', default: 'false', description: '是否显示行号。' },
  { name: 'wrap', type: 'boolean', default: 'false', description: '是否自动换行。' },
  { name: 'maxHeight', type: 'string', default: "''", description: '代码区域最大高度，超出时滚动。' },
  { name: 'collapsible', type: 'boolean', default: 'false', description: '是否可通过标题栏折叠代码区域。' },
  { name: 'v-model:collapsed', type: 'boolean', default: 'false', description: '折叠状态，仅在 collapsible 时生效；不绑定时组件自行管理。' }
]
</script>
