import { Link } from 'react-router-dom'

type MenuCardProps = {
  label: string
  description: string
  icon: string
  path: string
  primary?: boolean
}

export function MenuCard({
  label,
  description,
  icon,
  path,
  primary = false,
}: MenuCardProps) {
  return (
    <Link
      to={path}
      className={`flex min-h-24 items-center gap-4 rounded-2xl px-5 py-4 shadow-sm transition active:scale-[0.98] ${
        primary
          ? 'bg-red-700 text-white'
          : 'border border-slate-200 bg-white text-slate-900'
      }`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl ${
          primary ? 'bg-white/15' : 'bg-red-50'
        }`}
      >
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="text-xl font-bold">{label}</h2>

        <p
          className={`mt-1 text-sm ${
            primary ? 'text-red-100' : 'text-slate-500'
          }`}
        >
          {description}
        </p>
      </div>

      <span
        className={`text-2xl ${
          primary ? 'text-red-100' : 'text-slate-300'
        }`}
      >
        ›
      </span>
    </Link>
  )
}