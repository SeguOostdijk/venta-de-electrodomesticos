import { useMySales } from '../features/sales/hooks/useMySales'
import { SaleCard } from '../features/sales/components/SaleCard'
import { Link } from 'react-router-dom'

export default function MyOrdersPage() {
  const { data: sales, isLoading, isError } = useMySales()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">No se pudieron cargar tus pedidos.</p>
      </div>
    )
  }

  if (!sales || sales.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <svg className="w-16 h-16 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <p className="text-slate-500 text-sm">Todavía no tenés pedidos</p>
        <Link
          to="/products"
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium transition-colors"
        >
          Ver productos
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Mis pedidos</h1>
        <p className="text-sm text-slate-500 mt-1">
          {sales.length} {sales.length === 1 ? 'pedido' : 'pedidos'} realizados
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {sales.map((sale) => (
          <SaleCard key={sale.id} sale={sale} />
        ))}
      </div>
    </div>
  )
}
