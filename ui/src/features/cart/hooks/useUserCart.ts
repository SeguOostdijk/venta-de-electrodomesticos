import { useQuery } from '@tanstack/react-query'
import { cartApi } from '../api/cartApi'
import { useAuth } from '../../auth/AuthContext'

export function useUserCart() {
  const { isAuthenticated } = useAuth()

  return useQuery({
    queryKey: ['cart', 'user'],
    queryFn: () => cartApi.getUserCart(),
    enabled: isAuthenticated,
  })
}
