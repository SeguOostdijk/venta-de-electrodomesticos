import { useState } from 'react'
import { cn } from '../../../shared/lib/cn'
import type { Sale } from '../types'

interface SaleCardProps {
  sale: Sale
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function SaleCard({ sale }: SaleCardProps) {
  const [expanded, setExpanded] = useState(false)
  const itemCount = sale.products?.length ?? 0

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-xs font-semibold bg-green-50 text-green-700 px-2.5 py-1 rounded-full">
            Completado
          </span>
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-900">Orden #{sale.id}</p>
            <p className="text-xs text-slate-500 mt-0.5">{formatDate(sale.date)}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-bold text-slate-900">${sale.totalPrice?.toLocaleString('es-AR') ?? '—'}</p>
            <p className="text-xs text-slate-500">{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</p>
          </div>
          <svg
            className={cn('w-4 h-4 text-slate-400 transition-transform', expanded && 'rotate-180')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Detalle expandible */}
      {expanded && (
        <div className="border-t border-slate-100 px-6 py-4 flex flex-col gap-3">
          {sale.products?.map((item, index) => (
            <div key={`${item.productId}-${index}`} className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-50 rounded-lg flex-shrink-0 flex items-center justify-center p-1">
                <img
                  src={`/images/products/${item.productId}.png`}
                  alt={item.name}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.currentTarget
                    target.style.display = 'none'
                    ;(target.nextElementSibling as HTMLElement)?.classList.remove('hidden')
                  }}
                />
                <svg className="hidden w-5 h-5 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400 uppercase tracking-wide">{item.brand}</p>
                <p className="text-sm font-medium text-slate-900 truncate">{item.name}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-semibold text-slate-900">${(item.price * item.quantity).toLocaleString('es-AR')}</p>
                <p className="text-xs text-slate-500">×{item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
