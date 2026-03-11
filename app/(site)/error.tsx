'use client'

import { useEffect } from 'react'
import Link from 'next/link'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className="bg-limestone-cream min-h-screen flex items-center justify-center py-40">
      <div className="container max-w-2xl mx-auto px-6 text-center">
        <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]/50 mb-6">
          Something went wrong
        </p>
        <h1 className="text-[42px] md:text-[52px] font-headline leading-[1.25] text-[#253136] mb-6">
          We hit a snag.
        </h1>
        <p className="font-body-secondary text-[18px] italic leading-[1.65] text-[#253136]/80 mb-10 max-w-md mx-auto">
          Something unexpected happened on our end. You can try again, or head back home.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#1e282c]"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-[78px] border border-[#253136]/30 px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#253136] transition hover:border-[#253136]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  )
}
