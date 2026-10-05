<template>
  <div class="space-y-12">
    <!-- Header -->
    <header class="space-y-3">
      <div class="flex items-center gap-2">
        <h1 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Icon 图标</h1>
        <Badge variant="subtle" size="sm">Universal</Badge>
      </div>
      <p class="text-base text-slate-600 dark:text-slate-400">
        通用图标显示组件，支持直接传入 Vue 组件、注册的前缀库（如 <code>lucide:settings</code>、<code>custom:logo</code>）、内联 SVG 字符串及图片 URL，并具备无障碍标记与响应式尺寸继承能力。
      </p>
    </header>

    <!-- 1. 多类型图标源解析展示 -->
    <ComponentExample
      title="多种图标源类型"
      description="无缝解析 Vue 组件对象、内置前缀名称、纯图标名、内联 SVG 片段以及图片/矢量资源路径。"
      :code="sourcesCode"
    >
      <div class="flex flex-wrap items-center gap-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div class="flex flex-col items-center gap-2">
          <Icon :icon="Settings" class="text-primary text-xl" />
          <span class="text-xs text-slate-500">Vue 组件</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon icon="lucide:server" class="text-emerald-500 text-xl" />
          <span class="text-xs text-slate-500">前缀: lucide:server</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon icon="terminal" class="text-amber-500 text-xl" />
          <span class="text-xs text-slate-500">内置: terminal</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon :icon="svgSnippet" class="text-purple-500 text-xl" />
          <span class="text-xs text-slate-500">内联 SVG</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <Icon icon="/icon.svg" size="1.25rem" />
          <span class="text-xs text-slate-500">图片/SVG 文件路径</span>
        </div>
      </div>
    </ComponentExample>

    <!-- 2. 尺寸控制 -->
    <ComponentExample
      title="尺寸与文字排版继承"
      description="size 默认继承 '1em'，随周围文字字体大小自动缩放；亦可显式指定数值（px）或任意 CSS 尺寸单位。"
      :code="sizesCode"
    >
      <div class="space-y-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
            <Icon icon="lucide:activity" />
            <span>跟随小号正文 (text-xs)</span>
          </div>
          <div class="flex items-center gap-2 text-base font-medium text-slate-800 dark:text-slate-200">
            <Icon icon="lucide:activity" />
            <span>跟随常规文字 (text-base)</span>
          </div>
          <div class="flex items-center gap-2.5 text-xl font-bold text-slate-900 dark:text-slate-100">
            <Icon icon="lucide:activity" />
            <span>跟随大标题 (text-xl)</span>
          </div>
        </div>

        <div class="flex items-center gap-6 pt-3 border-t border-slate-200 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <Icon icon="lucide:shield-check" :size="16" class="text-emerald-500" />
            <span class="text-xs text-slate-500">16px</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon icon="lucide:shield-check" :size="24" class="text-emerald-500" />
            <span class="text-xs text-slate-500">24px</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon icon="lucide:shield-check" :size="32" class="text-emerald-500" />
            <span class="text-xs text-slate-500">32px</span>
          </div>
          <div class="flex items-center gap-2">
            <Icon icon="lucide:shield-check" size="2.5rem" class="text-emerald-500" />
            <span class="text-xs text-slate-500">2.5rem</span>
          </div>
        </div>
      </div>
    </ComponentExample>

    <!-- 3. 自定义图标库注册与前缀解析器 -->
    <ComponentExample
      title="自定义图标库与前缀解析器"
      description="使用 registerIconResolver 注册外部图标体系，例如 mdi、remixicon、FontAwesome 或公司私有资产池。"
      :code="customResolverCode"
    >
      <div class="flex items-center gap-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div class="flex items-center gap-2">
          <Icon icon="cloud:database" size="1.5rem" class="text-blue-500" />
          <span class="text-sm font-medium text-slate-700 dark:text-slate-300">cloud:database</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon icon="cloud:kubernetes" size="1.5rem" class="text-indigo-500" />
          <span class="text-sm font-medium text-slate-700 dark:text-slate-300">cloud:kubernetes</span>
        </div>
      </div>
    </ComponentExample>

    <!-- 4. 无障碍可访问性与回退插槽 -->
    <ComponentExample
      title="无障碍描述与回退插槽"
      description="未提供 label 时自动应用 aria-hidden='true' 充当装饰图标；提供 label 时自动设置 role='img' 与 aria-label；当图标源未能解析时回退显示默认插槽内容。"
      :code="a11yCode"
    >
      <div class="flex items-center gap-6 p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        <div class="flex items-center gap-2">
          <Icon icon="lucide:bell" label="系统提醒通知" class="text-slate-700 dark:text-slate-200 text-lg" />
          <span class="text-xs text-slate-500">带 aria-label 屏幕朗读</span>
        </div>
        <div class="flex items-center gap-2">
          <Icon icon="unknown:missing-icon" size="1.25rem" class="text-slate-400">
            <span class="text-xs font-mono border border-dashed border-slate-300 dark:border-slate-700 px-1.5 py-0.5 rounded">N/A</span>
          </Icon>
          <span class="text-xs text-slate-500">解析失败触发 fallback 插槽</span>
        </div>
      </div>
    </ComponentExample>

    <!-- 5. 在其他组件中的复用体验 -->
    <ComponentExample
      title="在控制台树与下拉菜单中无缝组合"
      description="现有 TreeView、NavTree、CommandPalette 等组件的 icon 属性已全面拓宽支持 IconSource，既可以直接使用字符串前缀，也可使用组件。"
      :code="integrationCode"
    >
      <div class="max-w-xs rounded-lg border border-slate-200 dark:border-slate-800 p-2 bg-white dark:bg-slate-950">
        <NavTree :groups="sampleNavGroups" active-href="/components/button" />
      </div>
    </ComponentExample>
  </div>
</template>

<script setup lang="ts">
import { Settings } from '@recloudstudio/ui/icons'
import { registerIconResolver } from '@recloudstudio/ui'

// 注册示范用前缀解析器
registerIconResolver('cloud', (name) => {
  if (name === 'database') {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>`
  }
  if (name === 'kubernetes') {
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`
  }
  return null
})

const svgSnippet = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m4.93 4.93 4.24 4.24"/><path d="m14.83 9.17 4.24-4.24"/><path d="m14.83 14.83 4.24 4.24"/><path d="m9.17 14.83-4.24 4.24"/></svg>`

const sampleNavGroups = [
  {
    title: '示例导航',
    items: [
      { title: 'Button 按钮', href: '/components/button', icon: 'lucide:box' },
      { title: 'Card 卡片', href: '/components/card', icon: 'cloud:database' },
      { title: 'Dialog 对话框', href: '/components/dialog', icon: 'lucide:network' }
    ]
  }
]

const sourcesCode = `<template>
  <div class="flex items-center gap-4">
    <!-- 1. 直接传入 Vue 组件 -->
    <Icon :icon="Settings" class="text-primary text-xl" />

    <!-- 2. 带库前缀的字符串 (内置 lucide 支持) -->
    <Icon icon="lucide:server" class="text-emerald-500 text-xl" />

    <!-- 3. 纯名称匹配 -->
    <Icon icon="terminal" class="text-amber-500 text-xl" />

    <!-- 4. 直接传入 SVG 标记代码 -->
    <Icon :icon="svgSnippet" class="text-purple-500 text-xl" />

    <!-- 5. 图像路径或网络资源 -->
    <Icon icon="/icon.svg" size="1.25rem" />
  </div>
</template>`

const sizesCode = `<template>
  <!-- 跟随父级字号 1em 自动适配 -->
  <span class="text-xs"><Icon icon="lucide:activity" /> 小号</span>
  <span class="text-base"><Icon icon="lucide:activity" /> 中号</span>
  <span class="text-xl"><Icon icon="lucide:activity" /> 大号</span>

  <!-- 显式传入数值(px)或单位字符 -->
  <Icon icon="lucide:shield-check" :size="16" />
  <Icon icon="lucide:shield-check" :size="24" />
  <Icon icon="lucide:shield-check" size="2.5rem" />
</template>`

const customResolverCode = `import { registerIconResolver } from '@recloudstudio/ui'

// 注册自定义前缀
registerIconResolver('cloud', (name) => {
  if (name === 'database') {
    return '<svg viewBox="0 0 24 24">...</svg>'
  }
  return null
})

// 模板中直接调用
<Icon icon="cloud:database" size="1.5rem" />`

const a11yCode = `<template>
  <!-- 装饰图标：自动输出 aria-hidden="true" -->
  <Icon icon="lucide:bell" />

  <!-- 具有语义的操作图标：设置 role="img" 与 aria-label -->
  <Icon icon="lucide:bell" label="系统提醒通知" />

  <!-- 回退插槽：当资源不存在时呈现 -->
  <Icon icon="unknown:missing-icon">
    <span>N/A</span>
  </Icon>
</template>`

const integrationCode = `<template>
  <!-- NavTree、TreeView、CommandPalette 等原生无缝接收统一 IconSource -->
  <NavTree :groups="[
    {
      title: '组件导航',
      items: [
        { title: 'Button 按钮', href: '/components/button', icon: 'lucide:box' },
        { title: 'Card 卡片', href: '/components/card', icon: 'cloud:database' }
      ]
    }
  ]" active-href="/components/button" />
</template>`
</script>
