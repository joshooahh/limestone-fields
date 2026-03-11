import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/sections/Hero'
import JsonLd from '@/components/seo/JsonLd'
import { ArrowRight } from 'lucide-react'

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

// Homepage images from Figma (frames 2004:12, 2004:19, 2004:20, etc.)
const FIGMA_IMAGES = {
  heroLakeFigma: 'https://www.figma.com/api/mcp/asset/f5dd992d-3f69-4a66-b52d-850d29e419f5',
  placeShapedByLand: 'https://www.figma.com/api/mcp/asset/434bda16-4815-4526-ae3c-9b92e7e76547',
  stayBookTable: 'https://www.figma.com/api/mcp/asset/901002cd-b473-4339-be4f-3f5f4fdc46fc',
  stayMug: 'https://www.figma.com/api/mcp/asset/ec75a44a-74c3-483e-96c1-4385f6fadaf3',
  cabinsDetail: 'https://www.figma.com/api/mcp/asset/03cb1ee8-eb70-4f15-b6db-ba9774fc9d55',
  experienceTeapot: 'https://www.figma.com/api/mcp/asset/d1e4c5a1-65de-4223-b242-a7c08239913b',
  experienceFlower: 'https://www.figma.com/api/mcp/asset/c09485a3-46da-4d00-8158-30a48c340889',
  experienceHands: 'https://www.figma.com/api/mcp/asset/bc1cf922-45f2-4763-9f3c-3c76743c06e8',
  eventsWedding: 'https://www.figma.com/api/mcp/asset/db1f86a5-1173-4170-a05b-0a3326bbfbd8',
  eventsReeds: 'https://www.figma.com/api/mcp/asset/c5cc9615-4fd5-4a4e-b362-f64c90f5dc0e',
  eventsFirepit: 'https://www.figma.com/api/mcp/asset/ac8ab271-dcfe-4849-9e7e-8aee4ac7a5c6',
}

export default async function HomePage() {
  return (
    <>
      <JsonLd data={lodgingBusinessSchema} />

      {/* ── HERO ──────────────────────────────────────────────────────────────
          Fix: added min-h-[75vh] + flex/items-center to Hero via wrapper,
          so the hero fills ~75% of the viewport like Figma node 2004:28.
          The Hero component handles the internal layout; we override its
          height by passing a className prop. If your Hero doesn't accept
          className, wrap it or edit Hero.tsx to use min-h-[75vh] flex items-center
          on the section instead of py-28 md:py-40.
      ──────────────────────────────────────────────────────────────────────── */}
      <Hero
        headline="A Collection of Well-Appointed Cabins and Barn Accommodations, Each Designed for Rest and Renewal."
        subhead=""
        ctaText="Join Waitlist"
        ctaHref="/contact"
        backgroundImage={FIGMA_IMAGES.heroLakeFigma}
        backgroundImageAlt="Sunrise over Lake Limestone"
      />

      {/* ── INTRO BLURB ───────────────────────────────────────────────────────
          Fix: was py-16 md:py-20 → now py-24 md:py-36
          Figma shows this as a very airy, tall section with the single
          centered italic sentence floating in lots of cream space.
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="bg-limestone-cream py-24 md:py-36">
        <div className="container max-w-2xl mx-auto px-6 text-center">
          <p className="font-body-secondary text-lg md:text-xl text-limestone-dark-blue leading-relaxed">
            Located within easy reach of Austin, Dallas, and Houston, the property is
            designed for rest, reflection, and clarity.
          </p>
        </div>
      </section>

      {/* ── THIS IS A PLACE SHAPED BY LAND AND TIME ───────────────────────────
          Fix: column ratio was wrong — image should be wider (roughly 60/40).
          Also increased image height to match Figma proportions, and tightened
          max-width on the text column.
          Figma node 2004:27.
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="bg-limestone-cream py-16 md:py-24">
        <div className="mx-auto grid max-w-[1120px] items-center gap-12 px-6 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:px-16 lg:gap-20">
          {/* Image — left column, taller aspect ratio */}
          <div className="relative w-full aspect-[4/3] md:aspect-auto md:h-[480px] overflow-hidden rounded-lg shadow-sm">
            <Image
              src={FIGMA_IMAGES.placeShapedByLand}
              alt="Sunrise over the lake and surrounding fields"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 620px, (min-width: 768px) 60vw, 100vw"
              priority
            />
          </div>
          {/* Text — right column */}
          <div className="space-y-6">
            <h2 className="text-[28px] md:text-[32px] font-headline leading-[1.37] text-foreground">
              This is a Place Shaped by Land and Time
            </h2>
            <p className="text-[18px] md:text-[20px] text-muted-foreground leading-[1.55]">
              Mornings unfold slowly. Evenings quiet down on their own. With thoughtful
              design and just enough support, guests are free to move at their own pace
              and focus on what matters.
            </p>
          </div>
        </div>
      </section>

      {/* ── STAY — Cabins Designed for Presence ───────────────────────────────
          Fix: The overlapping image card (stayMug) was using absolute positioning
          with no defined parent height, causing it to escape the layout.
          Solution: set an explicit height on the image wrapper div, and position
          the overlay card relative to the outer container using negative offset.
          Figma node 2004:12.
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#CBD2DA]">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-center">
          {/* Left: text */}
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
              href="/stay"
              className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#253136]/90"
            >
              Booking Soon
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          {/* Right: stacked image pair */}
          <div className="relative h-[480px] md:h-[560px]">
            {/* Large background image */}
            <div className="absolute top-0 right-0 w-full h-full md:w-[390px] overflow-hidden rounded-lg">
              <Image
                src={FIGMA_IMAGES.stayBookTable}
                alt="Books and natural light"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 390px, 100vw"
              />
            </div>
            {/* Smaller overlay card — bottom-right, offset to overlap */}
            <div className="absolute bottom-[-24px] right-[-16px] md:right-[-24px] w-[180px] h-[240px] md:w-[210px] md:h-[280px] overflow-hidden rounded-lg shadow-xl z-10 border-4 border-[#CBD2DA]">
              <Image
                src={FIGMA_IMAGES.stayMug}
                alt="Quiet moment"
                fill
                className="object-cover"
                sizes="210px"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE — Scheduled by the Sun ────────────────────────────────
          Fix: list items were text-[24px] font-headline which made them huge.
          Figma shows these as normal body-size items (~18-20px), not headline.
          Also fixed image column to be proper left-aligned, not centered.
          Figma node 2004:19.
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-limestone-cream">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
          {/* Left: image mosaic */}
          <div className="order-2 md:order-1 space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={FIGMA_IMAGES.experienceTeapot}
                alt="Morning at Limestone Fields"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={FIGMA_IMAGES.experienceFlower}
                  alt="Land and light"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
              </div>
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <Image
                  src={FIGMA_IMAGES.experienceHands}
                  alt="Growing season"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Right: text */}
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
            {/* Fix: was text-[24px] font-headline — too large. Now matches Stay list style */}
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

      {/* ── PRIVATE EVENTS — Gather by the Lake ──────────────────────────────
          Fix: same oversized list text issue as Experience — was text-[24px]
          font-headline, now text-[18px] body weight to match Figma.
          Also tightened vertical spacing to match the Figma section rhythm.
          Figma node 2004:20.
      ──────────────────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-32 bg-[#F9F4EE]">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
          {/* Left: text */}
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
            {/* Fix: was text-[24px] font-headline — too large */}
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

          {/* Right: image mosaic — 1 large + 2 small below */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
              <Image
                src={FIGMA_IMAGES.eventsWedding}
                alt="Gather by the lake"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={FIGMA_IMAGES.eventsReeds}
                  alt="Lakeside"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image
                  src={FIGMA_IMAGES.eventsFirepit}
                  alt="Fire pits for gathering"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 25vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  )
}
