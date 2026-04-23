import { useMutation } from '@tanstack/react-query'
import { authApi } from '../api/authApi'
import { useAuth } from '../AuthContext'
import { useNavigate } from 'react-router-dom'
import type { RegisterRequest } from '../types'

export function useRegister() {
  const { setTokens } = useAuth()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (tokens) => {
      setTokens(tokens)
      navigate('/products')
    },
  })
}
