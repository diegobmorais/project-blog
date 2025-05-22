import { defineStore } from "pinia"
import axios from "axios"
import { useNotificationStore } from "./notification"

export const useArticleStore = defineStore("article", {
  state: () => ({
    articles: [],
    article: null,
    loading: false,
    error: null,
    pagination: {
      current_page: 1,
      last_page: 1,
      per_page: 15,
      total: 0,
    },
    filters: {
      status: null,
      section: null,
      author: null,
      search: null,
    },
  }),

  actions: {
    async fetchArticles(page = 1, perPage = 15) {
      this.loading = true

      try {
        const params = {
          page,
          per_page: perPage,
          ...this.filters,
        }

        const response = await axios.get("/articles", { params })
        this.articles = response.data.data
        this.pagination = {
          current_page: response.data.meta.current_page,
          last_page: response.data.meta.last_page,
          per_page: response.data.meta.per_page,
          total: response.data.meta.total,
        }

        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to fetch articles"
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchArticle(slug) {
      this.loading = true

      try {
        const response = await axios.get(`/articles/${slug}`)
        this.article = response.data.data
        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to fetch article"
        throw error
      } finally {
        this.loading = false
      }
    },

    async createArticle(articleData) {
      const notificationStore = useNotificationStore()
      this.loading = true

      try {
        const formData = new FormData()

        // Append text fields
        Object.keys(articleData).forEach((key) => {
          if (key !== "featured_image" && key !== "social_image" && key !== "section_ids") {
            formData.append(key, articleData[key])
          }
        })

        // Append section IDs
        if (articleData.section_ids) {
          articleData.section_ids.forEach((id) => {
            formData.append("section_ids[]", id)
          })
        }

        // Append files
        if (articleData.featured_image) {
          formData.append("featured_image", articleData.featured_image)
        }

        if (articleData.social_image) {
          formData.append("social_image", articleData.social_image)
        }

        const response = await axios.post("/articles", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        notificationStore.add({
          type: "success",
          message: "Article created successfully!",
        })

        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to create article"
        notificationStore.add({
          type: "error",
          message: this.error,
        })
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateArticle(id, articleData) {
      const notificationStore = useNotificationStore()
      this.loading = true

      try {
        const formData = new FormData()
        formData.append("_method", "PUT")

        // Append text fields
        Object.keys(articleData).forEach((key) => {
          if (key !== "featured_image" && key !== "social_image" && key !== "section_ids") {
            formData.append(key, articleData[key])
          }
        })

        // Append section IDs
        if (articleData.section_ids) {
          articleData.section_ids.forEach((id) => {
            formData.append("section_ids[]", id)
          })
        }

        // Append files
        if (articleData.featured_image && articleData.featured_image instanceof File) {
          formData.append("featured_image", articleData.featured_image)
        }

        if (articleData.social_image && articleData.social_image instanceof File) {
          formData.append("social_image", articleData.social_image)
        }

        const response = await axios.post(`/articles/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        notificationStore.add({
          type: "success",
          message: "Article updated successfully!",
        })

        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to update article"
        notificationStore.add({
          type: "error",
          message: this.error,
        })
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteArticle(id) {
      const notificationStore = useNotificationStore()
      this.loading = true

      try {
        await axios.delete(`/articles/${id}`)

        // Remove from local state
        this.articles = this.articles.filter((article) => article.id !== id)

        notificationStore.add({
          type: "success",
          message: "Article deleted successfully!",
        })
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to delete article"
        notificationStore.add({
          type: "error",
          message: this.error,
        })
        throw error
      } finally {
        this.loading = false
      }
    },

    async uploadContentImage(file) {
      try {
        const formData = new FormData()
        formData.append("image", file)

        const response = await axios.post("/articles/upload-image", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        return response.data.url
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to upload image"
        throw error
      }
    },

    setFilters(filters) {
      this.filters = { ...this.filters, ...filters }
    },

    clearFilters() {
      this.filters = {
        status: null,
        section: null,
        author: null,
        search: null,
      }
    },
  },
})
