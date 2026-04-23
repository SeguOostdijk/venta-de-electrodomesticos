import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../api/productsApi'

export function useProductSearch(q: string, page: number, size = 12) {
  return useQuery({
    queryKey: ['products', 'search', q, page, size],
    queryFn: () => productsApi.search(q, page, size),
    enabled: q.trim().length > 0,
  })
}
