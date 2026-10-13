import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Hero from '@/components/sections/Hero'
import SchoolInterestForm from '@/components/forms/SchoolInterestForm'
import { SCHOOL_CLASSES } from '@/lib/school'

/**
 * The Art of Living School — index of every class, in calendar order, plus
 * the Writers Retreat (its own page, already live). Noindex until the season
 * is confirmed.
 */

export const metadata: Metadata = {
  title: 'The Art of Living School',
  description:
    'Weekend classes in the old crafts at Limestone Fields on Lake Limestone, Texas: pasta, butchery, pastry, fishing, foraging, gardening, drawing, and more, taught by Austin makers.',
  robots: { index: false, follow: false },
}

const EYEBROW = 'font-subhead text-[13px] tracking-[0.26em] uppercase'
const H2 = 'font-headline text-[32px] md:text-[40px] leading-[1.2] text-[#253136]'

export default function SchoolIndexPage() {
  return (
    <>
      <Hero
        eyebrow="Limestone Fields · Lake Limestone, TX"
        headline="The Art of Living School."
        kicker="Weekend classes in the old crafts"
        subhead="Make pasta. Break down a hog. Draw from life. Grow what you cook. A weekend on the farm with someone who does it for a living, and a long table at the end of every day."
        ctaText="See the Classes"
        ctaHref="#classes"
        backgroundImage="/images/landing/barn-kitchen.jpg"
        backgroundImageAlt="The Commons, the barn kitchen at Limestone Fields"
      />

      <section className="bg-limestone-cream py-24 md:py-32">
        <div className="container max-w-2xl mx-auto px-6 text-center space-y-8">
          <p className={`${EYEBROW} text-[#253136]/60`}>What this is</p>
          <p className="font-body-secondary text-lg md:text-xl text-[#253136] leading-relaxed">
            Limestone Fields started as a farm, and a farm is a place where people still do things with their
            hands. The Art of Living School is our way of sharing that. Each weekend, one craft and one teacher:
            a butcher, a pastry cook, a painter, a gardener, most of them from Austin, all of them people who
            practice the thing they teach.
          </p>
          <p className="font-body-secondary text-lg md:text-xl text-[#253136] leading-relaxed">
            You stay in a cabin on the lake. Mornings are for the work. Afternoons are yours. Evenings are for
            the table, where more often than not we eat what we made. You go home with a skill, a few new
            friends, and something to show for it.
          </p>
        </div>
      </section>

      <section id="classes" className="py-24 md:py-32 bg-[#F9F4EE] border-t border-[#253136]/10">
        <div className="container max-w-6xl mx-auto px-6">
          <p className={`${EYEBROW} text-[#253136]/60 mb-4`}>The season</p>
          <h2 className={`${H2} mb-14`}>One craft, one weekend, one teacher.</h2>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/writers-retreat" className="group block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#b3c1ce]/30">
                <Image
                  src="/images/writers-retreat/hero.jpg"
                  alt="Evening fire at Limestone Fields"
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <p className="font-subhead text-[11px] tracking-[0.22em] uppercase text-[#686121] mt-5">Nov 6–9, 2026 · Booking now</p>
              <h3 className="font-headline text-[26px] leading-[1.2] text-[#253136] mt-2">Writers Retreat</h3>
              <p className="font-subhead text-[11px] tracking-[0.16em] uppercase text-[#253136]/55 mt-1">with Katie Rice of Sobremesa</p>
              <p className="text-[16px] text-[#253136]/75 leading-[1.6] mt-3">
                Three nights to rest, write, and eat well, with eleven other writers and an Austin chef.
              </p>
            </Link>
            {SCHOOL_CLASSES.map((c) => (
              <Link key={c.slug} href={`/school/${c.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-[#b3c1ce]/30">
                  <Image
                    src={c.cardImage.src}
                    alt={c.cardImage.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="font-subhead text-[11px] tracking-[0.22em] uppercase text-[#686121] mt-5">{c.season}</p>
                <h3 className="font-headline text-[26px] leading-[1.2] text-[#253136] mt-2">{c.title}</h3>
                <p className="font-subhead text-[11px] tracking-[0.16em] uppercase text-[#253136]/55 mt-1">
                  {c.teacher ? `with ${c.teacher.name}` : 'Teacher to be announced'}
                </p>
                <p className="text-[16px] text-[#253136]/75 leading-[1.6] mt-3">{c.cardBlurb}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="reserve" className="py-24 md:py-32 bg-[#253136]">
        <div className="container max-w-4xl mx-auto px-6">
          <p className={`${EYEBROW} text-[#b3c1ce] mb-5`}>Hear about every class</p>
          <h2 className="text-[32px] md:text-[40px] font-headline leading-[1.2] text-[#f7f2e4] mb-5">
            Get first word on the whole season.
          </h2>
          <p className="text-[18px] text-[#b3c1ce] leading-[1.6] max-w-2xl mb-10">
            Each class is a small group and a handful of cabins. The list hears about dates first. Tell us which
            crafts you&rsquo;re drawn to in the note.
          </p>
          <SchoolInterestForm classSlug="all" classTitle="the Art of Living School" />
        </div>
      </section>
    </>
  )
}
