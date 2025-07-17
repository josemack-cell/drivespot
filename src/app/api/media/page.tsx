'use client'

import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import type { MediaItem } from '@/lib/media'

export default function MediaLibrary() {
  const qc = useQueryClient()

  // 1) Load media items
  const { data = [], isLoading } = useQuery<MediaItem[]>(
    ['media'],
    () => axios.get('/api/media').then((r) => r.data)
  )

  // 2) Track selected IDs
  const [selected, setSelected] = useState<Set<number>>(new Set())

  // 3) Bulk‑delete mutation
  const deleteMutation = useMutation(
    (ids: number[]) =>
      axios.post('/api/media/bulk-delete', { ids }),
    {
      onSuccess: () => qc.invalidateQueries(['media']),
    }
  )

  if (isLoading) return <p>Loading…</p>

  // 4) UI handlers
  const toggle = (id: number) => {
    const s = new Set(selected)
    s.has(id) ? s.delete(id) : s.add(id)
    setSelected(s)
  }
  const allIds = data.map((m) => m.id)
  const toggleAll = () =>
    setSelected((sel) =>
      sel.size === data.length ? new Set() : new Set(allIds)
    )
  const applyDelete = () => {
    if (selected.size === 0) return
    deleteMutation.mutate(Array.from(selected), {
      onSuccess: () => setSelected(new Set()),
    })
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Media Library</h2>
        {/* Bulk Actions toolbar */}
        <div className="flex items-center space-x-2">
          <button
            onClick={toggleAll}
            className="px-3 py-1 border rounded text-sm"
          >
            {selected.size === data.length ? 'Unselect All' : 'Select All'}
          </button>
          <select
            disabled={selected.size === 0}
            className="border px-2 py-1 rounded text-sm"
            onChange={(e) => e.currentTarget.value === 'delete' && applyDelete()}
            defaultValue=""
          >
            <option value="" disabled>
              Bulk Actions
            </option>
            <option value="delete">Delete Permanently</option>
          </select>
          <button
            onClick={applyDelete}
            disabled={selected.size === 0}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50"
          >
            Apply
          </button>
        </div>
        <Link
          href="/media/upload"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Upload Media
        </Link>
      </div>

      {/* 5) Grid with checkboxes */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="relative bg-white p-2 rounded shadow-sm flex flex-col"
          >
            <input
              type="checkbox"
              checked={selected.has(item.id)}
              onChange={() => toggle(item.id)}
              className="absolute top-2 left-2 z-10"
            />
            <img
              src={item.url}
              alt={item.filename}
              className="w-full h-32 object-cover rounded"
            />
            <div className="mt-2 text-sm">{item.filename}</div>
            <div className="text-xs text-gray-500">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
