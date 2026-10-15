import Image from 'next/image'
import { AIRBNB, PRESS, type PressItem } from '@/lib/credibility'

const ext = { target: '_blank', rel: 'noopener noreferrer' } as const

/** Outlet mark in LF ink, or the name set in the headline face when we have no artwork. */
function Mark({ item }: { item: PressItem }) {
  if (item.logo) {
    return (
      <Image
        src={item.logo.src}
        alt={item.name}
        width={item.logo.width}
        height={item.logo.height}
        className="h-[22px] w-auto opacity-75 transition group-hover:opacity-100"
      />
    )
  }
  return (
    <span className="font-headline text-[16px] leading-none text-[#253136]/80 transition group-hover:text-[#253136]">
      {item.name}
    </span>
  )
}

/**
 * A quiet strip of social proof: Airbnb standing on the left, press on the
 * right. The Airbnb standing is deliberately not a link: we want guests to
 * book direct. Press marks link to the source when one exists; print-only
 * pieces are plain so nothing on the bar is a dead end.
 */
export default function ProofBar() {
  return (
    <section className="bg-limestone-cream pb-20 md:pb-28" aria-label="Reviews and press">
      <div className="container mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center gap-7 border-y border-[#253136]/10 py-7 md:flex-row md:justify-center md:gap-10">
          <div className="flex items-center gap-3 text-[#253136]">
            {/* Our own Superhost mark: laurel ring and star, words in the site faces. Not Airbnb's badge art. */}
            <svg viewBox="0 0 64 64" aria-hidden className="h-9 w-9 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <circle cx="32" cy="32" r="25" />
              <path d="M13 44q-6-8-1-20M51 44q6-8 1-20" />
              <path fill="currentColor" stroke="none" d="M32 17l4.4 9.1 10 1.4-7.2 7 1.7 9.9L32 39.7l-8.9 4.7 1.7-9.9-7.2-7 10-1.4z" />
            </svg>
            <div className="leading-tight">
              <div className="font-headline text-[17px]">{AIRBNB.superhost ? 'Superhost' : 'On Airbnb'}</div>
              <div className="font-subhead text-[10px] uppercase tracking-[0.22em] text-[#253136]/65 md:whitespace-nowrap">
                Airbnb · ★ {AIRBNB.rating} · {AIRBNB.reviews} reviews
              </div>
            </div>
          </div>

          <span aria-hidden className="hidden h-8 w-px bg-[#253136]/15 md:block" />

          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-4">
            <span className="font-subhead text-[10px] uppercase tracking-[0.3em] text-[#253136]/45">
              As seen in
            </span>
            {PRESS.map((p) =>
              p.url ? (
                <a key={p.name} href={p.url} {...ext} title={`${p.detail} · ${p.date}`} className="group flex items-center">
                  <Mark item={p} />
                </a>
              ) : (
                <span key={p.name} title={`${p.detail} · ${p.date}`} className="group flex items-center">
                  <Mark item={p} />
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
