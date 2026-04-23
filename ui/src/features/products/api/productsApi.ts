import { api } from '../../../shared/lib/axios'
import type { Page } from '../../../shared/types/api'
import type { Product } from '../types'

export const productsApi = {
  findAll: (page = 0, size = 12) =>
    api.get<Page<Product>>('/products', { params: { page, size, sort: 'name' } }).then(r => r.data),

  search: (q: string, page = 0, size = 12) =>
    api.get<Page<Product>>('/products/search', { params: { q, page, size } }).then(r => r.data),

  findById: (id: number) =>
    api.get<Product>(`/products/${id}`).then(r => r.data),

  create: (data: Omit<Product, 'id'>) =>
    api.post<Product>('/products', data).then(r => r.data),

  update: (id: number, data: Omit<Product, 'id'>) =>
    api.put<Product>(`/products?id=${id}`, data).then(r => r.data),

  remove: (id: number) =>
    api.delete(`/products?id=${id}`).then(r => r.data),
}
