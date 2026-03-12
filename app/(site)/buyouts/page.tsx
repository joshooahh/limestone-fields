import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { pageQuery } from '@/sanity/queries'
import type { PageDocument } from '@/sanity/types'
import Hero from '@/components/sections/Hero'
import JsonLd from '@/components/seo/JsonLd'
import PageSections from '@/components/sections/PageSections'
import BuyoutInquiryForm from '@/components/forms/BuyoutInquiryForm'

const buyoutSchema = {
  '@context': 'https://schema.org',
  '@type': 'EventVenue',
  name: 'Limestone Fields — Full Property Buyout',
  description: 'Exclusive use of the full Limestone Fields property for corporate retreats, leadership offsites, and private group gatherings. 10 cabins, 28–30 overnight guests, 1,200 sq ft Commons meeting space, and 15 acres on Lake Limestone.',
  url: 'https://limestonefields.com/buyouts',
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
  maximumAttendeeCapacity: 30,
  amenityFeature: [
    { '@type': 'LocationFeatureSpecification', name: '10 private overnight cabins', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Commons meeting space (1,200 sq ft)', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Indoor and outdoor chef kitchens', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Lakefront access', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Working permaculture farm', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Full property exclusive use', value: true },
    { '@type': 'LocationFeatureSpecification', name: 'Fire pits and outdoor gathering areas', value: true },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch<PageDocument | null>(pageQuery, { slug: 'buyouts' })
  return {
    title: page?.seo?.metaTitle ?? 'Property Buyouts & Corporate Retreats',
    description:
      page?.seo?.metaDescription ??
      'Book Limestone Fields as a full property buyout for corporate retreats, leadership offsites, or private group gatherings. 10 cabins, 28–30 overnight guests, and a 1,200 sq ft meeting space on Lake Limestone, Texas.',
    openGraph: {
      title: page?.seo?.metaTitle ?? 'Property Buyouts — Limestone Fields, Lake Limestone TX',
      description:
        page?.seo?.metaDescription ??
        'Exclusive use of Limestone Fields for corporate retreats and private group events. 10 cabins, Commons meeting space, and 15 acres on Lake Limestone.',
      url: 'https://limestonefields.com/buyouts',
    },
    alternates: { canonical: 'https://limestonefields.com/buyouts' },
  }
}

export default async function BuyoutsPage() {
  const buyoutsPage = await client.fetch<PageDocument | null>(pageQuery, { slug: 'buyouts' })

  return (
    <>
      <JsonLd data={buyoutSchema} />
      <Hero
        headline="Reserve the Entire Property"
        subhead="Ten cabins. One commons barn. 1,200 feet of lakefront. Yours completely."
        eyebrow="Full Property Rental"
        ctaText="Start an Inquiry"
        ctaHref="#inquiry"
        backgroundImage={buyoutsPage?.heroImage ? urlForImage(buyoutsPage.heroImage).width(1600).auto('format').url() : undefined}
        backgroundImageAlt="Limestone Fields property buyout"
      />

      {/* Dynamic Sections from Sanity — overrides hardcoded content if configured */}
      {buyoutsPage?.sections && buyoutsPage.sections.length > 0 ? (
        <PageSections sections={buyoutsPage.sections} />
      ) : (
        <>
          {/* Overview */}
          <section className="bg-limestone-cream py-24 md:py-36">
            <div className="container max-w-2xl mx-auto px-6 text-center">
              <p className="font-body-secondary text-lg md:text-xl text-[#253136] leading-relaxed">
                Sometimes the best work happens when you can close the door to the rest
                of the world. A full property buyout gives your group complete access to
                all ten cabins, the Commons Barn, and the entire lakefront. No other guests.
                No distractions. Just your people and the space to do what you came to do.
              </p>
            </div>
          </section>

          {/* What you get + Your event your way — two-column */}
          <section className="py-24 md:py-32 bg-[#F9F4EE]">
            <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
              <div className="space-y-5">
                <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                  WHAT YOU GET
                </p>
                <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
                  Full Exclusive Access
                </h2>
                <ul className="space-y-5 text-[18px] text-[#253136] leading-[1.55]">
                  <li>
                    <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">CAPACITY</span>
                    Accommodations for up to 32 guests across 10 cabins. All standard cabin amenities.
                  </li>
                  <li>
                    <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">COMMONS BARN</span>
                    1,200 sq ft with full kitchen, dining, and meeting space.
                  </li>
                  <li>
                    <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">THE LAND</span>
                    1,200 feet of private lakefront shoreline, multiple outdoor gathering areas,
                    fire pits, walking paths, and open land.
                  </li>
                  <li>
                    <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">THE FARM</span>
                    Seasonal farm access. Available 2026 and beyond.
                  </li>
                </ul>
              </div>
              <div className="space-y-5 md:pt-16">
                <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                  YOUR EVENT, YOUR WAY
                </p>
                <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
                  Un-Facilitated. By Design.
                </h2>
                <p className="text-[18px] text-[#253136] leading-[1.55]">
                  We prepare the property, provide the amenities, and give you the keys.
                  What happens next is entirely up to you. Bring your own facilitators,
                  chefs, or programming. Or simply use the space as it is.
                </p>
                <p className="font-body-secondary text-[17px] text-[#253136]/90 leading-[1.6] tracking-[0.03em] italic">
                  We provide the setting. You bring the intention.
                </p>
              </div>
            </div>
          </section>

          {/* Who books buyouts — three types */}
          <section className="py-24 md:py-32 bg-[#CBD2DA]">
            <div className="container max-w-6xl mx-auto px-6">
              <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136] mb-5">
                WHO BOOKS BUYOUTS
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
        </>
      )}

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
