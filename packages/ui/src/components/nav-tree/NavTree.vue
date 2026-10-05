<template>
  <nav :class="['w-full space-y-4 text-sm', props.class]" aria-label="文档侧栏导航">
    <!-- Optional Search Input -->
    <div v-if="searchable" class="relative">
      <input
        v-model="query"
        type="search"
        :placeholder="searchPlaceholder || docsLoc.searchPlaceholder"
        class="w-full rounded-lg border border-slate-200/80 bg-white px-3 py-1.5 pl-8 text-xs text-slate-900 placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-1 focus:ring-[#2563EB] dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500"
      />
      <svg class="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8" />
        <path stroke-linecap="round" d="m21 21-4.35-4.35" />
      </svg>
    </div>

    <!-- Groups list -->
    <div class="space-y-6">
      <div v-for="(group, gIdx) in filteredGroups" :key="group.title + gIdx" class="space-y-2">
        <!-- Group Header -->
        <div
          :class="[
            'flex items-center justify-between px-2 text-xs font-semibold tracking-wider text-slate-500 uppercase dark:text-slate-400',
            group.collapsible ? 'cursor-pointer select-none hover:text-slate-800 dark:hover:text-slate-200' : ''
          ]"
          @click="group.collapsible && toggleGroup(group.title)"
        >
          <span>{{ group.title }}</span>
          <button
            v-if="group.collapsible"
            type="button"
            class="rounded p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <svg
              class="h-3.5 w-3.5 transition-transform duration-200"
              :class="isGroupCollapsed(group.title) ? '-rotate-90' : ''"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>

        <!-- Group items -->
        <ul v-show="!isGroupCollapsed(group.title)" class="space-y-0.5">
          <li v-for="item in group.items" :key="item.href || item.to || item.title">
            <component
              :is="item.to ? 'RouterLink' : 'a'"
              v-bind="item.to ? { to: item.to } : { href: item.href || '#' }"
              :class="[
                'group flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2563EB]',
                isItemActive(item)
                  ? 'bg-[#2563EB]/10 font-semibold text-[#1D4ED8] dark:bg-[#2563EB]/20 dark:text-[#70ACFE]'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
              ]"
            >
              <div class="flex items-center gap-2 truncate">
                <Icon :icon="item.icon" v-if="item.icon" size="0.875rem" />
                <span class="truncate">{{ item.title }}</span>
              </div>
              <span
                v-if="item.badge"
                class="ml-2 inline-flex shrink-0 items-center rounded px-1.5 py-0.2 text-[10px] font-semibold text-[#1D4ED8] bg-[#2563EB]/10 dark:text-[#70ACFE] dark:bg-[#70ACFE]/10"
              >
                {{ item.badge }}
              </span>
            </component>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Icon } from '../icon'
import { useComponentLocale } from '../../locale'
import type { NavTreeGroup, NavTreeItem, NavTreeProps } from './types'

const props = withDefaults(defineProps<NavTreeProps>(), {
  groups: () => [],
  activeHref: '',
  searchable: false,
  searchPlaceholder: undefined,
  class: ''
})

const docsLoc = useComponentLocale('docs')
const query = ref('')
const collapsedGroups = ref<Set<string>>(new Set())

function isGroupCollapsed(title: string): boolean {
  return collapsedGroups.value.has(title)
}

function toggleGroup(title: string) {
  if (collapsedGroups.value.has(title)) {
    collapsedGroups.value.delete(title)
  } else {
    collapsedGroups.value.add(title)
  }
}

function isItemActive(item: NavTreeItem): boolean {
  if (!props.activeHref) return false
  const target = item.to || item.href
  return target === props.activeHref
}

const filteredGroups = computed<NavTreeGroup[]>(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return props.groups

  return props.groups
    .map((g) => ({
      ...g,
      items: g.items.filter((item) => item.title.toLowerCase().includes(q))
    }))
    .filter((g) => g.items.length > 0)
})
</script>
