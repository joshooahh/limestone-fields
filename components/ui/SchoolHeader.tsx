'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'

/**
 * Header for Art of Living School pages. Same transparent-over-hero,
 * dark-on-scroll behavior as RetreatHeader, with no site nav: the logo, a
 * link back to the full list of classes, and the sign-up form on the page.
 */
export default function SchoolHeader() {
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
          <Link
            href="/school"
            className="hidden sm:inline font-subhead text-[12px] tracking-[0.22em] uppercase text-[#f7f2e4]/80 transition hover:text-white"
          >
            The Art of Living School
          </Link>
          <a
            href="#reserve"
            className="font-subhead text-[13px] tracking-[0.22em] uppercase text-[#f7f2e4] underline underline-offset-4 transition hover:text-white"
          >
            Get first word
          </a>
        </div>
      </div>
    </header>
  )
}
