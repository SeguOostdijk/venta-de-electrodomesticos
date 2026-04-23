import { useState } from 'react'
import { useUserCart } from '../features/cart/hooks/useUserCart'
import { useClearCart } from '../features/cart/hooks/useClearCart'
import { useCreateSale } from '../features/cart/hooks/useCreateSale'
import { CartItemRow } from '../features/cart/components/CartItemRow'
import { Link, useNavigate } from 'react-router-dom'

export default function CartPage() {
  const { data: cart, isLoading } = useUserCart()
  const { mutate: clearCart, isPending: isClearing } = useClearCart()
  const { mutate: createSale, isPending: isCheckingOut } = useCreateSale()
  const navigate = useNavigate()
  const [checkoutError, setCheckoutError] = useState<string | null>(null)

  const total = cart?.products?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ) ?? 0

  const itemCount = cart?.products?.length ?? 0

  function handleCheckout() {
    if (!cart) return
    setCheckoutError(null)
    createSale(cart.id, {
      onSuccess: () => navigate('/my-orders'),
      onError: () => setCheckoutError('No se pudo realizar la operación. Stock insuficiente.'),
    })
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!cart || itemCount === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <svg className="w-16 h-16 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p className="text-slate-500 text-sm">Tu carrito está vacío</p>
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Carrito</h1>
        <button
          onClick={() => clearCart(cart.id)}
          disabled={isClearing}
          className="text-sm text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
        >
          Vaciar carrito
        </button>
      </div>

      {/* Items */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm px-6">
        {cart.products.map((item, index) => (
          <CartItemRow key={`${item.id}-${index}`} item={item} cart={cart} />
        ))}
      </div>

      {/* Resumen */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-500">{itemCount} {itemCount === 1 ? 'producto' : 'productos'}</span>
          <span className="text-xl font-bold text-slate-900">${total.toLocaleString('es-AR')}</span>
        </div>
        {checkoutError && (
          <p className="text-sm text-red-500 text-center -mb-1">{checkoutError}</p>
        )}
        <button
          onClick={handleCheckout}
          disabled={isCheckingOut}
          className="w-full py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-colors disabled:opacity-50"
        >
          {isCheckingOut ? 'Procesando...' : 'Confirmar compra'}
        </button>
      </div>
    </div>
  )
}
