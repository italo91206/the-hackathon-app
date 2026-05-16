export type NotificationType = 'success' | 'error' | 'warning' | 'info'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message?: string
  duration?: number
}

const notifications = ref<Notification[]>([])

export function useNotification() {
  function add(notification: Omit<Notification, 'id'>): string {
    const id = crypto.randomUUID()
    const duration = notification.duration ?? 4000

    notifications.value.push({ ...notification, id })

    if (duration > 0) {
      setTimeout(() => remove(id), duration)
    }

    return id
  }

  function remove(id: string) {
    const index = notifications.value.findIndex((n) => n.id === id)
    if (index !== -1) {
      notifications.value.splice(index, 1)
    }
  }

  function success(title: string, message?: string) {
    return add({ type: 'success', title, message })
  }

  function error(title: string, message?: string) {
    return add({ type: 'error', title, message, duration: 6000 })
  }

  function warning(title: string, message?: string) {
    return add({ type: 'warning', title, message })
  }

  function info(title: string, message?: string) {
    return add({ type: 'info', title, message })
  }

  return {
    notifications: readonly(notifications),
    add,
    remove,
    success,
    error,
    warning,
    info,
  }
}
