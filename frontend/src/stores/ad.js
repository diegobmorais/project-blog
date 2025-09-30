import { defineStore } from "pinia"
import api from "@/plugins/api"
import { useNotificationStore } from "./notification"

export const useAdStore = defineStore("ad", {
  state: () => ({
    ads: [],
    ad: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAds() {
      this.loading = true

      try {
        const response = await api.get("/ads")
        this.ads = response.data.data
        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to fetch ads"
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchAd(id) {
      this.loading = true

      try {
        const response = await api.get(`/ads/${id}`)
        this.ad = response.data.data
        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to fetch ad"
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchAdByPosition(position) {
      this.loading = true

      try {
        const response = await api.get(`/ads/${position}`)
        return response.data.data
      } catch (error) {
        // Silently fail for public ad fetching
        console.error("Failed to fetch ad:", error)
        return null
      } finally {
        this.loading = false
      }
    },

    async createAd(adData) {
      const notificationStore = useNotificationStore()
      this.loading = true

      try {
        const response = await api.post("/ads", adData)

        // Add to local state
        this.ads.push(response.data.data)

        notificationStore.add({
          type: "success",
          message: "Advertisement created successfully!",
        })

        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to create advertisement"
        notificationStore.add({
          type: "error",
          message: this.error,
        })
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateAd(id, adData) {
      const notificationStore = useNotificationStore()
      this.loading = true

      try {
        const response = await api.put(`/ads/${id}`, adData)

        // Update in local state
        const index = this.ads.findIndex((ad) => ad.id === id)
        if (index !== -1) {
          this.ads[index] = response.data.data
        }

        notificationStore.add({
          type: "success",
          message: "Advertisement updated successfully!",
        })

        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to update advertisement"
        notificationStore.add({
          type: "error",
          message: this.error,
        })
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteAd(id) {
      const notificationStore = useNotificationStore()
      this.loading = true

      try {
        await api.delete(`/ads/${id}`)

        // Remove from local state
        this.ads = this.ads.filter((ad) => ad.id !== id)

        notificationStore.add({
          type: "success",
          message: "Advertisement deleted successfully!",
        })
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to delete advertisement"
        notificationStore.add({
          type: "error",
          message: this.error,
        })
        throw error
      } finally {
        this.loading = false
      }
    },
  },
})
