<template>
  <div :class="cn('space-y-3', props.class)">
    <input ref="input" class="sr-only" type="file" :accept="props.accept" :multiple="props.multiple" @change="onInputChange" />
    <div
      role="button"
      tabindex="0"
      :aria-label="effectiveLabel"
      :class="cn('group relative flex min-h-44 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed px-6 py-8 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 dark:focus-visible:ring-[#70ACFE] dark:focus-visible:ring-offset-[#090E17]', isDragging ? 'border-[#2563EB] bg-blue-50/70 dark:border-[#70ACFE] dark:bg-blue-950/30' : 'border-slate-300 bg-slate-50/50 hover:border-blue-400 hover:bg-blue-50/40 dark:border-slate-700 dark:bg-slate-900/30 dark:hover:border-blue-700 dark:hover:bg-blue-950/20')"
      @click="openPicker"
      @keydown.enter.prevent="openPicker"
      @keydown.space.prevent="openPicker"
      @dragenter.prevent="isDragging = true"
      @dragover.prevent="isDragging = true"
      @dragleave.prevent="isDragging = false"
      @drop.prevent="onDrop"
    >
      <div class="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#2563EB] shadow-xs ring-1 ring-slate-200 transition-transform group-hover:-translate-y-0.5 dark:bg-slate-800 dark:text-[#70ACFE] dark:ring-slate-700"><svg class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5M5 14v4.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V14" stroke-linecap="round" stroke-linejoin="round" /></svg></div>
      <p class="text-sm font-semibold text-slate-800 dark:text-slate-100"><span class="text-[#2563EB] dark:text-[#70ACFE]">{{ loc.dropzonePrefix }}</span> {{ loc.dropzoneSuffix }}</p>
      <p class="mt-1 text-xs leading-5 text-slate-500 dark:text-slate-400">{{ helpText }}</p>
    </div>

    <ul v-if="items.length" class="space-y-2" :aria-label="effectiveLabel">
      <li v-for="item in items" :key="item.id" class="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-[#0F172A]">
        <img v-if="item.previewUrl" :src="item.previewUrl" :alt="item.file.name" class="h-10 w-10 rounded-lg object-cover ring-1 ring-slate-200 dark:ring-slate-700" />
        <div v-else class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold uppercase text-slate-500 dark:bg-slate-800 dark:text-slate-400">{{ fileExtension(item.file.name) }}</div>
        <div class="min-w-0 grow"><div class="flex items-center gap-2"><p class="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{{ item.file.name }}</p><span :class="statusClass(item.status)">{{ statusLabel(item.status) }}</span></div><p v-if="item.error" class="mt-0.5 text-xs text-red-600 dark:text-red-400">{{ item.error }}</p><p v-else class="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{{ formatSize(item.file.size) }}</p><div v-if="item.status === 'uploading'" class="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div class="h-full rounded-full bg-[#2563EB] transition-[width] duration-200 dark:bg-[#70ACFE]" :style="{ width: `${item.progress ?? 0}%` }" /></div></div>
        <div class="flex shrink-0 items-center gap-1"><button v-if="item.status === 'uploading'" type="button" class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-red-600 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-red-400" :aria-label="`取消上传 ${item.file.name}`" @click="cancel(item.id)"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12M18 6 6 18"/></svg></button><button v-else-if="item.status === 'error' || item.status === 'cancelled'" type="button" class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#2563EB] transition-colors hover:bg-slate-100 dark:text-[#70ACFE] dark:hover:bg-slate-800" :aria-label="`重试上传 ${item.file.name}`" @click="retry(item.id)"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="h-4 w-4"><path d="M20 11a8 8 0 1 0 2 5.5"/><path d="M20 4v7h-7"/></svg></button><button v-if="item.status !== 'uploading'" type="button" class="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-red-600 dark:hover:bg-slate-800 dark:hover:text-red-400" :aria-label="`移除 ${item.file.name}`" @click="remove(item.id)"><svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import { cn } from '../../utils/cn'
import { useComponentLocale } from '../../locale'
import type { FileUploadHandler, FileUploadItem } from './types'

export interface FileUploadProps {
  accept?: string
  multiple?: boolean
  maxSize?: number
  maxFiles?: number
  label?: string
  upload?: FileUploadHandler
  class?: string
}

const props = withDefaults(defineProps<FileUploadProps>(), { accept: '', multiple: true, maxSize: undefined, maxFiles: undefined, label: undefined, upload: undefined, class: '' })
const emit = defineEmits<{ (event: 'change', items: FileUploadItem[]): void; (event: 'reject', payload: { file: File; reason: string }): void; (event: 'upload', item: FileUploadItem): void; (event: 'success', item: FileUploadItem): void; (event: 'error', item: FileUploadItem): void; (event: 'cancel', item: FileUploadItem): void }>()
const loc = useComponentLocale('fileUpload')
const effectiveLabel = computed(() => props.label ?? loc.value.label)
const input = ref<HTMLInputElement>()
const items = ref<FileUploadItem[]>([])
const isDragging = ref(false)
const controllers = new Map<string, AbortController>()
const helpText = computed(() => [
  props.accept ? loc.value.acceptRule(props.accept) : loc.value.anyFiles,
  props.maxSize ? loc.value.maxSizeRule(formatSize(props.maxSize)) : ''
].filter(Boolean).join(' · '))

function openPicker() { input.value?.click() }
function onInputChange(event: Event) { addFiles(Array.from((event.target as HTMLInputElement).files ?? [])); if (input.value) input.value.value = '' }
function onDrop(event: DragEvent) { isDragging.value = false; addFiles(Array.from(event.dataTransfer?.files ?? [])) }
function matchesAccept(file: File) { if (!props.accept) return true; return props.accept.split(',').some((rule) => { const value = rule.trim().toLowerCase(); return value.startsWith('.') ? file.name.toLowerCase().endsWith(value) : value.endsWith('/*') ? file.type.startsWith(value.slice(0, -1)) : file.type === value }) }
function addFiles(files: File[]) { const accepted = props.multiple ? files : files.slice(0, 1); for (const file of accepted) { if (props.maxFiles && items.value.length >= props.maxFiles) { emit('reject', { file, reason: loc.value.fileLimitReject(props.maxFiles) }); continue } if (!matchesAccept(file)) { emit('reject', { file, reason: loc.value.typeReject }); continue } if (props.maxSize && file.size > props.maxSize) { emit('reject', { file, reason: loc.value.sizeReject(formatSize(props.maxSize)) }); continue } const item: FileUploadItem = { id: crypto.randomUUID(), file, status: props.upload ? 'uploading' : 'pending', progress: props.upload ? 0 : undefined, previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined }; items.value.push(item); notify(); if (props.upload) runUpload(item) } }
async function runUpload(item: FileUploadItem) { const controller = new AbortController(); controllers.set(item.id, controller); emit('upload', item); try { await props.upload!({ file: item.file, signal: controller.signal, setProgress: (progress) => { item.progress = Math.min(Math.max(progress, 0), 100); notify() } }); if (controller.signal.aborted) return; item.status = 'success'; item.progress = 100; emit('success', item) } catch (error) { if (controller.signal.aborted) return; item.status = 'error'; item.error = error instanceof Error ? error.message : loc.value.failedDefault; emit('error', item) } finally { controllers.delete(item.id); notify() } }
function cancel(id: string) { const item = items.value.find((entry) => entry.id === id); if (!item) return; controllers.get(id)?.abort(); controllers.delete(id); item.status = 'cancelled'; item.error = loc.value.cancelled; emit('cancel', item); notify() }
function retry(id: string) { const item = items.value.find((entry) => entry.id === id); if (!item || !props.upload) return; item.status = 'uploading'; item.progress = 0; item.error = undefined; runUpload(item); notify() }
function remove(id: string) { const item = items.value.find((entry) => entry.id === id); controllers.get(id)?.abort(); if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl); items.value = items.value.filter((entry) => entry.id !== id); notify() }
function notify() { emit('change', [...items.value]) }
function fileExtension(name: string) { return name.split('.').pop()?.slice(0, 4) || 'file' }
function formatSize(bytes: number) { if (bytes < 1024) return `${bytes} B`; if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`; return `${(bytes / 1024 ** 2).toFixed(1)} MB` }
function statusLabel(status: FileUploadItem['status']) {
  const map: Record<FileUploadItem['status'], string> = {
    pending: loc.value.statusPending,
    uploading: loc.value.statusUploading,
    success: loc.value.statusSuccess,
    error: loc.value.statusError,
    cancelled: loc.value.statusCancelled
  }
  return map[status]
}
function statusClass(status: FileUploadItem['status']) { return cn('rounded-md px-1.5 py-0.5 text-[10px] font-semibold', status === 'success' && 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400', status === 'error' && 'bg-red-50 text-red-700 dark:bg-red-950/50 dark:text-red-400', status === 'cancelled' && 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400', status === 'uploading' && 'bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300', status === 'pending' && 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400') }
onBeforeUnmount(() => { controllers.forEach((controller) => controller.abort()); items.value.forEach((item) => { if (item.previewUrl) URL.revokeObjectURL(item.previewUrl) }) })
</script>
