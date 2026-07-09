function App() {
  return (
    <main className="min-h-screen bg-slate-100 p-4">
      <section className="mx-auto max-w-md">
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-green-700">
            Peru Food Corp
          </p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">
            PFC Route
          </h1>
          <p className="mt-2 text-slate-600">
            Orders, invoices, loading, and payments in one place.
          </p>
        </div>

        <div className="space-y-3">
          <button className="w-full rounded-2xl bg-green-700 px-5 py-5 text-left text-xl font-bold text-white shadow-sm">
            New Order
          </button>

          <button className="w-full rounded-2xl bg-white px-5 py-5 text-left text-xl font-bold text-slate-900 shadow-sm">
            Draft Orders
          </button>

          <button className="w-full rounded-2xl bg-white px-5 py-5 text-left text-xl font-bold text-slate-900 shadow-sm">
            Unpaid Invoices
          </button>

          <button className="w-full rounded-2xl bg-white px-5 py-5 text-left text-xl font-bold text-slate-900 shadow-sm">
            Customers
          </button>

          <button className="w-full rounded-2xl bg-white px-5 py-5 text-left text-xl font-bold text-slate-900 shadow-sm">
            Products
          </button>

          <button className="w-full rounded-2xl bg-white px-5 py-5 text-left text-xl font-bold text-slate-900 shadow-sm">
            Settings
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;