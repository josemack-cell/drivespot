// middleware.ts
import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  (req) => {
    // If the user is signed in, continue
    // Otherwise, redirect to /login
    const { pathname } = req.nextUrl
    if (pathname.startsWith('/login') || pathname.startsWith('/api/auth')) {
      return NextResponse.next()
    }
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = { matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'] }
