import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthContext'
import { useUserCart } from '../features/cart/hooks/useUserCart'

export function UserLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { data: cart } = useUserCart()
  const cartCount = cart?.products?.length ?? 0

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/products" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <span className="text-xl font-bold">ElectroShop</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/products" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Productos
            </Link>
            <Link to="/cart" className="relative text-sm text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1">
              Carrito
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-semibold leading-none">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/my-orders" className="text-sm text-slate-600 hover:text-blue-600 transition-colors">
              Mis pedidos
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-slate-500 hover:text-red-500 transition-colors"
            >
              Cerrar sesión
            </button>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  )
}
