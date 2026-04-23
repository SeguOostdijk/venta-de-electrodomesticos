import { api } from '../../../shared/lib/axios'

export const aiApi = {
  generateAnalysis: (period: 'week' | 'month') =>
    api.post<{ summary: string; recommendations: string[] }>('/ai/analysis', { period }).then(r => r.data),
}
