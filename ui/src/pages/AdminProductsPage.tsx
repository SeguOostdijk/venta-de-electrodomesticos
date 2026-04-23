import { useState } from 'react'
import { useProducts } from '../features/products/hooks/useProducts'
import { useProductSearch } from '../features/products/hooks/useProductSearch'
import { useDeleteProduct } from '../features/products/hooks/useDeleteProduct'
import { ProductFormModal } from '../features/products/components/ProductFormModal'
import { SearchBar } from '../features/products/components/SearchBar'
import { Pagination } from '../features/products/components/Pagination'
import { cn } from '../shared/lib/cn'
import type { Product } from '../features/products/types'

export default function AdminProductsPage() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)
  const [modalProduct, setModalProduct] = useState<Product | undefined>(undefined)
  const [modalOpen, setModalOpen] = useState(false)

  const isSearching = query.trim().length > 0

  const all = useProducts(page)
  const searched = useProductSearch(query, page)

  const { data, isLoading } = isSearching ? searched : all

  const deleteProduct = useDeleteProduct()

  function openCreate() {
    setModalProduct(undefined)
    setModalOpen(true)
  }

  function openEdit(product: Product) {
    setModalProduct(product)
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
  }

  function handleSearch(q: string) {
    setQuery(q)
    setPage(0)
  }

  function handleDelete(id: number) {
    if (!window.confirm('¿Seguro que querés eliminar este producto?')) return
    deleteProduct.mutate(id)
  }

  const products = data?.content ?? []
  const totalPages = data?.totalPages ?? 0

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Productos
          </h1>
          <button
            onClick={openCreate}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            + Nuevo producto
          </button>
        </div>

        <div className="mb-4">
          <SearchBar onSearch={handleSearch} />
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Imagen</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Nombre</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Marca</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Precio</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Stock</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="px-4 py-3"><div className="w-10 h-10 rounded-lg bg-slate-200 animate-pulse" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-40 rounded bg-slate-200 animate-pulse" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-24 rounded bg-slate-200 animate-pulse" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-20 rounded bg-slate-200 animate-pulse" /></td>
                    <td className="px-4 py-3"><div className="h-5 w-14 rounded-full bg-slate-200 animate-pulse" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-28 rounded bg-slate-200 animate-pulse ml-auto" /></td>
                  </tr>
                ))
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-slate-500">
                    No hay productos
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3">
                      <img
                        src={`/images/products/${product.id}.png`}
                        alt={product.name}
                        className="w-10 h-10 object-contain bg-slate-50 rounded-lg"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-900">{product.name}</td>
                    <td className="px-4 py-3 text-slate-500">{product.brand}</td>
                    <td className="px-4 py-3 text-slate-900">
                      ${product.price.toLocaleString('es-AR')}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                          product.stock > 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        )}
                      >
                        {product.stock > 0 ? product.stock : 'Sin stock'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          onClick={() => openEdit(product)}
                          className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-500 hover:text-red-600 font-medium transition-colors"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="mt-6">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        )}
      </div>

      {modalOpen && (
        <ProductFormModal product={modalProduct} onClose={closeModal} />
      )}
    </div>
  )
}
