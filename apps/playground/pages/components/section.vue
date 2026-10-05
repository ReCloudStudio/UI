<template>
  <div class="space-y-10">
    <DocPageHeader
      title="Section 门户区块"
      description="具备标准化垂直间距节奏（sm、md、lg、xl）、背景变体（default、muted、card、brand）以及内置标题/副标题的营销与控制台区块容器。"
    />

    <DocExample
      title="基础区块与垂直节奏"
      description="内置 Container 包裹与自适应标题区域，快速搭建规格统一的落地页区块。"
      :code="rcCode0"
    >
      <div class="space-y-6">
        <Section
          title="核心能力一览"
          description="构建现代化多云服务与微服务基础设施的高性能组件套件"
          variant="muted"
          spacing="sm"
          class="rounded-xl border border-slate-200 dark:border-slate-800"
        >
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div class="rounded-lg bg-white p-4 shadow-sm dark:bg-[#0B1220]">
              <h4 class="font-semibold text-slate-900 dark:text-white">高可靠架构</h4>
              <p class="mt-1 text-xs text-slate-500">毫秒级故障自动切流与状态恢复</p>
            </div>
            <div class="rounded-lg bg-white p-4 shadow-sm dark:bg-[#0B1220]">
              <h4 class="font-semibold text-slate-900 dark:text-white">开箱即用</h4>
              <p class="mt-1 text-xs text-slate-500">设计 Tokens 与深浅模式完美契合</p>
            </div>
            <div class="rounded-lg bg-white p-4 shadow-sm dark:bg-[#0B1220]">
              <h4 class="font-semibold text-slate-900 dark:text-white">全栈支持</h4>
              <p class="mt-1 text-xs text-slate-500">Nuxt 4 / Vue 3 与静态站点一键集成</p>
            </div>
          </div>
        </Section>
      </div>
    </DocExample>

    <DocExample
      title="背景变体与左对齐排版"
      description="支持 brand 渐变与 card 边框模式，支持左对齐 header。"
      :code="rcCode1"
    >
      <div class="space-y-6">
        <Section
          title="开发者至上的 API"
          description="TypeScript 严格强类型、ARIA 无障碍与完全受控的状态模型"
          variant="card"
          align="left"
          spacing="sm"
          class="rounded-xl"
        >
          <p class="text-sm text-slate-600 dark:text-slate-400">
            每一个组件都经历了完整的属性校验与键盘交互测试。
          </p>
        </Section>
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />
    <DocPageNav name="section" />
  </div>
</template>

<script setup lang="ts">
import { Section } from '@recloudstudio/ui'

const rcCode0 = `<Section
  title="核心能力一览"
  description="构建现代化多云服务与微服务基础设施的高性能组件套件"
  variant="muted"
  spacing="sm"
>
  <div class="grid grid-cols-3 gap-4">
    <!-- 子内容 -->
  </div>
</Section>`

const rcCode1 = `<Section
  title="开发者至上的 API"
  description="TypeScript 严格强类型、ARIA 无障碍与完全受控的状态模型"
  variant="card"
  align="left"
  spacing="sm"
>
  <p>内容...</p>
</Section>`

const apiRows = [
  { name: 'as', type: 'string', default: "'section'", description: '渲染出的底层 HTML 标签。' },
  { name: 'variant', type: "'default' | 'muted' | 'card' | 'brand'", default: "'default'", description: '背景底色与边框变体。' },
  { name: 'spacing', type: "'none' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: '垂直内边距节奏。' },
  { name: 'container', type: 'boolean', default: 'true', description: '是否内置 Container 包裹子元素。' },
  { name: 'containerSize', type: 'ContainerSize', default: "'xl'", description: '内置 Container 的尺寸。' },
  { name: 'title', type: 'string', default: 'undefined', description: '区块标题文案。' },
  { name: 'description', type: 'string', default: 'undefined', description: '区块副标题文案。' },
  { name: 'align', type: "'left' | 'center'", default: "'center'", description: '标题区域文本对齐方向。' }
]
</script>
