import { defineStore } from "pinia"
import axios from "axios"
import { useNotificationStore } from "./notification"

export const useSectionStore = defineStore("section", {
  state: () => ({
    sections: [],
    section: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchSections() {
      this.loading = true

      try {
        const response = await axios.get("/sections")
        this.sections = response.data.data
        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to fetch sections"
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchSection(slug) {
      this.loading = true

      try {
        const response = await axios.get(`/sections/${slug}`)
        this.section = response.data.data
        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to fetch section"
        throw error
      } finally {
        this.loading = false
      }
    },

    async createSection(sectionData) {
      const notificationStore = useNotificationStore()
      this.loading = true

      try {
        const formData = new FormData()

        // Append text fields
        Object.keys(sectionData).forEach((key) => {
          if (key !== "featured_image") {
            formData.append(key, sectionData[key])
          }
        })

        // Append file
        if (sectionData.featured_image) {
          formData.append("featured_image", sectionData.featured_image)
        }

        const response = await axios.post("/sections", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        // Add to local state
        this.sections.push(response.data.data)

        notificationStore.add({
          type: "success",
          message: "Section created successfully!",
        })

        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to create section"
        notificationStore.add({
          type: "error",
          message: this.error,
        })
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateSection(id, sectionData) {
      const notificationStore = useNotificationStore()
      this.loading = true

      try {
        const formData = new FormData()
        formData.append("_method", "PUT")

        // Append text fields
        Object.keys(sectionData).forEach((key) => {
          if (key !== "featured_image") {
            formData.append(key, sectionData[key])
          }
        })

        // Append file
        if (sectionData.featured_image && sectionData.featured_image instanceof File) {
          formData.append("featured_image", sectionData.featured_image)
        }

        const response = await axios.post(`/sections/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        // Update in local state
        const index = this.sections.findIndex((section) => section.id === id)
        if (index !== -1) {
          this.sections[index] = response.data.data
        }

        notificationStore.add({
          type: "success",
          message: "Section updated successfully!",
        })

        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to update section"
        notificationStore.add({
          type: "error",
          message: this.error,
        })
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteSection(id) {
      const notificationStore = useNotificationStore()
      this.loading = true

      try {
        await axios.delete(`/sections/${id}`)

        // Remove from local state
        this.sections = this.sections.filter((section) => section.id !== id)

        notificationStore.add({
          type: "success",
          message: "Section deleted successfully!",
        })
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to delete section"
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
