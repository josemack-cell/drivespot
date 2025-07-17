'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Product = { id: number; name: string; price: number; stock: number }

export default function AllProductsPage() {
  const { data = [], isLoading } = useQuery<Product[]>({
    queryKey: ['dc-catalog'],
    queryFn: () => axios.get('/api/drivecommerce/catalog').then(r => r.data),
  })

  if (isLoading) return <p>Loading…</p>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">All Products</h2>
        <Link href="/drivecommerce/catalog/new" className="bg-blue-600 text-white px-4 py-2 rounded">
          + Add New Product
        </Link>
      </div>
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Price</th>
            <th className="py-2 px-4">Stock</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(p => (
            <tr key={p.id} className="border-b">
              <td className="py-2 px-4">{p.id}</td>
              <td className="py-2 px-4">{p.name}</td>
              <td className="py-2 px-4">${p.price.toFixed(2)}</td>
              <td className="py-2 px-4">{p.stock}</td>
              <td className="py-2 px-4">
                <Link href={`/drivecommerce/catalog/${p.id}`} className="text-blue-600 hover:underline">
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
