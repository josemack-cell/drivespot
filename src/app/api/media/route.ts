import { NextResponse } from 'next/server'
import { media } from '@/lib/media'

export async function GET() {
  return NextResponse.json(media)
}
