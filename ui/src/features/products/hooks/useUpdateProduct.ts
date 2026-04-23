import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '../api/productsApi'
import type { Product } from '../types'

export function useUpdateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Omit<Product, 'id'> }) =>
      productsApi.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  })
}
