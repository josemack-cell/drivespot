'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import {
  FaListUl,
  FaPlus,
  FaTags,
  FaFolderOpen,
  FaThLarge,
  FaTrademark,
  FaStar,
} from 'react-icons/fa'

const items = [
  { href: '/drivecommerce/catalog', label: 'All Products',    icon: <FaListUl /> },
  { href: '/drivecommerce/catalog/new', label: 'Add New Product', icon: <FaPlus /> },
  { href: '/drivecommerce/catalog/brands', label: 'Brands',      icon: <FaTrademark /> },
  { href: '/drivecommerce/catalog/categories', label: 'Categories', icon: <FaFolderOpen /> },
  { href: '/drivecommerce/catalog/tags', label: 'Tags',          icon: <FaTags /> },
  { href: '/drivecommerce/catalog/attributes', label: 'Attributes', icon: <FaThLarge /> },
  { href: '/drivecommerce/catalog/reviews', label: 'Reviews',     icon: <FaStar /> },
]

export default function CatalogLayout({ children }: { children: ReactNode }) {
  const path = usePathname()

  return (
    <div className="flex">
      <aside className="w-48 bg-gray-800 text-gray-200 p-4 space-y-2">
        <h3 className="text-sm font-semibold uppercase mb-2">Products</h3>
        <ul>
          {items.map(({ href, label, icon }) => {
            const active = path === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={
                    `flex items-center px-3 py-2 rounded hover:bg-gray-700 transition-colors ` +
                    (active ? 'bg-gray-700 text-white' : 'text-gray-300')
                  }
                >
                  <span className="mr-2">{icon}</span>
                  <span className="text-sm">{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  )
}
