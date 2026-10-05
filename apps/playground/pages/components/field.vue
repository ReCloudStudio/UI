<template>
  <div class="space-y-10">
    <PageHeader title="Field / Form 表单布局" description="Field 将标签、说明与错误信息关联到控件；Form 提供一致的字段垂直间距。" />

    <ComponentExample title="关联输入框" description="传入 id 后，Field 的 label 与说明文本会自动关联到插槽内控件。" :code="rcCode0">
      <Form class="max-w-md">
        <Field id="cluster-name" label="集群名称" hint="仅可使用小写字母、数字和连字符" required>
          <template #default="field">
            <input
              :id="field.id"
              v-model="clusterName"
              :aria-describedby="field.describedby"
              :aria-invalid="field.invalid || undefined"
              class="h-10 w-full rounded-lg bg-white px-3.5 text-sm text-slate-900 ring-1 ring-inset ring-slate-300 outline-none focus:ring-2 focus:ring-[#2563EB] dark:bg-[#0F172A] dark:text-slate-100 dark:ring-slate-700 dark:focus:ring-[#70ACFE]"
            >
          </template>
        </Field>
        <Input v-model="endpoint" label="API 端点" error="该端点未通过 TLS 证书校验" required />
      </Form>
    </ComponentExample>

    <ApiTable :rows="apiRows" />
    <DocPageNav name="field" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const clusterName = ref('production-cn')
const endpoint = ref('edge-http://insecure')

const rcCode0 = `<Form class="max-w-md">
  <Field id="cluster-name" label="集群名称" hint="仅可使用小写字母、数字和连字符" required>
    <template #default="field">
      <input :id="field.id" :aria-describedby="field.describedby" />
    </template>
  </Field>
  <Input v-model="endpoint" label="API 端点" error="该端点未通过 TLS 证书校验" required />
</Form>`

const apiRows = [
  { name: 'id', type: 'string', default: '自动生成', description: '控件关联 ID；显式传入可确保稳定 SSR 输出。' },
  { name: 'label / hint / error', type: 'string', default: '—', description: '标签、说明和错误文案；错误优先于说明。' },
  { name: 'required', type: 'boolean', default: 'false', description: '展示必填标记；原生控件还应绑定 required。' },
  { name: 'default slot', type: '{ id, describedby, invalid }', default: '—', description: '将字段语义传递给任意控件。' }
]
</script>
