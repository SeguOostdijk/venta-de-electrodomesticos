import { useState } from 'react'
import { useCreateProduct } from '../hooks/useCreateProduct'
import { useUpdateProduct } from '../hooks/useUpdateProduct'
import type { Product } from '../types'

interface ProductFormModalProps {
  product?: Product
  onClose: () => void
}

const inputClass =
  'w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500'
const labelClass = 'text-sm font-medium text-slate-700'

export function ProductFormModal({ product, onClose }: ProductFormModalProps) {
  const isEdit = product !== undefined

  const [form, setForm] = useState({
    name: product?.name ?? '',
    brand: product?.brand ?? '',
    price: product?.price ?? 0,
    stock: product?.stock ?? 0,
    description: product?.description ?? '',
    imageUrl: product?.imageUrl ?? '',
  })

  const create = useCreateProduct()
  const update = useUpdateProduct()

  const isPending = create.isPending || update.isPending

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value, type } = e.target
    setForm((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value,
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const data = {
      name: form.name,
      brand: form.brand,
      price: form.price,
      stock: form.stock,
      description: form.description || undefined,
      imageUrl: form.imageUrl || undefined,
    }

    if (isEdit) {
      update.mutate({ id: product.id, data }, { onSuccess: onClose })
    } else {
      create.mutate(data, { onSuccess: onClose })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-slate-900 mb-5">
          {isEdit ? 'Editar producto' : 'Nuevo producto'}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className={labelClass}>Nombre</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="brand" className={labelClass}>Marca</label>
            <input
              id="brand"
              name="brand"
              type="text"
              required
              value={form.brand}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="price" className={labelClass}>Precio</label>
              <input
                id="price"
                name="price"
                type="number"
                min={0}
                step="0.01"
                required
                value={form.price}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <label htmlFor="stock" className={labelClass}>Stock</label>
              <input
                id="stock"
                name="stock"
                type="number"
                min={0}
                required
                value={form.stock}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description" className={labelClass}>
              Descripción <span className="text-slate-400 font-normal">(opcional)</span>
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div className="flex justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-4 py-2 rounded-xl text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              {isPending ? 'Guardando...' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
