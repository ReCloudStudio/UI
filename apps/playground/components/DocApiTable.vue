<template>
  <section class="space-y-3">
    <h3 class="text-base font-semibold tracking-tight text-slate-900 dark:text-white">API 参考</h3>
    <div class="overflow-x-auto rounded-xl ring-1 ring-inset ring-slate-200/80 dark:ring-slate-800/80 bg-white dark:bg-[#0B1220]">
      <table class="w-full text-left text-sm">
        <thead>
          <tr class="border-b border-slate-200/80 dark:border-slate-800/80 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <th class="px-4 py-2.5">属性</th>
            <th class="px-4 py-2.5">类型</th>
            <th class="px-4 py-2.5">默认值</th>
            <th class="px-4 py-2.5">说明</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-800/70">
          <tr v-for="row in props.rows" :key="row.name" class="align-top">
            <td class="px-4 py-2.5 font-mono text-[13px] font-medium text-[#2563EB] dark:text-[#70ACFE] whitespace-nowrap">{{ row.name }}</td>
            <td class="px-4 py-2.5 font-mono text-[12px] text-slate-600 dark:text-slate-300">{{ row.type }}</td>
            <td class="px-4 py-2.5 font-mono text-[12px] text-slate-500 dark:text-slate-400 whitespace-nowrap">{{ row.default || '—' }}</td>
            <td class="px-4 py-2.5 text-[13px] leading-6 text-slate-600 dark:text-slate-300">{{ row.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup lang="ts">
export interface DocApiRow {
  name: string
  type: string
  default?: string
  description: string
}

export interface DocApiTableProps {
  rows: DocApiRow[]
}

const props = withDefaults(defineProps<DocApiTableProps>(), {})
</script>
