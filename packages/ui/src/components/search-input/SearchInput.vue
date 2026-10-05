<template>
  <div
    ref="containerRef"
    :class="[
      'group relative inline-flex w-full items-center transition-all',
      sizeContainerClasses[size],
      variantClasses[variant],
      disabled ? 'cursor-not-allowed opacity-50' : '',
      props.class
    ]"
  >
    <!-- Leading element (Icon or Slot) -->
    <div class="pointer-events-none flex shrink-0 items-center justify-center text-[color:var(--muted-foreground)]">
      <slot name="leading">
        <Search :class="iconSizeClasses[size]" />
      </slot>
    </div>

    <!-- Main Input -->
    <input
      ref="inputRef"
      :value="modelValue"
      type="text"
      role="searchbox"
      :aria-label="ariaLabel || placeholder || '搜索'"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :autocomplete="autocomplete"
      :aria-expanded="hasDropdown ? isOpen : undefined"
      :aria-haspopup="hasDropdown ? 'listbox' : undefined"
      :aria-activedescendant="activeItemId"
      class="min-w-0 grow bg-transparent font-normal text-[color:var(--foreground)] placeholder:text-[color:var(--muted-foreground)] outline-none disabled:cursor-not-allowed"
      :class="sizeInputClasses[size]"
      @input="handleInput"
      @keydown="handleKeydown"
      @focus="handleFocus"
      @blur="handleBlur"
    />

    <!-- Trailing element (Loading, Clear, Shortcut, or Slot) -->
    <div class="flex shrink-0 items-center gap-1.5 text-[color:var(--muted-foreground)]">
      <slot name="trailing">
        <!-- Loading state -->
        <slot v-if="loading" name="loading">
          <Loader2 :class="[iconSizeClasses[size], 'animate-spin text-[color:var(--primary)]']" />
        </slot>

        <!-- Clear button (when has text and not loading) -->
        <button
          v-else-if="clearable && hasValue && !disabled && !readonly"
          type="button"
          tabindex="-1"
          :aria-label="ariaLabel ? `清空${ariaLabel}` : '清空搜索内容'"
          class="inline-flex items-center justify-center rounded p-0.5 text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--foreground)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[color:var(--ring)] cursor-pointer"
          @click.stop="handleClear"
        >
          <slot name="clear">
            <X :class="iconSizeClasses[size]" />
          </slot>
        </button>

        <!-- Shortcut key badge -->
        <slot v-else-if="shortcut" name="shortcut">
          <kbd
            class="inline-flex items-center rounded border border-[color:var(--border)] bg-[color:var(--surface-muted)] px-1.5 py-0.5 font-mono text-[10px] text-[color:var(--muted-foreground)] select-none cursor-pointer hover:border-[color:var(--ring)]"
            @click="focus"
          >
            {{ shortcut }}
          </kbd>
        </slot>
      </slot>
    </div>

    <!-- Dropdown Results / Suggestions Flyout -->
    <div
      v-if="hasDropdown && isOpen"
      class="absolute left-0 right-0 top-full mt-1.5 z-50 max-h-72 overflow-y-auto rounded-lg border border-[color:var(--border)] bg-[color:var(--card)] p-1.5 shadow-lg backdrop-blur-sm"
    >
      <slot name="dropdown" :suggestions="suggestions" :active-index="activeIndex">
        <!-- Suggestions List -->
        <div v-if="hasSuggestions" role="listbox" class="space-y-0.5">
          <button
            v-for="(item, idx) in suggestions"
            :id="`search-item-${idx}`"
            :key="item.id ?? idx"
            type="button"
            role="option"
            :aria-selected="activeIndex === idx"
            :disabled="item.disabled"
            :class="[
              'flex w-full items-center justify-between gap-3 rounded-md px-2.5 py-1.5 text-left text-sm transition-colors outline-none cursor-pointer disabled:pointer-events-none disabled:opacity-50',
              activeIndex === idx
                ? 'bg-[color:var(--surface-muted)] text-[color:var(--foreground)]'
                : 'text-[color:var(--foreground)] hover:bg-[color:var(--surface-muted)]'
            ]"
            @mouseenter="activeIndex = idx"
            @click="handleSelect(item)"
          >
            <slot name="item" :item="item" :index="idx" :active="activeIndex === idx">
              <div class="flex min-w-0 items-center gap-2">
                <span class="truncate font-medium">{{ item.label }}</span>
                <span v-if="item.description" class="truncate text-xs text-[color:var(--muted-foreground)]">
                  {{ item.description }}
                </span>
              </div>
              <span
                v-if="item.category"
                class="shrink-0 rounded bg-[color:var(--surface-subtle,var(--surface-muted))] px-1.5 py-0.5 text-[11px] font-normal text-[color:var(--muted-foreground)]"
              >
                {{ item.category }}
              </span>
            </slot>
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="showEmpty" class="px-3 py-6 text-center text-xs text-[color:var(--muted-foreground)]">
          <slot name="empty">
            {{ emptyText || '未找到匹配结果' }}
          </slot>
        </div>

        <!-- Custom Dropdown Footer -->
        <div v-if="$slots.footer" class="mt-1 border-t border-[color:var(--border)] pt-1.5 text-xs text-[color:var(--muted-foreground)]">
          <slot name="footer" />
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Search, X, Loader2 } from '../../icons'
import type {
  SearchInputProps,
  SearchInputEmits,
  SearchInputSize,
  SearchInputVariant,
  SearchSuggestion
} from './types'

const props = withDefaults(defineProps<SearchInputProps>(), {
  modelValue: '',
  placeholder: '搜索...',
  size: 'md',
  variant: 'default',
  clearable: true,
  clearOnEsc: true,
  loading: false,
  debounce: 300,
  shortcut: undefined,
  enableGlobalShortcut: false,
  ariaLabel: undefined,
  disabled: false,
  readonly: false,
  autocomplete: 'off',
  suggestions: undefined,
  open: undefined,
  emptyText: '未找到匹配结果',
  showDropdownOnFocus: true,
  class: ''
})

const emit = defineEmits<SearchInputEmits>()

const containerRef = ref<HTMLDivElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const internalOpen = ref(false)
const activeIndex = ref(-1)

let debounceTimer: ReturnType<typeof setTimeout> | null = null

const hasValue = computed(() => Boolean(props.modelValue && props.modelValue.trim().length > 0))
const hasSuggestions = computed(() => Array.isArray(props.suggestions) && props.suggestions.length > 0)
const hasDropdown = computed(() => props.suggestions !== undefined)
const showEmpty = computed(() => hasDropdown.value && !hasSuggestions.value && hasValue.value)

const isOpen = computed({
  get: () => (props.open !== undefined ? props.open : internalOpen.value),
  set: (val: boolean) => {
    internalOpen.value = val
    emit('update:open', val)
  }
})

const activeItemId = computed(() => {
  if (isOpen.value && activeIndex.value >= 0) {
    return `search-item-${activeIndex.value}`
  }
  return undefined
})

const sizeContainerClasses: Record<SearchInputSize, string> = {
  sm: 'h-8 px-2.5 gap-2 text-xs',
  md: 'h-9.5 px-3 gap-2.5 text-sm',
  lg: 'h-11 px-3.5 gap-3 text-base'
}

const sizeInputClasses: Record<SearchInputSize, string> = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base'
}

const iconSizeClasses: Record<SearchInputSize, string> = {
  sm: 'h-3.5 w-3.5',
  md: 'h-4 w-4',
  lg: 'h-5 w-5'
}

const variantClasses: Record<SearchInputVariant, string> = {
  default:
    'rounded-lg border border-[color:var(--border)] bg-[color:var(--card)] hover:border-[color:var(--ring)] focus-within:ring-2 focus-within:ring-[color:var(--ring)] focus-within:border-transparent shadow-xs',
  filled:
    'rounded-lg border border-transparent bg-[color:var(--surface-muted)] hover:bg-[color:var(--surface-subtle,var(--surface-muted))] focus-within:bg-[color:var(--card)] focus-within:ring-2 focus-within:ring-[color:var(--ring)] focus-within:border-transparent',
  pill:
    'rounded-full border border-[color:var(--border)] bg-[color:var(--card)] hover:border-[color:var(--ring)] focus-within:ring-2 focus-within:ring-[color:var(--ring)] focus-within:border-transparent shadow-xs'
}

const handleInput = (event: Event) => {
  const val = (event.target as HTMLInputElement).value
  emit('update:modelValue', val)

  if (hasDropdown.value) {
    isOpen.value = true
    activeIndex.value = -1
  }

  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  if (props.debounce && props.debounce > 0) {
    debounceTimer = setTimeout(() => {
      emit('search', val)
    }, props.debounce)
  } else {
    emit('search', val)
  }
}

const handleClear = () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  emit('update:modelValue', '')
  emit('clear')
  emit('search', '')
  activeIndex.value = -1
  if (hasDropdown.value) {
    isOpen.value = false
  }
  inputRef.value?.focus()
}

const handleSelect = (item: SearchSuggestion) => {
  if (item.disabled) return
  emit('update:modelValue', item.label)
  emit('select', item)
  isOpen.value = false
  activeIndex.value = -1
}

const handleKeydown = (event: KeyboardEvent) => {
  emit('keydown', event)

  if (hasDropdown.value && isOpen.value) {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (hasSuggestions.value) {
        activeIndex.value = (activeIndex.value + 1) % props.suggestions!.length
      }
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (hasSuggestions.value) {
        activeIndex.value =
          (activeIndex.value - 1 + props.suggestions!.length) % props.suggestions!.length
      }
      return
    }
  }

  if (event.key === 'Enter') {
    if (isOpen.value && activeIndex.value >= 0 && hasSuggestions.value) {
      event.preventDefault()
      const selected = props.suggestions![activeIndex.value]
      if (selected) {
        handleSelect(selected)
        return
      }
    }

    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    const currentVal = props.modelValue || ''
    emit('search', currentVal)
    emit('submit', currentVal)
    if (hasDropdown.value) {
      isOpen.value = false
    }
    return
  }

  if (event.key === 'Escape') {
    if (isOpen.value) {
      event.preventDefault()
      isOpen.value = false
      activeIndex.value = -1
    } else if (props.clearOnEsc && hasValue.value) {
      event.preventDefault()
      handleClear()
    }
  }
}

const handleFocus = (event: FocusEvent) => {
  emit('focus', event)
  if (props.showDropdownOnFocus && hasDropdown.value && (hasSuggestions.value || showEmpty.value)) {
    isOpen.value = true
  }
}

const handleBlur = (event: FocusEvent) => {
  emit('blur', event)
}

const handlePointerDownOutside = (event: PointerEvent) => {
  if (!containerRef.value) return
  if (!containerRef.value.contains(event.target as Node)) {
    isOpen.value = false
    activeIndex.value = -1
  }
}

const handleGlobalShortcut = (event: KeyboardEvent) => {
  if (!props.enableGlobalShortcut || !props.shortcut) return

  const target = event.target as HTMLElement | null
  const isInputTarget =
    target &&
    (target.tagName === 'INPUT' ||
      target.tagName === 'TEXTAREA' ||
      target.tagName === 'SELECT' ||
      target.isContentEditable)

  if (isInputTarget) return

  const normalizedShortcut = props.shortcut.trim().toLowerCase()

  if (normalizedShortcut === '/' && event.key === '/') {
    event.preventDefault()
    inputRef.value?.focus()
    return
  }

  const isK = event.key.toLowerCase() === 'k'
  const isModifier = event.metaKey || event.ctrlKey
  if (isK && isModifier && (normalizedShortcut.includes('k') || normalizedShortcut.includes('cmd'))) {
    event.preventDefault()
    inputRef.value?.focus()
  }
}

watch(
  () => props.suggestions,
  () => {
    activeIndex.value = -1
  }
)

onMounted(() => {
  document.addEventListener('pointerdown', handlePointerDownOutside)
  if (props.enableGlobalShortcut) {
    window.addEventListener('keydown', handleGlobalShortcut)
  }
})

onBeforeUnmount(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  document.removeEventListener('pointerdown', handlePointerDownOutside)
  if (props.enableGlobalShortcut) {
    window.removeEventListener('keydown', handleGlobalShortcut)
  }
})

const focus = () => inputRef.value?.focus()
const blur = () => inputRef.value?.blur()
const clear = () => handleClear()

defineExpose({
  focus,
  blur,
  clear,
  input: inputRef
})
</script>
