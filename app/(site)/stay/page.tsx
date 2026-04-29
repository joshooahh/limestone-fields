import type { Metadata } from 'next'
import Link from 'next/link'
import CabinCard from '@/components/sections/CabinCard'
import Hero from '@/components/sections/Hero'
import JsonLd from '@/components/seo/JsonLd'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { cabinsQuery, pageQuery } from '@/sanity/queries'
import type { Cabin, PageDocument } from '@/sanity/types'
import { ArrowRight } from 'lucide-react'

const lodgingSchema = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Limestone Fields',
  url: 'https://limestonefields.com/stay',
  priceRange: '$250–$450 per night',
  numberOfRooms: 10,
  containsPlace: [
    {
      '@type': 'HotelRoom',
      name: 'Standard Cabin',
      description: '256 sq ft cabin with king bed sleeping alcove, private outdoor cedar soaking tub, built-in workstation, and individual HVAC. Sleeps 2.',
      floorSize: { '@type': 'QuantitativeValue', value: 256, unitCode: 'FTK' },
      occupancy: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2 },
      bed: { '@type': 'BedDetails', typeOfBed: 'King size bed', numberOfBeds: 1 },
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Private outdoor cedar soaking tub', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Keyless smart lock', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Individual HVAC', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Built-in workstation', value: true },
      ],
    },
    {
      '@type': 'HotelRoom',
      name: 'Premium Cabin',
      description: '384 sq ft cabin with king bed, queen bunk beds, private outdoor cedar soaking tub, and premium bathroom fixtures. Sleeps up to 6.',
      floorSize: { '@type': 'QuantitativeValue', value: 384, unitCode: 'FTK' },
      occupancy: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 6 },
      bed: [
        { '@type': 'BedDetails', typeOfBed: 'King size bed', numberOfBeds: 1 },
        { '@type': 'BedDetails', typeOfBed: 'Bunk bed', numberOfBeds: 1 },
      ],
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Private outdoor cedar soaking tub', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Queen bunk beds', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Premium bathroom fixtures', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Individual HVAC', value: true },
      ],
    },
  ],
}

export const metadata: Metadata = {
  title: 'Stay',
  description:
    'Ten private cabins on 15 acres at Lake Limestone, Texas. Seven standard cabins (256 sq ft, king bed, cedar soaking tub) and three premium cabins (384 sq ft, sleeps up to 6). From $250/night. 2 hours from Austin, Dallas, and Houston.',
  openGraph: {
    title: 'Stay at Limestone Fields — Private Lakefront Cabins',
    description:
      'Ten custom-built cabins on Lake Limestone. Every cabin includes a private outdoor cedar soaking tub, king bed, and access to the shared Commons kitchen. From $250/night.',
    url: 'https://limestonefields.com/stay',
  },
  alternates: { canonical: 'https://limestonefields.com/stay' },
}

export default async function StayPage() {
  const [cabins, stayPage] = await Promise.all([
    client.fetch<Cabin[]>(cabinsQuery),
    client.fetch<PageDocument | null>(pageQuery, { slug: 'stay' }),
  ])

  return (
    <>
      <JsonLd data={lodgingSchema} />
      <Hero
        headline="The Cabins at Limestone Fields"
        subhead="Ten private cabins. Two thoughtful layouts. Everything you need, nothing you don't."
        ctaText="Check Availability"
        ctaHref="/book"
        backgroundImage={stayPage?.heroImage ? urlForImage(stayPage.heroImage).width(1600).auto('format').url() : undefined}
        backgroundImageAlt="Cabins at Limestone Fields"
      />

      {/* Intro blurb */}
      <section className="bg-limestone-cream py-24 md:py-36">
        <div className="container max-w-2xl mx-auto px-6 text-center">
          <p className="font-body-secondary text-lg md:text-xl text-[#253136] leading-relaxed">
            Stay in a private cabin on Lake Limestone, surrounded by open land, water,
            and quiet. Each cabin is designed for rest and unhurried presence.
            Spaced for privacy. Views of the lake or the surrounding land.
          </p>
        </div>
      </section>

      {/* Cabin Types */}
      <section className="py-24 md:py-32 bg-[#F9F4EE]">
        <div className="container max-w-6xl mx-auto px-6">
          <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136] mb-5">
            THE CABINS
          </p>
          <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136] mb-12">
            Two Layouts. Same Intention.
          </h2>
          {cabins?.length ? (
            <div className="space-y-16">
              {cabins.map((cabin) => (
                <CabinCard key={cabin._id} cabin={cabin} />
              ))}
            </div>
          ) : (
            <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
              {/* Cabin Type 1 */}
              <div className="space-y-5">
                <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                  LAYOUT ONE
                </p>
                <h3 className="text-[26px] font-headline leading-[1.37] text-[#253136]">
                  One Bedroom Lakeview Cabin
                </h3>
                <p className="text-[18px] text-[#253136] leading-[1.55]">
                  A private one-bedroom cabin with views of Lake Limestone. Designed for
                  stillness — generous windows, simple furnishings, and space to slow down.
                </p>
                <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136] pt-2">
                  INCLUDED
                </p>
                <ul className="space-y-3 text-[18px] text-[#253136] leading-[1.55]">
                  <li>Queen Bed with Natural Linens</li>
                  <li>Private Outdoor Soaking Tub or Porch</li>
                  <li>Writing Desk and Seating Area</li>
                  <li>Climate Control and Modern Bath</li>
                </ul>
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#253136]/90"
                >
                  Check Availability
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              {/* Cabin Type 2 */}
              <div className="space-y-5 md:pt-16">
                <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                  LAYOUT TWO
                </p>
                <h3 className="text-[26px] font-headline leading-[1.37] text-[#253136]">
                  Cabin Suite
                </h3>
                <p className="text-[18px] text-[#253136] leading-[1.55]">
                  More space for couples or small groups. Same intention: rest, clarity,
                  and connection to the land. Additional room and a more generous layout
                  without sacrificing the quiet.
                </p>
                <p className="font-body-secondary text-[17px] text-[#253136]/90 leading-[1.6] tracking-[0.03em] italic">
                  Both layouts were designed with the same question in mind:
                  what does a person actually need to feel settled?
                </p>
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#253136]/90"
                >
                  Check Availability
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Self-Guided Stay + What is Provided — two-column */}
      <section className="py-24 md:py-32 bg-[#CBD2DA]">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
          <div className="space-y-5">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              HOW IT WORKS
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              A Self-Guided Stay
            </h2>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              Limestone Fields offers care without constant presence. Arrival is simple.
              Instructions are clear. Spaces are prepared and ready. Help is always
              available when needed, but guests are never managed or directed.
              The intention is ease, not oversight.
            </p>
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136] pt-3">
              WHAT THIS MEANS
            </p>
            <ul className="space-y-3 text-[18px] text-[#253136] leading-[1.55]">
              <li>Simple, Independent Arrival</li>
              <li>Clear Guidance Throughout Your Stay</li>
              <li>Support Available Without Interruption</li>
              <li>Space to Move Through the Day on Your Own Terms</li>
            </ul>
          </div>
          <div className="space-y-5 md:pt-16">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              WHAT IS PROVIDED
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              Everything You Need. Nothing Extra.
            </h2>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              Everything here is intentional. Guests are provided with what they need
              to feel settled and comfortable, without excess.
            </p>
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136] pt-2">
              INCLUDED WITH YOUR STAY
            </p>
            <ul className="space-y-3 text-[18px] text-[#253136] leading-[1.55]">
              <li>Fresh Linens and Towels</li>
              <li>Access to the Shared Barn Kitchen</li>
              <li>Fire Pits and Outdoor Gathering Areas</li>
              <li>Parking Near the Cabins</li>
            </ul>
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136] pt-2">
              INTENTIONALLY LEFT OUT
            </p>
            <ul className="space-y-3 text-[18px] text-[#253136] leading-[1.55]">
              <li>No Televisions</li>
              <li>No Daily Housekeeping</li>
              <li>No Scheduled Programming</li>
              <li>No Full Service Dining</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Land + Who this is for — two-column */}
      <section className="py-24 md:py-32 bg-limestone-cream">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
          <div className="space-y-5">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              THE LAND
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              Not a Backdrop. An Active Presence.
            </h2>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              The barn serves as the heart of shared life at Limestone Fields —
              communal kitchen, tables for gathering, and space to linger.
              Interaction is always optional.
            </p>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              Guests are free to walk the property, sit by the water, and observe
              the working farm. Seasons shift. Crops change. Light moves across the lake.
              This is a place to notice what grows slowly.
            </p>
            <p className="font-body-secondary text-[17px] text-[#253136]/90 leading-[1.6] tracking-[0.03em] italic">
              The land is not a backdrop. It is the whole point.
            </p>
          </div>
          <div className="space-y-5 md:pt-16">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              WHO THIS IS FOR
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              People Who Like It Quiet
            </h2>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              Limestone Fields is best suited for guests who value quiet,
              independence, and simple comfort. The property is especially well
              suited for:
            </p>
            <ul className="space-y-3 text-[18px] text-[#253136] leading-[1.55]">
              <li>Solo Travelers</li>
              <li>Couples</li>
              <li>Writers and Creatives</li>
              <li>Those Seeking Rest Without Entertainment</li>
              <li>Guests Comfortable with a Self-Guided Stay</li>
            </ul>
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#253136]/90"
            >
              Check Availability
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
