import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/sections/Hero'
import JsonLd from '@/components/seo/JsonLd'
import { ArrowRight } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { homepageImagesQuery } from '@/sanity/queries'
import type { Image as SanityImage } from 'sanity'

export const metadata: Metadata = {
  title: 'Limestone Fields — Lakefront Cabins & Event Venue, Lake Limestone TX',
  description:
    'Ten custom-built cabins on 15 acres at Lake Limestone, Texas. A lakefront creative retreat and event venue for rest, reflection, weddings, and private gatherings. 2 hours from Austin, Dallas, and Houston.',
  alternates: { canonical: 'https://limestonefields.com' },
}

const lodgingBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LodgingBusiness',
  name: 'Limestone Fields',
  description:
    'A lakefront creative retreat and event venue set on 15 acres at Lake Limestone, Texas. Ten custom-built cabins, a 1,200 sq ft commons building with indoor and outdoor chef\'s kitchens, and a working permaculture farm.',
  url: 'https://limestonefields.com',
  email: 'hello@limestonefields.com',
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
  numberOfRooms: 10,
  priceRange: '$250–$450 per night',
  openingDate: '2026-04-15',
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: 'Private outdoor cedar soaking tub', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'King bed', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Individual HVAC', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Keyless smart lock', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Shared chef\'s kitchen', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Outdoor kitchen with Santa Maria grill', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Lake frontage', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Working permaculture farm', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'On-site event venue', value: true },
  ],
  containsPlace: [
    {
      '@type': 'HotelRoom',
      name: 'Standard Cabin',
      description: '256 sq ft private cabin with king bed sleeping alcove, private outdoor cedar soaking tub, built-in work station, and individual HVAC.',
      floorSize: { '@type': 'QuantitativeValue', value: 256, unitCode: 'FTK' },
      occupancy: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 2 },
      bed: { '@type': 'BedDetails', typeOfBed: 'King size bed', numberOfBeds: 1 },
    },
    {
      '@type': 'HotelRoom',
      name: 'Premium Cabin',
      description: '384 sq ft premium cabin with king bed, queen bunk beds, private outdoor cedar soaking tub, and premium bathroom fixtures. Sleeps up to 6.',
      floorSize: { '@type': 'QuantitativeValue', value: 384, unitCode: 'FTK' },
      occupancy: { '@type': 'QuantitativeValue', minValue: 1, maxValue: 6 },
      bed: [
        { '@type': 'BedDetails', typeOfBed: 'King size bed', numberOfBeds: 1 },
        { '@type': 'BedDetails', typeOfBed: 'Bunk bed', numberOfBeds: 1 },
      ],
    },
  ],
  touristType: ['Couples', 'Families', 'Groups', 'Corporate retreats', 'Wedding parties'],
}

type HomepageImages = {
  heroImage?: SanityImage | null
  placeShapedByLand?: SanityImage | null
  stayMain?: SanityImage | null
  stayDetail?: SanityImage | null
  experienceMain?: SanityImage | null
  experienceLeft?: SanityImage | null
  experienceRight?: SanityImage | null
  eventsMain?: SanityImage | null
  eventsLeft?: SanityImage | null
  eventsRight?: SanityImage | null
}

function img(sanityImage: SanityImage | null | undefined, width = 1400): string | null {
  if (sanityImage?.asset) {
    return urlForImage(sanityImage).width(width).auto('format').url()
  }
  return null
}

export default async function HomePage() {
  const images = await client.fetch<HomepageImages | null>(homepageImagesQuery).catch(() => null)

  return (
    <>
      <JsonLd data={lodgingBusinessSchema} />

      <Hero
        headline="A Collection of Well-Appointed Cabins and Barn Accommodations, Each Designed for Rest and Renewal."
        subhead=""
        ctaText="Check Availability"
        ctaHref="/book"
        backgroundImage={img(images?.heroImage) ?? undefined}
        backgroundImageAlt="Sunrise over Lake Limestone"
      />

      {/* Availability CTA bar */}
      <section className="bg-limestone-cream py-12 border-b border-[#253136]/10">
        <div className="container max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-body-secondary text-[17px] text-[#253136]/70 italic text-center md:text-left">
            From $250 / night · Lake Limestone, TX · 2 hrs from Austin, Dallas &amp; Houston
          </p>
          <Link
            href="/book"
            className="shrink-0 inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#253136]/90"
          >
            Check Availability
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="bg-limestone-cream py-24 md:py-36">
        <div className="container max-w-2xl mx-auto px-6 text-center">
          <p className="font-body-secondary text-lg md:text-xl text-limestone-dark-blue leading-relaxed">
            Located within easy reach of Austin, Dallas, and Houston, the property is
            designed for rest, reflection, and clarity.
          </p>
        </div>
      </section>

      <section className="bg-limestone-cream py-16 md:py-24">
        <div className="mx-auto grid max-w-[1120px] items-center gap-12 px-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:px-16 lg:gap-20">
          <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-[480px] overflow-hidden rounded-lg shadow-sm bg-[#CBD2DA]">
            {img(images?.placeShapedByLand) && (
              <Image
                src={img(images?.placeShapedByLand)!}
                alt="Sunrise over the lake and surrounding fields"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 620px, (min-width: 768px) 60vw, 100vw"
                priority
              />
            )}
          </div>
          <div className="space-y-6">
            <h2 className="text-[28px] md:text-[32px] font-headline leading-[1.37] text-[#253136]">
              This is a Place Shaped by Land and Time
            </h2>
            <p className="text-[18px] md:text-[20px] text-[#253136]/75 leading-[1.55]">
              Mornings unfold slowly. Evenings quiet down on their own. With thoughtful
              design and just enough support, guests are free to move at their own pace
              and focus on what matters.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#CBD2DA]">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
          <div className="space-y-5">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              STAY
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              Cabins Designed for Presence
            </h2>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              Ten private cabins sit lightly across 16 acres, each offering space to
              breathe and settle in. Two simple layouts. Natural materials and quiet
              interiors. Generous windows. Nothing superfluous.
            </p>
            <p className="font-body-secondary text-[17px] text-[#253136]/90 leading-[1.6] tracking-[0.03em] italic">
              The cabins are designed to support rest and focus, not performance. Comfort
              feels intuitive. The pace is unhurried.
            </p>
            <ul className="space-y-2 text-[18px] text-[#253136] leading-[1.55]">
              <li>Ten private guest cabins on Lake Limestone</li>
              <li>Two thoughtfully designed cabin layouts</li>
              <li>Natural materials and quiet interiors</li>
              <li>Space for rest, reading, writing, and reflection</li>
            </ul>
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#253136]/90"
            >
              Check Availability
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="relative h-[480px] md:h-[560px]">
            <div className="absolute top-0 right-0 w-full h-full md:w-[390px] overflow-hidden rounded-lg bg-[#b3c1ce]">
              {img(images?.stayMain) && (
                <Image
                  src={img(images?.stayMain)!}
                  alt="Books and natural light"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 390px, 100vw"
                />
              )}
            </div>
            {img(images?.stayDetail) && (
              <div className="absolute bottom-[-24px] right-[-16px] md:right-[-24px] w-[180px] h-[240px] md:w-[210px] md:h-[280px] overflow-hidden rounded-lg shadow-xl z-10 border-4 border-[#CBD2DA] bg-[#b3c1ce]">
                <Image
                  src={img(images?.stayDetail)!}
                  alt="Quiet moment"
                  fill
                  className="object-cover"
                  sizes="210px"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-limestone-cream">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
          <div className="order-2 md:order-1 space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#CBD2DA]">
              {img(images?.experienceMain) && (
                <Image
                  src={img(images?.experienceMain)!}
                  alt="Morning at Limestone Fields"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-[#CBD2DA]">
                {img(images?.experienceLeft, 600) && (
                  <Image
                    src={img(images?.experienceLeft, 600)!}
                    alt="Land and light"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 25vw, 50vw"
                  />
                )}
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg bg-[#CBD2DA]">
                {img(images?.experienceRight, 600) && (
                  <Image
                    src={img(images?.experienceRight, 600)!}
                    alt="Growing season"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 25vw, 50vw"
                  />
                )}
              </div>
            </div>
          </div>

          <div className="order-1 md:order-2 space-y-5">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              EXPERIENCE
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              Scheduled by the Sun
            </h2>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              Life at Limestone Fields is intentionally unprogrammed. The land sets the
              rhythm and guests follow it as they choose. Shared spaces invite connection
              without expectation. The working farm offers quiet participation. The lake,
              the trees, and the open sky do most of the work.
            </p>
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136] pt-3">
              THE EXPERIENCE INCLUDES
            </p>
            <ul className="space-y-3 text-[18px] text-[#253136] leading-[1.55]">
              <li>A Shared Barn and Communal Kitchen</li>
              <li>A Working Farm with Seasonal Crops</li>
              <li>Open Land, Walking Paths, and Lake Access</li>
              <li>Occasional Classes and Small Gatherings</li>
            </ul>
            <Link
              href="/experience"
              className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#f7e7d5] transition hover:bg-[#253136]/90"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#F9F4EE]">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
          <div className="space-y-5">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              PRIVATE EVENTS
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              Gather by the Lake
            </h2>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              Limestone Fields hosts intimate weddings and private gatherings on Lake
              Limestone. We host one event at a time so the full property is yours, the
              time is yours, and the land does most of the decorating.
            </p>
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136] pt-4">
              EVENT AMENITIES
            </p>
            <ul className="space-y-3 text-[18px] text-[#253136] leading-[1.55]">
              <li>Barn Common Area and Communal Kitchen</li>
              <li>Lakefront Ceremony and Event Site</li>
              <li>Fire Pits for Gathering</li>
              <li>Property Buyout Option</li>
            </ul>
            <Link
              href="/private-events"
              className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#f7e7d5] transition hover:bg-[#253136]/90"
            >
              Learn More
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#b3c1ce]">
              {img(images?.eventsMain) && (
                <Image
                  src={img(images?.eventsMain)!}
                  alt="Gather by the lake"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#b3c1ce]">
                {img(images?.eventsLeft, 600) && (
                  <Image
                    src={img(images?.eventsLeft, 600)!}
                    alt="Lakeside"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 25vw, 50vw"
                  />
                )}
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-[#b3c1ce]">
                {img(images?.eventsRight, 600) && (
                  <Image
                    src={img(images?.eventsRight, 600)!}
                    alt="Fire pits for gathering"
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 25vw, 50vw"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
