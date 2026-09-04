import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/sections/Hero'
import JsonLd from '@/components/seo/JsonLd'
import RetreatReservationForm from '@/components/forms/RetreatReservationForm'
import { RETREAT_BOOKING_URL, RETREAT_DEPOSIT_TERMS } from '@/lib/retreat'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

/**
 * Writers Retreat — Limestone Fields × Sobremesa · Nov 6–9, 2026.
 *
 * Lives in the (retreat) route group: no site nav, minimal footer, so the page
 * is a single path to reserving a place. Unlisted until the joint
 * announcement (week of Sep 8): noindex below, not in the sitemap. To launch,
 * remove the `robots` block in metadata and add the route to app/sitemap.ts.
 *
 * Booking model: guests book directly into the Sobremesa Magazine allotment
 * block in Cloudbeds (RETREAT_BOOKING_URL); the all-inclusive rate lives on
 * that rate plan. 50% deposit at booking, balance on the day of check-in. The
 * form below is for questions, or for anyone who'd rather have a cabin held.
 */

const PAGE_URL = 'https://limestonefields.com/writers-retreat'

export const metadata: Metadata = {
  title: 'A Writers Retreat — Limestone Fields × Sobremesa',
  description:
    'Three nights to rest, write, and eat well. A small writers retreat on Lake Limestone, Texas, Nov 6–9, 2026, hosted by Limestone Fields and Sobremesa magazine. Twelve places.',
  openGraph: {
    title: 'A Writers Retreat — Limestone Fields × Sobremesa · Nov 6–9, 2026',
    description:
      'Three nights to rest, write, and eat well. A private lakefront cabin, an Austin chef cooking over fire, and eleven other writers who came for the same reason. Twelve places.',
    url: PAGE_URL,
    images: [{ url: 'https://limestonefields.com/images/writers-retreat/hero.jpg', width: 2200, height: 1466 }],
  },
  alternates: { canonical: PAGE_URL },
  // Unlisted until the joint announcement. Remove to go public.
  robots: { index: false, follow: false },
}

const eventSchema = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'Writers Retreat — Limestone Fields × Sobremesa',
  description:
    'A small writers retreat: three nights of rest, writing, and long unhurried tables at Limestone Fields on Lake Limestone, Texas.',
  startDate: '2026-11-06T15:00:00-06:00',
  endDate: '2026-11-09T11:00:00-06:00',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  maximumAttendeeCapacity: 12,
  url: PAGE_URL,
  image: 'https://limestonefields.com/images/writers-retreat/hero.jpg',
  location: {
    '@type': 'Place',
    name: 'Limestone Fields',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '159 LCR 890',
      addressLocality: 'Jewett',
      addressRegion: 'TX',
      postalCode: '75846',
      addressCountry: 'US',
    },
  },
  organizer: [
    { '@type': 'Organization', name: 'Limestone Fields', url: 'https://limestonefields.com' },
    { '@type': 'Organization', name: 'Sobremesa Magazine' },
  ],
  offers: [
    {
      '@type': 'Offer',
      name: 'Standard Cabin — single occupancy, per person, all-inclusive',
      price: '1600',
      priceCurrency: 'USD',
      availability: 'https://schema.org/LimitedAvailability',
      url: RETREAT_BOOKING_URL,
    },
    {
      '@type': 'Offer',
      name: 'Cabin Suite — per person, double occupancy, all-inclusive',
      price: '1450',
      priceCurrency: 'USD',
      availability: 'https://schema.org/LimitedAvailability',
      url: RETREAT_BOOKING_URL,
    },
  ],
}

const BOOK_BTN =
  'inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-3 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#f7f2e4] transition hover:bg-[#253136]/90'

const PILLARS = [
  {
    n: '01',
    title: 'Rest',
    body:
      'A brand-new cabin of your own on the water. A private cedar soaking tub under the sky. A fire pit for the evening. Nobody needs anything from you for three days.',
  },
  {
    n: '02',
    title: 'Write',
    body:
      'Mornings open with a prompt and proper coffee. Afternoons are protected, one to five, every day. That is more uninterrupted writing time than most of us get in a month.',
  },
  {
    n: '03',
    title: 'Gather',
    body:
      'Eleven other people who also cleared their calendar to write. Paired walks. A reading circle by the fire. Company when you want it, and none when you don’t.',
  },
  {
    n: '04',
    title: 'Eat well',
    body:
      'A chef from Austin, in residence all weekend, cooking over wood from our barn kitchen. Eight meals, from Friday’s welcome dinner to Monday’s slow breakfast, all taken care of.',
  },
]

const DAYS = [
  {
    date: 'Fri · Nov 6',
    title: 'Arrival',
    items: [
      ['3pm onward', 'Arrive, settle into your cabin, walk the shore'],
      ['6:30pm', 'Welcome dinner at The Commons: the first woodfired feast, and the first long table'],
      ['8pm', 'Sobremesa. Lingering at the table, then an outdoor fire'],
    ],
  },
  {
    date: 'Sat · Nov 7',
    title: 'Plant & feast',
    items: [
      ['8:30am', 'Breakfast at The Commons: eggs from our hens, whatever the garden gives that morning, real coffee'],
      ['9:30am', 'Morning prompt and gathering'],
      ['11am', 'On the farm: plant garlic for a spring harvest'],
      ['12:30pm', 'Picnic basket delivered to your cabin door, so the afternoon stays yours'],
      ['1–5pm', 'Protected writing time. Or the kayak, the cedar tub, a nap'],
      ['5pm', 'Optional paired walk-and-talk with a prompt'],
      ['6:30pm', 'The feast: the chef’s marquee dinner, cooked over wood, served slow'],
      ['8pm', 'Reading circle: bring a piece by a writer you admire'],
    ],
  },
  {
    date: 'Sun · Nov 8',
    title: 'Harvest & cook',
    items: [
      ['8:30am', 'Breakfast at The Commons'],
      ['9:30am', 'Morning prompt and gathering'],
      ['11am', 'Harvest walk for tonight’s table, egg collection, a visit with the Highland cattle'],
      ['12:30pm', 'Picnic basket delivered'],
      ['1–5pm', 'Protected writing time'],
      ['5pm', 'Optional paired walk-and-talk, new pairs'],
      ['6:30pm', 'Cook the harvest together over the fire, with the chef at your elbow'],
      ['8pm', 'Reading circle: share a short piece of your own, if you like'],
    ],
  },
  {
    date: 'Mon · Nov 9',
    title: 'Departure',
    items: [
      ['9am', 'Slow breakfast at The Commons'],
      ['10am', 'Closing gathering: one thing you’ll carry home'],
      ['11am', 'Checkout and slow goodbyes'],
    ],
  },
]

const INCLUDED = [
  'Three nights in a brand-new private cabin on Lake Limestone, with a private outdoor cedar soaking tub, a king bed, and a built-in writing desk',
  'Every meal from Friday dinner through Monday breakfast, cooked on site by a chef from Austin',
  'Morning prompts, paired walk-and-talks, and two evening reading circles, all optional',
  'Two farm sessions: planting garlic, and a harvest walk for Sunday’s table',
  'A weekend among twelve writers, with a facilitator who has run writers’ conferences for a decade',
  'Wine and drinks with dinner, kept light',
]

const CABINS = [
  {
    name: 'Standard Cabin',
    meta: 'Held for one · 6 cabins',
    price: '$1,600',
    per: 'per person, all-inclusive',
    body:
      'Our original cabin, and we hold it for one on purpose. King bed, private outdoor cedar soaking tub, lake views, and a desk that faces the water. Real solitude between the shared meals.',
    details: ['3 nights, all meals, all programming', 'Add Thursday night: +$100'],
    href: '/book/traditional-cabin',
  },
  {
    name: 'Cabin Suite',
    meta: 'Up to two guests · 3 suites',
    price: '$1,450',
    per: 'per person, sharing · $1,900 on your own',
    body:
      'More room to spread out, and the option to bring a friend or partner who also wants three days to write. Each guest is included in every meal and every session.',
    details: ['3 nights, all meals, all programming, per person', 'Add Thursday night: +$150'],
    href: '/book/family-cabin',
  },
]

const FAQS: [string, string][] = [
  [
    'Do I need to be a published writer?',
    'No. Any genre, any stage, any relationship to the word “writer.” Some guests will arrive with a manuscript in progress. Others will arrive with a notebook and a feeling. Both belong here. The only requirement is that you want the time.',
  ],
  [
    'Will I actually get writing done?',
    'That is the point of the shape of the days. Every afternoon from one to five is protected, and the mornings after the prompt are yours too. Nothing is required except dinner, and you will want dinner. Most people write more in these three days than in the month before.',
  ],
  [
    'I don’t love group activities.',
    'Neither do a lot of writers. Everything social is optional and small: a paired walk, a reading circle where you can listen instead of read. The one thing we ask is that you come to the table. Sobremesa is, after all, the word for what happens after the meal.',
  ],
  [
    'What is the food, really?',
    'A chef from Austin lives on the property for the weekend and cooks every meal from The Commons, our barn kitchen with a Santa Maria grill and a woodfired oven. Dinners are multi-course and built around what the farm gives that week. Lunches arrive at your cabin in a basket. Tell us your dietary needs when you reserve and the menu is planned around them, not adjusted after the fact.',
  ],
  [
    'Can I bring someone?',
    'Yes, in a suite. Both of you are included in every meal and session, at $1,450 per person. Standard cabins are held for one so that everyone who wants a room of their own has one.',
  ],
  [
    'How do I hold my place?',
    'Book your cabin through the link on this page. It opens our booking system with the retreat rate already applied. A 50% deposit confirms the cabin, and the balance is due the day you check in. Twelve places, first come. If you would rather talk to a person first, use the form below and the hosts will hold a cabin for you.',
  ],
  [
    'What if I have to cancel?',
    'The 50% deposit is non-refundable once your cabin is booked. If you cancel within 31 days of arrival, any amount already paid is non-refundable, and no-shows are treated as cancellations. The full terms are shown before you confirm. If something changes, write to the hosts first; with twelve places, we can often help a cabin find its next writer.',
  ],
  [
    'How do I get there, and what do I bring?',
    'Limestone Fields is at 159 LCR 890 in Jewett, Texas, about two hours from Dallas, Austin, and Houston. Arrive Friday from 3pm. Bring the project you keep circling, something to read aloud, and layers: November here means mild days and cool nights by the fire.',
  ],
]

// Facilitator bio — from Katie's Google Doc.
const KATIE_BIO = [
  'Sobremesa Magazine’s founder and editor, Katie Rice, will be your host and guide for the weekend. She’s been publishing Sobremesa, a magazine filled with art and writing about food, for five years now, showcasing writers and artists from all around the world.',
  'Before she moved to Texas, Katie spent almost a decade helping to run the Colgate Writers’ Conference at Colgate University and was one of the founding members of Kettle Pond Writers’ Conference. She received her MFA in Creative Writing from University of Virginia and has been published in Bon Appetit, TASTE, Food52, Produce Parties, and Compound Butter, among others. She’s passionate about writing, cooking, eating, and sharing those loves with others.',
]

const EYEBROW = 'font-subhead text-[13px] tracking-[0.26em] uppercase'
const H2 = 'font-headline text-[32px] md:text-[40px] leading-[1.2] text-[#253136]'

export default function WritersRetreatPage() {
  return (
    <>
      <JsonLd data={eventSchema} />

      <Hero
        eyebrow="Writers Retreat · Nov 6–9, 2026 · Lake Limestone, TX"
        headline="Time to write."
        subhead="Three nights on the lake with eleven other writers, a chef from Austin, and nothing on the calendar you have to keep."
        ctaText="Book Your Cabin"
        ctaHref={RETREAT_BOOKING_URL}
        backgroundImage="/images/writers-retreat/hero.jpg"
        backgroundImageAlt="Evening fire at Limestone Fields"
      />

      {/* What to expect — Katie's words */}
      <section className="bg-limestone-cream py-24 md:py-36">
        <div className="container max-w-2xl mx-auto px-6 text-center space-y-8">
          <p className={`${EYEBROW} text-[#253136]/60`}>What to expect</p>
          <p className="font-body-secondary text-lg md:text-xl text-[#253136] leading-relaxed">
            Over the course of your stay, you&rsquo;ll settle into the unhurried rhythm of creativity
            and the peace that comes from being in nature&mdash;mornings that begin with a writing
            prompt and good coffee, long open afternoons that are yours to write, wander, or rest,
            and evenings around a shared table and a low-key reading. We&rsquo;ll take care of the
            food and the framework, so you can focus on your work and your quiet.
          </p>
          <p className="font-body-secondary text-lg md:text-xl text-[#253136] leading-relaxed">
            Set across sixteen acres of open Texas land, this retreat is all about coming back to
            yourself and your writing. Listening to the sounds of the ducks in the pond, smelling
            the cedar from the soaking tub, or feeling the soil of the farm are all ways of finding
            your creative grounding again in between stints at the writing desk. Come to as much or
            as little as calls you. We&rsquo;ll set a relaxed pace, and you follow it however you
            choose.
          </p>
        </div>
      </section>

      {/* Taking care of the writer */}
      <section className="py-24 md:py-32 bg-[#253136] text-[#F7E7D5]">
        <div className="container max-w-3xl mx-auto px-6">
          <p className={`${EYEBROW} text-[#D39B75] mb-6`}>Why a retreat</p>
          <p className="font-body-secondary text-[26px] md:text-[34px] leading-[1.35]">
            You already know what happens to the writing when everything else comes first. It waits.
            It waits politely, for years.
          </p>
          <div className="mt-10 space-y-5 text-[18px] text-[#b3c1ce] leading-[1.7] max-w-2xl">
            <p>
              Writers are famously bad at taking care of the writer. We steal an hour before the
              house wakes up. We write on the train. We tell ourselves that rest is what we&rsquo;ll
              do once the draft is done, and the draft is never done.
            </p>
            <p>
              This weekend runs the other way. For three days the work comes first and someone else
              takes care of you: a private cabin, meals cooked and cleared, a fire already lit. Rest
              here isn&rsquo;t a break from the writing. It&rsquo;s what makes the writing possible.
            </p>
            <p>
              And you won&rsquo;t be doing it alone. Twelve people, one table, the same reason for
              coming. Nobody at that table will ask what you do for a living. They&rsquo;ll ask what
              you&rsquo;re working on.
            </p>
          </div>
        </div>
      </section>

      {/* Four pillars */}
      <section className="py-20 md:py-28 bg-[#F9F4EE]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid gap-px sm:grid-cols-2 bg-[#253136]/10 border border-[#253136]/10">
            {PILLARS.map((p) => (
              <div key={p.n} className="bg-[#F9F4EE] p-9 md:p-10">
                <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#686121]">{p.n}</p>
                <h3 className="font-headline text-[28px] leading-[1.2] text-[#253136] mt-4 mb-3">Time to {p.title}</h3>
                <p className="text-[17px] text-[#253136]/75 leading-[1.6]">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The table */}
      <section id="food" className="py-24 md:py-32 bg-[#F7E7D5]">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-20 md:grid-cols-[1.1fr_0.9fr] items-center">
          <div className="space-y-5">
            <p className={`${EYEBROW} text-[#3D1212]`}>The table · with Sobremesa</p>
            <h2 className={H2}>The kind of meal you write about later.</h2>
            <p className="text-[18px] text-[#253136]/80 leading-[1.6]">
              Sobremesa is a magazine about food, so the table is not a detail here. It is half the
              point. A chef from Austin moves onto the property for the weekend and cooks every meal
              from The Commons, our barn kitchen, where a Santa Maria grill and a woodfired oven are
              going as the light drops over the lake.
            </p>
            <p className="text-[18px] text-[#253136]/80 leading-[1.6]">
              The menu is written the week of, around what the farm is giving: eggs from our hens,
              cool-season greens and roots from the garden, herbs cut that morning, meat from Texas
              ranches we know. Dinners are multi-course and unhurried. One seating, one long table,
              and then the sobremesa, the part after the meal that gives the magazine its name.
            </p>
            <ul className="space-y-3 pt-2">
              {[
                'Friday: a welcome feast cooked over wood, the first long table',
                'Saturday: the chef’s marquee dinner, the one you’ll describe to people at home',
                'Sunday: you harvest, you cook alongside the chef, you eat what you made',
                'Every day: farm breakfast at The Commons, a picnic basket at your cabin door for lunch',
                'Dietary needs planned into the menu from the start, not worked around later',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-[17px] text-[#253136] leading-[1.55]">
                  <span className="mt-2.5 shrink-0 w-1 h-1 rounded-full bg-[#3D1212]/60 inline-block" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#253136] text-[#F7E7D5] p-9 md:p-10 rounded-sm">
            <p className="font-subhead text-[11px] tracking-[0.26em] uppercase text-[#D39B75]">About Sobremesa</p>
            <blockquote className="font-body-secondary italic text-[22px] leading-[1.45] mt-5 mb-5">
              Sobremesa: the Spanish word for lingering at the table together after the meal is over.
              A magazine of art and writing about food, five years in print, with writers and artists
              from around the world.
            </blockquote>
            <p className="font-subhead text-[11px] tracking-[0.16em] uppercase text-[#b3c1ce]">Sobremesa Magazine</p>
          </div>
        </div>
      </section>

      {/* The shape of the days */}
      <section id="weekend" className="bg-limestone-cream py-24 md:py-32">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <p className={`${EYEBROW} text-[#253136]/60 mb-4`}>The shape of the days</p>
            <h2 className={H2}>A light rhythm, not a schedule.</h2>
            <p className="text-[18px] text-[#253136]/75 leading-[1.6] mt-5">
              A few gentle anchors a day, with the afternoons left wide open for writing and rest.
              Every session is optional. Arrive Thursday night if you&rsquo;d like to settle in ahead.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {DAYS.map((d) => (
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

      {/* Together */}
      <section className="py-24 md:py-32 bg-[#F9F4EE] border-y border-[#253136]/10">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:grid-cols-[0.9fr_1.1fr] items-start">
          <div>
            <p className={`${EYEBROW} text-[#253136]/60 mb-4`}>Twelve writers, one table</p>
            <h2 className={H2}>The company is part of the work.</h2>
          </div>
          <div className="space-y-5 text-[18px] text-[#253136]/80 leading-[1.65]">
            <p>
              Writing is solitary. It is also, oddly, lonely in a way that only other writers
              understand: the doubt, the stalled middle, the sentence you can&rsquo;t get to sit
              still. Three days with people who know that feeling does something a quiet room alone
              can&rsquo;t.
            </p>
            <p>
              We keep the group to twelve so it stays a circle, not a crowd. You&rsquo;ll walk in
              pairs with a prompt, read aloud by the fire if you want to and listen if you
              don&rsquo;t, and sit down to dinner with the same faces each night until they stop being
              strangers. No workshopping unless you ask for it. No pitching. No networking.
            </p>
            <p>
              People leave these weekends with pages. They also leave with two or three people who
              will ask, in February, how the book is going.
            </p>
          </div>
        </div>
      </section>

      {/* Facilitator */}
      <section id="facilitator" className="bg-limestone-cream py-24 md:py-32">
        <div className="container max-w-4xl mx-auto px-6">
          <p className={`${EYEBROW} text-[#253136]/60 mb-4`}>Your facilitator</p>
          <h2 className={`${H2} mb-8`}>Katie Rice</h2>
          <div className="space-y-5 max-w-2xl">
            {KATIE_BIO.map((para) => (
              <p key={para.slice(0, 40)} className="text-[18px] text-[#253136]/85 leading-[1.65]">
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* What the price covers + cabins */}
      <section id="cabins" className="py-24 md:py-32 bg-[#F9F4EE] border-t border-[#253136]/10">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid gap-12 md:gap-16 md:grid-cols-[1fr_1fr] items-start mb-16">
            <div>
              <p className={`${EYEBROW} text-[#253136]/60 mb-4`}>One price, the whole weekend</p>
              <h2 className={H2}>What $1,600 actually buys.</h2>
              <p className="text-[18px] text-[#253136]/75 leading-[1.6] mt-5">
                It is a real number, so here is what it covers. Put the pieces side by side and it
                is roughly what three nights in a lakefront cabin and eight chef-cooked meals would
                cost on their own, before anyone lit the fire, wrote the prompts, or held the space.
              </p>
              <p className="text-[18px] text-[#253136]/75 leading-[1.6] mt-4">
                Twelve places in total. Prices are per person and include everything below.
                {' '}{RETREAT_DEPOSIT_TERMS}
              </p>
              <div className="mt-8">
                <a href={RETREAT_BOOKING_URL} target="_blank" rel="noopener noreferrer" className={BOOK_BTN}>
                  Book Your Cabin
                </a>
              </div>
            </div>
            <ul className="space-y-4 pt-2">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[17px] text-[#253136] leading-[1.55]">
                  <span className="mt-2.5 shrink-0 w-1.5 h-1.5 rounded-full bg-[#686121] inline-block" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {CABINS.map((c) => (
              <div key={c.name} className="flex flex-col bg-limestone-cream border border-[#253136]/15 rounded-md p-8 md:p-10">
                <p className="font-subhead text-[11px] tracking-[0.22em] uppercase text-[#686121]">{c.meta}</p>
                <h3 className="font-headline text-[30px] leading-[1.2] text-[#253136] mt-3 mb-4">{c.name}</h3>
                <p className="text-[17px] text-[#253136]/80 leading-[1.6] flex-1">{c.body}</p>
                <ul className="mt-6 space-y-2">
                  {c.details.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-[15px] text-[#253136]/75">
                      <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-[#253136]/40 inline-block" />
                      {d}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-[#253136]/15 flex items-end justify-between gap-4">
                  <div>
                    <p className="font-headline text-[34px] leading-none text-[#253136]">{c.price}</p>
                    <p className="font-subhead text-[10px] tracking-[0.16em] uppercase text-[#253136]/55 mt-2">{c.per}</p>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    <a
                      href={RETREAT_BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-6 py-2.5 text-[11px] font-subhead uppercase tracking-[0.22em] text-[#f7f2e4] transition hover:bg-[#253136]/90"
                    >
                      Book
                    </a>
                    <Link
                      href={c.href}
                      className="font-subhead text-[11px] tracking-[0.22em] uppercase text-[#253136]/60 underline underline-offset-4 hover:text-[#253136] transition"
                    >
                      See the cabin
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[14px] text-[#253136]/55 font-body-secondary italic mt-8 max-w-2xl">
            Standard cabins are held for one on purpose. Solitude is the product. Want to come as a
            pair? Choose a suite.
          </p>
        </div>
      </section>

      {/* Questions */}
      <section className="bg-limestone-cream py-24 md:py-32 border-t border-[#253136]/10">
        <div className="container max-w-4xl mx-auto px-6">
          <p className={`${EYEBROW} text-[#253136]/60 mb-4`}>Questions, answered</p>
          <h2 className={`${H2} mb-10`}>The things people ask before they say yes.</h2>
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map(([q, a]) => (
              <AccordionItem key={q} value={q} className="border-[#253136]/15">
                <AccordionTrigger className="text-left font-headline text-[20px] md:text-[22px] leading-[1.3] text-[#253136] py-5 hover:no-underline">
                  {q}
                </AccordionTrigger>
                <AccordionContent className="text-[17px] text-[#253136]/80 leading-[1.65] pb-6">
                  {a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <p className="text-[16px] text-[#253136]/65 mt-8">
            Something else on your mind? Use the form below. It goes straight to the hosts.
          </p>
        </div>
      </section>

      {/* Practical */}
      <section className="bg-[#F9F4EE] py-16 md:py-20 border-t border-[#253136]/10">
        <div className="container max-w-6xl mx-auto px-6 grid gap-10 md:grid-cols-3">
          {[
            ['Where', '159 LCR 890, Jewett, Texas. On Lake Limestone, about two hours from Dallas, Austin, and Houston.'],
            ['When', 'Arrive Friday, Nov 6 from 3pm. Depart Monday, Nov 9 by 11am. Optional early arrival Thursday, Nov 5.'],
            ['Who', 'Twelve writers, one facilitator, one chef. Any genre, any stage. Bring the thing you keep circling.'],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#253136]/50 mb-3">{k}</p>
              <p className="text-[17px] text-[#253136]/85 leading-[1.6]">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reserve */}
      <section id="reserve" className="py-24 md:py-32 bg-[#253136]">
        <div className="container max-w-4xl mx-auto px-6">
          <p className={`${EYEBROW} text-[#b3c1ce] mb-5`}>Save your spot at the table</p>
          <h2 className="text-[32px] md:text-[40px] font-headline leading-[1.2] text-[#f7f2e4] mb-5">
            Ready? Book your cabin. Not yet? Ask us anything.
          </h2>
          <p className="text-[18px] text-[#b3c1ce] leading-[1.6] max-w-2xl mb-8">
            Booking takes a few minutes and opens with the retreat rate already applied. {RETREAT_DEPOSIT_TERMS}
            {' '}Twelve places, first come.
          </p>
          <div className="mb-14">
            <a
              href={RETREAT_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-[78px] bg-[#f7f2e4] px-10 py-3.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#253136] transition hover:bg-[#f7e7d5]"
            >
              Book Your Cabin
            </a>
          </div>
          <p className={`${EYEBROW} text-[#b3c1ce] mb-3`}>Or talk to the hosts first</p>
          <p className="text-[17px] text-[#b3c1ce] leading-[1.6] max-w-2xl mb-8">
            A question about the weekend, the food, the writing, or who else is coming. Or ask us to
            hold a cabin while you decide.
          </p>
          <RetreatReservationForm />
        </div>
      </section>
    </>
  )
}
