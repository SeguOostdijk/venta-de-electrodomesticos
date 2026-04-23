export interface CartItem {
  id: number
  name: string
  brand: string
  price: number
  quantity: number
}

export interface Cart {
  id: number
  userId: number
  totalPrice: number
  products: CartItem[]
}
