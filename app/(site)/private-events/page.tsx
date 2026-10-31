import type { Metadata } from 'next'
import { OG_IMAGES, VENUE_ID, ORGANIZATION_ID } from '@/lib/schema-constants'
import Link from 'next/link'
import Hero from '@/components/sections/Hero'
import JsonLd from '@/components/seo/JsonLd'
import { ArrowRight } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { pageQuery } from '@/sanity/queries'
import type { PageDocument } from '@/sanity/types'
import BuyoutInquiryForm from '@/components/forms/BuyoutInquiryForm'
import PropertyDateSearch from '@/components/booking/PropertyDateSearch'
import FromTheJournal from '@/components/blog/FromTheJournal'

const eventVenueSchema = {
  '@context': 'https://schema.org',
  '@type': 'EventVenue',
  '@id': VENUE_ID,
  name: 'Limestone Fields',
  parentOrganization: { '@id': ORGANIZATION_ID },
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
  maximumAttendeeCapacity: 50,
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
  title: 'Private Event Venue & Full Property Buyouts',
  description:
    'Host a wedding, corporate retreat, or reunion with exclusive use of all 10 cabins, the barn, and 1,200 ft of lakefront on Lake Limestone, Texas. Sleeps 26, near Austin, Dallas, and Houston.',
  openGraph: {
    images: OG_IMAGES,
    title: 'Private Events at Limestone Fields — Lake Limestone, TX',
    description:
      'Intimate weddings and private gatherings on Lake Limestone. Full property exclusive use. Up to 50 guests for the day, 26 overnight across ten cabins.',
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
        ctaText="Start an inquiry"
        ctaHref="#inquiry"
        backgroundImage={privateEventsPage?.heroImage ? urlForImage(privateEventsPage.heroImage).width(1600).auto('format').url() : undefined}
        backgroundImageAlt="Private events at Limestone Fields"
      />

      {/* Date search, whole property by default */}
      <section id="dates" className="bg-limestone-cream pb-10">
        <div className="container max-w-3xl mx-auto px-6 -mt-10 relative z-10">
          <PropertyDateSearch />
        </div>
      </section>

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
            <a
              href="#dates"
              className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#253136]/90"
            >
              Check your dates
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
          <div className="space-y-5 md:pt-16">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              WHAT YOU GET
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              Full Exclusive Access
            </h2>
            <ul className="space-y-3 text-[18px] text-[#253136] leading-[1.55]">
              <li>All 10 Cabins (sleeps 26)</li>
              <li>1,200 sq ft Commons Barn with Full Kitchen</li>
              <li>1,200 ft of Private Lakefront</li>
              <li>Walking Paths and Open Land</li>
              <li>Fire Pits and Outdoor Gathering Areas</li>
              <li>Seasonal Farm Access</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Who takes the whole property */}
      <section className="py-24 md:py-32 bg-[#CBD2DA]">
        <div className="container max-w-6xl mx-auto px-6">
          <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136] mb-5">
            WHO TAKES THE WHOLE PROPERTY
          </p>
          <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136] mb-12">
            The Kinds of Groups That Come Here
          </h2>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="space-y-4">
              <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                EXECUTIVE RETREATS
              </p>
              <p className="text-[18px] text-[#253136] leading-[1.55]">
                Leadership teams seeking focused time for strategic planning, decision-making,
                and alignment away from the office. The kind of thinking that requires
                actual quiet.
              </p>
            </div>
            <div className="space-y-4">
              <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                CREATIVE INTENSIVES
              </p>
              <p className="text-[18px] text-[#253136] leading-[1.55]">
                Writing retreats, design sprints, mastermind groups, and teams working
                on projects that require deep, uninterrupted focus. Time that is yours
                to account for.
              </p>
            </div>
            <div className="space-y-4">
              <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                INTIMATE CELEBRATIONS
              </p>
              <p className="text-[18px] text-[#253136] leading-[1.55]">
                Small weddings, milestone gatherings, and family reunions that value
                presence over performance. People who want to be together without
                an audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The process */}
      <section className="py-24 md:py-32 bg-limestone-cream">
        <div className="container max-w-6xl mx-auto px-6">
          <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136] mb-5">
            THE PROCESS
          </p>
          <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136] mb-12">
            Simple from Start to Arrival
          </h2>
          <div className="grid gap-10 md:grid-cols-4">
            {[
              {
                step: '01',
                title: 'Inquire',
                description: 'Fill out the form below with your dates, group size, and what you are planning.',
              },
              {
                step: '02',
                title: 'Proposal',
                description: 'We send a custom proposal with pricing, availability, and property details.',
              },
              {
                step: '03',
                title: 'Reserve',
                description: 'Confirm your dates with a deposit. The property is yours.',
              },
              {
                step: '04',
                title: 'Arrive',
                description: 'Check in, settle in, and use the space however you came to use it.',
              },
            ].map((item) => (
              <div key={item.step} className="space-y-4">
                <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                  {item.step}
                </p>
                <h3 className="text-[22px] font-headline leading-[1.37] text-[#253136]">
                  {item.title}
                </h3>
                <p className="text-[18px] text-[#253136] leading-[1.55]">
                  {item.description}
                </p>
              </div>
            ))}
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
              <li>On-Site Guest Cabins for 26</li>
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
              <li>26 guests overnight in the cabins</li>
              <li>Friday arrival through Sunday departure</li>
              <li>One wedding at a time — full property exclusivity</li>
            </ul>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              Small enough that every person in the room is someone who matters.
            </p>
          </div>
        </div>
      </section>

      {/* Specific-need landing pages */}
      <section className="py-20 md:py-24 bg-[#F9F4EE] border-t border-[#253136]/10">
        <div className="container max-w-6xl mx-auto px-6">
          <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]/60 mb-4">
            Planning something specific?
          </p>
          <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136] mb-10">
            Three ways people use the whole property.
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ['/small-weddings', 'Small weddings', 'A wedding where everyone stays. Up to 26 overnight, ceremony for 50, one wedding at a time.'],
              ['/company-retreats', 'Company retreats', 'Get the whole team in one place, then get quiet. Sessions in the barn, cabins for everyone.'],
              ['/family-reunions', 'Family reunions', 'Ten cabins so every household has its own door, one barn kitchen for every meal.'],
            ].map(([href, title, body]) => (
              <Link
                key={href}
                href={href}
                className="group block bg-limestone-cream border border-[#253136]/15 rounded-md p-8 transition hover:border-[#253136]/40"
              >
                <h3 className="font-headline text-[24px] leading-[1.25] text-[#253136] mb-3">{title}</h3>
                <p className="text-[16px] text-[#253136]/75 leading-[1.6] mb-5">{body}</p>
                <span className="font-subhead text-[11px] tracking-[0.22em] uppercase text-[#253136]/60 group-hover:text-[#253136] transition">
                  See how it works →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FromTheJournal slug="corporate-retreat-venues-texas" className="bg-limestone-cream" />

      {/* Inquiry Form — dark bg section */}
      <section id="inquiry" className="py-24 md:py-32 bg-[#253136]">
        <div className="container max-w-4xl mx-auto px-6">
          <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#b3c1ce] mb-5">
            START HERE
          </p>
          <h2 className="text-[32px] font-headline leading-[1.37] text-[#f7f2e4] mb-10">
            Reserve the Property for Your Group
          </h2>
          <BuyoutInquiryForm />
        </div>
      </section>
    </>
  )
}
