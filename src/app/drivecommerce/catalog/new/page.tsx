// backend/admin/src/app/drivecommerce/catalog/new/page.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function NewProductPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await axios.post('/api/drivecommerce/catalog', { name, price, stock })
    router.push('/drivecommerce/catalog')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold">Add New Product</h2>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Product Name"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="number"
        value={price}
        onChange={e => setPrice(parseFloat(e.target.value))}
        placeholder="Price"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <input
        type="number"
        value={stock}
        onChange={e => setStock(parseInt(e.target.value))}
        placeholder="Stock"
        className="w-full border px-3 py-2 rounded"
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
        Create Product
      </button>
    </form>
  )
}
