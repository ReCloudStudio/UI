<template>
  <div class="space-y-10">
    <PageHeader
      title="AppShell 应用布局"
      description="为开发者控制台提供桌面侧栏、移动端抽屉入口与受约束的内容区骨架。"
    />

    <ComponentExample
      title="响应式控制台骨架"
      description="桌面端可收起侧栏；小于 lg 时使用 mobile-menu-trigger 插槽将同一导航放入 Sheet。"
      :code="responsiveCode"
    >
      <div class="h-[30rem] overflow-hidden rounded-xl ring-1 ring-[var(--border)]">
        <AppShell
          v-model:collapsed="collapsed"
          sidebar-width="13rem"
          collapsed-sidebar-width="4rem"
          content-width="wide"
        >
          <template #sidebar="{ collapsed: sidebarCollapsed }">
            <Sidebar :collapsed="sidebarCollapsed">
              <template #header="{ collapsed: headerCollapsed }">
                <div class="flex items-center justify-between gap-2">
                  <span class="truncate text-sm font-semibold text-[var(--foreground)]">
                    {{ headerCollapsed ? 'RC' : 'ReCloud Console' }}
                  </span>
                  <button
                    class="hidden rounded-md p-1.5 text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)] lg:inline-flex"
                    type="button"
                    :aria-label="collapsed ? '展开侧边栏' : '收起侧边栏'"
                    @click="collapsed = !collapsed"
                  >
                    <PanelLeftClose v-if="!collapsed" class="size-4" />
                    <PanelLeftOpen v-else class="size-4" />
                  </button>
                </div>
              </template>

              <nav class="space-y-1">
                <a
                  v-for="item in navItems"
                  :key="item.label"
                  href="#"
                  :aria-label="item.label"
                  :title="sidebarCollapsed ? item.label : undefined"
                  :class="[
                    'flex items-center rounded-lg py-2 text-sm font-medium transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]',
                    sidebarCollapsed ? 'justify-center px-2' : 'gap-2.5 px-3',
                    item.active
                      ? 'bg-[var(--muted)] text-[var(--foreground)]'
                      : 'text-[var(--muted-foreground)]'
                  ]"
                  @click.prevent
                >
                  <component :is="item.icon" class="size-4 shrink-0" />
                  <span v-if="!sidebarCollapsed" class="truncate">{{ item.label }}</span>
                </a>
              </nav>

              <template #footer="{ collapsed: footerCollapsed }">
                <Button
                  class="w-full"
                  size="sm"
                  variant="outline"
                  color="neutral"
                  :aria-label="footerCollapsed ? '工作区设置' : undefined"
                >
                  <Settings class="size-4" :class="!footerCollapsed && 'mr-1.5'" />
                  <span v-if="!footerCollapsed">工作区设置</span>
                </Button>
              </template>
            </Sidebar>
          </template>

          <template #mobile-menu-trigger>
            <Sheet v-model:open="mobileNavigationOpen" side="left" size="17rem" title="ReCloud Console">
              <template #trigger>
                <Button variant="ghost" color="neutral" size="sm" aria-label="打开导航">
                  <Menu class="size-4" />
                </Button>
              </template>
              <nav class="space-y-1">
                <a
                  v-for="item in navItems"
                  :key="item.label"
                  href="#"
                  class="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
                  @click.prevent="mobileNavigationOpen = false"
                >
                  <component :is="item.icon" class="size-4" />
                  {{ item.label }}
                </a>
              </nav>
            </Sheet>
          </template>

          <template #header>
            <div class="text-sm font-medium text-[var(--foreground)]">Webhook 投递记录</div>
          </template>

          <div class="p-5">
            <Card title="近 24 小时投递">
              <p class="text-sm text-[var(--muted-foreground)]">内容区使用 wide 宽度约束，页面仍可按需提供自己的内边距。</p>
            </Card>
          </div>
        </AppShell>
      </div>
    </ComponentExample>

    <section class="space-y-4">
      <h2 class="text-xl font-semibold tracking-tight text-[var(--foreground)]">导航职责边界</h2>
      <div class="grid gap-4 lg:grid-cols-3">
        <Card title="AppShell">
          <p class="text-sm leading-6 text-[var(--muted-foreground)]">负责应用级骨架：桌面侧栏宽度、收起状态、顶部区域、移动端菜单入口和内容宽度。不拥有路由或菜单数据。</p>
        </Card>
        <Card title="Sidebar">
          <p class="text-sm leading-6 text-[var(--muted-foreground)]">负责控制台的纵向导航容器：固定头尾、可滚动主体和折叠时的呈现。将同一导航数据复用于 Sheet，避免维护两套导航来源。</p>
        </Card>
        <Card title="NavigationMenu">
          <p class="text-sm leading-6 text-[var(--muted-foreground)]">负责页面内或顶栏中的水平导航与可展开面板。不要用它替代 Sidebar，也不要让同一层级的路由同时由两者渲染。</p>
        </Card>
      </div>
    </section>

    <ApiTable :rows="apiRows" />
    <DocPageNav name="app-shell" />
  </div>
</template>

<script setup lang="ts">
import {
  LayoutDashboard,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Webhook
} from '@recloudstudio/ui/icons'

const collapsed = ref(false)
const mobileNavigationOpen = ref(false)

const navItems = [
  { label: '概览', icon: LayoutDashboard, active: false },
  { label: 'Webhooks', icon: Webhook, active: false },
  { label: '投递记录', icon: Webhook, active: true },
  { label: '通知规则', icon: Settings, active: false }
]

const responsiveCode = `<AppShell
  v-model:collapsed="sidebarCollapsed"
  sidebar-width="16rem"
  collapsed-sidebar-width="4.5rem"
  content-width="wide"
>
  <template #sidebar="{ collapsed }">
    <Sidebar :collapsed="collapsed"><!-- desktop navigation --></Sidebar>
  </template>

  <template #mobile-menu-trigger>
    <Sheet side="left" title="Navigation">
      <template #trigger><Button aria-label="Open navigation">Menu</Button></template>
      <!-- render the same navigation data here -->
    </Sheet>
  </template>

  <template #header><ConsoleHeader /></template>
  <main><!-- page content --></main>
</AppShell>`

const apiRows = [
  { name: 'v-model:collapsed', type: 'boolean', default: 'false', description: '桌面侧栏是否以 collapsedSidebarWidth 收起。侧栏内容通过 sidebar 插槽参数和 Sidebar collapsed prop 自行呈现精简状态。' },
  { name: 'sidebarWidth', type: 'string', default: "'16rem'", description: '展开时的桌面侧栏宽度，可传任意 CSS 尺寸。' },
  { name: 'collapsedSidebarWidth', type: 'string', default: "'4.5rem'", description: '收起时的桌面侧栏宽度，通常应容纳导航图标。' },
  { name: 'contentWidth', type: "'full' | 'wide' | 'default' | 'narrow'", default: "'full'", description: '默认内容槽的最大宽度约定：full 不约束、wide 为 90rem、default 为 76rem、narrow 为 64rem。' },
  { name: 'sidebarLabel', type: 'string', default: "'应用侧边栏'", description: '桌面侧栏 landmark 的无障碍标签。' },
  { name: 'sidebar', type: 'slot', default: '—', description: '桌面侧栏。插槽参数为 collapsed 和 toggleCollapsed。' },
  { name: 'mobile-menu-trigger', type: 'slot', default: '—', description: '仅在 lg 以下显示。将 Sheet trigger 放在这里，并复用与桌面 Sidebar 相同的导航数据。' },
  { name: 'header / default', type: 'slot', default: '—', description: '粘性顶栏和主内容区。header 插槽同样接收 collapsed 与 toggleCollapsed。' },
  { name: 'Sidebar collapsed', type: 'boolean', default: 'false', description: '传递给 Sidebar 的折叠状态；所有三个 Sidebar 插槽都可读取 collapsed 参数。' }
]
</script>
