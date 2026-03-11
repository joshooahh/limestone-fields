import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="bg-limestone-cream min-h-screen flex items-center justify-center py-40">
      <div className="container max-w-2xl mx-auto px-6 text-center">
        <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]/50 mb-6">
          404
        </p>
        <h1 className="text-[42px] md:text-[52px] font-headline leading-[1.25] text-[#253136] mb-6">
          This page doesn&apos;t exist.
        </h1>
        <p className="font-body-secondary text-[18px] italic leading-[1.65] text-[#253136]/80 mb-10 max-w-md mx-auto">
          You may have followed an old link, or the page has moved. Head back home and find your way from there.
        </p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#1e282c]"
        >
          Back to Home
        </Link>
      </div>
    </section>
  )
}
