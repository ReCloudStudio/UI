<template>
  <div class="space-y-12">
    <div>
      <h1 class="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">i18n 国际化</h1>
      <p class="mt-2 text-base text-slate-600 dark:text-slate-400">
        ReCloud UI 提供全局上下文注入与按组件提取的轻量国际化机制。支持开箱即用的简体中文（<code>zh-CN</code>）与英文（<code>en-US</code>），无需引入沉重外部框架，也可与 vue-i18n 深度打通。
      </p>
    </div>

    <DocExample title="动态切换语言与组件即时生效">
      <template #description>
        点击切换语言环境，观察 Pagination、EmptyState、DataTable、FileUpload 与 TreeView 的文案即时响应。
      </template>

      <div class="space-y-6">
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium text-slate-700 dark:text-slate-300">当前语言：</span>
          <Button
            size="sm"
            :variant="locale === 'zh-CN' ? 'primary' : 'outline'"
            @click="setLocale('zh-CN')"
          >
            中文 (zh-CN)
          </Button>
          <Button
            size="sm"
            :variant="locale === 'en-US' ? 'primary' : 'outline'"
            @click="setLocale('en-US')"
          >
            English (en-US)
          </Button>
          <Button
            size="sm"
            variant="ghost"
            @click="setCustomOverride"
          >
            应用自定义文案覆盖
          </Button>
        </div>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <!-- Pagination -->
          <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#0F172A]">
            <h3 class="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-200">Pagination 分页导航</h3>
            <Pagination
              :model-value="page"
              :total="80"
              :page-size="10"
              @update:model-value="page = $event"
            />
          </div>

          <!-- EmptyState -->
          <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#0F172A]">
            <h3 class="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-200">EmptyState 缺省状态</h3>
            <EmptyState description="请调整筛选条件或稍后重试" />
          </div>
        </div>

        <!-- DataTable -->
        <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#0F172A]">
          <h3 class="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-200">DataTable 分页与空态</h3>
          <DataTable
            :columns="[
              { key: 'name', label: '服务' },
              { key: 'status', label: '状态' }
            ]"
            :rows="[]"
            :page-size="5"
          />
        </div>

        <!-- FileUpload -->
        <div class="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-[#0F172A]">
          <h3 class="mb-3 text-sm font-semibold text-slate-800 dark:text-slate-200">FileUpload 上传拖拽与提示</h3>
          <FileUpload accept=".png,.jpg" :max-size="1024 * 1024 * 5" />
        </div>
      </div>
    </DocExample>

    <div class="space-y-4">
      <h2 class="text-xl font-semibold text-slate-900 dark:text-slate-100">使用方式</h2>
      <CodeBlock :code="usageCode" language="ts" filename="app.vue" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { provideLocale } from '@recloudstudio/ui'

const { locale, setLocale } = provideLocale('zh-CN')
const page = ref(2)

function setCustomOverride() {
  setLocale('zh-CN', {
    pagination: {
      prev: '往回翻',
      next: '往前翻'
    },
    empty: {
      defaultTitle: '这里什么也没有找到呢'
    }
  })
}

const usageCode = `// 1. 在根组件或插件中注入语言包
import { provideLocale, zhCN, enUS } from '@recloudstudio/ui'

// 提供默认语言
const { locale, setLocale } = provideLocale('zh-CN')

// 动态切换语言
setLocale('en-US')

// 支持部分文案深度覆盖
setLocale('zh-CN', {
  pagination: {
    prev: '前一页',
    next: '后一页'
  }
})

// 2. 组件内部如果需要消费当前国际化消息：
import { useComponentLocale } from '@recloudstudio/ui'
const loc = useComponentLocale('pagination')
console.log(loc.value.prev)`
</script>
