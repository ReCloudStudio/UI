<template>
  <div class="space-y-10">
    <PageHeader title="AlertDialog 警示对话框" description="破坏性操作的强确认流：无法点击遮罩关闭，取消 / 确认双按钮。" />

    <ComponentExample title="终止实例" description="destructive 将确认按钮转为红色。" :code="rcCode0">
      <AlertDialog
        title="终止实例 hkg-edge-07？"
        description="该操作不可撤销，实例上的所有活跃连接将立即断开。"
        action-text="确认终止"
        cancel-text="再想想"
        destructive
      >
        <template #trigger>
          <Button variant="soft" color="error">危险确认 (Alert Dialog)</Button>
        </template>
      </AlertDialog>
    </ComponentExample>

    <ApiTable :rows="apiRows" />

    <DocPageNav name="alert-dialog" />
  </div>
</template>

<script setup lang="ts">
const rcCode0 = `<AlertDialog
  title="终止实例 hkg-edge-07？"
  description="该操作不可撤销，实例上的所有活跃连接将立即断开。"
  action-text="确认终止"
  cancel-text="再想想"
  destructive
>
  <template #trigger>
    <Button variant="soft" color="error">危险确认 (Alert Dialog)</Button>
  </template>
</AlertDialog>`


const apiRows = [ { name: 'open', type: 'boolean', default: '—', description: 'v-model:open。' },
  { name: 'title / description', type: 'string', default: '—', description: '确认文案。' },
  { name: 'action-text / cancel-text', type: 'string', default: '确认 / 取消', description: '按钮文案。' },
  { name: 'destructive', type: 'boolean', default: 'false', description: '危险操作红色样式。' } ]
</script>
