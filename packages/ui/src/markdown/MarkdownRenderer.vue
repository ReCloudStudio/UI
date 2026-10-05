<template>
  <div
    :class="[
      'recloud-markdown leading-relaxed text-slate-800 dark:text-slate-200 selection:bg-[#2563EB]/15 dark:selection:bg-[#70ACFE]/20',
      props.class
    ]"
  >
    <template v-for="(block, index) in compiledDocument.children" :key="index">
      <component :is="renderBlock(block)" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, h, type VNode, watch } from 'vue'
import { AnchorHeading } from '../components/anchor-heading'
import { Callout } from '../components/callout'
import { CodeBlock } from '../components/code-block'
import { CodeGroup } from '../components/code-group'
import { InlineCode } from '../components/inline-code'
import { StepItem, Steps } from '../components/steps'
import { compileMarkdown } from './compile'
import type {
  MarkdownBlockNode,
  MarkdownCalloutNode,
  MarkdownCodeBlockNode,
  MarkdownCodeGroupNode,
  MarkdownDocument,
  MarkdownHeading,
  MarkdownHeadingNode,
  MarkdownInlineNode,
  MarkdownListNode,
  MarkdownParagraphNode,
  MarkdownRendererProps,
  MarkdownStepsNode,
  MarkdownTableNode
} from './types'

const props = withDefaults(defineProps<MarkdownRendererProps>(), {
  content: '',
  ast: undefined,
  components: () => ({}),
  baseUrl: undefined,
  features: () => ({}),
  sanitize: () => ({}),
  class: ''
})

const emit = defineEmits<{
  (e: 'headings', headings: MarkdownHeading[]): void
}>()

const compiledDocument = computed<MarkdownDocument>(() => {
  if (props.ast) return props.ast
  return compileMarkdown(props.content || '', {
    baseUrl: props.baseUrl,
    features: props.features,
    sanitize: props.sanitize
  })
})

watch(
  () => compiledDocument.value.headings,
  (headings) => {
    emit('headings', headings)
  },
  { immediate: true }
)

const renderInline = (node: MarkdownInlineNode): VNode | string => {
  switch (node.type) {
    case 'text':
      return node.value
    case 'inlineCode':
      if (props.components?.inlineCode) {
        return h(props.components.inlineCode, { code: node.value }, () => node.value)
      }
      return h(InlineCode, { code: node.value })
    case 'emphasis':
      return h('em', { class: 'italic' }, node.children.map(renderInline))
    case 'strong':
      return h('strong', { class: 'font-semibold text-slate-900 dark:text-slate-100' }, node.children.map(renderInline))
    case 'delete':
      return h('del', { class: 'line-through opacity-75' }, node.children.map(renderInline))
    case 'break':
      return h('br')
    case 'link': {
      if (props.components?.link) {
        return h(
          props.components.link,
          { href: node.url, title: node.title, external: node.external },
          () => node.children.map(renderInline)
        )
      }
      return h(
        'a',
        {
          href: node.url,
          title: node.title,
          target: node.external ? '_blank' : undefined,
          rel: node.external ? 'noopener noreferrer' : undefined,
          class:
            'font-medium text-[#2563EB] dark:text-[#70ACFE] underline underline-offset-4 decoration-[#2563EB]/40 hover:decoration-[#2563EB] dark:decoration-[#70ACFE]/40 dark:hover:decoration-[#70ACFE] transition-colors'
        },
        node.children.map(renderInline)
      )
    }
    case 'image': {
      if (props.components?.image) {
        return h(props.components.image, { src: node.url, alt: node.alt, title: node.title })
      }
      return h('img', {
        src: node.url,
        alt: node.alt || '',
        title: node.title,
        loading: 'lazy',
        class: 'my-6 rounded-xl border border-slate-200/80 shadow-sm dark:border-slate-800'
      })
    }
    default:
      return ''
  }
}

const renderHeading = (block: MarkdownHeadingNode): VNode => {
  const asTag = `h${block.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  if (props.components?.heading) {
    return h(
      props.components.heading,
      { level: block.level, id: block.id, title: block.title },
      () => block.children.map(renderInline)
    )
  }
  return h(
    AnchorHeading,
    {
      as: asTag,
      id: block.id
    },
    () => block.children.map(renderInline)
  )
}

const renderParagraph = (block: MarkdownParagraphNode): VNode => {
  if (props.components?.paragraph) {
    return h(props.components.paragraph, null, () => block.children.map(renderInline))
  }
  return h(
    'p',
    { class: 'my-4 text-base leading-7 text-slate-700 dark:text-slate-300' },
    block.children.map(renderInline)
  )
}

const renderList = (block: MarkdownListNode): VNode => {
  const tag = block.ordered ? 'ol' : 'ul'
  const listClass = block.ordered
    ? 'my-4 ml-6 list-decimal space-y-2 text-slate-700 dark:text-slate-300'
    : 'my-4 ml-6 list-disc space-y-2 text-slate-700 dark:text-slate-300'

  if (props.components?.list) {
    return h(
      props.components.list,
      { ordered: block.ordered, start: block.start },
      () =>
        block.children.map((item) =>
          props.components?.listItem
            ? h(props.components.listItem, { checked: item.checked }, () =>
                item.children.map(renderBlock)
              )
            : h(
                'li',
                { class: 'leading-7 pl-1' },
                item.children.map(renderBlock)
              )
        )
    )
  }

  return h(
    tag,
    {
      start: block.start,
      class: listClass
    },
    block.children.map((item) =>
      h(
        'li',
        {
          class: [
            'leading-7 pl-1',
            item.checked !== null && item.checked !== undefined ? 'list-none -ml-5 flex items-start gap-2' : ''
          ]
        },
        [
          item.checked !== null && item.checked !== undefined
            ? h('input', {
                type: 'checkbox',
                checked: item.checked,
                disabled: true,
                class:
                  'mt-1.5 h-4 w-4 rounded border-slate-300 text-[#2563EB] focus:ring-0 dark:border-slate-700'
              })
            : null,
          h('div', { class: 'flex-1' }, item.children.map(renderBlock))
        ]
      )
    )
  )
}

const renderTable = (block: MarkdownTableNode): VNode => {
  if (props.components?.table) {
    return h(props.components.table, { table: block })
  }

  return h(
    'div',
    { class: 'my-6 w-full overflow-x-auto rounded-xl border border-slate-200/80 dark:border-slate-800' },
    h('table', { class: 'w-full border-collapse text-left text-sm' }, [
      ...(block.children[0]
        ? [
            h(
              'thead',
              { class: 'bg-slate-50/75 dark:bg-slate-900/50' },
              [
                h(
                  'tr',
                  null,
                  block.children[0].children.map((cell) =>
                    h(
                      'th',
                      {
                        class: [
                          'border-b border-slate-200/80 px-4 py-3 font-semibold text-slate-900 dark:border-slate-800 dark:text-slate-100',
                          cell.align === 'center'
                            ? 'text-center'
                            : cell.align === 'right'
                              ? 'text-right'
                              : 'text-left'
                        ]
                      },
                      cell.children.map(renderInline)
                    )
                  )
                )
              ]
            )
          ]
        : []),
      h(
        'tbody',
        { class: 'divide-y divide-slate-200/70 dark:divide-slate-800/70' },
        block.children.slice(1).map((row) =>
          h(
            'tr',
            { class: 'hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors' },
            row.children.map((cell) =>
              h(
                'td',
                {
                  class: [
                    'px-4 py-3 text-slate-700 dark:text-slate-300 align-top',
                    cell.align === 'center'
                      ? 'text-center'
                      : cell.align === 'right'
                        ? 'text-right'
                        : 'text-left'
                  ]
                },
                cell.children.map(renderInline)
              )
            )
          )
        )
      )
    ])
  )
}

const renderCodeBlock = (block: MarkdownCodeBlockNode): VNode => {
  if (props.components?.codeBlock) {
    return h(props.components.codeBlock, { ...block })
  }

  return h(CodeBlock, {
    code: block.code,
    language: block.language,
    copyable: block.copyable,
    collapsible: block.collapsible,
    collapsed: block.collapsed,
    highlightLines: block.highlightLines,
    class: 'my-5'
  })
}

const renderCallout = (block: MarkdownCalloutNode): VNode => {
  if (props.components?.callout) {
    return h(
      props.components.callout,
      {
        type: block.calloutType,
        title: block.title,
        collapsible: block.collapsible,
        defaultOpen: block.defaultOpen
      },
      () => block.children.map(renderBlock)
    )
  }

  return h(
    Callout,
    {
      type: block.calloutType,
      title: block.title,
      collapsible: block.collapsible,
      defaultOpen: block.defaultOpen,
      class: 'my-6'
    },
    () => block.children.map(renderBlock)
  )
}

const renderSteps = (block: MarkdownStepsNode): VNode => {
  if (props.components?.steps) {
    return h(
      props.components.steps,
      { startIndex: block.startIndex },
      () =>
        block.children.map((item) =>
          props.components?.stepItem
            ? h(
                props.components.stepItem,
                { title: item.title, description: item.description, step: item.step },
                () => item.children.map(renderBlock)
              )
            : h(
                StepItem,
                { title: item.title, description: item.description, step: item.step },
                () => item.children.map(renderBlock)
              )
        )
    )
  }

  return h(
    Steps,
    {
      startIndex: block.startIndex,
      class: 'my-6'
    },
    () =>
      block.children.map((item) =>
        h(
          StepItem,
          {
            title: item.title,
            description: item.description,
            step: item.step
          },
          () => item.children.map(renderBlock)
        )
      )
  )
}

const renderCodeGroup = (block: MarkdownCodeGroupNode): VNode => {
  if (props.components?.codeGroup) {
    return h(props.components.codeGroup, { tabs: block.tabs }, () =>
      block.children.map(renderCodeBlock)
    )
  }

  const defaultKey = block.tabs[0]?.key

  return h(
    CodeGroup,
    {
      tabs: block.tabs,
      modelValue: defaultKey,
      class: 'my-6'
    },
    {
      default: (slotProps: { activeKey?: string | number; activeIndex?: number }) => {
        const activeIndex = slotProps?.activeIndex ?? 0
        const activeBlock = block.children[activeIndex] ?? block.children[0]
        if (!activeBlock) return null

        return h(CodeBlock, {
          code: activeBlock.code,
          language: activeBlock.language,
          copyable: activeBlock.copyable,
          collapsible: activeBlock.collapsible,
          collapsed: activeBlock.collapsed,
          highlightLines: activeBlock.highlightLines,
          class: 'rounded-none border-x-0 border-b-0 shadow-none'
        })
      }
    }
  )
}

const renderBlock = (block: MarkdownBlockNode): VNode => {
  switch (block.type) {
    case 'heading':
      return renderHeading(block)
    case 'paragraph':
      return renderParagraph(block)
    case 'blockquote':
      return props.components?.blockquote
        ? h(props.components.blockquote, null, () => block.children.map(renderBlock))
        : h(
            'blockquote',
            {
              class:
                'my-5 border-l-4 border-slate-300 pl-4 italic text-slate-700 dark:border-slate-700 dark:text-slate-300'
            },
            block.children.map(renderBlock)
          )
    case 'list':
      return renderList(block)
    case 'table':
      return renderTable(block)
    case 'codeBlock':
      return renderCodeBlock(block)
    case 'thematicBreak':
      return props.components?.thematicBreak
        ? h(props.components.thematicBreak)
        : h('hr', { class: 'my-8 border-slate-200/80 dark:border-slate-800' })
    case 'callout':
      return renderCallout(block)
    case 'steps':
      return renderSteps(block)
    case 'codeGroup':
      return renderCodeGroup(block)
    default:
      return h('div')
  }
}
</script>
