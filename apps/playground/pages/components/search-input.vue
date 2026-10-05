<template>
  <div class="space-y-10">
    <PageHeader
      title="SearchInput 搜索框"
      description="通用纯前端搜索框组件（同时提供 SearchBox 别名导出），内置搜索图标、一键清除、Loading 状态、快捷键徽标（如 ⌘K 或 /）、防抖触发与可选的联想词/结果浮层，后端可任意对接 Elasticsearch、Meilisearch、SQL 或本地内存检索。"
    />

    <ComponentExample
      title="基础搜索输入框"
      description="支持 v-model 双向绑定，内置 300ms 防抖并暴露 @search 与 @submit 事件。"
      :code="rcCode0"
    >
      <div class="max-w-md space-y-3">
        <SearchInput
          v-model="basicQuery"
          placeholder="搜索实例、集群或配置项..."
          @search="lastSearch = $event"
          @submit="lastSubmit = $event"
          @clear="lastSearch = ''"
        />
        <div class="flex items-center gap-4 text-xs text-slate-500">
          <span>防抖查询 (@search): <strong class="text-slate-800 dark:text-slate-200">{{ lastSearch || '（空）' }}</strong></span>
          <span>提交 (@submit): <strong class="text-primary-600 dark:text-primary-400">{{ lastSubmit || '（无）' }}</strong></span>
        </div>
      </div>
    </ComponentExample>

    <ComponentExample
      title="视觉变体与尺寸规格"
      description="提供 default（线框卡片）、filled（静音填充）与 pill（胶囊圆角）三种变体，并支持 sm、md、lg 尺寸。"
      :code="rcCode1"
    >
      <div class="grid max-w-xl gap-4">
        <div class="space-y-1.5">
          <span class="text-xs font-medium text-slate-500">小尺寸胶囊 (size="sm" variant="pill")</span>
          <SearchInput size="sm" variant="pill" placeholder="快捷筛选..." />
        </div>
        <div class="space-y-1.5">
          <span class="text-xs font-medium text-slate-500">标准填充态 (size="md" variant="filled")</span>
          <SearchInput size="md" variant="filled" placeholder="搜索资源组..." />
        </div>
        <div class="space-y-1.5">
          <span class="text-xs font-medium text-slate-500">大尺寸线框 (size="lg" variant="default")</span>
          <SearchInput size="lg" variant="default" placeholder="在全网知识库中搜索..." />
        </div>
      </div>
    </ComponentExample>

    <ComponentExample
      title="快捷键与异步 Loading 状态"
      description="支持展示 shortcut 快捷键（支持全局聚焦监听），支持 loading 模拟后端异步请求状态。"
      :code="rcCode2"
    >
      <div class="max-w-md space-y-4">
        <SearchInput
          shortcut="⌘K"
          enable-global-shortcut
          placeholder="按 ⌘K 或 Ctrl+K 聚焦此输入框..."
        />
        <SearchInput
          :loading="isLoading"
          placeholder="异步搜索中..."
          model-value="kubernetes-node-01"
        />
        <button
          type="button"
          class="rounded-md border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 cursor-pointer"
          @click="isLoading = !isLoading"
        >
          切换 Loading 状态: {{ isLoading ? '开启' : '关闭' }}
        </button>
      </div>
    </ComponentExample>

    <ComponentExample
      title="联想结果与后端对接展示"
      description="传入 suggestions 列表即可展开下拉结果面板，支持键盘上下箭头高亮、Enter 选中或点击选择。"
      :code="rcCode3"
    >
      <div class="max-w-md space-y-3">
        <SearchInput
          v-model="backendQuery"
          :suggestions="filteredSuggestions"
          placeholder="输入微服务名称（如 auth、gateway）..."
          @select="handleSelectSuggestion"
        />
        <div v-if="selectedItem" class="rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-slate-900">
          已选中项: <span class="font-semibold text-slate-900 dark:text-white">{{ selectedItem.label }}</span>
          <span class="ml-2 text-slate-500">({{ selectedItem.category }})</span>
        </div>
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />
    <DocPageNav name="search-input" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { SearchInput, type SearchSuggestion } from '@recloudstudio/ui'

const basicQuery = ref('')
const lastSearch = ref('')
const lastSubmit = ref('')
const isLoading = ref(true)

const backendQuery = ref('')
const selectedItem = ref<SearchSuggestion | null>(null)

const mockBackendData: SearchSuggestion[] = [
  { id: '1', label: 'auth-service', description: 'OAuth2 / RBAC 认证授权中心', category: '核心网关' },
  { id: '2', label: 'gateway-ingress', description: '基于 Envoy 的多集群边缘流量网关', category: '网络' },
  { id: '3', label: 'billing-api', description: '用量计量与多租户账单结算引擎', category: '财务' },
  { id: '4', label: 'monitor-prometheus', description: '分布式时序监控与指标采集探针', category: '可观测性' },
  { id: '5', label: 'storage-s3-gateway', description: '兼容 S3 协议的对象存储加速节点', category: '存储' }
]

const filteredSuggestions = computed(() => {
  if (!backendQuery.value.trim()) return mockBackendData
  const q = backendQuery.value.toLowerCase()
  return mockBackendData.filter(
    item => item.label.toLowerCase().includes(q) || item.description?.toLowerCase().includes(q)
  )
})

const handleSelectSuggestion = (item: SearchSuggestion) => {
  selectedItem.value = item
}

const rcCode0 = `<SearchInput
  v-model="query"
  placeholder="搜索实例、集群或配置项..."
  @search="onSearch"
  @submit="onSubmit"
  @clear="onClear"
/>`

const rcCode1 = `<SearchInput size="sm" variant="pill" placeholder="快捷筛选..." />
<SearchInput size="md" variant="filled" placeholder="搜索资源组..." />
<SearchInput size="lg" variant="default" placeholder="在全网知识库中搜索..." />`

const rcCode2 = `<SearchInput
  shortcut="⌘K"
  enable-global-shortcut
  placeholder="按 ⌘K 聚焦..."
/>
<SearchInput :loading="isLoading" placeholder="异步请求中..." />`

const rcCode3 = `<SearchInput
  v-model="query"
  :suggestions="resultsFromBackend"
  placeholder="输入微服务名称..."
  @select="onSelect"
/>`

const apiRows = [
  { name: 'modelValue', type: 'string', default: "''", description: '搜索框文本输入值（v-model）。' },
  { name: 'placeholder', type: 'string', default: "'搜索...'", description: '占位提示文字。' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '输入框尺寸规格。' },
  { name: 'variant', type: "'default' | 'filled' | 'pill'", default: "'default'", description: '外观形态：线框卡片、静音填充、圆角胶囊。' },
  { name: 'debounce', type: 'number', default: '300', description: '防抖延迟毫秒数，触发 @search 事件。' },
  { name: 'clearable', type: 'boolean', default: 'true', description: '有输入内容时是否展示一键清空按钮。' },
  { name: 'clearOnEsc', type: 'boolean', default: 'true', description: '按 Escape 键是否清空输入内容。' },
  { name: 'loading', type: 'boolean', default: 'false', description: '是否处于加载/搜索中状态，展示转圈动画。' },
  { name: 'shortcut', type: 'string', default: 'undefined', description: '显示的按键提示（如 ⌘K 或 /）。' },
  { name: 'enableGlobalShortcut', type: 'boolean', default: 'false', description: '是否在全局监听按键并自动聚焦输入框。' },
  { name: 'suggestions', type: 'SearchSuggestion[]', default: 'undefined', description: '后端返回的联想建议或检索结果列表。' },
  { name: 'open', type: 'boolean', default: 'undefined', description: '受控的下拉浮层展开状态（v-model:open）。' },
  { name: 'emptyText', type: 'string', default: "'未找到匹配结果'", description: '搜索无匹配项时的空态文案。' },
  { name: '@search', type: '(query: string) => void', default: '—', description: '防抖触发或回车触发的搜索事件。' },
  { name: '@submit', type: '(query: string) => void', default: '—', description: '按回车提交搜索事件。' },
  { name: '@clear', type: '() => void', default: '—', description: '点击清空按钮时触发。' },
  { name: '@select', type: '(item: SearchSuggestion) => void', default: '—', description: '选中联想建议项时触发。' }
]
</script>
