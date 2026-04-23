import { useMutation } from '@tanstack/react-query'
import { authApi } from '../api/authApi'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'
import type { LoginRequest } from '../types'

export function useLogin() {
  const { setTokens } = useAuth()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (tokens) => {
      setTokens(tokens)
      import('jwt-decode').then(({ jwtDecode }) => {
        const payload = jwtDecode<{ role: string }>(tokens.accessToken)
        navigate(payload.role === 'ADMIN' ? '/admin/products' : '/products')
      })
    },
  })
}
