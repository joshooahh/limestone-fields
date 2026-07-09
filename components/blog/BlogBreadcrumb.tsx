import Link from 'next/link'

interface BlogBreadcrumbProps {
  current: string
}

export default function BlogBreadcrumb({ current }: BlogBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-2 font-subhead text-[11px] tracking-[0.2em] uppercase text-[#253136]/50"
    >
      <Link href="/" className="hover:text-[#253136]/80 transition">
        Home
      </Link>
      <span aria-hidden="true">›</span>
      <Link href="/blog" className="hover:text-[#253136]/80 transition">
        Journal
      </Link>
      <span aria-hidden="true">›</span>
      <span className="text-[#253136]/80">{current}</span>
    </nav>
  )
}
