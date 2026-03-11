import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { policiesQuery } from '@/sanity/queries'
import type { Policy } from '@/sanity/types'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://limestonefields.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const policies = await client.fetch<Policy[]>(policiesQuery).catch(() => [] as Policy[])
  const policyRoutes: MetadataRoute.Sitemap = policies
    .filter((p) => p.slug?.current)
    .map((p) => ({
      url: `${SITE_URL}/policies/${p.slug!.current}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    }))

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/stay`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/experience`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/private-events`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/weddings`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/buyouts`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/story`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...policyRoutes,
  ]
}
