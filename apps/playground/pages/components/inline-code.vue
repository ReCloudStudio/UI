<template>
  <div class="space-y-10">
    <DocPageHeader title="InlineCode 行内代码" description="针对行内短代码、配置字段、CLI 命令与按键的高亮与一键复制。" />

    <DocExample title="基础与风格" description="支持 subtle（默认）、solid 与 outline 三种风格外观。" :code="codeBasic">
      <div class="space-y-3 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <p>通过 <InlineCode code="bun add @recloudstudio/ui" /> 安装依赖包。</p>
        <p>深色高亮模式：<InlineCode code="POST /api/v1/auth" variant="solid" /> 接口需要鉴权头。</p>
        <p>边框轮廓模式：<InlineCode code="config.resolve.alias" variant="outline" /> 支持别名映射。</p>
      </div>
    </DocExample>

    <DocExample title="支持一键复制" description="设置 copyable 为 true，用户点击即可快捷复制行内文本到剪贴板。" :code="codeCopy">
      <div class="space-y-3 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-slate-300">
        <p>试着点击右侧的命令：<InlineCode code="curl -sSL https://recloud.sh | bash" :copyable="true" /></p>
        <p>插槽形式定义：<InlineCode :copyable="true">VITE_API_BASE_URL=https://api.recloud.io</InlineCode></p>
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />
    <DocPageNav name="inline-code" />
  </div>
</template>

<script setup lang="ts">
const codeBasic = `<InlineCode code="bun add @recloudstudio/ui" />
<InlineCode code="POST /api/v1/auth" variant="solid" />
<InlineCode code="config.resolve.alias" variant="outline" />`

const codeCopy = `<InlineCode code="curl -sSL https://recloud.sh | bash" :copyable="true" />
<InlineCode :copyable="true">VITE_API_BASE_URL=https://api.recloud.io</InlineCode>`

const apiRows = [
  { name: 'code', type: 'string', default: "''", description: '行内代码文本，也可通过默认插槽传入。' },
  { name: 'copyable', type: 'boolean', default: 'false', description: '是否开启一键点击复制功能。' },
  { name: 'variant', type: "'subtle' | 'solid' | 'outline'", default: "'subtle'", description: '视觉样式变体。' },
  { name: 'slot: default', type: 'slot', default: '—', description: '自定义行内内容。' }
]
</script>
