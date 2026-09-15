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

  const linkClass = 'transition hover:text-white whitespace-nowrap'
  const navClass =
    'pointer-events-auto hidden md:flex items-center gap-7 lg:gap-9 text-[12px] lg:text-[13px] font-subhead uppercase tracking-[0.16em] text-[#f7f2e4]/90'
  const bookHref = bookingsOpen ? '/book' : '/contact'
  const bookLabel = bookingsOpen ? 'Book now' : 'Join waitlist'

  return (
    <header
      className={`pointer-events-none fixed inset-x-0 top-[var(--announcement-h,0px)] z-30 transition-colors duration-300 ${
        dark ? 'bg-[#253136] shadow-sm' : 'bg-transparent'
      }`}
    >
      {/* Soft scrim so the nav stays legible over any hero frame before scroll. */}
      {!dark && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[150%] bg-gradient-to-b from-black/45 to-transparent"
        />
      )}

      <div className="mx-auto grid w-full max-w-[1207px] grid-cols-[1fr_auto_1fr] items-center px-6 py-5 md:py-6">

        {/* Desktop: left nav */}
        <nav className={`${navClass} justify-start`}>
          <Link href="/stay" className={linkClass}>Stay</Link>
          <Link href="/experience" className={linkClass}>Experience</Link>
          <Link href="/the-property" className={linkClass}>The Property</Link>
        </nav>
        <div className="md:hidden" />

        {/* Logo, true center */}
        <div className="pointer-events-auto flex shrink-0 items-center justify-center md:px-6 lg:px-10">
          <Logo variant="primary" theme="light" href="/" className="h-8 w-auto md:h-10" priority />
        </div>

        {/* Desktop: right nav */}
        <nav className={`${navClass} justify-end`}>
          <Link href="/blog" className={linkClass}>Journal</Link>
          <Link href="/private-events" className={linkClass}>Private Events</Link>
          <Link
            href={bookHref}
            className={`whitespace-nowrap rounded-[78px] border px-5 py-2 transition ${
              dark
                ? 'border-[#f7f2e4] bg-[#f7f2e4] text-[#253136] hover:bg-[#f7e7d5]'
                : 'border-[#f7f2e4]/60 bg-[rgba(247,242,228,0.18)] text-[#f7f2e4] backdrop-blur-[2px] hover:bg-[rgba(247,242,228,0.32)]'
            }`}
          >
            {bookLabel}
          </Link>
        </nav>

        {/* Mobile: hamburger + drawer */}
        <div className="pointer-events-auto flex justify-end md:hidden">
          <MobileNav bookingsOpen={bookingsOpen ?? undefined} />
        </div>

      </div>
    </header>
  )
}
