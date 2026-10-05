<template>
  <div class="space-y-10">
    <PageHeader title="Sheet 抽屉面板" description="用于资源详情、配置编辑和辅助操作的可访问模态侧栏，支持四个展开方向。" />

    <ComponentExample title="实例详情" description="默认从右侧展开；使用 header、默认和 footer 插槽构建详情工作流。" :code="rcCode0">
      <Button @click="open = true">查看实例详情</Button>
      <Sheet v-model:open="open" title="hkg-edge-07" description="运行中的边缘节点 · 香港" size="30rem">
        <div class="space-y-5">
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div class="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60"><p class="text-xs text-slate-500">公网地址</p><p class="mt-1 font-mono text-slate-800 dark:text-slate-100">203.0.113.42</p></div>
            <div class="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60"><p class="text-xs text-slate-500">运行时间</p><p class="mt-1 text-slate-800 dark:text-slate-100">14 天 8 小时</p></div>
          </div>
          <Banner color="success" title="健康检查正常">最近一次心跳：刚刚</Banner>
        </div>
        <template #footer>
          <div class="flex justify-end gap-2">
            <Button variant="outline" color="neutral" @click="open = false">关闭</Button>
            <Button @click="open = false">保存配置</Button>
          </div>
        </template>
      </Sheet>
    </ComponentExample>

    <ApiTable :rows="apiRows" />
    <DocPageNav name="sheet" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)

const rcCode0 = `<Button @click="open = true">查看实例详情</Button>
<Sheet
  v-model:open="open"
  title="hkg-edge-07"
  description="运行中的边缘节点 · 香港"
  side="right"
  size="30rem"
>
  <InstanceDetails />
  <template #footer>
    <Button @click="open = false">保存配置</Button>
  </template>
</Sheet>`

const apiRows = [
  { name: 'v-model:open', type: 'boolean', default: 'false', description: '受控展开状态。' },
  { name: 'side', type: "'left' | 'right' | 'top' | 'bottom'", default: "'right'", description: '抽屉展开方向。' },
  { name: 'size', type: 'string', default: "'28rem'", description: '左右抽屉的宽度，或上下抽屉的高度。' },
  { name: 'title / description', type: 'string', default: '—', description: '默认头部文案。' },
  { name: 'trigger / header / footer', type: 'slot', default: '—', description: '触发器和结构区域插槽。' }
]
</script>
