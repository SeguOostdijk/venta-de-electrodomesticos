import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { cn } from '../../../shared/lib/cn'
import type { Product } from '../types'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  onEdit?: (product: Product) => void
  inCart?: boolean
}

export function ProductCard({ product, onAddToCart, onEdit, inCart = false }: ProductCardProps) {
  const { role } = useAuth()
  const hasStock = product.stock > 0

  return (
    <Link
      to={`/products/${product.id}`}
      className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col hover:shadow-md hover:border-slate-300 hover:-translate-y-1 transition-all duration-200"
    >
      {/* Imagen */}
      <div className="relative bg-slate-50 aspect-square flex items-center justify-center p-4">
        <img
          src={`/images/products/${product.id}.png`}
          alt={product.name}
          className="w-full h-full object-contain"
          onError={(e) => {
            const target = e.currentTarget
            target.style.display = 'none'
            target.nextElementSibling?.removeAttribute('hidden')
          }}
        />
        <div hidden className="flex flex-col items-center gap-2 text-slate-300">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        {role === 'ADMIN' && onEdit && (
          <button
            onClick={(e) => { e.preventDefault(); onEdit(product) }}
            className="absolute top-2 right-2 bg-white border border-slate-200 rounded-lg px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 shadow-sm"
          >
            Editar
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{product.brand}</p>
          <h3 className="text-sm font-semibold text-slate-900 mt-0.5 line-clamp-2">{product.name}</h3>
        </div>

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-slate-900">
              ${product.price.toLocaleString('es-AR')}
            </span>
            <span className={cn(
              'text-xs font-medium',
              hasStock ? 'text-green-600' : 'text-red-500'
            )}>
              {hasStock ? `${product.stock} en stock` : 'Sin stock'}
            </span>
          </div>

          <button
            onClick={(e) => { e.preventDefault(); !inCart && onAddToCart?.(product) }}
            disabled={!hasStock}
            className={cn(
              'w-full py-2 px-4 rounded-xl text-sm font-medium transition-colors',
              inCart
                ? 'bg-slate-100 text-slate-500 cursor-default'
                : hasStock
                  ? 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            )}
          >
            {inCart ? 'En carrito' : hasStock ? 'Agregar al carrito' : 'Sin stock'}
          </button>
        </div>
      </div>
    </Link>
  )
}
