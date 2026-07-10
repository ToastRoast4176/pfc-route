export type ProductCategory = 'Grocery' | 'Frozen' | 'Fish' | 'Other'

export type Product = {
  id: string
  name: string
  code?: string
  upc?: string
  size?: string
  casePack: number
  unitPrice: number
  category: ProductCategory
  isActive: boolean
}