import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import JsonLd from '@/components/seo/JsonLd'
import LandingShell from '@/components/landing/LandingShell'
import EventInquiryForm from '@/components/forms/EventInquiryForm'
import {
  Argument,
  BODY,
  Days,
  EYEBROW,
  FAQ,
  Fit,
  H2,
  Inquire,
  LF_ADDRESS,
  Numbers,
  Photo,
  PhotoBand,
  Pillars,
  SplitList,
  Statement,
  STANDARD_STEPS,
  Steps,
} from '@/components/landing/blocks'

/**
 * Company retreats / offsites / executive gatherings landing page. Single path
 * to the inquiry form; no site nav. Facts match /buyouts. Pricing on inquiry.
 */

const PAGE_URL = 'https://limestonefields.com/company-retreats'

export const metadata: Metadata = {
  title: 'Company Retreats & Executive Offsites — Limestone Fields',
  description:
    'Buy out a lakefront property for your team. Ten private cabins, a 1,200 sq ft barn for sessions and meals, 16 acres of quiet on Lake Limestone, and no other guests. Two hours from Austin, Dallas, and Houston.',
  openGraph: {
    title: 'Company Retreats & Executive Offsites — Limestone Fields',
    description:
      'Get the whole team in one place, then get quiet. A full-property buyout for offsites, leadership retreats, and small-company gatherings on Lake Limestone.',
    url: PAGE_URL,
    images: [{ url: 'https://limestonefields.com/images/landing/aerial-wide.jpg', width: 2400, height: 1600 }],
  },
  alternates: { canonical: PAGE_URL },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'EventVenue',
  name: 'Limestone Fields — Company Retreats',
  description:
    'Full-property buyout for corporate retreats, executive offsites, and small-company gatherings. Ten cabins sleeping 26, a 1,200 sq ft barn with full kitchen for sessions and meals, 16 acres on Lake Limestone, Texas.',
  url: PAGE_URL,
  address: LF_ADDRESS,
  maximumAttendeeCapacity: 50,
}

export default function CompanyRetreatsPage() {
  return (
    <LandingShell
      tagline="Company retreats · Lake Limestone"
      footerTitle="Company retreats at Limestone Fields"
      footerSub="Ten cabins · One barn · Sixteen acres · Your team only"
    >
      <JsonLd data={schema} />

      <Hero
        eyebrow="Company retreats · Offsites · Executive gatherings"
        headline="Get the whole team in one place. Then get quiet."
        kicker="A full-property buyout on Lake Limestone"
        subhead="Ten cabins, one barn, sixteen acres, and nobody else on the property. Two hours from Austin, Dallas, and Houston, and a long way from the calendar."
        ctaText="Start an Inquiry"
        ctaHref="#inquire"
        backgroundImage="/images/landing/aerial-wide.jpg"
        backgroundImageAlt="Aerial view of Limestone Fields on Lake Limestone"
      />

      <Statement eyebrow="The idea">
        <p>
          The best conversations at any offsite happen after the agenda ends. On the walk back from dinner. Around
          the fire at eleven. Over coffee before anyone has opened a laptop.
        </p>
        <p>
          Most venues are built to end the day. This one is built to keep it going. Your team sleeps here, eats
          here, and wakes up here, with no hotel lobby between the last session and the real talk.
        </p>
      </Statement>

      <Argument
        eyebrow="Why a buyout"
        lead="A conference room with a lake view is still a conference room. This is the opposite: a place that happens to have a room for the work."
      >
        <p>
          When you take the whole property, the hard part of an offsite disappears. Nobody is negotiating a hotel
          block. Nobody is shuttling between the venue and the restaurant and the bar. Nobody from another company
          is in the next room. It is your people, one set of grounds, and a barn with a long table.
        </p>
        <p>
          There are no televisions in the cabins. Cell signal is honest but not overwhelming. The land invites
          people outside between sessions, onto a kayak or a walking path or a porch, which is where the thinking
          that needed the trip actually gets done.
        </p>
        <p>
          We prepare the property, hand you the keys, and stay out of the way. Bring your facilitator, your chef,
          your agenda. Or bring none of those and use the quiet.
        </p>
      </Argument>

      <PhotoBand id="barnExterior" />

      <Pillars
        items={[
          { n: '01', title: 'A room for the work', body: 'The Commons: 1,200 sq ft with a long farm table, a lounge, and a full chef’s kitchen. Sessions in the morning, dinner at the same table that night.' },
          { n: '02', title: 'A cabin for each person', body: 'Ten private cabins, each with a king bed, a built-in desk, and an outdoor cedar soaking tub. Real doors that close. The kind of rest that makes day two better than day one.' },
          { n: '03', title: 'Sixteen acres of think time', body: 'Kayaks on Lake Limestone, walking paths through the woods, a working farm with Highland cattle, and fire pits at every cabin. Walking meetings are better meetings.' },
          { n: '04', title: 'Nobody else here', body: 'One group at a time. The whole property is yours from Friday to Sunday, or midweek if that suits the team better. No other guests, no other event, no audience.' },
        ]}
      />

      <SplitList
        id="included"
        eyebrow="What's included"
        title="The whole property. Here is what that means."
        items={[
          'All ten cabins for two nights or more: king beds, desks, private cedar soaking tubs, sleeps 26',
          'The Commons barn (1,200 sq ft): meeting and dining space, lounge, full chef’s kitchen',
          'Outdoor kitchen with a Santa Maria grill and woodfired oven, fire pits, and the pergola',
          '1,200 feet of private lakefront, kayaks, walking paths, and open land',
          'Access to the working farm: garden, hens, ducks, and the Highland cattle',
          'Un-facilitated by design. Bring your own facilitator, chef, or programming, or use the space as it is',
        ]}
        photo="barnLounge"
        footnote="Pricing depends on dates and length of stay and comes with your proposal. Chef, facilitator, and team-building partners available on request."
      />

      <Days
        eyebrow="The shape of a retreat"
        title="Two nights that do the work of a week."
        intro="A sample rhythm from teams who have been here. Build your own; the property is flexible, and midweek dates are open."
        days={[
          {
            date: 'Day one',
            title: 'Arrive & open',
            items: [
              ['Afternoon', 'Arrive from Austin, Dallas, or Houston. Choose cabins, walk the land'],
              ['Late afternoon', 'Opening session at the long table in The Commons'],
              ['Evening', 'Dinner cooked over the fire; the conversation you came for'],
            ],
          },
          {
            date: 'Day two',
            title: 'The deep work',
            items: [
              ['Morning', 'Coffee in the barn, then the first working block'],
              ['Midday', 'Lunch, then walking meetings in pairs down to the lake'],
              ['Afternoon', 'Second block, or open time to think and write in the cabins'],
              ['Evening', 'The long dinner. Fire pit after. Nobody drives anywhere'],
            ],
          },
          {
            date: 'Day three',
            title: 'Close & commit',
            items: [
              ['Morning', 'Slow breakfast, then a closing session: decisions, owners, dates'],
              ['Late morning', 'One more kayak or soak'],
              ['By 11am', 'Check out and drive home clear-headed'],
            ],
          },
        ]}
        note="Prefer a midweek retreat? Ask. Tuesday to Thursday buyouts are often easier to book than weekends."
      />

      <section className="py-24 md:py-32 bg-[#F9F4EE] border-t border-[#253136]/10">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:grid-cols-[1.1fr_0.9fr] items-start">
          <div className={`${BODY} space-y-5`}>
            <p className={`${EYEBROW} text-[#253136]/60 mb-4`}>Who comes here</p>
            <h2 className={H2}>Small teams doing serious work.</h2>
            <p className="pt-2">
              <strong className="text-[#253136]">Leadership teams</strong> planning the year, making the hard
              call, or working out how to work together. The thinking that needs actual quiet.
            </p>
            <p>
              <strong className="text-[#253136]">Small companies</strong> of ten to twenty-six who want the whole
              team under one roof for a few days: strategy in the morning, cooking together at night.
            </p>
            <p>
              <strong className="text-[#253136]">Founders, partners, and boards</strong> who need a day and a night
              away from the office to decide something that matters.
            </p>
            <p>
              <strong className="text-[#253136]">Creative and product teams</strong> on a sprint, a writing week, or
              a design intensive. Deep, uninterrupted focus with a lake to stare at when it stalls.
            </p>
          </div>
          <div className="grid gap-4">
            <Photo id="breakfast" className="aspect-[16/10]" sizes="(min-width: 768px) 45vw, 100vw" />
            <Photo id="kayak" className="aspect-[16/10]" sizes="(min-width: 768px) 45vw, 100vw" />
          </div>
        </div>
      </section>

      <Fit
        yes={[
          'Your team is 26 or fewer overnight, or up to about 50 for a day session',
          'You want the whole property, with no other guests or events',
          'You would rather bring your own facilitator and chef than pick from a venue menu',
          'You see the quiet, the lake, and the fire as part of the agenda, not a break from it',
          'You are within a few hours’ drive of Austin, Dallas, or Houston',
        ]}
        no={[
          'You need a hotel-style venue with A/V staff, breakout rooms, and in-house catering',
          'Your group is larger than 26 and everyone must sleep on site',
          'The agenda is back-to-back presentations with no time outdoors',
          'You need it fully staffed and facilitated; we prepare the place and hand you the keys',
        ]}
      />

      <Numbers
        items={[
          ['Overnight', '26 across ten cabins; 3 suites sleep four'],
          ['Day sessions', 'Up to about 50 in and around The Commons'],
          ['Length', 'Two-night minimum; midweek and longer stays welcome'],
          ['Location', 'Lake Limestone, TX. Two hours from Austin, Dallas, and Houston'],
        ]}
      />

      <FAQ
        items={[
          ['What does a buyout cost?', 'It depends on dates, length of stay, and whether you want a chef or facilitator arranged. We send real numbers with your proposal within two business days. Tell us the headcount and the dates you are considering.'],
          ['Is there Wi‑Fi and cell service?', 'Yes to both, and we would rather be straight with you about it than oversell it. Tell us what your team needs to run, and we will tell you exactly what to expect before you book.'],
          ['Can you arrange a chef?', 'Yes. We work with chefs who cook over fire in The Commons and the outdoor kitchen, from the farm when the season allows. Or bring your own, or cook together as a team; the kitchen is fully equipped.'],
          ['Is the property facilitated?', 'No, by design. We prepare the property, provide the amenities, and hand you the keys. Bring your own facilitator or programming, or ask us for people we trust.'],
          ['Do you have meeting equipment?', 'The Commons has a long table, a lounge, and room to work. Tell us what you need for screens or sound and we will tell you what is on hand and what to bring.'],
          ['Can we come midweek?', 'Please do. Tuesday to Thursday retreats are often easier to book than weekends and the property is quieter still.'],
          ['How far is it, really?', 'About two hours by car from Austin, Dallas, and Houston. Close enough for a two-night trip, far enough that nobody pops back to the office.'],
        ]}
        closing="Something else? Ask in the form below. A real person reads every one."
      />

      <Steps items={STANDARD_STEPS} />

      <Inquire
        eyebrow="Start here"
        title="Tell us about the team."
        intro="Headcount, the dates you are considering, and what the retreat needs to accomplish. We reply within two business days with availability, pricing, and honest answers."
      >
        <EventInquiryForm
          eventType="company_retreat"
          companyLabel="Company"
          datesLabel="Dates you're considering *"
          datesPlaceholder='e.g. mid-March 2027, or "a midweek in Q2"'
          groupLabel="Team size *"
          detailsPlaceholder="What does this retreat need to accomplish? Chef, facilitator, anything we should arrange?"
          submitLabel="Send Inquiry"
          footnote="We host one group at a time. Pricing and availability come with your proposal; midweek dates are often open."
        />
      </Inquire>
    </LandingShell>
  )
}
