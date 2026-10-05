<template>
  <div class="space-y-10">
    <PageHeader title="NavTree 文档树侧栏" description="用于文档站点与多层级内容目录的侧边栏组件，支持分组折叠、徽标与实时搜索过滤。" />

    <ComponentExample title="文档分组与过滤" description="支持多级分组、折叠展开与搜索实时过滤文档条目。" :code="codeBasic">
      <div class="max-w-xs rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-[#0B1220]">
        <NavTree
          :groups="sampleGroups"
          active-href="/components/callout"
          :searchable="true"
        />
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />
    <DocPageNav name="nav-tree" />
  </div>
</template>

<script setup lang="ts">
const sampleGroups = [
  {
    title: '基础组件',
    collapsible: true,
    items: [
      { title: 'Button 按钮', href: '/components/button' },
      { title: 'Badge 徽标', href: '/components/badge', badge: 'Hot' },
      { title: 'Callout 提示块', href: '/components/callout', badge: 'New' }
    ]
  },
  {
    title: '排版导航',
    collapsible: true,
    items: [
      { title: 'Steps 步骤', href: '/components/steps' },
      { title: 'AnchorHeading 锚点标题', href: '/components/anchor-heading' },
      { title: 'Toc 页内目录', href: '/components/toc' }
    ]
  }
]

const codeBasic = `<NavTree
  :groups="sampleGroups"
  active-href="/components/callout"
  :searchable="true"
/>`

const apiRows = [
  { name: 'groups', type: 'NavTreeGroup[]', default: '[]', description: '文档分组列表：title、collapsible?、items（包含 title、href、to、badge、icon）。' },
  { name: 'activeHref', type: 'string', default: "''", description: '当前高亮激活的页面路径。' },
  { name: 'searchable', type: 'boolean', default: 'false', description: '是否在顶部展示即时过滤搜索框。' },
  { name: 'searchPlaceholder', type: 'string', default: '依国际化配置', description: '搜索框占位文本。' }
]
</script>
