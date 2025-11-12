import Hero from '@/components/sections/Hero'
import ValueProp from '@/components/sections/ValueProp'
import WaitlistForm from '@/components/forms/WaitlistForm'
import { client } from '@/sanity/lib/client'
import { pageQuery, siteSettingsQuery } from '@/sanity/queries'
import type { PageDocument, SiteSettings, TextSection } from '@/sanity/types'

export default async function HomePage() {
  const [page, settings] = await Promise.all([
    client.fetch<PageDocument | null>(pageQuery, { slug: 'home' }),
    client.fetch<SiteSettings | null>(siteSettingsQuery),
  ])

  const valuePropSections = (page?.sections ?? []).filter(
    (section): section is TextSection => section?._type === 'textSection'
  )

  return (
    <>
      <Hero
        headline={page?.heroHeadline ?? 'Limestone Fields'}
        subhead={
          page?.heroSubhead ??
          'Thoughtfully simple stays along the hills of Middle Tennessee. Designed for presence, built for connection.'
        }
        ctaText={settings?.bookingsOpen ? 'Book Your Stay' : 'Join the Waitlist'}
        ctaHref={settings?.bookingsOpen ? '/stay' : '/contact'}
      />

      {valuePropSections.length > 0 ? (
        valuePropSections.map((section) => (
          <ValueProp
            key={section._key}
            eyebrow={page?.title}
            headline={section.headline ?? ''}
            body={section.body ?? []}
          />
        ))
      ) : (
        <ValueProp
          eyebrow="Limestone Fields"
          headline="Cabins designed for presence"
          copy="Ten cabins, two layouts, all crafted with the essentials you need and nothing extra. Natural materials, intentional details, and space to take a deeper breath."
          items={[
            {
              title: 'Two cabin styles',
              description: 'Choose between our standard cabin for quiet escapes or the suite for more room to gather.',
            },
            {
              title: 'Grounded in nature',
              description: 'Wrapped in warm limestone tones, each cabin frames the surrounding fields and woodlands.',
            },
            {
              title: 'Presence over performance',
              description: 'No televisions. Generous windows. Honest amenities. A pace set for restoration.',
            },
          ]}
        />
      )}

      <section className="px-6 py-20">
        <div className="mx-auto max-w-3xl space-y-6 rounded-3xl border border-border/70 bg-background/95 p-10 text-center shadow-lg">
          <h2 className="text-3xl font-serif text-foreground">Join the waitlist</h2>
          <p className="text-muted-foreground">
            {settings?.openingDate
              ? `Bookings open ${settings.openingDate}. Be the first to hear when reservations go live.`
              : 'Be first to know when Limestone Fields opens for reservations.'}
          </p>
          <div className="mt-8">
            <WaitlistForm />
          </div>
        </div>
      </section>
    </>
  )
}
