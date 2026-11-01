import type { Metadata } from 'next'
import Script from 'next/script'
import { OG_IMAGES, SITE_URL } from '@/lib/schema-constants'

const PAGE_URL = `${SITE_URL}/gift-cards`

export const metadata: Metadata = {
  title: 'Gift Cards',
  description:
    'Give a stay at Limestone Fields. Buy a gift card for a private lakefront cabin on Lake Limestone, Texas. Delivered by email, valid for five years.',
  openGraph: {
    images: OG_IMAGES,
    title: 'Gift Cards — Limestone Fields',
    description:
      'Give a stay at Limestone Fields. Gift cards are delivered by email and valid for five years.',
    url: PAGE_URL,
  },
  alternates: { canonical: PAGE_URL },
}

/** Gift Up account (Dashboard > Checkout code/link > All other websites). */
const GIFT_UP_SITE_ID = '58e2b110-6a4f-4a6c-86a9-fe36886327c7'

const GIFT_UP_LOADER = `(function (g, i, f, t, u, p, s) { g[u] = g[u] || function() { (g[u].q = g[u].q || []).push(arguments) }; p = i.createElement(f); p.async = 1; p.src = t; s = i.getElementsByTagName(f)[0]; s.parentNode.insertBefore(p, s); })(window, document, "script", "https://cdn.yourgift.cards/dist/gift-up.js", "giftup");`

export default function GiftCardsPage() {
  return (
    <>
      <section className="bg-limestone-cream pt-36 pb-12 md:pt-44 md:pb-16">
        <div className="container max-w-2xl mx-auto px-6 text-center">
          <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#253136]/60 mb-5">
            GIFT CARDS
          </p>
          <h1 className="font-headline text-[42px] md:text-[56px] leading-[1.15] text-[#253136] mb-6">
            Give a Stay at Limestone Fields
          </h1>
          <p className="font-body-secondary text-lg text-[#253136]/70 leading-relaxed">
            A gift card is delivered by email, ready to send or print. Choose an
            amount below, or enter your own.
          </p>
        </div>
      </section>

      <section className="bg-limestone-cream pb-16 md:pb-24">
        <div className="container max-w-2xl mx-auto px-6">
          <div
            className="gift-up-target"
            data-site-id={GIFT_UP_SITE_ID}
            data-platform="Other"
          />
          <Script id="gift-up-loader" strategy="afterInteractive">
            {GIFT_UP_LOADER}
          </Script>
        </div>
      </section>

      <section className="bg-limestone-cream pb-24 md:pb-32">
        <div className="container max-w-2xl mx-auto px-6 font-body-secondary text-[15px] text-[#253136]/70 leading-relaxed space-y-6">
          <div>
            <h2 className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#253136]/60 mb-3">
              HOW IT WORKS
            </h2>
            <p>
              Your gift card is emailed to you or directly to the person you are
              giving it to. It has a code on it. To use it, enter the code in
              the Gift Code field when you book, or email{' '}
              <a
                href="mailto:hello@limestonefields.com"
                className="underline underline-offset-2"
              >
                hello@limestonefields.com
              </a>{' '}
              and we will apply it to your reservation.
            </p>
          </div>
          <div>
            <h2 className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#253136]/60 mb-3">
              THE FINE PRINT
            </h2>
            <p>
              Gift cards are valid for five years from the date of issue and
              can be used toward stays and experiences at Limestone Fields. No
              fees reduce the balance. They are not redeemable for cash except
              where required by law, and lost or stolen codes cannot be
              replaced. Stays are subject to our{' '}
              <a href="/policies/terms" className="underline underline-offset-2">
                Terms and Conditions
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
