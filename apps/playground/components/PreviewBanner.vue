<template>
  <div
    v-if="showBanner"
    class="relative z-50 border-b border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-amber-500/15 to-amber-500/10 px-4 py-2 text-xs font-medium text-amber-900 dark:border-amber-400/20 dark:text-amber-200"
    role="region"
    aria-label="环境预览提示"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-3">
      <div class="flex items-center gap-2 overflow-hidden">
        <span class="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-2 py-0.5 text-[11px] font-semibold text-amber-800 dark:bg-amber-400/20 dark:text-amber-200">
          <span class="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
          {{ envBadge }}
        </span>
        <span class="truncate">
          当前处于{{ envTitle }}环境
          <span v-if="branch" class="font-mono opacity-80">({{ branch }})</span>
          <span v-if="shortSha" class="ml-1 font-mono opacity-60">@{{ shortSha }}</span>
          ，部分未发布的组件或实验性功能可能会在此预览测试。
        </span>
      </div>

      <div class="flex shrink-0 items-center gap-2">
        <a
          v-if="commitUrl"
          :href="commitUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-amber-800 underline decoration-amber-500/50 underline-offset-2 transition-colors hover:text-amber-950 dark:text-amber-200 dark:hover:text-amber-100"
        >
          查看提交
        </a>
        <button
          type="button"
          class="rounded p-1 text-amber-700 transition-colors hover:bg-amber-500/20 hover:text-amber-950 dark:text-amber-300 dark:hover:text-amber-100"
          aria-label="关闭提示"
          @click="dismissed = true"
        >
          <svg class="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRuntimeConfig } from '#app'

const config = useRuntimeConfig()
const dismissed = ref(false)

const cfPages = computed(() => Boolean(config.public.cfPages))
const branch = computed(() => String(config.public.cfPagesBranch || ''))
const commitSha = computed(() => String(config.public.cfPagesCommitSha || ''))
const shortSha = computed(() => commitSha.value ? commitSha.value.slice(0, 7) : '')

const isDev = process.dev || process.env.NODE_ENV !== 'production'
const isPreviewBranch = computed(() => {
  if (!branch.value) return false
  // 生产主分支一般为 main 或 master，其他分支（如 dev、preview、pr 等）均为非生产预览
  return branch.value !== 'main' && branch.value !== 'master'
})

const showBanner = computed(() => {
  if (dismissed.value) return false
  // 1. 本地开发环境展示 dev 提示
  if (isDev) return true
  // 2. Cloudflare Pages 非主分支预览部署展示 preview 提示
  if (cfPages.value && isPreviewBranch.value) return true
  return false
})

const envBadge = computed(() => {
  if (isDev) return 'Local Dev'
  if (cfPages.value) return 'Cloudflare Preview'
  return 'Preview'
})

const envTitle = computed(() => {
  if (isDev) return '本地开发'
  if (cfPages.value) return 'Cloudflare Pages 分支预览'
  return '预览'
})

const commitUrl = computed(() => {
  if (!commitSha.value) return ''
  return `https://github.com/ReCloudStudio/UI/commit/${commitSha.value}`
})
</script>
