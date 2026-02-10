import Hero from '@/components/sections/Hero'

export default function ExperiencePage() {
  return (
    <main>
      <Hero
        headline="Life at a Slower Pace"
        subhead="The experience at Limestone Fields is shaped by land, weather, and time. There is no required schedule and no expectation to participate. Guests are invited to explore, observe, and rest in ways that feel natural."
      />

      {/* Common spaces */}
      <section className="py-20 md:py-28">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-headline text-foreground mb-6">
            Common spaces
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Shared spaces are designed to support ease and quiet connection.
          </p>
          <p className="text-sm uppercase tracking-[0.25rem] text-muted-foreground mb-4">Spaces include</p>
          <ul className="space-y-2 text-muted-foreground">
            <li>The barn with communal kitchen</li>
            <li>Shared tables for meals or work</li>
            <li>Fire pits for evening gathering</li>
            <li>Open seating areas indoors and out</li>
          </ul>
        </div>
      </section>

      {/* Working farm */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-headline text-foreground mb-6">
            The working farm
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The farm is a living part of the property. Guests may observe or participate in small ways, depending on the season. Tending to the land is a reminder of patience, care, and steady growth.
          </p>
        </div>
      </section>

      {/* Land and lake */}
      <section className="py-20 md:py-28">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-headline text-foreground mb-6">
            Land and lake
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Lake Limestone stretches beyond the cabins, shaping the pace of the days. The property sits within the Post Oak Savannah, where hardwoods, water, and open sky meet. Birds move through. Wind shifts. The land sets the tone.
          </p>
        </div>
      </section>

      {/* Seasons */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-headline text-foreground mb-8">
            Seasons at Limestone Fields
          </h2>
          <p className="text-muted-foreground mb-8">Each season brings its own rhythm.</p>
          <ul className="space-y-4 text-muted-foreground">
            <li><strong className="text-foreground">Spring</strong> brings growth and soft light.</li>
            <li><strong className="text-foreground">Summer</strong> holds long days, warm water, and quiet evenings.</li>
            <li><strong className="text-foreground">Fall</strong> slows the land and cools the air.</li>
            <li><strong className="text-foreground">Winter</strong> offers clarity, stillness, and wide views.</li>
          </ul>
        </div>
      </section>

      {/* Classes and gatherings */}
      <section className="py-20 md:py-28">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-headline text-foreground mb-6">
            Classes and gatherings
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Occasional classes and small gatherings are offered throughout the year. These experiences are optional, seasonal, and aligned with the pace of the land. Details are shared when available.
          </p>
        </div>
      </section>
    </main>
  )
}
