export type CustomerType =
  | 'Supermarket'
  | 'Restaurant'
  | 'Other'

export type Customer = {
  id: string
  name: string
  address: string
  phone: string
  notes: string
  customerType: CustomerType
}