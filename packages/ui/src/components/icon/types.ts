import type { Component } from "vue";

/**
 * 支持的图标源类型：
 * - Vue 组件（来自 `lucide-vue-next`、`@heroicons/vue` 或自定义 SVG 组件）
 * - 字符串：
 *   - 以 `<svg` 开头的内联 SVG 标记代码
 *   - 图片路径或 URL（如 `/icon.svg`、`https://...`、`data:image/...`）
 *   - 注册前缀名称（如 `lucide:settings`、`custom:logo`）
 *   - 纯图标名称（通过默认解析器或内置 lucide 处理）
 */
export type IconSource = string | Component;

/**
 * 已规范化为具体渲染形态的结构。
 */
export type ResolvedIcon =
  | { kind: "component"; component: Component }
  | { kind: "svg"; markup: string }
  | { kind: "image"; src: string };

/**
 * 图标解析器函数签名。
 * 接收去除前缀后的名称（或无前缀时的完整名称），返回图标组件、SVG 代码、图片路径或其异步 Promise。
 */
export type IconResolver = (
  name: string,
) => IconSource | null | undefined | Promise<IconSource | null | undefined>;

export interface IconProps {
  /**
   * 图标源：支持 Vue 组件、内联 SVG 字符串、图片 URL 或注册前缀名称。
   */
  icon?: IconSource;

  /**
   * 图标尺寸，默认 `'1em'`。
   * 传入数字时自动添加 `px`（例如 `16` -> `'16px'`）；传入字符串按 CSS 属性原样生效。
   */
  size?: number | string;

  /**
   * 无障碍描述文本。
   * 提供时赋予 `role="img"` 与 `aria-label`；缺省时应用 `aria-hidden="true"` 标记为装饰图标。
   */
  label?: string;
}
