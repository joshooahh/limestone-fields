import { client } from '@/sanity/lib/client'
import { pageQuery } from '@/sanity/queries'
import type { PageDocument } from '@/sanity/types'
import Hero from '@/components/sections/Hero'
import PageSections from '@/components/sections/PageSections'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import Link from 'next/link'

export default async function HomePage() {
  const homePage = await client.fetch<PageDocument | null>(pageQuery, { slug: 'home' })
  return (
    <main>
      {/* Hero */}
      {homePage?.heroHeadline || homePage?.heroSubhead ? (
        <Hero
          headline={homePage.heroHeadline ?? 'Quiet Ground for Honest Work'}
          subhead={homePage.heroSubhead ?? 'A collection of cabins on Lake Limestone. Designed for rest, reflection, and the kind of clarity that comes from being still.'}
          ctaText={homePage.heroCtaText ?? 'Opening Spring 2026 — Join the Waitlist'}
          ctaHref={homePage.heroCtaHref ?? '/contact'}
        />
      ) : (
        <section className="relative min-h-[90vh] flex items-center justify-center px-6 bg-gradient-to-b from-muted/50 to-background">
          {homePage?.heroImage && (
            <div className="absolute inset-0 z-0">
              <Image
                src={urlForImage(homePage.heroImage).width(1920).height(1080).url()}
                alt=""
                fill
                className="object-cover opacity-20"
                priority
              />
            </div>
          )}
          <div className="container max-w-4xl mx-auto text-center space-y-8 relative z-10">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-headline text-foreground leading-tight">
                Quiet Ground for Honest Work
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                A collection of cabins on Lake Limestone. Designed for rest, reflection, 
                and the kind of clarity that comes from being still.
              </p>
            </div>
            <div className="pt-6">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-10 text-base"
              >
                Opening Spring 2026 — Join the Waitlist
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Sections from Sanity */}
      {homePage?.sections && homePage.sections.length > 0 ? (
        <PageSections sections={homePage.sections} />
      ) : (
        <>

      {/* Value Proposition */}
      <section className="py-24 md:py-32">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-headline text-foreground mb-6">
              Space to Think. Room to Breathe.
            </h2>
            <Separator className="max-w-24 mx-auto" />
          </div>

          <div className="max-w-3xl mx-auto mb-16 text-center">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Limestone Fields is not a retreat, a resort, or an escape. It&apos;s a place 
              to pause. To reconnect with yourself, with time as it naturally unfolds, and 
              with the land itself.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Stillness as Strength
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Out here, silence has texture. You can feel your thoughts settle.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  Grounded Beauty
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Linen sheets. Morning coffee. Windows open to the sound of wind. Beauty 
                  lives in what&apos;s simple and sturdy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  The Land Sets the Pace
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  1,200 feet of Lake Limestone frontage. A working farm taking root. The 
                  ground here shapes everything.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What to Expect */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6">
          <Card>
            <CardContent className="p-12 md:p-16 space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-headline text-foreground">
                  Come for the Space. Stay for What It Shows You.
                </h2>
                <Separator className="max-w-24 mx-auto" />
              </div>

              <div className="prose prose-lg max-w-none space-y-6 text-muted-foreground">
                <p>
                  There is no set schedule here. Mornings might begin with coffee on the 
                  porch, a walk along the lake, or a long soak in your outdoor tub. Evenings 
                  might end around a shared table in the Commons Barn or in the quiet of your 
                  cabin, watching the light fade.
                </p>
                <p>
                  Every detail—from Parachute bedding to the communal kitchen—is designed 
                  so comfort feels effortless and simplicity feels abundant.
                </p>
              </div>

              <div className="text-center pt-6">
                <a 
                  href="/stay"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
                >
                  Explore the Cabins
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Cabins Preview */}
      <section className="py-24 md:py-32">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-headline text-foreground mb-4">
              Ten Cabins. Two Styles.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each designed for presence. No televisions, just windows. No distractions, 
              just the essentials done exceptionally well.
            </p>
            <Separator className="max-w-24 mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8 space-y-6">
                <div className="aspect-[4/3] bg-muted flex items-center justify-center rounded-lg">
                  <span className="text-muted-foreground">Standard Cabin Image</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-headline text-foreground mb-2">
                      Standard Cabin
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      256 sq ft • Sleeps 2 • King bed
                    </p>
                  </div>
                  <p className="text-muted-foreground">
                    A clean, well-appointed space for one or two. Private cedar soaking tub. 
                    Access to Commons Barn kitchen and coffee.
                  </p>
                  <a 
                    href="/stay"
                    className="inline-flex items-center text-sm text-primary hover:underline"
                  >
                    Learn More →
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-6">
                <div className="aspect-[4/3] bg-muted flex items-center justify-center rounded-lg">
                  <span className="text-muted-foreground">Cabin Suite Image</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-headline text-foreground mb-2">
                      Cabin Suite
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      384 sq ft • Sleeps 4-6 • King bed + bunk beds
                    </p>
                  </div>
                  <p className="text-muted-foreground">
                    More space. Same intention. Full kitchen with dining table. Private 
                    cedar soaking tub. Perfect for families or small groups.
                  </p>
                  <a 
                    href="/stay"
                    className="inline-flex items-center text-sm text-primary hover:underline"
                  >
                    Learn More →
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Weddings & Events Preview */}
      <section className="py-24 md:py-32 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-headline text-foreground">
              For Celebrations That Feel Like Gatherings
            </h2>
            <Separator className="max-w-24 mx-auto" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Intimate weddings. Corporate retreats. Milestone celebrations. The entire 
              property, yours completely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <a 
                href="/weddings"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                Weddings
              </a>
              <a 
                href="/buyouts"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8"
              >
                Corporate Retreats
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-24 md:py-32">
        <div className="container max-w-4xl mx-auto px-6 text-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-headline text-foreground">
              Two Hours from Everywhere. A World Away from Everything.
            </h2>
            <Separator className="max-w-24 mx-auto" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Nestled on the shores of Lake Limestone, right in the middle of Austin, 
              Dallas, and Houston. Close enough to reach. Remote enough to matter.
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA - Fallback */}
      <section className="py-24 md:py-32 bg-gradient-to-b from-background to-muted/30">
        <div className="container max-w-4xl mx-auto px-6 text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-headline text-foreground">
              Opening Spring 2026
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Be the first to know when bookings open. Join our waitlist for early access 
              and updates.
            </p>
          </div>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-10 text-base"
            >
              Join the Waitlist
            </Link>
          </div>
        </div>
      </section>
        </>
      )}
    </main>
  )
}
