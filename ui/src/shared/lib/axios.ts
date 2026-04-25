import axios from 'axios'
import { tokenStore } from './tokenStore'

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080'

export const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = tokenStore.getAccess()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let isRefreshing = false
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: unknown) => void }> = []

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((p) => {
    if (error) p.reject(error)
    else p.resolve(token!)
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`
        return api(originalRequest)
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const refreshToken = tokenStore.getRefresh()
      if (!refreshToken) throw new Error('No refresh token')

      const { data } = await axios.post(`${API_URL}/api/auth/refresh`, { refreshToken })
      const tokens = data.data
      tokenStore.setAccess(tokens.accessToken)
      if (tokens.refreshToken) tokenStore.setRefresh(tokens.refreshToken)

      processQueue(null, tokens.accessToken)
      originalRequest.headers.Authorization = `Bearer ${tokens.accessToken}`
      return api(originalRequest)
    } catch (err) {
      processQueue(err, null)
      tokenStore.clear()
      window.location.href = '/login'
      return Promise.reject(err)
    } finally {
      isRefreshing = false
    }
  }
)
