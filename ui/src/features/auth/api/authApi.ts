import { api } from '../../../shared/lib/axios'
import type { LoginRequest, RegisterRequest, AuthResponse } from '../types'

interface ApiResponse<T> {
  status: string
  message: string
  data: T
}

export const authApi = {
  login: (data: LoginRequest) =>
    api.post<ApiResponse<AuthResponse>>('/api/auth/login', data).then(r => r.data.data),

  register: (data: RegisterRequest) =>
    api.post<ApiResponse<AuthResponse>>('/api/auth/register', data).then(r => r.data.data),

  logout: () =>
    api.post('/api/auth/logout').then(r => r.data),
}
