import axios from "axios"
window.axios = axios

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
window.axios.defaults.withCredentials = true
window.axios.defaults.baseURL = "/api"

// Add a response interceptor for handling token expiration
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Redirect to login page if token is expired
      window.location.href = "/login"
    }
    return Promise.reject(error)
  },
)
