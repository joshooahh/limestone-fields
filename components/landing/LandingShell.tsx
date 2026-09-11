import type { ReactNode } from 'react'
import Link from 'next/link'
import LandingHeader from '@/components/landing/LandingHeader'

interface Props {
  tagline: string
  footerTitle: string
  footerSub: string
  children: ReactNode
}

/** Header + main + minimal footer for a single-path landing page. */
export default function LandingShell({ tagline, footerTitle, footerSub, children }: Props) {
  return (
    <>
      <LandingHeader tagline={tagline} />
      <main className="flex-1">{children}</main>
      <footer className="bg-[#1d262a] py-14 text-[#b3c1ce]">
        <div className="container max-w-6xl mx-auto px-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-subhead text-[12px] tracking-[0.26em] uppercase text-[#f7f2e4]">{footerTitle}</p>
            <p className="text-[15px] mt-2">{footerSub}</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 font-subhead text-[11px] tracking-[0.22em] uppercase">
            <Link href="#inquire" className="transition hover:text-white">Start an inquiry</Link>
            <Link href="/stay" className="transition hover:text-white">See the cabins</Link>
            <a href="mailto:hello@limestonefields.com" className="transition hover:text-white">hello@limestonefields.com</a>
          </nav>
        </div>
        <div className="container max-w-6xl mx-auto px-6 mt-10 pt-6 border-t border-[#b3c1ce]/15 text-[12px] text-[#b3c1ce]/60">
          © 2026 Limestone Fields · 159 LCR 890, Jewett, Texas · Two hours from Dallas, Austin, and Houston
        </div>
      </footer>
    </>
  )
}
