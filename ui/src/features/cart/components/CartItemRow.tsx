import { useRemoveFromCart } from '../hooks/useRemoveFromCart'
import { useUpdateCartQuantity } from '../hooks/useUpdateCartQuantity'
import type { CartItem, Cart } from '../types'

interface CartItemRowProps {
  item: CartItem
  cart: Cart
}

export function CartItemRow({ item, cart }: CartItemRowProps) {
  const { mutate: remove, isPending: isRemoving } = useRemoveFromCart()
  const { mutate: updateQuantity, isPending: isUpdating } = useUpdateCartQuantity()

  const isPending = isRemoving || isUpdating

  function handleDecrement() {
    if (item.quantity - 1 <= 0) {
      remove({ cartId: cart.id, productId: item.id })
    } else {
      updateQuantity({ cartId: cart.id, productId: item.id, quantity: item.quantity - 1 })
    }
  }

  function handleIncrement() {
    updateQuantity({ cartId: cart.id, productId: item.id, quantity: item.quantity + 1 })
  }

  return (
    <div className="flex items-center gap-4 py-4 border-b border-slate-100 last:border-0">
      {/* Imagen */}
      <div className="w-16 h-16 bg-slate-50 rounded-xl flex-shrink-0 overflow-hidden flex items-center justify-center p-1">
        <img
          src={`/images/products/${item.id}.png`}
          alt={item.name}
          className="w-full h-full object-contain"
          onError={(e) => {
            const target = e.currentTarget
            target.style.display = 'none'
            ;(target.nextElementSibling as HTMLElement)?.classList.remove('hidden')
          }}
        />
        <svg className="hidden w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-400 font-medium uppercase tracking-wide">{item.brand}</p>
        <p className="text-sm font-semibold text-slate-900 truncate">{item.name}</p>
        <p className="text-xs text-slate-500 mt-0.5">
          ${item.price.toLocaleString('es-AR')} × {item.quantity}
        </p>
      </div>

      {/* Controles de cantidad + subtotal */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={handleDecrement}
            disabled={isPending}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <span className="text-sm font-medium leading-none">−</span>
          </button>
          <span className="w-6 text-center text-sm font-semibold text-slate-900">
            {item.quantity}
          </span>
          <button
            onClick={handleIncrement}
            disabled={isPending}
            className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <span className="text-sm font-medium leading-none">+</span>
          </button>
        </div>
        <span className="text-sm font-bold text-slate-900">
          ${(item.price * item.quantity).toLocaleString('es-AR')}
        </span>
      </div>
    </div>
  )
}
