import { defineNuxtConfig } from 'nuxt/config'
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  css: ['~/src/style.css'],
  modules: [['@recloud/ui/nuxt', { prefix: '', injectTheme: false }]],
  app: {
    head: {
      title: 'ReCloud UI · ReCloud Studio 设计系统',
      script: [
        {
          // 首屏主题引导：在渲染前应用已保存主题，避免深浅色闪烁
          innerHTML: `(function(){try{var m=localStorage.getItem('recloud-theme')||'auto';var d=m==='dark'||(m==='auto'&&matchMedia('(prefers-color-scheme: dark)').matches);var e=document.documentElement;e.classList.toggle('dark',d);e.dataset.theme=d?'dark':'light';}catch(e){}})();`
        }
      ],
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
