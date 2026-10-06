<template>
  <nav
    :class="[
      'space-y-3 text-sm',
      props.class
    ]"
    :aria-label="title || docsLoc.toc"
  >
    <!-- Header / Title -->
    <div class="flex items-center gap-2 font-medium text-slate-900 dark:text-slate-100">
      <svg class="h-4 w-4 text-[color:var(--primary)] dark:text-[color:var(--primary)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
      </svg>
      <slot name="title">
        <span>{{ title || docsLoc.toc }}</span>
      </slot>
    </div>

    <!-- Empty fallback -->
    <div v-if="parsedItems.length === 0" class="text-xs text-slate-400 dark:text-slate-500 py-1">
      暂无目录
    </div>

    <!-- Tree items -->
    <ul v-else class="space-y-1.5 border-l border-slate-200/80 dark:border-slate-800">
      <li
        v-for="item in parsedItems"
        :key="item.id"
        :class="[
          'relative text-xs leading-relaxed transition-colors',
          item.level === 3 ? 'pl-6' : 'pl-3'
        ]"
      >
        <!-- Active indicator line -->
        <span
          v-if="activeId === item.id"
          class="absolute -left-px top-1 bottom-1 w-0.5 rounded-full bg-[color:var(--primary)] dark:bg-[color:var(--primary)]"
        />
        <a
          :href="`#${item.id}`"
          :class="[
            'block truncate transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--ring)]',
            activeId === item.id
              ? 'font-medium text-[color:var(--primary)] dark:text-[color:var(--primary)]'
              : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
          ]"
          @click.prevent="scrollTo(item.id)"
        >
          {{ item.title }}
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useComponentLocale } from '../../locale'
import type { TocItem, TocProps } from './types'

const props = withDefaults(defineProps<TocProps>(), {
  items: undefined,
  selector: 'h2, h3',
  container: undefined,
  scrollSpy: true,
  title: undefined,
  offset: 80,
  class: ''
})

const docsLoc = useComponentLocale('docs')
const dynamicItems = ref<TocItem[]>([])
const activeId = ref<string>('')

const parsedItems = computed<TocItem[]>(() => {
  if (props.items && props.items.length > 0) return props.items
  return dynamicItems.value
})

function collectHeadings() {
  if (typeof document === 'undefined') return
  if (props.items && props.items.length > 0) return

  const root = props.container ? document.querySelector(props.container) : document
  if (!root) return

  const elements = root.querySelectorAll(props.selector)
  const items: TocItem[] = []

  elements.forEach((el) => {
    const id = el.id
    const title = el.textContent?.replace(/^#\s*/, '').trim() || ''
    const tagName = el.tagName.toLowerCase()
    const level = tagName === 'h3' ? 3 : 2

    if (id && title) {
      items.push({ id, title, level })
    }
  })

  dynamicItems.value = items
  if (items.length > 0 && !activeId.value) {
    activeId.value = items[0]?.id ?? ''
  }
}

function scrollTo(id: string) {
  if (typeof document === 'undefined') return
  const el = document.getElementById(id)
  if (!el) return

  activeId.value = id
  const targetTop = el.getBoundingClientRect().top + window.scrollY - props.offset
  window.scrollTo({
    top: Math.max(0, targetTop),
    behavior: 'smooth'
  })

  if (history.pushState) {
    history.pushState(null, '', `#${id}`)
  }
}

let observer: IntersectionObserver | null = null

function setupObserver() {
  if (typeof window === 'undefined' || !props.scrollSpy) return
  if (!('IntersectionObserver' in window)) return

  observer?.disconnect()

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
          break
        }
      }
    },
    {
      rootMargin: `-${props.offset}px 0px -60% 0px`,
      threshold: 0
    }
  )

  const ids = parsedItems.value.map((i) => i.id)
  ids.forEach((id) => {
    const el = document.getElementById(id)
    if (el) observer?.observe(el)
  })
}

onMounted(() => {
  collectHeadings()
  setupObserver()
})

watch(
  () => [props.items, props.selector, props.container],
  () => {
    collectHeadings()
    setupObserver()
  },
  { deep: true }
)

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>
