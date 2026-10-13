import type { ReactNode } from 'react'
import Link from 'next/link'
import SchoolHeader from '@/components/ui/SchoolHeader'

/**
 * Layout for the Art of Living School (/school and /school/[slug]). Like the
 * (retreat) group: no site nav and no standard footer, so each class page is
 * a single path to the sign-up form.
 */
export default function SchoolLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SchoolHeader />
      <main className="flex-1">{children}</main>
      <footer className="bg-[#1d262a] py-14 text-[#b3c1ce]">
        <div className="container max-w-6xl mx-auto px-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-subhead text-[12px] tracking-[0.26em] uppercase text-[#f7f2e4]">
              Limestone Fields <span className="text-[#D39B75]">·</span> The Art of Living School
            </p>
            <p className="text-[15px] mt-2">Weekend classes in the old crafts · Lake Limestone, Texas</p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-3 font-subhead text-[11px] tracking-[0.22em] uppercase">
            <Link href="/school" className="transition hover:text-white">All classes</Link>
            <Link href="#reserve" className="transition hover:text-white">Get first word</Link>
            <Link href="/stay" className="transition hover:text-white">See the cabins</Link>
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
