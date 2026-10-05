<template>
  <div class="space-y-10">
    <PageHeader title="Navbar 导航顶栏" description="面向站点与文档门户的全局导航顶栏，支持品牌 Logo、桌面链接、快捷 CTA 与移动端折叠抽屉。" />

    <ComponentExample title="基础顶栏" description="集成品牌、徽标链接、操作按钮及移动端抽屉。" :code="codeBasic">
      <div class="overflow-hidden rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/30">
        <Navbar
          brand-title="ReCloud"
          :links="navLinks"
          :sticky="false"
        >
          <template #actions>
            <Button size="sm" variant="ghost">登录</Button>
            <Button size="sm">快速开始</Button>
          </template>
        </Navbar>
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />
    <DocPageNav name="navbar" />
  </div>
</template>

<script setup lang="ts">
const navLinks = [
  { label: '功能特性', href: '#features' },
  { label: '组件文档', to: '/components/button' },
  { label: '更新日志', to: '/components/timeline', badge: 'v0.3.0' },
  { label: '定价', href: '#pricing' }
]

const codeBasic = `<Navbar
  brand-title="ReCloud"
  :links="[
    { label: '功能特性', href: '#features' },
    { label: '组件文档', to: '/components/button' },
    { label: '更新日志', to: '/components/timeline', badge: 'v0.3.0' }
  ]"
>
  <template #actions>
    <Button size="sm" variant="ghost">登录</Button>
    <Button size="sm">快速开始</Button>
  </template>
</Navbar>`

const apiRows = [
  { name: 'brandTitle', type: 'string', default: "''", description: '品牌标题文本。' },
  { name: 'brandHref', type: 'string', default: "'/'", description: '品牌 Logo 的普通外链目标。' },
  { name: 'brandTo', type: 'string', default: 'undefined', description: '品牌 Logo 的路由跳转目标（Vue Router / Nuxt）。' },
  { name: 'links', type: 'NavbarLink[]', default: '[]', description: '导航链接列表：label、href?、to?、badge?、active?。' },
  { name: 'sticky', type: 'boolean', default: 'true', description: '是否在页面顶部粘性吸顶固定。' },
  { name: 'bordered', type: 'boolean', default: 'true', description: '是否展示底部微边框。' },
  { name: 'slot: logo', type: 'slot', default: '—', description: '自定义品牌 Logo 图标。' },
  { name: 'slot: brand', type: 'slot', default: '—', description: '自定义品牌标题区域。' },
  { name: 'slot: links', type: 'slot', default: '—', description: '自定义桌面端链接。' },
  { name: 'slot: mobile-links', type: 'slot', default: '—', description: '自定义移动端抽屉内的导航内容；桌面端 #links 不会自动复用至移动端。' },
  { name: 'slot: actions', type: 'slot', default: '—', description: '右侧 CTA 操作按钮组。' },
  { name: 'slot: extra', type: 'slot', default: '—', description: '右侧辅助组件（如主题切换、搜索）。' }
]
</script>
