import { useQuery } from '@tanstack/react-query'
import { salesApi } from '../api/salesApi'
import { useAuth } from '../../auth/AuthContext'

export function useMySales() {
  const { isAuthenticated } = useAuth()

  return useQuery({
    queryKey: ['sales', 'my'],
    queryFn: () => salesApi.getMySales(),
    enabled: isAuthenticated,
  })
}
