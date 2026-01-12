import { client } from '@/sanity/lib/client'
import { pageQuery } from '@/sanity/queries'
import type { PageDocument } from '@/sanity/types'
import Hero from '@/components/sections/Hero'
import PageSections from '@/components/sections/PageSections'
import BuyoutInquiryForm from '@/components/forms/BuyoutInquiryForm'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default async function BuyoutsPage() {
  const buyoutsPage = await client.fetch<PageDocument | null>(pageQuery, { slug: 'buyouts' })

  // Removed BuyoutInquiryForm - now imported from components
  return (
    <main>
      {/* Hero */}
      {buyoutsPage?.heroHeadline || buyoutsPage?.heroSubhead ? (
        <Hero
          headline={buyoutsPage.heroHeadline ?? 'Reserve the Entire Property'}
          subhead={buyoutsPage.heroSubhead ?? 'Ten cabins. One commons barn. 1,200 feet of lakefront. Yours completely.'}
          eyebrow="Full Property Rental"
        />
      ) : (
        <section className="relative py-24 md:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container max-w-4xl mx-auto px-6 text-center space-y-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Full Property Rental</p>
              <h1 className="text-4xl md:text-6xl font-headline text-foreground">Reserve the Entire Property</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ten cabins. One commons barn. 1,200 feet of lakefront. Yours completely.
            </p>
          </div>
        </section>
      )}

      {/* Dynamic Sections from Sanity */}
      {buyoutsPage?.sections && buyoutsPage.sections.length > 0 ? (
        <PageSections sections={buyoutsPage.sections} />
      ) : (
        <>

      {/* Overview */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-6">
          <Card>
            <CardContent className="p-8 md:p-12 space-y-6">
              <div className="prose prose-lg max-w-none space-y-4 text-muted-foreground">
                <p>Sometimes the best work happens when you can close the door to the rest of the world.</p>
                <p>
                  A full property buyout at Limestone Fields gives your team, your group, or your gathering complete access to
                  all ten cabins, the 1,200-square-foot Commons Barn, and the entire lakefront property. No other guests. No
                  distractions. Just your people and the space to do what you came to do.
                </p>
                <p className="text-foreground font-medium">We provide the setting. You bring the intention.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline text-foreground mb-4">What You Get</h2>
            <Separator className="max-w-24 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Capacity</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Accommodations for up to 32 guests across 10 cabins</li>
                  <li>• 1,200 sq ft Commons Barn with full kitchen, dining, and meeting space</li>
                  <li>• Exclusive access to the entire property and lakefront</li>
                  <li>• All standard cabin amenities (linens, kitchenettes, soaking tubs, etc.)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">The Space</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Private lakefront with 1,200 feet of shoreline</li>
                  <li>• Multiple outdoor gathering areas</li>
                  <li>• Fire pits and outdoor seating</li>
                  <li>• Walking paths and open land</li>
                  <li>• Seasonal farm access (available 2026+)</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardContent className="p-8 space-y-4">
              <h3 className="text-xl font-semibold text-foreground">Your Event, Your Way</h3>
              <p className="text-muted-foreground">
                This is an un-facilitated buyout. We prepare the property, provide the amenities, and give you the keys. What
                happens next is entirely up to you. Bring your own facilitators, chefs, or programming—or simply use the space
                as it is.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Ideal For */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline text-foreground mb-4">Who Books Buyouts</h2>
            <Separator className="max-w-24 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Executive Retreats</h3>
                <p className="text-muted-foreground">
                  Leadership teams seeking focused time for strategic planning, decision-making, and alignment away from the
                  office.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Creative Intensives</h3>
                <p className="text-muted-foreground">
                  Writing retreats, design sprints, mastermind groups, and teams working on projects that require deep,
                  uninterrupted focus.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Intimate Celebrations</h3>
                <p className="text-muted-foreground">
                  Small weddings, milestone gatherings, and family reunions that value presence over performance.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline text-foreground mb-4">The Process</h2>
            <Separator className="max-w-24 mx-auto" />
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: '1',
                title: 'Inquire',
                description: 'Fill out the form below with your dates, group size, and event details.',
              },
              {
                step: '2',
                title: 'Proposal',
                description: 'We will send you a custom proposal with pricing, availability, and property details.',
              },
              {
                step: '3',
                title: 'Reserve',
                description: 'Confirm your dates with a deposit, and the property is yours.',
              },
              {
                step: '4',
                title: 'Arrive',
                description: 'Check in, settle in, and use the space however you need.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-semibold text-primary">{item.step}</span>
                </div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form - Always show */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-6">
          <BuyoutInquiryForm />
        </div>
      </section>

      {/* Contact CTA - Fallback */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container max-w-4xl mx-auto px-6 text-center space-y-4">
          <h2 className="text-2xl font-headline text-foreground">Questions about buyouts?</h2>
          <p className="text-muted-foreground">
            Reach out directly:{' '}
            <a href="mailto:hello@limestonefields.com" className="text-primary hover:underline">
              hello@limestonefields.com
            </a>
          </p>
        </div>
      </section>
        </>
      )}
    </main>
  )
}

