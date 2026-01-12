import type { PortableTextBlock } from 'sanity'
import type { Image } from 'sanity'

export interface Cabin {
  _id: string
  title: string
  slug?: { current: string }
  squareFeet: number
  sleeps: string
  bedType: string
  features: string[]
  description: PortableTextBlock[]
  included: string[]
  images: Image[]
  order?: number
}

export interface TextSection {
  _type: 'textSection'
  _key: string
  headline?: string
  body?: PortableTextBlock[]
}

export interface ImageSection {
  _type: 'imageSection'
  _key: string
  image?: Image
  caption?: string
  alt?: string
}

export interface ValuePropCard {
  headline?: string
  body?: string
}

export interface ValuePropSection {
  _type: 'valuePropSection'
  _key: string
  headline?: string
  introText?: string
  cards?: ValuePropCard[]
}

export interface CtaSection {
  _type: 'ctaSection'
  _key: string
  headline?: string
  body?: string
  buttonText?: string
  buttonHref?: string
  variant?: 'primary' | 'secondary' | 'muted'
}

export interface CabinPreviewItem {
  cabin?: {
    _id: string
    title: string
    slug?: { current: string }
    squareFeet: number
    sleeps: string
    bedType: string
  }
  image?: Image
  description?: string
}

export interface CabinPreviewSection {
  _type: 'cabinPreviewSection'
  _key: string
  headline?: string
  subhead?: string
  cabins?: CabinPreviewItem[]
}

export interface TwoColumnSection {
  _type: 'twoColumnSection'
  _key: string
  leftHeadline?: string
  leftBody?: PortableTextBlock[]
  rightHeadline?: string
  rightBody?: PortableTextBlock[]
  leftImage?: Image
  rightImage?: Image
}

export type PageSection =
  | TextSection
  | ImageSection
  | ValuePropSection
  | CtaSection
  | CabinPreviewSection
  | TwoColumnSection

export interface PageDocument {
  title?: string
  heroHeadline?: string
  heroSubhead?: string
  heroImage?: Image
  heroCtaText?: string
  heroCtaHref?: string
  sections?: PageSection[]
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: Image
  }
}

export interface SiteSettings {
  title?: string
  description?: string
  email?: string
  openingDate?: string
  bookingsOpen?: boolean
  footerCta?: {
    headline?: string
    body?: string
    buttonText?: string
  }
}

export interface Faq {
  _id: string
  question: string
  answer: PortableTextBlock[]
  order?: number
}

export interface Policy {
  _id: string
  title: string
  slug?: { current: string }
  content: PortableTextBlock[]
  order?: number
}


