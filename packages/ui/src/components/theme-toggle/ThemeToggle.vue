<template>
  <!-- Variant: Dropdown Menu (Light / Dark / System) -->
  <div v-if="variant === 'dropdown'" :class="['relative inline-flex items-center', props.class]">
    <select
      :value="currentMode"
      :aria-label="ariaLabel || '选择主题模式'"
      :class="[
        'rounded-lg border border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--foreground)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] cursor-pointer',
        dropdownSizeClasses[size]
      ]"
      @change="onSelectMode(($event.target as HTMLSelectElement).value as ThemeMode)"
    >
      <option value="light">浅色模式</option>
      <option value="dark">深色模式</option>
      <option value="system">跟随系统</option>
    </select>
  </div>

  <!-- Variant: Icon Button (Default) -->
  <button
    v-else
    type="button"
    :class="[
      'inline-flex items-center justify-center rounded-lg border border-transparent text-[color:var(--muted-foreground)] hover:bg-[color:var(--surface-muted)] hover:text-[color:var(--foreground)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)] cursor-pointer',
      buttonSizeClasses[size],
      props.class
    ]"
    :aria-label="computedAriaLabel"
    :title="computedAriaLabel"
    @click="handleToggle"
  >
    <slot :mode="currentMode" :is-dark="effectiveIsDark" :resolved-mode="effectiveResolvedMode">
      <!-- Sun icon (when dark, clicking switches to light) -->
      <Sun v-if="effectiveIsDark" :class="iconSizeClasses[size]" class="text-amber-400" />
      <!-- Moon icon (when light, clicking switches to dark) -->
      <Moon v-else :class="iconSizeClasses[size]" class="text-slate-600 dark:text-slate-300" />
    </slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Sun, Moon } from '../../icons'
import { useTheme, type ThemeMode, type ResolvedThemeMode } from '../../composables/useTheme'
import type { ThemeToggleProps, ThemeToggleSize } from './types'

const props = withDefaults(defineProps<ThemeToggleProps>(), {
  variant: 'button',
  size: 'md',
  cycleSystem: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: ThemeMode): void
  (e: 'change', value: ThemeMode): void
}>()

const theme = useTheme()

const isControlled = computed(() => props.modelValue !== undefined)

const currentMode = computed<ThemeMode>(() => {
  if (isControlled.value) {
    return props.modelValue ?? 'system'
  }
  return theme.mode.value
})

const effectiveResolvedMode = computed<ResolvedThemeMode>(() => {
  if (isControlled.value) {
    if (currentMode.value === 'dark') return 'dark'
    if (currentMode.value === 'light') return 'light'
    return theme.resolvedMode.value
  }
  return theme.resolvedMode.value
})

const effectiveIsDark = computed<boolean>(() => effectiveResolvedMode.value === 'dark')

const computedAriaLabel = computed(() => {
  if (props.ariaLabel) return props.ariaLabel
  if (props.cycleSystem) {
    return `当前主题：${currentMode.value === 'dark' ? '深色' : currentMode.value === 'light' ? '浅色' : '系统'}，点击切换`
  }
  return effectiveIsDark.value ? '切换至浅色模式' : '切换至深色模式'
})

const buttonSizeClasses: Record<ThemeToggleSize, string> = {
  sm: 'h-8 w-8 p-1.5 text-xs',
  md: 'h-9 w-9 p-2 text-sm',
  lg: 'h-10 w-10 p-2.5 text-base'
}

const iconSizeClasses: Record<ThemeToggleSize, string> = {
  sm: 'w-3.5 h-3.5',
  md: 'w-4 h-4',
  lg: 'w-5 h-5'
}

const dropdownSizeClasses: Record<ThemeToggleSize, string> = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-2.5 py-1.5 text-sm',
  lg: 'px-3 py-2 text-base'
}

function setNextMode(nextMode: ThemeMode) {
  if (isControlled.value) {
    emit('update:modelValue', nextMode)
  } else {
    theme.setMode(nextMode)
  }
  emit('change', nextMode)
}

function handleToggle() {
  if (props.cycleSystem) {
    const cycleMap: Record<string, ThemeMode> = {
      light: 'dark',
      dark: 'system',
      system: 'light',
      auto: 'light'
    }
    const next = cycleMap[currentMode.value] ?? 'light'
    setNextMode(next)
  } else {
    const next: ThemeMode = effectiveIsDark.value ? 'light' : 'dark'
    setNextMode(next)
  }
}

function onSelectMode(mode: ThemeMode) {
  setNextMode(mode)
}
</script>
