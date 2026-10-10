<template>
  <div :class="cn('flex flex-col overflow-hidden rounded-xl border border-border bg-slate-950 font-mono text-xs text-slate-200 shadow-sm', props.class)">
    <!-- Header Toolbar -->
    <div class="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-900/90 px-3 py-2 text-slate-300">
      <div class="flex items-center gap-2">
        <slot name="title">
          <span class="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span class="font-medium text-slate-200">{{ title || 'Logs' }}</span>
        </slot>
        <span class="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-400 rc-tabular-nums">
          {{ filteredEntries.length }} lines
        </span>
      </div>

      <div class="flex items-center gap-2">
        <!-- Search filter input -->
        <div v-if="searchable" class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Filter logs..."
            class="h-6 w-32 rounded border border-slate-700 bg-slate-950 px-2 text-[11px] text-slate-200 placeholder-slate-500 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:w-44"
          />
          <button
            v-if="searchQuery"
            type="button"
            class="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
            @click="searchQuery = ''"
          >
            ×
          </button>
        </div>

        <!-- Auto scroll toggle -->
        <button
          v-if="autoScroll !== undefined"
          type="button"
          :class="cn('rounded px-1.5 py-1 text-[11px] transition-colors', isFollowing ? 'bg-primary/20 text-primary' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200')"
          @click="isFollowing = !isFollowing"
        >
          Follow
        </button>

        <!-- Copy button -->
        <button
          v-if="copyable"
          type="button"
          class="rounded px-1.5 py-1 text-[11px] text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-200"
          @click="copyLogs"
        >
          {{ copied ? 'Copied' : 'Copy' }}
        </button>

        <!-- Clear slot / action -->
        <slot name="actions" />
      </div>
    </div>

    <!-- Log lines viewport -->
    <div
      ref="viewportRef"
      :style="{ height }"
      :class="cn('overflow-y-auto p-3 text-[12px] leading-relaxed select-text', wrap ? 'whitespace-pre-wrap break-all' : 'whitespace-pre overflow-x-auto')"
      @scroll.passive="onScroll"
    >
      <div v-if="!filteredEntries.length" class="py-8 text-center text-slate-500">
        {{ emptyText || 'No log entries available' }}
      </div>

      <div
        v-for="(entry, index) in filteredEntries"
        :key="entry.id ?? index"
        class="flex items-baseline gap-2 hover:bg-slate-900/50"
      >
        <span
          v-if="showLineNumbers"
          class="w-8 shrink-0 select-none text-right text-slate-600 rc-tabular-nums"
        >
          {{ index + 1 }}
        </span>

        <span
          v-if="showTimestamps && entry.timestamp"
          class="shrink-0 select-none text-slate-500 rc-tabular-nums"
        >
          [{{ entry.timestamp }}]
        </span>

        <span
          v-if="entry.level"
          :class="levelBadgeClasses[entry.level]"
          class="shrink-0 select-none rounded px-1 text-[10px] uppercase font-semibold"
        >
          {{ entry.level }}
        </span>

        <span :class="levelMessageClasses[entry.level ?? 'info']" class="flex-1">
          {{ entry.message }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { cn } from '../../utils/cn'
import type { LogEntry, LogViewerLevel, LogViewerProps } from './types'

const props = withDefaults(defineProps<LogViewerProps>(), {
  logs: () => [],
  title: 'Console Logs',
  height: '20rem',
  showLineNumbers: true,
  showTimestamps: false,
  searchable: true,
  copyable: true,
  autoScroll: true,
  wrap: false,
  emptyText: 'No log output',
  class: ''
})

const searchQuery = ref('')
const copied = ref(false)
const isFollowing = ref(props.autoScroll)
const viewportRef = ref<HTMLElement | null>(null)

const normalizedEntries = computed<LogEntry[]>(() => {
  return props.logs.map((item, idx) => {
    if (typeof item === 'string') {
      let level: LogViewerLevel = 'info'
      const lower = item.toLowerCase()
      if (lower.includes('error') || lower.includes('fail')) {
        level = 'error'
      } else if (lower.includes('warn')) {
        level = 'warn'
      } else if (lower.includes('debug')) {
        level = 'debug'
      }
      return { id: idx, message: item, level }
    }
    return item
  })
})

const filteredEntries = computed(() => {
  if (!searchQuery.value.trim()) return normalizedEntries.value
  const q = searchQuery.value.toLowerCase()
  return normalizedEntries.value.filter((entry) => {
    return (
      entry.message.toLowerCase().includes(q) ||
      (entry.level && entry.level.toLowerCase().includes(q)) ||
      (entry.timestamp && entry.timestamp.toLowerCase().includes(q))
    )
  })
})

const levelBadgeClasses: Record<LogViewerLevel, string> = {
  info: 'bg-sky-950 text-sky-400 border border-sky-800/60',
  warn: 'bg-amber-950 text-amber-400 border border-amber-800/60',
  error: 'bg-red-950 text-red-400 border border-red-800/60',
  debug: 'bg-slate-800 text-slate-400 border border-slate-700'
}

const levelMessageClasses: Record<LogViewerLevel, string> = {
  info: 'text-slate-200',
  warn: 'text-amber-200',
  error: 'text-red-300 font-medium',
  debug: 'text-slate-400'
}

function scrollToBottom() {
  if (!viewportRef.value || !isFollowing.value) return
  nextTick(() => {
    if (viewportRef.value) {
      viewportRef.value.scrollTop = viewportRef.value.scrollHeight
    }
  })
}

function onScroll() {
  if (!viewportRef.value) return
  const { scrollTop, scrollHeight, clientHeight } = viewportRef.value
  const atBottom = scrollHeight - scrollTop - clientHeight < 24
  if (!atBottom && isFollowing.value) {
    isFollowing.value = false
  }
}

watch(
  () => props.logs.length,
  () => {
    if (isFollowing.value) {
      scrollToBottom()
    }
  }
)

watch(isFollowing, (val) => {
  if (val) {
    scrollToBottom()
  }
})

async function copyLogs() {
  const text = filteredEntries.value.map((e) => e.message).join('\n')
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    // fallback
  }
}
</script>
