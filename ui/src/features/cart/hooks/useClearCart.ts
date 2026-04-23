import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cartApi } from '../api/cartApi'

export function useClearCart() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (cartId: number) => cartApi.clearCart(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart', 'user'] })
    },
  })
}
