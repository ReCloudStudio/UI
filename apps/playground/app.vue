<template>
  <ToastProvider />
  <PreviewBanner />
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090E17] text-slate-700 dark:text-slate-200 transition-colors">
    <Navbar brand-to="/" :links="topLinks">
      <template #logo>
        <BrandWordmark :height="28" />
        <Badge variant="subtle" color="primary" size="xs">v0.3.0</Badge>
      </template>
      <template #extra>
        <Button
          variant="ghost"
          color="neutral"
          size="icon"
          :aria-label="isDark ? '切换至浅色模式' : '切换至深色模式'"
          class="rounded-lg"
          @click="toggle"
        >
          <Sun v-if="isDark" class="h-4 w-4 text-amber-400" />
          <Moon v-else class="h-4 w-4 text-slate-600" />
        </Button>
      </template>
      <template #actions>
        <Button
          href="https://github.com/ReCloudStudio"
          target="_blank"
          rel="noopener"
          variant="outline"
          color="neutral"
          size="sm"
        >
          GitHub
        </Button>
      </template>
    </Navbar>

    <div class="mx-auto flex w-full max-w-[90rem] flex-1 gap-[clamp(1.25rem,3vw,3rem)] px-[clamp(0.75rem,1.8vw,2rem)] py-10 pb-24 lg:py-12 lg:pb-12">
      <!-- 分组侧边导航 -->
      <aside class="hidden max-h-[calc(100vh-7rem)] w-[clamp(13rem,18vw,16rem)] shrink-0 overflow-y-auto pb-8 pr-2 lg:sticky lg:top-24 lg:block">
        <NavTree :groups="navigationGroups" :active-href="route.path" size="comfortable" />
      </aside>

      <aside class="fixed inset-x-0 bottom-0 z-30 max-h-52 overflow-y-auto border-t border-[color:var(--border)] bg-[color:var(--background)]/95 p-4 backdrop-blur-md lg:hidden">
        <NavTree :groups="navigationGroups" :active-href="route.path" searchable />
      </aside>

      <main class="flex-1 min-w-0">
        <NuxtPage />
      </main>
    </div>

    <DocFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { BrandWordmark, Sun, Moon } from '@recloudstudio/ui/icons'
import { useTheme, type NavTreeGroup } from '@recloudstudio/ui'
import { docGroups, docPath } from '~/utils/catalog'

const route = useRoute()
const { isDark, toggle } = useTheme()

// 顶栏只放精选入口；完整目录由侧边栏与移动端 NavTree 承载，避免 74 项链接撑爆顶栏
const topLinks = computed(() => [
  { label: '介绍', to: '/', active: route.path === '/' },
  { label: '快速开始', to: '/#quick-start', active: false },
  { label: '组件总览', to: '/#components', active: false },
  { label: '色彩与渐变', to: '/components/colors', active: route.path === '/components/colors' }
])

const navigationGroups = computed<NavTreeGroup[]>(() => docGroups.map(group => ({
  title: group.label,
  items: group.items.map(item => ({
    title: item.title,
    to: docPath(item.name)
  }))
})))
</script>
