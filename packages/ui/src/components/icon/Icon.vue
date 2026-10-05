<template>
  <span
    class="inline-flex shrink-0 items-center justify-center align-middle"
    :style="sizeStyle"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
  >
    <component
      :is="resolved.component"
      v-if="resolved?.kind === 'component'"
      class="h-full w-full"
    />
    <span
      v-else-if="resolved?.kind === 'svg'"
      class="inline-flex h-full w-full items-center justify-center [&>svg]:h-full [&>svg]:w-full"
      v-html="resolved.markup"
    />
    <img
      v-else-if="resolved?.kind === 'image'"
      :src="resolved.src"
      alt=""
      class="h-full w-full object-contain"
    />
    <slot v-else />
  </span>
</template>

<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import { iconRegistryVersion, resolveIconSource } from './registry'
import type { IconProps, ResolvedIcon } from './types'

defineOptions({
  name: 'ReIcon'
})

const props = withDefaults(defineProps<IconProps>(), {
  size: '1em'
})

const resolved = shallowRef<ResolvedIcon | null>(null)
let currentToken = 0

function updateIcon(): void {
  const token = ++currentToken
  const outcome = resolveIconSource(props.icon)

  if (outcome && typeof (outcome as Promise<unknown>).then === 'function') {
    resolved.value = null
    // SAFETY: outcome is checked as a thenable Promise yielding ResolvedIcon | null.
    ;(outcome as Promise<ResolvedIcon | null>).then((result) => {
      if (token === currentToken) {
        resolved.value = result
      }
    })
  } else {
    // SAFETY: outcome is synchronous ResolvedIcon | null when not a thenable.
    resolved.value = outcome as ResolvedIcon | null
  }
}

watch([() => props.icon, () => iconRegistryVersion.value], updateIcon, {
  immediate: true
})

const sizeStyle = computed(() => {
  if (props.size === undefined || props.size === null) {
    return { width: '1em', height: '1em' }
  }
  const sizeValue = typeof props.size === 'number' ? `${props.size}px` : props.size
  return { width: sizeValue, height: sizeValue }
})
</script>
