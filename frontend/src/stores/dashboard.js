import { defineStore } from "pinia"
import api from "@/plugins/axios"

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    stats: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchStats() {
      this.loading = true

      try {
        const response = await api.get("/dashboard")
        this.stats = response.data
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to fetch dashboard statistics"
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
