import { Link } from 'react-router-dom'

type PlaceholderPageProps = {
  title: string
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
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