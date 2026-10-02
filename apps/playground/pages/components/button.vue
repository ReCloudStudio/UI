<template>
  <div class="space-y-10">
    <DocPageHeader title="Button 按钮" description="六种清晰的视觉层级，配合主色、中性与语义色，覆盖核心操作、次要操作与低干扰链接。" />

    <DocExample title="变体" description="solid / outline / soft / subtle / ghost / link 六种层级。" :code="variantCode">
      <div class="demo-grid">
        <Button variant="solid" color="primary">Solid</Button>
        <Button variant="outline" color="primary">Outline</Button>
        <Button variant="soft" color="primary">Soft</Button>
        <Button variant="subtle" color="primary">Subtle</Button>
        <Button variant="ghost" color="primary">Ghost</Button>
        <Button variant="link" color="primary">Link</Button>
      </div>
    </DocExample>

    <DocExample title="色彩" description="主色、中性与语义错误 / 警告 / 成功色。" :code="colorCode">
      <div class="demo-grid">
        <Button variant="solid" color="primary">Primary</Button>
        <Button variant="solid" color="neutral">Neutral</Button>
        <Button variant="outline" color="neutral">Neutral</Button>
        <Button variant="solid" color="error">Error</Button>
        <Button variant="soft" color="error">Error</Button>
        <Button variant="soft" color="success">Success</Button>
        <Button variant="soft" color="warning">Warning</Button>
      </div>
    </DocExample>

    <DocExample title="尺寸与状态" description="从 xs 到 lg 四档高度，内置 loading 与 disabled 态。" :code="sizeCode">
      <div class="demo-grid">
        <Button variant="solid" size="xs">Extra Small</Button>
        <Button variant="solid" size="sm">Small</Button>
        <Button variant="solid" size="md">Medium</Button>
        <Button variant="solid" size="lg">Large</Button>
        <Button variant="solid" loading>Loading</Button>
        <Button variant="solid" disabled>Disabled</Button>
      </div>
    </DocExample>

    <DocExample title="带图标" description="使用 leading / trailing 图标插槽。" :code="iconCode">
      <div class="demo-grid">
        <Button variant="solid" color="primary">
          <template #leading><Cloud class="h-4 w-4" /></template>
          部署节点
        </Button>
        <Button variant="outline" color="neutral">
          导出配置
          <template #trailing><ChevronDown class="h-4 w-4" /></template>
        </Button>
        <Button variant="soft" color="neutral" size="icon" aria-label="设置">
          <Settings class="h-4 w-4" />
        </Button>
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="button" />
  </div>
</template>

<script setup lang="ts">
import { Cloud, ChevronDown, Settings } from '@recloud/ui/icons'

const variantCode = `<Button variant="solid" color="primary">Solid</Button>
<Button variant="outline" color="primary">Outline</Button>
<Button variant="soft" color="primary">Soft</Button>
<Button variant="subtle" color="primary">Subtle</Button>
<Button variant="ghost" color="primary">Ghost</Button>
<Button variant="link" color="primary">Link</Button>`

const colorCode = `<Button variant="solid" color="primary">Primary</Button>
<Button variant="solid" color="neutral">Neutral</Button>
<Button variant="solid" color="error">Error</Button>
<Button variant="soft" color="success">Success</Button>
<Button variant="soft" color="warning">Warning</Button>`

const sizeCode = `<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>`

const iconCode = `<Button variant="solid" color="primary">
  <template #leading><Cloud class="h-4 w-4" /></template>
  部署节点
</Button>
<Button size="icon" aria-label="设置">
  <Settings class="h-4 w-4" />
</Button>`

const apiRows = [
  { name: 'variant', type: `'solid' | 'outline' | 'soft'
'ghost' | 'subtle' | 'link'`, default: 'solid', description: '视觉层级。' },
  { name: 'color', type: `'primary' | 'neutral' | 'error'
'warning' | 'success'`, default: 'primary', description: '语义与品牌色。' },
  { name: 'size', type: `'xs' | 'sm' | 'md' | 'lg' | 'icon'`, default: 'md', description: '高度；icon 为正方形图标按钮。' },
  { name: 'loading', type: 'boolean', default: 'false', description: '显示旋转图标并禁用交互。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '禁用状态。' },
  { name: 'block', type: 'boolean', default: 'false', description: '撑满父容器宽度。' },
  { name: 'leading', type: 'slot', default: '—', description: '左侧图标插槽。' },
  { name: 'trailing', type: 'slot', default: '—', description: '右侧图标插槽。' }
]
</script>
