'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Product = { id: number; name: string; price: number; stock: number }

export default function EditProduct() {
  const router = useRouter()
  const { id } = useParams()
  const { data } = useQuery<Product>(
    ['dc-product', id],
    () => axios.get(`/api/drivecommerce/catalog/${id}`).then(r => r.data)
  )

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)

  useEffect(() => {
    if (data) {
      setName(data.name)
      setPrice(data.price)
      setStock(data.stock)
    }
  }, [data])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await axios.put(`/api/drivecommerce/catalog/${id}`, { name, price, stock })
    router.push('/drivecommerce/catalog')
  }

  if (!data) return <p>Loading…</p>

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold">Edit Product</h2>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="number"
        value={price}
        onChange={e => setPrice(parseFloat(e.target.value))}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        type="number"
        value={stock}
        onChange={e => setStock(parseInt(e.target.value))}
        className="w-full border px-3 py-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Update Product
      </button>
    </form>
  )
}
