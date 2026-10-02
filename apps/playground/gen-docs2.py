#!/usr/bin/env python3
"""Generate batch 2 doc pages (navigation / disclosure / overlays / utility)."""
import os, runpy, sys

DIR = os.path.dirname(os.path.abspath(__file__)) + '/pages/components'
os.makedirs(DIR, exist_ok=True)

# reuse helpers from gen-docs.py by exec-ing its head portion
head = open(os.path.dirname(os.path.abspath(__file__)) + '/gen-docs.py').read()
head = head.split("# ---------------- Badge ----------------")[0]
ns = {'__file__': os.path.dirname(os.path.abspath(__file__)) + '/gen-docs.py'}
exec(head, ns)
ex, page = ns['ex'], ns['page']

# ---------------- Tabs ----------------
page('tabs', 'Tabs 标签页', '视图切换标签，pill 风格容器与内容面板插槽，基于 Reka UI 键盘导航。', [
    ex('基础与内容面板', '''      <Tabs v-model="tab" :items="[
        { label: '拓扑概览', value: 'overview' },
        { label: '性能监控', value: 'monitoring' },
        { label: '安全策略', value: 'settings', disabled: true }
      ]">
        <TabsContent value="overview">
          <div class="mt-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/40 ring-1 ring-inset ring-slate-200/60 dark:ring-slate-800/60 text-sm">
            当前已挂载 128 个全球边缘计算节点，平均端到端延迟 12ms。
          </div>
        </TabsContent>
        <TabsContent value="monitoring">
          <div class="mt-3 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/40 ring-1 ring-inset ring-slate-200/60 dark:ring-slate-800/60 text-sm">
            CPU 平均利用率 28%，内存占用 42%，无丢包记录。
          </div>
        </TabsContent>
      </Tabs>''', 'items 定义标签，TabsContent 按 value 匹配面板。'),
], "'''\n[ { name: 'model-value', type: 'string', default: '—', description: 'v-model 激活标签 value。' },\n  { name: 'items', type: '{ label, value, icon?, disabled? }[]', default: '—', description: '标签定义。' },\n  { name: 'TabsContent', type: 'component', default: '—', description: 'value 匹配的内容面板。' } ]\n'''", imports="import { ref } from 'vue'\nconst tab = ref('overview')\n\n")

# ---------------- Stepper ----------------
page('stepper', 'Stepper 步骤条', '多步流程进度指示：当前步高亮、已完成打勾、支持点击跳步。', [
    ex('部署向导', '''      <Stepper v-model="step" :steps="[
        { step: 1, title: '基础信息' },
        { step: 2, title: '网络拓扑' },
        { step: 3, title: '安全策略' },
        { step: 4, title: '确认部署' }
      ]" />
      <div class="mt-5 flex justify-end gap-2">
        <Button variant="outline" color="neutral" size="sm" :disabled="step <= 1" @click="step--">上一步</Button>
        <Button variant="solid" color="primary" size="sm" :disabled="step >= 4" @click="step++">下一步</Button>
      </div>''', '第 {{ step }} 步 / 共 4 步；linear 模式下必须按序完成。'),
    ex('纵向布局', '''      <Stepper :model-value="2" orientation="vertical" :steps="[
        { step: 1, title: '提交申请', description: '已创建工单 #4821' },
        { step: 2, title: '资源审批', description: '等待配额组确认' },
        { step: 3, title: '节点交付' }
      ]" />''', 'orientation=vertical 适合侧栏流程。'),
], "'''\n[ { name: 'model-value', type: 'number', default: '1', description: 'v-model 当前步骤号。' },\n  { name: 'steps', type: '{ step, title, description?, completed?, disabled? }[]', default: '—', description: '步骤定义。' },\n  { name: 'orientation', type: \"'horizontal' | 'vertical'\", default: 'horizontal', description: '排布方向。' },\n  { name: 'linear', type: 'boolean', default: 'false', description: '强制按序进行。' } ]\n'''", imports="import { ref } from 'vue'\nconst step = ref(2)\n\n")

# ---------------- NavigationMenu / Toolbar ----------------
page('navigation-menu', 'NavigationMenu 导航菜单', '悬停展开的顶部导航面板：Teleport 渲染避免容器裁剪，滚动自动重定位。', [
    ex('控制台顶部导航', '''      <NavigationMenu :items="[
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
      </NavigationMenu>''', '悬停展开、点击固定；面板 Teleport 到 body 不被 overflow 裁剪。'),
], "'''\n[ { name: 'items', type: '{ label, value, panel? }[]', default: '—', description: '导航项定义。' },\n  { name: 'model-value', type: 'string', default: '—', description: 'v-model 激活项。' },\n  { name: 'panel', type: 'slot', default: '—', description: '作用域插槽 { item } 面板内容。' } ]\n'''")

page('toolbar', 'Toolbar 工具条', '编辑器式按钮组：role=toolbar、方向键循环焦点与分隔线。', [
    ex('格式工具栏', '''      <div class="flex items-center gap-4">
        <Toolbar>
          <ToolbarButton aria-label="撤销">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 14 4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3" /></svg>
          </ToolbarButton>
          <ToolbarButton aria-label="重做">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="m15 14 5-5-5-5M20 9H10a6 6 0 0 0 0 12h3" /></svg>
          </ToolbarButton>
          <ToolbarSeparator />
          <ToolbarButton aria-label="加粗"><Bold class="h-4 w-4" /></ToolbarButton>
          <ToolbarButton disabled aria-label="删除">
            <svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /></svg>
          </ToolbarButton>
        </Toolbar>
        <VisuallyHidden>仅供屏幕阅读器的工具条说明</VisuallyHidden>
      </div>''', 'ToolbarButton 包裹原生 button，ToolbarSeparator 自动方向感知。'),
], "'''\n[ { name: 'Toolbar orientation', type: \"'horizontal' | 'vertical'\", default: 'horizontal', description: '排列方向。' },\n  { name: 'ToolbarButton size', type: \"'sm' | 'md'\", default: 'md', description: '28 / 36px 方形按钮。' },\n  { name: 'ToolbarButton disabled', type: 'boolean', default: 'false', description: '禁用并移出焦点循环。' },\n  { name: 'ToolbarSeparator', type: 'component', default: '—', description: '方向自适应分隔线。' } ]\n'''", imports="import { Bold } from '@recloud/ui/icons'\n\n")

page('visually-hidden', 'VisuallyHidden 隐藏文本', '视觉隐藏但屏幕阅读器可读的辅助文本。', [
    ex('用法', '''      <div class="flex items-center gap-3">
        <Spinner />
        <VisuallyHidden>正在同步集群配置，请勿刷新页面</VisuallyHidden>
        <span class="text-xs text-slate-400">（上方文本对屏幕阅读器可见，视觉上隐藏）</span>
      </div>'''),
], "'''\n[ { name: 'default', type: 'slot', default: '—', description: '需要无障碍朗读的内容。' } ]\n'''")

# ---------------- Accordion / Collapsible ----------------
page('accordion', 'Accordion 手风琴', '单开 / 多开折叠问答，chevron 旋转与展开动画。', [
    ex('单开模式', '''      <Accordion v-model="value" :items="[
        { value: 'quota', title: '配额与限额', content: '每个账户默认包含 256 个边缘节点、50 Gbps 突发带宽与 3 个可用区冗余组。' },
        { value: 'billing', title: '计费口径', content: '按小时粒度结算，入站流量免费，出站 Anycast 流量按阶梯单价计费。' },
        { value: 'compliance', title: '合规与审计', content: '全量操作审计日志保留 180 天，支持导出至对象存储归档。' }
      ]" />''', 'type=multiple 允许多项同时展开。'),
], "'''\n[ { name: 'items', type: '{ value, title, content?, disabled? }[]', default: '—', description: '条目定义。' },\n  { name: 'model-value', type: 'string | string[]', default: '—', description: '展开项 value。' },\n  { name: 'type', type: \"'single' | 'multiple'\", default: 'single', description: '折叠模式。' },\n  { name: 'collapsible', type: 'boolean', default: 'true', description: 'single 模式允许全部收起。' } ]\n'''", imports="import { ref } from 'vue'\nconst value = ref('quota')\n\n")

page('collapsible', 'CollapsiblePanel 折叠面板', '单区块渐进披露，适合高级选项与附加参数。', [
    ex('高级选项', '''      <CollapsiblePanel v-model:open="open" title="高级网络参数">
        <div class="flex flex-wrap items-center gap-2">
          <Badge variant="soft" color="neutral">MTU 1500</Badge>
          <Badge variant="soft" color="neutral">TCP BBR</Badge>
          <Badge variant="soft" color="primary">TLS 1.3</Badge>
          <Badge variant="outline" color="neutral">GRE Tunnel: 关闭</Badge>
        </div>
      </CollapsiblePanel>''', 'trigger-extra 插槽可在标题行右侧追加徽标。'),
], "'''\n[ { name: 'open', type: 'boolean', default: 'false', description: 'v-model:open 展开态。' },\n  { name: 'title', type: 'string', default: '—', description: '触发行标题。' },\n  { name: 'title / trigger-extra', type: 'slot', default: '—', description: '自定义标题 / 行尾附加内容。' },\n  { name: 'disabled', type: 'boolean', default: 'false', description: '禁止展开。' } ]\n'''", imports="import { ref } from 'vue'\nconst open = ref(false)\n\n")

# ---------------- Dialog / AlertDialog ----------------
page('dialog', 'Dialog 对话框', '模态弹层：遮罩模糊、焦点圈闭与 Esc 关闭，支持 header/footer 结构插槽。', [
    ex('表单弹层', '''      <Button variant="solid" color="primary" @click="open = true">打开对话框</Button>
      <Dialog v-model:open="open" title="配置虚拟网络网段" description="更新当前 VPC 的 CIDR 规则，此操作将同步至边界安全网关。">
        <div class="space-y-3 py-1">
          <Input placeholder="10.0.0.0/16" label="目标 CIDR 网段" />
          <Banner color="warning" title="路由警告">变更可能导致活跃的持久长连接短暂重连。</Banner>
        </div>
        <template #footer>
          <Button variant="outline" color="neutral" @click="open = false">取消</Button>
          <Button variant="solid" color="primary" @click="open = false">确认应用</Button>
        </template>
      </Dialog>''', 'trigger 插槽或受控 open 均可。'),
], "'''\n[ { name: 'open', type: 'boolean', default: 'false', description: 'v-model:open 受控展开。' },\n  { name: 'title / description', type: 'string', default: '—', description: '头部文案。' },\n  { name: 'trigger / header / footer', type: 'slot', default: '—', description: '结构插槽。' } ]\n'''", imports="import { ref } from 'vue'\nconst open = ref(false)\n\n")

page('alert-dialog', 'AlertDialog 警示对话框', '破坏性操作的强确认流：无法点击遮罩关闭，取消 / 确认双按钮。', [
    ex('终止实例', '''      <AlertDialog
        title="终止实例 hkg-edge-07？"
        description="该操作不可撤销，实例上的所有活跃连接将立即断开。"
        action-text="确认终止"
        cancel-text="再想想"
        destructive
      >
        <template #trigger>
          <Button variant="soft" color="error">危险确认 (Alert Dialog)</Button>
        </template>
      </AlertDialog>''', 'destructive 将确认按钮转为红色。'),
], "'''\n[ { name: 'open', type: 'boolean', default: '—', description: 'v-model:open。' },\n  { name: 'title / description', type: 'string', default: '—', description: '确认文案。' },\n  { name: 'action-text / cancel-text', type: 'string', default: '确认 / 取消', description: '按钮文案。' },\n  { name: 'destructive', type: 'boolean', default: 'false', description: '危险操作红色样式。' } ]\n'''")

# ---------------- DropdownMenu / ContextMenu ----------------
page('dropdown-menu', 'DropdownMenu 下拉菜单', '操作菜单：图标、快捷键提示、分隔线与破坏性项，全键盘可达。', [
    ex('实例操作', '''      <DropdownMenu :items="[
        { label: '查看拓扑分析', onSelect: () => toast({ title: '导航至拓扑分析视图' }) },
        { label: '复制连接字符串', onSelect: () => toast({ title: '已复制凭证至剪贴板', variant: 'success' }) },
        { separator: true },
        { label: '删除该实例', destructive: true, onSelect: () => toast({ title: '实例已终止', variant: 'destructive' }) }
      ]">
        <template #trigger>
          <Button variant="outline" color="neutral">选项菜单</Button>
        </template>
      </DropdownMenu>''', 'items 数组声明式定义，separator 项仅渲染分隔线。'),
], "'''\n[ { name: 'items', type: '{ label, icon?, disabled?, destructive?, separator?, onSelect? }[]', default: '—', description: '菜单项。' },\n  { name: 'side-offset', type: 'number', default: '4', description: '浮层偏移。' },\n  { name: 'trigger', type: 'slot', default: '—', description: '触发元素。' } ]\n'''", imports="import { useToast } from '@recloud/ui'\nconst { toast } = useToast()\n\n")

page('context-menu', 'ContextMenu 右键菜单', '在指定区域右键唤起的上下文操作菜单，与 DropdownMenu 共享 item 协议。', [
    ex('拓扑区域右键', '''      <ContextMenu :items="[
        { label: '刷新拓扑', onSelect: () => toast({ title: '拓扑数据已刷新', variant: 'success' }) },
        { label: '导出配置', onSelect: () => toast({ title: '配置导出中…' }) },
        { separator: true },
        { label: '隔离节点', destructive: true, onSelect: () => toast({ title: '节点已隔离', variant: 'destructive' }) }
      ]">
        <div class="rounded-lg ring-1 ring-inset ring-slate-200 dark:ring-slate-800 bg-slate-50/70 dark:bg-slate-900/40 px-4 py-6 text-sm text-slate-500 dark:text-slate-400 select-none text-center">
          在此区域点击右键
        </div>
      </ContextMenu>''', '默认插槽即右键触发区。'),
], "'''\n[ { name: 'items', type: '{ label, icon?, disabled?, destructive?, separator?, onSelect? }[]', default: '—', description: '菜单项。' },\n  { name: 'default', type: 'slot', default: '—', description: '右键触发区域。' } ]\n'''", imports="import { useToast } from '@recloud/ui'\nconst { toast } = useToast()\n\n")

# ---------------- Tooltip / Popover / HoverCard ----------------
page('tooltip', 'Tooltip 文字提示', '悬停即时提示，自动避开视口边缘。', [
    ex('四方向', '''      <div class="demo-grid">
        <Tooltip content="上方提示" side="top"><Button variant="outline" color="neutral">Top</Button></Tooltip>
        <Tooltip content="右侧提示" side="right"><Button variant="outline" color="neutral">Right</Button></Tooltip>
        <Tooltip content="下方提示，延迟 400ms 出现" side="bottom" :delay-duration="400"><Button variant="outline" color="neutral">Bottom</Button></Tooltip>
        <Tooltip content="左侧提示" side="left"><Button variant="outline" color="neutral">Left</Button></Tooltip>
      </div>'''),
], "'''\n[ { name: 'content', type: 'string', default: '—', description: '提示文本。' },\n  { name: 'side', type: \"'top' | 'right' | 'bottom' | 'left'\", default: 'top', description: '偏好方向。' },\n  { name: 'side-offset', type: 'number', default: '5', description: '与触发器的间距。' },\n  { name: 'delay-duration', type: 'number', default: '150', description: '出现延迟（毫秒）。' } ]\n'''")

page('popover', 'Popover 浮层', '轻量内容弹层：标题、关闭按钮与表单友好焦点管理。', [
    ex('限流设置', '''      <Popover title="速率限制设置" show-close align="center">
        <template #trigger>
          <Button variant="outline" color="neutral">气泡面板</Button>
        </template>
        <p class="mb-2 text-sm text-slate-600 dark:text-slate-400">为当前网关分组配置全局限流规则，超出阈值的请求将返回 429。</p>
        <div class="flex items-center gap-2">
          <Badge variant="subtle" color="primary">RPS 10,000</Badge>
          <Badge variant="subtle" color="neutral">Burst 20,000</Badge>
        </div>
      </Popover>''', '受控时 v-model:open。'),
], "'''\n[ { name: 'open', type: 'boolean', default: '—', description: 'v-model:open。' },\n  { name: 'title', type: 'string', default: '—', description: '面板标题。' },\n  { name: 'show-close', type: 'boolean', default: 'false', description: '右上角关闭按钮。' },\n  { name: 'align', type: \"'start' | 'center' | 'end'\", default: 'center', description: '对齐方式。' } ]\n'''")

page('hover-card', 'HoverCard 悬停卡片', '悬停预览卡片：人员信息、节点详情等低承诺交互。', [
    ex('人员卡片', '''      <HoverCard>
        <template #trigger>
          <Button variant="outline" color="neutral">悬停查看</Button>
        </template>
        <div class="space-y-2">
          <div class="flex items-center gap-2.5">
            <Avatar fallback="RS" size="sm" />
            <div>
              <p class="text-sm font-semibold text-slate-900 dark:text-white">ReCloud Studio</p>
              <p class="text-xs text-slate-500">边缘云平台 · 2026</p>
            </div>
          </div>
          <p class="text-xs leading-relaxed text-slate-600 dark:text-slate-400">悬停 300ms 后自动展开，离开 200ms 后关闭。</p>
        </div>
      </HoverCard>''', 'openDelay / closeDelay 可调。'),
], "'''\n[ { name: 'open-delay / close-delay', type: 'number', default: '300 / 200', description: '开关闭延迟（毫秒）。' },\n  { name: 'side / side-offset', type: \"'top' | … | number\", default: 'bottom / 6', description: '弹出方位。' },\n  { name: 'trigger / default', type: 'slot', default: '—', description: '触发元素与卡片内容。' } ]\n'''")

# ---------------- Toast ----------------
page('toast', 'Toast 吐司提示', '全局操作反馈队列：四类语义样式、自动堆叠与滑出动画。', [
    ex('触发反馈', '''      <div class="demo-grid">
        <Button variant="soft" color="neutral" @click="fire('信息提示', 'info')">Info</Button>
        <Button variant="soft" color="success" @click="fire('操作已成功执行', 'success')">Success</Button>
        <Button variant="soft" color="warning" @click="fire('检测到配置预警', 'warning')">Warning</Button>
        <Button variant="soft" color="error" @click="fire('实例终止失败', 'destructive')">Destructive</Button>
      </div>''', 'toast(options) 由 useToast 提供，需在应用根部挂载 ToastProvider。'),
], "'''\n[ { name: 'ToastProvider', type: 'component', default: '—', description: '队列容器（挂一次即可）。' },\n  { name: 'useToast()', type: 'composable', default: '—', description: '返回 { toast, dismiss }。' },\n  { name: 'options.title / description', type: 'string', default: '—', description: '标题与说明。' },\n  { name: 'options.variant', type: \"'info' | 'success' | 'warning' | 'destructive'\", default: 'info', description: '语义样式。' },\n  { name: 'options.duration', type: 'number', default: '4500', description: '自动关闭毫秒数。' } ]\n'''", imports="import { useToast } from '@recloud/ui'\nconst { toast } = useToast()\nfunction fire(title: string, variant: 'info' | 'success' | 'warning' | 'destructive' = 'info') {\n  toast({ title, description: `触发于 ${new Date().toLocaleTimeString()}`, variant })\n}\n\n")

# ---------------- ScrollArea / AspectRatio / Breadcrumb ----------------
page('scroll-area', 'ScrollArea 滚动区', '自定义纤细滚动条的受限视口，深浅色自动适配。', [
    ex('节点列表', '''      <ScrollArea max-height="12rem" class="max-w-sm">
        <div class="space-y-1 pr-3">
          <div v-for="(node, i) in nodes" :key="node" class="flex items-center justify-between rounded-lg px-3 py-2 text-sm ring-1 ring-inset ring-slate-200/70 dark:ring-slate-800/70">
            <span class="font-mono text-xs text-slate-700 dark:text-slate-300">{{ node }}</span>
            <Badge :color="i % 4 === 3 ? 'warning' : 'success'" variant="soft" size="xs">{{ i % 4 === 3 ? '维护' : '健康' }}</Badge>
          </div>
        </div>
      </ScrollArea>''', 'max-height 接受任意 CSS 长度。'),
], "'''\n[ { name: 'max-height', type: 'string', default: '18rem', description: '视口最大高度。' } ]\n'''", imports="const nodes = ['hkg-edge-01', 'nrt-edge-02', 'sjc-edge-03', 'fra-edge-04', 'sin-edge-05', 'iad-edge-06', 'gru-edge-07', 'syd-edge-08', 'nrt-edge-09', 'hkg-edge-10']\n\n")

page('aspect-ratio', 'AspectRatio 宽高比', '固定比例容器，用于视频、截图与封面占位。', [
    ex('16:9 媒体区', '''      <AspectRatio :ratio="16 / 9" class="max-w-md">
        <div class="flex h-full w-full items-center justify-center bg-gradient-to-b from-[#C8E0FD] via-[#70ACFE] to-[#3069C9] text-sm font-semibold text-white">
          16 : 9 品牌渐变媒体区
        </div>
      </AspectRatio>''', '缩放宽度时高度自动保持比例。'),
], "'''\n[ { name: 'ratio', type: 'number', default: '16 / 9', description: '宽 / 高 数值比。' } ]\n'''")

page('breadcrumb', 'Breadcrumb 面包屑', '层级路径导航，末项自动加粗并标记 aria-current。', [
    ex('控制台路径', '''      <BreadcrumbNav :items="[
        { label: '控制台', to: '/' },
        { label: '边缘网络', to: '/network' },
        { label: '集群详情' }
      ]" />''', '传 to 渲染 NuxtLink，末项无 to 即当前页。'),
], "'''\n[ { name: 'items', type: '{ label, to? }[]', default: '—', description: '路径项。' },\n  { name: 'aria-label', type: 'string', default: '面包屑导航', description: '无障碍标注。' } ]\n'''")

print('batch 2 done:', len(os.listdir(DIR)), 'pages')
