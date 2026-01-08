import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import Footer from '@/components/sections/Footer'
import { siteSettingsQuery } from '@/sanity/queries'
import type { SiteSettings } from '@/sanity/types'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/stay', label: 'Stay' },
  { href: '/weddings', label: 'Weddings' },
  { href: '/buyouts', label: 'Buyouts' },
  { href: '/story', label: 'Story' },
  { href: '/contact', label: 'Contact' },
]

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const siteSettings = await client.fetch<SiteSettings | null>(siteSettingsQuery)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b border-border bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-lg font-serif tracking-tight text-foreground">
            Limestone Fields
          </Link>
          <nav className="hidden items-center gap-6 text-sm uppercase tracking-[0.3rem] text-muted-foreground md:flex">
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
          <Link
            href={siteSettings?.bookingsOpen ? '/stay' : '/contact'}
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'sm' }),
              'hidden items-center gap-1 rounded-full border md:inline-flex'
            )}
          >
            {siteSettings?.bookingsOpen ? 'Book a cabin' : 'Join waitlist'}
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <main className="flex-1 bg-gradient-to-b from-background via-background to-muted/20">{children}</main>

      <Footer
        title={siteSettings?.title}
        description={siteSettings?.footerCta?.body ?? siteSettings?.description}
        email={siteSettings?.email}
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
