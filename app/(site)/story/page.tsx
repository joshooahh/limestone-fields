import Hero from '@/components/sections/Hero'

export default function StoryPage() {
  return (
    <main>
      <Hero
        headline="How Limestone Fields came to be"
        subhead="Limestone Fields began as an idea among friends who valued quiet, land, and thoughtful work. The intention was never to build quickly or loudly. The goal was to create a place that felt steady and considered."
        eyebrow="Story"
      />

      {/* The land before */}
      <section className="py-20 md:py-28">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-headline text-foreground mb-6">
            The land before
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Before the lake, this land was part of the Navasota River bottomland. Lake Limestone was formed in 1978, reshaping the shoreline and the surrounding ecosystem. The property sits in Limestone County, within the Post Oak Savannah, where hardwoods, prairie, and water meet.
          </p>
        </div>
      </section>

      {/* Why it is built this way */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-headline text-foreground mb-6">
            Why it is built this way
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Limestone Fields favors simplicity over spectacle. Cabins instead of crowds. Space instead of schedules. Care without constant service. Design here is meant to support guests quietly, allowing them to reconnect with their own rhythm.
          </p>
        </div>
      </section>

      {/* What we believe */}
      <section className="py-20 md:py-28">
        <div className="container max-w-4xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-headline text-foreground mb-8">
            What we believe
          </h2>
          <ul className="space-y-4 text-muted-foreground">
            <li>Stillness can be a strength</li>
            <li>Beauty can be grounded and practical</li>
            <li>Hospitality does not need to be loud</li>
            <li>Rest and clarity are meant to carry back into everyday life</li>
            <li>Limestone Fields exists to hold space and then step back.</li>
          </ul>
        </div>
      </section>
    </main>
  )
}
