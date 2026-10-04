<template>
  <div class="space-y-10">
    <DocPageHeader title="TreeView 树形视图" description="用于权限继承、云资源拓扑与目录管理的层级浏览控件。" />
    <DocExample title="资源目录" description="可通过鼠标或键盘展开节点；方向键浏览可见节点，Enter 选中当前项。" :code="rcCode0">
      <TreeView v-model="selectedResource" v-model:expanded-ids="expandedResources" :nodes="resources" label="云资源目录" class="max-w-md" />
      <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">当前资源：{{ selectedResource || '未选择' }}</p>
    </DocExample>
    <DocExample title="权限范围" description="勾选父节点会级联选择子节点；半选状态反映部分已授权的目录。" :code="rcCode1">
      <TreeView v-model:checked-ids="grants" :nodes="permissions" checkable :default-expanded-ids="['project', 'production']" label="项目权限" class="max-w-md" />
      <p class="mt-3 text-xs text-slate-500 dark:text-slate-400">授权项：{{ grants.length }}</p>
    </DocExample>
    <DocApiTable :rows="apiRows" />
    <DocPageNav name="tree-view" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const selectedResource = ref('api')
const expandedResources = ref(['production', 'services'])
const grants = ref(['logs-read'])
const resources = [
  { id: 'production', label: '生产环境', children: [
    { id: 'services', label: '服务', children: [{ id: 'api', label: 'gateway-api' }, { id: 'worker', label: 'event-worker' }] },
    { id: 'storage', label: '对象存储' }
  ] },
  { id: 'staging', label: '预发布环境', children: [{ id: 'preview', label: 'preview-api' }] }
]
const permissions = [{ id: 'project', label: 'recloud-console', children: [{ id: 'production', label: '生产环境', children: [{ id: 'logs-read', label: '查看日志' }, { id: 'deploy', label: '部署服务' }] }, { id: 'billing', label: '账单管理', disabled: true }] }]
const rcCode0 = `<TreeView
  v-model="selectedResource"
  v-model:expanded-ids="expandedResources"
  :nodes="resources"
  label="云资源目录"
/>`
const rcCode1 = `<TreeView
  v-model:checked-ids="grants"
  :nodes="permissions"
  :default-expanded-ids="['project', 'production']"
  checkable
  label="项目权限"
/>`
const apiRows = [
  { name: 'nodes', type: 'TreeNode[]', default: '—', description: '节点数据，节点包含 id、label、children? 和 disabled?。' },
  { name: 'v-model', type: 'string', default: '—', description: '当前选中节点的 id。' },
  { name: 'v-model:expanded-ids', type: 'string[]', default: '—', description: '受控的展开节点集合。' },
  { name: 'default-expanded-ids', type: 'string[]', default: '[]', description: '非受控模式下的初始展开节点。' },
  { name: 'checkable / v-model:checked-ids', type: 'boolean / string[]', default: 'false / []', description: '启用勾选并受控管理已授权节点。' },
  { name: 'cascade', type: 'boolean', default: 'true', description: '勾选父节点时是否级联子节点。' },
  { name: 'select / toggle / check', type: 'event', default: '—', description: '节点选中、展开与勾选变化事件。' }
]
</script>
