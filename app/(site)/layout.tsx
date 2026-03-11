import Link from 'next/link'
import type { ReactNode } from 'react'
import { client } from '@/sanity/lib/client'
import Footer from '@/components/sections/Footer'
import { siteSettingsQuery } from '@/sanity/queries'
import type { SiteSettings } from '@/sanity/types'
import Logo from '@/components/ui/Logo'
import MobileNav from '@/components/ui/MobileNav'

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const siteSettings = await client.fetch<SiteSettings | null>(siteSettingsQuery)

  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="pointer-events-none absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex w-full max-w-[1207px] items-center justify-between px-6 py-5 md:py-6">

          {/* Desktop: left nav — hidden on mobile */}
          <nav className="pointer-events-auto hidden md:flex items-center gap-6 text-[16px] font-subhead uppercase tracking-[0.22em] text-[#f7f2e4] md:gap-8">
            <Link href="/stay" className="transition hover:text-white">stay</Link>
            <Link href="/experience" className="transition hover:text-white">experience</Link>
            <Link href="/story" className="transition hover:text-white">story</Link>
          </nav>

          {/* Logo — always visible */}
          <div className="pointer-events-auto flex shrink-0 items-center justify-center">
            <Logo variant="primary" theme="light" href="/" className="h-8 w-auto md:h-10" priority />
          </div>

          {/* Desktop: right nav — hidden on mobile */}
          <nav className="pointer-events-auto hidden md:flex items-center gap-6 text-[16px] font-subhead uppercase tracking-[0.22em] text-[#f7f2e4] md:gap-8">
            <Link href="/private-events" className="transition hover:text-white">private events</Link>
            <Link
              href={siteSettings?.bookingsOpen ? '/stay' : '/contact'}
              className="transition hover:text-white underline underline-offset-4"
            >
              join waitlist
            </Link>
          </nav>

          {/* Mobile: hamburger + drawer — hidden on desktop */}
          <div className="md:hidden">
            <MobileNav bookingsOpen={siteSettings?.bookingsOpen} />
          </div>

        </div>
      </header>

      <main className="flex-1">{children}</main>

      <Footer
        email={siteSettings?.email}
        phone={siteSettings?.phone}
        address={siteSettings?.address}
        mapUrl={siteSettings?.mapUrl}
        socialLinks={siteSettings?.socialLinks}
        footerCta={{
          headline: siteSettings?.footerCta?.headline,
          body: siteSettings?.footerCta?.body,
          buttonText: siteSettings?.footerCta?.buttonText,
          buttonHref: siteSettings?.bookingsOpen ? '/stay' : '/contact',
        }}
      />
    </div>
  )
}
