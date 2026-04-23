import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ProtectedRoute } from './ProtectedRoute'
import { UserLayout } from './UserLayout'
import { AdminLayout } from './AdminLayout'

const LoginPage = lazy(() => import('../pages/LoginPage'))
const RegisterPage = lazy(() => import('../pages/RegisterPage'))
const ProductsPage = lazy(() => import('../pages/ProductsPage'))
const CartPage = lazy(() => import('../pages/CartPage'))
const MyOrdersPage = lazy(() => import('../pages/MyOrdersPage'))
const AdminProductsPage = lazy(() => import('../pages/AdminProductsPage'))
const AdminSalesPage = lazy(() => import('../pages/AdminSalesPage'))
const AdminAnalysisPage = lazy(() => import('../pages/AdminAnalysisPage'))
const ProductDetailPage = lazy(() => import('../pages/ProductDetailPage'))

const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
  </div>
)

export const router = createBrowserRouter([
  { path: '/login', element: <Suspense fallback={<Loading />}><LoginPage /></Suspense> },
  { path: '/register', element: <Suspense fallback={<Loading />}><RegisterPage /></Suspense> },
  {
    element: <ProtectedRoute allowedRoles={['USER', 'ADMIN']} />,
    children: [
      {
        element: <UserLayout />,
        children: [
          { path: '/products', element: <Suspense fallback={<Loading />}><ProductsPage /></Suspense> },
          { path: '/products/:id', element: <Suspense fallback={<Loading />}><ProductDetailPage /></Suspense> },
          { path: '/cart', element: <Suspense fallback={<Loading />}><CartPage /></Suspense> },
          { path: '/my-orders', element: <Suspense fallback={<Loading />}><MyOrdersPage /></Suspense> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute allowedRoles={['ADMIN']} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: '/admin/products', element: <Suspense fallback={<Loading />}><AdminProductsPage /></Suspense> },
          { path: '/admin/sales', element: <Suspense fallback={<Loading />}><AdminSalesPage /></Suspense> },
          { path: '/admin/analysis', element: <Suspense fallback={<Loading />}><AdminAnalysisPage /></Suspense> },
        ],
      },
    ],
  },
  { path: '/', element: <Navigate to="/login" replace /> },
  { path: '*', element: <Navigate to="/login" replace /> },
])
