import type { Customer } from '../models/Customer'

const STORAGE_KEY = 'pfc-route-customers'

export function getCustomers(): Customer[] {
  const savedCustomers = localStorage.getItem(STORAGE_KEY)

  if (!savedCustomers) {
    return []
  }

  try {
    return JSON.parse(savedCustomers) as Customer[]
  } catch {
    return []
  }
}

export function saveCustomers(customers: Customer[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(customers))
}