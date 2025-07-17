// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { NextResponse } from 'next/server'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // TODO: Replace with real user lookup (DB, external API, etc.)
        const users = [
          { id: '1', name: 'Admin User', email: 'admin@example.com', password: 'secret' },
        ]
        const user = users.find(
          u => u.email === credentials?.email && u.password === credentials?.password
        )
        if (user) return { id: user.id, name: user.name, email: user.email }
        return null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',   // our custom login page
  },
  callbacks: {
    async jwt({ token, user }) {
      // first time JWT callback, add user info
      if (user) token.user = user
      return token
    },
    async session({ session, token }) {
      // make the user available in session
      session.user = token.user as any
      return session
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
