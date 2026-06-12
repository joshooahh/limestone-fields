import type { Metadata } from 'next'
import type { Image as SanityImage } from 'sanity'
import Hero from '@/components/sections/Hero'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { pageQuery, teamMembersQuery } from '@/sanity/queries'
import type { PageDocument } from '@/sanity/types'

export const metadata: Metadata = {
  title: 'Our Story',
  description:
    'Limestone Fields began as an idea among friends who valued quiet, land, and thoughtful work. 16 acres on Lake Limestone, Texas — built around the concept of hospitality as hermitage.',
  openGraph: {
    title: 'Our Story — Limestone Fields',
    description:
      'How Limestone Fields came to be. 16 acres on Lake Limestone, built around the concept of hospitality as hermitage.',
    url: 'https://limestonefields.com/story',
  },
  alternates: { canonical: 'https://limestonefields.com/story' },
}

type TeamMember = {
  _id: string
  name: string
  role: string
  bio?: string
  photo?: SanityImage | null
  order?: number
}

export default async function StoryPage() {
  const [storyPage, team] = await Promise.all([
    client.fetch<PageDocument | null>(pageQuery, { slug: 'story' }).catch(() => null),
    client.fetch<TeamMember[]>(teamMembersQuery).catch(() => []),
  ])

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

      {/* Team */}
      {team.length > 0 && (
        <section className="py-24 md:py-32 bg-limestone-cream">
          <div className="container max-w-6xl mx-auto px-6">
            <div className="mb-14">
              <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136] mb-4">
                THE TEAM
              </p>
              <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
                The People Behind It
              </h2>
            </div>
            <div className={`grid gap-12 md:gap-10 ${
              team.length === 1
                ? 'md:grid-cols-1 max-w-sm'
                : team.length === 2
                ? 'md:grid-cols-2'
                : 'md:grid-cols-3'
            }`}>
              {team.map((member) => {
                const photoUrl = member.photo?.asset
                  ? urlForImage(member.photo).width(600).auto('format').url()
                  : null
                return (
                  <div key={member._id} className="space-y-5">
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-[#b3c1ce]">
                      {photoUrl && (
                        <Image
                          src={photoUrl}
                          alt={member.name}
                          fill
                          className="object-cover object-top"
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        />
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <h3 className="font-headline text-[22px] leading-[1.3] text-[#253136]">
                        {member.name}
                      </h3>
                      <p className="font-subhead text-[11px] tracking-[0.25em] uppercase text-[#253136]/55">
                        {member.role}
                      </p>
                    </div>
                    {member.bio && (
                      <p className="text-[17px] text-[#253136]/75 leading-[1.6]">
                        {member.bio}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* What we believe + Come Stay — two-column */}
      <section className={`py-24 md:py-32 ${team.length > 0 ? 'bg-[#F9F4EE]' : 'bg-limestone-cream'}`}>
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
