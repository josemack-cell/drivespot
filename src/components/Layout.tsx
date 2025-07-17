'use client'

import { ReactNode, useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  FaTachometerAlt,
  FaPhotoVideo,
  FaFileAlt,
  FaShoppingCart,
  FaChevronDown,
  FaChevronRight,
  FaListUl,
  FaPlus,
  FaTrademark,
  FaFolderOpen,
  FaTags,
  FaThLarge,
  FaStar,
  FaReceipt,
  FaUsers,
  FaCreditCard,
} from 'react-icons/fa'

type NavItem = { href: string; label: string; icon?: ReactNode }

// Top‑level links (outside Commerce)
const mainNav: NavItem[] = [
  { href: '/',        label: 'Dashboard', icon: <FaTachometerAlt /> },
  { href: '/media',   label: 'Media',     icon: <FaPhotoVideo /> },
  { href: '/pages',   label: 'Pages',     icon: <FaFileAlt /> },
]

// Commerce modules (first‑level under Commerce)
const commerceModules: NavItem[] = [
  { href: '/drivecommerce/catalog',   label: 'Catalog',   icon: <FaListUl /> },
  { href: '/drivecommerce/orders',    label: 'Orders',    icon: <FaReceipt /> },
  { href: '/drivecommerce/customers', label: 'Customers', icon: <FaUsers /> },
  { href: '/drivecommerce/payments',  label: 'Payments',  icon: <FaCreditCard /> },
]

// Products submenu (second‑level under Catalog)
const catalogSubmenu: NavItem[] = [
  { href: '/drivecommerce/catalog',            label: 'All Products',    icon: <FaListUl /> },
  { href: '/drivecommerce/catalog/new',        label: 'Add New Product', icon: <FaPlus /> },
  { href: '/drivecommerce/catalog/brands',     label: 'Brands',          icon: <FaTrademark /> },
  { href: '/drivecommerce/catalog/categories', label: 'Categories',      icon: <FaFolderOpen /> },
  { href: '/drivecommerce/catalog/tags',       label: 'Tags',            icon: <FaTags /> },
  { href: '/drivecommerce/catalog/attributes', label: 'Attributes',      icon: <FaThLarge /> },
  { href: '/drivecommerce/catalog/reviews',    label: 'Reviews',         icon: <FaStar /> },
]

export default function Layout({ children }: { children: ReactNode }) {
  const path = usePathname() || '/'
  const isCommerce = path.startsWith('/drivecommerce')
  const isCatalog  = path.startsWith('/drivecommerce/catalog')

  // Accordions state
  const [openCommerce, setOpenCommerce] = useState(isCommerce)
  const [openCatalog, setOpenCatalog]     = useState(isCatalog)

  // Sync with navigation
  useEffect(() => {
    setOpenCommerce(isCommerce)
    setOpenCatalog(isCatalog)
  }, [isCommerce, isCatalog])

  return (
    <div className="min-h-screen flex text-sm">
      <nav className="w-60 bg-gray-900 text-gray-200 flex-shrink-0">
        {/* Brand */}
        <div className="px-6 py-5 text-lg font-bold text-white border-b border-gray-700">
          DriveSpot Admin
        </div>

        <ul className="mt-4">
          {/* Main links */}
          {mainNav.map(({ href, label, icon }) => (
            <li key={href}>
              <Link
                href={href}
                className={`flex items-center px-6 py-3 hover:bg-gray-800 ${
                  path === href ? 'bg-blue-600 text-white' : 'text-gray-300'
                }`}
              >
                {icon && <span className="mr-3">{icon}</span>}
                {label}
              </Link>
            </li>
          ))}

          {/* Commerce accordion */}
          <li>
            <button
              onClick={() => setOpenCommerce((o) => !o)}
              className={`w-full flex items-center px-6 py-3 hover:bg-gray-800 ${
                isCommerce ? 'bg-blue-600 text-white' : 'text-gray-300'
              }`}
            >
              <FaShoppingCart className="mr-3" />
              Commerce
              <span className="ml-auto">
                {openCommerce ? <FaChevronDown /> : <FaChevronRight />}
              </span>
            </button>

            {openCommerce && (
              <ul className="bg-gray-800">
                {commerceModules.map(({ href, label, icon }) => {
                  const isThisCatalog = href === '/drivecommerce/catalog'
                  const activeModule = path === href

                  // For Catalog, render a nested accordion
                  if (isThisCatalog) {
                    return (
                      <li key={href}>
                        <button
                          onClick={() => setOpenCatalog((o) => !o)}
                          className={`w-full flex items-center pl-10 pr-6 py-2 hover:bg-gray-700 ${
                            activeModule ? 'bg-gray-700 text-white' : 'text-gray-300'
                          }`}
                        >
                          {icon && <span className="mr-3">{icon}</span>}
                          {label}
                          <span className="ml-auto">
                            {openCatalog ? <FaChevronDown /> : <FaChevronRight />}
                          </span>
                        </button>

                        {/* Products submenu */}
                        {openCatalog && (
                          <ul className="bg-gray-800">
                            {catalogSubmenu.map(({ href, label, icon }) => {
                              const active = path === href
                              return (
                                <li key={href}>
                                  <Link
                                    href={href}
                                    className={`flex items-center pl-14 pr-6 py-2 hover:bg-gray-700 ${
                                      active ? 'bg-gray-700 text-white' : 'text-gray-400'
                                    }`}
                                  >
                                    {icon && <span className="mr-3">{icon}</span>}
                                    {label}
                                  </Link>
                                </li>
                              )
                            })}
                          </ul>
                        )}
                      </li>
                    )
                  }

                  // Other modules (Orders, Customers, Payments)
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className={`flex items-center pl-10 pr-6 py-2 hover:bg-gray-700 ${
                          activeModule ? 'bg-gray-700 text-white' : 'text-gray-300'
                        }`}
                      >
                        {icon && <span className="mr-3">{icon}</span>}
                        {label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Main content */}
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  )
}
