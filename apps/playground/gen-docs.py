#!/usr/bin/env python3
"""Generate component doc pages for the ReCloud UI playground."""
import os

DIR = os.path.dirname(os.path.abspath(__file__)) + '/pages/components'
os.makedirs(DIR, exist_ok=True)

TPL = '''<template>
  <div class="space-y-10">
    <DocPageHeader {group}title="{title}" description="{desc}" />

{examples}
    <DocApiTable :rows="apiRows" />

    <DocPageNav name="{name}" />
  </div>
</template>

<script setup lang="ts">
{imports}{codes}
const apiRows = {api}
</script>
'''

EX = '''    <DocExample title="{etitle}"{descattr}{codeattr}>
{body}
    </DocExample>
'''


CODES = []

def ex(title, body, desc='', code=None, indent=True):
    d = f' description="{desc}"' if desc else ''
    if code is None:
        auto = 'rcCode%d' % len(CODES)
        lines = body.strip('\n').split('\n')
        indents = [len(l) - len(l.lstrip()) for l in lines if l.strip()]
        m = min(indents) if indents else 0
        ded = '\n'.join(l[m:] if l.strip() else '' for l in lines)
        ded = ded.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
        CODES.append('const %s = `%s`' % (auto, ded))
        code = auto
    c = f' :code="{code}"' if code else ''
    return EX.format(etitle=title, descattr=d, codeattr=c, body=body)


def page(name, title, desc, examples, api, group='', imports=''):
    g = f'group="{group}" ' if group else ''
    codes = '\n\n'.join(CODES) + ('\n\n' if CODES else '')
    CODES.clear()
    out = TPL.format(group=g, title=title, desc=desc, name=name,
                     examples='\n'.join(examples), api=api, imports=imports, codes=codes)
    with open(f'{DIR}/{name}.vue', 'w') as f:
        f.write(out)


# ---------------- Badge ----------------
page('badge', 'Badge 徽章', '轻量状态标签，适合版本、运行状态和不打断阅读的辅助信息。支持微光状态圆点与四档尺寸。', [
    ex('变体与色彩', '''      <div class="demo-grid">
        <Badge variant="solid" color="primary">Solid</Badge>
        <Badge variant="outline" color="primary">Outline</Badge>
        <Badge variant="soft" color="primary">Soft</Badge>
        <Badge variant="subtle" color="primary">Subtle</Badge>
        <Badge variant="soft" color="primary" dot>With Dot</Badge>
      </div>
      <div class="demo-grid mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <Badge variant="subtle" color="neutral">Neutral</Badge>
        <Badge variant="soft" color="success" dot>Operational</Badge>
        <Badge variant="soft" color="warning" dot>Degraded</Badge>
        <Badge variant="soft" color="error" dot>Outage</Badge>
      </div>''', '主色、中性与语义状态色，dot 属性渲染呼吸圆点。', code=None),
], "'''\n[ { name: 'variant', type: \"'solid' | 'outline' | 'soft' | 'subtle'\", default: 'soft', description: '视觉变体。' },\n  { name: 'color', type: \"'primary' | 'neutral' | 'success' | 'warning' | 'error'\", default: 'primary', description: '语义色。' },\n  { name: 'size', type: \"'xs' | 'sm' | 'md' | 'lg'\", default: 'sm', description: '字号与内边距。' },\n  { name: 'dot', type: 'boolean', default: 'false', description: '左侧状态呼吸圆点。' } ]\n'''")

# ---------------- Banner ----------------
page('banner', 'Banner 横幅', '用于发布网络变更、维护窗口和安全事件等需要被及时理解的信息，左侧图标自动映射语义色。', [
    ex('语义等级', '''      <div class="space-y-2.5">
        <Banner color="primary" title="全球边缘网络更新" description="亚太与欧洲区域节点现已全面启用 Anycast 智能链路分发。" />
        <Banner color="success" title="访问凭据轮转就绪" description="租户安全密钥已由 KMS 服务无感知轮换完成。" />
        <Banner color="warning" title="网络维护预警" description="法兰克福可用区将于北京时间凌晨 03:00 进行例行交换机固件维护。" />
        <Banner color="error" title="节点异常" description="gru-edge-07 连续健康检查失败，流量已自动切换至备用节点。" />
      </div>''', 'primary / success / warning / error 四级通告。'),
    ex('带操作按钮', '''      <Banner color="neutral" title="账单周期提醒" description="本月用量报表已生成，请及时核对出站流量费用。">
        <template #action><Button size="xs" variant="outline" color="neutral">查看报表</Button></template>
      </Banner>''', '通过 action 插槽追加低干扰操作。'),
], "'''\n[ { name: 'title', type: 'string', default: '—', description: '加粗标题。' },\n  { name: 'description', type: 'string', default: '—', description: '正文说明。' },\n  { name: 'color', type: \"'primary' | 'neutral' | 'success' | 'warning' | 'error'\", default: 'primary', description: '语义色与图标映射。' },\n  { name: 'variant', type: \"'outline' | 'soft' | 'subtle'\", default: 'soft', description: '底色强度。' },\n  { name: 'icon / action', type: 'slot', default: '—', description: '自定义左侧图标 / 右侧操作区。' } ]\n'''")

# ---------------- Card ----------------
page('card', 'Card 卡片', '控制台内容的标准容器：标题、描述、操作区与主体分割层级，内嵌环线取代厚重描边。', [
    ex('结构层级', '''      <Card title="集群健康检查" description="过去 24 小时的可用性遥测" padding="md">
        <template #action><Badge color="success" variant="soft" dot>99.99%</Badge></template>
        <div class="space-y-2">
          <Progress :value="92" label="SLA 达成率" show-value />
          <p class="text-sm text-slate-600 dark:text-slate-400">128 个边缘节点中 2 个处于维护窗口，流量已自动旁路。</p>
        </div>
        <template #footer>
          <div class="flex justify-end gap-2">
            <Button size="sm" variant="ghost" color="neutral">稍后处理</Button>
            <Button size="sm" variant="solid" color="primary">查看拓扑</Button>
          </div>
        </template>
      </Card>''', 'header 的 action 插槽与 footer 分割线自动生成。'),
    ex('变体与交互', '''      <div class="grid gap-4 sm:grid-cols-3">
        <Card variant="outline" title="Outline" description="默认内嵌环线"><p class="text-sm text-slate-500 dark:text-slate-400">最通用的表面。</p></Card>
        <Card variant="soft" title="Soft" description="柔和底色"><p class="text-sm text-slate-500 dark:text-slate-400">用于嵌套层级。</p></Card>
        <Card variant="subtle" hoverable title="Hoverable" description="悬停抬升"><p class="text-sm text-slate-500 dark:text-slate-400">可点击的卡片入口。</p></Card>
      </div>''', 'outline / soft / subtle 三种表面与 hoverable 微交互。'),
], "'''\n[ { name: 'title / description', type: 'string', default: '—', description: '头部标题与副标题。' },\n  { name: 'variant', type: \"'outline' | 'soft' | 'subtle'\", default: 'outline', description: '表面层级。' },\n  { name: 'padding', type: \"'none' | 'sm' | 'md' | 'lg'\", default: 'md', description: '主体内边距。' },\n  { name: 'accent', type: 'boolean', default: 'false', description: '顶部品牌渐变强调条。' },\n  { name: 'hoverable', type: 'boolean', default: 'false', description: '悬停时环线与阴影变化。' },\n  { name: 'action / footer', type: 'slot', default: '—', description: '头部右侧操作 / 底部分割区。' } ]\n'''")

# ---------------- Avatar ----------------
page('avatar', 'Avatar 头像', '图像、降级文本与在线状态四态圆点，覆盖团队成员与操作人头像场景。', [
    ex('尺寸与状态', '''      <div class="demo-grid">
        <Avatar fallback="RC" size="xs" />
        <Avatar fallback="RC" size="sm" status="online" />
        <Avatar fallback="ED" size="md" status="busy" />
        <Avatar fallback="OP" size="lg" status="away" />
        <Avatar fallback="GU" size="xl" status="offline" class="bg-slate-100 text-slate-500 dark:bg-slate-800" />
      </div>''', 'xs 到 xl 五档，online / busy / away / offline 状态点自动带描边。'),
    ex('团队行场景', '''      <div class="flex items-center justify-between gap-4 max-w-sm">
        <div class="flex items-center gap-3">
          <Avatar fallback="RS" size="lg" status="online" class="bg-blue-100 text-[#1E63CE] dark:bg-blue-950/60 dark:text-[#70ACFE]" />
          <div>
            <div class="text-sm font-semibold text-slate-900 dark:text-white">ReCloud Edge</div>
            <div class="text-sm text-slate-500 dark:text-slate-400">CN-HK1 · 128 个节点在线</div>
          </div>
        </div>
        <Badge color="success" variant="soft" dot>健康</Badge>
      </div>''', '与 Badge 组合的标准运维人员行。'),
], "'''\n[ { name: 'src', type: 'string', default: '—', description: '图像地址，加载失败自动降级。' },\n  { name: 'fallback', type: 'string', default: '—', description: '降级显示的首字母文本。' },\n  { name: 'size', type: \"'xs' | 'sm' | 'md' | 'lg' | 'xl'\", default: 'md', description: '直径 24–56px。' },\n  { name: 'status', type: \"'online' | 'offline' | 'busy' | 'away'\", default: '—', description: '右下角状态圆点。' } ]\n'''")

# ---------------- Kbd ----------------
page('kbd', 'Kbd 按键提示', '等宽键帽样式的快捷键展示，自动适配深浅色。', [
    ex('组合键', '''      <div class="flex flex-wrap items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
        <span>全局搜索</span><Kbd>Ctrl</Kbd><Kbd>K</Kbd>
        <span class="ml-3">部署</span><Kbd>⌘</Kbd><Kbd>Enter</Kbd>
        <span class="ml-3">帮助</span><Kbd size="xs">?</Kbd>
      </div>''', 'xs / sm / md 三档尺寸。'),
], "'''\n[ { name: 'size', type: \"'xs' | 'sm' | 'md'\", default: 'sm', description: '键帽字号。' } ]\n'''")

# ---------------- Spinner ----------------
page('spinner', 'Spinner 加载', 'role=status 的环形加载指示器，颜色跟随文本继承。', [
    ex('尺寸', '''      <div class="demo-grid">
        <span class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Spinner size="xs" /> 校验中…</span>
        <span class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Spinner size="sm" color="primary" /> 部署中…</span>
        <span class="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400"><Spinner size="md" /> 同步中…</span>
        <Spinner size="lg" class="text-[#2563EB] dark:text-[#70ACFE]" />
      </div>''', 'xs 到 lg 四档；color 语义色。'),
], "'''\n[ { name: 'size', type: \"'xs' | 'sm' | 'md' | 'lg'\", default: 'md', description: '直径。' },\n  { name: 'color', type: \"'primary' | 'neutral' | 'success' | 'warning' | 'error'\", default: 'neutral', description: '语义色，默认继承 currentColor。' } ]\n'''")

# ---------------- Input ----------------
page('input', 'Input 输入框', '带标签、提示文案与错误态的文本输入，40px 标准交互高度与显著焦点环线。', [
    ex('基础用法', '''      <div class="grid gap-5 sm:grid-cols-2">
        <Input v-model="text" label="集群标识符" placeholder="请输入节点名称…" hint="由小写字母、数字及横线组成" />
        <Input v-model="err" label="API 端点" error="该端点未通过 TLS 证书校验" />
      </div>''', 'hint 与 error 互斥，error 时环线转为红色。'),
    ex('尺寸与前后缀', '''      <div class="grid gap-5 sm:grid-cols-2">
        <Input v-model="s1" size="sm" placeholder="Small" />
        <Input v-model="s2" size="lg" placeholder="Large" />
        <Input v-model="s3" placeholder="gateway.recloud.studio">
          <template #leading><span class="pl-3 text-slate-400 text-sm">https://</span></template>
        </Input>
        <Input v-model="s4" placeholder="搜索节点…" disabled />
      </div>''', 'leading / trailing 插槽嵌入图标与单位。'),
], "'''\n[ { name: 'model-value', type: 'string | number', default: '—', description: 'v-model 绑定值。' },\n  { name: 'label / hint / error', type: 'string', default: '—', description: '标签、说明与错误文案。' },\n  { name: 'size', type: \"'sm' | 'md' | 'lg'\", default: 'md', description: '36 / 40 / 44px 高度。' },\n  { name: 'type', type: 'string', default: 'text', description: '原生 input 类型。' },\n  { name: 'disabled / readonly / required', type: 'boolean', default: 'false', description: '状态控制。' },\n  { name: 'leading / trailing', type: 'slot', default: '—', description: '框内前后缀。' } ]\n'''", imports="import { ref } from 'vue'\nconst text = ref('')\nconst err = ref('edge-http://insecure')\nconst s1 = ref('')\nconst s2 = ref('')\nconst s3 = ref('')\nconst s4 = ref('')\n\n")

# ---------------- Textarea ----------------
page('textarea', 'Textarea 文本域', '多行文本输入，与 Input 共享标签与错误态体系。', [
    ex('基础', '''      <Textarea v-model="val" label="服务注释" placeholder="补充集群用途、负责人与回滚方案…" hint="最多 500 字" :rows="4" />''', 'rows 控制初始高度。'),
], "'''\n[ { name: 'model-value', type: 'string', default: '—', description: 'v-model 绑定值。' },\n  { name: 'rows', type: 'number', default: '4', description: '初始行数。' },\n  { name: 'label / hint / error', type: 'string', default: '—', description: '同 Input。' },\n  { name: 'disabled / readonly / required', type: 'boolean', default: 'false', description: '状态控制。' } ]\n'''", imports="import { ref } from 'vue'\nconst val = ref('用于承载 ReCloud Studio 生产环境前端网关集群。')\n\n")

# ---------------- Select ----------------
page('select', 'Select 选择器', '基于 Reka UI 的无障碍下拉：键盘导航、类型高亮与品牌色选中标记。', [
    ex('基础', '''      <div class="grid gap-5 sm:grid-cols-2">
        <Select v-model="region" label="目标地域" :options="[
          { label: '中国香港 (HKG)', value: 'hkg' },
          { label: '日本东京 (NRT)', value: 'nrt' },
          { label: '德国法兰克福 (FRA)', value: 'fra' },
          { label: '美国硅谷 (SJC)', value: 'sjc' }
        ]" />
        <Select v-model="region" label="禁用示例" :options="[{ label: '不可选', value: 'x' }]" disabled />
      </div>''', 'options 支持 disabled 项。'),
], "'''\n[ { name: 'model-value', type: 'string', default: '—', description: 'v-model 选中值。' },\n  { name: 'options', type: '{ label, value, disabled? }[]', default: '—', description: '选项列表。' },\n  { name: 'placeholder', type: 'string', default: '请选择…', description: '未选中占位。' },\n  { name: 'label', type: 'string', default: '—', description: '上方标签。' },\n  { name: 'disabled', type: 'boolean', default: 'false', description: '禁用。' } ]\n'''", imports="import { ref } from 'vue'\nconst region = ref('hkg')\n\n")

# ---------------- Checkbox / Switch ----------------
page('checkbox', 'Checkbox 复选框', '布尔复选项，勾选动画与焦点环线跟随品牌色。', [
    ex('状态', '''      <div class="flex flex-wrap items-center gap-6">
        <Checkbox v-model="checked" label="跨可用区冗余" />
        <Checkbox :model-value="true" disabled label="已锁定策略" />
        <Checkbox v-model="checked" disabled label="禁用未选" />
      </div>'''),
], "'''\n[ { name: 'model-value', type: 'boolean', default: 'false', description: 'v-model 勾选态。' },\n  { name: 'label', type: 'string', default: '—', description: '关联文本。' },\n  { name: 'disabled', type: 'boolean', default: 'false', description: '禁用。' } ]\n'''", imports="import { ref } from 'vue'\nconst checked = ref(true)\n\n")

page('switch', 'Switch 开关', '即时生效的切换开关，适合配置项的启停控制。', [
    ex('尺寸与状态', '''      <div class="flex flex-wrap items-center gap-6">
        <Switch v-model="on" size="sm" label="紧凑开关" />
        <Switch v-model="on" label="标准开关" />
        <Switch v-model="on" size="lg" label="宽松开关" />
        <Switch :model-value="true" disabled label="强制开启" />
      </div>'''),
], "'''\n[ { name: 'model-value', type: 'boolean', default: 'false', description: 'v-model 开启态。' },\n  { name: 'size', type: \"'sm' | 'md' | 'lg'\", default: 'md', description: '轨道尺寸。' },\n  { name: 'label', type: 'string', default: '—', description: '关联文本。' },\n  { name: 'disabled', type: 'boolean', default: 'false', description: '禁用。' } ]\n'''", imports="import { ref } from 'vue'\nconst on = ref(true)\n\n")

# ---------------- RadioGroup ----------------
page('radio-group', 'RadioGroup 单选组', '带描述文本的选项组，支持纵向与横向排布。', [
    ex('调度策略选择', '''      <RadioGroup v-model="mode" label="调度模式" :options="[
        { label: '自动就近接入', value: 'auto', description: '按实时网络质量选择最优边缘节点' },
        { label: '固定地域锁定', value: 'pinned', description: '始终使用指定地域节点' },
        { label: '自定义权重', value: 'custom', disabled: true }
      ]" />''', 'description 渲染在选项下方，disabled 项灰化。'),
], "'''\n[ { name: 'model-value', type: 'string', default: '—', description: 'v-model 选中值。' },\n  { name: 'options', type: '{ label, value, description?, disabled? }[]', default: '—', description: '选项列表。' },\n  { name: 'label', type: 'string', default: '—', description: '组标签。' },\n  { name: 'orientation', type: \"'horizontal' | 'vertical'\", default: 'vertical', description: '排布方向。' },\n  { name: 'disabled', type: 'boolean', default: 'false', description: '整组禁用。' } ]\n'''", imports="import { ref } from 'vue'\nconst mode = ref('auto')\n\n")

# ---------------- Slider / Rating ----------------
page('slider', 'Slider 滑块', '单值或区间滑动输入，键盘方向键可调，焦点光环清晰。', [
    ex('单值与区间', '''      <div class="space-y-5 max-w-md">
        <div>
          <Label>带宽上限 · {{ cap }}%</Label>
          <Slider v-model="cap" :min="0" :max="100" class="mt-3 pr-2" />
        </div>
        <div>
          <Label>延迟区间 · {{ range[0] }}–{{ range[1] }} ms</Label>
          <Slider v-model="range" :min="10" :max="200" class="mt-3 pr-2" />
        </div>
      </div>''', 'modelValue 传数组即进入双柄区间模式。'),
], "'''\n[ { name: 'model-value', type: 'number | number[]', default: '0', description: 'v-model；数组为区间模式。' },\n  { name: 'min / max / step', type: 'number', default: '0 / 100 / 1', description: '数值范围。' },\n  { name: 'orientation', type: \"'horizontal' | 'vertical'\", default: 'horizontal', description: '方向。' },\n  { name: 'disabled', type: 'boolean', default: 'false', description: '禁用。' } ]\n'''", imports="import { ref } from 'vue'\nconst cap = ref(64)\nconst range = ref([40, 120])\n\n")

page('rating', 'Rating 评分', '星级评分，支持只读展示与语义色。', [
    ex('交互与只读', '''      <div class="flex items-center gap-6">
        <div class="space-y-1">
          <Rating v-model="val" />
          <p class="text-xs text-slate-400">当前 {{ val }} / 5</p>
        </div>
        <div class="space-y-1">
          <Rating :model-value="4" color="warning" readonly />
          <p class="text-xs text-slate-400">客户满意度（只读）</p>
        </div>
      </div>''', 'hover 实时预览，点击锁定。'),
], "'''\n[ { name: 'model-value', type: 'number', default: '0', description: 'v-model 分值。' },\n  { name: 'length', type: 'number', default: '5', description: '星数。' },\n  { name: 'size', type: \"'sm' | 'md' | 'lg'\", default: 'md', description: '星标尺寸。' },\n  { name: 'color', type: \"'primary' | 'warning' | 'neutral'\", default: 'primary', description: '填充色。' },\n  { name: 'readonly', type: 'boolean', default: 'false', description: '只读展示。' } ]\n'''", imports="import { ref } from 'vue'\nconst val = ref(4)\n\n")

# ---------------- Combobox / NumberField / PinInput / Editable ----------------
page('combobox', 'Combobox 组合框', '可搜索的下拉选择，支持分组、多选与清除按钮。', [
    ex('分组搜索', '''      <Combobox v-model="value" :options="options" label="边缘节点" placeholder="搜索节点…" />
      <p class="mt-3 text-xs text-slate-400">当前值：{{ value }}</p>''', '输入即过滤，分组标题自动聚合。'),
], "'''\n[ { name: 'model-value', type: 'string | string[]', default: '—', description: 'v-model；multiple 时为数组。' },\n  { name: 'options', type: '{ label, value, group?, disabled? }[]', default: '—', description: '选项数据。' },\n  { name: 'multiple', type: 'boolean', default: 'false', description: '多选模式。' },\n  { name: 'placeholder / label / emptyText', type: 'string', default: '—', description: '占位与文案。' },\n  { name: 'noClear', type: 'boolean', default: 'false', description: '隐藏清除按钮。' } ]\n'''", imports="import { ref } from 'vue'\nconst value = ref('hkg-edge-01')\nconst options = [\n  { label: 'hkg-edge-01', value: 'hkg-edge-01', group: '亚太' },\n  { label: 'nrt-edge-02', value: 'nrt-edge-02', group: '亚太' },\n  { label: 'sjc-edge-03', value: 'sjc-edge-03', group: '美洲' },\n  { label: 'fra-edge-04', value: 'fra-edge-04', group: '欧洲', disabled: true }\n]\n\n")

page('number-field', 'NumberField 数字输入', '带步进按钮的数字输入，支持边界与只读模式。', [
    ex('基础与尺寸', '''      <div class="grid gap-5 sm:grid-cols-2 max-w-lg">
        <NumberField v-model="n1" label="节点数量" :min="1" :max="99" />
        <NumberField v-model="n2" label="批量步长" :min="0" :max="1000" :step="10" size="lg" />
      </div>''', '左右步进按钮，超界自动夹取。'),
], "'''\n[ { name: 'model-value', type: 'number', default: '0', description: 'v-model 数值。' },\n  { name: 'min / max / step', type: 'number', default: '—', description: '边界与步长。' },\n  { name: 'size', type: \"'sm' | 'md' | 'lg'\", default: 'md', description: '高度。' },\n  { name: 'label', type: 'string', default: '—', description: '上方标签。' },\n  { name: 'disabled / readonly', type: 'boolean', default: 'false', description: '状态控制。' } ]\n'''", imports="import { ref } from 'vue'\nconst n1 = ref(12)\nconst n2 = ref(50)\n\n")

page('pin-input', 'PinInput 验证码', '分段验证码 / OTP 输入，自动跳格与退格回退。', [
    ex('OTP 与掩码', '''      <div class="flex flex-wrap items-end gap-8">
        <div class="space-y-2">
          <Label>短信验证码 (OTP)</Label>
          <PinInput v-model="otp" otp />
        </div>
        <div class="space-y-2">
          <Label>密钥掩码</Label>
          <PinInput v-model="masked" :length="4" mask />
        </div>
      </div>
      <p class="mt-3 text-xs text-slate-400">OTP 值：{{ otp.join('') || '—' }}</p>''', 'otp 模式 6 位，mask 隐藏输入。'),
], "'''\n[ { name: 'model-value', type: 'string[]', default: '[]', description: 'v-model 分段字符数组。' },\n  { name: 'length', type: 'number', default: 'otp ? 6 : 4', description: '段数。' },\n  { name: 'otp', type: 'boolean', default: 'false', description: 'OTP 模式（自动跳格、粘贴填充）。' },\n  { name: 'mask', type: 'boolean', default: 'false', description: '掩码显示。' },\n  { name: 'type', type: \"'text' | 'number'\", default: 'number', description: '输入字符集。' } ]\n'''", imports="import { ref } from 'vue'\nconst otp = ref<string[]>([])\nconst masked = ref<string[]>([])\n\n")

page('editable', 'Editable 行内编辑', '点击即改的文本：虚线预览、进入编辑自动全选、Enter 提交 Esc 取消。', [
    ex('基础', '''      <div class="flex items-center gap-3">
        <Editable v-model="name" placeholder="点击编辑集群名称" />
        <Badge variant="outline" color="neutral" size="xs">集群别名</Badge>
      </div>
      <p class="mt-3 text-xs text-slate-400">当前值：{{ name || '（空）' }}</p>''', '失焦或取消恢复原值。'),
], "'''\n[ { name: 'model-value', type: 'string', default: '—', description: 'v-model 文本。' },\n  { name: 'placeholder', type: 'string', default: '点击编辑…', description: '空值占位。' },\n  { name: 'disabled / readonly', type: 'boolean', default: 'false', description: '禁止编辑。' } ]\n'''", imports="import { ref } from 'vue'\nconst name = ref('gateway-prod-east')\n\n")

# ---------------- Toggle / ToggleGroup / Label ----------------
page('toggle', 'Toggle / ToggleGroup', '按压态工具按钮：单个开关与互斥分组两种形态。', [
    ex('Toggle 按钮组', '''      <div class="flex items-center gap-2">
        <Toggle v-model="left"><AlignLeft class="h-4 w-4" /></Toggle>
        <Toggle v-model="center"><AlignCenter class="h-4 w-4" /></Toggle>
        <Toggle v-model="right"><AlignRight class="h-4 w-4" /></Toggle>
        <Separator orientation="vertical" class="mx-1 h-6" />
        <Toggle v-model="bold" size="sm"><Bold class="h-3.5 w-3.5" /></Toggle>
        <Toggle v-model="italic" size="sm"><Italic class="h-3.5 w-3.5" /></Toggle>
      </div>''', 'pressed 状态反色，适合富文本工具栏。'),
    ex('ToggleGroup 互斥分组', '''      <ToggleGroup v-model="view" :options="[
        { label: '网格', value: 'grid' },
        { label: '列表', value: 'list' },
        { label: '拓扑', value: 'topo' }
      ]" />''', '单值互斥，选中项浮起白底。'),
], "'''\n[ { name: 'model-value (Toggle)', type: 'boolean', default: 'false', description: '按压态。' },\n  { name: 'size', type: \"'sm' | 'md' | 'lg'\", default: 'md', description: '方形按钮尺寸。' },\n  { name: 'model-value (ToggleGroup)', type: 'string', default: '—', description: '选中项 value。' },\n  { name: 'options', type: '{ label, value, icon?, disabled? }[]', default: '—', description: '分组选项。' } ]\n'''", imports="import { ref } from 'vue'\nimport { AlignLeft, AlignCenter, AlignRight, Bold, Italic } from '@recloud/ui/icons'\nconst left = ref(true)\nconst center = ref(false)\nconst right = ref(false)\nconst bold = ref(false)\nconst italic = ref(false)\nconst view = ref('grid')\n\n")

page('label', 'Label 标签', '与表单控件关联的无障碍标签，required 自动追加红色星号。', [
    ex('基础', '''      <div class="flex items-center gap-3 max-w-xs">
        <Label for="api-key" required>API Key</Label>
        <Input id="api-key" v-model="key" class="flex-1" placeholder="rc_live_…" />
      </div>''', 'for 绑定控件 id，点击聚焦。'),
], "'''\n[ { name: 'for', type: 'string', default: '—', description: '关联控件 id。' },\n  { name: 'required', type: 'boolean', default: 'false', description: '显示必填星号。' } ]\n'''", imports="import { ref } from 'vue'\nconst key = ref('')\n\n")

# ---------------- DataTable / Progress / Skeleton / EmptyState / Separator / Pagination ----------------
page('data-table', 'DataTable 数据表', '轻量数据表：列对齐、悬浮行与按列插槽富渲染。', [
    ex('插槽单元格', '''      <DataTable :columns="columns" :rows="rows">
        <template #cell-status="{ value }">
          <Badge :color="value === '在线' ? 'success' : value === '维护' ? 'warning' : 'neutral'" variant="soft" dot size="xs">{{ value }}</Badge>
        </template>
        <template #cell-actions>
          <Button size="xs" variant="ghost" color="neutral">管理</Button>
        </template>
      </DataTable>''', 'slot: true 的列查找 #cell-<key> 作用域插槽。'),
], "'''\n[ { name: 'columns', type: '{ key, label, width?, align?, slot? }[]', default: '—', description: '列定义。' },\n  { name: 'rows', type: 'Record<string, any>[]', default: '—', description: '行数据。' },\n  { name: 'hoverable / divide', type: 'boolean', default: 'true', description: '悬浮高亮与行分割线。' },\n  { name: 'emptyText', type: 'string', default: '暂无数据', description: '空态文案。' },\n  { name: 'cell-<key>', type: 'slot', default: '—', description: '作用域插槽 { row, value }。' } ]\n'''", imports="import { ref } from 'vue'\nconst columns = [\n  { key: 'name', label: '节点' },\n  { key: 'region', label: '地域' },\n  { key: 'status', label: '状态', slot: true },\n  { key: 'latency', label: '延迟', align: 'right' as const },\n  { key: 'actions', label: '操作', align: 'right' as const, slot: true }\n]\nconst rows = ref([\n  { name: 'hkg-edge-01', region: '中国香港', status: '在线', latency: '8ms' },\n  { name: 'nrt-edge-02', region: '日本东京', status: '在线', latency: '14ms' },\n  { name: 'fra-edge-04', region: '德国法兰克福', status: '维护', latency: '32ms' },\n  { name: 'sjc-edge-03', region: '美国硅谷', status: '离线', latency: '—' }\n])\n\n")

page('progress', 'Progress 进度条', '任务进度与百分比，带标签行与语义色。', [
    ex('色彩与尺寸', '''      <div class="space-y-4 max-w-md">
        <Progress :value="72" label="节点同步进度" show-value color="primary" />
        <Progress :value="100" label="健康检查" color="success" size="sm" />
        <Progress :value="34" label="存储用量" color="warning" size="sm" />
        <Progress :value="12" label="异常实例" color="error" size="sm" />
      </div>''', 'aria=progressbar 无障碍语义。'),
], "'''\n[ { name: 'value / max', type: 'number', default: '0 / 100', description: '当前值与上限。' },\n  { name: 'label', type: 'string', default: '—', description: '左侧标签。' },\n  { name: 'showValue', type: 'boolean', default: 'false', description: '右侧百分比。' },\n  { name: 'color', type: \"'primary' | 'success' | 'warning' | 'error' | 'neutral'\", default: 'primary', description: '进度条色。' },\n  { name: 'size', type: \"'sm' | 'md' | 'lg'\", default: 'md', description: '轨道高度。' } ]\n'''")

page('skeleton', 'Skeleton 骨架屏', '内容加载占位，脉冲动画节奏统一。', [
    ex('占位组合', '''      <div class="grid grid-cols-3 gap-3 max-w-md">
        <Skeleton height="4.5rem" />
        <Skeleton height="4.5rem" />
        <Skeleton height="4.5rem" />
      </div>
      <div class="mt-4 space-y-2 max-w-md">
        <Skeleton width="60%" height="1rem" />
        <Skeleton width="100%" height="0.75rem" />
        <Skeleton width="80%" height="0.75rem" />
      </div>''', 'width/height 接受任意 CSS 长度。'),
], "'''\n[ { name: 'width / height', type: 'string', default: '100% / auto', description: 'CSS 尺寸。' },\n  { name: 'class', type: 'string', default: '—', description: '追加圆角等覆写。' } ]\n'''")

page('empty-state', 'EmptyState 空状态', '空数据页面的引导容器：图标、标题、描述与操作区。', [
    ex('基础', '''      <EmptyState title="暂无待处理告警" description="新的网络事件和可用性告警将在这里出现。" class="py-7">
        <template #icon><BrandLogo :size="20" /></template>
        <Button size="sm" variant="outline" color="neutral">查看事件中心</Button>
      </EmptyState>''', 'icon 插槽与默认操作区插槽。'),
], "'''\n[ { name: 'title', type: 'string', required: true, description: '主标题。' },\n  { name: 'description', type: 'string', default: '—', description: '辅助说明。' },\n  { name: 'icon', type: 'slot', default: '—', description: '顶部图标区。' },\n  { name: 'default', type: 'slot', default: '—', description: '底部操作按钮。' } ]\n'''", imports="import { BrandLogo } from '@recloud/ui/icons'\n\n")

page('separator', 'Separator 分隔线', '水平与垂直方向分割线，自动适配主题。', [
    ex('方向', '''      <div class="space-y-4 max-w-md">
        <div class="space-y-1">
          <p class="text-sm text-slate-700 dark:text-slate-300">基础信息</p>
          <Separator />
          <p class="text-sm text-slate-500 dark:text-slate-400">分隔线自动适配深浅色主题。</p>
        </div>
        <div class="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          <span>可用性 99.99%</span>
          <Separator orientation="vertical" class="h-5" />
          <span>延迟 12ms</span>
          <Separator orientation="vertical" class="h-5" />
          <span>丢包 0%</span>
        </div>
      </div>'''),
], "'''\n[ { name: 'orientation', type: \"'horizontal' | 'vertical'\", default: 'horizontal', description: '方向。' },\n  { name: 'decorative', type: 'boolean', default: 'true', description: '纯装饰（aria-hidden）。' } ]\n'''")

page('pagination', 'Pagination 分页', '页码折叠窗口 + 前后翻页 + 汇总文案，v-model 双向绑定当前页。', [
    ex('基础', '''      <Pagination v-model="page" :total="128" :page-size="10" />
      <p class="mt-3 text-xs text-slate-400">第 {{ page }} / 13 页</p>''', 'siblingCount 控制当前页两侧暴露页码数。'),
], "'''\n[ { name: 'model-value', type: 'number', default: '1', description: 'v-model 当前页。' },\n  { name: 'total', type: 'number', default: '0', description: '条目总数。' },\n  { name: 'page-size', type: 'number', default: '10', description: '每页条数。' },\n  { name: 'siblingCount', type: 'number', default: '1', description: '当前页两侧页码数。' },\n  { name: 'showSummary', type: 'boolean', default: 'true', description: '底部汇总文案。' } ]\n'''", imports="import { ref } from 'vue'\nconst page = ref(3)\n\n")

print('batch 1 done:', len(os.listdir(DIR)), 'pages')
