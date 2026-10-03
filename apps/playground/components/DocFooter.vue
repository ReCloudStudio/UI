<template>
  <footer class="border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-[#0B1220]">
    <div class="max-w-7xl mx-auto px-5 sm:px-8 pt-12 pb-28 lg:pb-12">
      <div class="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <div class="max-w-sm space-y-3">
          <NuxtLink to="/" class="inline-flex items-center">
            <BrandWordmark :height="26" />
          </NuxtLink>
          <p class="text-sm leading-6 text-slate-500 dark:text-slate-400">
            为 ReCloud Studio 控制台而生的 <span class="whitespace-nowrap">Vue 3 / Nuxt 4</span> 组件库，遵循官方品牌设计规范。
          </p>
          <div class="flex items-center gap-2 pt-1">
            <a href="https://github.com/ReCloudStudio" target="_blank" rel="noopener" aria-label="GitHub">
              <Button variant="ghost" color="neutral" size="icon" class="rounded-lg">
                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </Button>
            </a>
            <a href="https://docs.worldexecute.me/brand/design/" target="_blank" rel="noopener" aria-label="设计规范">
              <Button variant="ghost" color="neutral" size="icon" class="rounded-lg">
                <BookOpen class="w-4 h-4" />
              </Button>
            </a>
            <a href="https://icon.worldexecute.me" target="_blank" rel="noopener" aria-label="品牌图标">
              <Button variant="ghost" color="neutral" size="icon" class="rounded-lg">
                <Cloud class="w-4 h-4" />
              </Button>
            </a>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3">
          <div v-for="group in groups" :key="group.label" class="space-y-2.5">
            <span class="block text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 dark:text-slate-400">{{ group.label }}</span>
            <ul class="space-y-2">
              <li v-for="link in group.links" :key="link.label">
                <NuxtLink
                  v-if="link.to"
                  :to="link.to"
                  class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
                >{{ link.label }}</NuxtLink>
                <a
                  v-else
                  :href="link.href"
                  target="_blank"
                  rel="noopener"
                  class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"
                >{{ link.label }}</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-12 pt-6 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p class="text-xs text-slate-500 dark:text-slate-400">
          © 2026 ReCloud Studio · 代码以 AGPL-3.0 协议开源
        </p>
        <div class="flex items-center gap-2">
          <Badge variant="subtle" color="primary" size="xs">v0.1.0-alpha</Badge>
          <span class="text-xs text-slate-500 dark:text-slate-400">Vue 3 · Nuxt 4 · Reka UI · Tailwind v4</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { BrandWordmark, BookOpen, Cloud } from '@recloudstudio/ui/icons'

type FooterLink = {
  label: string
  to?: string
  href?: string
}

type FooterGroup = {
  label: string
  links: FooterLink[]
}

const groups: FooterGroup[] = [
  {
    label: '文档',
    links: [
      { label: '快速开始', to: '/' },
      { label: '色彩与渐变', to: '/components/colors' },
      { label: 'Button 按钮', to: '/components/button' },
      { label: '全部组件', to: '/' }
    ]
  },
  {
    label: '品牌',
    links: [
      { label: '设计规范', href: 'https://docs.worldexecute.me/brand/design/' },
      { label: '官方图标库', href: 'https://icon.worldexecute.me' },
      { label: 'ReCloud Studio', href: 'https://github.com/ReCloudStudio' }
    ]
  },
  {
    label: '资源',
    links: [
      { label: 'GitHub', href: 'https://github.com/ReCloudStudio' },
      { label: 'AGPL-3.0 协议', href: 'https://www.gnu.org/licenses/agpl-3.0.html' },
      { label: 'Reka UI', href: 'https://reka-ui.com' },
      { label: 'Nuxt 4', href: 'https://nuxt.com' }
    ]
  }
]
</script>
