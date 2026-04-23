import { useState } from 'react'
import { useProducts } from '../features/products/hooks/useProducts'
import { useProductSearch } from '../features/products/hooks/useProductSearch'
import { ProductCard } from '../features/products/components/ProductCard'
import { SearchBar } from '../features/products/components/SearchBar'
import { Pagination } from '../features/products/components/Pagination'
import type { Product } from '../features/products/types'
import { useUserCart } from '../features/cart/hooks/useUserCart'
import { useAddToCart } from '../features/cart/hooks/useAddToCart'

export default function ProductsPage() {
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(0)

  const isSearching = query.trim().length > 0

  const browseResult = useProducts(page)
  const searchResult = useProductSearch(query, page)

  const { data, isLoading, isError } = isSearching ? searchResult : browseResult

  const { data: cart } = useUserCart()
  const { mutate: addToCart } = useAddToCart()

  function handleSearch(q: string) {
    setQuery(q)
    setPage(0)
  }

  function handleAddToCart(product: Product) {
    if (!cart) return
    addToCart({ cartId: cart.id, productId: product.id, quantity: 1 })
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Productos</h1>
          {data && (
            <p className="text-sm text-slate-500 mt-1">
              {data.totalElements} {data.totalElements === 1 ? 'resultado' : 'resultados'}
              {isSearching && ` para "${query}"`}
            </p>
          )}
        </div>
        <div className="w-full sm:w-80">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Estados */}
      {isLoading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white border border-slate-200 rounded-2xl overflow-hidden animate-pulse">
              <div className="bg-slate-100 aspect-square" />
              <div className="p-4 flex flex-col gap-3">
                <div className="h-3 bg-slate-100 rounded w-1/3" />
                <div className="h-4 bg-slate-100 rounded w-3/4" />
                <div className="h-8 bg-slate-100 rounded mt-2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="text-center py-16">
          <p className="text-slate-500">No se pudieron cargar los productos.</p>
        </div>
      )}

      {!isLoading && !isError && data && (
        <>
          {data.content.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-500">
                {isSearching ? `Sin resultados para "${query}"` : 'No hay productos disponibles.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {data.content.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  inCart={cart?.products?.some(p => p.id === product.id) ?? false}
                />
              ))}
            </div>
          )}

          <Pagination
            currentPage={data.number}
            totalPages={data.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  )
}
