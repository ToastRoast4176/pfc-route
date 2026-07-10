import { AppHeader } from '../components/AppHeader'
import { MenuCard } from '../components/MenuCard'

const menuItems = [
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

export function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6">
      <section className="mx-auto max-w-md">
        <AppHeader />

        <div className="space-y-3">
          {menuItems.map((item) => (
            <MenuCard key={item.path} {...item} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          Peru Food Corp internal business tool
        </p>
      </section>
    </main>
  )
}