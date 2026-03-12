import type { Metadata } from 'next'

import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Limestone Fields — Lakefront Cabins & Event Venue, Lake Limestone TX',
    template: '%s — Limestone Fields',
  },
  description:
    'Ten custom-built cabins on 15 acres at Lake Limestone, Texas. A lakefront retreat and event venue for rest, reflection, weddings, and private gatherings — 2 hours from Austin, Dallas, and Houston.',
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
      'Ten custom-built cabins on 15 acres at Lake Limestone, Texas. A lakefront retreat and event venue — 2 hours from Austin, Dallas, and Houston.',
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Sunrise over Lake Limestone — Limestone Fields',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Limestone Fields — Lakefront Cabins & Event Venue',
    description:
      'Ten custom-built cabins on 15 acres at Lake Limestone, Texas. Rest, reflection, weddings, and private gatherings.',
    images: [`${SITE_URL}/og-image.jpg`],
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

        {children}

      </body>

    </html>

  )

}
