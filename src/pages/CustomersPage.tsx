import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type {
  Customer,
  CustomerType,
} from '../models/Customer'
import {
  getCustomers,
  saveCustomers,
} from '../services/customerStorage'

type CustomerFormData = {
  name: string
  address: string
  phone: string
  notes: string
  customerType: CustomerType
}

const emptyForm: CustomerFormData = {
  name: '',
  address: '',
  phone: '',
  notes: '',
  customerType: 'Supermarket',
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(getCustomers)
  const [form, setForm] = useState<CustomerFormData>(emptyForm)
  const [search, setSearch] = useState('')

  useEffect(() => {
    saveCustomers(customers)
  }, [customers])

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase()

    if (!query) {
      return customers
    }

    return customers.filter((customer) =>
      [
        customer.name,
        customer.address,
        customer.phone,
        customer.customerType,
      ].some((value) => value.toLowerCase().includes(query)),
    )
  }, [customers, search])

  function updateForm(
    field: keyof CustomerFormData,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = form.name.trim()

    if (!trimmedName) {
      return
    }

    const newCustomer: Customer = {
      id: crypto.randomUUID(),
      name: trimmedName,
      address: form.address.trim(),
      phone: form.phone.trim(),
      notes: form.notes.trim(),
      customerType: form.customerType,
    }

    setCustomers((current) => [newCustomer, ...current])
    setForm(emptyForm)
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900">
      <section className="mx-auto max-w-2xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-red-700">
              Peru Food Corp
            </p>
            <h1 className="text-3xl font-black">
              Customers
            </h1>
          </div>

          <Link
            to="/"
            className="rounded-xl border border-slate-300 bg-white px-4 py-3 font-bold text-slate-700"
          >
            Home
          </Link>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-5 shadow-sm"
        >
          <h2 className="text-xl font-black">
            Add Customer
          </h2>

          <div className="mt-4 space-y-4">
            <label className="block">
              <span className="text-sm font-bold">
                Customer Name
              </span>
              <input
                value={form.name}
                onChange={(event) =>
                  updateForm('name', event.target.value)
                }
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3"
                placeholder="Example Supermarket"
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold">
                Customer Type
              </span>
              <select
                value={form.customerType}
                onChange={(event) =>
                  updateForm(
                    'customerType',
                    event.target.value,
                  )
                }
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3"
              >
                <option>Supermarket</option>
                <option>Restaurant</option>
                <option>Other</option>
              </select>
            </label>

            <label className="block">
              <span className="text-sm font-bold">
                Address
              </span>
              <input
                value={form.address}
                onChange={(event) =>
                  updateForm('address', event.target.value)
                }
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3"
                placeholder="Street, city, state"
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold">
                Phone
              </span>
              <input
                value={form.phone}
                onChange={(event) =>
                  updateForm('phone', event.target.value)
                }
                className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3"
                placeholder="(555) 555-5555"
              />
            </label>

            <label className="block">
              <span className="text-sm font-bold">
                Notes
              </span>
              <textarea
                value={form.notes}
                onChange={(event) =>
                  updateForm('notes', event.target.value)
                }
                className="mt-1 min-h-24 w-full rounded-xl border border-slate-300 px-4 py-3"
                placeholder="Delivery notes or special instructions"
              />
            </label>

            <button
              type="submit"
              className="w-full rounded-xl bg-red-700 px-4 py-4 text-lg font-black text-white active:scale-[0.98]"
            >
              Add Customer
            </button>
          </div>
        </form>

        <div className="mt-6">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3"
            placeholder="Search customers"
          />
        </div>

        <div className="mt-4 space-y-3">
          {filteredCustomers.map((customer) => (
            <article
              key={customer.id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-lg font-black">
                    {customer.name}
                  </h2>

                  <p className="mt-1 text-sm font-bold text-red-700">
                    {customer.customerType}
                  </p>

                  {customer.address && (
                    <p className="mt-2 text-sm text-slate-600">
                      {customer.address}
                    </p>
                  )}

                  {customer.phone && (
                    <p className="mt-1 text-sm text-slate-600">
                      {customer.phone}
                    </p>
                  )}

                  {customer.notes && (
                    <p className="mt-3 rounded-xl bg-slate-100 p-3 text-sm text-slate-600">
                      {customer.notes}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}

          {filteredCustomers.length === 0 && (
            <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
              <h2 className="text-xl font-black">
                {customers.length === 0
                  ? 'No customers yet'
                  : 'No matching customers'}
              </h2>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}