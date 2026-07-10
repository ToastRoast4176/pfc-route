import { Link, Route, Routes } from 'react-router-dom'

type MenuItem = {
  label: string
  description: string
  icon: string
  path: string
  primary?: boolean
}

const menuItems: MenuItem[] = [
  {
    label: 'New Order',
    description: 'Create an order for a customer',
    icon: '📦',
    path: '/orders/new',
    primary: true,
  },
  {
    label: 'Draft Orders',
    description: 'Continue unfinished orders',
    icon: '📝',
    path: '/orders/drafts',
  },
  {
    label: 'Unpaid Invoices',
    description: 'View outstanding balances',
    icon: '💵',
    path: '/invoices/unpaid',
  },
  {
    label: 'Customers',
    description: 'Manage customer information',
    icon: '👥',
    path: '/customers',
  },
  {
    label: 'Products',
    description: 'Manage the product catalog',
    icon: '🧃',
    path: '/products',
  },
  {
    label: 'Settings',
    description: 'App preferences and data tools',
    icon: '⚙️',
    path: '/settings',
  },
]

function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <header className="mb-6 overflow-hidden rounded-3xl bg-red-700 text-white shadow-lg">
          <div className="p-6">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-3xl">
              📦
            </div>

            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-red-100">
              Peru Food Corp
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight">
              PFC Route
            </h1>

            <p className="mt-3 max-w-xs text-base leading-6 text-red-100">
              Orders, loading, invoices, signatures, and payments in one place.
            </p>
          </div>

          <div className="border-t border-white/15 bg-red-800/40 px-6 py-4">
            <p className="text-sm font-medium text-red-50">
              Distribution management
            </p>
          </div>
        </header>

        <div className="space-y-3">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex min-h-24 items-center gap-4 rounded-2xl px-5 py-4 shadow-sm transition active:scale-[0.98] ${
                item.primary
                  ? 'bg-red-700 text-white'
                  : 'border border-slate-200 bg-white text-slate-900'
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl ${
                  item.primary ? 'bg-white/15' : 'bg-red-50'
                }`}
              >
                {item.icon}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold">{item.label}</h2>

                <p
                  className={`mt-1 text-sm ${
                    item.primary ? 'text-red-100' : 'text-slate-500'
                  }`}
                >
                  {item.description}
                </p>
              </div>

              <span
                className={`text-2xl ${
                  item.primary ? 'text-red-100' : 'text-slate-300'
                }`}
              >
                ›
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          Peru Food Corp internal business tool
        </p>
      </section>
    </main>
  )
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <Link
          to="/"
          className="mb-5 inline-flex items-center gap-2 rounded-xl px-2 py-2 font-semibold text-red-700"
        >
          <span>←</span>
          <span>Home</span>
        </Link>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-2xl">
            📦
          </div>

          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-red-700">
            PFC Route
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            {title}
          </h1>

          <p className="mt-3 leading-6 text-slate-600">
            This page is connected and ready for us to build.
          </p>
        </div>
      </section>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route
        path="/orders/new"
        element={<PlaceholderPage title="New Order" />}
      />

      <Route
        path="/orders/drafts"
        element={<PlaceholderPage title="Draft Orders" />}
      />

      <Route
        path="/invoices/unpaid"
        element={<PlaceholderPage title="Unpaid Invoices" />}
      />

      <Route
        path="/customers"
        element={<PlaceholderPage title="Customers" />}
      />

      <Route
        path="/products"
        element={<PlaceholderPage title="Products" />}
      />

      <Route
        path="/settings"
        element={<PlaceholderPage title="Settings" />}
      />
    </Routes>
  )
}

export default App