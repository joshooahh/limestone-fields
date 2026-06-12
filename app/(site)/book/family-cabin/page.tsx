import type { Metadata } from 'next'
import type { Image as SanityImage } from 'sanity'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { urlForImage } from '@/sanity/lib/image'
import { bookingImagesQuery } from '@/sanity/queries'

export const metadata: Metadata = {
  title: 'Cabin Suite — Limestone Fields',
  description:
    'Our larger cabin layout. King bed, full-sized bunk beds, private cedar soaking tub, and lake views. Sleeps 4 at Lake Limestone, TX.',
  openGraph: {
    title: 'Cabin Suite — Limestone Fields',
    description:
      'Designed for couples or small families. King bed, full-sized bunk beds, private outdoor cedar soaking tub, lake views.',
    url: 'https://limestonefields.com/book/family-cabin',
  },
  alternates: { canonical: 'https://limestonefields.com/book/family-cabin' },
}

const FEATURES = [
  'King Bed + Full-Sized Bunk Beds',
  'Private Outdoor Cedar Soaking Tub',
  'Lake Views',
  'Individual HVAC',
  'Keyless Smart Lock Entry',
]

const INCLUDED = [
  'Linens, towels, and bath amenities',
  'Access to the 1,200 sq ft Commons Barn',
  'Full chef\'s kitchen access',
  'Outdoor kitchen and Santa Maria grill',
  '1,200 ft of private lakefront',
  'Walking paths and open land',
  'Working permaculture farm',
]

type BookingImages = {
  familyCabin?: SanityImage | null
}

export default async function FamilyCabinPage() {
  const raw = await client.fetch<BookingImages | null>(bookingImagesQuery).catch(() => null)
  const imageUrl = raw?.familyCabin?.asset
    ? urlForImage(raw.familyCabin).width(1200).auto('format').url()
    : null

  return (
    <>
      {/* Header */}
      <section className="bg-[#F9F4EE] pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="container max-w-2xl mx-auto px-6 text-center">
          <Link
            href="/book"
            className="inline-flex items-center gap-1.5 font-subhead text-[11px] tracking-[0.3em] uppercase text-[#253136]/50 mb-5 hover:text-[#253136]/70 transition"
          >
            ← All Cabin Types
          </Link>
          <h1 className="font-headline text-[42px] md:text-[56px] leading-[1.15] text-[#253136] mb-4">
            Cabin Suite
          </h1>
          <p className="font-subhead text-[13px] tracking-[0.2em] uppercase text-[#253136]/60">
            Sleeps 4 · 1 Bedroom · 1 Bathroom
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="bg-[#F9F4EE] py-16 md:py-24 border-t border-[#253136]/10">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid gap-12 md:gap-20 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">

            {/* Left — details */}
            <div className="space-y-8">
              <p className="text-[18px] text-[#253136] leading-[1.6]">
                Our larger cabin layout — designed for couples or small families who want more room
                to spread out. A king bed and two full beds for kids or extra guests, a private
                outdoor cedar soaking tub, and lake views. Same quiet intention as the rest of the
                property, with a bit more space.
              </p>

              <div>
                <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#253136]/50 mb-4">
                  CABIN FEATURES
                </p>
                <ul className="space-y-2.5">
                  {FEATURES.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-[17px] text-[#253136] leading-[1.55]">
                      <span className="mt-2.5 shrink-0 w-1 h-1 rounded-full bg-[#253136]/40 inline-block" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#253136]/50 mb-4">
                  INCLUDED WITH EVERY STAY
                </p>
                <ul className="space-y-2.5">
                  {INCLUDED.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[17px] text-[#253136] leading-[1.55]">
                      <span className="mt-2.5 shrink-0 w-1 h-1 rounded-full bg-[#253136]/40 inline-block" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 space-y-4">
                <a
                  href="https://booking.limestonefields.com/listings/489935"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-3 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#253136]/90"
                >
                  Check Availability
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
                <p className="text-[14px] text-[#253136]/50 font-body-secondary italic">
                  If your preferred dates aren&apos;t available, other cabin suites may be open —{' '}
                  <Link href="/contact" className="underline underline-offset-2 hover:text-[#253136]/70 transition">
                    reach out and we&apos;ll help
                  </Link>.
                </p>
              </div>
            </div>

            {/* Right — image */}
            <div className="relative aspect-[3/4] md:aspect-auto md:h-[600px] overflow-hidden rounded-lg bg-[#b3c1ce]">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt="Cabin Suite at Limestone Fields"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 50vw, 100vw"
                  priority
                />
              )}
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24 md:py-36 bg-[#253136] text-center">
        <div className="container max-w-xl mx-auto px-6 space-y-6">
          <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#b3c1ce]/60">
            QUESTIONS?
          </p>
          <h2 className="font-headline text-[36px] leading-[1.25] text-[#f7f2e4]">
            We&apos;re here to help.
          </h2>
          <p className="font-body-secondary text-lg text-[#f7f2e4]/70 leading-relaxed">
            Not sure if this cabin is the right fit, or want to ask about a specific stay?
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
    </>
  )
}
