<template>
  <div ref="container" :class="cn('flex min-h-0 min-w-0 overflow-hidden', props.orientation === 'horizontal' ? 'flex-row' : 'flex-col', props.class)">
    <section :style="firstPanelStyle" class="min-h-0 min-w-0 shrink-0 overflow-auto"><slot name="first" /></section>
    <div
      role="separator"
      :aria-label="props.label"
      :aria-orientation="props.orientation === 'horizontal' ? 'vertical' : 'horizontal'"
      :aria-valuemin="props.min"
      :aria-valuemax="effectiveMax"
      :aria-valuenow="panelSize"
      tabindex="0"
      :class="cn('group relative z-10 shrink-0 touch-none bg-slate-200 transition-colors hover:bg-[#2563EB] focus-visible:bg-[#2563EB] focus-visible:outline-none dark:bg-slate-800 dark:hover:bg-[#70ACFE] dark:focus-visible:bg-[#70ACFE]', props.orientation === 'horizontal' ? 'w-px cursor-col-resize' : 'h-px cursor-row-resize')"
      @pointerdown="startResize"
      @keydown="onKeydown"
    >
      <span :class="cn('absolute rounded-full bg-slate-400 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-slate-500', props.orientation === 'horizontal' ? 'inset-y-0 -left-0.5 w-1' : 'inset-x-0 -top-0.5 h-1')" />
    </div>
    <section class="min-h-0 min-w-0 grow overflow-auto"><slot name="second" /></section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { cn } from '../../utils/cn'

export interface ResizablePanelProps {
  /** Direction of the panes. Horizontal means a vertical drag handle. */
  orientation?: 'horizontal' | 'vertical'
  /** Controlled size of the first pane in pixels. */
  modelValue?: number
  /** Initial size used when modelValue is omitted. */
  defaultSize?: number
  min?: number
  max?: number
  step?: number
  label?: string
  class?: string
}

const props = withDefaults(defineProps<ResizablePanelProps>(), {
  orientation: 'horizontal', modelValue: undefined, defaultSize: 280, min: 160, max: undefined,
  step: 16, label: '调整面板大小', class: ''
})
const emit = defineEmits<{
  (event: 'update:modelValue', value: number): void
  (event: 'resizeStart'): void
  (event: 'resizeEnd', value: number): void
}>()

const container = ref<HTMLElement>()
const internalSize = ref(props.defaultSize)
const isControlled = computed(() => props.modelValue !== undefined)
const panelSize = computed(() => isControlled.value ? props.modelValue! : internalSize.value)
const containerSize = computed(() => {
  const element = container.value
  return element ? props.orientation === 'horizontal' ? element.clientWidth : element.clientHeight : 0
})
const effectiveMax = computed(() => props.max ?? Math.max(props.min, containerSize.value - props.min))
const firstPanelStyle = computed(() => props.orientation === 'horizontal' ? { width: `${panelSize.value}px` } : { height: `${panelSize.value}px` })

function clamp(value: number) { return Math.min(Math.max(Math.round(value), props.min), effectiveMax.value) }
function updateSize(value: number) { const next = clamp(value); if (!isControlled.value) internalSize.value = next; emit('update:modelValue', next) }
function pointToSize(event: PointerEvent) { const bounds = container.value?.getBoundingClientRect(); if (!bounds) return panelSize.value; return props.orientation === 'horizontal' ? event.clientX - bounds.left : event.clientY - bounds.top }
function startResize(event: PointerEvent) {
  event.preventDefault()
  const target = event.currentTarget as HTMLElement
  target.setPointerCapture(event.pointerId)
  emit('resizeStart')
  const onMove = (moveEvent: PointerEvent) => updateSize(pointToSize(moveEvent))
  const onEnd = () => { target.removeEventListener('pointermove', onMove); target.removeEventListener('pointerup', onEnd); target.removeEventListener('pointercancel', onEnd); emit('resizeEnd', panelSize.value) }
  target.addEventListener('pointermove', onMove)
  target.addEventListener('pointerup', onEnd)
  target.addEventListener('pointercancel', onEnd)
}
function onKeydown(event: KeyboardEvent) {
  const decrement = props.orientation === 'horizontal' ? event.key === 'ArrowLeft' : event.key === 'ArrowUp'
  const increment = props.orientation === 'horizontal' ? event.key === 'ArrowRight' : event.key === 'ArrowDown'
  if (decrement || increment) { event.preventDefault(); updateSize(panelSize.value + (increment ? props.step : -props.step)) }
  else if (event.key === 'Home') { event.preventDefault(); updateSize(props.min) }
  else if (event.key === 'End') { event.preventDefault(); updateSize(effectiveMax.value) }
}
</script>
