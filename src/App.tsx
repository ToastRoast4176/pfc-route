import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { PlaceholderPage } from './pages/PlaceholderPage'
import CustomersPage from './pages/CustomersPage'
function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/orders/new"
        element={<PlaceholderPage title="New Order" />}
      />
      <Route
        path="/orders/drafts"
        element={<PlaceholderPage title="Draft Orders" />}
      />
      <Route
        path="/invoices/unpaid"
        element={<PlaceholderPage title="Unpaid Invoices" />}
      />
      <Route
        path="/customers"
        element={<CustomersPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route
        path="/settings"
        element={<PlaceholderPage title="Settings" />}
      />
    </Routes>
  )
}

export default App
import { ProductsPage } from './pages/ProductsPage'