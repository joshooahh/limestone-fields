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
 * Small weddings landing page. Single path to the inquiry form; no site nav.
 * Facts (capacity, timeline, what's included) match /weddings. Pricing on inquiry.
 */

const PAGE_URL = 'https://limestonefields.com/small-weddings'

export const metadata: Metadata = {
  title: 'Small Weddings on Lake Limestone — Limestone Fields',
  description:
    'A small wedding where every guest sleeps on the property. Ten private lakefront cabins for 26 people, a barn for dinner and dancing, and the whole place to yourselves for the weekend. Two hours from Austin, Dallas, and Houston.',
  openGraph: {
    title: 'Small Weddings on Lake Limestone — Limestone Fields',
    description:
      'A wedding weekend for 26. Everyone you love, sleeping on the property, thirty steps from the ceremony and the fire. One wedding at a time.',
    url: PAGE_URL,
    images: [{ url: 'https://limestonefields.com/images/writers-retreat/cabins-dusk.jpg', width: 2000, height: 1333 }],
  },
  alternates: { canonical: PAGE_URL },
}

const schema = {
  '@context': 'https://schema.org',
  '@type': 'EventVenue',
  name: 'Limestone Fields — Small Weddings',
  description:
    'An intimate lakefront wedding venue on Lake Limestone, Texas. Ten private cabins sleeping 26, a lakefront ceremony site, and a 1,200 sq ft barn for the reception. One wedding at a time, full property exclusive use.',
  url: PAGE_URL,
  address: LF_ADDRESS,
  maximumAttendeeCapacity: 26,
}

export default function SmallWeddingsPage() {
  return (
    <LandingShell
      tagline="Small weddings · Lake Limestone"
      footerTitle="Small weddings at Limestone Fields"
      footerSub="Ten cabins · Sleeps 26 · One wedding at a time"
    >
      <JsonLd data={schema} />

      <Hero
        eyebrow="Small weddings · Lake Limestone, Texas"
        headline="A wedding where everyone stays."
        kicker="Twenty-six guests. Ten cabins. One weekend."
        subhead="Every person you invite sleeps on the property, thirty steps from the ceremony and the fire. One wedding at a time, on sixteen acres of lake and land that do the decorating for you."
        ctaText="Start an Inquiry"
        ctaHref="#inquire"
        backgroundImage="/images/writers-retreat/cabins-dusk.jpg"
        backgroundImageAlt="Cabins at dusk on Lake Limestone"
      />

      <Statement eyebrow="The idea">
        <p>
          Most weddings end at midnight when everyone drives off to separate hotels. Here, nobody drives anywhere.
          All twenty-six of your people are already home, thirty steps away, and the fire is still lit.
        </p>
        <p>
          Friday you arrive and rehearse. Saturday you marry on the water and dance in the barn. Sunday you make
          breakfast together, slowly, with the people who flew in. That is the whole idea: a wedding you get to be
          at.
        </p>
      </Statement>

      <Argument
        eyebrow="Why twenty-six"
        lead="You already know the guest list you actually want. It's shorter than the one you feel obligated to send."
      >
        <p>
          Twenty-six is the number where everyone in the room is someone you&rsquo;d call on a bad day. Parents,
          siblings, the friends who have known you both the longest. There is no table of coworkers&rsquo; spouses.
          No cousin you last saw in 2011. Every toast lands, because every person there knows the story.
        </p>
        <p>
          It is also exactly how many people ten cabins hold. So the guest list and the property agree with each
          other: nobody is sent to a hotel, nobody leaves early, and the money goes where you can feel it. The
          food, the band, the extra night. Instead of feeding a hundred and fifty people you barely know, you host
          a weekend for the ones you love.
        </p>
        <p>
          And it means we can give you the whole place. One wedding at a time. No other event on the grounds, no
          strangers in the next cabin, no venue coordinator hurrying you out because the next couple arrives at nine.
        </p>
      </Argument>

      <PhotoBand id="wetlandsCabins" />

      <Pillars
        items={[
          { n: '01', title: 'Marry on the water', body: 'A lakefront ceremony site with open sky and 1,200 feet of private shoreline behind you. With twenty-six guests, the back row is still close enough to see you cry.' },
          { n: '02', title: 'Dance in the barn', body: 'The Commons: a 1,200 sq ft barn with a full kitchen, long tables, string lights, and a pergola outside for the part of the night that moves to the fire.' },
          { n: '03', title: 'Everyone stays', body: 'Ten brand-new cabins on the property, each with a king bed and a private outdoor cedar soaking tub. Every guest sleeps where you celebrate. No shuttles, no hotel blocks, no goodbyes at midnight.' },
          { n: '04', title: 'Your vendors, your vision', body: 'Bring your own caterer, florist, photographer, and music. We share our preferred list, then get out of your way. The land needs very little help.' },
        ]}
      />

      <SplitList
        id="included"
        eyebrow="What's included"
        title="The space, and everything in it."
        intro="A weekend at Limestone Fields comes with the whole property. Here is what that means in practice."
        items={[
          'Lakefront ceremony site with sound system',
          'The Commons barn (1,200 sq ft) with full chef’s kitchen, tables, chairs, string lights, and uplighting',
          'Outdoor pergola, fire pits, and the outdoor kitchen with Santa Maria grill',
          'All ten cabins for two nights: king beds, private cedar soaking tubs. Every one of your 26 guests sleeps on the property',
          'Bridal suite and groom’s suite for getting ready',
          'Friday evening space for the rehearsal dinner, Sunday morning for a slow brunch',
          'Kayaks, walking paths, the working farm, and 16 acres to wander between moments',
          'Parking for everyone, right on the property',
        ]}
        photo="barnKitchen"
        footnote="You arrange: caterer and bar, a day-of coordinator, florals, music, and photography. Pricing and availability on inquiry."
      />

      <Days
        eyebrow="The shape of the weekend"
        title="Three days, one place, no rushing."
        intro="A sample rhythm. Yours will be your own, but this is how most weekends here tend to go."
        days={[
          {
            date: 'Friday',
            title: 'Arrive & rehearse',
            items: [
              ['From 2pm', 'Check in, choose your cabin, walk down to the water'],
              ['Evening', 'Rehearsal on the ceremony site, then dinner at The Commons or over the fire'],
              ['Late', 'Soaking tubs, stars, the first long night together'],
            ],
          },
          {
            date: 'Saturday',
            title: 'The wedding',
            items: [
              ['Morning', 'Slow breakfast in the barn; getting ready in the suites'],
              ['Afternoon', 'Ceremony on the lakefront'],
              ['Evening', 'Dinner and dancing in The Commons, drinks under the pergola'],
              ['Late', 'The fire pit. Nobody has to leave.'],
            ],
          },
          {
            date: 'Sunday',
            title: 'Slow goodbye',
            items: [
              ['Morning', 'Brunch made together in the barn kitchen'],
              ['Late morning', 'Kayaks, a farm walk, one more soak'],
              ['By 11am', 'Check out, unhurried'],
            ],
          },
        ]}
        note="Amplified music has a curfew for the sake of the land and the neighbors. Ask us for the details and we’ll plan the night around it."
      />

      <section className="py-24 md:py-32 bg-[#F9F4EE] border-t border-[#253136]/10">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:grid-cols-[0.9fr_1.1fr] items-start">
          <div className="space-y-8">
            <div>
              <p className={`${EYEBROW} text-[#253136]/60 mb-4`}>Where everyone sleeps</p>
              <h2 className={H2}>Ten cabins, thirty steps from the dance floor.</h2>
            </div>
            <Photo id="bedroom" className="aspect-[4/3]" sizes="(min-width: 768px) 45vw, 100vw" />
          </div>
          <div className={`${BODY} space-y-5`}>
            <p>
              Seven standard cabins with a king bed, and three suites that sleep four, for the couple with kids or
              the grandparents who want a little more room. Every cabin is new, sits on the water, and has its own
              outdoor cedar soaking tub and fire pit.
            </p>
            <p>
              Twenty-six people sleep on the property, which is the whole guest list. Parents in the suites with
              room for the grandkids. Siblings and the wedding party in the cabins along the water. The two of you
              in whichever one you like best. Nobody books a hotel. Nobody drives home after the last dance.
            </p>
            <p>
              The point is what happens between the events. Coffee on the porch with your sister the morning of.
              Your dad and your partner&rsquo;s dad discovering they both fish. The conversations a wedding day never
              leaves room for.
            </p>
          </div>
        </div>
      </section>

      <Fit
        yes={[
          'Your guest list is twenty-six people or fewer, and you want every one of them to stay',
          'You want a weekend with your people, not a six-hour production',
          'You like the idea of a lake, a barn, and a fire more than a ballroom',
          'You have, or want to hire, a coordinator and caterer you trust',
          'You would rather spend on the food and the band than on a bigger room',
        ]}
        no={[
          'Your guest list is bigger than the cabins; twenty-six is the number here',
          'You want a venue that handles catering, planning, and coordination in-house',
          'You are picturing a late-night club set; the music has a curfew here',
        ]}
      />

      <Numbers
        items={[
          ['Guests', '26, and every one of them stays'],
          ['Cabins', 'Ten: 7 with a king bed, 3 suites that sleep four'],
          ['Timeline', 'Friday from 2pm to Sunday by 11am'],
          ['Location', 'Lake Limestone, TX. Two hours from Austin, Dallas, and Houston'],
        ]}
      />

      <FAQ
        items={[
          ['What does it cost?', 'Pricing depends on your dates and how you want to use the property, so we send it with your proposal rather than posting a single number. Tell us your date and headcount below and you will have a real figure within two business days.'],
          ['Do you provide catering?', 'No, and on purpose. You bring the caterer, bar, and coordinator you trust, and the food is yours instead of a venue menu. The Commons has a full chef’s kitchen and an outdoor kitchen with a Santa Maria grill, and we will send you the vendors who already know the property.'],
          ['Can all our guests stay on site?', 'Yes. That is the point. Ten cabins sleep twenty-six: seven with a king bed for two, three suites that sleep four. Build the guest list to the cabins and nobody needs a hotel.'],
          ['What if our list is a little over twenty-six?', 'Tell us the real number. A few extra guests can join for the day and stay in Jewett or Groesbeck, fifteen minutes away. But the weekend works best when everyone who is there at midnight is also there at breakfast.'],
          ['What if it rains?', 'The Commons barn holds your reception either way, and a ceremony can move inside or under the pergola. Your coordinator will have a weather plan; we will walk it with them.'],
          ['Is there a music curfew?', 'Yes. We are on a lake with neighbors, so amplified music ends at a set hour. Ask us for the specifics and we will help you build the night around it. The fire pit has no curfew.'],
          ['Can we come see it first?', 'Please do. Tell us in the form and we will set up a visit. Better still, book a regular weekend in a cabin and see how the place feels when it is quiet.'],
          ['How far ahead should we book?', 'We host one wedding at a time and only a handful a year, so popular months go early. If you have a date in mind, ask now; if you are flexible, say so and we will show you what is open.'],
        ]}
        closing="Something else? Ask in the form below. A real person reads every one."
      />

      <Steps items={STANDARD_STEPS} />

      <Inquire
        eyebrow="Start here"
        title="Tell us about the two of you."
        intro="Your date, your guest list, and whatever you are picturing. We reply within two business days with availability, pricing, and honest answers."
      >
        <EventInquiryForm
          eventType="small_wedding"
          companyLabel="Partner's name"
          datesLabel="Wedding date, or the season *"
          datesPlaceholder='e.g. October 2027, or "spring, flexible"'
          groupLabel="Guest count *"
          detailsPlaceholder="What drew you here? What matters most about your celebration?"
          submitLabel="Send Inquiry"
          footnote="We host one wedding at a time and care about the fit as much as the booking. Pricing and availability come with your proposal."
        />
      </Inquire>
    </LandingShell>
  )
}
