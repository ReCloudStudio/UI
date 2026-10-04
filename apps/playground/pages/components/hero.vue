<template>
  <div class="space-y-10">
    <DocPageHeader title="Hero 首屏横幅" description="面向落地页、官网门户与产品首页的首屏大横幅，支持居中排版、左右图文分栏及紧凑极简模式。" />

    <DocExample title="居中主视觉模式 (center)" description="适合配合徽标、醒目标题、副标题、双 CTA 与下方预览画面。" :code="codeCenter">
      <div class="overflow-hidden rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-[#0B1220]">
        <Hero
          layout="center"
          badge="v0.2.0 已正式发布"
          title="专为运维控制台打造的 UI 系统"
          description="基于 Vue 3、Nuxt 4 与 Reka UI 构建，提供无障碍基础底座与分层设计令牌，助力高效交付开发者工具。"
          primary-action-text="快速上手"
          secondary-action-text="浏览组件"
          @primary-click="onStart"
          @secondary-click="onDocs"
        >
          <template #media>
            <div class="mx-auto max-w-2xl rounded-xl border border-slate-200/80 bg-slate-50 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/60 text-center font-mono text-xs text-slate-500">
              [产品控制台界面预览交互展示区]
            </div>
          </template>
        </Hero>
      </div>
    </DocExample>

    <DocExample title="图文分栏模式 (split)" description="左侧文本导流，右侧展示交互模型或媒体卡片。" :code="codeSplit">
      <div class="overflow-hidden rounded-xl border border-slate-200/80 bg-white dark:border-slate-800 dark:bg-[#0B1220]">
        <Hero
          layout="split"
          badge="云原生时代"
          title="下一代基础设施控制台"
          description="轻量、确定性、高可访问性，专为工程师与自动化服务深度打磨。"
          primary-action-text="免费试用"
          secondary-action-text="查看架构"
        >
          <template #media>
            <div class="aspect-video w-full rounded-xl border border-slate-200 bg-slate-100 flex items-center justify-center font-mono text-xs text-slate-400 dark:border-slate-800 dark:bg-slate-900">
              架构拓扑插槽
            </div>
          </template>
        </Hero>
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />
    <DocPageNav name="hero" />
  </div>
</template>

<script setup lang="ts">
const codeCenter = `<Hero
  layout="center"
  badge="v0.2.0 已正式发布"
  title="专为运维控制台打造的 UI 系统"
  description="基于 Vue 3、Nuxt 4 构建，提供无障碍底座与分层设计令牌。"
  primary-action-text="快速上手"
  secondary-action-text="浏览组件"
>
  <template #media>
    <!-- 控制台预览图或演示窗口 -->
  </template>
</Hero>`

const codeSplit = `<Hero
  layout="split"
  badge="云原生时代"
  title="下一代基础设施控制台"
  description="轻量、确定性、高可访问性。"
  primary-action-text="免费试用"
  secondary-action-text="查看架构"
>
  <template #media>
    <!-- 拓扑插图或架构图 -->
  </template>
</Hero>`

const apiRows = [
  { name: 'layout', type: "'center' | 'split' | 'minimal'", default: "'center'", description: '横幅排版结构变体。' },
  { name: 'badge', type: 'string', default: 'undefined', description: '顶部小胶囊徽标文本。' },
  { name: 'title', type: 'string', default: "''", description: '主标题文本。' },
  { name: 'description', type: 'string', default: 'undefined', description: '副标题/介绍段落。' },
  { name: 'primaryActionText', type: 'string', default: 'undefined', description: '主要按钮文本。' },
  { name: 'secondaryActionText', type: 'string', default: 'undefined', description: '次要按钮文本。' },
  { name: 'event: primary-click', type: 'event', default: '—', description: '点击主要按钮时触发。' },
  { name: 'event: secondary-click', type: 'event', default: '—', description: '点击次要按钮时触发。' },
  { name: 'slot: title', type: 'slot', default: '—', description: '自定义主标题。' },
  { name: 'slot: description', type: 'slot', default: '—', description: '自定义介绍副标题。' },
  { name: 'slot: badge', type: 'slot', default: '—', description: '自定义顶部徽标。' },
  { name: 'slot: actions', type: 'slot', default: '—', description: '自定义全部 CTA 按钮组。' },
  { name: 'slot: primary-action', type: 'slot', default: '—', description: '自定义主要 CTA；提供时覆盖默认主要按钮。' },
  { name: 'slot: secondary-action', type: 'slot', default: '—', description: '自定义次要 CTA；提供时覆盖默认次要按钮。' },
  { name: 'slot: media', type: 'slot', default: '—', description: '产品交互或媒体预览插槽。' }
]

function onStart() {}
function onDocs() {}
</script>
