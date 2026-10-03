<template>
  <div class="space-y-10">
    <DocPageHeader title="CodeBlock 代码块" description="带文件标识、复制操作、行号和自动换行的深色代码展示容器。" />

    <DocExample title="文件代码" description="默认提供复制操作，可标记语言和文件名。" :code="exampleCode">
      <CodeBlock :code="componentCode" language="vue" filename="StatusCard.vue" class="max-w-2xl" />
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

const logCode = `[10:12:01] Building application
[10:12:04] Validating types
[10:12:08] Uploading assets
[10:12:12] Deploying to production
[10:12:16] Deployment complete`

const exampleCode = `<CodeBlock
  :code="componentCode"
  language="vue"
  filename="StatusCard.vue"
/>`

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
  { name: 'language', type: 'string', default: "''", description: '语言标识，用于展示与高亮；vue 片段未包含 <template> 等顶层块时按模板语法高亮。' },
  { name: 'filename', type: 'string', default: "''", description: '标题栏中的文件名。' },
  { name: 'copyable', type: 'boolean', default: 'true', description: '是否显示复制按钮。' },
  { name: 'showLineNumbers', type: 'boolean', default: 'false', description: '是否显示行号。' },
  { name: 'wrap', type: 'boolean', default: 'false', description: '是否自动换行。' },
  { name: 'maxHeight', type: 'string', default: "''", description: '代码区域最大高度，超出时滚动。' },
  { name: 'collapsible', type: 'boolean', default: 'false', description: '是否可通过标题栏折叠代码区域。' },
  { name: 'v-model:collapsed', type: 'boolean', default: 'false', description: '折叠状态，仅在 collapsible 时生效；不绑定时组件自行管理。' }
]
</script>
