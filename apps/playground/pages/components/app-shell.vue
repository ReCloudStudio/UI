<template>
  <div class="space-y-10">
    <DocPageHeader title="AppShell 应用布局" description="为开发者控制台提供稳定的侧栏、顶栏与内容区骨架；小屏下自动收起桌面侧栏。" />

    <DocExample title="控制台骨架" description="AppShell 负责页面结构，Sidebar 专注可滚动的导航内容与固定底部操作。" :code="rcCode0">
      <div class="h-[28rem] overflow-hidden rounded-xl ring-1 ring-slate-200 dark:ring-slate-800">
        <AppShell sidebar-width="13rem">
          <template #sidebar>
            <Sidebar>
              <template #header><span class="text-sm font-semibold text-slate-900 dark:text-slate-100">ReCloud Console</span></template>
              <div class="space-y-1">
                <a v-for="item in navItems" :key="item" href="#" class="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white" @click.prevent>{{ item }}</a>
              </div>
              <template #footer><Button class="w-full" size="sm" variant="outline" color="neutral">工作区设置</Button></template>
            </Sidebar>
          </template>
          <template #header><div class="flex h-12 items-center px-5 text-sm font-medium text-slate-700 dark:text-slate-200">Webhook 投递记录</div></template>
          <div class="p-5"><Card title="近 24 小时投递"><p class="text-sm text-slate-500 dark:text-slate-400">这里是控制台主内容区。</p></Card></div>
        </AppShell>
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />
    <DocPageNav name="app-shell" />
  </div>
</template>

<script setup lang="ts">
const navItems = ['概览', 'Webhooks', '投递记录', '通知规则']
const rcCode0 = `<AppShell sidebar-width="16rem">
  <template #sidebar>
    <Sidebar>
      <template #header>ReCloud Console</template>
      <nav><!-- navigation items --></nav>
      <template #footer><Button>工作区设置</Button></template>
    </Sidebar>
  </template>
  <template #header><ConsoleHeader /></template>
  <main><!-- page content --></main>
</AppShell>`
const apiRows = [
  { name: 'AppShell sidebarWidth', type: 'string', default: "'16rem'", description: '桌面端侧栏宽度，可传任意 CSS 尺寸。' },
  { name: 'AppShell sidebar / header / default', type: 'slot', default: '—', description: '分别为桌面侧栏、粘性顶栏与主内容区。' },
  { name: 'Sidebar label', type: 'string', default: "'侧边导航'", description: '导航语义的无障碍标签。' },
  { name: 'Sidebar header / default / footer', type: 'slot', default: '—', description: '固定头部、可滚动导航区与固定底部区域。' }
]
</script>
