// backend/admin/src/lib/pages.ts

export type PageItem = {
  id: number
  title: string
  slug: string
  status: 'published' | 'draft'
  date: string
}

export const pagesList: PageItem[] = [
  { id: 1, title: 'Home',       slug: '/',           status: 'published', date: '2025-06-01' },
  { id: 2, title: 'About Us',   slug: '/about-us',   status: 'published', date: '2025-06-15' },
  { id: 3, title: 'Contact Us', slug: '/contact-us', status: 'draft',     date: '2025-07-12' },
  // add more pages as needed
]
