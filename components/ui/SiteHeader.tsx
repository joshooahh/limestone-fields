'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import MobileNav from '@/components/ui/MobileNav'

// Pages that don't start with a dark hero image — show dark header immediately
const NON_HERO_PREFIXES = ['/book', '/contact']

interface SiteHeaderProps {
  bookingsOpen?: boolean | null
}

export default function SiteHeader({ bookingsOpen }: SiteHeaderProps) {
  const pathname = usePathname()
  const isNonHero = NON_HERO_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
  )
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dark = isNonHero || scrolled

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
        dark ? 'bg-[#253136] shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1207px] items-center justify-between px-6 py-5 md:py-6">

        {/* Desktop: left nav */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-6 text-[16px] font-subhead uppercase tracking-[0.22em] text-[#f7f2e4] md:gap-8">
          <Link href="/stay" className="transition hover:text-white">stay</Link>
          <Link href="/experience" className="transition hover:text-white">experience</Link>
          <Link href="/the-property" className="transition hover:text-white">the property</Link>
          <Link href="/blog" className="transition hover:text-white">journal</Link>
        </nav>

        {/* Logo */}
        <div className="pointer-events-auto flex shrink-0 items-center justify-center">
          <Logo variant="primary" theme="light" href="/" className="h-8 w-auto md:h-10" priority />
        </div>

        {/* Desktop: right nav */}
        <nav className="pointer-events-auto hidden md:flex items-center gap-6 text-[16px] font-subhead uppercase tracking-[0.22em] text-[#f7f2e4] md:gap-8">
          <Link href="/private-events" className="transition hover:text-white">private events</Link>
          <Link
            href={bookingsOpen ? '/book' : '/contact'}
            className="transition hover:text-white underline underline-offset-4"
          >
            {bookingsOpen ? 'book now' : 'join waitlist'}
          </Link>
        </nav>

        {/* Mobile: hamburger + drawer */}
        <div className="md:hidden">
          <MobileNav bookingsOpen={bookingsOpen ?? undefined} />
        </div>

      </div>
    </header>
  )
}
