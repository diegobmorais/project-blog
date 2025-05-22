import { defineStore } from "pinia"

export const useNotificationStore = defineStore("notification", {
  state: () => ({
    notifications: [],
    nextId: 1,
  }),

  actions: {
    add(notification) {
      const id = this.nextId++
      const timeout = notification.timeout || 5000

      this.notifications.push({
        id,
        type: notification.type || "info",
        message: notification.message,
        timeout,
      })

      if (timeout > 0) {
        setTimeout(() => {
          this.remove(id)
        }, timeout)
      }

      return id
    },

    remove(id) {
      const index = this.notifications.findIndex((n) => n.id === id)
      if (index !== -1) {
        this.notifications.splice(index, 1)
      }
    },

    clear() {
      this.notifications = []
    },
  },
})
