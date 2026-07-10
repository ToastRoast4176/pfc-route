import type { Product } from '../models/Product'

const STORAGE_KEY = 'pfc-route-products'

export function getProducts(): Product[] {
  const savedProducts = localStorage.getItem(STORAGE_KEY)

  if (!savedProducts) {
    return []
  }

  try {
    return JSON.parse(savedProducts) as Product[]
  } catch {
    return []
  }
}

export function saveProducts(products: Product[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
}