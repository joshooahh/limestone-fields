import type { Metadata } from 'next'
import CabinBooking from '@/components/booking/CabinBooking'

export const metadata: Metadata = {
  title: 'Book',
  description:
    'Check availability and book a private cabin at Limestone Fields on Lake Limestone, Texas. From $250/night. 2 hours from Austin, Dallas, and Houston.',
  openGraph: {
    title: 'Book a Cabin — Limestone Fields',
    description:
      'Check availability and reserve your cabin at Limestone Fields. Private lakefront cabins from $250/night.',
    url: 'https://limestonefields.com/book',
  },
  alternates: { canonical: 'https://limestonefields.com/book' },
}

export default function BookPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-limestone-cream pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="container max-w-2xl mx-auto px-6 text-center">
          <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#253136]/60 mb-5">
            RESERVATIONS
          </p>
          <h1 className="font-headline text-[42px] md:text-[56px] leading-[1.15] text-[#253136] mb-6">
            Choose Your Stay
          </h1>
          <p className="font-body-secondary text-lg text-[#253136]/70 leading-relaxed">
            Three ways to stay at Limestone Fields. Select a cabin type to check availability and book.
          </p>
        </div>
      </section>

      <CabinBooking />
    </>
  )
}
