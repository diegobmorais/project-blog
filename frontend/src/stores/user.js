import { defineStore } from "pinia"
import axios from "axios"
import { useNotificationStore } from "./notification"

export const useUserStore = defineStore("user", {
  state: () => ({
    users: [],
    user: null,
    loading: false,
    error: null,
  }),

  actions: {
    async fetchUsers() {
      this.loading = true

      try {
        const response = await axios.get("/users")
        this.users = response.data.data
        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to fetch users"
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchUser(id) {
      this.loading = true

      try {
        const response = await axios.get(`/users/${id}`)
        this.user = response.data.data
        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to fetch user"
        throw error
      } finally {
        this.loading = false
      }
    },

    async createUser(userData) {
      const notificationStore = useNotificationStore()
      this.loading = true

      try {
        const formData = new FormData()

        // Append text fields
        Object.keys(userData).forEach((key) => {
          if (key !== "avatar") {
            formData.append(key, userData[key])
          }
        })

        // Append file
        if (userData.avatar) {
          formData.append("avatar", userData.avatar)
        }

        const response = await axios.post("/users", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        // Add to local state
        this.users.push(response.data.data)

        notificationStore.add({
          type: "success",
          message: "User created successfully!",
        })

        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to create user"
        notificationStore.add({
          type: "error",
          message: this.error,
        })
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateUser(id, userData) {
      const notificationStore = useNotificationStore()
      this.loading = true

      try {
        const formData = new FormData()
        formData.append("_method", "PUT")

        // Append text fields
        Object.keys(userData).forEach((key) => {
          if (key !== "avatar") {
            formData.append(key, userData[key])
          }
        })

        // Append file
        if (userData.avatar && userData.avatar instanceof File) {
          formData.append("avatar", userData.avatar)
        }

        const response = await axios.post(`/users/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        // Update in local state
        const index = this.users.findIndex((user) => user.id === id)
        if (index !== -1) {
          this.users[index] = response.data.data
        }

        notificationStore.add({
          type: "success",
          message: "User updated successfully!",
        })

        return response.data.data
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to update user"
        notificationStore.add({
          type: "error",
          message: this.error,
        })
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteUser(id) {
      const notificationStore = useNotificationStore()
      this.loading = true

      try {
        await axios.delete(`/users/${id}`)

        // Remove from local state
        this.users = this.users.filter((user) => user.id !== id)

        notificationStore.add({
          type: "success",
          message: "User deleted successfully!",
        })
      } catch (error) {
        this.error = error.response?.data?.message || "Failed to delete user"
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
