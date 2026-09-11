import Image from 'next/image'
import JsonLd from '@/components/seo/JsonLd'
import type { ReactNode } from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

/* ------------------------------------------------------------------ */
/* Shared photo registry. Every landing page draws from this pool.     */
/* ------------------------------------------------------------------ */

export const PHOTOS = {
  campfire: { src: '/images/writers-retreat/hero.jpg', alt: 'An evening fire at Limestone Fields' },
  aerialPond: { src: '/images/writers-retreat/aerial.jpg', alt: 'Aerial view of the cabins around the pond, with Lake Limestone beyond' },
  aerialWide: { src: '/images/landing/aerial-wide.jpg', alt: 'Aerial view of Limestone Fields: the cabin ring, the Commons barn, the farm rows, and the lake' },
  aerialLake: { src: '/images/landing/aerial-lake.jpg', alt: 'The cabins on the shore of Lake Limestone from above' },
  cabinsDusk: { src: '/images/writers-retreat/cabins-dusk.jpg', alt: 'Cabins at dusk with the windows lit and red chairs on each porch' },
  cabinsRow: { src: '/images/landing/cabins-row.jpg', alt: 'A row of cabins under the trees in late light' },
  bedroom: { src: '/images/writers-retreat/bedroom.jpg', alt: 'Inside a cabin: king bed, wood headboard, and a glass door onto the deck' },
  cabinDoor: { src: '/images/landing/cabin-door.jpg', alt: 'A guest with morning coffee in a cabin doorway, cedar soaking tub on the deck' },
  soakingTub: { src: '/images/landing/soaking-tub.jpg', alt: 'A guest in a cedar soaking tub looking out over the lake' },
  desk: { src: '/images/landing/desk.jpg', alt: 'A built-in writing desk by a cabin window' },
  readingNook: { src: '/images/landing/reading-nook.jpg', alt: 'A guest reading in a quiet corner of a cabin' },
  barnExterior: { src: '/images/landing/barn-exterior.jpg', alt: 'The Commons barn at dusk' },
  barnKitchen: { src: '/images/landing/barn-kitchen.jpg', alt: 'The Commons kitchen: long farm table, range, and open shelving' },
  barnLounge: { src: '/images/landing/barn-lounge.jpg', alt: 'The Commons lounge with leather sofas' },
  breakfast: { src: '/images/landing/breakfast.jpg', alt: 'Friends making breakfast together in the Commons kitchen' },
  loungeGame: { src: '/images/landing/lounge-game.jpg', alt: 'Two guests playing a board game in the Commons lounge' },
  coffee: { src: '/images/landing/coffee.jpg', alt: 'Pour-over coffee in the Commons kitchen' },
  grill: { src: '/images/landing/grill.jpg', alt: 'Pork and broccolini over the wood-fired grill' },
  kayak: { src: '/images/writers-retreat/kayak.jpg', alt: 'A guest kayaking across Lake Limestone' },
  lakeTrees: { src: '/images/landing/lake-through-trees.jpg', alt: 'Lake Limestone seen through the trees' },
  wetlandsCabins: { src: '/images/landing/wedding-marsh.jpg', alt: 'An egret in the wetlands below the cabins' },
  cows: { src: '/images/landing/cows.jpg', alt: 'Two Highland cattle in a field of wildflowers' },
  cowPortrait: { src: '/images/landing/cow-portrait.jpg', alt: 'A guest with a Highland cow at the edge of the woods' },
  garden: { src: '/images/landing/garden.jpg', alt: 'Two guests planting in the farm garden' },
  ducks: { src: '/images/writers-retreat/ducks.jpg', alt: 'The farm ducks walking through the grass' },
  swing: { src: '/images/landing/swing.jpg', alt: 'A child on the tree swing at dusk' },
  woods: { src: '/images/landing/woods.jpg', alt: 'Walking into the woods' },
  wildflowers: { src: '/images/writers-retreat/wildflowers.jpg', alt: 'A field of yellow wildflowers at the edge of the woods' },
} as const

export type PhotoKey = keyof typeof PHOTOS

export function Photo({
  id,
  className = '',
  sizes = '(min-width: 1024px) 60vw, 100vw',
  priority = false,
}: {
  id: PhotoKey
  className?: string
  sizes?: string
  priority?: boolean
}) {
  const p = PHOTOS[id]
  return (
    <div className={`relative overflow-hidden rounded-md bg-[#b3c1ce]/30 ${className}`}>
      <Image src={p.src} alt={p.alt} fill sizes={sizes} priority={priority} className="object-cover" />
    </div>
  )
}

/** Full-width photo band between sections. */
export function PhotoBand({ id }: { id: PhotoKey }) {
  const p = PHOTOS[id]
  return (
    <div className="relative h-[52vh] min-h-[320px] md:h-[68vh] bg-[#253136]">
      <Image src={p.src} alt={p.alt} fill sizes="100vw" className="object-cover" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Typography tokens                                                   */
/* ------------------------------------------------------------------ */

export const EYEBROW = 'font-subhead text-[13px] tracking-[0.26em] uppercase'
export const H2 = 'font-headline text-[32px] md:text-[40px] leading-[1.2] text-[#253136]'
export const BODY = 'text-[18px] text-[#253136]/80 leading-[1.65]'
export const CTA_DARK =
  'inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-3 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#f7f2e4] transition hover:bg-[#253136]/90'

/* ------------------------------------------------------------------ */
/* Sections                                                            */
/* ------------------------------------------------------------------ */

/** Centered statement in the site's serif, right under the hero. */
export function Statement({ eyebrow, children }: { eyebrow: string; children: ReactNode }) {
  return (
    <section className="bg-limestone-cream py-24 md:py-32">
      <div className="container max-w-2xl mx-auto px-6 text-center space-y-8">
        <p className={`${EYEBROW} text-[#253136]/60`}>{eyebrow}</p>
        <div className="font-body-secondary text-lg md:text-xl text-[#253136] leading-relaxed space-y-6">{children}</div>
      </div>
    </section>
  )
}

/** Dark section: the argument. A big serif lead, then a few paragraphs. */
export function Argument({ eyebrow, lead, children }: { eyebrow: string; lead: string; children: ReactNode }) {
  return (
    <section className="py-24 md:py-32 bg-[#253136] text-[#F7E7D5]">
      <div className="container max-w-3xl mx-auto px-6">
        <p className={`${EYEBROW} text-[#D39B75] mb-6`}>{eyebrow}</p>
        <p className="font-body-secondary text-[26px] md:text-[34px] leading-[1.35]">{lead}</p>
        <div className="mt-10 space-y-5 text-[18px] text-[#b3c1ce] leading-[1.7] max-w-2xl">{children}</div>
      </div>
    </section>
  )
}

export function Pillars({ items }: { items: { n: string; title: string; body: string }[] }) {
  return (
    <section className="py-20 md:py-28 bg-[#F9F4EE]">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="grid gap-px sm:grid-cols-2 bg-[#253136]/10 border border-[#253136]/10">
          {items.map((p) => (
            <div key={p.n} className="bg-[#F9F4EE] p-9 md:p-10">
              <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#686121]">{p.n}</p>
              <h3 className="font-headline text-[28px] leading-[1.2] text-[#253136] mt-4 mb-3">{p.title}</h3>
              <p className="text-[17px] text-[#253136]/75 leading-[1.6]">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Two-column: copy + bullet list on one side, photo on the other. */
export function SplitList({
  id,
  eyebrow,
  title,
  intro,
  items,
  photo,
  photoFirst = false,
  bg = 'bg-limestone-cream',
  footnote,
}: {
  id?: string
  eyebrow: string
  title: string
  intro?: string
  items: string[]
  photo: PhotoKey
  photoFirst?: boolean
  bg?: string
  footnote?: string
}) {
  return (
    <section id={id} className={`py-24 md:py-32 ${bg}`}>
      <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-16 md:grid-cols-2 items-center">
        <div className={photoFirst ? 'md:order-2' : ''}>
          <p className={`${EYEBROW} text-[#253136]/60 mb-4`}>{eyebrow}</p>
          <h2 className={H2}>{title}</h2>
          {intro && <p className={`${BODY} mt-5`}>{intro}</p>}
          <ul className="mt-7 space-y-3.5">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[17px] text-[#253136] leading-[1.55]">
                <span className="mt-2.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#686121] inline-block" />
                {item}
              </li>
            ))}
          </ul>
          {footnote && <p className="text-[14px] text-[#253136]/55 font-body-secondary italic mt-7">{footnote}</p>}
        </div>
        <Photo id={photo} className={`aspect-[4/5] md:aspect-[3/4] ${photoFirst ? 'md:order-1' : ''}`} sizes="(min-width: 768px) 50vw, 100vw" />
      </div>
    </section>
  )
}

/** The shape of the weekend: day columns, each a list of [time, what]. */
export function Days({
  eyebrow,
  title,
  intro,
  days,
  note,
}: {
  eyebrow: string
  title: string
  intro: string
  days: { date: string; title: string; items: [string, string][] }[]
  note?: string
}) {
  const cols = days.length >= 4 ? 'lg:grid-cols-4' : days.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2'
  return (
    <section className="bg-limestone-cream py-24 md:py-32">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <p className={`${EYEBROW} text-[#253136]/60 mb-4`}>{eyebrow}</p>
          <h2 className={H2}>{title}</h2>
          <p className={`${BODY} mt-5`}>{intro}</p>
        </div>
        <div className={`grid gap-10 md:grid-cols-2 ${cols}`}>
          {days.map((d) => (
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
        {note && <p className="text-[14px] text-[#253136]/55 font-body-secondary italic mt-12 max-w-2xl">{note}</p>}
      </div>
    </section>
  )
}

/** Honest fit: two columns, "this is for you if" / "probably not if". */
export function Fit({ yes, no }: { yes: string[]; no: string[] }) {
  return (
    <section className="py-24 md:py-32 bg-[#F7E7D5]">
      <div className="container max-w-6xl mx-auto px-6">
        <p className={`${EYEBROW} text-[#3D1212] mb-4`}>Is this the right fit?</p>
        <h2 className={`${H2} mb-12`}>A word before you reach out.</h2>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#253136]/55 mb-5">This is your place if</p>
            <ul className="space-y-4">
              {yes.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[17px] text-[#253136] leading-[1.55]">
                  <span className="mt-2.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#686121] inline-block" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#253136]/55 mb-5">Probably not, if</p>
            <ul className="space-y-4">
              {no.map((t) => (
                <li key={t} className="flex items-start gap-3 text-[17px] text-[#253136]/80 leading-[1.55]">
                  <span className="mt-2.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#3D1212]/50 inline-block" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="text-[16px] text-[#253136]/70 mt-12 max-w-2xl">
          We care about the fit as much as the booking. If you&rsquo;re not sure, ask. We&rsquo;ll tell you straight.
        </p>
      </div>
    </section>
  )
}

export function Numbers({ items }: { items: [string, string][] }) {
  return (
    <section className="bg-[#F9F4EE] py-16 md:py-20 border-y border-[#253136]/10">
      <div className="container max-w-6xl mx-auto px-6 grid gap-10 sm:grid-cols-2 md:grid-cols-4">
        {items.map(([k, v]) => (
          <div key={k}>
            <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#253136]/50 mb-3">{k}</p>
            <p className="text-[17px] text-[#253136]/85 leading-[1.6]">{v}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function FAQ({ items, closing }: { items: [string, string][]; closing?: string }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
  return (
    <section className="bg-limestone-cream py-24 md:py-32">
      <JsonLd data={faqSchema} />
      <div className="container max-w-4xl mx-auto px-6">
        <p className={`${EYEBROW} text-[#253136]/60 mb-4`}>Questions, answered</p>
        <h2 className={`${H2} mb-10`}>The things people ask before they reach out.</h2>
        <Accordion type="single" collapsible className="w-full">
          {items.map(([q, a]) => (
            <AccordionItem key={q} value={q} className="border-[#253136]/15">
              <AccordionTrigger className="text-left font-headline text-[20px] md:text-[22px] leading-[1.3] text-[#253136] py-5 hover:no-underline">
                {q}
              </AccordionTrigger>
              <AccordionContent className="text-[17px] text-[#253136]/80 leading-[1.65] pb-6">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {closing && <p className="text-[16px] text-[#253136]/65 mt-8">{closing}</p>}
      </div>
    </section>
  )
}

export function Steps({ items }: { items: { step: string; title: string; body: string }[] }) {
  return (
    <section className="py-20 md:py-28 bg-[#F9F4EE] border-t border-[#253136]/10">
      <div className="container max-w-6xl mx-auto px-6">
        <p className={`${EYEBROW} text-[#253136]/60 mb-4`}>How it works</p>
        <h2 className={`${H2} mb-12`}>Simple from inquiry to arrival.</h2>
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {items.map((s) => (
            <div key={s.step} className="border-t-2 border-[#253136] pt-5">
              <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#686121]">{s.step}</p>
              <h3 className="font-headline text-[24px] leading-[1.2] text-[#253136] mt-3 mb-3">{s.title}</h3>
              <p className="text-[16px] text-[#253136]/75 leading-[1.6]">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export const STANDARD_STEPS = [
  { step: '01', title: 'Inquire', body: 'Tell us your dates, your headcount, and what you have in mind. Two minutes, below.' },
  { step: '02', title: 'Talk', body: 'We reply within two business days with availability, pricing, and honest answers. A call if you want one.' },
  { step: '03', title: 'Reserve', body: 'A deposit holds your dates. The whole property is yours for the weekend.' },
  { step: '04', title: 'Arrive', body: 'Check in Friday afternoon. Settle in. Use the place the way you came to use it.' },
]

/** Dark closing section wrapping the inquiry form. */
export function Inquire({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return (
    <section id="inquire" className="py-24 md:py-32 bg-[#253136]">
      <div className="container max-w-4xl mx-auto px-6">
        <p className={`${EYEBROW} text-[#b3c1ce] mb-5`}>{eyebrow}</p>
        <h2 className="text-[32px] md:text-[40px] font-headline leading-[1.2] text-[#f7f2e4] mb-5">{title}</h2>
        <p className="text-[18px] text-[#b3c1ce] leading-[1.6] max-w-2xl mb-10">{intro}</p>
        {children}
      </div>
    </section>
  )
}

/** Shared schema.org address block. */
export const LF_ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: '159 LCR 890',
  addressLocality: 'Jewett',
  addressRegion: 'TX',
  postalCode: '75846',
  addressCountry: 'US',
}
