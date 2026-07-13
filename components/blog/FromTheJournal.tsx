import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getBlogPost } from '@/lib/blog-posts'

interface FromTheJournalProps {
  slug: string
  /** Tailwind background class for the section. Defaults to the cream background. */
  className?: string
}

/**
 * Compact "From the Journal" teaser linking a core page back to its matching
 * blog post. Improves internal linking between the blog and the pages it was
 * written to support (reverse of the blog post's own internal links out).
 */
export default function FromTheJournal({ slug, className = 'bg-limestone-cream' }: FromTheJournalProps) {
  const post = getBlogPost(slug)
  if (!post) return null

  return (
    <section className={`py-20 md:py-28 ${className}`}>
      <div className="container max-w-3xl mx-auto px-6 text-center space-y-5">
        <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]">
          FROM THE JOURNAL
        </p>
        <h2 className="text-[26px] md:text-[30px] font-headline leading-[1.35] text-[#253136]">
          {post.title}
        </h2>
        <p className="text-[17px] text-[#253136] leading-[1.55] max-w-2xl mx-auto">
          {post.dek}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center justify-center rounded-[78px] border border-[#253136]/30 px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#253136] transition hover:border-[#253136]/60"
        >
          Read the Post
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}
