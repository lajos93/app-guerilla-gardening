'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '../../payload-types'
import { isMedia } from '../../utils/isMedia'
import { Menu, X } from 'lucide-react'

type NavItem = { id: string | number; label: string; url: string }
type HeaderProps = { navigation: NavItem[]; logo: Logo }

export function HeaderMobile({ navigation, logo }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="z-[9999] fixed top-0 left-0 w-full bg-white shadow-md">
      <div className="mx-auto px-6 flex items-center justify-between h-14">
        {isMedia(logo.logo) && (
          <Image src={logo.logo.url} alt={logo.altText} width={40} height={40} />
        )}

        <button
          className="p-2"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 top-14 bg-white flex flex-col items-center gap-6 py-8 text-primary font-medium text-lg uppercase">
          {navigation.map((item) => (
            <Link key={item.id} href={item.url} onClick={() => setMenuOpen(false)}>
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
