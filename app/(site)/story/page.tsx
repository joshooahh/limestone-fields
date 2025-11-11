import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default function StoryPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-muted/50 to-background">
        <div className="container max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">Our Story</p>
            <h1 className="text-4xl md:text-6xl font-serif text-foreground">Why Limestone Fields Exists</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The land came first. Everything else followed.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-6">
          <Card>
            <CardContent className="p-8 md:p-12 space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">A Place Built on Pause</h2>
              <Separator />
              <div className="prose prose-lg max-w-none space-y-4 text-muted-foreground">
                <p>
                  Limestone Fields began with a question: What if hospitality wasn&rsquo;t about entertainment, but about
                  elimination? What if the best thing we could offer wasn&rsquo;t more—but less?
                </p>
                <p>
                  Modern life is loud. Overstimulated. Overbooked. We&rsquo;re told that downtime should be filled with
                  activity, that rest requires an itinerary, that value is measured in amenities.
                </p>
                <p>We don&rsquo;t believe that.</p>
                <p>
                  Limestone Fields is built on a different premise: that clarity comes from stillness. That creativity
                  needs space. That the best work—whether that&rsquo;s strategic thinking, writing, healing, or simply
                  being—happens when you can finally hear yourself think.
                </p>
                <p>
                  This is hospitality as hermitage. A place to rest the mind, engage the hands, and reconnect with the
                  rhythms that produce meaningful work.
                </p>
                <p className="text-foreground font-medium">We&rsquo;re not here to entertain you. We&rsquo;re here to get out of your way.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* The Land Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6">
          <Card>
            <CardContent className="p-8 md:p-12 space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">The Land</h2>
              <Separator />
              <div className="prose prose-lg max-w-none space-y-4 text-muted-foreground">
                <p>1,200 feet of Lake Limestone frontage. Open sky. Tough ground that gives reluctantly but gives deep.</p>
                <p>This land has its own rhythm. We&rsquo;re learning to keep in step.</p>
                <p>
                  The property sits right in the middle of Austin, Dallas, and Houston—two hours from each. Close enough
                  to reach in an afternoon but far enough to feel the difference. Out here, light moves differently. Sound
                  carries farther. Time slows to the pace of wind through grass.
                </p>
                <p>
                  The lake shapes everything. Morning fog. Evening light. The way the air feels cooler near the shore. We
                  didn&rsquo;t choose this land for its convenience—we chose it because it offers what most places can&rsquo;t: real
                  distance, real water, real quiet.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* The Farm Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-6">
          <Card>
            <CardContent className="p-8 md:p-12 space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">The Farm (Coming 2026)</h2>
              <Separator />
              <div className="prose prose-lg max-w-none space-y-4 text-muted-foreground">
                <p>We&rsquo;re building a working farm. Not for show—for real.</p>
                <p>
                  Heritage chickens. Beehives. Seasonal gardens. The kind of agriculture that requires attention, patience,
                  and a willingness to fail until you learn. This isn&rsquo;t agritourism. It&rsquo;s the actual work of tending land,
                  and guests are welcome to participate or simply observe.
                </p>
                <p>
                  The farm will grow as we do. Slowly. Intentionally. With respect for what the land can handle and what it
                  needs to thrive.
                </p>
                <p>
                  You may gather eggs during your stay. You may help harvest tomatoes. You may simply watch the bees work
                  while you drink your coffee. The farm isn&rsquo;t a feature—it&rsquo;s a collaborator. And like everything else here,
                  it operates on its own terms.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Design Philosophy Section */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6">
          <Card>
            <CardContent className="p-8 md:p-12 space-y-6">
              <h2 className="text-3xl md:text-4xl font-serif text-foreground">How We Build</h2>
              <Separator />
              <div className="prose prose-lg max-w-none space-y-4 text-muted-foreground">
                <p>Every cabin at Limestone Fields follows what we call &quot;80/20 luxury.&quot;</p>
                <p>
                  80% humble materials: plywood, MDF, simple finishes. 20% exceptional touches: brass fixtures, Parachute
                  linens, cast iron cookware, a soaking tub under the stars.
                </p>
                <p>
                  This isn&rsquo;t about cutting corners. It&rsquo;s about putting resources where they matter. A good mattress matters.
                  A marble countertop doesn&rsquo;t.
                </p>
                <p>
                  We build for durability, simplicity, and function. We don&rsquo;t build for Instagram. The details you&rsquo;ll notice
                  most are the ones that serve you: natural light, thoughtful storage, windows that frame the view just right.
                </p>
                <p>
                  This is earned luxury. Not luxury for luxury&rsquo;s sake—but comfort that reveals itself through use, through
                  presence, through the simple fact that everything works exactly as it should.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">What We Stand For</h2>
            <Separator className="max-w-24 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Stewardship Over Ownership</h3>
                <p className="text-muted-foreground">
                  We&rsquo;re caretakers of this land, not just owners. Every decision considers impact—on the soil, the water, the
                  community, and the generations that come after us.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Presence Over Performance</h3>
                <p className="text-muted-foreground">
                  The quality of attention matters more than the quantity of activity. We model thoughtful, unhurried,
                  intentional behavior—and we hope it&rsquo;s contagious.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Craft Over Efficiency</h3>
                <p className="text-muted-foreground">
                  Some things are worth doing slowly and well. We take pride in small details you might never notice. That&rsquo;s the
                  point.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Community Over Competition</h3>
                <p className="text-muted-foreground">
                  We believe in a thriving local ecosystem. We support other businesses, share what we learn, and build
                  alongside—not against—our neighbors.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container max-w-4xl mx-auto px-6 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-serif text-foreground">Come see for yourself.</h2>
          <p className="text-lg text-muted-foreground">Opening Spring 2026. Join the waitlist for early access.</p>
          <div className="pt-4">
            <a
              href="/contact"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
            >
              Join the Waitlist
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

