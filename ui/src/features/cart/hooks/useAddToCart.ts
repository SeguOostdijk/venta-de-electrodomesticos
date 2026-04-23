import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cartApi } from '../api/cartApi'

export function useAddToCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ cartId, productId, quantity = 1 }: { cartId: number; productId: number; quantity?: number }) =>
      cartApi.addProduct(cartId, productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', 'user'] })
    },
  })
}
