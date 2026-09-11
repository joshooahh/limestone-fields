import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import JsonLd from '@/components/seo/JsonLd'
import { landingPageSchema, breadcrumbSchema } from '@/lib/schema-constants'
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
 * Family reunions landing page. Single path to the inquiry form; no site nav.
 * Facts match /buyouts (capacity, barn, farm, lake). Pricing on inquiry.
 */

const PAGE_URL = 'https://limestonefields.com/family-reunions'

export const metadata: Metadata = {
  title: 'Family Reunions on Lake Limestone',
  description:
    'Rent the whole place for the whole family. Ten private cabins, a barn kitchen big enough for everyone, a working farm the kids will not want to leave, and a lake out front. Two hours from Austin, Dallas, and Houston.',
  openGraph: {
    title: 'Family Reunions on Lake Limestone — Limestone Fields',
    description:
      'Everyone under one sky. Ten cabins so every household has its own door, one barn for every meal, sixteen acres of lake and farm. One family at a time.',
    url: PAGE_URL,
    images: [{ url: 'https://limestonefields.com/images/writers-retreat/aerial.jpg', width: 2400, height: 1350 }],
  },
  alternates: { canonical: PAGE_URL },
}

const schema = [
  ...landingPageSchema({
    path: '/family-reunions',
    name: 'Family reunions at Limestone Fields',
    serviceType: 'Family reunion venue rental, full-property buyout',
    description:
      'Rent the whole place for the whole family. Ten private cabins, a barn kitchen big enough for everyone, a working farm the kids will not want to leave, and a lake out front. Two hours from Austin, Dallas, and Houston.',
    audienceType: 'Extended families planning a multi-day reunion',
    image: 'https://limestonefields.com/images/writers-retreat/aerial.jpg',
    capacity: 50,
  }),
  breadcrumbSchema([['Home', '/'], ['Private Events', '/private-events'], ['Family Reunions', '/family-reunions']]),
]

export default function FamilyReunionsPage() {
  return (
    <LandingShell
      tagline="Family reunions · Lake Limestone"
      footerTitle="Family reunions at Limestone Fields"
      footerSub="Ten cabins · One big kitchen · A farm and a lake · One family at a time"
    >
      <JsonLd data={schema} />

      <Hero
        eyebrow="Family reunions · Milestone birthdays · Anniversaries"
        headline="Everyone under one sky."
        kicker="The whole place, for the whole family"
        subhead="Ten cabins so every household has its own door. One barn kitchen big enough for all of you. A farm the kids will not want to leave, and a lake out front for the grown-ups."
        ctaText="Start an Inquiry"
        ctaHref="#inquire"
        backgroundImage="/images/writers-retreat/aerial.jpg"
        backgroundImageAlt="Aerial view of the cabins around the pond at Limestone Fields"
      />

      <Statement eyebrow="The idea">
        <p>
          A reunion at a hotel is a series of scheduled meals in a private dining room. A reunion at a rented
          house is one bathroom for fourteen people and someone sleeping on the couch.
        </p>
        <p>
          This is the third way. Everyone gets a cabin. Everyone eats at one table. And the whole property, sixteen
          acres of lake and woods and farm, belongs to your family alone for the weekend.
        </p>
      </Statement>

      <Argument
        eyebrow="Why here"
        lead="The reunions people still talk about twenty years later have one thing in common: enough room to be together, and enough room to get away."
      >
        <p>
          Your aunt who needs quiet gets a cabin at the end of the row. The cousins who stay up until two get the
          fire pit. Your parents get a king bed, a soaking tub, and a porch with a lake view. And every morning, all
          of you end up in the barn kitchen anyway, because that is where the coffee is.
        </p>
        <p>
          The kids have a farm. Highland cattle, ducks, hens, a garden, a tree swing, a pond. The teenagers have
          kayaks and no cell signal worth fighting over. The grown-ups have the long table and a night sky you
          cannot see from Dallas.
        </p>
        <p>
          Nobody else is on the property. No other guests at breakfast, no other family at the fire. For three days
          the whole place is yours to fill with your noise.
        </p>
      </Argument>

      <PhotoBand id="cabinsDusk" />

      <Pillars
        items={[
          { n: '01', title: 'A door for every household', body: 'Ten brand-new cabins on the water. Seven with a king bed for a couple; three suites with a king and two full beds for a family. Each with a private cedar soaking tub and a fire pit.' },
          { n: '02', title: 'One table for everyone', body: 'The Commons: a 1,200 sq ft barn with a full chef’s kitchen and a long farm table. Big enough for the whole family to cook, eat, and argue about the recipe together.' },
          { n: '03', title: 'A farm for the kids', body: 'Highland cattle, ducks, hens, a garden, and a tree swing under a big oak. The kind of place where children disappear for an hour and come back muddy and happy.' },
          { n: '04', title: 'A lake for everyone else', body: '1,200 feet of private shoreline, kayaks, walking paths through the woods, and fire pits at every cabin. Room to be together, and room to get away.' },
        ]}
      />

      <SplitList
        id="included"
        eyebrow="What's included"
        title="The whole property. Here is what that means."
        items={[
          'All ten cabins for two nights or more: king beds, private cedar soaking tubs, sleeps 26',
          'The Commons barn (1,200 sq ft): full chef’s kitchen, long table, lounge with sofas and games',
          'Outdoor kitchen with a Santa Maria grill and woodfired oven for the big cookout',
          'Fire pits, the pergola, and outdoor gathering spots for the family photo',
          '1,200 feet of private lakefront, kayaks, walking paths, and open land to run',
          'The working farm: Highland cattle, ducks, hens, and the garden',
          'Space for day guests to join for a meal or a milestone celebration',
        ]}
        photo="barnKitchen"
        photoFirst
        footnote="Bring your own groceries and cook together, or ask us to arrange a chef for the big night. Pricing and availability on inquiry."
      />

      <Days
        eyebrow="The shape of the weekend"
        title="Three days, no schedule to keep."
        intro="A sample rhythm from families who have gathered here. Yours will be louder and better."
        days={[
          {
            date: 'Friday',
            title: 'Everyone arrives',
            items: [
              ['Afternoon', 'Cars roll in from three cities. Cabins are claimed, the kids find the ducks'],
              ['Evening', 'The first big dinner in the barn, or tacos over the fire'],
              ['Late', 'Fire pits, stars, the cousins catching up until two'],
            ],
          },
          {
            date: 'Saturday',
            title: 'The long day',
            items: [
              ['Morning', 'Breakfast in the barn kitchen, everyone in pajamas'],
              ['Midday', 'Kayaks, a farm walk, naps, the family photo on the shore'],
              ['Afternoon', 'Day guests arrive for the celebration'],
              ['Evening', 'The cookout: Santa Maria grill, long table, toasts, cake'],
            ],
          },
          {
            date: 'Sunday',
            title: 'The slow goodbye',
            items: [
              ['Morning', 'One more breakfast together; one more soak'],
              ['Late morning', 'Plans made for next year'],
              ['By 11am', 'Check out, with more photos than you meant to take'],
            ],
          },
        ]}
        note="Staying longer than two nights makes a reunion feel like a vacation. Ask about three- and four-night stays."
      />

      <section className="py-24 md:py-32 bg-[#F9F4EE] border-t border-[#253136]/10">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:grid-cols-[0.9fr_1.1fr] items-start">
          <div className="space-y-8">
            <div>
              <p className={`${EYEBROW} text-[#253136]/60 mb-4`}>For the kids</p>
              <h2 className={H2}>Muddy, happy, asleep by nine.</h2>
            </div>
            <Photo id="swing" className="aspect-[4/3]" sizes="(min-width: 768px) 45vw, 100vw" />
          </div>
          <div className="space-y-5">
            <div className={`${BODY} space-y-5`}>
              <p>
                This is a working farm, not a petting zoo. The Highland cattle are real, the hens lay the breakfast
                eggs, and the ducks will follow anyone with a handful of feed. Kids who arrive glued to a screen
                tend to lose it somewhere between the tree swing and the pond.
              </p>
              <p>
                For the grown-ups watching from a porch: every cabin has a soaking tub and a fire pit, the barn has
                a lounge with games, and the lake is right there. Nobody has to drive anywhere for three days.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <Photo id="cows" className="aspect-[4/3]" sizes="(min-width: 768px) 25vw, 50vw" />
              <Photo id="ducks" className="aspect-[4/3]" sizes="(min-width: 768px) 25vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <Fit
        yes={[
          'Your family is 26 or fewer overnight, with more joining for a day or a meal',
          'You want everyone in one place, with a door of their own to close at night',
          'You like the idea of cooking together more than a hotel banquet',
          'There are kids, and you would like them outside',
          'You are gathering from Austin, Dallas, Houston, or anywhere in between',
        ]}
        no={[
          'More than 26 people need to sleep on site',
          'You want catering, planning, and activities handled by the venue',
          'Someone in the family needs hotel-style accessibility on every path; ask us, and we will be honest about the terrain',
          'You are picturing a resort with a pool and a bar; this is a farm on a lake',
        ]}
      />

      <Numbers
        items={[
          ['Overnight', '26 across ten cabins; 3 suites sleep four'],
          ['Day guests', 'Up to about 50 for a meal or celebration'],
          ['Length', 'Two-night minimum; three and four nights welcome'],
          ['Location', 'Lake Limestone, TX. Two hours from Austin, Dallas, and Houston'],
        ]}
      />

      <FAQ
        items={[
          ['What does it cost?', 'It depends on your dates and how many nights. We send real numbers with your proposal within two business days. Tell us your headcount and the dates you are hoping for.'],
          ['How many people can sleep here?', 'Twenty-six. Seven standard cabins sleep two in a king bed; three suites sleep four with a king and two full beds. Extended family can stay in Jewett or Groesbeck, fifteen minutes away, and join for the days.'],
          ['Is it good for kids?', 'Very. A working farm with Highland cattle, ducks, hens, and a garden; a tree swing; a pond; kayaks on the lake; and sixteen acres to run. It is also a real farm and a real lake, so little ones need a grown-up nearby, same as anywhere outdoors.'],
          ['Do you provide meals?', 'No, and most families prefer it that way. The Commons has a full chef’s kitchen and an outdoor kitchen with a Santa Maria grill, so you cook together. For the big night, we can arrange a chef who cooks over fire.'],
          ['Can people who are not staying join for a day?', 'Yes. The barn and grounds hold around fifty for a meal or a celebration. Tell us the numbers and we will plan for them.'],
          ['Is it accessible for older relatives?', 'One standard cabin is accessible, and the barn is on one level. The land itself is a farm on a lake, with gravel paths and uneven ground in places. Tell us who is coming and we will be honest about what will and will not work.'],
          ['Can we bring the dog?', 'Ask us. Policies depend on the animal and the group, and we would rather talk it through than post a blanket rule.'],
        ]}
        closing="Something else? Ask in the form below. A real person reads every one."
      />

      <Steps items={STANDARD_STEPS} />

      <Inquire
        eyebrow="Start here"
        title="Tell us about your family."
        intro="How many of you, when you are hoping to gather, and what you are celebrating. We reply within two business days with availability, pricing, and honest answers."
      >
        <EventInquiryForm
          eventType="family_reunion"
          companyLabel="Family name or occasion"
          companyPlaceholder="e.g. the Ramsey reunion, Mom's 70th"
          datesLabel="Dates you're hoping for *"
          datesPlaceholder='e.g. Thanksgiving week 2027, or "a summer weekend, flexible"'
          groupLabel="How many of you *"
          detailsPlaceholder="Ages, who's coming from where, what you're celebrating, anything we should know"
          submitLabel="Send Inquiry"
          footnote="We host one family at a time. Pricing and availability come with your proposal; longer stays are welcome."
        />
      </Inquire>
    </LandingShell>
  )
}
