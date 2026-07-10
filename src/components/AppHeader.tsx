export function AppHeader() {
  return (
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
  )
}