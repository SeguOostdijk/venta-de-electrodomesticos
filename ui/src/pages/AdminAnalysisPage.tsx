import { useState } from 'react'
import { useGenerateAnalysis } from '../features/ai/hooks/useGenerateAnalysis'
import { cn } from '../shared/lib/cn'

export default function AdminAnalysisPage() {
  const [period, setPeriod] = useState<'week' | 'month'>('week')
  const { mutate, data, isPending, isError } = useGenerateAnalysis()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Análisis
      </h1>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setPeriod('week')}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            period === 'week'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          )}
        >
          Última semana
        </button>
        <button
          onClick={() => setPeriod('month')}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-colors',
            period === 'month'
              ? 'bg-blue-600 text-white'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          )}
        >
          Último mes
        </button>
      </div>

      <button
        onClick={() => mutate(period)}
        disabled={isPending}
        className="px-5 py-2.5 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
      >
        {isPending ? 'Generando...' : 'Generar análisis'}
      </button>

      {isError && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <p className="text-red-500 text-sm">No se pudo generar el análisis. Intentá de nuevo.</p>
        </div>
      )}

      {!isError && !data && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <p className="text-slate-400 text-sm">El análisis aparecerá aquí...</p>
        </div>
      )}

      {data && (
        <div className="flex flex-col gap-4">
          {/* Resumen */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wide mb-3">Resumen ejecutivo</h2>
            <p className="text-slate-700 leading-relaxed">{data.summary}</p>
          </div>

          {/* Recomendaciones */}
          {data.recommendations?.length > 0 && (
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-4">Recomendaciones</h2>
              <ul className="flex flex-col gap-3">
                {data.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-slate-700 leading-relaxed">{rec}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
