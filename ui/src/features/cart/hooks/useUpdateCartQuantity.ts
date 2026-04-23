import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cartApi } from '../api/cartApi'

export function useUpdateCartQuantity() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ cartId, productId, quantity }: { cartId: number; productId: number; quantity: number }) =>
      cartApi.updateQuantity(cartId, productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', 'user'] })
    },
  })
}
