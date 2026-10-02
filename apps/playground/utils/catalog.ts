export interface DocItem {
  name: string
  title: string
  description: string
}

export interface DocGroup {
  label: string
  items: DocItem[]
}

export const docGroups: DocGroup[] = [
  {
    label: '指南',
    items: [
      { name: 'index', title: '介绍', description: 'ReCloud UI 设计哲学与快速开始。' }
    ]
  },
  {
    label: 'Design Tokens',
    items: [
      { name: 'colors', title: '色彩与渐变', description: '品牌色度刻度与 180° 垂直天蓝渐变。' }
    ]
  },
  {
    label: '通用',
    items: [
      { name: 'button', title: 'Button 按钮', description: '六种视觉层级，覆盖主操作与低干扰链接。' },
      { name: 'badge', title: 'Badge 徽章', description: '轻量状态标签与版本标记。' },
      { name: 'banner', title: 'Banner 横幅', description: '维护预警与安全事件通告条。' },
      { name: 'card', title: 'Card 卡片', description: '内容容器与分割线层级。' },
      { name: 'avatar', title: 'Avatar 头像', description: '图像、降级文本与在线状态。' },
      { name: 'kbd', title: 'Kbd 按键提示', description: '快捷键视觉化展示。' },
      { name: 'spinner', title: 'Spinner 加载', description: '环形加载指示器。' }
    ]
  },
  {
    label: '表单',
    items: [
      { name: 'field', title: 'Field / Form 表单布局', description: '统一关联标签、说明、错误信息与表单间距。' },
      { name: 'input', title: 'Input 输入框', description: '带标签、提示与错误态的文本输入。' },
      { name: 'textarea', title: 'Textarea 文本域', description: '多行文本输入。' },
      { name: 'select', title: 'Select 选择器', description: '无障碍下拉选择。' },
      { name: 'checkbox', title: 'Checkbox 复选框', description: '布尔开关复选项。' },
      { name: 'switch', title: 'Switch 开关', description: '即时生效的切换开关。' },
      { name: 'radio-group', title: 'RadioGroup 单选组', description: '带描述的选项组。' },
      { name: 'slider', title: 'Slider 滑块', description: '单值/区间滑动输入。' },
      { name: 'rating', title: 'Rating 评分', description: '星级评分组件。' },
      { name: 'combobox', title: 'Combobox 组合框', description: '可搜索的下拉选择。' },
      { name: 'number-field', title: 'NumberField 数字输入', description: '步进增减数字。' },
      { name: 'pin-input', title: 'PinInput 验证码', description: 'OTP 分段输入。' },
      { name: 'editable', title: 'Editable 行内编辑', description: '点击即改的文本。' },
      { name: 'toggle', title: 'Toggle / ToggleGroup', description: '按压态工具按钮与分组。' },
      { name: 'label', title: 'Label 标签', description: '表单控件关联标签。' }
    ]
  },
  {
    label: '数据展示',
    items: [
      { name: 'data-table', title: 'DataTable 数据表', description: '列插槽富单元格渲染。' },
      { name: 'progress', title: 'Progress 进度条', description: '任务进度与百分比。' },
      { name: 'skeleton', title: 'Skeleton 骨架屏', description: '加载占位。' },
      { name: 'empty-state', title: 'EmptyState 空状态', description: '空数据页面引导。' },
      { name: 'separator', title: 'Separator 分隔线', description: '水平与垂直分隔。' }
    ]
  },
  {
    label: '导航',
    items: [
      { name: 'tabs', title: 'Tabs 标签页', description: '视图切换标签。' },
      { name: 'pagination', title: 'Pagination 分页', description: '页码与前后翻页。' },
      { name: 'breadcrumb', title: 'Breadcrumb 面包屑', description: '层级路径导航。' },
      { name: 'stepper', title: 'Stepper 步骤条', description: '多步流程进度。' },
      { name: 'navigation-menu', title: 'NavigationMenu 导航菜单', description: '悬停展开的顶部导航。' },
      { name: 'toolbar', title: 'Toolbar 工具条', description: '编辑器式按钮组。' }
    ]
  },
  {
    label: '折叠披露',
    items: [
      { name: 'accordion', title: 'Accordion 手风琴', description: '单开/多开问答折叠。' },
      { name: 'collapsible', title: 'CollapsiblePanel 折叠面板', description: '高级选项渐进披露。' }
    ]
  },
  {
    label: '浮层反馈',
    items: [
      { name: 'dialog', title: 'Dialog 对话框', description: '模态确认与表单弹层。' },
      { name: 'alert-dialog', title: 'AlertDialog 警示对话框', description: '破坏性操作二次确认。' },
      { name: 'dropdown-menu', title: 'DropdownMenu 下拉菜单', description: '操作菜单与快捷键提示。' },
      { name: 'context-menu', title: 'ContextMenu 右键菜单', description: '区域右键操作。' },
      { name: 'tooltip', title: 'Tooltip 文字提示', description: '悬停即时提示。' },
      { name: 'popover', title: 'Popover 浮层', description: '轻量内容弹层。' },
      { name: 'hover-card', title: 'HoverCard 悬停卡片', description: '预览用户信息卡。' },
      { name: 'toast', title: 'Toast 吐司提示', description: '全局操作反馈队列。' }
    ]
  },
  {
    label: '工具',
    items: [
      { name: 'scroll-area', title: 'ScrollArea 滚动区', description: '自定义滚动条容器。' },
      { name: 'aspect-ratio', title: 'AspectRatio 宽高比', description: '固定比例容器。' },
      { name: 'visually-hidden', title: 'VisuallyHidden 隐藏文本', description: '屏幕阅读器专用。' }
    ]
  }
]

export const flatDocs = docGroups.flatMap((g) => g.items.map((i) => ({ ...i, group: g.label })))

export function docPath(name: string): string {
  return name === 'index' ? '/' : `/components/${name}`
}

export function adjacentDocs(name: string): { prev?: { name: string; title: string }; next?: { name: string; title: string } } {
  const idx = flatDocs.findIndex((d) => d.name === name)
  return {
    prev: idx > 0 ? flatDocs[idx - 1] : undefined,
    next: idx >= 0 && idx < flatDocs.length - 1 ? flatDocs[idx + 1] : undefined
  }
}
