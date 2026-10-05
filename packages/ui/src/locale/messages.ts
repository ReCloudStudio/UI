export interface LocaleMessages {
  common: {
    close: string
    cancel: string
    confirm: string
    retry: string
    remove: string
    search: string
    loading: string
    noData: string
    clear: string
    save: string
    edit: string
    copy: string
    copied: string
    expandCode: string
    collapseCode: string
  }
  pagination: {
    prev: string
    next: string
    pageSummary: (page: number, totalPages: number) => string
    totalSummary: (page: number, totalPages: number, total: number) => string
    ariaLabel: string
  }
  empty: {
    defaultTitle: string
    loadFailed: string
  }
  command: {
    searchPlaceholder: string
    emptyText: string
    label: string
  }
  fileUpload: {
    label: string
    dropzonePrefix: string
    dropzoneSuffix: string
    anyFiles: string
    acceptRule: (accept: string) => string
    maxSizeRule: (size: string) => string
    fileLimitReject: (max: number) => string
    typeReject: string
    sizeReject: (size: string) => string
    failedDefault: string
    cancelled: string
    statusPending: string
    statusUploading: string
    statusSuccess: string
    statusError: string
    statusCancelled: string
    cancelAria: (name: string) => string
    retryAria: (name: string) => string
    removeAria: (name: string) => string
  }
  tree: {
    selectedBadge: string
    collapseNode: (label: string) => string
    expandNode: (label: string) => string
    selectNode: (label: string) => string
    label: string
  }
  table: {
    selectAllAria: string
    selectRowAria: (index: number) => string
  }
  select: {
    placeholder: string
  }
  combobox: {
    placeholder: string
    emptyText: string
    clearAria: string
  }
  multiSelect: {
    placeholder: string
    emptyText: string
    clearAria: string
    removeAria: (label: string) => string
  }
  datePicker: {
    placeholder: string
    rangePlaceholder: string
    prevMonthAria: string
    nextMonthAria: string
    pendingRangeEnd: string
    weekdays: string[]
  }
  appShell: {
    sidebarLabel: string
    resizeHandleAria: string
  }
  alertDialog: {
    confirm: string
    cancel: string
  }
  codeBlock: {
    region: string
  }
  docs: {
    toc: string
    prev: string
    next: string
    copyLink: string
    copiedLink: string
    searchPlaceholder: string
  }
}

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (...args: never[]) => unknown
    ? T[P]
    : T[P] extends object
      ? DeepPartial<T[P]>
      : T[P]
}

export const zhCN: LocaleMessages = {
  common: {
    close: '关闭',
    cancel: '取消',
    confirm: '确认',
    retry: '重试',
    remove: '移除',
    search: '搜索',
    loading: '加载中',
    noData: '暂无数据',
    clear: '清除',
    save: '保存',
    edit: '编辑',
    copy: '复制',
    copied: '已复制',
    expandCode: '展开代码',
    collapseCode: '收起代码'
  },
  pagination: {
    prev: '上一页',
    next: '下一页',
    pageSummary: (page, totalPages) => `第 ${page} / ${totalPages} 页`,
    totalSummary: (page, totalPages, total) => `第 ${page} / ${totalPages} 页，共 ${total} 条`,
    ariaLabel: '分页导航'
  },
  empty: {
    defaultTitle: '暂无数据',
    loadFailed: '数据加载失败'
  },
  command: {
    searchPlaceholder: '搜索命令…',
    emptyText: '没有找到匹配的命令。',
    label: '命令面板'
  },
  fileUpload: {
    label: '上传文件',
    dropzonePrefix: '选择文件',
    dropzoneSuffix: '或拖放到这里',
    anyFiles: '支持任意文件类型',
    acceptRule: (accept) => `支持 ${accept}`,
    maxSizeRule: (size) => `单个文件最大 ${size}`,
    fileLimitReject: (max) => `最多上传 ${max} 个文件`,
    typeReject: '文件类型不受支持',
    sizeReject: (size) => `文件不能超过 ${size}`,
    failedDefault: '上传失败，请重试',
    cancelled: '上传已取消',
    statusPending: '等待上传',
    statusUploading: '上传中',
    statusSuccess: '已完成',
    statusError: '失败',
    statusCancelled: '已取消',
    cancelAria: (name) => `取消上传 ${name}`,
    retryAria: (name) => `重试上传 ${name}`,
    removeAria: (name) => `移除 ${name}`
  },
  tree: {
    selectedBadge: '已选',
    collapseNode: (label) => `收起 ${label}`,
    expandNode: (label) => `展开 ${label}`,
    selectNode: (label) => `选择 ${label}`,
    label: '树形目录'
  },
  table: {
    selectAllAria: '选择当前页所有行',
    selectRowAria: (index) => `选择第 ${index} 行`
  },
  select: {
    placeholder: '请选择...'
  },
  combobox: {
    placeholder: '搜索或选择...',
    emptyText: '无匹配项',
    clearAria: '清除'
  },
  multiSelect: {
    placeholder: '搜索并选择...',
    emptyText: '无匹配项',
    clearAria: '清除所有选择',
    removeAria: (label) => `移除 ${label}`
  },
  datePicker: {
    placeholder: '选择日期',
    rangePlaceholder: '选择日期范围',
    prevMonthAria: '上个月',
    nextMonthAria: '下个月',
    pendingRangeEnd: '已选择开始日期，请选择结束日期。',
    weekdays: ['一', '二', '三', '四', '五', '六', '日']
  },
  appShell: {
    sidebarLabel: '侧边导航',
    resizeHandleAria: '调整面板大小'
  },
  alertDialog: {
    confirm: '确认',
    cancel: '取消'
  },
  codeBlock: {
    region: '代码区域'
  },
  docs: {
    toc: '本页目录',
    prev: '上一篇',
    next: '下一篇',
    copyLink: '复制链接',
    copiedLink: '已复制链接',
    searchPlaceholder: '搜索文档...'
  }
}

export const enUS: LocaleMessages = {
  common: {
    close: 'Close',
    cancel: 'Cancel',
    confirm: 'Confirm',
    retry: 'Retry',
    remove: 'Remove',
    search: 'Search',
    loading: 'Loading',
    noData: 'No data',
    clear: 'Clear',
    save: 'Save',
    edit: 'Edit',
    copy: 'Copy',
    copied: 'Copied',
    expandCode: 'Expand code',
    collapseCode: 'Collapse code'
  },
  pagination: {
    prev: 'Previous',
    next: 'Next',
    pageSummary: (page, totalPages) => `Page ${page} of ${totalPages}`,
    totalSummary: (page, totalPages, total) => `Page ${page} of ${totalPages}, ${total} total`,
    ariaLabel: 'Pagination'
  },
  empty: {
    defaultTitle: 'No data available',
    loadFailed: 'Failed to load data'
  },
  command: {
    searchPlaceholder: 'Search commands…',
    emptyText: 'No matching commands found.',
    label: 'Command palette'
  },
  fileUpload: {
    label: 'Upload files',
    dropzonePrefix: 'Choose a file',
    dropzoneSuffix: 'or drag and drop here',
    anyFiles: 'Supports any file type',
    acceptRule: (accept) => `Supports ${accept}`,
    maxSizeRule: (size) => `Max file size ${size}`,
    fileLimitReject: (max) => `Maximum ${max} files allowed`,
    typeReject: 'File type not supported',
    sizeReject: (size) => `File must not exceed ${size}`,
    failedDefault: 'Upload failed, please retry',
    cancelled: 'Upload cancelled',
    statusPending: 'Pending',
    statusUploading: 'Uploading',
    statusSuccess: 'Completed',
    statusError: 'Failed',
    statusCancelled: 'Cancelled',
    cancelAria: (name) => `Cancel upload for ${name}`,
    retryAria: (name) => `Retry upload for ${name}`,
    removeAria: (name) => `Remove ${name}`
  },
  tree: {
    selectedBadge: 'Selected',
    collapseNode: (label) => `Collapse ${label}`,
    expandNode: (label) => `Expand ${label}`,
    selectNode: (label) => `Select ${label}`,
    label: 'Tree View'
  },
  table: {
    selectAllAria: 'Select all rows on current page',
    selectRowAria: (index) => `Select row ${index}`
  },
  select: {
    placeholder: 'Please select...'
  },
  combobox: {
    placeholder: 'Search or select...',
    emptyText: 'No matching results',
    clearAria: 'Clear'
  },
  multiSelect: {
    placeholder: 'Search and select...',
    emptyText: 'No matching items',
    clearAria: 'Clear all selections',
    removeAria: (label) => `Remove ${label}`
  },
  datePicker: {
    placeholder: 'Select date',
    rangePlaceholder: 'Select date range',
    prevMonthAria: 'Previous month',
    nextMonthAria: 'Next month',
    pendingRangeEnd: 'Start date selected, please choose end date.',
    weekdays: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
  },
  appShell: {
    sidebarLabel: 'Sidebar navigation',
    resizeHandleAria: 'Resize panel'
  },
  alertDialog: {
    confirm: 'Confirm',
    cancel: 'Cancel'
  },
  codeBlock: {
    region: 'Code region'
  },
  docs: {
    toc: 'On this page',
    prev: 'Previous',
    next: 'Next',
    copyLink: 'Copy link',
    copiedLink: 'Link copied',
    searchPlaceholder: 'Search documentation...'
  }
}
