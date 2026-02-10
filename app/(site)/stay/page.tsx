import Link from 'next/link'
import CabinCard from '@/components/sections/CabinCard'
import Hero from '@/components/sections/Hero'
import { client } from '@/sanity/lib/client'
import { cabinsQuery } from '@/sanity/queries'
import type { Cabin } from '@/sanity/types'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default async function StayPage() {
  const cabins = await client.fetch<Cabin[]>(cabinsQuery)

  return (
    <main>
      <Hero
        headline="The Cabins at Limestone Fields"
        subhead="A quiet place to land"
        ctaText="Join the Waitlist"
        ctaHref="/contact"
      />

      {/* Intro */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-xl md:text-2xl font-headline text-foreground text-center mb-6">
          Ten cabins. Two styles. One simple truth: everything you need, nothing you don&apos;t.
        </p>
        <p className="text-muted-foreground text-center leading-relaxed max-w-2xl mx-auto">
          Stay in a private cabin on Lake Limestone, surrounded by open land, water, and quiet. Each cabin is designed for rest, reflection, and clarity, with thoughtful details that make the stay feel intuitive and unhurried. Cabins are spaced for privacy, with views of the lake or surrounding land.
        </p>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* Cabin Types - from Sanity when available */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-headline text-foreground mb-12 text-center">
          Cabin Types
        </h2>
        {cabins?.length ? (
          <div className="space-y-16">
            {cabins.map((cabin) => (
              <CabinCard key={cabin._id} cabin={cabin} />
            ))}
          </div>
        ) : (
          <>
            <Card className="max-w-4xl mx-auto border border-border/60 bg-card/80 overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-2xl font-headline text-foreground mb-4">
                  One Bedroom Lakeview Cabin
                </h3>
                <p className="text-muted-foreground mb-6">
                  A private one-bedroom cabin with views of Lake Limestone. Designed for stillness, with generous windows, simple furnishings, and space to slow down.
                </p>
                <p className="text-xs uppercase tracking-[0.25rem] text-muted-foreground mb-3">Features</p>
                <ul className="space-y-2 text-muted-foreground mb-8">
                  <li>Queen bed with natural linens</li>
                  <li>Private outdoor soaking tub or porch</li>
                  <li>Writing desk and seating area</li>
                  <li>Climate control and modern bath</li>
                </ul>
                <Link href="/contact" className={cn(buttonVariants({ variant: 'outline' }), 'rounded-full')}>
                  Check Availability
                </Link>
              </CardContent>
            </Card>
            <Card className="max-w-4xl mx-auto mt-12 border border-border/60 bg-card/80 overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-2xl font-headline text-foreground mb-4">
                  Cabin Suite
                </h3>
                <p className="text-muted-foreground mb-6">
                  More space for couples or small groups. Same intention: rest, clarity, and connection to the land.
                </p>
                <Link href="/contact" className={cn(buttonVariants({ variant: 'outline' }), 'rounded-full')}>
                  Check Availability
                </Link>
              </CardContent>
            </Card>
          </>
        )}
      </section>

      {/* A Self-Guided Stay */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-headline text-foreground mb-6">
            A Self-Guided Stay
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Limestone Fields offers care without constant presence. Arrival is simple. Instructions are clear. Spaces are prepared and ready. Help is always available when needed, but guests are never managed or directed. The intention is ease, not oversight.
          </p>
          <p className="text-sm uppercase tracking-[0.25rem] text-muted-foreground mb-4">What this means</p>
          <ul className="space-y-2 text-muted-foreground">
            <li>Simple, independent arrival</li>
            <li>Clear guidance throughout your stay</li>
            <li>Support available without interruption</li>
            <li>Space to move through the day on your own terms</li>
          </ul>
        </div>
      </section>

      {/* What is provided */}
      <section className="py-20 md:py-28">
        <div className="container max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-headline text-foreground mb-6 text-center">
            What is provided
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Everything here is intentional. Guests are provided with what they need to feel settled and comfortable, without excess.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">Included with your stay</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>Fresh linens and towels</li>
                  <li>Access to the shared barn kitchen</li>
                  <li>Fire pits and outdoor gathering areas</li>
                  <li>Parking near cabins</li>
                  <li>Well maintained, ready spaces</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <h3 className="text-lg font-semibold text-foreground mb-4">What we keep simple</h3>
                <p className="text-muted-foreground mb-4">Some things are intentionally left out to preserve quiet and clarity.</p>
                <ul className="space-y-2 text-muted-foreground">
                  <li>No televisions</li>
                  <li>No daily housekeeping</li>
                  <li>No scheduled programming</li>
                  <li>No full service dining</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Shared spaces */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-headline text-foreground mb-6">
            Shared spaces
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The barn serves as the heart of shared life at Limestone Fields. It includes a communal kitchen, tables for gathering, and space to linger. Interaction is always optional. Some guests cook together. Others pass quietly through. Both are welcome.
          </p>
        </div>
      </section>

      {/* The land around the cabins */}
      <section className="py-20 md:py-28">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-headline text-foreground mb-6">
            The land around the cabins
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The land is not a backdrop. It is an active presence. Guests are free to walk the property, sit by the water, and observe the working farm. Seasons shift. Crops change. Light moves across the lake. This is a place to notice what grows slowly.
          </p>
        </div>
      </section>

      {/* Who this place is for */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-headline text-foreground mb-6">
            Who this place is for
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Limestone Fields is best suited for guests who value quiet, independence, and simple comfort. It is especially well suited for:
          </p>
          <ul className="space-y-2 text-muted-foreground">
            <li>Solo travelers</li>
            <li>Couples</li>
            <li>Writers and creatives</li>
            <li>Those seeking rest without entertainment</li>
            <li>Guests comfortable with a self guided experience</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
