import type { Metadata } from 'next'
import type { Image as SanityImage } from 'sanity'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { client } from '@/sanity/lib/client'
import { propertyImagesQuery } from '@/sanity/queries'
import { imgUrls } from '@/lib/sanity-image'
import { blogPosts } from '@/lib/blog-posts'

export const metadata: Metadata = {
  title: 'Journal — Limestone Fields',
  description:
    'Field notes on rest, retreats, and gathering at Limestone Fields — ten lakefront cabins on 16 acres at Lake Limestone, Texas.',
  openGraph: {
    title: 'Journal — Limestone Fields',
    description:
      'Field notes on rest, retreats, and gathering on Lake Limestone, Texas.',
    url: 'https://limestonefields.com/blog',
  },
  alternates: { canonical: 'https://limestonefields.com/blog' },
}

type PropertyImages = {
  cabinsImages?: SanityImage[] | null
  barnImages?: SanityImage[] | null
  lakeImages?: SanityImage[] | null
  landImages?: SanityImage[] | null
}

export default async function BlogIndexPage() {
  const raw = await client.fetch<PropertyImages | null>(propertyImagesQuery).catch(() => null)

  const cabins = imgUrls(raw?.cabinsImages)
  const barn = imgUrls(raw?.barnImages)
  const lake = imgUrls(raw?.lakeImages)
  const land = imgUrls(raw?.landImages)

  const cardImage: Record<string, string | null> = {
    'weekend-getaway-from-dallas': lake[0] ?? land[0] ?? null,
    'corporate-retreat-venues-texas': barn[0] ?? cabins[0] ?? null,
    'deep-work-retreat': cabins[0] ?? cabins[1] ?? null,
    'intimate-wedding-venues-texas': lake[1] ?? lake[0] ?? null,
  }

  return (
    <>
      {/* Header */}
      <section className="bg-limestone-cream pt-40 pb-20 md:pt-48 md:pb-24">
        <div className="container max-w-3xl mx-auto px-6 text-center space-y-5">
          <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#253136]/50">
            Journal
          </p>
          <h1 className="font-headline text-[40px] md:text-[56px] leading-[1.15] text-[#253136]">
            Notes From Lake Limestone
          </h1>
          <p className="font-body-secondary text-lg md:text-xl text-[#253136]/70 leading-relaxed">
            Field notes on rest, retreats, and gathering — from the people who built ten
            cabins on 16 acres and keep finding new reasons to slow down.
          </p>
        </div>
      </section>

      {/* Post grid */}
      <section className="bg-[#F9F4EE] py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid gap-10 md:gap-12 md:grid-cols-2">
            {blogPosts.map((post) => {
              const url = cardImage[post.slug]
              return (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group block space-y-5">
                  <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-[#b3c1ce]">
                    {url && (
                      <Image
                        src={url}
                        alt={post.title}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    )}
                  </div>
                  <div className="space-y-2">
                    <p className="font-subhead text-[11px] tracking-[0.25em] uppercase text-[#253136]/50">
                      {post.category} · {post.publishedDate}
                    </p>
                    <h2 className="font-headline text-[24px] md:text-[26px] leading-[1.3] text-[#253136] group-hover:opacity-70 transition">
                      {post.title}
                    </h2>
                    <p className="text-[16px] text-[#253136]/75 leading-[1.55]">{post.dek}</p>
                    <span className="inline-flex items-center gap-1.5 font-subhead text-[12px] tracking-[0.2em] uppercase text-[#253136] pt-1">
                      Read the guide
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 bg-[#253136] text-center">
        <div className="container max-w-xl mx-auto px-6 space-y-6">
          <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#b3c1ce]/60">
            READY TO STAY
          </p>
          <h2 className="font-headline text-[36px] md:text-[48px] leading-[1.2] text-[#f7f2e4]">
            Come see it for yourself.
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-[78px] bg-[#f7f2e4] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#253136] transition hover:bg-[#e8e4dc]"
            >
              Check Availability
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-[78px] border border-[#f7f2e4]/30 px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#f7f2e4]/70 transition hover:border-[#f7f2e4]/60 hover:text-[#f7f2e4]"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
