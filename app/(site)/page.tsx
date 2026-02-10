import Link from 'next/link'
import Hero from '@/components/sections/Hero'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default async function HomePage() {
  return (
    <main>
      {/* Intro */}
      <Hero
        headline="Quiet Ground for Honest Work."
        subhead="Limestone Fields is a small collection of guest cabins on Lake Limestone in rural Texas. Located within easy reach of Austin, Dallas, and Houston, the property is designed for rest, reflection, and clarity. This is a place shaped by land and time. Mornings unfold slowly. Evenings quiet down on their own. With thoughtful design and just enough support, guests are free to move at their own pace and focus on what matters."
        ctaText="Join Waitlist"
        ctaHref="/contact"
      />

      {/* STAY Preview */}
      <section className="py-24 md:py-32">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-headline text-foreground mb-6">
              Cabins Designed for Presence
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Ten private cabins sit lightly across 16 acres, each offering space to breathe and settle in. Two simple layouts. Natural materials. Generous windows. Nothing superfluous.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The cabins are designed to support rest and focus, not performance. Comfort feels intuitive. The pace is unhurried.
            </p>
          </div>

          <ul className="space-y-3 text-muted-foreground mb-10">
            <li>Ten private guest cabins on Lake Limestone</li>
            <li>Two thoughtfully designed cabin layouts</li>
            <li>Natural materials and quiet interiors</li>
            <li>Space for rest, reading, writing, and reflection</li>
          </ul>

          <Link
            href="/stay"
            className={cn(buttonVariants({ size: 'lg' }), 'inline-flex items-center gap-2 rounded-full')}
          >
            Booking Soon
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* EXPERIENCE Preview */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-headline text-foreground mb-6">
              Time Shaped by Land and Light
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Life at Limestone Fields is intentionally unprogrammed. The land sets the rhythm and guests follow it as they choose.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Shared spaces invite connection without expectation. The working farm offers quiet participation. The lake, the trees, and the open sky do most of the work.
            </p>
          </div>

          <ul className="space-y-3 text-muted-foreground mb-10">
            <li>A shared barn and communal kitchen</li>
            <li>A working farm with seasonal crops</li>
            <li>Open land, walking paths, and lake access</li>
            <li>Occasional classes and small gatherings</li>
          </ul>

          <Link
            href="/experience"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'inline-flex items-center gap-2 rounded-full border-foreground/20')}
          >
            Learn More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* PRIVATE EVENTS Preview */}
      <section className="py-24 md:py-32">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-headline text-foreground mb-6">
              Gather by the Lake
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Limestone Fields hosts intimate weddings and private gatherings on Lake Limestone. We host one event at a time so the full property is yours, the time is yours, and the land does most of the decorating.
            </p>
          </div>

          <ul className="space-y-3 text-muted-foreground mb-10">
            <li>On-site accommodations</li>
            <li>Barn common area with kitchen</li>
            <li>Lakefront ceremony / event site</li>
            <li>Fire pits for gathering</li>
          </ul>

          <Link
            href="/private-events"
            className={cn(buttonVariants({ size: 'lg' }), 'inline-flex items-center gap-2 rounded-full')}
          >
            Weddings and Private Events
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
