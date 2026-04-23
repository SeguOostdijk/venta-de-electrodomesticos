import { api } from '../../../shared/lib/axios'
import type { Sale } from '../types'

export const salesApi = {
  getMySales: () =>
    api.get<Sale[]>('/sales/my').then(r => r.data),

  getById: (id: number) =>
    api.get<Sale>(`/sales/${id}`).then(r => r.data),

  getAll: () =>
    api.get<Sale[]>('/sales').then(r => r.data),

  getByDate: (date: string) =>
    api.get<Sale[]>(`/sales/date/${date}`).then(r => r.data),

  remove: (id: number) =>
    api.delete(`/sales/${id}`).then(r => r.data),
}
