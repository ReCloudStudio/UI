<template>
  <DialogRoot :open="open" @update:open="setOpen">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogContent
        class="fixed top-[16vh] left-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-slate-200 outline-none dark:bg-[#0F172A] dark:ring-slate-800 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        :class="props.class"
        @open-auto-focus="focusInput"
      >
        <DialogTitle class="sr-only">{{ effectiveLabel }}</DialogTitle>
        <div class="flex items-center gap-3 border-b border-slate-200 px-4 dark:border-slate-800">
          <svg class="h-4 w-4 shrink-0 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7" /><path stroke-linecap="round" d="m20 20-3.5-3.5" /></svg>
          <input
            ref="input"
            :value="query"
            type="text"
            role="combobox"
            aria-autocomplete="list"
            aria-controls="command-palette-list"
            :aria-activedescendant="activeItem ? itemDomId(activeItem) : undefined"
            :placeholder="effectivePlaceholder"
            class="h-14 min-w-0 grow bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
            @input="setQuery(($event.target as HTMLInputElement).value)"
            @keydown.down.prevent="moveActive(1)"
            @keydown.up.prevent="moveActive(-1)"
            @keydown.enter.prevent="selectActive"
            @keydown.esc.prevent="setOpen(false)"
          >
          <kbd v-if="props.shortcut" class="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">{{ displayShortcut }}</kbd>
        </div>

        <div id="command-palette-list" role="listbox" :aria-label="effectiveLabel" class="max-h-[min(60vh,30rem)] overflow-y-auto p-2">
          <template v-for="group in filteredGroups" :key="group.key">
            <div v-if="group.heading" class="px-2 pt-3 pb-1 text-[11px] font-semibold tracking-wider text-slate-400 uppercase dark:text-slate-500">{{ group.heading }}</div>
            <button
              v-for="item in group.items"
              :id="itemDomId(item)"
              :key="item.id"
              type="button"
              role="option"
              :aria-selected="activeItem?.id === item.id"
              :disabled="item.disabled"
              class="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left outline-none transition-colors disabled:pointer-events-none disabled:opacity-45"
              :class="activeItem?.id === item.id ? 'bg-slate-100 dark:bg-slate-800' : 'hover:bg-slate-50 dark:hover:bg-slate-800/60'"
              @mouseenter="setActive(item.id)"
              @click="selectItem(item)"
            >
              <Icon :icon="item.icon" v-if="item.icon" size="1rem" class="shrink-0 text-slate-500 dark:text-slate-400" />
              <slot name="item" :item="item" :active="activeItem?.id === item.id">
                <span class="min-w-0 grow">
                  <span class="block truncate text-sm font-medium text-slate-800 dark:text-slate-100">{{ item.label }}</span>
                  <span v-if="item.description" class="mt-0.5 block truncate text-xs text-slate-500 dark:text-slate-400">{{ item.description }}</span>
                </span>
                <span v-if="item.shortcut?.length" class="ml-auto flex shrink-0 gap-1">
                  <kbd v-for="key in item.shortcut" :key="key" class="rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-mono text-[10px] text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">{{ key }}</kbd>
                </span>
              </slot>
            </button>
          </template>
          <div v-if="!filteredItems.length" class="px-3 py-10 text-center text-sm text-slate-500 dark:text-slate-400">
            <slot name="empty" :query="query">{{ effectiveEmptyText }}</slot>
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { DialogContent, DialogOverlay, DialogPortal, DialogRoot, DialogTitle } from 'reka-ui'
import { Icon } from '../icon'
import { filterCommands } from './commandMatcher'
import { useComponentLocale } from '../../locale'
import type { CommandFilter, CommandGroup, CommandItem } from './types'

export interface CommandPaletteProps {
  open?: boolean
  query?: string
  groups: CommandGroup[]
  placeholder?: string
  emptyText?: string
  label?: string
  shortcut?: string
  /** Allow the global shortcut while typing in an editable element. */
  shortcutInEditable?: boolean
  filter?: CommandFilter
  class?: string
}

const props = withDefaults(defineProps<CommandPaletteProps>(), {
  open: false,
  query: undefined,
  placeholder: undefined,
  emptyText: undefined,
  label: undefined,
  shortcut: undefined,
  shortcutInEditable: false,
  filter: undefined,
  class: ''
})

const emit = defineEmits<{
  (event: 'update:open', value: boolean): void
  (event: 'update:query', value: string): void
  (event: 'select', item: CommandItem): void
}>()

const loc = useComponentLocale('command')
const effectiveLabel = computed(() => props.label ?? loc.value.label)
const effectivePlaceholder = computed(() => props.placeholder ?? loc.value.searchPlaceholder)
const effectiveEmptyText = computed(() => props.emptyText ?? loc.value.emptyText)

const input = ref<HTMLInputElement>()
const internalQuery = ref('')
const activeId = ref<string>()
const isQueryControlled = computed(() => props.query !== undefined)
const query = computed(() => isQueryControlled.value ? props.query ?? '' : internalQuery.value)
const allItems = computed(() => props.groups.flatMap((group) => group.items))
const filteredItems = computed(() => props.filter ? props.filter(allItems.value, query.value) : filterCommands(allItems.value, query.value))
const filteredGroups = computed(() => props.groups.map((group, index) => ({
  key: group.id ?? `${group.heading ?? 'group'}-${index}`,
  heading: group.heading,
  items: group.items.filter((item) => filteredItems.value.some((filtered) => filtered.id === item.id))
})).filter((group) => group.items.length > 0))
const enabledItems = computed(() => filteredItems.value.filter((item) => !item.disabled))
const activeItem = computed(() => enabledItems.value.find((item) => item.id === activeId.value))
const displayShortcut = computed(() => props.shortcut?.replace(/mod/gi, navigatorPlatformIsMac() ? '⌘' : 'Ctrl').replace(/\+/g, ' + '))

function navigatorPlatformIsMac() {
  return typeof navigator !== 'undefined' && /mac/i.test(navigator.platform)
}

function itemDomId(item: CommandItem) {
  return `command-palette-item-${item.id}`
}

function setOpen(value: boolean) {
  emit('update:open', value)
  if (value) {
    if (!isQueryControlled.value) internalQuery.value = ''
    nextTick(focusInput)
  }
}

function setQuery(value: string) {
  if (!isQueryControlled.value) internalQuery.value = value
  emit('update:query', value)
}

function setActive(id: string) {
  activeId.value = id
}

function moveActive(direction: 1 | -1) {
  const items = enabledItems.value
  if (!items.length) return
  const currentIndex = items.findIndex((item) => item.id === activeId.value)
  const nextIndex = (currentIndex + direction + items.length) % items.length
  activeId.value = items[nextIndex].id
  document.getElementById(itemDomId(items[nextIndex]))?.scrollIntoView({ block: 'nearest' })
}

function selectActive() {
  if (activeItem.value) selectItem(activeItem.value)
}

function selectItem(item: CommandItem) {
  if (item.disabled) return
  emit('select', item)
  if (!item.keepOpen) setOpen(false)
}

function focusInput(event?: Event) {
  event?.preventDefault()
  nextTick(() => input.value?.focus())
}

function isEditable(target: EventTarget | null) {
  const element = target instanceof HTMLElement ? target : null
  return Boolean(element?.closest('input, textarea, [contenteditable="true"]'))
}

function matchesShortcut(event: KeyboardEvent) {
  if (!props.shortcut) return false
  const parts = props.shortcut.toLocaleLowerCase().split('+').map((part) => part.trim())
  const key = parts.find((part) => !['mod', 'shift', 'alt'].includes(part))
  return Boolean(key)
    && event.key.toLocaleLowerCase() === key
    && event.shiftKey === parts.includes('shift')
    && event.altKey === parts.includes('alt')
    && (navigatorPlatformIsMac() ? event.metaKey : event.ctrlKey) === parts.includes('mod')
}

function handleGlobalKeydown(event: KeyboardEvent) {
  if (props.open || (!props.shortcutInEditable && isEditable(event.target)) || !matchesShortcut(event)) return
  event.preventDefault()
  setOpen(true)
}

watch(enabledItems, (items) => {
  if (!items.some((item) => item.id === activeId.value)) activeId.value = items[0]?.id
}, { immediate: true })

onMounted(() => window.addEventListener('keydown', handleGlobalKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', handleGlobalKeydown))
</script>
