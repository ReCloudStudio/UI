import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  css: ['~/src/style.css'],
  modules: [['@recloud/ui/nuxt', { prefix: '', injectTheme: false }]],
  app: {
    head: {
      title: 'ReCloud UI · ReCloud Studio 设计系统',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
        { rel: 'apple-touch-icon', href: '/icon.svg' }
      ]
    }
  },
  vite: {
    plugins: [tailwindcss()]
  },
  devtools: { enabled: true },
  compatibilityDate: '2026-10-02'
})
