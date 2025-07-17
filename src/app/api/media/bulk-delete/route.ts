// src/app/api/media/bulk-delete/route.ts
import { NextResponse } from 'next/server'
import { media } from '@/lib/media'

export async function POST(req: Request) {
  const { ids }: { ids: number[] } = await req.json()
  // Remove items whose id is in the list
  for (const id of ids) {
    const idx = media.findIndex((m) => m.id === id)
    if (idx !== -1) media.splice(idx, 1)
  }
  return NextResponse.json({ success: true })
}
