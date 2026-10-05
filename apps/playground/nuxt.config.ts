import { fileURLToPath } from "node:url";
import { defineNuxtConfig } from "nuxt/config";
import tailwindcss from "@tailwindcss/vite";
import { createThemeInitScript } from "../../packages/ui/src/utils/themeScript";

// Dev 直连源码：模块、组件、组合式函数与图标都指向 packages/ui/src，
// 源码改动即时 HMR，无需先构建 dist。生产构建仍消费 dist（与发布产物一致）。
const isDev = process.env.NODE_ENV === "development";
const uiSrc = (path: string) =>
  fileURLToPath(new URL(`../../packages/ui/src/${path}`, import.meta.url));

export default defineNuxtConfig({
  // 固定 buildDir：Nuxt 4 生产构建会在 .nuxt 已存在时自动切到 node_modules/.cache，
  // 导致 tsconfig extends 在干净环境（CI/Pages）与本地行为不一致
  buildDir: ".nuxt",
  css: ["~/src/style.css"],
  modules: [
    [
      // Dev 加载 Nuxt 模块源码，组件自动注册随之指向 packages/ui/src。
      isDev ? uiSrc("nuxt/index.ts") : "@recloudstudio/ui/nuxt",
      { prefix: "", injectTheme: false },
    ],
  ],
  app: {
    head: {
      title: "ReCloud UI · ReCloud Studio 设计系统",
      script: [
        {
          // 首屏应用完整的主题偏好，避免 Vue hydration 前的颜色、密度与圆角闪烁。
          innerHTML: createThemeInitScript(),
        },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/icon.svg" },
        { rel: "apple-touch-icon", href: "/icon.svg" },
        // 全站字体：Maple Mono NF CN（OFL-1.1，v7.9），由 ZeoSeven FontsAPI 按 unicode-range 分包提供。
        // 四个字重同属 "Maple Mono NF CN" 族，对应 font-normal / medium / semibold / bold。
        { rel: "preconnect", href: "https://fontsapi.zeoseven.com", crossorigin: "" },
        ...["main", "medium", "semi-bold", "bold"].map((style) => ({
          rel: "stylesheet" as const,
          href: `https://fontsapi.zeoseven.com/442/${style}/result.css`,
        })),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
    ...(isDev
      ? {
          resolve: {
            // 子路径必须排在包名之前：字符串别名按前缀匹配，顺序即优先级。
            alias: {
              "@recloudstudio/ui/icons": uiSrc("icons/index.ts"),
              "@recloudstudio/ui/markdown": uiSrc("markdown/index.ts"),
              "@recloudstudio/ui": uiSrc("index.ts"),
            },
          },
          // Dev 下 SSR 同样走源码，避免服务端 external 到 dist 造成双实例。
          ssr: { noExternal: [/^@recloudstudio\/ui(\/.*)?$/] },
        }
      : {}),
  },
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      cfPages: process.env.CF_PAGES || "",
      cfPagesBranch: process.env.CF_PAGES_BRANCH || "",
      cfPagesCommitSha: process.env.CF_PAGES_COMMIT_SHA || "",
      cfPagesUrl: process.env.CF_PAGES_URL || "",
    },
  },
  compatibilityDate: "2026-10-02",
});
