import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { pageQuery } from '@/sanity/queries'
import type { PageDocument } from '@/sanity/types'

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Limestone Fields began as an idea among friends who valued quiet, land, and thoughtful work. 15 acres on Lake Limestone, Texas — built around the concept of hospitality as hermitage.',
  openGraph: {
    title: 'Our Story — Limestone Fields',
    description:
      'How Limestone Fields came to be. 15 acres on Lake Limestone, built around the concept of hospitality as hermitage.',
    url: 'https://limestonefields.com/story',
  },
  alternates: { canonical: 'https://limestonefields.com/story' },
}

export default async function StoryPage() {
  const storyPage = await client.fetch<PageDocument | null>(pageQuery, { slug: 'story' })

  return (
    <>
      <Hero
        headline="How Limestone Fields Came to Be"
        subhead="An idea among friends who valued quiet, land, and thoughtful work."
        eyebrow="Story"
        backgroundImage={storyPage?.heroImage ? urlForImage(storyPage.heroImage).width(1600).auto('format').url() : undefined}
        backgroundImageAlt="The story of Limestone Fields"
      />

      {/* The land + The Beginning — two-column */}
      <section className="bg-limestone-cream py-24 md:py-32">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
          <div className="space-y-5">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              THE LAND
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              A Place Shaped by Water and Time
            </h2>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              Before the lake, this land was part of the Navasota River bottomland.
              Lake Limestone formed in 1978, reshaping the shoreline and the surrounding
              ecosystem. The property sits in Limestone County, within the Post Oak
              Savannah, where hardwoods, prairie, and water meet.
            </p>
            <p className="font-body-secondary text-[17px] text-[#253136]/90 leading-[1.6] tracking-[0.03em] italic">
              The land has a memory. You can feel it in the way the mornings open up
              and the evenings wind down without much help from anyone.
            </p>
          </div>
          <div className="space-y-5 md:pt-16">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              THE BEGINNING
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              Built Without Rushing
            </h2>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              Limestone Fields began as an idea among friends who valued quiet, land,
              and thoughtful work. The intention was never to build quickly or loudly.
              The goal was to create a place that felt steady and considered — a property
              that would earn its place in the landscape rather than impose on it.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-32 bg-[#CBD2DA]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136] mb-5">
              PHILOSOPHY
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136] mb-6">
              Why It Is Built This Way
            </h2>
            <p className="text-[18px] text-[#253136] leading-[1.55] mb-6">
              Limestone Fields favors simplicity over spectacle. Cabins instead of crowds.
              Space instead of schedules. Care without constant service. Design here is
              meant to support guests quietly — allowing them to reconnect with their own
              rhythm rather than fitting into someone else&apos;s.
            </p>
            <p className="font-body-secondary text-[17px] text-[#253136]/90 leading-[1.6] tracking-[0.03em] italic">
              There is enough noise in the world already. This place is built around the
              idea that quiet can be deliberate — not a lack of something, but a presence
              of its own.
            </p>
          </div>
        </div>
      </section>

      {/* What we believe + What's next — two-column */}
      <section className="py-24 md:py-32 bg-limestone-cream">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
          <div className="space-y-5">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              WHAT WE BELIEVE
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              Some Things Worth Saying Out Loud
            </h2>
            <ul className="space-y-4 text-[18px] text-[#253136] leading-[1.55]">
              <li>Stillness can be a strength.</li>
              <li>Beauty can be grounded and practical.</li>
              <li>Hospitality does not need to be loud.</li>
              <li>Rest and clarity are meant to carry back into everyday life.</li>
              <li>Limestone Fields exists to hold space — and then step back.</li>
            </ul>
          </div>
          <div className="space-y-5 md:pt-16">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              COME STAY
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              The Doors Are Open
            </h2>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              Ten private cabins on Lake Limestone, available now. Come for a few days.
              Leave with more room to think.
            </p>
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#253136]/90"
            >
              Check Availability
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
