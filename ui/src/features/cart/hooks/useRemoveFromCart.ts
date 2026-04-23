import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cartApi } from '../api/cartApi'

export function useRemoveFromCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ cartId, productId }: { cartId: number; productId: number }) =>
      cartApi.removeProduct(cartId, productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', 'user'] })
    },
  })
}
