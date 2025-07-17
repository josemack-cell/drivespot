'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function NewPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: POST to /api/pages
    await axios.post('/api/pages', { title, slug, content })
    router.push('/pages')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold">Create New Page</h2>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="w-full border px-3 py-2 rounded"
      />
      <input
        value={slug}
        onChange={e => setSlug(e.target.value)}
        placeholder="Slug (e.g. about-us)"
        required
        className="w-full border px-3 py-2 rounded"
      />
      <textarea
        value={content}
        onChange={e => setContent(e.target.value)}
        placeholder="Page content..."
        rows={6}
        className="w-full border px-3 py-2 rounded"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Save Page
      </button>
    </form>
  )
}
