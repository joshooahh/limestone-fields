import Link from 'next/link'
import Hero from '@/components/sections/Hero'
import { Separator } from '@/components/ui/separator'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function PrivateEventsPage() {
  return (
    <main>
      <Hero
        headline="Gather with Intention"
        subhead="Limestone Fields is available for private events that value presence over production. We host one event at a time, allowing the space to remain calm and focused."
      />

      {/* Weddings by the lake */}
      <section className="py-20 md:py-28">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl md:text-3xl font-headline text-foreground mb-6">
              Weddings by the lake
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Intimate weddings are welcomed at Limestone Fields. With on-site cabins and shared gathering spaces, guests can stay together and move through the weekend without rush.
            </p>
          </div>
          <ul className="space-y-2 text-muted-foreground mb-8">
            <li>Lakefront ceremony setting</li>
            <li>On-site guest cabins</li>
            <li>Barn common area and kitchen</li>
            <li>Fire pits and outdoor gathering spaces</li>
          </ul>
          <Link
            href="/weddings"
            className={cn(buttonVariants({ size: 'lg' }), 'inline-flex items-center gap-2 rounded-full')}
          >
            Wedding Inquiry
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Separator className="max-w-4xl mx-auto" />

      {/* Property buyouts */}
      <section className="py-20 md:py-28">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl md:text-3xl font-headline text-foreground mb-6">
              Property buyouts
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Full property buyouts are available for retreats, creative gatherings, and private events. The cabins, barn, and land are reserved exclusively for your group.
            </p>
          </div>
          <Link
            href="/buyouts"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'inline-flex items-center gap-2 rounded-full border-foreground/20')}
          >
            Buyout Inquiry
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  )
}
