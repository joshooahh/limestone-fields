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
}

export type PageSection = TextSection | ImageSection

export interface PageDocument {
  title?: string
  heroHeadline?: string
  heroSubhead?: string
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


