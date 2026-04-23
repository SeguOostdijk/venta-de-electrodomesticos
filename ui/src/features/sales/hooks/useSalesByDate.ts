import { useQuery } from '@tanstack/react-query'
import { salesApi } from '../api/salesApi'

export function useSalesByDate(date: string) {
  return useQuery({
    queryKey: ['sales', 'date', date],
    queryFn: () => salesApi.getByDate(date),
    enabled: !!date,
  })
}
