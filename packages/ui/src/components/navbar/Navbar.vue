<template>
  <header
    :class="[
      'w-full bg-white/80 backdrop-blur-md dark:bg-[#0B1220]/80 z-40 transition-colors',
      sticky ? 'sticky top-0' : 'relative',
      bordered ? 'border-b border-slate-200/80 dark:border-slate-800' : '',
      props.class
    ]"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- Left: Brand / Logo -->
      <div class="flex items-center gap-6">
        <component
          :is="brandTo ? 'RouterLink' : 'a'"
          v-bind="brandTo ? { to: brandTo } : { href: brandHref || '/' }"
          class="flex items-center gap-2.5 font-bold text-slate-900 transition-colors hover:opacity-90 dark:text-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]"
        >
          <slot name="logo">
            <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2563EB] text-white font-black text-sm shadow-sm">
              RC
            </div>
          </slot>
          <span v-if="brandTitle || $slots.brand" class="text-base tracking-tight">
            <slot name="brand">{{ brandTitle }}</slot>
          </span>
        </component>

        <!-- Desktop Navigation Links -->
        <nav v-if="links.length > 0 || $slots.links" class="hidden md:flex md:items-center md:gap-1" aria-label="主站导航">
          <slot name="links">
            <component
              :is="link.to ? 'RouterLink' : 'a'"
              v-for="link in links"
              :key="link.label + (link.to || link.href)"
              v-bind="link.to ? { to: link.to } : { href: link.href || '#', target: link.target }"
              :class="[
                'relative flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB]',
                link.active
                  ? 'text-[#2563EB] font-semibold dark:text-[#70ACFE]'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-100'
              ]"
            >
              <span>{{ link.label }}</span>
              <span
                v-if="link.badge"
                class="rounded bg-[#2563EB]/10 px-1.5 py-0.5 text-[10px] font-semibold text-[#1D4ED8] dark:bg-[#70ACFE]/10 dark:text-[#70ACFE]"
              >
                {{ link.badge }}
              </span>
            </component>
          </slot>
        </nav>
      </div>

      <!-- Right: Action CTAs + Mobile Burger -->
      <div class="flex items-center gap-2 sm:gap-3">
        <!-- Custom action/extra slot (e.g. ThemeToggle, Search, Github) -->
        <slot name="extra" />

        <!-- Actions / CTAs -->
        <div v-if="$slots.actions" class="hidden sm:flex sm:items-center sm:gap-2">
          <slot name="actions" />
        </div>

        <!-- Mobile hamburger trigger -->
        <div class="flex md:hidden">
          <button
            type="button"
            class="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100"
            :aria-label="mobileOpen ? '关闭菜单' : '打开菜单'"
            @click="mobileOpen = !mobileOpen"
          >
            <svg v-if="!mobileOpen" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Drawer / Sheet -->
    <Sheet
      :open="mobileOpen"
      side="right"
      size="20rem"
      :title="brandTitle || '导航'"
      @update:open="mobileOpen = $event"
    >
      <div class="flex flex-col h-full justify-between py-2">
        <!-- Mobile Links -->
        <nav class="space-y-1" aria-label="移动端主站导航">
          <slot name="mobile-links">
            <component
              :is="link.to ? 'RouterLink' : 'a'"
              v-for="link in links"
              :key="'m-' + link.label"
              v-bind="link.to ? { to: link.to } : { href: link.href || '#', target: link.target }"
              :class="[
                'flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                link.active
                  ? 'bg-[#2563EB]/10 font-semibold text-[#1D4ED8] dark:bg-[#2563EB]/20 dark:text-[#70ACFE]'
                  : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              ]"
              @click="mobileOpen = false"
            >
              <span>{{ link.label }}</span>
              <span
                v-if="link.badge"
                class="rounded bg-[#2563EB]/10 px-1.5 py-0.5 text-xs font-semibold text-[#1D4ED8] dark:bg-[#70ACFE]/10 dark:text-[#70ACFE]"
              >
                {{ link.badge }}
              </span>
            </component>
          </slot>
        </nav>

        <!-- Mobile Actions -->
        <div v-if="$slots.actions" class="mt-6 border-t border-slate-200 pt-4 dark:border-slate-800">
          <div class="flex flex-col gap-2" @click="mobileOpen = false">
            <slot name="actions" />
          </div>
        </div>
      </div>
    </Sheet>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Sheet } from '../sheet'
import type { NavbarProps } from './types'

const props = withDefaults(defineProps<NavbarProps>(), {
  brandTitle: '',
  brandHref: '/',
  brandTo: undefined,
  links: () => [],
  sticky: true,
  bordered: true,
  class: ''
})

const mobileOpen = ref(false)
</script>
