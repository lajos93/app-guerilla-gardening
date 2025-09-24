'use client'

import * as React from 'react'
import Link from 'next/link'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'

export function MobileMenu() {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-md hover:bg-gray-100"
        aria-label="Toggle menu"
      >
        <HamburgerMenuIcon className="w-6 h-6" />
      </button>

      {open && (
        <div className="absolute top-12 right-0 w-48 bg-white shadow-lg rounded-md py-2 flex flex-col z-50">
          <Link href="/about" className="px-4 py-2 hover:bg-gray-100">
            Rólunk
          </Link>
          <Link href="/projects" className="px-4 py-2 hover:bg-gray-100">
            Projektek
          </Link>
          <Link href="/contact" className="px-4 py-2 hover:bg-gray-100">
            Kapcsolat
          </Link>
        </div>
      )}
    </div>
  )
}
