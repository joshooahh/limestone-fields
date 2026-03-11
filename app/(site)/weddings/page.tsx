import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { pageQuery } from '@/sanity/queries'
import type { PageDocument } from '@/sanity/types'
import Hero from '@/components/sections/Hero'
import PageSections from '@/components/sections/PageSections'
import WeddingInquiryForm from '@/components/forms/WeddingInquiryForm'
import JsonLd from '@/components/seo/JsonLd'

const eventVenueSchema = {
  '@context': 'https://schema.org',
  '@type': 'EventVenue',
  name: 'Limestone Fields',
  description:
    'A lakefront wedding and event venue on Lake Limestone, Texas. Full property exclusive use. Ceremony site for up to 150 guests, 1,200 sq ft barn reception space, and 10 private overnight cabins.',
  url: 'https://limestonefields.com/weddings',
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
    { '@type': 'LocationFeatureSpecification', name: 'Barn reception space (1,200 sq ft)', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Outdoor pergola', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Ceremony chairs (up to 150)', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Sound system', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Tables and chairs', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'String lights and uplighting', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Bridal suite', value: true },
    { '@type': 'LocationFeatureSpecification', name: "Groom's suite", value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Parking for 50+ vehicles', value: true },
    { '@type': 'LocationFeatureSpecification', name: '10 overnight cabins on site', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Friday rehearsal dinner space', value: true },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<PageDocument | null>(pageQuery, { slug: 'weddings' })
  return {
    title: page?.seo?.metaTitle ?? 'Weddings',
    description:
      page?.seo?.metaDescription ??
      'Host your wedding at Limestone Fields on Lake Limestone, Texas. Lakefront ceremony site (up to 150 guests), 10 private cabins for overnight guests, and a 1,200 sq ft barn reception space. Full property exclusive use. 2 hours from Austin, Dallas, and Houston.',
    openGraph: {
      title: page?.seo?.metaTitle ?? 'Weddings at Limestone Fields — Lake Limestone, TX',
      description:
        page?.seo?.metaDescription ??
        'A lakefront wedding venue on Lake Limestone. Ceremony for up to 150 guests, barn reception, 10 cabins for overnight guests. Full property exclusive use.',
      url: 'https://limestonefields.com/weddings',
    },
    alternates: { canonical: 'https://limestonefields.com/weddings' },
  }
}

export default async function WeddingsPage() {
  const weddingsPage = await client.fetch<PageDocument | null>(pageQuery, { slug: 'weddings' })

  return (
    <>
      <JsonLd data={eventVenueSchema} />
      <Hero
        headline="Your People. Our Land. One Weekend."
        subhead="A lakefront property where celebrations feel less like productions and more like gatherings."
        eyebrow="Weddings at Limestone Fields"
        ctaText="Start an Inquiry"
        ctaHref="#inquiry"
      />

      {/* Dynamic Sections from Sanity — overrides hardcoded content if configured */}
      {weddingsPage?.sections && weddingsPage.sections.length > 0 ? (
        <PageSections sections={weddingsPage.sections} />
      ) : (
        <>
          {/* Intro blurb */}
          <section className="bg-limestone-cream py-24 md:py-36">
            <div className="container max-w-2xl mx-auto px-6 text-center">
              <p className="font-body-secondary text-lg md:text-xl text-[#253136] leading-relaxed">
                Ten cabins for your closest people. A ceremony site on the water. A barn
                for dinner and dancing. A working farm. And a weekend — not just a day —
                to be together without rushing.
              </p>
            </div>
          </section>

          {/* The idea + What this offers — two-column */}
          <section className="py-24 md:py-32 bg-[#F9F4EE]">
            <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
              <div className="space-y-5">
                <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                  THE IDEA
                </p>
                <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
                  Not a Wedding Factory
                </h2>
                <p className="text-[18px] text-[#253136] leading-[1.55]">
                  We host one event at a time. The property is yours. The weekend is yours.
                  The land does most of the decorating. Intimate scale — seventy-five to one
                  hundred fifty guests — small enough to feel personal, large enough to gather
                  everyone who matters.
                </p>
                <p className="font-body-secondary text-[17px] text-[#253136]/90 leading-[1.6] tracking-[0.03em] italic">
                  Bring your own caterer. Bring your own vision. We provide the space,
                  the accommodations, and the kind of setting that doesn&apos;t need much
                  help to feel special.
                </p>
              </div>
              <div className="space-y-5 md:pt-16">
                <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                  FOR COUPLES WHO WANT
                </p>
                <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
                  What This Place Offers
                </h2>
                <ul className="space-y-5 text-[18px] text-[#253136] leading-[1.55]">
                  <li>
                    <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">A WEEKEND, NOT JUST A DAY</span>
                    Friday arrival, Sunday departure. Your people stay here with you. No shuttles. No hotel blocks.
                  </li>
                  <li>
                    <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">NATURAL BEAUTY</span>
                    Lakefront ceremony site. Open sky. The land does the decorating.
                  </li>
                  <li>
                    <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">ALL IN ONE PLACE</span>
                    Ceremony, reception, and overnight accommodations. Less logistics, more presence.
                  </li>
                  <li>
                    <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">FULL PRIVACY</span>
                    One wedding at a time. The entire property is yours. No strangers, no other events.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* What's included + What you provide — two-column */}
          <section className="py-24 md:py-32 bg-[#CBD2DA]">
            <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
              <div className="space-y-5">
                <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                  WHAT&apos;S INCLUDED
                </p>
                <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
                  The Space and Everything in It
                </h2>
                <ul className="space-y-5 text-[18px] text-[#253136] leading-[1.55]">
                  <li>
                    <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">CEREMONY SITE</span>
                    Lakefront location with natural backdrop. Setup for up to 150. Sound system included.
                  </li>
                  <li>
                    <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">RECEPTION SPACE</span>
                    Commons barn (1,200 sq ft) with outdoor pergola area. Tables, chairs, and basic lighting.
                  </li>
                  <li>
                    <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">ACCOMMODATIONS</span>
                    Ten cabins for the wedding party — sleeps 28–30. Bridal and groom&apos;s suites.
                  </li>
                  <li>
                    <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">WEEKEND TIMELINE</span>
                    Friday arrival after 2PM, Friday evening rehearsal, Saturday ceremony and reception,
                    Sunday departure by 11AM.
                  </li>
                </ul>
              </div>
              <div className="space-y-5 md:pt-16">
                <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                  WHAT YOU PROVIDE
                </p>
                <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
                  Bring Your Own Vision
                </h2>
                <p className="text-[18px] text-[#253136] leading-[1.55]">
                  This BYOC model gives you complete flexibility to work with vendors you
                  trust. We are happy to share our preferred vendor list to get you started.
                </p>
                <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136] pt-2">
                  YOU ARRANGE
                </p>
                <ul className="space-y-3 text-[18px] text-[#253136] leading-[1.55]">
                  <li>Caterer and Bartending</li>
                  <li>Event and Day-Of Coordinator</li>
                  <li>Florist and Decorations</li>
                  <li>DJ or Band</li>
                  <li>Photography and Videography</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Practical details */}
          <section className="py-24 md:py-32 bg-limestone-cream">
            <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
              <div className="space-y-5">
                <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                  PRACTICAL DETAILS
                </p>
                <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
                  The Numbers
                </h2>
                <ul className="space-y-5 text-[18px] text-[#253136] leading-[1.55]">
                  <li>
                    <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">GUEST CAPACITY</span>
                    75–150 for the ceremony and reception
                  </li>
                  <li>
                    <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">OVERNIGHT GUESTS</span>
                    28–30 across all ten cabins
                  </li>
                  <li>
                    <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">WEEKEND INVESTMENT</span>
                    Weekday events: $8,000–10,000<br />
                    Weekend events: $13,000–16,000<br />
                    Peak season (Mar–May, Sept–Nov): $15,000–20,000
                  </li>
                </ul>
                <p className="font-body-secondary text-[17px] text-[#253136]/90 leading-[1.6] tracking-[0.03em] italic">
                  Detailed pricing and availability provided upon inquiry.
                  Custom quotes based on your specific weekend and guest count.
                </p>
              </div>
              <div className="space-y-5 md:pt-16">
                <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                  IS THIS THE RIGHT FIT?
                </p>
                <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
                  A Word Before You Reach Out
                </h2>
                <p className="text-[18px] text-[#253136] leading-[1.55]">
                  Not every wedding belongs here. But if you&apos;re looking for a weekend that
                  feels less like a wedding and more like the best gathering you&apos;ve ever
                  had — this might be your place.
                </p>
                <p className="text-[18px] text-[#253136] leading-[1.55]">
                  We care about the fit as much as the booking. Fill out the form below
                  and we will be in touch to talk through whether it makes sense.
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Inquiry Form — dark bg section */}
      <section id="inquiry" className="py-24 md:py-32 bg-[#253136]">
        <div className="container max-w-4xl mx-auto px-6">
          <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#b3c1ce] mb-5">
            START HERE
          </p>
          <h2 className="text-[32px] font-headline leading-[1.37] text-[#f7f2e4] mb-10">
            Let&apos;s Talk About Your Celebration
          </h2>
          <WeddingInquiryForm />
        </div>
      </section>
    </>
  )
}
