<template>
  <nav
    ref="navRef"
    class="relative flex items-center gap-1"
    :class="props.class"
    @mouseleave="scheduleClose"
  >
    <div
      v-for="item in props.items"
      :key="item.value"
      class="relative"
      :data-nav-item="item.value"
      @mouseenter="onEnter(item)"
    >
      <button
        type="button"
        class="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors"
        :class="
          active === item.value
            ? 'bg-slate-100/70 text-[#2563EB] dark:bg-slate-800 dark:text-[#70ACFE]'
            : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100'
        "
        :aria-expanded="active === item.value"
        @click="onTriggerClick(item)"
        @focus="onEnter(item)"
      >
        {{ item.label }}
        <svg
          v-if="item.panel !== undefined || hasSlotPanel"
          class="h-3.5 w-3.5 transition-transform"
          :class="active === item.value ? 'rotate-180' : ''"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="m6 9 6 6 6-6" />
        </svg>
      </button>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-150 ease-out"
        enter-from-class="opacity-0 -translate-y-1"
        leave-active-class="transition duration-100 ease-in"
        leave-to-class="opacity-0"
      >
        <div
          v-if="openItem"
          :style="panelStyle"
          class="fixed z-50 w-64 rounded-lg bg-white p-2 text-sm shadow-lg ring-1 ring-inset ring-slate-200 dark:bg-[#0F172A] dark:ring-slate-800"
          @mouseenter="cancelClose"
          @mouseleave="scheduleClose"
        >
          <slot v-if="hasSlotPanel" name="panel" :item="openItem" />
          <component :is="openItem.panel" v-else-if="openItem.panel" />
        </div>
      </Transition>
    </Teleport>
  </nav>
</template>

<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  ref,
  watch,
  type Component,
  type CSSProperties
} from 'vue'

export interface NavigationMenuItem {
  label: string
  value: string
  panel?: Component
}

export interface NavigationMenuProps {
  items: NavigationMenuItem[]
  modelValue?: string
  class?: string
}

const props = withDefaults(defineProps<NavigationMenuProps>(), {
  modelValue: '',
  class: ''
})

const slots = defineSlots<{
  panel?: (props: { item: NavigationMenuItem }) => Component
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const hovered = ref<string | null>(null)
const pinned = ref<string | null>(null)

const active = computed(() => pinned.value ?? hovered.value ?? props.modelValue)

const hasSlotPanel = computed(() => !!slots.panel)

function hasPanel(item: NavigationMenuItem) {
  return hasSlotPanel.value || item.panel !== undefined
}

const openItem = computed(
  () => props.items.find((item) => item.value === active.value && hasPanel(item)) ?? null
)

const navRef = ref<HTMLElement | null>(null)
const panelStyle = ref<CSSProperties>({})
const closeTimer = ref<ReturnType<typeof setTimeout> | null>(null)

const PANEL_WIDTH = 256

function updatePosition() {
  const value = active.value
  if (!value || !navRef.value || typeof window === 'undefined') return
  const el = navRef.value.querySelector<HTMLElement>(`[data-nav-item="${value}"]`)
  if (!el) return
  const rect = el.getBoundingClientRect()
  const left = Math.min(Math.max(rect.left, 8), window.innerWidth - PANEL_WIDTH - 8)
  panelStyle.value = { position: 'fixed', top: `${rect.bottom + 8}px`, left: `${left}px` }
}

function onScrollOrResize() {
  if (openItem.value) updatePosition()
}

watch(
  active,
  (value) => {
    if (value && typeof window !== 'undefined') {
      updatePosition()
      window.addEventListener('scroll', onScrollOrResize, true)
      window.addEventListener('resize', onScrollOrResize)
    } else if (typeof window !== 'undefined') {
      window.removeEventListener('scroll', onScrollOrResize, true)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }
)

onBeforeUnmount(() => {
  cancelClose()
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', onScrollOrResize, true)
    window.removeEventListener('resize', onScrollOrResize)
  }
})

function cancelClose() {
  if (closeTimer.value) {
    clearTimeout(closeTimer.value)
    closeTimer.value = null
  }
}

function scheduleClose() {
  cancelClose()
  closeTimer.value = setTimeout(() => {
    hovered.value = null
    closeTimer.value = null
  }, 150)
}

function onEnter(item: NavigationMenuItem) {
  cancelClose()
  hovered.value = item.value
  pinned.value = null
}

function onTriggerClick(item: NavigationMenuItem) {
  if (!hasPanel(item)) {
    pinned.value = null
    emit('update:modelValue', item.value)
    return
  }
  pinned.value = pinned.value === item.value ? null : item.value
}
</script>
