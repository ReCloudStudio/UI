<template>
  <div class="space-y-10">
    <DocPageHeader title="FileUpload 文件上传" description="为资源、头像、镜像与配置导入提供可拖放的多文件上传工作流，状态始终由文件列表清晰呈现。" />

    <DocExample title="带进度的资源上传" description="可拖放多张图片；演示请求会显示进度，并随机模拟一次可重试的失败。" :code="rcCode0">
      <FileUpload accept="image/png,image/jpeg,image/webp" :max-size="5 * 1024 * 1024" :max-files="4" :upload="mockUpload" @reject="lastRejection = $event.reason" />
      <p v-if="lastRejection" class="text-xs text-red-600 dark:text-red-400">{{ lastRejection }}</p>
    </DocExample>

    <DocExample title="配置文件校验" description="不传 upload 时，组件作为文件选择与校验控件使用；通过 change 获取当前文件项。" :code="rcCode1">
      <FileUpload accept=".json,.yaml,.yml" :multiple="false" :max-size="256 * 1024" @change="configFiles = $event" />
      <p v-if="configFiles.length && configFiles[0]" class="text-xs text-slate-500 dark:text-slate-400">已选择 {{ configFiles[0].file.name }}</p>
    </DocExample>

    <DocApiTable :rows="apiRows" />
    <DocPageNav name="file-upload" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FileUploadHandler, FileUploadItem } from '@recloudstudio/ui'

const lastRejection = ref('')
const configFiles = ref<FileUploadItem[]>([])

const mockUpload: FileUploadHandler = ({ signal, setProgress }) => new Promise((resolve, reject) => {
  let progress = 0
  const timer = window.setInterval(() => {
    if (signal.aborted) { window.clearInterval(timer); reject(new DOMException('上传已取消', 'AbortError')); return }
    progress += 20
    setProgress(progress)
    if (progress >= 100) { window.clearInterval(timer); resolve() }
  }, 240)
})

const rcCode0 = `<FileUpload
  accept="image/png,image/jpeg,image/webp"
  :max-size="5 * 1024 * 1024"
  :max-files="4"
  :upload="uploadAsset"
  @reject="showError($event.reason)"
/>`

const rcCode1 = `<FileUpload
  accept=".json,.yaml,.yml"
  :multiple="false"
  :max-size="256 * 1024"
  @change="configFiles = $event"
/>`

const apiRows = [
  { name: 'accept / multiple', type: 'string / boolean', default: "'' / true", description: '原生 accept 规则和多文件选择开关。' },
  { name: 'maxSize / maxFiles', type: 'number', default: '—', description: '单文件字节上限与最多文件数。' },
  { name: 'upload', type: 'FileUploadHandler', default: '—', description: '异步上传处理器，接收 file、signal 和 setProgress。传入后自动上传。' },
  { name: 'change / reject', type: 'event', default: '—', description: '当前文件列表变化，或某个文件未通过校验。' },
  { name: 'upload / success / error / cancel', type: 'event', default: '—', description: '文件上传生命周期事件。' },
  { name: 'label', type: 'string', default: "'上传文件'", description: '拖放区域的无障碍标签。' }
]
</script>
