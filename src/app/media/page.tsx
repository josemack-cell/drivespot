'use client'

import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import Link from 'next/link'
import type { MediaItem } from '@/lib/media'

export default function MediaLibrary() {
  const { data, isLoading } = useQuery<MediaItem[]>({
    queryKey: ['media'],
    queryFn: () => axios.get('/api/media').then(r => r.data),
  })

  if (isLoading) return <p>Loading…</p>

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Media Library</h2>
        <Link
          href="/media/upload"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Upload Media
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data!.map(item => (
          <div key={item.id} className="bg-white p-2 rounded shadow-sm">
            <img src={item.url} alt={item.filename} className="w-full h-32 object-cover rounded" />
            <div className="mt-2 text-sm">{item.filename}</div>
            <div className="text-xs text-gray-500">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
