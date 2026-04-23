import { useParams } from 'react-router-dom'
import { useProduct } from '../features/products/hooks/useProduct'
import { useUserCart } from '../features/cart/hooks/useUserCart'
import { useAddToCart } from '../features/cart/hooks/useAddToCart'
import { useAuth } from '../features/auth/AuthContext'

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const productId = Number(id)

  const { data: product, isLoading, isError } = useProduct(productId)
  const { data: cart } = useUserCart()
  const { mutate: addToCart } = useAddToCart()
  const { role } = useAuth()

  const hasStock = (product?.stock ?? 0) > 0
  const inCart = cart?.products?.some(p => p.id === productId) ?? false

  function handleAddToCart() {
    if (!cart || !product) return
    addToCart({ cartId: cart.id, productId: product.id, quantity: 1 })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (isError || !product) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-500">No se pudo cargar el producto.</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto flex items-center min-h-[calc(100vh-8rem)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
        {/* Imagen */}
        <div className="bg-slate-50 rounded-2xl p-10 flex items-center justify-center aspect-square">
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
            <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-4 py-2">
          <div>
            <p className="text-sm font-medium text-slate-400 uppercase tracking-wide">{product.brand}</p>
            <h1 className="text-2xl font-bold text-slate-900 mt-1">{product.name}</h1>
          </div>

          <p className="text-3xl font-bold text-slate-900">
            ${product.price.toLocaleString('es-AR')}
          </p>

          <p className={hasStock ? 'text-sm text-green-600 font-medium' : 'text-sm text-red-500 font-medium'}>
            {hasStock ? `${product.stock} en stock` : 'Sin stock'}
          </p>

          {product.description && (
            <p className="text-sm text-slate-600 leading-relaxed">{product.description}</p>
          )}

          {role === 'USER' && (
            <button
              onClick={handleAddToCart}
              disabled={!hasStock || inCart}
              className={
                inCart
                  ? 'mt-2 w-full py-3 px-6 rounded-xl text-sm font-medium bg-slate-100 text-slate-500 cursor-default'
                  : hasStock
                    ? 'mt-2 w-full py-3 px-6 rounded-xl text-sm font-medium bg-orange-500 hover:bg-orange-600 text-white cursor-pointer transition-colors'
                    : 'mt-2 w-full py-3 px-6 rounded-xl text-sm font-medium bg-slate-100 text-slate-400 cursor-not-allowed'
              }
            >
              {inCart ? 'En carrito' : hasStock ? 'Agregar al carrito' : 'Sin stock'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
