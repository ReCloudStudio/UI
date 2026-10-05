<template>
  <div
    v-if="showBanner"
    class="relative z-50 border-b border-blue-500/15 bg-slate-900/[0.03] backdrop-blur-md px-4 py-2 text-xs text-slate-700 transition-colors dark:border-blue-400/15 dark:bg-slate-950/40 dark:text-slate-300"
    role="region"
    aria-label="环境预览提示"
  >
    <div class="mx-auto flex max-w-7xl items-center justify-between gap-4">
      <div class="flex min-w-0 items-center gap-2.5">
        <span
          class="inline-flex shrink-0 items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-wide ring-1 ring-inset"
          :class="isDev
            ? 'bg-amber-500/10 text-amber-700 ring-amber-500/25 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/25'
            : 'bg-[#2563EB]/10 text-[#1D4ED8] ring-[#2563EB]/25 dark:bg-[#70ACFE]/10 dark:text-[#70ACFE] dark:ring-[#70ACFE]/25'"
        >
          <span
            class="h-1.5 w-1.5 rounded-full"
            :class="isDev ? 'bg-amber-500 animate-pulse' : 'bg-[#2563EB] dark:bg-[#70ACFE] animate-pulse'"
          />
          {{ envBadge }}
        </span>

        <p class="truncate text-xs leading-none">
          <span class="font-medium text-slate-900 dark:text-slate-100">{{ envTitle }}</span>
          <span v-if="branch" class="ml-1.5 inline-flex items-center gap-1 rounded bg-slate-200/60 px-1.5 py-0.5 font-mono text-[11px] text-slate-800 dark:bg-slate-800 dark:text-slate-200">
            <svg class="h-3 w-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="6" y1="3" x2="6" y2="15" />
              <circle cx="18" cy="6" r="3" />
              <circle cx="6" cy="18" r="3" />
              <path d="M18 9a9 9 0 0 1-9 9" />
            </svg>
            {{ branch }}
          </span>
          <span v-if="shortSha" class="ml-1 font-mono text-[11px] text-slate-500 dark:text-slate-400">@{{ shortSha }}</span>
          <span class="mx-2 hidden text-slate-300 sm:inline dark:text-slate-700">·</span>
          <span class="hidden text-slate-500 sm:inline dark:text-slate-400">此环境包含未发布的组件与实验性功能。</span>
        </p>
      </div>

      <div class="flex shrink-0 items-center gap-2">
        <a
          v-if="commitUrl"
          :href="commitUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-medium text-slate-600 transition-colors hover:bg-slate-200/60 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
        >
          <span>提交记录</span>
          <svg class="h-3 w-3 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>

        <button
          type="button"
          class="inline-flex h-6 w-6 items-center justify-center rounded-md text-slate-400 transition-colors hover:bg-slate-200/60 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200"
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
  return branch.value !== 'main' && branch.value !== 'master'
})

const showBanner = computed(() => {
  if (dismissed.value) return false
  if (isDev) return true
  if (cfPages.value && isPreviewBranch.value) return true
  return false
})

const envBadge = computed(() => {
  if (isDev) return 'Local Dev'
  if (cfPages.value) return 'Preview'
  return 'Preview'
})

const envTitle = computed(() => {
  if (isDev) return '本地开发环境'
  if (cfPages.value) return 'Cloudflare Pages 预览环境'
  return '预览环境'
})

const commitUrl = computed(() => {
  if (!commitSha.value) return ''
  return `https://github.com/ReCloudStudio/UI/commit/${commitSha.value}`
})
</script>
