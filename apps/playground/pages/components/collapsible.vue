<template>
  <div class="space-y-10">
    <DocPageHeader title="CollapsiblePanel 折叠面板" description="单区块渐进披露，适合高级选项与附加参数。" />

    <DocExample title="高级选项" description="trigger-extra 插槽可在标题行右侧追加徽标。" :code="rcCode0">
      <CollapsiblePanel v-model:open="open" title="高级网络参数">
        <div class="flex flex-wrap items-center gap-2">
          <Badge variant="soft" color="neutral">MTU 1500</Badge>
          <Badge variant="soft" color="neutral">TCP BBR</Badge>
          <Badge variant="soft" color="primary">TLS 1.3</Badge>
          <Badge variant="outline" color="neutral">GRE Tunnel: 关闭</Badge>
        </div>
      </CollapsiblePanel>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="collapsible" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)

const rcCode0 = `<CollapsiblePanel v-model:open="open" title="高级网络参数">
  <div class="flex flex-wrap items-center gap-2">
    <Badge variant="soft" color="neutral">MTU 1500</Badge>
    <Badge variant="soft" color="neutral">TCP BBR</Badge>
    <Badge variant="soft" color="primary">TLS 1.3</Badge>
    <Badge variant="outline" color="neutral">GRE Tunnel: 关闭</Badge>
  </div>
</CollapsiblePanel>`


const apiRows = [ { name: 'open', type: 'boolean', default: 'false', description: 'v-model:open 展开态。' },
  { name: 'title', type: 'string', default: '—', description: '触发行标题。' },
  { name: 'title / trigger-extra', type: 'slot', default: '—', description: '自定义标题 / 行尾附加内容。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '禁止展开。' } ]
</script>
