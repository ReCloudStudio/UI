<template>
  <div class="space-y-10">
    <PageHeader
      title="ThemeToggle 主题切换开关"
      description="开箱即用的主题明暗切换开关，已封装 Sun / Moon 图标、aria-label 状态播报，支持图标按钮、下拉选择以及系统偏好三态轮换模式，可直接嵌入 Navbar 顶栏。"
    />

    <ComponentExample
      title="基础图标切换按钮"
      description="默认非受控模式，自动与全局 useTheme() 同步并持久化，支持深浅模式互切。"
      :code="rcCode0"
    >
      <div class="flex items-center gap-4">
        <ThemeToggle size="sm" />
        <ThemeToggle size="md" />
        <ThemeToggle size="lg" />
      </div>
    </ComponentExample>

    <ComponentExample
      title="循环系统偏好 (cycleSystem)"
      description="开启 cycleSystem 后，点击将在「浅色 -> 深色 -> 跟随系统」三态之间循环轮播。"
      :code="rcCode1"
    >
      <div class="flex items-center gap-4">
        <ThemeToggle cycle-system size="md" />
        <span class="text-sm text-slate-500">点击查看 tooltip 或 aria-label 提示的三态轮换</span>
      </div>
    </ComponentExample>

    <ComponentExample
      title="下拉选择变体 (variant=dropdown)"
      description="以规范的下拉菜单形式明确选择浅色、深色或跟随系统。"
      :code="rcCode2"
    >
      <div class="flex items-center gap-4">
        <ThemeToggle variant="dropdown" size="sm" />
        <ThemeToggle variant="dropdown" size="md" />
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />
    <DocPageNav name="theme-toggle" />
  </div>
</template>

<script setup lang="ts">
import { ThemeToggle } from '@recloudstudio/ui'

const rcCode0 = `<ThemeToggle size="sm" />
<ThemeToggle size="md" />
<ThemeToggle size="lg" />`

const rcCode1 = `<ThemeToggle cycle-system size="md" />`

const rcCode2 = `<ThemeToggle variant="dropdown" size="md" />`

const apiRows = [
  { name: 'variant', type: "'button' | 'dropdown'", default: "'button'", description: '外观形式，提供按钮式或下拉选择式。' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '控件尺寸。' },
  { name: 'modelValue', type: 'ThemeMode', default: 'undefined', description: '受控模式下的主题值（v-model）。留空则使用全局 useTheme()。' },
  { name: 'cycleSystem', type: 'boolean', default: 'false', description: '按钮点击是否在 light -> dark -> system 之间三态循环。' },
  { name: 'ariaLabel', type: 'string', default: 'undefined', description: '自定义无障碍 aria-label 标签。' },
  { name: '@change', type: '(mode: ThemeMode) => void', default: '—', description: '主题改变事件。' }
]
</script>
