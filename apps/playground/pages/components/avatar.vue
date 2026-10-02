<template>
  <div class="space-y-10">
    <DocPageHeader title="Avatar 头像" description="图像、降级文本与在线状态四态圆点，覆盖团队成员与操作人头像场景。" />

    <DocExample title="尺寸与状态" description="xs 到 xl 五档，online / busy / away / offline 状态点自动带描边。" :code="rcCode0">
      <div class="demo-grid">
        <Avatar fallback="RC" size="xs" />
        <Avatar fallback="RC" size="sm" status="online" />
        <Avatar fallback="ED" size="md" status="busy" />
        <Avatar fallback="OP" size="lg" status="away" />
        <Avatar fallback="GU" size="xl" status="offline" class="bg-slate-100 text-slate-500 dark:bg-slate-800" />
      </div>
    </DocExample>

    <DocExample title="团队行场景" description="与 Badge 组合的标准运维人员行。" :code="rcCode1">
      <div class="flex items-center justify-between gap-4 max-w-sm">
        <div class="flex items-center gap-3">
          <Avatar fallback="RS" size="lg" status="online" class="bg-blue-100 text-[#1E63CE] dark:bg-blue-950/60 dark:text-[#70ACFE]" />
          <div>
            <div class="text-sm font-semibold text-slate-900 dark:text-white">ReCloud Edge</div>
            <div class="text-sm text-slate-500 dark:text-slate-400">CN-HK1 · 128 个节点在线</div>
          </div>
        </div>
        <Badge color="success" variant="soft" dot>健康</Badge>
      </div>
    </DocExample>

    <DocApiTable :rows="apiRows" />

    <DocPageNav name="avatar" />
  </div>
</template>

<script setup lang="ts">
const rcCode0 = `<div class="demo-grid">
  <Avatar fallback="RC" size="xs" />
  <Avatar fallback="RC" size="sm" status="online" />
  <Avatar fallback="ED" size="md" status="busy" />
  <Avatar fallback="OP" size="lg" status="away" />
  <Avatar fallback="GU" size="xl" status="offline" class="bg-slate-100 text-slate-500 dark:bg-slate-800" />
</div>`

const rcCode1 = `<div class="flex items-center justify-between gap-4 max-w-sm">
  <div class="flex items-center gap-3">
    <Avatar fallback="RS" size="lg" status="online" class="bg-blue-100 text-[#1E63CE] dark:bg-blue-950/60 dark:text-[#70ACFE]" />
    <div>
      <div class="text-sm font-semibold text-slate-900 dark:text-white">ReCloud Edge</div>
      <div class="text-sm text-slate-500 dark:text-slate-400">CN-HK1 · 128 个节点在线</div>
    </div>
  </div>
  <Badge color="success" variant="soft" dot>健康</Badge>
</div>`


const apiRows = [ { name: 'src', type: 'string', default: '—', description: '图像地址，加载失败自动降级。' },
  { name: 'fallback', type: 'string', default: '—', description: '降级显示的首字母文本。' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: 'md', description: '直径 24–56px。' },
  { name: 'status', type: "'online' | 'offline' | 'busy' | 'away'", default: '—', description: '右下角状态圆点。' } ]
</script>
