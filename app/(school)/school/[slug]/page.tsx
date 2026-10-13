import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import Hero from '@/components/sections/Hero'
import SchoolInterestForm from '@/components/forms/SchoolInterestForm'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  SCHOOL_CLASSES,
  SCHOOL_INCLUDED,
  SCHOOL_FAQS,
  getSchoolClass,
  type SchoolPhoto,
} from '@/lib/school'

/**
 * Art of Living School class page — one template, one entry per class in
 * lib/school.ts. Modeled on /writers-retreat: same section rhythm, palette,
 * and type, with a "get first word" sign-up in place of booking because
 * dates and prices aren't final yet.
 *
 * Kept noindex (and out of the sitemap) until Trisha and Josh confirm each
 * class's teacher, dates, and price.
 */

export function generateStaticParams() {
  return SCHOOL_CLASSES.map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getSchoolClass(params.slug)
  if (!c) return {}
  const teacher = c.teacher ? ` with ${c.teacher.name}` : ''
  return {
    title: `${c.title}${teacher} · The Art of Living School`,
    description: c.cardBlurb,
    robots: { index: false, follow: false },
    openGraph: {
      title: `${c.title}${teacher} · The Art of Living School`,
      description: c.subhead,
      images: [{ url: c.heroImage.src, width: c.heroImage.w, height: c.heroImage.h }],
    },
  }
}

const EYEBROW = 'font-subhead text-[13px] tracking-[0.26em] uppercase'
const H2 = 'font-headline text-[32px] md:text-[40px] leading-[1.2] text-[#253136]'
const BTN =
  'inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-3 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#f7f2e4] transition hover:bg-[#253136]/90'

function Photo({
  photo,
  className = '',
  sizes = '(min-width: 1024px) 60vw, 100vw',
}: {
  photo: SchoolPhoto
  className?: string
  sizes?: string
}) {
  return (
    <div className={`relative overflow-hidden rounded-md bg-[#b3c1ce]/30 ${className}`}>
      <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
    </div>
  )
}

export default function SchoolClassPage({ params }: { params: { slug: string } }) {
  const c = getSchoolClass(params.slug)
  if (!c) notFound()

  const t = c.teacher
  const faqs = [...c.faqs, ...SCHOOL_FAQS]
  const included = [...c.included, ...SCHOOL_INCLUDED]

  return (
    <>
      <Hero
        eyebrow={`The Art of Living School · ${c.season} · Lake Limestone, TX`}
        headline={c.headline}
        kicker={t ? `${c.title} with ${t.name}` : c.title}
        subhead={c.subhead}
        ctaText="Get First Word"
        ctaHref="#reserve"
        backgroundImage={c.heroImage.src}
        backgroundImageAlt={c.heroImage.alt}
      />

      {/* What to expect */}
      <section className="bg-limestone-cream py-24 md:py-36">
        <div className="container max-w-2xl mx-auto px-6 text-center space-y-8">
          <p className={`${EYEBROW} text-[#253136]/60`}>What to expect</p>
          {c.expect.map((para) => (
            <p key={para.slice(0, 40)} className="font-body-secondary text-lg md:text-xl text-[#253136] leading-relaxed">
              {para}
            </p>
          ))}
        </div>
        <div className="container max-w-6xl mx-auto px-6 mt-16 md:mt-20 grid gap-4 md:grid-cols-[2fr_1fr]">
          <Photo photo={c.expectPhotos[0]} className="aspect-[16/9]" sizes="(min-width: 768px) 66vw, 100vw" />
          <Photo photo={c.expectPhotos[1]} className="aspect-[16/9] md:aspect-auto" sizes="(min-width: 768px) 33vw, 100vw" />
        </div>
      </section>

      {/* Why this craft */}
      <section className="py-24 md:py-32 bg-[#253136] text-[#F7E7D5]">
        <div className="container max-w-3xl mx-auto px-6">
          <p className={`${EYEBROW} text-[#D39B75] mb-6`}>{c.why.eyebrow}</p>
          <p className="font-body-secondary text-[26px] md:text-[34px] leading-[1.35]">{c.why.lead}</p>
          <div className="mt-10 space-y-5 text-[18px] text-[#b3c1ce] leading-[1.7] max-w-2xl">
            {c.why.body.map((para) => (
              <p key={para.slice(0, 40)}>{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Full-bleed */}
      <div className="relative h-[52vh] min-h-[320px] md:h-[68vh] bg-[#253136]">
        <Image src={c.bleed.src} alt={c.bleed.alt} fill sizes="100vw" className="object-cover" />
      </div>

      {/* Four pillars */}
      <section className="py-20 md:py-28 bg-[#F9F4EE]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid gap-px sm:grid-cols-2 bg-[#253136]/10 border border-[#253136]/10">
            {c.pillars.map((p, i) => (
              <div key={p.title} className="bg-[#F9F4EE] p-9 md:p-10">
                <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#686121]">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="font-headline text-[28px] leading-[1.2] text-[#253136] mt-4 mb-3">{p.title}</h3>
                <p className="text-[17px] text-[#253136]/75 leading-[1.6]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teacher */}
      <section id="teacher" className="py-24 md:py-32 bg-[#F7E7D5]">
        {t ? (
          <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-16 md:grid-cols-[2fr_3fr] items-start">
            <div className="grid grid-cols-2 gap-4">
              {t.portrait && (
                <Photo photo={t.portrait} className="aspect-[4/5] col-span-2" sizes="(min-width: 768px) 40vw, 100vw" />
              )}
              {t.work.slice(0, 2).map((p) => (
                <Photo key={p.src} photo={p} className="aspect-square" sizes="(min-width: 768px) 20vw, 50vw" />
              ))}
            </div>
            <div>
              <p className={`${EYEBROW} text-[#3D1212] mb-4`}>Your teacher</p>
              <h2 className={`${H2} mb-2`}>{t.name}</h2>
              <p className="font-subhead text-[12px] tracking-[0.22em] uppercase text-[#253136]/55 mb-8">{t.role}</p>
              <div className="space-y-5 max-w-2xl text-[18px] text-[#253136]/85 leading-[1.65]">
                {t.bio.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
              {(t.website || t.instagram) && (
                <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
                  {t.website && (
                    <a href={t.website.url} target="_blank" rel="noopener noreferrer" className="font-subhead text-[11px] tracking-[0.16em] uppercase text-[#253136]/70 underline underline-offset-4 hover:text-[#253136]">
                      {t.website.label}
                    </a>
                  )}
                  {t.instagram && (
                    <a href={`https://www.instagram.com/${t.instagram}/`} target="_blank" rel="noopener noreferrer" className="font-subhead text-[11px] tracking-[0.16em] uppercase text-[#253136]/70 underline underline-offset-4 hover:text-[#253136]">
                      @{t.instagram}
                    </a>
                  )}
                </div>
              )}
              {t.alsoTeaching && (
                <p className="mt-8 text-[16px] text-[#253136]/70 leading-[1.6] border-t border-[#253136]/15 pt-6 max-w-2xl">
                  {t.alsoTeaching}
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="container max-w-3xl mx-auto px-6 text-center">
            <p className={`${EYEBROW} text-[#3D1212] mb-4`}>Your teacher</p>
            <h2 className={`${H2} mb-6`}>To be announced.</h2>
            <p className="text-[18px] text-[#253136]/80 leading-[1.65]">
              We&rsquo;re choosing the teacher for this one carefully: someone from the Texas community who
              practices the craft for a living and likes sharing it. Get on the list and you&rsquo;ll hear who
              it is first.
            </p>
          </div>
        )}
      </section>

      {/* The shape of the weekend */}
      <section id="weekend" className="bg-limestone-cream py-24 md:py-32">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] items-center mb-16">
            <div className="max-w-xl">
              <p className={`${EYEBROW} text-[#253136]/60 mb-4`}>The shape of the weekend</p>
              <h2 className={H2}>Hands busy in the morning. Long table at night.</h2>
              <p className="text-[18px] text-[#253136]/75 leading-[1.6] mt-5">
                Two nights, three days. The teaching happens in a few unhurried sessions, and the rest of the
                time is yours: the lake, the cedar tub, a nap. Times are a guide, and final details come with
                the dates.
              </p>
            </div>
            <Photo photo={c.schedulePhoto} className="aspect-[16/9]" sizes="(min-width: 768px) 55vw, 100vw" />
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {c.days.map((d) => (
              <div key={d.date} className="border-t-2 border-[#253136] pt-5">
                <p className="font-subhead text-[11px] tracking-[0.22em] uppercase text-[#686121]">{d.date}</p>
                <h3 className="font-headline text-[26px] leading-[1.2] text-[#253136] mt-2 mb-5">{d.title}</h3>
                <ul className="space-y-3.5">
                  {d.items.map(([time, what]) => (
                    <li key={time + what} className="text-[16px] text-[#253136]/80 leading-[1.5]">
                      <span className="block font-subhead text-[10px] tracking-[0.16em] uppercase text-[#253136]/50 mb-0.5">{time}</span>
                      {what}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What you'll leave with + what's included */}
      <section id="included" className="py-24 md:py-32 bg-[#F9F4EE] border-t border-[#253136]/10">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-16 md:grid-cols-2 items-start">
          <div>
            <p className={`${EYEBROW} text-[#253136]/60 mb-4`}>What you&rsquo;ll leave with</p>
            <h2 className={H2}>{c.takeHomeHeadline}</h2>
            <ul className="space-y-4 mt-8">
              {c.takeHome.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[17px] text-[#253136] leading-[1.55]">
                  <span className="mt-2.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#3D1212] inline-block" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-limestone-cream border border-[#253136]/15 rounded-md p-8 md:p-10">
            <p className="font-subhead text-[11px] tracking-[0.22em] uppercase text-[#686121]">One price, the whole weekend</p>
            <h3 className="font-headline text-[30px] leading-[1.2] text-[#253136] mt-3 mb-6">What&rsquo;s included</h3>
            <ul className="space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[16px] text-[#253136]/85 leading-[1.55]">
                  <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-[#253136]/50 inline-block" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 pt-6 border-t border-[#253136]/15">
              <p className="text-[16px] text-[#253136]/75 leading-[1.6]">
                Dates and pricing are being set now. The list hears first, and gets first pick of the cabins.
              </p>
              <a href="#reserve" className={`${BTN} mt-6`}>Get First Word</a>
            </div>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="bg-limestone-cream py-24 md:py-32 border-t border-[#253136]/10">
        <div className="container max-w-4xl mx-auto px-6">
          <p className={`${EYEBROW} text-[#253136]/60 mb-4`}>Questions, answered</p>
          <h2 className={`${H2} mb-10`}>The things people ask before they say yes.</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map(([q, a]) => (
              <AccordionItem key={q} value={q} className="border-[#253136]/15">
                <AccordionTrigger className="text-left font-headline text-[20px] md:text-[22px] leading-[1.3] text-[#253136] py-5 hover:no-underline">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-[17px] text-[#253136]/80 leading-[1.65] pb-6">{a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Practical */}
      <section className="bg-[#F9F4EE] py-16 md:py-20 border-t border-[#253136]/10">
        <div className="container max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-3">
          {[
            ['Where', '159 LCR 890, Jewett, Texas. On Lake Limestone, about two hours from Dallas, Austin, and Houston.'],
            ['When', `${c.season}. Friday afternoon to Sunday afternoon. Exact dates go to the list first.`],
            ['Who', c.who],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#253136]/50 mb-3">{k}</p>
              <p className="text-[17px] text-[#253136]/85 leading-[1.6]">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sign up */}
      <section id="reserve" className="py-24 md:py-32 bg-[#253136]">
        <div className="container max-w-4xl mx-auto px-6">
          <p className={`${EYEBROW} text-[#b3c1ce] mb-5`}>Save a seat at the table</p>
          <h2 className="text-[32px] md:text-[40px] font-headline leading-[1.2] text-[#f7f2e4] mb-5">
            Get first word on {c.title.toLowerCase()}.
          </h2>
          <p className="text-[18px] text-[#b3c1ce] leading-[1.6] max-w-2xl mb-10">
            Small group, a handful of cabins. When the dates and price are set, the list hears first and gets
            first pick. Nothing to pay today.
          </p>
          <SchoolInterestForm classSlug={c.slug} classTitle={c.title} />
          <p className="text-[14px] text-[#b3c1ce]/70 mt-14">
            <Link href="/school" className="underline underline-offset-4 hover:text-[#f7f2e4]">
              See every class in the Art of Living School
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
