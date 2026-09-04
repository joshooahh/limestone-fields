import type { ReactNode } from 'react'
import Link from 'next/link'
import RetreatHeader from '@/components/ui/RetreatHeader'
import { RETREAT_BOOKING_URL } from '@/lib/retreat'

/**
 * Layout for event landing pages that should stay a single path: no site nav,
 * no standard footer (which carries the contact form and a "Book Now" into the
 * general booking flow). The only ways out are booking a cabin, the logo,
 * asking a question, or a look at the standard cabins.
 */
export default function RetreatLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <RetreatHeader />
      <main className="flex-1">{children}</main>
      <footer className="bg-[#1d262a] py-14 text-[#b3c1ce]">
        <div className="container max-w-6xl mx-auto px-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-subhead text-[12px] tracking-[0.26em] uppercase text-[#f7f2e4]">
              Limestone Fields <span className="text-[#D39B75]">×</span> Sobremesa
            </p>
            <p className="text-[15px] mt-2">A writers retreat · Nov 6–9, 2026 · Lake Limestone, Texas</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 font-subhead text-[11px] tracking-[0.22em] uppercase">
            <a href={RETREAT_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">Book your cabin</a>
            <Link href="#reserve" className="transition hover:text-white">Ask a question</Link>
            <Link href="/book/traditional-cabin" className="transition hover:text-white">See the standard cabins</Link>
            <a href="mailto:hello@limestonefields.com" className="transition hover:text-white">hello@limestonefields.com</a>
          </nav>
        </div>
        <div className="container max-w-6xl mx-auto px-6 mt-10 pt-6 border-t border-[#b3c1ce]/15 text-[12px] text-[#b3c1ce]/60">
          © 2026 Limestone Fields · 159 LCR 890, Jewett, Texas
        </div>
      </footer>
    </div>
  )
}
