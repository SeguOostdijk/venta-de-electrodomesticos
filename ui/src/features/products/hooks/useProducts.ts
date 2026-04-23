import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../api/productsApi'

export function useProducts(page: number, size = 12) {
  return useQuery({
    queryKey: ['products', page, size],
    queryFn: () => productsApi.findAll(page, size),
  })
}
