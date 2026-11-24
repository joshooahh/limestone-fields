'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import Logo from '@/components/ui/Logo'
import { cloudbedsBookingUrl, defaultStayDates } from '@/lib/cloudbeds'
import MobileNav from '@/components/ui/MobileNav'

// Pages that don't start with a dark hero image — show dark header immediately
const NON_HERO_PREFIXES = ['/book', '/contact', '/newsletter']

interface SiteHeaderProps {
  bookingsOpen?: boolean | null
}

/**
 * A top-nav link that opens a small menu on hover or keyboard focus, using
 * the same pattern as the Book now menu. The label still links to `href`.
 */
function NavGroup({
  label,
  href,
  items,
  labelClassName = '',
  align = 'left',
}: {
  label: string
  href: string
  items: { href: string; label: string }[]
  labelClassName?: string
  align?: 'left' | 'right'
}) {
  return (
    <div className="group relative">
      <Link href={href} className={`transition hover:text-white whitespace-nowrap ${labelClassName}`}>
        {label}
      </Link>
      <div
        className={`invisible absolute ${align === 'right' ? 'right-0' : '-left-5'} top-full z-40 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100`}
      >
        <div className="min-w-[190px] rounded-xl bg-[#f7f2e4] py-2 shadow-xl">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block whitespace-nowrap px-5 py-2.5 text-[#253136] transition hover:bg-[#f7e7d5]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function SiteHeader({ bookingsOpen }: SiteHeaderProps) {
  const pathname = usePathname()
  const isNonHero = NON_HERO_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(prefix + '/')
  )
  const [scrolled, setScrolled] = useState(false)
  // Whole-property availability search on Cloudbeds. Dates are filled in after mount.
  const [propertyUrl, setPropertyUrl] = useState('/private-events#dates')
  useEffect(() => {
    setPropertyUrl(cloudbedsBookingUrl(defaultStayDates()))
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dark = isNonHero || scrolled

  const linkClass = 'transition hover:text-white whitespace-nowrap'
  const navClass =
    'pointer-events-auto hidden md:flex items-center gap-3.5 lg:gap-6 xl:gap-9 text-[10.5px] lg:text-[11.5px] xl:text-[13px] font-subhead uppercase tracking-[0.1em] xl:tracking-[0.16em] text-[#f7f2e4]/90'
  const bookHref = bookingsOpen ? propertyUrl : '/contact'
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
          <NavGroup
            label="Private Events"
            href="/private-events"
            labelClassName="!text-white border-b border-[#f7f2e4]/70 pb-0.5 font-semibold"
            items={[
              { href: '/private-events', label: 'Private events' },
              { href: '/weddings', label: 'Weddings' },
            ]}
          />
          <Link href="/stay" className={linkClass}>Cabins</Link>
          <NavGroup
            label="The Property"
            href="/the-property"
            items={[
              { href: '/the-property', label: 'The property' },
              { href: '/experience', label: 'The experience' },
              { href: '/story', label: 'Our story' },
              { href: '/faq', label: 'FAQ' },
            ]}
          />
        </nav>
        <div className="md:hidden" />

        {/* Logo, true center */}
        <div className="pointer-events-auto flex shrink-0 items-center justify-center md:px-6 lg:px-10">
          <Logo variant="primary" theme="light" href="/" className="h-8 w-auto md:h-10" priority />
        </div>

        {/* Desktop: right nav */}
        <nav className={`${navClass} justify-end`}>
          <Link href="/blog" className={linkClass}>Journal</Link>
          <NavGroup
            label="Offers & Gift Cards"
            href="/offers"
            align="right"
            items={[
              { href: '/offers', label: 'Offers' },
              { href: '/gift-cards', label: 'Gift cards' },
            ]}
          />
          {/* Book now defaults to the whole property; a single cabin is the alternative. */}
          <div className="group relative">
            <Link
              href={bookHref}
              className={`block whitespace-nowrap rounded-[78px] border px-5 py-2 transition ${
                dark
                  ? 'border-[#f7f2e4] bg-[#f7f2e4] text-[#253136] hover:bg-[#f7e7d5]'
                  : 'border-[#f7f2e4]/60 bg-[rgba(247,242,228,0.18)] text-[#f7f2e4] backdrop-blur-[2px] hover:bg-[rgba(247,242,228,0.32)]'
              }`}
            >
              {bookLabel}
            </Link>
            {bookingsOpen && (
              <div className="invisible absolute right-0 top-full z-40 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="min-w-[210px] rounded-xl bg-[#f7f2e4] py-2 shadow-xl">
                  <Link
                    href={propertyUrl}
                    className="block whitespace-nowrap px-5 py-2.5 text-[#253136] transition hover:bg-[#f7e7d5]"
                  >
                    The whole property
                  </Link>
                  <Link
                    href="/book"
                    className="block whitespace-nowrap px-5 py-2.5 text-[#253136]/70 transition hover:bg-[#f7e7d5] hover:text-[#253136]"
                  >
                    A single cabin
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile: hamburger + drawer */}
        <div className="pointer-events-auto flex justify-end md:hidden">
          <MobileNav bookingsOpen={bookingsOpen ?? undefined} />
        </div>

      </div>
    </header>
  )
}
