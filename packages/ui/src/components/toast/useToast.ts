import { ref } from 'vue'

export interface ToastOptions {
  id?: string
  title?: string
  description?: string
  variant?: 'info' | 'success' | 'warning' | 'destructive'
  duration?: number
}

const toasts = ref<ToastOptions[]>([])

export function useToast() {
  function toast(options: ToastOptions) {
    const id = options.id || Math.random().toString(36).substring(2, 9)
    const duration = options.duration ?? 4000

    const newToast: ToastOptions = {
      ...options,
      id,
      variant: options.variant || 'info'
    }

    toasts.value.push(newToast)

    if (duration > 0) {
      setTimeout(() => {
        dismiss(id)
      }, duration)
    }

    return id
  }

  function dismiss(id: string) {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }

  return {
    toasts,
    toast,
    dismiss
  }
}
