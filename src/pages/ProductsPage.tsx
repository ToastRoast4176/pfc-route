import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from 'react'
import { Link } from 'react-router-dom'
import type {
  Product,
  ProductCategory,
} from '../models/Product'
import {
  getProducts,
  saveProducts,
} from '../services/productStorage'

type ProductFormData = {
  name: string
  code: string
  upc: string
  size: string
  casePack: string
  unitPrice: string
  category: ProductCategory
}
type ProductStatusFilter = 'active' | 'inactive' | 'all'
const emptyForm: ProductFormData = {
  name: '',
  code: '',
  upc: '',
  size: '',
  casePack: '',
  unitPrice: '',
  category: 'Grocery',
}

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(getProducts)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<ProductFormData>(emptyForm)
  const [error, setError] = useState('')
  const [editingProductId, setEditingProductId] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] =
  useState<ProductStatusFilter>('active')

  useEffect(() => {
    saveProducts(products)
  }, [products])

  const filteredProducts = useMemo(() => {
  const query = search.trim().toLowerCase()

  return products.filter((product) => {
    const matchesSearch =
      !query ||
      [product.name, product.code, product.upc]
        .filter(Boolean)
        .some((value) => value!.toLowerCase().includes(query))

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && product.isActive) ||
      (statusFilter === 'inactive' && !product.isActive)

    return matchesSearch && matchesStatus
  })
}, [products, search, statusFilter])

  function updateForm(
    field: keyof ProductFormData,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }
function startEditing(product: Product) {
  setEditingProductId(product.id)
  setForm({
    name: product.name,
    code: product.code ?? '',
    upc: product.upc ?? '',
    size: product.size ?? '',
    casePack: String(product.casePack),
    unitPrice: String(product.unitPrice),
    category: product.category,
  })
  setError('')
  setShowForm(true)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
function toggleProductStatus(productId: string) {
  setProducts((current) =>
    current.map((product) =>
      product.id === productId
        ? {
            ...product,
            isActive: !product.isActive,
          }
        : product,
    ),
  )
}
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    const casePack = Number(form.casePack)
    const unitPrice = Number(form.unitPrice)

    if (!form.name.trim()) {
      setError('Product name is required.')
      return
    }

    if (!Number.isInteger(casePack) || casePack <= 0) {
      setError('Case pack must be a whole number greater than zero.')
      return
    }

    if (!Number.isFinite(unitPrice) || unitPrice < 0) {
      setError('Enter a valid unit price.')
      return
    }

    const productData = {
  name: form.name.trim(),
  code: form.code.trim() || undefined,
  upc: form.upc.trim() || undefined,
  size: form.size.trim() || undefined,
  casePack,
  unitPrice,
  category: form.category,
}

if (editingProductId) {
  setProducts((current) =>
    current.map((product) =>
      product.id === editingProductId
        ? {
            ...product,
            ...productData,
          }
        : product,
    ),
  )
} else {
  const newProduct: Product = {
    id: crypto.randomUUID(),
    ...productData,
    isActive: true,
  }

  setProducts((current) => [...current, newProduct])
}

setEditingProductId(null)
setForm(emptyForm)
setShowForm(false)
  }

  function categoryStyle(category: ProductCategory) {
    switch (category) {
      case 'Frozen':
        return 'bg-blue-100 text-blue-700'
      case 'Fish':
        return 'bg-cyan-100 text-cyan-800'
      case 'Grocery':
        return 'bg-amber-100 text-amber-800'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 px-2 py-2 font-semibold text-red-700"
        >
          ← Home
        </Link>

        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-700">
              Catalog
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Products
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              {products.length} product
              {products.length === 1 ? '' : 's'}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="rounded-xl bg-red-700 px-4 py-3 font-bold text-white shadow-sm active:scale-[0.98]"
          >
            + Add
          </button>
        </div>

        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search name, code, or UPC"
          className="mb-4 w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100"
        />
<div className="mt-3 grid grid-cols-3 gap-2 rounded-2xl bg-slate-100 p-1">
  <button
    type="button"
    onClick={() => setStatusFilter('active')}
    className={`rounded-xl px-3 py-2 text-sm font-bold ${
      statusFilter === 'active'
        ? 'bg-white text-slate-900 shadow-sm'
        : 'text-slate-500'
    }`}
  >
    Active
  </button>

  <button
    type="button"
    onClick={() => setStatusFilter('inactive')}
    className={`rounded-xl px-3 py-2 text-sm font-bold ${
      statusFilter === 'inactive'
        ? 'bg-white text-slate-900 shadow-sm'
        : 'text-slate-500'
    }`}
  >
    Inactive
  </button>

  <button
    type="button"
    onClick={() => setStatusFilter('all')}
    className={`rounded-xl px-3 py-2 text-sm font-bold ${
      statusFilter === 'all'
        ? 'bg-white text-slate-900 shadow-sm'
        : 'text-slate-500'
    }`}
  >
    All
  </button>
</div>
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-5 space-y-4 rounded-3xl bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">
                {editingProductId ? 'Edit Product' : 'Add Product'}
              </h2>

              <button
                type="button"
               onClick={() => {
  setShowForm(false)
  setEditingProductId(null)
  setForm(emptyForm)
  setError('')
}}
                className="px-2 text-xl text-slate-400"
                aria-label="Close form"
              >
                ✕
              </button>
            </div>

            <label className="block">
              <span className="mb-1 block font-semibold text-slate-700">
                Product name *
              </span>

              <input
                value={form.name}
                onChange={(event) =>
                  updateForm('name', event.target.value)
                }
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block font-semibold text-slate-700">
                  Code
                </span>

                <input
                  value={form.code}
                  onChange={(event) =>
                    updateForm('code', event.target.value)
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
                />
              </label>

              <label className="block">
                <span className="mb-1 block font-semibold text-slate-700">
                  UPC
                </span>

                <input
                  value={form.upc}
                  onChange={(event) =>
                    updateForm('upc', event.target.value)
                  }
                  inputMode="numeric"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block font-semibold text-slate-700">
                Item size
              </span>

              <input
                value={form.size}
                onChange={(event) =>
                  updateForm('size', event.target.value)
                }
                placeholder="Example: 12 oz"
                className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block font-semibold text-slate-700">
                  Case pack *
                </span>

                <input
                  value={form.casePack}
                  onChange={(event) =>
                    updateForm('casePack', event.target.value)
                  }
                  inputMode="numeric"
                  placeholder="24"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
                />
              </label>

              <label className="block">
                <span className="mb-1 block font-semibold text-slate-700">
                  Unit price *
                </span>

                <input
                  value={form.unitPrice}
                  onChange={(event) =>
                    updateForm('unitPrice', event.target.value)
                  }
                  inputMode="decimal"
                  placeholder="3.99"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-red-500"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block font-semibold text-slate-700">
                Category
              </span>

              <select
                value={form.category}
                onChange={(event) =>
                  updateForm(
                    'category',
                    event.target.value as ProductCategory,
                  )
                }
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none focus:border-red-500"
              >
                <option>Grocery</option>
                <option>Frozen</option>
                <option>Fish</option>
                <option>Other</option>
              </select>
            </label>

            {error && (
              <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-xl bg-red-700 px-5 py-4 text-lg font-bold text-white active:scale-[0.98]"
            >
              {editingProductId ? 'Update Product' : 'Save Product'}
            </button>
          </form>
        )}

        <div className="space-y-3">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className={`rounded-2xl border bg-white p-5 shadow-sm ${
  product.isActive
    ? 'border-slate-200'
    : 'border-slate-300 opacity-60'
}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="text-lg font-bold text-slate-900">
                    {product.name}
                  </h2>
                  {!product.isActive && (
  <span className="mt-2 inline-block rounded-full bg-slate-200 px-2 py-1 text-xs font-bold text-slate-600">
    Inactive
  </span>
)}

                  {product.code && (
                    <p className="mt-1 text-sm font-medium text-slate-500">
                      Code: {product.code}
                    </p>
                  )}
                </div>

                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${categoryStyle(
                    product.category,
                  )}`}
                >
                  {product.category}
                </span>
              </div>

              <p className="mt-3 text-sm text-slate-600">
                {product.size || 'Size not listed'} ·{' '}
                {product.casePack}/case · $
                {product.unitPrice.toFixed(2)}/unit
              </p>
              <div className="mt-4 flex gap-2">
  <button
    type="button"
    onClick={() => startEditing(product)}
    className="flex-1 rounded-xl border border-red-200 px-4 py-3 text-sm font-bold text-red-700 active:scale-[0.98]"
  >
    Edit
  </button>

  <button
    type="button"
    onClick={() => toggleProductStatus(product.id)}
    className={`flex-1 rounded-xl px-4 py-3 text-sm font-bold active:scale-[0.98] ${
      product.isActive
        ? 'border border-slate-300 text-slate-600'
        : 'bg-green-600 text-white'
    }`}
  >
    {product.isActive ? 'Deactivate' : 'Reactivate'}
  </button>
</div>
            </article>
          ))}

          {filteredProducts.length === 0 && (
            <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
              <div className="text-4xl">🧃</div>

              <h2 className="mt-3 text-xl font-bold text-slate-900">
                {products.length === 0
                  ? 'No products yet'
                  : 'No matching products'}
              </h2>

              <p className="mt-2 text-slate-500">
                {products.length === 0
                  ? 'Add the first product to begin building the catalog.'
                  : 'Try searching with another name, code, or UPC.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}