import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { pageQuery, siteSettingsQuery, faqsQuery } from '@/sanity/queries'
import type { PageDocument, SiteSettings, Faq } from '@/sanity/types'
import Hero from '@/components/sections/Hero'
import PageSections from '@/components/sections/PageSections'
import FAQsSection from '@/components/sections/FAQsSection'
import WaitlistForm from '@/components/forms/WaitlistForm'
import JsonLd from '@/components/seo/JsonLd'

export const metadata: Metadata = {
  title: 'Contact & Directions',
  description:
    'Get in touch with Limestone Fields. Located at 159 LCR 890, Jewett TX 75846 — 2 hours from Austin, Dallas, and Houston. Join the waitlist or inquire about events.',
  openGraph: {
    title: 'Contact Limestone Fields — Jewett, TX',
    description:
      'Located at Lake Limestone, Texas. 2 hours from Austin, Dallas, and Houston. Join the waitlist or inquire about events.',
    url: 'https://limestonefields.com/contact',
  },
  alternates: { canonical: 'https://limestonefields.com/contact' },
}

export default async function ContactPage() {
  const [contactPage, siteSettings, faqs] = await Promise.all([
    client.fetch<PageDocument | null>(pageQuery, { slug: 'contact' }),
    client.fetch<SiteSettings | null>(siteSettingsQuery),
    client.fetch<Faq[]>(faqsQuery),
  ])

  const faqPageSchema = faqs && faqs.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            // PortableText: extract plain text from the first block
            text:
              Array.isArray(faq.answer)
                ? faq.answer
                    .map((block) =>
                      Array.isArray(block?.children)
                        ? block.children.map((c: { text?: string }) => c?.text ?? '').join('')
                        : ''
                    )
                    .join(' ')
                : '',
          },
        })),
      }
    : null

  return (
    <>
      {faqPageSchema && <JsonLd data={faqPageSchema} />}
      <Hero
        headline="Get in Touch"
        subhead="We're still building. But we're here."
        eyebrow="Contact"
        backgroundImage={contactPage?.heroImage ? urlForImage(contactPage.heroImage).width(1600).auto('format').url() : undefined}
        backgroundImageAlt="Contact Limestone Fields"
      />

      {/* Dynamic Sections from Sanity */}
      {contactPage?.sections && contactPage.sections.length > 0 ? (
        <PageSections sections={contactPage.sections} />
      ) : (
        <>
          {/* Contact info — three columns */}
          <section className="bg-limestone-cream py-24 md:py-32">
            <div className="container max-w-6xl mx-auto px-6">
              <div className="grid gap-12 md:grid-cols-3">
                <div className="space-y-4">
                  <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                    EMAIL
                  </p>
                  <a
                    href={`mailto:${siteSettings?.email || 'hello@limestonefields.com'}`}
                    className="text-[18px] text-[#253136] leading-[1.55] underline underline-offset-4 hover:opacity-70 transition"
                  >
                    {siteSettings?.email || 'hello@limestonefields.com'}
                  </a>
                </div>
                <div className="space-y-4">
                  <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                    LOCATION
                  </p>
                  <p className="text-[18px] text-[#253136] leading-[1.55]">
                    Lake Limestone, Texas
                  </p>
                  <p className="text-[18px] text-[#253136] leading-[1.55]">
                    2 hours from Austin, Dallas, and Houston
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                    OPENING
                  </p>
                  <p className="text-[18px] text-[#253136] leading-[1.55]">
                    {siteSettings?.openingDate || 'Spring 2026'}
                  </p>
                  <p className="font-body-secondary text-[17px] text-[#253136]/90 leading-[1.6] tracking-[0.03em] italic">
                    Join the waitlist to be the first to know.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How to find us */}
          <section className="py-24 md:py-32 bg-[#CBD2DA]">
            <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
              <div className="space-y-5">
                <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                  GETTING HERE
                </p>
                <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
                  How to Find Us
                </h2>
                <p className="text-[18px] text-[#253136] leading-[1.55]">
                  Detailed directions will be provided upon booking confirmation.
                  Lake Limestone is in East Central Texas, accessible via Highway 164.
                  Specific property directions and gate codes are sent to confirmed
                  guests prior to arrival.
                </p>
                <p className="font-body-secondary text-[17px] text-[#253136]/90 leading-[1.6] tracking-[0.03em] italic">
                  Plan to rent a car. There are no ride-share services in the area.
                  That is part of the appeal.
                </p>
              </div>
              <div className="space-y-5 md:pt-16">
                <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
                  NEAREST AIRPORTS
                </p>
                <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
                  About Two Hours Out
                </h2>
                <ul className="space-y-4 text-[18px] text-[#253136] leading-[1.55]">
                  <li>
                    <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">AUSTIN</span>
                    Austin-Bergstrom International (AUS) — 2 hours
                  </li>
                  <li>
                    <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">DALLAS</span>
                    Dallas/Fort Worth International (DFW) — 2.5 hours
                  </li>
                  <li>
                    <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">HOUSTON</span>
                    George Bush Intercontinental (IAH) — 2.5 hours
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </>
      )}

      {/* FAQ Section */}
      <FAQsSection />

      {/* Waitlist Form — dark bg section */}
      <section className="py-24 md:py-32 bg-[#253136]">
        <div className="container max-w-4xl mx-auto px-6">
          <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#b3c1ce] mb-5">
            JOIN THE WAITLIST
          </p>
          <h2 className="text-[32px] font-headline leading-[1.37] text-[#f7f2e4] mb-10">
            Be the First to Know When We Open
          </h2>
          <WaitlistForm />
        </div>
      </section>
    </>
  )
}
