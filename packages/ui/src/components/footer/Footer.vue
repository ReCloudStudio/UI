<template>
  <footer
    :class="[
      'w-full bg-[color:var(--background)] text-[color:var(--muted-foreground)] text-sm transition-colors',
      bordered ? 'border-t border-[color:var(--border)]/80' : '',
      props.class
    ]"
  >
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
        <!-- Brand Info / Left Column -->
        <div class="lg:col-span-2 space-y-4 pr-4">
          <div class="flex items-center gap-2.5 font-bold text-[color:var(--foreground)]">
            <slot name="logo">
              <div class="flex h-7 w-7 items-center justify-center rounded-lg bg-[color:var(--primary)] text-[color:var(--primary-foreground)] font-black text-xs">
                RC
              </div>
            </slot>
            <span v-if="brandTitle || $slots.brand" class="text-base tracking-tight">
              <slot name="brand">{{ brandTitle }}</slot>
            </span>
          </div>

          <p v-if="brandDescription || $slots.description" class="max-w-sm text-xs leading-relaxed text-[color:var(--muted-foreground)] sm:text-sm">
            <slot name="description">{{ brandDescription }}</slot>
          </p>

          <div v-if="$slots.newsletter" class="pt-2">
            <slot name="newsletter" />
          </div>
        </div>

        <!-- Link Columns / Navigation Groups -->
        <div
          v-for="col in columns"
          :key="col.title"
          class="space-y-3"
        >
          <h4 class="text-xs font-semibold tracking-wider text-[color:var(--foreground)] uppercase">
            {{ col.title }}
          </h4>
          <ul class="space-y-2">
            <li v-for="link in col.links" :key="link.label + (link.to || link.href)">
              <component
                :is="link.to ? 'RouterLink' : 'a'"
                v-bind="link.to ? { to: link.to } : { href: link.href || '#', target: link.target }"
                class="text-xs text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--primary)] sm:text-sm"
              >
                {{ link.label }}
              </component>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom Bar: Copyright & Socials -->
      <div class="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[color:var(--border)]/80 pt-8 sm:flex-row">
        <p class="text-xs text-[color:var(--muted-foreground)]">
          <slot name="copyright">
            {{ copyright || '© ReCloud Studio. All rights reserved.' }}
          </slot>
        </p>

        <!-- Social Icons / Links -->
        <div class="flex items-center gap-4">
          <slot name="socials">
            <a
              v-for="s in socials"
              :key="s.name"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              class="text-[color:var(--muted-foreground)] transition-colors hover:text-[color:var(--foreground)]"
              :aria-label="s.name"
            >
              <svg
                v-if="socialIcon(s.icon) === 'github'"
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.683-.217.683-.483 0-.237-.009-1.025-.013-1.86-2.782.604-3.369-1.18-3.369-1.18-.455-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.004.071 1.532 1.031 1.532 1.031.892 1.529 2.341 1.087 2.91.831.091-.646.349-1.087.635-1.337-2.221-.253-4.556-1.111-4.556-4.944 0-1.092.39-1.984 1.029-2.683-.103-.253-.446-1.271.098-2.65 0 0 .84-.269 2.75 1.025A9.56 9.56 0 0 1 12 6.756a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.748-1.025 2.748-1.025.546 1.379.203 2.397.1 2.65.64.699 1.027 1.591 1.027 2.683 0 3.842-2.339 4.688-4.566 4.936.359.31.678.92.678 1.855 0 1.34-.012 2.419-.012 2.749 0 .268.18.579.688.481A10.002 10.002 0 0 0 22 12c0-5.523-4.477-10-10-10Z" />
              </svg>
              <svg
                v-else-if="socialIcon(s.icon) === 'discord'"
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M19.54 4.37A16.32 16.32 0 0 0 15.5 3.1a11.4 11.4 0 0 0-.52 1.07 15.12 15.12 0 0 0-5.96 0A11.3 11.3 0 0 0 8.5 3.1a16.4 16.4 0 0 0-4.04 1.28C1.9 8.18 1.2 11.89 1.55 15.55a16.56 16.56 0 0 0 4.96 2.5c.4-.55.76-1.13 1.07-1.73a10.55 10.55 0 0 1-1.69-.81c.14-.1.28-.2.41-.31 3.26 1.53 6.79 1.53 10.01 0 .14.11.28.21.42.31-.54.32-1.1.59-1.7.81.31.6.67 1.18 1.07 1.73a16.5 16.5 0 0 0 4.96-2.5c.41-4.24-.7-7.92-2.54-11.18ZM8.68 13.3c-.98 0-1.78-.9-1.78-2s.78-2 1.78-2c1 0 1.79.9 1.78 2 0 1.1-.78 2-1.78 2Zm6.64 0c-.98 0-1.78-.9-1.78-2s.78-2 1.78-2c1 0 1.79.9 1.78 2 0 1.1-.78 2-1.78 2Z" />
              </svg>
              <svg
                v-else-if="socialIcon(s.icon) === 'twitter'"
                class="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M18.9 2H22l-6.77 7.74L23.2 22h-6.24l-4.89-6.57L6.32 22H3.2l7.24-8.27L2.8 2h6.36l4.42 5.94L18.9 2Zm-1.1 18h1.73L8.22 3.9H6.36L17.8 20Z" />
              </svg>
              <span v-else class="text-xs font-medium">{{ s.name }}</span>
            </a>
          </slot>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { FooterProps } from './types'

const props = withDefaults(defineProps<FooterProps>(), {
  brandTitle: '',
  brandDescription: '',
  columns: () => [],
  copyright: undefined,
  socials: () => [],
  bordered: true,
  class: ''
})

const socialIcon = (icon?: string) => {
  const normalizedIcon = icon?.toLowerCase()

  if (normalizedIcon === 'github' || normalizedIcon === 'discord') {
    return normalizedIcon
  }

  if (normalizedIcon === 'twitter' || normalizedIcon === 'x') {
    return 'twitter'
  }

  return undefined
}
</script>
