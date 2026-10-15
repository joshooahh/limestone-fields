import { AIRBNB, PRESS } from '@/lib/credibility'

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const

/**
 * A quiet strip of social proof: Airbnb standing on the left, press on the
 * right. Names link to the source when one exists; print-only pieces are
 * plain text so nothing on the bar is a dead end.
 */
export default function ProofBar() {
  return (
    <section className="bg-limestone-cream pb-20 md:pb-28" aria-label="Reviews and press">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center gap-6 border-y border-[#253136]/10 py-6 md:flex-row md:justify-center md:gap-10">
          <a
            href={AIRBNB.url}
            {...ext}
            className="group flex items-center gap-3 text-[#253136] transition hover:text-[#253136]/70"
          >
            <span className="font-headline text-[22px] leading-none">
              <span aria-hidden className="mr-1 text-[18px]">★</span>
              {AIRBNB.rating}
            </span>
            <span className="font-subhead text-[11px] uppercase tracking-[0.22em] text-[#253136]/70 group-hover:text-[#253136]/50 md:whitespace-nowrap">
              {AIRBNB.superhost ? 'Airbnb Superhost' : 'On Airbnb'} · {AIRBNB.reviews} reviews
            </span>
          </a>

          <span aria-hidden className="hidden h-6 w-px bg-[#253136]/15 md:block" />

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="font-subhead text-[10px] uppercase tracking-[0.3em] text-[#253136]/45">
              As seen in
            </span>
            {PRESS.map((p) =>
              p.url ? (
                <a
                  key={p.name}
                  href={p.url}
                  {...ext}
                  title={`${p.detail} · ${p.date}`}
                  className="font-headline text-[16px] text-[#253136]/80 transition hover:text-[#253136]"
                >
                  {p.name}
                </a>
              ) : (
                <span
                  key={p.name}
                  title={`${p.detail} · ${p.date}`}
                  className="font-headline text-[16px] text-[#253136]/80"
                >
                  {p.name}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
