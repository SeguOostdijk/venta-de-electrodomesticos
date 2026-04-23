import { useQuery } from '@tanstack/react-query'
import { salesApi } from '../api/salesApi'

export function useAllSales() {
  return useQuery({
    queryKey: ['sales', 'all'],
    queryFn: () => salesApi.getAll(),
  })
}
