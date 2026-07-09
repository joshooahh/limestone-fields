import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import BlogBreadcrumb from '@/components/blog/BlogBreadcrumb'
import BlogFigure from '@/components/blog/BlogFigure'
import BlogToc from '@/components/blog/BlogToc'
import BlogFaqAccordion from '@/components/blog/BlogFaqAccordion'
import BlogClosingCta from '@/components/blog/BlogClosingCta'
import BlogProse from '@/components/blog/BlogProse'

const CANONICAL = 'https://limestonefields.com/blog/intimate-wedding-venues-texas'

const FEATURED_IMAGE = '/images/blog/wedding-hero.jpg'
const INLINE_IMAGE = '/images/blog/wedding-inline.jpg'

export const metadata: Metadata = {
  title: { absolute: 'Intimate Wedding Venues in Texas | Limestone Fields' },
  description:
    'Intimate wedding venues in Texas where everyone stays the weekend. One event at a time on Lake Limestone, full property yours. See dates and inquire.',
  alternates: { canonical: CANONICAL },
  openGraph: {
    type: 'article',
    title: 'Intimate Wedding Venues in Texas | Limestone Fields',
    description:
      'A lakefront wedding where everyone stays the weekend. One event at a time on 16 acres at Lake Limestone, the full property yours.',
    url: CANONICAL,
    images: [{ url: FEATURED_IMAGE, width: 1600, height: 900 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intimate Wedding Venues in Texas | Limestone Fields',
    description: 'A lakefront wedding where everyone stays the weekend. One event at a time, the full property yours.',
    images: [FEATURED_IMAGE],
  },
}

const toc = [
  { id: 'why-intimate', label: 'Why choose an intimate wedding?' },
  { id: 'everyone-stays', label: 'What makes a venue where everyone stays different?' },
  { id: 'property', label: 'The property: lake, barn, and cabins' },
  { id: 'weekend', label: 'Your wedding as a weekend' },
  { id: 'decorating', label: 'What "the land does the decorating" means' },
  { id: 'plan', label: 'Planning and booking' },
  { id: 'faq', label: 'Frequently asked questions' },
]

const faqs = [
  {
    question: 'What makes Limestone Fields an intimate wedding venue?',
    answer:
      'Limestone Fields hosts one event at a time, so the full 16-acre property on Lake Limestone is yours for the weekend. With a lakefront ceremony site, a shared barn, and ten cabins on site, your closest people can celebrate and stay in one place rather than scattering to hotels.',
  },
  {
    question: 'Can wedding guests stay overnight at the venue?',
    answer:
      'Yes. Ten private cabins sit across the property, so your inner circle stays where you celebrate. A full-property buyout turns the wedding into a weekend — a welcome the night before, the ceremony and dinner, and a slow morning after, all in one place.',
  },
  {
    question: 'How many guests can an intimate wedding here hold?',
    answer:
      'The property is designed for intimate weddings and private gatherings rather than large productions. The ten cabins host your closest guests overnight, and the lakefront and barn hold your ceremony and celebration. Share your guest count and date through the contact form and we will confirm the fit.',
  },
  {
    question: 'Where is the wedding venue located?',
    answer:
      'Limestone Fields is at Lake Limestone in Jewett, Texas, about two hours from Austin, Dallas, and Houston. That central position makes it an easy drive for guests coming from anywhere in the state, without anyone needing to fly.',
  },
  {
    question: 'How far ahead should we book our wedding?',
    answer:
      'Because only one event is hosted at a time, wedding weekends are limited and book well in advance, especially in spring and fall. Reach out as soon as you have a season in mind, and we will walk you through available dates and the buyout.',
  },
]

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'Intimate Wedding Venues in Texas: A Lakefront Weekend Where Everyone Stays',
    description:
      'Intimate wedding venues in Texas where everyone stays the weekend. One event at a time on Lake Limestone, the full property yours.',
    image: 'https://limestonefields.com/blog/images/intimate-wedding-venues-texas.jpg',
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
      { '@type': 'ListItem', position: 3, name: 'Intimate Wedding Venues in Texas', item: CANONICAL },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: 'Limestone Fields',
    description:
      'An intimate lakefront wedding venue on 16 acres at Lake Limestone, Texas. One event at a time with a full-property buyout and on-site lodging in ten cabins, two hours from Austin, Dallas, and Houston.',
    url: 'https://limestonefields.com/weddings',
    telephone: '+1-254-265-6258',
    image: 'https://limestonefields.com/blog/images/intimate-wedding-venues-texas.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '159 LCR 890',
      addressLocality: 'Jewett',
      addressRegion: 'TX',
      postalCode: '75846',
      addressCountry: 'US',
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: 'Lakefront ceremony site', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'On-site lodging (ten cabins)', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Full-property buyout', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'Shared barn and communal kitchen', value: true },
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

export default function IntimateWeddingVenuesTexasPage() {
  return (
    <>
      <JsonLd data={jsonLd} />

      <article className="bg-limestone-cream">
        <div className="pt-32 md:pt-40 pb-16 md:pb-20">
          <div className="container max-w-2xl mx-auto px-6 space-y-6">
            <BlogBreadcrumb current="Intimate Wedding Venues in Texas" />

            <div className="space-y-4">
              <p className="font-subhead text-[11px] tracking-[0.25em] uppercase text-[#253136]/50">
                Weddings
              </p>
              <h1 className="font-headline text-[36px] md:text-[48px] leading-[1.15] text-[#253136]">
                Intimate Wedding Venues in Texas: A Lakefront Weekend Where Everyone Stays
              </h1>
              <p className="font-subhead text-[12px] tracking-[0.15em] uppercase text-[#253136]/45">
                Last updated July 7, 2026 · Limestone Fields
              </p>
            </div>

            <BlogFigure
              src={FEATURED_IMAGE}
              alt="Intimate wedding venues in Texas — the still lakefront at Limestone Fields, with cabins visible across the water"
              aspect="aspect-[16/9]"
              priority
            />

            <BlogProse>
              <p>
                Most intimate wedding venues in Texas hand you a few hours and a hard stop.
                Limestone Fields gives you the whole weekend and the whole property. We host one
                event at a time, so the full 16 acres on Lake Limestone are yours — a lakefront
                ceremony, a shared barn for the celebration, and ten cabins where your closest
                people stay the night instead of scattering to hotels. It is a wedding you get to
                actually be present for, two hours from Austin, Dallas, and Houston, where the
                land does most of the decorating.
              </p>
              <p>
                <Link href="/weddings?utm_source=blog&utm_medium=cta&utm_campaign=weddings&utm_content=intimate-wedding-venues-texas">
                  See the wedding details and inquire about your date →
                </Link>
              </p>
            </BlogProse>

            <BlogToc items={toc} />

            <BlogProse>
              <h2 id="why-intimate">Why choose an intimate wedding?</h2>
              <p>
                Smaller weddings keep growing in popularity for a simple reason: they let you
                spend real time with the people who matter most instead of managing a crowd. The
                trend toward micro weddings and multi-day celebrations has held steady in the
                years since 2020, as couples trade the big production for something closer and
                more personal. An intimate wedding is not a compromise. It is a choice to make
                the day about presence rather than scale.
              </p>
              <p>
                Limestone Fields was built around that same idea. The property hosts intimate
                weddings and private gatherings, not large productions — the point is that your
                people, the lake, and the land carry the day.
              </p>

              <h2 id="everyone-stays">What makes a venue where everyone stays different?</h2>
              <p>
                At most venues, the celebration ends and everyone drives off to separate hotels.
                The night is over the moment the reception is. A venue with on-site lodging
                changes the whole shape of the weekend. Here, your closest guests stay in the ten
                cabins across the property, so the celebration does not stop at the end of the
                reception — it carries into a fire-pit conversation, a slow breakfast, one more
                morning together before everyone goes home. The wedding becomes a weekend, and
                the weekend is what people remember.
              </p>
              <p>
                You can see how the full-property wedding works on the{' '}
                <Link href="/weddings?utm_source=blog&utm_medium=cta&utm_campaign=weddings&utm_content=intimate-wedding-venues-texas">
                  weddings page
                </Link>
                , and the group-stay logistics on the{' '}
                <Link href="/blog/corporate-retreat-venues-texas">
                  whole-property buyout guide
                </Link>
                .
              </p>

              <BlogFigure
                src={INLINE_IMAGE}
                alt="Cabins with private cedar soaking tubs at an intimate wedding venue in Texas, Limestone Fields on Lake Limestone"
                caption="On-site lodging means the celebration doesn't end when the reception does."
              />

              <h2 id="property">The property: lake, barn, and cabins</h2>
              <p>
                The ceremony happens at the lakefront, with the water and open sky as the
                backdrop. The shared barn and communal kitchen anchor the celebration — dinner,
                dancing, the toast that runs long. Fire pits hold the after-hours. And ten
                private cabins, in two quiet layouts with natural materials and generous windows,
                give your family and closest friends a place to stay on site. Because we host one
                event at a time, the whole 16 acres are reserved for you alone through the
                full-property buyout.
              </p>
              <p>
                See the grounds and gathering spaces on the{' '}
                <Link href="/private-events?utm_source=blog&utm_medium=cta&utm_campaign=weddings&utm_content=intimate-wedding-venues-texas">
                  private events page
                </Link>
                .
              </p>

              <h2 id="weekend">Your wedding as a weekend</h2>
              <p>
                Picture it as three unhurried days. Friday, everyone arrives, settles into their
                cabins, and gathers at the barn for a welcome dinner. Saturday, the ceremony at
                the lake, dinner from the communal kitchen, the celebration by the fire. Sunday, a
                slow morning with coffee on the porches before anyone has to leave. No shuttles,
                no scattering, no rushing the best hours of the day. Just your people, in one
                place, for a whole weekend.
              </p>

              <h2 id="decorating">What &quot;the land does the decorating&quot; means</h2>
              <p>
                At a lakefront property, the setting is already the design. The water, the open
                fields, the light coming down over the 16 acres — that is the backdrop, and it
                does not need much added to it. For couples, that changes both the feeling and
                the planning. An intimate wedding here leans on the place rather than on
                truckloads of rented décor, which keeps the day feeling like itself instead of
                like a production.
              </p>
              <p>
                It also simplifies the logistics. With a lakefront ceremony site, a barn for
                dinner, fire pits for the evening, and cabins a short walk away, most of the
                wedding lives within one set of grounds. Fewer moving parts, fewer vendors
                shuttling between locations, and more of your attention left for the people who
                came. The land carries the beauty so you can carry the day.
              </p>

              <h2 id="plan">Planning and booking</h2>
              <p>
                Start with your season and your guest count, then reach out early — because only
                one event is hosted at a time, wedding weekends are limited and spring and fall
                dates go first. From there we will walk you through the lakefront ceremony site,
                the barn, cabin lodging, and the buyout. For broader planning, resources like{' '}
                <a
                  href="https://www.theknot.com/content/micro-wedding-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  The Knot&apos;s micro-wedding guide
                </a>{' '}
                and{' '}
                <a href="https://www.brides.com/" target="_blank" rel="noopener noreferrer">
                  Brides
                </a>{' '}
                are useful as you shape the weekend.
              </p>

              <p>
                <strong>Planning a wedding your people actually get to be present for?</strong>
                <br />
                <Link href="/contact?utm_source=blog&utm_medium=cta&utm_campaign=weddings&utm_content=intimate-wedding-venues-texas">
                  Inquire about your wedding date at Limestone Fields →
                </Link>
              </p>
            </BlogProse>

            <BlogFaqAccordion faqs={faqs} />
          </div>
        </div>

        <BlogClosingCta
          eyebrow="A wedding you're present for"
          heading="Inquire about your wedding date."
          href="/contact?utm_source=blog&utm_medium=cta&utm_campaign=weddings&utm_content=intimate-wedding-venues-texas"
          label="Inquire Now"
          secondaryHref="/weddings"
          secondaryLabel="See Wedding Details"
        />
      </article>
    </>
  )
}
