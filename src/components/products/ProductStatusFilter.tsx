export type ProductStatusFilterValue =
  | 'active'
  | 'inactive'
  | 'all'

type ProductStatusFilterProps = {
  value: ProductStatusFilterValue
  onChange: (value: ProductStatusFilterValue) => void
}

const filterOptions: {
  label: string
  value: ProductStatusFilterValue
}[] = [
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
  {
    label: 'All',
    value: 'all',
  },
]

export default function ProductStatusFilter({
  value,
  onChange,
}: ProductStatusFilterProps) {
  return (
    <div className="mt-3 grid grid-cols-3 gap-2 rounded-2xl bg-slate-100 p-1">
      {filterOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-xl px-3 py-2 text-sm font-bold ${
            value === option.value
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}