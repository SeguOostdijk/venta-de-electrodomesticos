import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../api/productsApi'

export function useProduct(id: number) {
  return useQuery({
    queryKey: ['products', id],
    queryFn: () => productsApi.findById(id),
    enabled: !!id,
  })
}
