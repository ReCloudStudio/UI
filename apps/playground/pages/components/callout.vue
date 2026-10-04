<template>
  <div class="space-y-10">
    <DocPageHeader title="Callout 提示块" description="用于文档中的重点强调、操作建议、版本注意与破坏性警示。" />

    <DocExample title="基础类型" description="内置 info、tip、note、warning、danger 五种类型，包含匹配的图标与色彩。" :code="codeBasic">
      <div class="space-y-3 max-w-2xl">
        <Callout type="info">系统会在夜间进行自动冷备份，此期间集群读写不会中断。</Callout>
        <Callout type="tip" title="专业建议">在生产环境中建议将副本数量设置为至少 3，以保障高可用。</Callout>
        <Callout type="note" title="版本记录">该选项自 v1.2.0 起默认开启。</Callout>
        <Callout type="warning" title="注意事项">修改该网络端口将导致现存客户端重连。</Callout>
        <Callout type="danger" title="破坏性操作">删除命名空间将级联清理所有关联的秘密卷和无状态服务，操作无法撤回。</Callout>
      </div>
    </DocExample>

    <DocExample title="可折叠提示块" description="设置 collapsible 允许用户收起或展开详细内容。" :code="codeCollapsible">
      <div class="max-w-2xl">
        <Callout type="info" title="展开查看排查指南" :collapsible="true" :default-open="false">
          <p>1. 确认 VPC 对等连接路由表已发布。</p>
          <p class="mt-1">2. 执行 <InlineCode code="ping" /> 验证网关连通性。</p>
        </Callout>
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />
    <DocPageNav name="callout" />
  </div>
</template>

<script setup lang="ts">
const codeBasic = `<Callout type="info">系统会在夜间进行自动冷备份。</Callout>
<Callout type="tip" title="专业建议">建议将副本数量设置为至少 3。</Callout>
<Callout type="warning" title="注意事项">修改网络端口会导致客户端重连。</Callout>
<Callout type="danger" title="破坏性操作">删除命名空间将级联清理所有资源。</Callout>`

const codeCollapsible = `<Callout type="info" title="展开查看排查指南" :collapsible="true" :default-open="false">
  <p>1. 确认 VPC 对等连接路由表已发布。</p>
</Callout>`

const apiRows = [
  { name: 'type', type: "'info' | 'tip' | 'note' | 'warning' | 'danger'", default: "'info'", description: '提示块的语义类型与视觉风格。' },
  { name: 'title', type: 'string', default: '依类型默认', description: '提示块顶部标题。' },
  { name: 'collapsible', type: 'boolean', default: 'false', description: '是否允许点击折叠与展开。' },
  { name: 'defaultOpen', type: 'boolean', default: 'true', description: '折叠模式下的初始展开状态。' },
  { name: 'slot: default', type: 'slot', default: '—', description: '提示块主体正文。' },
  { name: 'slot: title', type: 'slot', default: '—', description: '自定义标题区域内容。' },
  { name: 'slot: icon', type: 'slot', default: '—', description: '自定义前置图标。' },
  { name: 'slot: action', type: 'slot', default: '—', description: '右上角附加操作按钮。' }
]
</script>
