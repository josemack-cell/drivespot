import { NextResponse } from 'next/server'
import { pagesList } from '@/lib/pages'

export async function GET() {
  return NextResponse.json(pagesList)
}
