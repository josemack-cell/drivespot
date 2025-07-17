// backend/admin/src/lib/media.ts

export type MediaItem = {
  id: number
  filename: string
  url: string
  date: string
}

export const media: MediaItem[] = [
  { id: 1, filename: 'brake-pads.jpg', url: '/images/brake-pads.jpg', date: '2025-07-01' },
  { id: 2, filename: 'oil-filter.png', url: '/images/oil-filter.png', date: '2025-07-10' },
  // add more items as needed
]
