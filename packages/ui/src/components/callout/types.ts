export type CalloutType = 'note' | 'tip' | 'info' | 'warning' | 'danger'

export interface CalloutProps {
  type?: CalloutType
  title?: string
  collapsible?: boolean
  defaultOpen?: boolean
  class?: string
}
