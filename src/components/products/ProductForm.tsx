import type { FormEvent } from 'react'
import type { ProductCategory } from '../../models/Product'

export type ProductFormData = {
  name: string
  code: string
  upc: string
  size: string
  casePack: string
  unitPrice: string
  category: ProductCategory
}

type ProductFormProps = {
  form: ProductFormData
  error: string
  isEditing: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onChange: (
    field: keyof ProductFormData,
    value: string,
  ) => void
  onClose: () => void
}

export default function ProductForm({
  form,
  error,
  isEditing,
  onSubmit,
  onChange,
  onClose,
}: ProductFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="mb-5 space-y-4 rounded-3xl bg-white p-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          {isEditing ? 'Edit Product' : 'Add Product'}
        </h2>

        <button
          type="button"
          onClick={onClose}
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
            onChange('name', event.target.value)
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
              onChange('code', event.target.value)
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
              onChange('upc', event.target.value)
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
            onChange('size', event.target.value)
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
              onChange('casePack', event.target.value)
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
              onChange('unitPrice', event.target.value)
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
            onChange(
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
        {isEditing ? 'Update Product' : 'Save Product'}
      </button>
    </form>
  )
}