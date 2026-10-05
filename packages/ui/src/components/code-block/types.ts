import type { IconSource } from '../icon'

export interface CodeBlockProps {
  code?: string
  language?: string
  filename?: string
  /**
   * 编程语言或代码文件图标。
   * - `true`: 根据 `language` 或 `filename` 自动匹配图标（未匹配到时显示通用代码图标）；
   * - `false`: 禁用图标（保留小圆点或折叠指示器）；
   * - `IconSource`（组件、SVG 代码或前缀名）：自定义显示指定图标。
   * 默认情况下，当传入非空的 `language` 或 `filename` 时自动尝试匹配语言图标。
   */
  icon?: IconSource | boolean
  copyable?: boolean
  showLineNumbers?: boolean
  wrap?: boolean
  maxHeight?: string
  /** Show a toggle in the header that collapses the code body. Use `v-model:collapsed` to control it. */
  collapsible?: boolean
  class?: string
}
