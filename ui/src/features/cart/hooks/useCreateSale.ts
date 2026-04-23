import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../../shared/lib/axios'

export function useCreateSale() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (cartId: number) =>
      api.post(`/sales/${cartId}`).then(r => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', 'user'] })
      queryClient.invalidateQueries({ queryKey: ['sales', 'my'] })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
  })
}
