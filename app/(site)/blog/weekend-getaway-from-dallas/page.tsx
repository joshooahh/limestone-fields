import type { Metadata } from 'next'
import type { Image as SanityImage } from 'sanity'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { propertyImagesQuery } from '@/sanity/queries'
import { imgUrl } from '@/lib/sanity-image'
import JsonLd from '@/components/seo/JsonLd'
import BlogBreadcrumb from '@/components/blog/BlogBreadcrumb'
import BlogFigure from '@/components/blog/BlogFigure'
import BlogToc from '@/components/blog/BlogToc'
import BlogFaqAccordion from '@/components/blog/BlogFaqAccordion'
import BlogClosingCta from '@/components/blog/BlogClosingCta'
import BlogProse from '@/components/blog/BlogProse'

const CANONICAL = 'https://limestonefields.com/blog/weekend-getaway-from-dallas'

type PropertyImages = {
  heroImage?: SanityImage | null
  lakeImages?: SanityImage[] | null
  landImages?: SanityImage[] | null
  farmImages?: SanityImage[] | null
}

async function getImages() {
  const raw = await client.fetch<PropertyImages | null>(propertyImagesQuery).catch(() => null)
  return {
    featured: imgUrl(raw?.heroImage, 1600),
    morning: imgUrl(raw?.lakeImages?.[0], 1400),
    evening: imgUrl(raw?.landImages?.[0] ?? raw?.farmImages?.[0], 1400),
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const { featured } = await getImages()
  return {
    title: { absolute: 'Weekend Getaway From Dallas | Limestone Fields' },
    description:
      'A weekend getaway from Dallas that feels like rest. Ten lakefront cabins on 16 acres at Lake Limestone, two hours south. Check availability and book.',
    alternates: { canonical: CANONICAL },
    openGraph: {
      type: 'article',
      title: 'Weekend Getaway From Dallas | Limestone Fields',
      description:
        'Ten lakefront cabins on 16 acres at Lake Limestone, two hours south of Dallas. A weekend that actually feels like rest.',
      url: CANONICAL,
      images: featured ? [{ url: featured, width: 1600, height: 900 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Weekend Getaway From Dallas | Limestone Fields',
      description: 'Ten lakefront cabins on 16 acres at Lake Limestone, two hours south of Dallas.',
      images: featured ? [featured] : [],
    },
  }
}

const toc = [
  { id: 'how-far', label: 'How far is Lake Limestone from Dallas?' },
  { id: 'why-here', label: 'Why choose a lakefront cabin over another weekend trip?' },
  { id: 'cabins', label: 'The cabins: designed for presence' },
  { id: 'do', label: 'What a weekend actually looks like' },
  { id: 'nearby', label: "What's nearby — and what isn't" },
  { id: 'plan', label: 'Planning your weekend' },
  { id: 'faq', label: 'Frequently asked questions' },
]

const faqs = [
  {
    question: 'How far is Limestone Fields from Dallas?',
    answer:
      'Limestone Fields sits at Lake Limestone in Jewett, Texas, about a two-hour drive south of Dallas down I-45. It is roughly the same distance from Austin and Houston, which makes it an easy meeting point for a weekend with people coming from different cities.',
  },
  {
    question: 'What is there to do on a weekend getaway from Dallas at Lake Limestone?',
    answer:
      'As little or as much as you like. Guests walk the 16 acres, sit by the lake, soak, gather at the fire pits, and spend time on the working farm. The days are unprogrammed on purpose. The land sets the rhythm and you follow it.',
  },
  {
    question: 'Do the cabins have Wi-Fi and TVs?',
    answer:
      'The cabins have no televisions by design. The point of the property is presence, not screens. Cell service is available if you need it, but most guests find they reach for their phone far less than they expected within the first evening.',
  },
  {
    question: 'How many people can stay at Limestone Fields?',
    answer:
      'There are ten private cabins across the property in two layouts. Couples and solo travelers book a single cabin; friend groups and families book several. The whole property can also be reserved as a buyout for a private weekend.',
  },
  {
    question: 'When is the best time to visit for a weekend getaway?',
    answer:
      'Spring and fall bring the mildest weather and the fullest farm. Summer mornings and evenings on the lake are the quiet reward for the midday heat. Winter is still and clear. Weekends book first, so reserve a few weeks ahead.',
  },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Weekend Getaway From Dallas: Lakefront Cabins Two Hours South',
    description:
      'A weekend getaway from Dallas that actually feels like rest. Ten lakefront cabins on 16 acres at Lake Limestone, two hours south.',
    image: 'https://limestonefields.com/blog/images/weekend-getaway-from-dallas.jpg',
    author: { '@type': 'Organization', name: 'Limestone Fields', url: 'https://limestonefields.com/story' },
    publisher: {
      '@type': 'Organization',
      name: 'Limestone Fields',
      logo: { '@type': 'ImageObject', url: 'https://limestonefields.com/logos/primary/logo-light.svg' },
    },
    datePublished: '2026-07-07',
    dateModified: '2026-07-07',
    mainEntityOfPage: CANONICAL,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://limestonefields.com/' },
      { '@type': 'ListItem', position: 2, name: 'Journal', item: 'https://limestonefields.com/blog' },
      { '@type': 'ListItem', position: 3, name: 'Weekend Getaway From Dallas', item: CANONICAL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: 'Limestone Fields',
    description:
      'Ten custom-built lakefront cabins on 16 acres at Lake Limestone, Texas. A creative retreat and event venue for rest and reflection, two hours from Austin, Dallas, and Houston.',
    url: 'https://limestonefields.com/',
    telephone: '+1-254-265-6258',
    image: 'https://limestonefields.com/blog/images/weekend-getaway-from-dallas.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '159 LCR 890',
      addressLocality: 'Jewett',
      addressRegion: 'TX',
      postalCode: '75846',
      addressCountry: 'US',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Lakefront', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Soaking tubs', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Fire pits', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Working farm', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'No televisions', value: true },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  },
]

export default async function WeekendGetawayFromDallasPage() {
  const { featured, morning, evening } = await getImages()

  return (
    <>
      <JsonLd data={jsonLd} />

      <article className="bg-limestone-cream">
        <div className="pt-32 md:pt-40 pb-16 md:pb-20">
          <div className="container max-w-2xl mx-auto px-6 space-y-6">
            <BlogBreadcrumb current="Weekend Getaway From Dallas" />

            <div className="space-y-4">
              <p className="font-subhead text-[11px] tracking-[0.25em] uppercase text-[#253136]/50">
                Getaways
              </p>
              <h1 className="font-headline text-[36px] md:text-[48px] leading-[1.15] text-[#253136]">
                Weekend Getaway From Dallas: Lakefront Cabins Two Hours South
              </h1>
              <p className="font-subhead text-[12px] tracking-[0.15em] uppercase text-[#253136]/45">
                Last updated July 7, 2026 · Limestone Fields
              </p>
            </div>

            <BlogFigure
              src={featured}
              alt="Weekend getaway from Dallas — sunrise over lakefront cabins at Lake Limestone, Texas"
              aspect="aspect-[16/9]"
              priority
            />

            <BlogProse>
              <p>
                A weekend getaway from Dallas does not have to mean an airport, a five-hour
                drive, or a packed itinerary. Two hours south, at Lake Limestone, ten cabins sit
                lightly across 16 acres of Texas countryside. You can be checked in before the
                afternoon is over. Mornings unfold slowly here. Evenings quiet down on their own.
                This is a place shaped by land and time, close enough to home that the trip is
                the rest — not a project you have to recover from.
              </p>
              <p>
                <Link href="/book?utm_source=blog&utm_medium=cta&utm_campaign=weekend-getaways-location&utm_content=weekend-getaway-from-dallas">
                  Check availability and book your stay →
                </Link>
              </p>
            </BlogProse>

            <BlogToc items={toc} />

            <BlogProse>
              <h2 id="how-far">How far is Lake Limestone from Dallas?</h2>
              <p>
                Limestone Fields is in Jewett, Texas, a straight shot down I-45 and about two
                hours from downtown Dallas. It sits at almost the same distance from Austin and
                Houston, which is part of the appeal: if your people are scattered across the
                state, this is where the drive times meet. You leave after work on Friday and
                the sky is still going down over the lake when you arrive.
              </p>
              <p>
                The land itself is the reason to make the drive. Sixteen acres on Lake Limestone,
                ten cabins, a working farm, and a lot of open sky that nobody built anything in
                front of. The 16 acres could have become something else. They stayed land.
              </p>

              <BlogFigure
                src={morning}
                alt="Morning light over Lake Limestone, a two-hour weekend getaway from Dallas"
                caption="Morning on Lake Limestone, about two hours south of Dallas."
              />

              <h2 id="why-here">Why choose a lakefront cabin over another weekend trip?</h2>
              <p>
                Most weekends away end up feeling like more work. A city break means crowds and
                reservations. A resort means noise and a schedule. A long flight means you spend
                the first day recovering from the travel. A weekend getaway from Dallas to Lake
                Limestone is the opposite of all of that. There is nothing to line up, nowhere
                you have to be, and no screen asking for your attention.
              </p>
              <p>
                Instead there is a soaking tub, a fire pit, a lake, and time that finally moves
                at your pace. Guests come for a night and start planning the next visit before
                they leave. That is the whole idea behind the property —{' '}
                <Link href="/experience?utm_source=blog&utm_medium=cta&utm_campaign=weekend-getaways-location&utm_content=weekend-getaway-from-dallas">
                  the experience is intentionally unprogrammed
                </Link>
                , and the land does most of the work.
              </p>

              <h2 id="cabins">The cabins: designed for presence</h2>
              <p>
                Ten private cabins sit across the 16 acres, in two simple layouts. Natural
                materials. Quiet interiors. Generous windows that pull the lake and the fields
                inside. There are no televisions — that is on purpose. Every cabin is built to
                support rest and focus rather than performance, so comfort feels intuitive and
                the pace stays unhurried.
              </p>
              <p>
                Only ten cabins exist here, and that was a deliberate choice. The property could
                have held far more. Keeping it small means that when you are here, it feels like
                the land is yours. You can read what the cabins are like and reserve one on the{' '}
                <Link href="/stay?utm_source=blog&utm_medium=cta&utm_campaign=weekend-getaways-location&utm_content=weekend-getaway-from-dallas">
                  stay page
                </Link>
                .
              </p>

              <h2 id="do">What a weekend actually looks like</h2>
              <p>
                Life at Limestone Fields is scheduled by the sun. You wake up when the light
                comes in. Coffee on the porch, cool air, the birds louder than anything else. The
                working farm is there for quiet participation — collect eggs, walk the rows, meet
                the highland cows, pick what is ripe and cook it that night in the shared barn
                kitchen. Afternoons drift toward the lake or a book. Evenings end at the fire
                pit, or in a soaking tub while the sky changes.
              </p>
              <p>
                Nothing is required. The shared spaces invite connection without expectation, and
                the rest of the time is yours. Most guests describe the same thing afterward: they
                actually slept, and they actually thought.
              </p>

              <BlogFigure
                src={evening}
                alt="Fire pit at dusk on a weekend getaway from Dallas at Limestone Fields"
              />

              <h2 id="nearby">What&apos;s nearby — and what isn&apos;t</h2>
              <p>
                The honest answer is that the property is the destination. There is no strip of
                shops to work through and no list of attractions you have to check off, and that
                is the point. What is nearby is quiet water and open country. Lake Limestone sits
                right at the edge of the 16 acres, and the wider stretch of central Texas around
                Jewett is farm roads, small towns, and big sky rather than traffic.
              </p>
              <p>
                If you do want to venture out for an afternoon, a few things are within reach.{' '}
                <a
                  href="https://tpwd.texas.gov/state-parks/fort-parker"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fort Parker State Park
                </a>{' '}
                near Mexia has trails and its own quiet lake. The surrounding towns are worth a
                slow pass for a diner breakfast or a farm stand. But most guests find they never
                leave. The soaking tub, the fire pit, the farm, and the lake tend to be enough,
                and the drive back to Dallas is short enough that leaving never feels urgent.
              </p>

              <h2 id="plan">Planning your weekend</h2>
              <p>
                Pack light and plan less. Bring layers for the evenings, something to read, and
                a little of what you would want to cook — though the garden and farm will handle
                a good part of dinner in season. Weekends fill first, especially spring and fall,
                so book a few weeks out. If you want the entire property to yourselves for a
                birthday, a reunion, or a small group, look at{' '}
                <Link href="/buyouts?utm_source=blog&utm_medium=cta&utm_campaign=weekend-getaways-location&utm_content=weekend-getaway-from-dallas">
                  the buyout option
                </Link>
                . Coming to focus rather than to gather? See the{' '}
                <Link href="/blog/deep-work-retreat">deep work retreat guide</Link>.
              </p>
              <p>
                For the drive itself, Google Maps has the current route down I-45; if you want to
                add a stop,{' '}
                <a
                  href="https://tpwd.texas.gov/state-parks/fort-parker"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Fort Parker State Park
                </a>{' '}
                near Mexia is close by, and{' '}
                <a href="https://www.traveltexas.com/" target="_blank" rel="noopener noreferrer">
                  Travel Texas
                </a>{' '}
                lists small towns worth a slow pass on the way.
              </p>

              <p>
                <strong>Ready for the weekend you actually need?</strong>
                <br />
                <Link href="/book?utm_source=blog&utm_medium=cta&utm_campaign=weekend-getaways-location&utm_content=weekend-getaway-from-dallas">
                  Check availability and book your stay at Limestone Fields →
                </Link>
              </p>
            </BlogProse>

            <BlogFaqAccordion faqs={faqs} />
          </div>
        </div>

        <BlogClosingCta
          eyebrow="Ready for the weekend you need"
          heading="Check availability and book your stay."
          href="/book?utm_source=blog&utm_medium=cta&utm_campaign=weekend-getaways-location&utm_content=weekend-getaway-from-dallas"
          label="Check Availability"
          secondaryHref="/contact"
          secondaryLabel="Get in Touch"
        />
      </article>
    </>
  )
}
