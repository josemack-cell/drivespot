'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { PageItem } from '@/lib/pages'

export default function PagesPage() {
  const { data, isLoading } = useQuery<PageItem[]>({
    queryKey: ['pages'],
    queryFn: () => axios.get('/api/pages').then(res => res.data),
  })

  if (isLoading) return <p>Loading…</p>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">All Pages</h2>
        <Link
          href="/pages/new"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + New Page
        </Link>
      </div>
      <table className="min-w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Title</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data!.map(p => (
            <tr key={p.id} className="border-b last:border-none">
              <td className="py-2 px-4">{p.title}</td>
              <td className="py-2 px-4 capitalize">{p.status}</td>
              <td className="py-2 px-4">{p.date}</td>
              <td className="py-2 px-4">
                <Link
                  href={`/pages/${p.id}`}
                  className="text-blue-600 hover:underline"
                >
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
