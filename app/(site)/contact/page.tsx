import Hero from '@/components/sections/Hero'
import WaitlistForm from '@/components/forms/WaitlistForm'
import { client } from '@/sanity/lib/client'
import { pageQuery, siteSettingsQuery } from '@/sanity/queries'
import type { PageDocument, SiteSettings } from '@/sanity/types'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default async function ContactPage() {
  const [page, settings] = await Promise.all([
    client.fetch<PageDocument | null>(pageQuery, { slug: 'contact' }),
    client.fetch<SiteSettings | null>(siteSettingsQuery),
  ])

  return (
    <>
      <Hero
        headline={page?.heroHeadline ?? 'Stay in touch'}
        subhead={
          page?.heroSubhead ??
          'Have a question about Limestone Fields, partnerships, or future stays? Drop a note and we will follow up.'
        }
        ctaText={undefined}
        eyebrow={page?.title}
      />

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-16 md:grid-cols-[1.2fr_1fr]">
          <div className="space-y-6">
            <h2 className="text-3xl font-serif text-foreground">Join the waitlist</h2>
            <p className="text-muted-foreground">
              We&rsquo;ll share opening updates, behind-the-scenes progress, and booking details as soon as they are ready.
            </p>
            <Card className="border border-border/70 bg-background/95 shadow-lg">
              <CardContent className="space-y-6 p-8">
                <WaitlistForm />
              </CardContent>
            </Card>
          </div>
          <aside className="space-y-6 rounded-2xl border border-border/70 bg-muted/50 p-8 backdrop-blur">
            <div className="space-y-2">
              <h3 className="text-xl font-serif text-foreground">Prefer email?</h3>
              <p className="text-muted-foreground">
                Reach out directly and we&rsquo;ll respond within two business days.
              </p>
              {settings?.email && (
                <a
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground underline underline-offset-4"
                  href={`mailto:${settings.email}`}
                >
                  {settings.email}
                </a>
              )}
            </div>
            <Separator />
            {settings?.openingDate && (
              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="uppercase tracking-[0.3rem] text-muted-foreground/70">Opening</p>
                <p className="text-foreground">{settings.openingDate}</p>
              </div>
            )}
            <Separator />
            <div className="space-y-1 text-sm text-muted-foreground">
              <p className="uppercase tracking-[0.3rem] text-muted-foreground/70">Location</p>
              <p className="text-foreground">Lake Limestone, Texas</p>
              <p>Approximately 2 hours from Austin, Dallas, and Houston.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

