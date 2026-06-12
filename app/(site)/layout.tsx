export const revalidate = 60

import type { ReactNode } from 'react'
import { client } from '@/sanity/lib/client'
import Footer from '@/components/sections/Footer'
import { siteSettingsQuery } from '@/sanity/queries'
import type { SiteSettings } from '@/sanity/types'
import SiteHeader from '@/components/ui/SiteHeader'

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const siteSettings = await client.fetch<SiteSettings | null>(siteSettingsQuery)

  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader bookingsOpen={siteSettings?.bookingsOpen} />

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
          buttonHref: siteSettings?.bookingsOpen ? '/book' : '/contact',
        }}
      />
    </div>
  )
}
