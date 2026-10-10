<template>
  <div class="space-y-10">
    <PageHeader
      title="CopySnippet 命令行代码块"
      description="面向开发者文档、CLI 工具安装与云平台运维指引的命令行复合块，支持多包管理器/环境无缝切换与一键复制。"
    />

    <ComponentExample
      title="多包管理器安装命令"
      description="通过 commands 数组配置 bun、pnpm、npm、yarn 等多环境命令，自动呈现切换标签。"
      :code="codeMulti"
    >
      <div class="max-w-xl">
        <CopySnippet
          :commands="installCommands"
          variant="outline"
        />
      </div>
    </ComponentExample>

    <ComponentExample
      title="单行命令行与变体"
      description="支持 subtle、outline 与 ghost 边框变体，可自定义命令行前缀符。"
      :code="codeSingle"
    >
      <div class="max-w-xl space-y-3">
        <CopySnippet
          command="curl -fsSL https://recloud.studio/install.sh | bash"
          variant="subtle"
        />
        <CopySnippet
          command="kubectl get pods -n recloud-prod --watch"
          prefix=">"
          variant="ghost"
        />
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="copy-snippet" />
  </div>
</template>

<script setup lang="ts">
import { CopySnippet } from '@recloudstudio/ui'

const installCommands = [
  { label: 'bun', command: 'bun add @recloudstudio/ui' },
  { label: 'pnpm', command: 'pnpm add @recloudstudio/ui' },
  { label: 'npm', command: 'npm install @recloudstudio/ui' },
  { label: 'yarn', command: 'yarn add @recloudstudio/ui' }
]

const codeMulti = `<CopySnippet
  :commands="[
    { label: 'bun', command: 'bun add @recloudstudio/ui' },
    { label: 'pnpm', command: 'pnpm add @recloudstudio/ui' },
    { label: 'npm', command: 'npm install @recloudstudio/ui' },
    { label: 'yarn', command: 'yarn add @recloudstudio/ui' }
  ]"
  variant="outline"
/>`

const codeSingle = `<CopySnippet
  command="curl -fsSL https://recloud.studio/install.sh | bash"
  variant="subtle"
/>`

const apiRows = [
  {
    name: 'command',
    type: 'string',
    default: "''",
    description: '单命令文本。'
  },
  {
    name: 'commands',
    type: 'CopySnippetCommand[]',
    default: '[]',
    description: '多命令数组（包含 label、command、可选 prefix），展示顶部切换标签。'
  },
  {
    name: 'prefix',
    type: 'string',
    default: "'$'",
    description: '命令行前缀提示符（例如 $ 或 >）。'
  },
  {
    name: 'variant',
    type: "'subtle' | 'outline' | 'ghost'",
    default: "'subtle'",
    description: '视觉层级变体。'
  },
  {
    name: 'copyable',
    type: 'boolean',
    default: 'true',
    description: '是否开启一键复制按钮与反馈。'
  }
]
</script>
