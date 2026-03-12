import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { pageQuery } from '@/sanity/queries'
import type { PageDocument } from '@/sanity/types'

export const metadata: Metadata = {
  title: 'The Experience',
  description:
    'Life at Limestone Fields is shaped by land, weather, and time. A working permaculture farm, shared Commons kitchen, lake access, and the kind of quiet that restores. No required schedule.',
  openGraph: {
    title: 'The Experience at Limestone Fields',
    description:
      'A working permaculture farm, shared chef\'s kitchen, lake frontage, and the kind of quiet that restores. Life here is scheduled by the sun.',
    url: 'https://limestonefields.com/experience',
  },
  alternates: { canonical: 'https://limestonefields.com/experience' },
}

export default async function ExperiencePage() {
  const experiencePage = await client.fetch<PageDocument | null>(pageQuery, { slug: 'experience' })

  return (
    <>
      <Hero
        headline="Scheduled by the Sun"
        subhead="Life at Limestone Fields is shaped by land, weather, and time. No required schedule. No expectation to participate."
        eyebrow="Experience"
        backgroundImage={experiencePage?.heroImage ? urlForImage(experiencePage.heroImage).width(1600).auto('format').url() : undefined}
        backgroundImageAlt="Experience at Limestone Fields"
      />

      {/* Shared spaces + Working farm — two-column */}
      <section className="bg-limestone-cream py-24 md:py-32">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
          <div className="space-y-5">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              SHARED SPACES
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              A Barn, a Kitchen, and a Fire
            </h2>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              Shared spaces are designed to support ease and quiet connection.
              The barn serves as the heart of shared life — communal kitchen,
              tables for gathering, and space to linger. Interaction is always optional.
              Some guests cook together. Others pass quietly through. Both are welcome.
            </p>
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136] pt-3">
              SPACES INCLUDE
            </p>
            <ul className="space-y-3 text-[18px] text-[#253136] leading-[1.55]">
              <li>The Barn with Communal Kitchen</li>
              <li>Shared Tables for Meals or Work</li>
              <li>Fire Pits for Evening Gathering</li>
              <li>Open Seating Areas Indoors and Out</li>
            </ul>
          </div>
          <div className="space-y-5 md:pt-16">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              THE WORKING FARM
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              Real Agriculture. Not Staged.
            </h2>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              The farm is a living part of the property. Guests may observe or participate
              in small ways depending on the season. Tending to the land is a reminder of
              patience, care, and steady growth. Nothing about it is decorative.
            </p>
            <p className="font-body-secondary text-[17px] text-[#253136]/90 leading-[1.6] tracking-[0.03em] italic">
              There is something clarifying about watching things grow slowly.
              It tends to put your own pace in perspective.
            </p>
          </div>
        </div>
      </section>

      {/* Land and lake */}
      <section className="py-24 md:py-32 bg-[#CBD2DA]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136] mb-5">
              LAND AND LAKE
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136] mb-6">
              The Land Does Most of the Work
            </h2>
            <p className="text-[18px] text-[#253136] leading-[1.55] mb-6">
              Lake Limestone stretches beyond the cabins, shaping the pace of the days.
              The property sits within the Post Oak Savannah, where hardwoods, water,
              and open sky meet. Birds move through. Wind shifts. The land sets the tone.
            </p>
            <p className="font-body-secondary text-[17px] text-[#253136]/90 leading-[1.6] tracking-[0.03em] italic">
              You did not come here to be entertained.
              The lake understands that.
            </p>
          </div>
        </div>
      </section>

      {/* Seasons + Classes — two-column */}
      <section className="py-24 md:py-32 bg-limestone-cream">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
          <div className="space-y-5">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              THE SEASONS
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              Each One Has Its Own Rhythm
            </h2>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              The experience changes with the time of year. Not dramatically — there is no
              bad season here — but noticeably. The land keeps a different kind of calendar.
            </p>
            <ul className="space-y-5 text-[18px] text-[#253136] leading-[1.55]">
              <li>
                <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">SPRING</span>
                Growth and soft light. The farm wakes up. Everything is greener than you expected.
              </li>
              <li>
                <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">SUMMER</span>
                Long days, warm water, and quiet evenings on the lake.
              </li>
              <li>
                <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">FALL</span>
                The land slows down and the air cools. Good for thinking.
              </li>
              <li>
                <span className="font-subhead text-[12px] tracking-[0.22em] uppercase block mb-1">WINTER</span>
                Clarity, stillness, and wide views. The fire pits get more use.
              </li>
            </ul>
          </div>
          <div className="space-y-5 md:pt-16">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              CLASSES AND GATHERINGS
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              Occasional, Optional, Aligned with the Land
            </h2>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              Occasional classes and small gatherings are offered throughout the year.
              These experiences are optional, seasonal, and aligned with the pace of the
              land. Details are shared when available. Nothing is required.
            </p>
            <p className="text-[18px] text-[#253136] leading-[1.55]">
              If you come and simply want to sit by the water for three days and read,
              that works too. Probably better than most things.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#253136]/90"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
