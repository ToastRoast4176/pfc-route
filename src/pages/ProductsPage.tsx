import {
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from 'react'
import { Link } from 'react-router-dom'
import ProductStatusFilter, {
  type ProductStatusFilterValue,
} from '../components/products/ProductStatusFilter'
import type {
  Product,
  ProductCategory,
} from '../models/Product'
import {
  getProducts,
  saveProducts,
} from '../services/productStorage'
import ProductCard from '../components/products/ProductCard'
import ProductForm, {
  type ProductFormData,
} from '../components/products/ProductForm'

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
  useState<ProductStatusFilterValue>('active')

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
<ProductStatusFilter
  value={statusFilter}
  onChange={setStatusFilter}
/>
        {showForm && (
  <ProductForm
    form={form}
    error={error}
    isEditing={editingProductId !== null}
    onSubmit={handleSubmit}
    onChange={updateForm}
    onClose={() => {
      setShowForm(false)
      setEditingProductId(null)
      setForm(emptyForm)
      setError('')
    }}
  />
)}

        <div className="space-y-3">
          {filteredProducts.map((product) => (
  <ProductCard
    key={product.id}
    product={product}
    categoryStyle={categoryStyle}
    onEdit={startEditing}
    onToggleStatus={toggleProductStatus}
  />
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