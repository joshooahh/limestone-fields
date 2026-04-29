import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/sections/Hero'
import JsonLd from '@/components/seo/JsonLd'
import { ArrowRight } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { pageQuery } from '@/sanity/queries'
import type { PageDocument } from '@/sanity/types'

const eventVenueSchema = {
  '@context': 'https://schema.org',
  '@type': 'EventVenue',
  name: 'Limestone Fields',
  description: 'A private lakefront event venue on Lake Limestone, Texas. Available for intimate weddings, corporate retreats, and full property buyouts. One event at a time.',
  url: 'https://limestonefields.com/private-events',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '159 LCR 890',
    addressLocality: 'Jewett',
    addressRegion: 'TX',
    postalCode: '75846',
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 31.3471,
    longitude: -96.1502,
  },
  maximumAttendeeCapacity: 150,
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Lakefront ceremony site', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Barn commons (1,200 sq ft)', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Outdoor chef kitchen', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Fire pits', value: true },
    { '@type': 'LocationFeatureSpecification', name: '10 overnight cabins on site', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Full property exclusive use', value: true },
  ],
}

export const metadata: Metadata = {
  title: 'Private Events',
  description:
    'Limestone Fields hosts one event at a time — full property exclusive use. Intimate lakefront weddings (up to 150 guests), property buyouts, and private gatherings on Lake Limestone, Texas.',
  openGraph: {
    title: 'Private Events at Limestone Fields — Lake Limestone, TX',
    description:
      'Intimate weddings and private gatherings on Lake Limestone. Full property exclusive use. Up to 150 guests for ceremonies, 120 for receptions. BYOC model.',
    url: 'https://limestonefields.com/private-events',
  },
  alternates: { canonical: 'https://limestonefields.com/private-events' },
}

export default async function PrivateEventsPage() {
  const privateEventsPage = await client.fetch<PageDocument | null>(pageQuery, { slug: 'private-events' })

  return (
    <>
      <JsonLd data={eventVenueSchema} />
      <Hero
        headline="Gather with Intention"
        subhead="Limestone Fields is available for private events that value presence over production. We host one event at a time."
        eyebrow="Private Events"
        backgroundImage={privateEventsPage?.heroImage ? urlForImage(privateEventsPage.heroImage).width(1600).auto('format').url() : undefined}
        backgroundImageAlt="Private events at Limestone Fields"
      />

      {/* Property buyouts */}
      <section className="bg-limestone-cream py-24 md:py-32">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
          <div className="space-y-5">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              PROPERTY BUYOUTS
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              The Whole Place. Just Your Group.
            </h2>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              Full property buyouts are available for retreats, creative gatherings,
              and private events. All ten cabins, the Commons Barn, and the entire
              lakefront are reserved exclusively for your group.
              No other guests. No distractions.
            </p>
            <p className="font-body-secondary text-[17px] text-[#253136]/90 leading-[1.6] tracking-[0.03em] italic">
              We provide the setting. You bring the intention.
            </p>
            <ul className="space-y-3 text-[18px] text-[#253136] leading-[1.55]">
              <li>Executive and Leadership Retreats</li>
              <li>Creative Intensives and Writing Retreats</li>
              <li>Mastermind Groups and Team Offsites</li>
              <li>Intimate Celebrations and Family Gatherings</li>
            </ul>
            <Link
              href="/buyouts"
              className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#253136]/90"
            >
              Buyout Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-5 md:pt-16">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              WHAT YOU GET
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              Full Exclusive Access
            </h2>
            <ul className="space-y-3 text-[18px] text-[#253136] leading-[1.55]">
              <li>All 10 Cabins (up to 32 guests)</li>
              <li>1,200 sq ft Commons Barn with Full Kitchen</li>
              <li>1,200 ft of Private Lakefront</li>
              <li>Walking Paths and Open Land</li>
              <li>Fire Pits and Outdoor Gathering Areas</li>
              <li>Seasonal Farm Access</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Weddings */}
      <section className="py-24 md:py-32 bg-[#CBD2DA]">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
          <div className="space-y-5">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              WEDDINGS
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              Your People. Our Land. One Weekend.
            </h2>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              Intimate weddings are welcomed at Limestone Fields. With on-site cabins
              and shared gathering spaces, guests can stay together and move through
              the weekend without rush. No shuttles. No hotel blocks.
              Just your people, in one place, for a few days.
            </p>
            <p className="font-body-secondary text-[17px] text-[#253136]/90 leading-[1.6] tracking-[0.03em] italic">
              We host one event at a time. The property is yours.
              The weekend is yours. The land does most of the decorating.
            </p>
            <ul className="space-y-3 text-[18px] text-[#253136] leading-[1.55]">
              <li>Lakefront Ceremony Setting</li>
              <li>On-Site Guest Cabins for 28–30</li>
              <li>Barn Common Area and Kitchen</li>
              <li>Fire Pits and Outdoor Gathering Spaces</li>
            </ul>
            <Link
              href="/weddings"
              className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#253136]/90"
            >
              Wedding Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-5 md:pt-16">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              CAPACITY
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              Intimate Scale
            </h2>
            <ul className="space-y-3 text-[18px] text-[#253136] leading-[1.55]">
              <li>Up to 50 guests for the ceremony and reception</li>
              <li>28–30 guests overnight in the cabins</li>
              <li>Friday arrival through Sunday departure</li>
              <li>One wedding at a time — full property exclusivity</li>
            </ul>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              Small enough that every person in the room is someone who matters.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
