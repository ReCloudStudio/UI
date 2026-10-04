<template>
  <div class="space-y-10">
    <DocPageHeader title="Footer 站点页脚" description="多列链接分组、产品定位说明、版权声明与社交媒体图标插槽。" />

    <DocExample title="多列站点页脚" description="包含品牌简述、4 列导航分组与底部版权条。" :code="codeBasic">
      <div class="overflow-hidden rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-[#0B1220]">
        <Footer
          brand-title="ReCloud Studio"
          brand-description="面向开发者工具、自动化服务与现代运维控制台的 Vue 3 & Nuxt 4 界面系统。"
          :columns="sampleColumns"
          :socials="sampleSocials"
        />
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />
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
  { name: 'GitHub', href: 'https://github.com/ReCloudStudio/UI' },
  { name: 'Discord', href: '#' },
  { name: 'X / Twitter', href: '#' }
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
  { name: 'copyright', type: 'string', default: '依当前年份自动生成', description: '底部版权文案。' },
  { name: 'socials', type: 'FooterSocial[]', default: '[]', description: '社交媒体链接数组：name、href、icon?。' },
  { name: 'bordered', type: 'boolean', default: 'true', description: '是否展示顶部边框。' },
  { name: 'slot: logo', type: 'slot', default: '—', description: '自定义品牌 Logo。' },
  { name: 'slot: brand', type: 'slot', default: '—', description: '自定义品牌名称。' },
  { name: 'slot: description', type: 'slot', default: '—', description: '自定义品牌描述区域。' },
  { name: 'slot: newsletter', type: 'slot', default: '—', description: '品牌下方的订阅表单区域。' },
  { name: 'slot: socials', type: 'slot', default: '—', description: '底部社交媒体插槽。' },
  { name: 'slot: copyright', type: 'slot', default: '—', description: '底部版权声明插槽。' }
]
</script>
