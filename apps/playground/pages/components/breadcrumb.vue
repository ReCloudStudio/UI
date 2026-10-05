<template>
  <div class="space-y-10">
    <PageHeader title="Breadcrumb 面包屑" description="层级路径导航，末项自动加粗并标记 aria-current。" />

    <ComponentExample title="控制台路径" description="传 to 渲染 NuxtLink，末项无 to 即当前页。" :code="rcCode0">
      <BreadcrumbNav :items="[
        { label: '文档首页', to: '/' },
        { label: '组件总览', to: '/components/button' },
        { label: '面包屑' }
      ]" />
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="breadcrumb" />
  </div>
</template>

<script setup lang="ts">
const rcCode0 = `<BreadcrumbNav :items="[
  { label: '文档首页', to: '/' },
  { label: '组件总览', to: '/components/button' },
  { label: '面包屑' }
]" />`


const apiRows = [ { name: 'items', type: '{ label, to? }[]', default: '—', description: '路径项。' },
  { name: 'aria-label', type: 'string', default: '面包屑导航', description: '无障碍标注。' } ]
</script>
