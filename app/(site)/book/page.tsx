import type { Metadata } from 'next'
import Link from 'next/link'
import CabinSelector from '@/components/booking/CabinSelector'
import { ArrowRight } from 'lucide-react'

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
            Check Availability
          </h1>
          <p className="font-body-secondary text-lg text-[#253136]/70 leading-relaxed">
            Select your dates below to see availability and book your stay.
            Questions? <Link href="/contact" className="underline underline-offset-4 hover:text-[#253136] transition-colors">Reach out directly.</Link>
          </p>
        </div>
      </section>

      {/* Calendar widget */}
      <section className="bg-limestone-cream pb-24 md:pb-36">
        <div className="container max-w-4xl mx-auto px-6">
          <CabinSelector />
        </div>
      </section>

      {/* What's included */}
      <section className="py-24 md:py-32 bg-[#CBD2DA]">
        <div className="container max-w-6xl mx-auto px-6 grid gap-12 md:gap-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
          <div className="space-y-5">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              EVERY STAY INCLUDES
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              Private. Quiet. Complete.
            </h2>
            <ul className="space-y-3 text-[18px] text-[#253136] leading-[1.55]">
              <li>Private Cabin with Lake or Land Views</li>
              <li>Outdoor Cedar Soaking Tub</li>
              <li>Fresh Linens and Towels</li>
              <li>Access to the Shared Barn Kitchen</li>
              <li>Fire Pits and Outdoor Gathering Areas</li>
              <li>Keyless Smart Lock Entry</li>
            </ul>
          </div>
          <div className="space-y-5 md:pt-16">
            <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
              GOOD TO KNOW
            </p>
            <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136]">
              Before You Book
            </h2>
            <ul className="space-y-3 text-[18px] text-[#253136] leading-[1.55]">
              <li>Check-in: 4:00 PM</li>
              <li>Check-out: 11:00 AM</li>
              <li>50% deposit due at booking</li>
              <li>Balance due 30 days before arrival</li>
              <li>No pets. No smoking.</li>
            </ul>
            <Link
              href="/stay"
              className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#253136]/90"
            >
              View Cabin Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Questions CTA */}
      <section className="py-24 md:py-36 bg-limestone-cream text-center">
        <div className="container max-w-xl mx-auto px-6 space-y-6">
          <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#253136]/60">
            QUESTIONS?
          </p>
          <h2 className="font-headline text-[36px] leading-[1.25] text-[#253136]">
            We&apos;re here to help.
          </h2>
          <p className="font-body-secondary text-lg text-[#253136]/70 leading-relaxed">
            If you have questions about the property, the cabins, or a specific stay,
            reach out and we&apos;ll get back to you quickly.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#253136]/90"
          >
            Get in Touch
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
