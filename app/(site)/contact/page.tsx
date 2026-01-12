import { client } from '@/sanity/lib/client'
import { pageQuery, siteSettingsQuery } from '@/sanity/queries'
import type { PageDocument, SiteSettings } from '@/sanity/types'
import Hero from '@/components/sections/Hero'
import PageSections from '@/components/sections/PageSections'
import FAQsSection from '@/components/sections/FAQsSection'
import WaitlistForm from '@/components/forms/WaitlistForm'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default async function ContactPage() {
  const [contactPage, siteSettings] = await Promise.all([
    client.fetch<PageDocument | null>(pageQuery, { slug: 'contact' }),
    client.fetch<SiteSettings | null>(siteSettingsQuery),
  ])

  return (
    <main>
      {/* Hero */}
      {contactPage?.heroHeadline || contactPage?.heroSubhead ? (
        <Hero
          headline={contactPage.heroHeadline ?? 'Get in Touch'}
          subhead={contactPage.heroSubhead ?? "We're still building. But we're here."}
        />
      ) : (
        <section className="relative py-24 md:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container max-w-4xl mx-auto px-6 text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-6xl font-headline text-foreground">
                Get in Touch
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We&apos;re still building. But we&apos;re here.
            </p>
          </div>
        </section>
      )}

      {/* Dynamic Sections from Sanity */}
      {contactPage?.sections && contactPage.sections.length > 0 ? (
        <PageSections sections={contactPage.sections} />
      ) : (
        <>
          {/* Contact Information - Fallback */}
          <section className="py-16 md:py-24">
            <div className="container max-w-4xl mx-auto px-6">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <Card>
                  <CardContent className="p-8 space-y-3">
                    <div className="text-sm uppercase tracking-wider text-muted-foreground">
                      Email
                    </div>
                    <a 
                      href={`mailto:${siteSettings?.email || 'hello@limestonefields.com'}`}
                      className="text-lg text-foreground hover:text-primary transition-colors block"
                    >
                      {siteSettings?.email || 'hello@limestonefields.com'}
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8 space-y-3">
                    <div className="text-sm uppercase tracking-wider text-muted-foreground">
                      Location
                    </div>
                    <div className="text-muted-foreground">
                      <p>Lake Limestone, Texas</p>
                      <p className="text-sm">2 hours from Austin, Dallas, Houston</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-8 space-y-3">
                    <div className="text-sm uppercase tracking-wider text-muted-foreground">
                      Opening
                    </div>
                    <div className="text-lg text-foreground">
                      {siteSettings?.openingDate || 'Spring 2026'}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Directions - Fallback */}
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container max-w-4xl mx-auto px-6">
              <Card>
                <CardContent className="p-8 md:p-12 space-y-6">
                  <div>
                    <h2 className="text-2xl font-headline text-foreground mb-4">
                      How to Find Us
                    </h2>
                    <Separator className="mb-6" />
                  </div>

                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      Detailed directions will be provided upon booking confirmation.
                    </p>
                    <p>
                      General location: Lake Limestone is located in East Central Texas, 
                      accessible via Highway 164. Specific property directions and gate codes 
                      will be sent to confirmed guests prior to arrival.
                    </p>
                  </div>

                  <div className="pt-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Nearest Airports
                    </h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Austin-Bergstrom International Airport (AUS) — 2 hours</li>
                      <li>• Dallas/Fort Worth International Airport (DFW) — 2.5 hours</li>
                      <li>• Houston George Bush Intercontinental Airport (IAH) — 2.5 hours</li>
                    </ul>
                    <p className="text-sm text-muted-foreground mt-4">
                      We recommend renting a car. There are no ride-share services in the area.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </>
      )}

      {/* FAQ Section - Always show */}
      <FAQsSection />

      {/* Waitlist Form - Always show */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6">
          <WaitlistForm />
        </div>
      </section>
    </main>
  )
}
