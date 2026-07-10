import type { Product } from '../../models/Product'

type ProductCardProps = {
  product: Product
  categoryStyle: (category: Product['category']) => string
  onEdit: (product: Product) => void
  onToggleStatus: (productId: string) => void
}

export default function ProductCard({
  product,
  categoryStyle,
  onEdit,
  onToggleStatus,
}: ProductCardProps) {
  return (
    <article
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
        {product.size || 'Size not listed'} · {product.casePack}/case · $
        {product.unitPrice.toFixed(2)}/unit
      </p>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => onEdit(product)}
          className="flex-1 rounded-xl border border-red-200 px-4 py-3 text-sm font-bold text-red-700 active:scale-[0.98]"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={() => onToggleStatus(product.id)}
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
  )
}