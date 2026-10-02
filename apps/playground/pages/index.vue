<template>
  <div class="space-y-14">
    <!-- Hero -->
    <div class="relative overflow-hidden rounded-2xl ring-1 ring-inset ring-slate-200/80 dark:ring-slate-800/80 bg-white dark:bg-[#0B1220]">
      <div class="absolute inset-0 bg-grid-pattern opacity-60" />
      <div class="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-b from-[#C8E0FD] via-[#70ACFE] to-[#3069C9] opacity-25 blur-3xl" />
      <div class="relative p-8 sm:p-12 space-y-5">
        <div class="flex items-center gap-3">
          <BrandLogo :size="40" />
          <Badge variant="outline" color="neutral" size="xs">Nuxt 4 · Vue 3 · Tailwind v4</Badge>
        </div>
        <h1 class="text-4xl sm:text-5xl font-bold tracking-[-0.04em] text-slate-950 dark:text-white max-w-xl leading-[1.1]">
          为 ReCloud Studio 控制台而生的组件库
        </h1>
        <p class="text-base text-slate-600 dark:text-slate-300 leading-7 max-w-xl">
          47 个工业级 Vue 3 组件，基于 Reka UI 无障碍底层，严格遵循 ReCloud Studio 品牌垂直天蓝渐变规范与 Nuxt UI 的精致内嵌环线设计语言。
        </p>
        <div class="flex flex-wrap items-center gap-3 pt-1">
          <NuxtLink to="/components/button">
            <Button variant="solid" color="primary">浏览组件</Button>
          </NuxtLink>
          <NuxtLink to="/components/colors">
            <Button variant="outline" color="neutral">设计 Tokens</Button>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 安装 -->
    <section class="space-y-4">
      <h2 class="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">快速开始</h2>
      <p class="text-sm text-slate-600 dark:text-slate-400 leading-6 max-w-2xl">
        标准 NPM 单包发布，内部子路径导出。在 Nuxt 4 中注册模块即可获得组件与 composables 全自动按需导入；在纯 Vue 3 项目中按需显式导入即可。
      </p>

      <div class="grid gap-4 md:grid-cols-2">
        <DocExample title="Nuxt 4 模块" description="自动导入全部组件、useTheme 与 useToast。" :code="installNuxt" />
        <DocExample title="Vue 3 显式导入" description="配合 Vite 或任意构建工具使用。" :code="installVue" />
      </div>
    </section>

    <!-- 组件总览 -->
    <section class="space-y-6">
      <div>
        <h2 class="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">组件总览</h2>
        <p class="text-sm text-slate-600 dark:text-slate-400 mt-1.5">按使用场景分组，点击进入每个组件的文档与交互示例。</p>
      </div>

      <div v-for="group in docGroups.filter((g) => g.label !== '指南')" :key="group.label" class="space-y-3">
        <h3 class="text-xs font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">{{ group.label }}</h3>
        <div class="grid gap-3 sm:grid-cols-2">
          <NuxtLink
            v-for="item in group.items"
            :key="item.name"
            :to="docPath(item.name)"
            class="group rounded-xl ring-1 ring-inset ring-slate-200/80 dark:ring-slate-800/80 bg-white dark:bg-[#0B1220] p-4 hover:ring-[#2563EB]/50 dark:hover:ring-[#70ACFE]/50 hover:-translate-y-px transition-all"
          >
            <span class="block text-sm font-semibold text-slate-900 dark:text-white group-hover:text-[#2563EB] dark:group-hover:text-[#70ACFE] transition-colors">{{ item.title }}</span>
            <span class="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">{{ item.description }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { BrandLogo } from '@recloudstudio/ui/icons'
import { docGroups, docPath } from '~/utils/catalog'

const installNuxt = `// nuxt.config.ts
export default defineNuxtConfig({
  modules: [['@recloudstudio/ui/nuxt', { prefix: '' }]],
  css: ['@recloudstudio/ui/style.css']
})

// 任意 .vue 中直接使用，无需 import
;<Button variant="solid">部署集群</Button>`

const installVue = `# 安装
bun add @recloudstudio/ui

// main.ts
import '@recloudstudio/ui/style.css'

// 组件与图标按需导入
import { Button, useToast } from '@recloudstudio/ui'
import { Cloud } from '@recloudstudio/ui/icons'`
</script>
