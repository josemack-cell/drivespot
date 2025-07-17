'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { PageItem } from '@/lib/pages'

export default function EditPage() {
  const router = useRouter()
  const { id } = useParams()
  const { data } = useQuery<PageItem>(
    ['page', id],
    () => axios.get(`/api/pages/${id}`).then(r => r.data)
  )

  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (data) {
      setTitle(data.title)
      setSlug(data.slug)
      setContent(data.content ?? '')
    }
  }, [data])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: PUT to /api/pages/:id
    await axios.put(`/api/pages/${id}`, { title, slug, content })
    router.push('/pages')
  }

  if (!data) return <p>Loading…</p>

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold">Edit Page</h2>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      <input
        value={slug}
        onChange={e => setSlug(e.target.value)}
        className="w-full border px-3 py-2 rounded"
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        rows={6}
        className="w-full border px-3 py-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Update Page
      </button>
    </form>
  )
}
