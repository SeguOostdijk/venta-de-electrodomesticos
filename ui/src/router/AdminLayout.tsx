import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../features/auth/AuthContext'

export function AdminLayout() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-56 bg-white border-r border-slate-200 min-h-screen flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-slate-200">
          <span className="text-base font-bold text-blue-600">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          <Link
            to="/admin/products"
            className="px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            Productos
          </Link>
          <Link
            to="/admin/sales"
            className="px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            Ventas
          </Link>
          <Link
            to="/admin/analysis"
            className="px-3 py-2 rounded-md text-sm text-slate-600 hover:bg-slate-100 hover:text-slate-900"
          >
            Análisis
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-200">
          <button
            onClick={handleLogout}
            className="w-full px-3 py-2 rounded-md text-sm text-slate-500 hover:bg-red-50 hover:text-red-500 text-left"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center px-6">
          <h1 className="text-sm font-medium text-slate-500">Panel de administración</h1>
        </header>
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
