import { defineStore } from "pinia"
import axios from "axios"

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
        const response = await axios.get("/dashboard")
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
