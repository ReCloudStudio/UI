<template>
  <div class="space-y-10">
    <DocPageHeader title="CodeGroup 代码分组" description="专为文档与教程设计的选项卡式代码块容器，常用于多包管理器安装命令与不同语言代码对比。" />

    <DocExample title="包管理器切换" description="结合 CodeBlock 展示不同包管理器的命令。" :code="codeBasic">
      <div class="max-w-2xl">
        <CodeGroup v-model="activePm" :tabs="['bun', 'pnpm', 'npm', 'yarn']">
          <CodeBlock
            :code="pmCommands[activePm] ?? ''"
            language="bash"
            class="rounded-none border-x-0 border-b-0 shadow-none"
          />
        </CodeGroup>
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />
    <DocPageNav name="code-group" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activePm = ref('bun')

const pmCommands: Record<string, string> = {
  bun: 'bun add @recloudstudio/ui',
  pnpm: 'pnpm add @recloudstudio/ui',
  npm: 'npm install @recloudstudio/ui',
  yarn: 'yarn add @recloudstudio/ui'
}

const codeBasic = `<CodeGroup v-model="activePm" :tabs="['bun', 'pnpm', 'npm', 'yarn']">
<CodeBlock :code="pmCommands[activePm]" language="bash" />
</CodeGroup>`

const apiRows = [
  { name: 'modelValue / v-model', type: 'string | number', default: '首个选项卡', description: '当前选中的选项卡 key。' },
  { name: 'tabs', type: '(string | CodeGroupTab)[]', default: '[]', description: '选项卡列表配置：可为字符串或对象 { label, key?, icon? }。' },
  { name: 'slot: default', type: 'slot', default: '—', description: '默认插槽，接收 activeKey 与 activeIndex。' },
  { name: 'slot: [key]', type: 'slot', default: '—', description: '支持按 tab key 名称命名的具名插槽。' }
]
</script>
