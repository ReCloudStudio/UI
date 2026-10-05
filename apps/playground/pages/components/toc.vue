<template>
  <div class="space-y-10">
    <DocPageHeader title="Toc 页内目录" description="从当前页面或指定容器中收集多级标题并生成导航，支持平滑滚动与滚动监听。" />

    <DocExample title="基础目录导航" description="通过数据传入或自动提取页面中的 h2/h3 标题。" :code="codeBasic">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
        <div class="md:col-span-2 space-y-6 rounded-xl border border-slate-200/80 p-6 dark:border-slate-800" id="toc-demo-content">
          <AnchorHeading as="h2" id="demo-intro">1. 系统介绍</AnchorHeading>
          <p class="text-sm text-slate-600 dark:text-slate-400">ReCloud UI 是一套专注于开发运维控制台与内部工具的现代化组件库。</p>

          <AnchorHeading as="h3" id="demo-features">核心特性</AnchorHeading>
          <p class="text-sm text-slate-600 dark:text-slate-400">提供无障碍基础底座与高度定制的设计令牌系统。</p>

          <AnchorHeading as="h2" id="demo-install">2. 安装与配置</AnchorHeading>
          <p class="text-sm text-slate-600 dark:text-slate-400">支持在 Vue 3 与 Nuxt 4 环境中直接使用。</p>

          <AnchorHeading as="h3" id="demo-nuxt">Nuxt 模块集成</AnchorHeading>
          <p class="text-sm text-slate-600 dark:text-slate-400">开箱即用的主题注水与组件自动导入支持。</p>
        </div>

        <div class="md:col-span-1">
          <div class="sticky top-20 rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/50">
            <Toc container="#toc-demo-content" />
          </div>
        </div>
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />
    <DocPageNav name="toc" />
  </div>
</template>

<script setup lang="ts">
const codeBasic = `<div id="doc-content">
  <AnchorHeading as="h2" id="intro">介绍</AnchorHeading>
  <p>内容...</p>
</div>

<!-- 目录导航 -->
<Toc container="#doc-content" />`

const apiRows = [
  { name: 'container', type: 'string', default: 'document', description: '用于收集标题的容器 CSS 选择器。' },
  { name: 'selector', type: 'string', default: "'h2, h3'", description: '目标收集的标题 CSS 选择器。' },
  { name: 'items', type: 'TocItem[]', default: '—', description: '手动指定目录项（覆盖自动提取）：id、title、level?。' },
  { name: 'scrollSpy', type: 'boolean', default: 'true', description: '是否在页面滚动时自动高亮当前所在视口的小节。' },
  { name: 'offset', type: 'number', default: '80', description: '滚动定位与 IntersectionObserver 计算时的顶部偏移量 (px)。' }
]
</script>
