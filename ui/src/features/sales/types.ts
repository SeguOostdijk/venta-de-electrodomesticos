export interface SaleProduct {
  productId: number
  name: string
  brand: string
  price: number
  quantity: number
}

export interface Sale {
  id: number
  userId: number
  date: string
  totalPrice: number
  products: SaleProduct[]
}
