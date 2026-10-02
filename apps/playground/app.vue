<template>
  <ToastProvider />
  <div class="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090E17] text-slate-700 dark:text-slate-200 transition-colors selection:bg-blue-100 dark:selection:bg-blue-900/40">
    <!-- 顶部导航栏 -->
    <header class="sticky top-0 z-40 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-[#090E17]/90 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-3">
          <BrandWordmark :height="28" />
          <Badge variant="subtle" color="primary" size="xs">v0.1.0-alpha</Badge>
        </NuxtLink>

        <div class="flex items-center gap-2">
          <Button
            variant="ghost"
            color="neutral"
            size="icon"
            :aria-label="isDark ? '切换至浅色模式' : '切换至深色模式'"
            class="rounded-lg"
            @click="toggle"
          >
            <Sun v-if="isDark" class="w-4 h-4 text-amber-400" />
            <Moon v-else class="w-4 h-4 text-slate-600" />
          </Button>
          <a
            href="https://github.com/ReCloudStudio"
            target="_blank"
            rel="noopener"
            aria-label="在 GitHub 上查看 ReCloud Studio"
            class="inline-flex h-7 items-center justify-center gap-1.5 rounded-lg bg-transparent px-2.5 text-xs font-semibold tracking-[-0.01em] text-slate-800 ring-1 ring-inset ring-slate-300 shadow-xs transition-all duration-150 ease-out hover:bg-slate-100/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-slate-200 dark:ring-slate-700 dark:hover:bg-slate-800/60"
          >
            <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </header>

    <div class="w-full max-w-7xl mx-auto px-5 sm:px-8 py-10 lg:py-12 flex gap-12 pb-24 lg:pb-12 flex-1">
      <!-- 分组侧边导航 -->
      <aside class="hidden lg:block w-60 shrink-0 sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-3 pb-8">
        <nav class="space-y-6">
          <div v-for="group in docGroups" :key="group.label" class="space-y-1">
            <span class="block px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400 dark:text-slate-500">{{ group.label }}</span>
            <NuxtLink
              v-for="item in group.items"
              :key="item.name"
              :to="docPath(item.name)"
              class="block px-3 py-1.5 text-sm rounded-lg transition-colors"
              :class="isActive(item.name)
                ? 'font-semibold bg-[#2563EB]/10 dark:bg-[#70ACFE]/15 text-[#2563EB] dark:text-[#70ACFE]'
                : 'font-medium text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-800/70'"
            >{{ item.title }}</NuxtLink>
          </div>
        </nav>
      </aside>

      <!-- 移动端横向分类导航 -->
      <div class="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 dark:bg-[#090E17]/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800/80">
        <nav class="flex gap-1 overflow-x-auto px-4 py-2.5 no-scrollbar">
          <NuxtLink
            v-for="item in flatDocs"
            :key="item.name"
            :to="docPath(item.name)"
            class="shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-colors"
            :class="isActive(item.name)
              ? 'bg-[#2563EB]/10 dark:bg-[#70ACFE]/15 text-[#2563EB] dark:text-[#70ACFE]'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/70'"
          >{{ item.title }}</NuxtLink>
        </nav>
      </div>

      <main class="flex-1 min-w-0 max-w-3xl">
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
import { useTheme } from '@recloudstudio/ui'
import { docGroups, docPath, flatDocs } from '~/utils/catalog'

const route = useRoute()
const { isDark, toggle } = useTheme()

const currentName = computed(() => {
  const path = route.path
  if (path === '/' || path === '') return 'index'
  const m = path.match(/^\/components\/([^/]+)/)
  return m ? m[1] : ''
})

function isActive(name: string): boolean {
  return currentName.value === name
}
</script>
