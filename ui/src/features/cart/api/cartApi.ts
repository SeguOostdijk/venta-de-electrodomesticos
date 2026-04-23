import { api } from '../../../shared/lib/axios'
import type { Cart } from '../types'

export const cartApi = {
  getUserCart: () =>
    api.get<Cart>('/carts/user').then(r => r.data),

  addProduct: (cartId: number, productId: number, quantity = 1) =>
    api.post<Cart>(`/carts/${cartId}/products`, null, {
      params: { productId, quantity },
    }).then(r => r.data),

  removeProduct: (cartId: number, productId: number) =>
    api.delete(`/carts/${cartId}/products/${productId}`),

  updateQuantity: (cartId: number, productId: number, quantity: number) =>
    api.put(`/carts/${cartId}/products/${productId}`, null, {
      params: { quantity },
    }),

  clearCart: (cartId: number) =>
    api.delete(`/carts/${cartId}/products`),
}
