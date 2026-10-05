<template>
  <div class="space-y-10">
    <DocPageHeader
      title="Container 页面容器"
      description="规范响应式最大宽度（sm、md、lg、xl、2xl、full）与水平内边距节奏的页面级排版容器，常与 Section、Navbar 或文档主体配合使用。"
    />

    <DocExample
      title="基础容器与尺寸对比"
      description="内置 max-w 尺寸预设与响应式水平 padding（px-4 sm:px-6 lg:px-8），保持全站对齐统一。"
      :code="rcCode0"
    >
      <div class="space-y-4">
        <Container size="sm" class="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-center text-sm font-medium dark:border-slate-700 dark:bg-[#0B1220]">
          Container (sm · max-w-2xl)
        </Container>
        <Container size="md" class="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-center text-sm font-medium dark:border-slate-700 dark:bg-[#0B1220]">
          Container (md · max-w-4xl)
        </Container>
        <Container size="lg" class="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-center text-sm font-medium dark:border-slate-700 dark:bg-[#0B1220]">
          Container (lg · max-w-6xl)
        </Container>
        <Container size="xl" class="rounded-xl border border-dashed border-primary-500/50 bg-primary-500/5 p-4 text-center text-sm font-medium text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
          Container (xl · max-w-7xl · 默认推荐)
        </Container>
      </div>
    </DocExample>

    <DocExample
      title="自定义标签与无内边距模式"
      description="可通过 as 属性渲染为 main/article/section 等语义化标签，并支持 padded: false 实现完全贴边。"
      :code="rcCode1"
    >
      <Container as="article" :padded="false" size="md" class="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-[#0B1220]">
        <h3 class="text-base font-semibold text-slate-900 dark:text-white">无内边距容器包裹卡片</h3>
        <p class="mt-2 text-sm text-slate-600 dark:text-slate-400">
          当内部子元素已具备自身内边距时，禁用容器内边距以避免层叠 padding。
        </p>
      </Container>
    </DocExample>

    <DocApiTable :rows="apiRows" />
    <DocPageNav name="container" />
  </div>
</template>

<script setup lang="ts">
import { Container } from '@recloudstudio/ui'

const rcCode0 = `<Container size="sm">Small Container</Container>
<Container size="md">Medium Container</Container>
<Container size="lg">Large Container</Container>
<Container size="xl">Default XL Container</Container>`

const rcCode1 = `<Container as="article" :padded="false" size="md">
  <h3>无内边距容器包裹卡片</h3>
  <p>内容...</p>
</Container>`

const apiRows = [
  { name: 'as', type: 'string', default: "'div'", description: '渲染出的底层 HTML 标签。' },
  { name: 'size', type: "'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'", default: "'xl'", description: '响应式最大宽度限制。' },
  { name: 'padded', type: 'boolean', default: 'true', description: '是否添加响应式水平内边距（px-4 sm:px-6 lg:px-8）。' },
  { name: 'class', type: 'any', default: 'undefined', description: '自定义样式类名。' }
]
</script>
