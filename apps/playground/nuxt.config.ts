import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'
import { createThemeInitScript } from '../../packages/ui/src/utils/themeScript'

export default defineNuxtConfig({
  // 固定 buildDir：Nuxt 4 生产构建会在 .nuxt 已存在时自动切到 node_modules/.cache，
  // 导致 tsconfig extends 在干净环境（CI/Pages）与本地行为不一致
  buildDir: '.nuxt',
  css: ['~/src/style.css'],
  modules: [['@recloudstudio/ui/nuxt', { prefix: '', injectTheme: false }]],
  app: {
    head: {
      title: 'ReCloud UI · ReCloud Studio 设计系统',
      script: [
        {
          // 首屏应用完整的主题偏好，避免 Vue hydration 前的颜色、密度与圆角闪烁。
          innerHTML: createThemeInitScript()
        }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
        { rel: 'apple-touch-icon', href: '/icon.svg' },
        // 全站字体：Maple Mono NF CN（OFL-1.1，v7.9），由 ZeoSeven FontsAPI 按 unicode-range 分包提供。
        // 四个字重同属 "Maple Mono NF CN" 族，对应 font-normal / medium / semibold / bold。
        { rel: 'preconnect', href: 'https://fontsapi.zeoseven.com', crossorigin: '' },
        ...['main', 'medium', 'semi-bold', 'bold'].map((style) => ({
          rel: 'stylesheet' as const,
          href: `https://fontsapi.zeoseven.com/442/${style}/result.css`
        }))
      ]
    }
  },
  vite: {
    plugins: [tailwindcss()]
  },
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      cfPages: process.env.CF_PAGES || '',
      cfPagesBranch: process.env.CF_PAGES_BRANCH || '',
      cfPagesCommitSha: process.env.CF_PAGES_COMMIT_SHA || '',
      cfPagesUrl: process.env.CF_PAGES_URL || ''
    }
  },
  compatibilityDate: '2026-10-02'
})
