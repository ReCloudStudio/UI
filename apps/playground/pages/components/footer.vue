<template>
  <div class="space-y-10">
    <PageHeader title="Footer 站点页脚" description="多列链接分组、产品定位说明、版权声明与社交媒体图标插槽。" />

    <ComponentExample title="多列站点页脚" description="包含品牌简述、4 列导航分组与底部版权条。" :code="codeBasic">
      <div class="overflow-hidden rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-[#0B1220]">
        <Footer
          brand-title="ReCloud Studio"
          brand-description="面向开发者工具、自动化服务与现代运维控制台的 Vue 3 & Nuxt 4 界面系统。"
          :columns="sampleColumns"
          :socials="sampleSocials"
        />
      </div>
    </ComponentExample>

    <ApiTable :rows="apiRows" />
    <DocPageNav name="footer" />
  </div>
</template>

<script setup lang="ts">
const sampleColumns = [
  {
    title: '产品',
    links: [
      { label: '组件总览', to: '/components/button' },
      { label: '设计令牌', to: '/components/callout' },
      { label: '更新日志', to: '/components/timeline' }
    ]
  },
  {
    title: '开发者',
    links: [
      { label: '快速上手', to: '/components/steps' },
      { label: 'GitHub 仓库', href: 'https://github.com/ReCloudStudio/UI', target: '_blank' },
      { label: '代码规范', href: '#' }
    ]
  },
  {
    title: '资源',
    links: [
      { label: 'Figma 设计稿', href: '#' },
      { label: '技术博客', href: '#' }
    ]
  }
]

const sampleSocials = [
  { name: 'GitHub', href: 'https://github.com/ReCloudStudio/UI', icon: 'github' },
  { name: 'Discord', href: '#', icon: 'discord' },
  { name: 'X / Twitter', href: '#', icon: 'x' }
]

const codeBasic = `<Footer
  brand-title="ReCloud Studio"
  brand-description="面向开发者工具与现代运维控制台的 UI 系统。"
  :columns="sampleColumns"
  :socials="sampleSocials"
/>`

const apiRows = [
  { name: 'brandTitle', type: 'string', default: "''", description: '品牌名称。' },
  { name: 'brandDescription', type: 'string', default: "''", description: '品牌描述正文。' },
  { name: 'columns', type: 'FooterColumn[]', default: '[]', description: '导航列配置数组：title、links（label、href?、to?、target?）。' },
  { name: 'copyright', type: 'string', default: "'© ReCloud Studio. All rights reserved.'", description: '底部版权文案；默认值为固定文本以确保 SSR hydration 一致。' },
  { name: 'socials', type: 'FooterSocial[]', default: '[]', description: '社交媒体链接数组：name、href、icon?。内置图标支持 github、discord、twitter 与 x（不区分大小写）；未知值回退为名称文本。使用 #socials 可完全自定义。' },
  { name: 'bordered', type: 'boolean', default: 'true', description: '是否展示顶部边框。' },
  { name: 'slot: logo', type: 'slot', default: '—', description: '自定义品牌 Logo。' },
  { name: 'slot: brand', type: 'slot', default: '—', description: '自定义品牌名称。' },
  { name: 'slot: description', type: 'slot', default: '—', description: '自定义品牌描述区域。' },
  { name: 'slot: newsletter', type: 'slot', default: '—', description: '品牌下方的订阅表单区域。' },
  { name: 'slot: socials', type: 'slot', default: '—', description: '底部社交媒体插槽。' },
  { name: 'slot: copyright', type: 'slot', default: '—', description: '底部版权声明插槽。' }
]
</script>
