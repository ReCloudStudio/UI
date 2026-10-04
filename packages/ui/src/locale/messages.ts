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
  }
  tree: {
    selectedBadge: string
    collapseNode: (label: string) => string
    expandNode: (label: string) => string
    selectNode: (label: string) => string
    label: string
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
    noData: '暂无数据'
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
    statusCancelled: '已取消'
  },
  tree: {
    selectedBadge: '已选',
    collapseNode: (label) => `收起 ${label}`,
    expandNode: (label) => `展开 ${label}`,
    selectNode: (label) => `选择 ${label}`,
    label: '树形目录'
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
    noData: 'No data'
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
    statusCancelled: 'Cancelled'
  },
  tree: {
    selectedBadge: 'Selected',
    collapseNode: (label) => `Collapse ${label}`,
    expandNode: (label) => `Expand ${label}`,
    selectNode: (label) => `Select ${label}`,
    label: 'Tree View'
  }
}
