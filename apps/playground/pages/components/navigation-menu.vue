<template>
  <div class="space-y-10">
    <DocPageHeader title="NavigationMenu 导航菜单" description="悬停展开的顶部导航面板：Teleport 渲染避免容器裁剪，滚动自动重定位。" />

    <DocExample title="控制台顶部导航" description="悬停展开、点击固定；面板 Teleport 到 body 不被 overflow 裁剪。" :code="rcCode0">
      <NavigationMenu :items="[
        { label: '概览', value: 'overview' },
        { label: '节点管理', value: 'nodes' },
        { label: '安全策略', value: 'security' }
      ]">
        <template #panel="{ item }">
          <div v-if="item.value === 'nodes'" class="space-y-1">
            <p class="mb-2 text-xs font-semibold tracking-wide text-slate-400 uppercase">节点管理</p>
            <a v-for="l in ['边缘节点列表', '地域分布', '批量部署']" :key="l" class="block cursor-pointer rounded-md px-2.5 py-1.5 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">{{ l }}</a>
          </div>
          <p v-else class="px-2.5 py-1.5 text-sm text-slate-500">{{ item.label }} 面板</p>
        </template>
      </NavigationMenu>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="navigation-menu" />
  </div>
</template>

<script setup lang="ts">
const rcCode0 = `<NavigationMenu :items="[
  { label: '概览', value: 'overview' },
  { label: '节点管理', value: 'nodes' },
  { label: '安全策略', value: 'security' }
]">
  <template #panel="{ item }">
    <div v-if="item.value === 'nodes'" class="space-y-1">
      <p class="mb-2 text-xs font-semibold tracking-wide text-slate-400 uppercase">节点管理</p>
      <a v-for="l in ['边缘节点列表', '地域分布', '批量部署']" :key="l" class="block cursor-pointer rounded-md px-2.5 py-1.5 text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">{{ l }}</a>
    </div>
    <p v-else class="px-2.5 py-1.5 text-sm text-slate-500">{{ item.label }} 面板</p>
  </template>
</NavigationMenu>`


const apiRows = [ { name: 'items', type: '{ label, value, panel? }[]', default: '—', description: '导航项定义。' },
  { name: 'model-value', type: 'string', default: '—', description: 'v-model 激活项。' },
  { name: 'panel', type: 'slot', default: '—', description: '作用域插槽 { item } 面板内容。' } ]
</script>
