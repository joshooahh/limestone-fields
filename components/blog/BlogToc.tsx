interface BlogTocProps {
  items: { id: string; label: string }[]
}

export default function BlogToc({ items }: BlogTocProps) {
  if (items.length === 0) return null

  return (
    <nav aria-label="Table of contents" className="rounded-lg bg-[#F9F4EE] px-6 py-6 md:px-8 md:py-7">
      <p className="font-subhead text-[11px] tracking-[0.26em] uppercase text-[#253136]/55 mb-4">
        In This Guide
      </p>
      <ul className="space-y-2.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="text-[15px] text-[#253136]/80 leading-snug underline underline-offset-2 decoration-[#253136]/25 transition hover:decoration-[#253136]/60"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
