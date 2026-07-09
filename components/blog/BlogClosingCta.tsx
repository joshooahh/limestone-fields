import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface BlogClosingCtaProps {
  eyebrow: string
  heading: string
  href: string
  label: string
  secondaryHref?: string
  secondaryLabel?: string
}

export default function BlogClosingCta({
  eyebrow,
  heading,
  href,
  label,
  secondaryHref,
  secondaryLabel,
}: BlogClosingCtaProps) {
  return (
    <section className="py-20 md:py-28 bg-[#253136] text-center rounded-lg">
      <div className="max-w-xl mx-auto px-6 space-y-6">
        <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#b3c1ce]/60">
          {eyebrow}
        </p>
        <h2 className="font-headline text-[30px] md:text-[38px] leading-[1.25] text-[#f7f2e4]">
          {heading}
        </h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-[78px] bg-[#f7f2e4] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#253136] transition hover:bg-[#e8e4dc]"
          >
            {label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          {secondaryHref && secondaryLabel && (
            <Link
              href={secondaryHref}
              className="inline-flex items-center justify-center rounded-[78px] border border-[#f7f2e4]/30 px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#f7f2e4]/70 transition hover:border-[#f7f2e4]/60 hover:text-[#f7f2e4]"
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </section>
  )
}
