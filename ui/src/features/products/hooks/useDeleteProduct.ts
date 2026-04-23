import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '../api/productsApi'

export function useDeleteProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: number) => productsApi.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  })
}
