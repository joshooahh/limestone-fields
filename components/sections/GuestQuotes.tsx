import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { GUEST_QUOTES } from '@/lib/credibility'

/** Three guest quotes, verbatim from Airbnb reviews, followed by a direct-booking CTA (no link out to Airbnb). */
export default function GuestQuotes() {
  const quotes = GUEST_QUOTES.filter((q) => q.featured).slice(0, 3)

  return (
    <section className="bg-[#F9F4EE] py-24 md:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <div className="mb-14 text-center">
          <p className="mb-4 font-subhead text-[11px] uppercase tracking-[0.3em] text-[#253136]/50">
            FROM OUR GUESTS
          </p>
          <h2 className="font-headline text-[32px] leading-[1.2] text-[#253136] md:text-[40px]">
            What guests are saying
          </h2>
        </div>

        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          {quotes.map((q) => (
            <figure key={q.name + q.quote.slice(0, 12)} className="flex flex-col">
              <blockquote className="font-body-secondary text-[19px] leading-[1.5] text-[#253136] md:text-[21px]">
                &ldquo;{q.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-5 font-subhead text-[11px] uppercase tracking-[0.22em] text-[#253136]/60">
                {q.name}
                {q.from ? ` · ${q.from}` : ''}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#253136]/90"
          >
            Check Availability
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
