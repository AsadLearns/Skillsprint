import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  timeout: 60000,
})

// ponytail: free-tier Render sleeps after ~15 min idle and takes 30-60s to wake.
// Ping the health root as soon as the app loads so the server warms up while the
// user is still on the landing page, instead of when they hit "Log in".
fetch(api.defaults.baseURL.replace(/\/api\/?$/, '/')).catch(() => {})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized request. Logging out user...");
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      if (
        window.location.pathname !== '/login' && 
        window.location.pathname !== '/signup' && 
        window.location.pathname !== '/'
      ) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export default api