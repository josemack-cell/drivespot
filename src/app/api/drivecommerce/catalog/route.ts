// src/app/api/drivecommerce/catalog/route.ts
import { NextResponse } from 'next/server'

type Product = { id: number; name: string; price: number; stock: number }
let products: Product[] = [
  { id: 1, name: 'Brake Pads', price: 29.99, stock: 12 },
  { id: 2, name: 'Oil Filter', price: 9.99, stock: 5 },
]

// GET /api/drivecommerce/catalog
export async function GET() {
  return NextResponse.json(products)
}

// POST /api/drivecommerce/catalog
export async function POST(req: Request) {
  const { name, price, stock } = await req.json() as Omit<Product,'id'>
  const id = products.length ? products[products.length - 1].id + 1 : 1
  const newProd = { id, name, price, stock }
  products.push(newProd)
  return NextResponse.json(newProd, { status: 201 })
}
