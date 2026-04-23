import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '../api/productsApi'
import type { Product } from '../types'

export function useCreateProduct() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: Omit<Product, 'id'>) => productsApi.create(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
  })
}
