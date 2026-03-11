'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'

interface MobileNavProps {
  bookingsOpen?: boolean
}

const NAV_LINKS = [
  { href: '/stay', label: 'Stay' },
  { href: '/experience', label: 'Experience' },
  { href: '/story', label: 'Story' },
  { href: '/private-events', label: 'Private Events' },
  { href: '/weddings', label: 'Weddings' },
  { href: '/buyouts', label: 'Buyouts' },
  { href: '/contact', label: 'Contact' },
]

export default function MobileNav({ bookingsOpen }: MobileNavProps) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const close = useCallback(() => setOpen(false), [])

  // Close on route change
  useEffect(() => {
    close()
  }, [pathname, close])

  // Lock body scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [close])

  const waitlistHref = bookingsOpen ? '/stay' : '/contact'

  return (
    <>
      {/* Hamburger button — visible mobile only (controlled by parent hiding on md:) */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={open}
        className="pointer-events-auto flex h-10 w-10 items-center justify-center text-[#f7f2e4] transition hover:text-white"
      >
        {/* Custom hamburger lines */}
        <span className="flex flex-col gap-[5px]">
          <span className="block h-[1.5px] w-6 bg-current" />
          <span className="block h-[1.5px] w-6 bg-current" />
          <span className="block h-[1.5px] w-4 bg-current" />
        </span>
      </button>

      {/* Overlay — full-screen drawer */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={[
          'fixed inset-0 z-50 flex flex-col bg-[#253136]',
          'transition-[opacity,transform] duration-300 ease-in-out',
          open
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-2 pointer-events-none',
        ].join(' ')}
      >
        {/* Header row */}
        <div className="flex items-center justify-between px-6 py-5">
          <Logo
            variant="primary"
            theme="light"
            href="/"
            className="h-8 w-auto"
            priority
          />
          <button
            onClick={close}
            aria-label="Close navigation menu"
            className="flex h-10 w-10 items-center justify-center text-[#f7f2e4] transition hover:text-white"
          >
            {/* X icon */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col justify-center flex-1 px-8 pb-16 gap-1">
          {NAV_LINKS.map(({ href, label }, i) => (
            <Link
              key={href}
              href={href}
              onClick={close}
              style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
              className={[
                'font-headline text-[36px] leading-[1.15] text-[#f7f2e4] py-3',
                'border-b border-[#f7f2e4]/10',
                'transition-[color,opacity,transform] duration-300',
                'hover:text-[#b3c1ce]',
                open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2',
                pathname === href ? 'text-[#b3c1ce]' : '',
              ].join(' ')}
            >
              {label}
            </Link>
          ))}

          {/* CTA */}
          <div
            style={{ transitionDelay: open ? `${NAV_LINKS.length * 40}ms` : '0ms' }}
            className={[
              'pt-8 transition-[opacity,transform] duration-300',
              open ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2',
            ].join(' ')}
          >
            <Link
              href={waitlistHref}
              onClick={close}
              className="inline-flex items-center justify-center rounded-[78px] bg-[#f7f2e4] px-8 py-3 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#253136] transition hover:bg-[#f7e7d5]"
            >
              {bookingsOpen ? 'Book Now' : 'Join Waitlist'}
            </Link>
          </div>
        </nav>

        {/* Bottom bar */}
        <div className="px-8 pb-10">
          <p className="font-subhead text-[11px] uppercase tracking-[0.22em] text-[#f7f2e4]/40">
            Lake Limestone, Texas
          </p>
        </div>
      </div>
    </>
  )
}
