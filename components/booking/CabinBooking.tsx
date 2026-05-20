'use client'

import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface CabinImages {
  familyCabin?: string | null
  traditionalCabin?: string | null
  entireProperty?: string | null
}

interface Props {
  images?: CabinImages
}

const CABIN_TYPES = [
  {
    id: 'family',
    imageKey: 'familyCabin' as keyof CabinImages,
    bookingUrl: 'https://booking.limestonefields.com/listings/489935',
    name: 'Family-Sized Cabin',
    sleeps: 4,
    layout: '1 bedroom · 1 bathroom',
    price: 'From $320 / night',
    features: [
      'King Bed + Full-Sized Bunk Beds',
      'Private Outdoor Cedar Soaking Tub',
      'Lake Views',
      'Individual HVAC',
      'Keyless Smart Lock Entry',
    ],
    description:
      'Our larger cabin layout — designed for couples or small families who want more room to spread out. Same quiet intention as the rest of the property, with a bit more space.',
    bg: 'bg-[#F9F4EE]',
  },
  {
    id: 'traditional',
    imageKey: 'traditionalCabin' as keyof CabinImages,
    bookingUrl: 'https://booking.limestonefields.com/listings/489934',
    name: 'Traditional Cabin',
    sleeps: 2,
    layout: '1 bedroom · 1 bathroom',
    price: 'From $250 / night',
    features: [
      'King Bed',
      'Private Outdoor Cedar Soaking Tub',
      'Lake Views',
      'Built-in Workstation',
      'Keyless Smart Lock Entry',
    ],
    description:
      'Our original cabin layout — pared back and thoughtfully designed. Everything you need to settle in and slow down. Nothing superfluous.',
    bg: 'bg-limestone-cream',
  },
  {
    id: 'property',
    imageKey: 'entireProperty' as keyof CabinImages,
    bookingUrl: 'https://booking.limestonefields.com/listings/489941',
    name: 'Entire Property',
    sleeps: 26,
    layout: '10 cabins · Barn commons',
    price: 'Inquire for pricing',
    features: [
      'All 10 Private Cabins',
      '1,200 sq ft Commons Barn',
      'Full Chef\'s Kitchen',
      '1,200 ft of Private Lakefront',
      'Working Permaculture Farm',
    ],
    description:
      'Reserve the entire property for your group. Ideal for family reunions, corporate retreats, or any gathering that deserves full privacy and space.',
    bg: 'bg-[#CBD2DA]',
  },
]

export default function CabinBooking({ images }: Props) {
  return (
    <div>
      {CABIN_TYPES.map((cabin) => {
        const imageUrl = images?.[cabin.imageKey]
        return (
          <section key={cabin.id} className={`${cabin.bg} py-20 md:py-28`}>
            <div className="container max-w-6xl mx-auto px-6">
              <div className="grid gap-12 md:gap-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">

                {/* Left — details */}
                <div className="space-y-6">
                  <div>
                    <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#253136]/50 mb-3">
                      {cabin.layout}
                    </p>
                    <h2 className="font-headline text-[32px] leading-[1.25] text-[#253136] mb-1">
                      {cabin.name}
                    </h2>
                    <p className="font-subhead text-[13px] tracking-[0.2em] uppercase text-[#253136]/60">
                      Sleeps {cabin.sleeps} · {cabin.price}
                    </p>
                  </div>
                  <p className="text-[18px] text-[#253136] leading-[1.55]">
                    {cabin.description}
                  </p>
                  <ul className="space-y-2">
                    {cabin.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-[17px] text-[#253136] leading-[1.55]">
                        <span className="mt-2 shrink-0 w-1 h-1 rounded-full bg-[#253136]/40 inline-block" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={cabin.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#253136]/90"
                  >
                    Check Availability
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </div>

                {/* Right — image */}
                <div className="relative aspect-[4/3] md:aspect-auto md:h-[480px] overflow-hidden rounded-lg bg-[#b3c1ce] md:mt-8">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={cabin.name}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  )}
                </div>

              </div>
            </div>
          </section>
        )
      })}

      {/* Bottom CTA — contact form */}
      <section className="py-24 md:py-36 bg-[#253136] text-center">
        <div className="container max-w-xl mx-auto px-6 space-y-6">
          <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#b3c1ce]/60">
            QUESTIONS?
          </p>
          <h2 className="font-headline text-[36px] leading-[1.25] text-[#f7f2e4]">
            We&apos;re here to help.
          </h2>
          <p className="font-body-secondary text-lg text-[#f7f2e4]/70 leading-relaxed">
            Not sure which cabin is right for you, or have questions about a specific stay?
            Reach out and we&apos;ll get back to you quickly.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-[78px] bg-[#f7f2e4] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#253136] transition hover:bg-[#e8e4dc]"
          >
            Get in Touch
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
