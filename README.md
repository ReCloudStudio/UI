# ReCloud UI

ReCloud Studio 的 Vue 3 / Nuxt 4 组件库，基于 Reka UI 与 Tailwind CSS v4 构建。

## 开始使用

```bash
bun add @recloudstudio/ui
```

在应用样式入口中引入主题：

```ts
import '@recloudstudio/ui/style.css'
```

Nuxt 4 可注册模块并启用组件自动导入：

```ts
export default defineNuxtConfig({
  modules: ['@recloudstudio/ui/nuxt']
})
```

组件示例与完整 API 请访问 `ui.worldexecute.me`。

## 开发

```bash
bun install
bun run dev
bun run ci
```

使用 Changesets 管理面向用户的变更：

```bash
bun run changeset
```

## 许可证

本项目以 AGPL-3.0-only 发布。闭源使用或商业授权请联系 ReCloud Studio：`contact@worldexecute.me`。
