import { defineStore } from "pinia"
import axios from "axios"
import { useNotificationStore } from "./notification"

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: localStorage.getItem("token") || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    isAdmin: (state) => state.user?.role === "admin",
    isAuthor: (state) => state.user?.role === "author",
  },

  actions: {
    async login(credentials) {
      try {
        const response = await axios.post("/login", credentials)
        this.setUserData(response.data)
        return response.data
      } catch (error) {
        throw error
      }
    },

    async logout() {
      const notificationStore = useNotificationStore()

      try {
        if (this.token) {
          await axios.post("/logout")
        }
      } catch (error) {
        console.error("Logout error:", error)
      } finally {
        this.clearUserData()
        notificationStore.add({
          type: "success",
          message: "You have been logged out successfully.",
        })
      }
    },

    async checkAuth() {
      if (!this.token) return

      try {
        const response = await axios.get("/user")
        this.user = response.data
      } catch (error) {
        console.error("Auth check error:", error)
        this.clearUserData()
      }
    },

    setUserData(data) {
      this.user = data.user
      this.token = data.token
      localStorage.setItem("token", data.token)
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`
    },

    clearUserData() {
      this.user = null
      this.token = null
      localStorage.removeItem("token")
      delete axios.defaults.headers.common["Authorization"]
    },
  },
})
