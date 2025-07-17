'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function MediaUpload() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return
    const form = new FormData()
    form.append('file', file)
    // TODO: POST to /api/media/upload
    await axios.post('/api/media/upload', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    router.push('/media')
  }

  return (
    <form onSubmit={handleUpload} className="space-y-4 bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold">Upload Media</h2>
      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files?.[0] ?? null)}
        className="block"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Upload
      </button>
    </form>
  )
}
