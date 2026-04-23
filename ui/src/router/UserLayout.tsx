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
          <Link to="/products" className="text-xl font-bold text-blue-600">
            ElectroShop
          </Link>
          <nav className="flex items-center gap-6">
            <Link to="/products" className="text-sm text-slate-600 hover:text-slate-900">
              Productos
            </Link>
            <Link to="/cart" className="relative text-sm text-slate-600 hover:text-slate-900 flex items-center gap-1">
              Carrito
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-semibold leading-none">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link to="/my-orders" className="text-sm text-slate-600 hover:text-slate-900">
              Mis pedidos
            </Link>
            <button
              onClick={handleLogout}
              className="text-sm text-slate-500 hover:text-red-500"
            >
              Salir
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
