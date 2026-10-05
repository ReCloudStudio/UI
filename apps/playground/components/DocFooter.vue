<template>
  <Footer
    :columns="columns"
    copyright="© 2026 ReCloud Studio · 代码以 AGPL-3.0 协议开源"
    :socials="socials"
    class="pb-16 lg:pb-0"
  >
    <template #logo>
      <NuxtLink to="/" class="inline-flex items-center">
        <BrandWordmark :height="26" />
      </NuxtLink>
    </template>
    <template #description>
      为 ReCloud Studio 控制台与文档门户而生的 <span class="whitespace-nowrap">Vue 3 / Nuxt 4</span> 组件库，遵循官方品牌设计规范。
    </template>
    <template #socials>
      <a href="https://github.com/ReCloudStudio" target="_blank" rel="noopener" aria-label="GitHub">
        <Button variant="ghost" color="neutral" size="icon" class="rounded-lg">
          GitHub
        </Button>
      </a>
      <a href="https://docs.worldexecute.me/brand/design/" target="_blank" rel="noopener" aria-label="设计规范">
        <Button variant="ghost" color="neutral" size="icon" class="rounded-lg">
          <BookOpen class="h-4 w-4" />
        </Button>
      </a>
      <a href="https://icon.worldexecute.me" target="_blank" rel="noopener" aria-label="品牌图标">
        <Button variant="ghost" color="neutral" size="icon" class="rounded-lg">
          <Cloud class="h-4 w-4" />
        </Button>
      </a>
      <Badge variant="subtle" color="primary" size="xs">v0.3.0</Badge>
    </template>
  </Footer>
</template>

<script setup lang="ts">
import type { FooterColumn, FooterSocial } from '@recloudstudio/ui'
import { BrandWordmark, BookOpen, Cloud } from '@recloudstudio/ui/icons'

const columns: FooterColumn[] = [
  {
    title: '文档',
    links: [
      { label: '快速开始', to: '/' },
      { label: '色彩与渐变', to: '/components/colors' },
      { label: 'Button 按钮', to: '/components/button' },
      { label: '全部组件', to: '/' }
    ]
  },
  {
    title: '品牌',
    links: [
      { label: '设计规范', href: 'https://docs.worldexecute.me/brand/design/' },
      { label: '官方图标库', href: 'https://icon.worldexecute.me' },
      { label: 'ReCloud Studio', href: 'https://github.com/ReCloudStudio' }
    ]
  },
  {
    title: '资源',
    links: [
      { label: 'GitHub', href: 'https://github.com/ReCloudStudio' },
      { label: 'AGPL-3.0 协议', href: 'https://www.gnu.org/licenses/agpl-3.0.html' },
      { label: 'Reka UI', href: 'https://reka-ui.com' },
      { label: 'Nuxt 4', href: 'https://nuxt.com' }
    ]
  }
]

const socials: FooterSocial[] = []
</script>
