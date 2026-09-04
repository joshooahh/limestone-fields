'use client'

import { useEffect, useState } from 'react'
import Logo from '@/components/ui/Logo'
import { RETREAT_BOOKING_URL } from '@/lib/retreat'

/**
 * Stripped-down header for the Writers Retreat page. No site nav: the only
 * actions are the logo (home) and booking a cabin, so the page stays a
 * single path. Mirrors SiteHeader's transparent-over-hero, dark-on-scroll
 * behavior.
 */
export default function RetreatHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
        scrolled ? 'bg-[#253136] shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[1207px] items-center justify-between px-6 py-5 md:py-6">
        <Logo variant="primary" theme="light" href="/" className="h-8 w-auto md:h-10" priority />
        <div className="flex items-center gap-6">
          <span className="hidden sm:inline font-subhead text-[12px] tracking-[0.22em] uppercase text-[#f7f2e4]/80">
            with Sobremesa · Nov 6–9
          </span>
          <a
            href={RETREAT_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-subhead text-[13px] tracking-[0.22em] uppercase text-[#f7f2e4] underline underline-offset-4 transition hover:text-white"
          >
            Book your cabin
          </a>
        </div>
      </div>
    </header>
  )
}
