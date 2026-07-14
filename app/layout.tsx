import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { seoSettingsQuery } from '@/sanity/queries'
import { CLOUDBEDS_PROPERTY_CODE } from '@/lib/cloudbeds'

import './globals.css'



const fraunces = Fraunces({

  subsets: ['latin'],

  variable: '--font-fraunces',

  display: 'swap',

})



const inter = Inter({

  subsets: ['latin'],

  variable: '--font-inter',

  display: 'swap',

})



const jetbrainsMono = JetBrains_Mono({

  subsets: ['latin'],

  variable: '--font-jetbrains',

  display: 'swap',

})



// Custom fonts
const abcDailySlab = localFont({
  src: [
    {
      path: './fonts/ABCDailySlab-RegularItalic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/ABCDailySlab-RegularItalic.woff',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-abc-daily-slab',
  display: 'swap',
})

const abcMarfa = localFont({
  src: [
    {
      path: './fonts/ABCMarfa-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/ABCMarfa-Light.woff',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--font-abc-marfa',
  display: 'swap',
})

const abcMarfaMono = localFont({
  src: [
    {
      path: './fonts/ABCMarfaMono-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/ABCMarfaMono-Medium.woff',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-abc-marfa-mono',
  display: 'swap',
})

const messinaModern = localFont({
  src: [
    {
      path: './fonts/MessinaModernWeb-Book.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/MessinaModernWeb-Book.woff',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-messina-modern',
  display: 'swap',
})

const ppKyoto = localFont({
  src: [
    {
      path: './fonts/PPKyoto-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/PPKyoto-Light.woff',
      weight: '300',
      style: 'normal',
    },
  ],
  variable: '--font-pp-kyoto',
  display: 'swap',
})



const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://limestonefields.com'

export async function generateMetadata(): Promise<Metadata> {
  const seo = await client.fetch(seoSettingsQuery).catch(() => null)
  const ogImage = seo?.home?.ogImage?.asset
    ? urlForImage(seo.home.ogImage).width(1200).height(630).fit('crop').auto('format').url()
    : null

  const ogImages = ogImage
    ? [{ url: ogImage, width: 1200, height: 630, alt: 'Limestone Fields — Lake Limestone, TX' }]
    : []

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: 'Limestone Fields — Lakefront Cabins & Event Venue, Lake Limestone TX',
      template: '%s — Limestone Fields',
    },
    description:
      'Ten custom-built cabins on 16 acres at Lake Limestone, Texas. A lakefront retreat and event venue for rest, reflection, weddings, and private gatherings — 2 hours from Austin, Dallas, and Houston.',
    keywords: [
      'Lake Limestone cabins',
      'Texas lakefront retreat',
      'cabin rental Texas',
      'wedding venue Texas Hill Country',
      'private event venue Texas',
      'Lake Limestone wedding',
      'Texas cabin getaway',
      'Jewett TX lodging',
      'lakefront event venue Texas',
      'corporate retreat Texas',
    ],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: SITE_URL,
      siteName: 'Limestone Fields',
      title: 'Limestone Fields — Lakefront Cabins & Event Venue, Lake Limestone TX',
      description:
        'Ten custom-built cabins on 16 acres at Lake Limestone, Texas. A lakefront retreat and event venue — 2 hours from Austin, Dallas, and Houston.',
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Limestone Fields — Lakefront Cabins & Event Venue',
      description:
        'Ten custom-built cabins on 16 acres at Lake Limestone, Texas. Rest, reflection, weddings, and private gatherings.',
      images: ogImage ? [ogImage] : [],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: SITE_URL,
    },
  }
}



export default function RootLayout({

  children,

}: {

  children: React.ReactNode

}) {

  return (

    <html 

      lang="en" 

      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} ${abcDailySlab.variable} ${abcMarfa.variable} ${abcMarfaMono.variable} ${messinaModern.variable} ${ppKyoto.variable}`}

    >

      <body className={abcMarfa.className}>

        {/*
          Cloudbeds Booking Engine — Immersive Experience 2.0.
          beforeInteractive so the custom elements (<cb-book-now-button>,
          <cb-immersive-experience>) are registered before any page tries to
          use them. Not wired into any live button yet — see
          components/booking/CloudbedsBookButton.tsx.
          If a cookie-consent manager (CMP) is ever added to this site, add
          the matching "ignore" attribute here per Cloudbeds' CMP guidance
          (e.g. data-cookieconsent="ignore" for Cookiebot).
        */}
        <Script
          src="https://static1.cloudbeds.com/booking-engine/latest/static/js/immersive-experience/cb-immersive-experience.js"
          strategy="beforeInteractive"
        />

        {/*
          Second Cloudbeds script, specifically for <cb-accommodation-date-picker>
          (per-room-type calendars on /stay) — this embed type is on a
          different/newer bundle than the one above, per Cloudbeds' own docs.
          Missing data-island: Cloudbeds' dashboard doesn't currently surface
          a personalized code snippet for this embed (confirmed with Josh —
          nothing shown under Embeds > Accommodation Date Picker beyond the
          generic preview graphic). Attempting without it for now; if the
          calendars don't render on /book/cloudbeds-preview, this is the
          first thing to check with Cloudbeds support.
        */}
        <Script
          src="https://hotels.cloudbeds.com/cb-immersive-experience.js"
          data-environment="prod"
          data-property-code={CLOUDBEDS_PROPERTY_CODE}
          strategy="beforeInteractive"
        />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3NKQWWLYT9"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3NKQWWLYT9');
          `}
        </Script>

        {children}

      </body>

    </html>

  )

}
