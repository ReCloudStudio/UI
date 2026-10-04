import type { Component } from 'vue'

export interface TreeNode {
  id: string
  label: string
  disabled?: boolean
  children?: TreeNode[]
  /** True when node has dynamic children that haven't been fetched yet. */
  isLeaf?: boolean
  /** Optional icon component or icon name rendered before node label. */
  icon?: Component
}

export interface TreeDropEvent {
  draggedNode: TreeNode
  targetNode: TreeNode
  position: 'before' | 'inside' | 'after'
}

export type TreeHighlightVariant = 'subtle' | 'solid' | 'bar'
