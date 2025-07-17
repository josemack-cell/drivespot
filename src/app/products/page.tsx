'use client'

import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import type { Product } from '@/lib/mock'

export default function Products() {
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: () => axios.get('/api/products').then(res => res.data),
  })

  if (isLoading) return <p>Loading…</p>
  if (error) return <p>Error loading products.</p>

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Products</h2>
      <table className="min-w-full bg-white shadow-md rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4">ID</th>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Stock</th>
          </tr>
        </thead>
        <tbody>
          {data!.map(p => (
            <tr key={p.id} className="border-b last:border-none">
              <td className="py-2 px-4">{p.id}</td>
              <td className="py-2 px-4">{p.name}</td>
              <td className="py-2 px-4">{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
