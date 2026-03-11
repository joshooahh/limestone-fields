import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { client } from '@/sanity/lib/client'
import { policiesQuery } from '@/sanity/queries'
import type { Policy } from '@/sanity/types'

interface Props {
  params: Promise<{ slug: string }>
}

async function getPolicy(slug: string): Promise<Policy | null> {
  const policies = await client.fetch<Policy[]>(policiesQuery)
  return policies.find((p) => p.slug?.current === slug) ?? null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const policy = await getPolicy(slug)
  if (!policy) return { title: 'Policy Not Found' }
  return {
    title: policy.title,
    description: `Limestone Fields ${policy.title}`,
    robots: { index: false, follow: false },
  }
}

export async function generateStaticParams() {
  const policies = await client.fetch<Policy[]>(policiesQuery)
  return policies
    .filter((p) => p.slug?.current)
    .map((p) => ({ slug: p.slug!.current }))
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params
  const policy = await getPolicy(slug)

  if (!policy) notFound()

  return (
    <section className="bg-limestone-cream min-h-screen py-40 md:py-48">
      <div className="container max-w-2xl mx-auto px-6">
        <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]/60 mb-5">
          Policy
        </p>
        <h1 className="text-[36px] font-headline leading-[1.3] text-[#253136] mb-12">
          {policy.title}
        </h1>
        <div className="text-[18px] text-[#253136] leading-[1.65] [&_p]:mb-5 [&_p:last-child]:mb-0 [&_h2]:text-[24px] [&_h2]:font-headline [&_h2]:mt-10 [&_h2]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_li]:leading-[1.6]">
          <PortableText value={policy.content} />
        </div>
      </div>
    </section>
  )
}
