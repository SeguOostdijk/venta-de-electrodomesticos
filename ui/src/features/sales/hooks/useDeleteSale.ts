import { useMutation, useQueryClient } from '@tanstack/react-query'
import { salesApi } from '../api/salesApi'

export function useDeleteSale() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => salesApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['sales'] }),
  })
}
