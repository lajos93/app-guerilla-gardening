'use client'

import { useEffect, useState } from 'react'
import throttle from 'lodash/throttle'
import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '../../payload-types'
import { isMedia } from '../../utils/isMedia'
import { useScrollSpy } from '../../hooks/useScrollSpy'

type NavItem = { id: string | number; label: string; url: string }
type HeaderProps = { navigation: NavItem[]; logo: Logo }

export function HeaderDesktop({ navigation, logo }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => setScrolled(window.scrollY > 300), 200)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const activeId = useScrollSpy(
    navigation.map((n) => n.url),
    80,
    120,
  )

  return (
    <header
      className={`z-[9999] fixed top-0 left-0 w-full transition-colors duration-300 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto px-12 flex items-center justify-between h-14">
        <div
          className={`transition-all duration-300 ${
            scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`}
        >
          {isMedia(logo.logo) && (
            <Image src={logo.logo.url} alt={logo.altText} width={40} height={40} />
          )}
        </div>

        <nav className="flex items-center gap-10 text-primary font-medium text-sm tracking-wide uppercase">
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className={`relative hover:text-black after:absolute after:content-[''] after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-black after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 ${
                activeId === item.url ? 'text-black' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
