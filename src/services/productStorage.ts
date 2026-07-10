import type { Product } from '../models/Product'

const STORAGE_KEY = 'pfc-route-products'

export function getProducts(): Product[] {
  const savedProducts = localStorage.getItem(STORAGE_KEY)

  if (!savedProducts) {
    return []
  }

  try {
    const parsedProducts = JSON.parse(savedProducts) as Product[]

    return parsedProducts.map((product) => ({
      ...product,
      isActive: product.isActive ?? true,
    }))
  } catch {
    return []
  }
}

export function saveProducts(products: Product[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
}