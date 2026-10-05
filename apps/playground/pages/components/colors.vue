<template>
  <div class="space-y-10">
    <PageHeader group="Design Tokens" title="色彩与渐变" description="ReCloud Studio 品牌色度刻度与 180° 垂直天蓝渐变，配合克制的中性语义色层级，构成整个组件库的视觉基底。" />

    <ComponentExample title="品牌色刻度" description="从天蓝到深品牌蓝的连续刻度，用于渐变节点与强调背景。">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
        <div v-for="c in swatches" :key="c.name" class="p-3 rounded-lg ring-1 ring-inset ring-black/5" :style="{ backgroundColor: c.hex, color: c.text }">
          <span class="block text-xs font-mono font-semibold">{{ c.name }}</span>
          <span class="text-[11px] font-mono">{{ c.hex }}</span>
        </div>
      </div>
    </ComponentExample>

    <ComponentExample title="垂直渐变" description="规范定义的 180° 渐变，用于品牌区、卡片头与英雄背景。" :code="gradientCode">
      <div class="space-y-3">
        <div class="p-4 rounded-xl bg-gradient-to-b from-[#C8E0FD] via-[#70ACFE] to-[#3069C9] text-[#0E1726] flex items-center justify-between shadow-xs">
          <div>
            <span class="font-semibold text-xs tracking-tight block">180° Vertical Brand Spectrum</span>
            <span class="text-[11px] text-[#0E1726]/80 font-mono">0% #C8E0FD → 25% #9BC5FE → 50% #70ACFE → 75% #417BDF → 100% #3069C9</span>
          </div>
          <div class="p-1 rounded bg-white/20 backdrop-blur-xs">
            <BrandLogo :size="24" />
          </div>
        </div>
        <div class="p-4 rounded-xl bg-[image:var(--brand-gradient-card)] text-white text-xs font-semibold shadow-xs">
          卡片头渐变 --brand-gradient-card：0% #70ACFE → 100% #3069C9
        </div>
      </div>
    </ComponentExample>

    <ApiTable :rows="tokenRows" />

    <DocPageNav name="colors" />
  </div>
</template>

<script setup lang="ts">
import { BrandLogo } from '@recloudstudio/ui/icons'

const swatches = [
  { name: 'brand-50', hex: '#C8E0FD', text: '#0E1726' },
  { name: 'brand-100', hex: '#9BC5FE', text: '#0E1726' },
  { name: 'brand-200', hex: '#70ACFE', text: '#0E1726' },
  { name: 'brand-300', hex: '#417BDF', text: '#FFFFFF' },
  { name: 'brand-600', hex: '#3069C9', text: '#FFFFFF' },
  { name: 'brand-700', hex: '#1E63CE', text: '#FFFFFF' }
]

const gradientCode = `.brand-gradient {
  background: linear-gradient(180deg,
    #C8E0FD 0%, #9BC5FE 25%, #70ACFE 50%, #417BDF 75%, #3069C9 100%);
}`

const tokenRows = [
  { name: '--brand-50…700', type: 'color', default: '#C8E0FD…#1E63CE', description: '品牌蓝刻度，暗色模式下主交互色为 brand-200 (#70ACFE)。' },
  { name: '--brand-gradient', type: 'image', default: '180° 五段渐变', description: '全站统一垂直渐变 Token。' },
  { name: '--ink / --text / --text-muted', type: 'color', default: '#0E1726 / #1F2A37 / #5B6B7B', description: '中性文本层级。' },
  { name: '--surface / --surface-soft', type: 'color', default: '#FFFFFF / #F4F8FE', description: '背景表面层级。' },
  { name: '--border', type: 'color', default: '#DCE3EC', description: '分割线与环线基础色。' },
  { name: '.dark / [data-theme="dark"]', type: 'selector', default: '—', description: '暗色主题双选择器，useTheme 同步维护。' }
]
</script>
