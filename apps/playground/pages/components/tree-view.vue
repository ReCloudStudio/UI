<template>
  <div class="space-y-10">
    <DocPageHeader
      title="TreeView 树形视图"
      description="面向云资源拓扑、文件树及细粒度权限的多层级树控件，支持异步懒加载、多选、图标插槽、拖拽重排与清晰的选中高亮提示。"
    />

    <!-- Example 1: Async loading + Icon slots + v-model:expanded + Highlighting -->
    <DocExample
      title="资源拓扑与选中高亮"
      description="使用 highlight-variant 配置选中的视觉高亮风格（subtle / solid / bar），配合状态徽标提供即时反馈。"
      :code="asyncCode"
    >
      <div class="space-y-4">
        <div class="flex flex-wrap items-center gap-2">
          <div class="flex items-center gap-1.5 rounded-lg border border-[var(--border)] p-1 text-xs">
            <span class="px-2 text-[var(--muted-foreground)]">高亮风格:</span>
            <button
              v-for="v in highlightVariants"
              :key="v"
              type="button"
              :class="[
                'rounded px-2 py-1 font-medium transition-colors',
                activeVariant === v
                  ? 'bg-[var(--primary)] text-[var(--primary-foreground)]'
                  : 'text-[var(--muted-foreground)] hover:bg-[var(--muted)] hover:text-[var(--foreground)]'
              ]"
              @click="activeVariant = v"
            >
              {{ v }}
            </button>
          </div>

          <Button
            size="sm"
            variant="outline"
            color="neutral"
            @click="expandedResources = ['prod-cluster', 'k8s-pods']"
          >
            展开核心服务
          </Button>
          <Button
            size="sm"
            variant="outline"
            color="neutral"
            @click="expandedResources = []"
          >
            折叠全部
          </Button>
        </div>

        <TreeView
          v-model="selectedResource"
          v-model:expanded="expandedResources"
          :nodes="asyncNodes"
          :highlight-variant="activeVariant"
          :load-children="mockFetchChildren"
          label="Kubernetes 资源拓扑"
          class="max-w-md"
        >
          <template #icon="{ node }">
            <Server v-if="node.id.includes('cluster')" class="size-4 text-[var(--rc-blue-500)]" />
            <Boxes v-else-if="node.id.includes('pods')" class="size-4 text-[var(--rc-emerald-500)]" />
            <Box v-else-if="node.id.includes('pod-')" class="size-4 text-[var(--muted-foreground)]" />
            <HardDrive v-else class="size-4 text-[var(--rc-amber-500)]" />
          </template>
        </TreeView>

        <p class="text-xs text-[var(--muted-foreground)]">
          当前选中：<span class="font-mono font-medium text-[var(--primary)]">{{ selectedResource || '未选择' }}</span>；
          展开节点：<span class="font-mono text-[var(--foreground)]">{{ expandedResources.join(', ') || '无' }}</span>
        </p>
      </div>
    </DocExample>

    <!-- Example 2: Multi-select mode -->
    <DocExample
      title="多选模式 (Multiple)"
      description="开启 multiple 支持复选节点集合，通过 v-model:selected-ids 受控管理已选节点集合。"
      :code="multiSelectCode"
    >
      <div class="space-y-3">
        <TreeView
          v-model:selected-ids="selectedPods"
          multiple
          highlight-variant="subtle"
          :nodes="multiNodes"
          :default-expanded-ids="['workloads']"
          label="节点多选"
          class="max-w-md"
        />
        <div class="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
          <span>已选节点数：{{ selectedPods.length }}</span>
          <span class="font-mono">{{ selectedPods.join(', ') || '未选择' }}</span>
        </div>
      </div>
    </DocExample>

    <!-- Example 3: Drag & Drop ordering -->
    <DocExample
      title="拖拽排序与重排 (Draggable)"
      description="开启 draggable 允许在树内移动节点层级或顺序；触发 @drop 事件返回拖拽源、目标与插入位置。"
      :code="dragCode"
    >
      <div class="space-y-3">
        <TreeView
          :nodes="reorderNodes"
          draggable
          :default-expanded-ids="['services']"
          label="服务执行流水线"
          class="max-w-md"
          @drop="onDrop"
        />
        <p v-if="lastDropInfo" class="rounded-md bg-[var(--muted)] p-2 text-xs font-mono text-[var(--foreground)]">
          {{ lastDropInfo }}
        </p>
      </div>
    </DocExample>

    <!-- Example 4: Permissions Cascade Checkbox -->
    <DocExample
      title="权限级联复选"
      description="checkable 模式适用于细粒度访问策略分配，勾选状态自动向后代节点级联。"
      :code="rcCode1"
    >
      <TreeView
        v-model:checked-ids="grants"
        :nodes="permissions"
        checkable
        :default-expanded-ids="['project', 'production']"
        label="项目权限"
        class="max-w-md"
      />
      <p class="mt-3 text-xs text-[var(--muted-foreground)]">已授权项数量：{{ grants.length }}</p>
    </DocExample>

    <DocApiTable :rows="apiRows" />
    <DocPageNav name="tree-view" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Box, Boxes, HardDrive, Server } from '@recloudstudio/ui/icons'
import type { TreeDropEvent, TreeHighlightVariant, TreeNode } from '@recloudstudio/ui'

const highlightVariants: TreeHighlightVariant[] = ['subtle', 'solid', 'bar']
const activeVariant = ref<TreeHighlightVariant>('subtle')

const selectedResource = ref('prod-cluster')
const expandedResources = ref(['prod-cluster'])
const selectedPods = ref(['gateway', 'auth'])
const grants = ref(['logs-read'])
const lastDropInfo = ref('')

const asyncNodes = ref<TreeNode[]>([
  {
    id: 'prod-cluster',
    label: 'hk-prod-01 (集群)',
    children: [
      { id: 'k8s-pods', label: 'Pods', isLeaf: false },
      { id: 'storage-pvc', label: '持久卷 (PVC)', isLeaf: false }
    ]
  },
  {
    id: 'sg-cluster',
    label: 'sg-edge-02 (边缘节点)',
    isLeaf: false
  }
])

async function mockFetchChildren(node: TreeNode): Promise<TreeNode[]> {
  await new Promise((resolve) => setTimeout(resolve, 800))
  if (node.id === 'k8s-pods') {
    return [
      { id: 'pod-api-1', label: 'ingress-gateway-6f98d' },
      { id: 'pod-api-2', label: 'ingress-gateway-9bd32' },
      { id: 'pod-worker', label: 'async-worker-74f4b' }
    ]
  }
  if (node.id === 'storage-pvc') {
    return [
      { id: 'pvc-data', label: 'redis-stateful-volume' },
      { id: 'pvc-logs', label: 'system-audit-log-disk' }
    ]
  }
  return [
    { id: `${node.id}-sub`, label: `${node.label} 子服务` }
  ]
}

const multiNodes: TreeNode[] = [
  {
    id: 'workloads',
    label: '工作负载',
    children: [
      { id: 'gateway', label: 'API 网关服务' },
      { id: 'auth', label: '统一鉴权中心' },
      { id: 'payment', label: '支付网关核心' },
      { id: 'notification', label: '消息投递中心' }
    ]
  }
]

const reorderNodes = ref<TreeNode[]>([
  {
    id: 'services',
    label: '部署步骤',
    children: [
      { id: 'step-lint', label: '1. 代码规约检查' },
      { id: 'step-build', label: '2. 镜像构建与缓存' },
      { id: 'step-deploy', label: '3. 金丝雀灰度发布' },
      { id: 'step-verify', label: '4. 存活探针健康校验' }
    ]
  }
])

function onDrop(event: TreeDropEvent) {
  lastDropInfo.value = `拖拽 [${event.draggedNode.label}] 到 [${event.targetNode.label}] (${event.position})`

  function remove(list: TreeNode[]): TreeNode | null {
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      if (!item) continue
      if (item.id === event.draggedNode.id) {
        const [deleted] = list.splice(i, 1)
        return deleted ?? null
      }
      if (item.children) {
        const found = remove(item.children)
        if (found) return found
      }
    }
    return null
  }

  const removedNode = remove(reorderNodes.value)
  if (!removedNode) return

  function insert(list: TreeNode[], toInsert: TreeNode): boolean {
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      if (!item) continue
      if (item.id === event.targetNode.id) {
        if (event.position === 'before') {
          list.splice(i, 0, toInsert)
        } else if (event.position === 'after') {
          list.splice(i + 1, 0, toInsert)
        } else {
          item.children = item.children || []
          item.children.push(toInsert)
        }
        return true
      }
      if (item.children && insert(item.children, toInsert)) {
        return true
      }
    }
    return false
  }

  insert(reorderNodes.value, removedNode)
}

const permissions = [
  {
    id: 'project',
    label: 'recloud-console',
    children: [
      {
        id: 'production',
        label: '生产环境',
        children: [
          { id: 'logs-read', label: '查看审计日志' },
          { id: 'deploy', label: '发布与回滚服务' }
        ]
      },
      { id: 'billing', label: '企业账单', disabled: true }
    ]
  }
]

const asyncCode = `<TreeView
  v-model="selectedResource"
  v-model:expanded="expandedResources"
  highlight-variant="subtle"
  :nodes="asyncNodes"
  :load-children="fetchChildren"
>
  <template #icon="{ node }">
    <ServerIcon v-if="node.id.includes('cluster')" />
  </template>
</TreeView>`

const multiSelectCode = `<TreeView
  v-model:selected-ids="selectedPods"
  multiple
  highlight-variant="subtle"
  :nodes="nodes"
/>`

const dragCode = `<TreeView
  :nodes="nodes"
  draggable
  @drop="handleDrop"
/>`

const rcCode1 = `<TreeView
  v-model:checked-ids="grants"
  :nodes="permissions"
  checkable
  :default-expanded-ids="['project', 'production']"
/>`

const apiRows = [
  { name: 'nodes', type: 'TreeNode[]', default: '—', description: '树节点列表，支持 id、label、children、disabled、isLeaf、icon。' },
  { name: 'v-model', type: 'string', default: '—', description: '单选模式下当前选中节点的 id。' },
  { name: 'multiple', type: 'boolean', default: 'false', description: '是否启用多选模式。' },
  { name: 'v-model:selected-ids', type: 'string[]', default: '[]', description: '多选模式下受控的已选节点 ID 列表。' },
  { name: 'v-model:expanded', type: 'string[]', default: '—', description: '受控的展开节点 ID 列表（同时兼容 v-model:expanded-ids）。' },
  { name: 'default-expanded-ids', type: 'string[]', default: '[]', description: '非受控模式下的默认展开集合。' },
  { name: 'highlight-variant', type: "'subtle' | 'solid' | 'bar'", default: "'subtle'", description: '选中的高亮样式变体：subtle 为柔和浅底色与边框环、solid 为强对比主题填充、bar 为左侧重点竖条与弱底色。' },
  { name: 'load-children', type: '(node: TreeNode) => Promise<TreeNode[] | void>', default: '—', description: '异步拉取子节点的方法。设置 isLeaf: false 时展开会触发 loading 动效并调用该回调。' },
  { name: 'draggable', type: 'boolean', default: 'false', description: '启用 HTML5 拖拽重排与层级调整。' },
  { name: 'checkable / v-model:checked-ids', type: 'boolean / string[]', default: 'false / []', description: '启用复选框并受控绑定勾选项。' },
  { name: 'cascade', type: 'boolean', default: 'true', description: '勾选父节点时是否自动级联子节点。' },
  { name: '#icon / #label', type: 'slot', default: '—', description: '自定义节点前缀图标与文本标签的插槽，接收 { node, expanded, selected }。' },
  { name: 'drop', type: 'event (TreeDropEvent)', default: '—', description: '拖拽落点事件，包含 draggedNode、targetNode 与 position (before | inside | after)。' }
]
</script>
