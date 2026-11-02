import type { Metadata } from 'next'
import Image from 'next/image'
import NewsletterForm from '@/components/forms/NewsletterForm'
import { OG_IMAGES, SITE_URL } from '@/lib/schema-constants'

const PAGE_URL = `${SITE_URL}/newsletter`

export const metadata: Metadata = {
  title: 'Field Notes',
  description:
    'Field Notes is a short letter from Limestone Fields, a farm hotel on Lake Limestone in Jewett, Texas. About once a month, plus a note when dates open.',
  openGraph: {
    images: OG_IMAGES,
    title: 'Field Notes | Limestone Fields',
    description:
      'A short letter from the farm, about once a month, to read when you have a quiet minute.',
    url: PAGE_URL,
  },
  alternates: { canonical: PAGE_URL },
}

const ITEMS = [
  {
    title: 'On the land',
    body: 'What the Highland cattle, ducks and chickens are up to, what is growing in the 1-acre garden, and how the lake looks this month.',
    image: '/images/landing/garden.jpg',
    alt: 'Two people kneeling in the garden at Limestone Fields, looking at a young basil plant',
  },
  {
    title: 'Around the table',
    body: 'What we are cooking in the Commons and outside, on the Santa Maria grill, in the Gozney oven and over the offset smoker.',
    image: '/images/landing/grill.jpg',
    alt: 'Meat and greens cooking over a fire on the grill at Limestone Fields',
  },
  {
    title: 'When dates open',
    body: 'A short note, in between the monthly letters, when we have dates open to stay.',
    image: '/images/landing/lake-through-trees.jpg',
    alt: 'Lake Limestone seen through the trees from the shore',
  },
]

export default function NewsletterPage() {
  return (
    <>
      <section className="bg-limestone-cream pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-12 md:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-5 font-subhead text-[11px] uppercase tracking-[0.3em] text-[#253136]/60">
                A FARM HOTEL ON LAKE LIMESTONE, JEWETT TX
              </p>
              <h1 className="mb-6 font-headline text-[40px] leading-[1.15] text-[#253136] md:text-[52px]">
                Field Notes from Lake Limestone
              </h1>
              <p className="mb-10 max-w-md font-body-secondary text-lg leading-relaxed text-[#253136]/75">
                A short letter, about once a month, for a quiet minute with nowhere to be. It is a
                few notes on what the land is doing at Limestone Fields.
              </p>
              <div className="max-w-md">
                <NewsletterForm />
              </div>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-[4/5]">
              <Image
                src="/images/landing/cow-portrait.jpg"
                alt="A woman in a straw hat holds out her hand to a Highland cow in the shade of tall trees at Limestone Fields"
                fill
                priority
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover object-[52%_50%]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-limestone-peach py-16 md:py-24">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="mb-10 font-subhead text-[11px] uppercase tracking-[0.3em] text-[#253136]/60 md:mb-14">
            WHAT ARRIVES
          </h2>
          <ul className="grid gap-12 md:grid-cols-3 md:gap-10">
            {ITEMS.map((item) => (
              <li key={item.title}>
                <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <h3 className="mb-3 font-headline text-[26px] leading-[1.2] text-[#253136]">
                  {item.title}
                </h3>
                <p className="font-body-secondary text-[17px] leading-relaxed text-[#253136]/75">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
