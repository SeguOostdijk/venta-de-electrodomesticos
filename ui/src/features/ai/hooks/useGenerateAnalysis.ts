import { useMutation } from '@tanstack/react-query'
import { aiApi } from '../api/aiApi'

export function useGenerateAnalysis() {
  return useMutation({
    mutationFn: (period: 'week' | 'month') => aiApi.generateAnalysis(period),
  })
}
