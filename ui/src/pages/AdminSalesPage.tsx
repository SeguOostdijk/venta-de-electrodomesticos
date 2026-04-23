import { useState } from 'react'
import { useAllSales } from '../features/sales/hooks/useAllSales'
import { useSalesByDate } from '../features/sales/hooks/useSalesByDate'
import { useDeleteSale } from '../features/sales/hooks/useDeleteSale'
import type { Sale } from '../features/sales/types'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleString('es-AR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <tr key={i} className="border-b border-slate-200">
          {Array.from({ length: 6 }).map((_, j) => (
            <td key={j} className="px-4 py-3">
              <div className="h-4 bg-slate-200 rounded animate-pulse" />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}

interface ProductRowProps {
  productId: number
  name: string
  brand: string
  quantity: number
  price: number
}

function ProductRow({ productId, name, brand, quantity, price }: ProductRowProps) {
  const subtotal = quantity * price

  return (
    <div className="flex items-center gap-3 py-1">
      <img
        src={`/images/products/${productId}.png`}
        alt={name}
        className="w-8 h-8 object-contain bg-slate-50 rounded"
        onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
      />
      <span className="flex-1 text-sm text-slate-700">{name}</span>
      <span className="text-xs text-slate-500">{brand}</span>
      <span className="text-xs text-slate-500">{quantity} × ${price.toLocaleString('es-AR')}</span>
      <span className="text-sm font-medium text-slate-900 w-24 text-right">
        ${subtotal.toLocaleString('es-AR')}
      </span>
    </div>
  )
}

interface SaleRowProps {
  sale: Sale
  expanded: boolean
  onToggle: () => void
  onDelete: (id: number) => void
  isDeleting: boolean
}

function SaleRow({ sale, expanded, onToggle, onDelete, isDeleting }: SaleRowProps) {
  return (
    <>
      <tr
        className="border-b border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
        onClick={onToggle}
      >
        <td className="px-4 py-3 text-xs text-slate-400">#{sale.id}</td>
        <td className="px-4 py-3 text-xs text-slate-400">#{sale.userId}</td>
        <td className="px-4 py-3 text-sm text-slate-700">{formatDate(sale.date)}</td>
        <td className="px-4 py-3 text-sm text-slate-700">{sale.products.length}</td>
        <td className="px-4 py-3 text-sm font-medium text-slate-900">
          ${sale.totalPrice.toLocaleString('es-AR')}
        </td>
        <td
          className="px-4 py-3"
          onClick={e => e.stopPropagation()}
        >
          <button
            className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors disabled:opacity-50"
            disabled={isDeleting}
            onClick={() => {
              if (window.confirm(`¿Eliminar la venta #${sale.id}?`)) {
                onDelete(sale.id)
              }
            }}
          >
            Eliminar
          </button>
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-slate-200 bg-slate-50">
          <td colSpan={6} className="px-8 py-3">
            <div className="flex flex-col gap-1">
              {sale.products.map(p => (
                <ProductRow
                  key={p.productId}
                  productId={p.productId}
                  name={p.name}
                  brand={p.brand}
                  quantity={p.quantity}
                  price={p.price}
                />
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export default function AdminSalesPage() {
  const [date, setDate] = useState('')
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set())

  const allSales = useAllSales()
  const salesByDate = useSalesByDate(date)
  const deleteSale = useDeleteSale()

  const { data: sales, isLoading } = date ? salesByDate : allSales

  function toggleRow(id: number) {
    setExpandedIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Ventas
        </h1>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {date && (
            <button
              onClick={() => setDate('')}
              className="px-3 py-2 text-sm text-slate-500 hover:text-slate-700 border border-slate-200 rounded-lg transition-colors"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Usuario</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Fecha</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Productos</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <SkeletonRows />
            ) : !sales || sales.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                  No hay ventas para mostrar
                </td>
              </tr>
            ) : (
              sales.map(sale => (
                <SaleRow
                  key={sale.id}
                  sale={sale}
                  expanded={expandedIds.has(sale.id)}
                  onToggle={() => toggleRow(sale.id)}
                  onDelete={id => deleteSale.mutate(id)}
                  isDeleting={deleteSale.isPending}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
