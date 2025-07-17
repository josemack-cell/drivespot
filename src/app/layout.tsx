// backend/admin/src/app/layout.tsx
import './globals.css'
import Providers from '../providers'
import Layout from '@/components/Layout'

export const metadata = { title: 'DriveSpot Admin' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  )
}
