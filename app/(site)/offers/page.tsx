import type { Metadata } from 'next'
import Link from 'next/link'
import { OG_IMAGES, SITE_URL } from '@/lib/schema-constants'
import { offers, offerBookingUrl } from '@/lib/offers'

const PAGE_URL = `${SITE_URL}/offers`

export const metadata: Metadata = {
  title: 'Offers',
  description:
    'Current offers and special rates at Limestone Fields, private lakefront cabins on Lake Limestone, Texas. Book direct for our best rates.',
  openGraph: {
    images: OG_IMAGES,
    title: 'Offers — Limestone Fields',
    description:
      'Current offers and special rates at Limestone Fields. Book direct for our best rates.',
    url: PAGE_URL,
  },
  alternates: { canonical: PAGE_URL },
}

const labelClass =
  'font-subhead text-[11px] tracking-[0.3em] uppercase text-[#253136]/60'

export default function OffersPage() {
  return (
    <>
      <section className="bg-limestone-cream pt-36 pb-12 md:pt-44 md:pb-16">
        <div className="container max-w-2xl mx-auto px-6 text-center">
          <p className={`${labelClass} mb-5`}>OFFERS</p>
          <h1 className="font-headline text-[42px] md:text-[56px] leading-[1.15] text-[#253136] mb-6">
            A Few Good Reasons to Come
          </h1>
          <p className="font-body-secondary text-lg text-[#253136]/70 leading-relaxed">
            Our current offers and special rates. Each one is booked directly
            with us, which is always where you will find our best rate.
          </p>
        </div>
      </section>

      <section className="bg-limestone-cream pb-20 md:pb-28">
        <div className="container max-w-2xl mx-auto px-6">
          {offers.map((offer) => (
            <article
              key={offer.slug}
              id={offer.slug}
              className="scroll-mt-32 border-t border-[#253136]/20 last:border-b py-10 md:py-12 text-center"
            >
              <h2 className="font-headline text-[30px] md:text-[36px] leading-[1.2] text-[#253136] mb-4">
                {offer.name}
              </h2>
              <p className="font-body-secondary text-[17px] text-[#253136]/75 leading-relaxed max-w-xl mx-auto">
                {offer.description}
              </p>
              {(offer.eligibility || offer.bookBy || offer.stayBy) && (
                <p className="font-body-secondary text-[14px] text-[#253136]/60 leading-relaxed mt-4">
                  {[
                    offer.eligibility,
                    offer.bookBy && `Book by ${offer.bookBy}.`,
                    offer.stayBy && `Stay by ${offer.stayBy}.`,
                  ]
                    .filter(Boolean)
                    .join(' ')}
                </p>
              )}
              <a
                href={offerBookingUrl(offer.promoCode)}
                target="_blank"
                rel="noopener"
                className="mt-7 inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-3 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#f7f2e4] transition hover:bg-[#253136]/85"
              >
                Book This Rate
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-limestone-cream pb-24 md:pb-32">
        <div className="container max-w-2xl mx-auto px-6 font-body-secondary text-[15px] text-[#253136]/70 leading-relaxed space-y-6">
          <div>
            <h2 className={`${labelClass} mb-3`}>HOW IT WORKS</h2>
            <p>
              Each button opens our booking page with that rate already
              applied. Choose your dates and cabin and you will see the rate
              before you pay. If something does not look right, email{' '}
              <a
                href="mailto:hello@limestonefields.com"
                className="underline underline-offset-2"
              >
                hello@limestonefields.com
              </a>{' '}
              and we will sort it out.
            </p>
          </div>
          <div>
            <h2 className={`${labelClass} mb-3`}>THE FINE PRINT</h2>
            <p>
              Offers are subject to availability and cannot be combined with
              each other. We may ask for proof of eligibility at check-in.
              Stays are subject to our{' '}
              <a href="/policies/terms" className="underline underline-offset-2">
                Terms and Conditions
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[#253136] text-center">
        <div className="container max-w-2xl mx-auto px-6">
          <p className="font-headline text-[28px] md:text-[34px] leading-[1.25] text-[#f7f2e4] mb-8">
            Giving a stay instead of taking one?
          </p>
          <Link
            href="/gift-cards"
            className="inline-flex items-center justify-center rounded-[78px] bg-[#f7f2e4] px-8 py-3 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#253136] transition hover:bg-[#f7e7d5]"
          >
            Gift Cards
          </Link>
        </div>
      </section>
    </>
  )
}
