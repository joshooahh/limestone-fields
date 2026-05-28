import type { Metadata } from 'next'
import type { Image as SanityImage } from 'sanity'
import { urlForImage } from '@/sanity/lib/image'

export interface SeoPage {
  title?: string | null
  description?: string | null
  ogImage?: SanityImage | null
}

export interface SeoSettings {
  home?: SeoPage | null
  stay?: SeoPage | null
  experience?: SeoPage | null
  theProperty?: SeoPage | null
  story?: SeoPage | null
  book?: SeoPage | null
  traditionalCabin?: SeoPage | null
  familyCabin?: SeoPage | null
  privateEvents?: SeoPage | null
  weddings?: SeoPage | null
  buyouts?: SeoPage | null
  contact?: SeoPage | null
}

interface BuildMetadataOptions {
  page?: SeoPage | null
  defaults: {
    title: string
    description: string
    url: string
    ogTitle?: string
    ogDescription?: string
  }
}

export function buildMetadata({ page, defaults }: BuildMetadataOptions): Metadata {
  const title = page?.title ?? defaults.title
  const description = page?.description ?? defaults.description
  const ogTitle = defaults.ogTitle ?? title
  const ogDescription = defaults.ogDescription ?? description

  const ogImages =
    page?.ogImage?.asset
      ? [{ url: urlForImage(page.ogImage).width(1200).height(630).auto('format').url(), width: 1200, height: 630 }]
      : undefined

  return {
    title,
    description,
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: defaults.url,
      ...(ogImages ? { images: ogImages } : {}),
    },
    alternates: { canonical: defaults.url },
  }
}
