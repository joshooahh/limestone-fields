import { groq } from 'next-sanity'

export const cabinsQuery = groq`
  *[_type == "cabin"] | order(order asc) {
    _id,
    title,
    slug,
    squareFeet,
    sleeps,
    bedType,
    features,
    description,
    included,
    images,
    order
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    email,
    openingDate,
    bookingsOpen,
    footerCta
  }
`

export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    order
  }
`

export const policiesQuery = groq`
  *[_type == "policy"] | order(order asc) {
    _id,
    title,
    slug,
    content,
    order
  }
`

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    title,
    heroHeadline,
    heroSubhead,
    heroImage,
    heroCtaText,
    heroCtaHref,
    sections[] {
      _type,
      _key,
      // Fetch all possible fields - TypeScript will handle type discrimination
      headline,
      body,
      introText,
      cards[] {
        headline,
        body
      },
      image,
      caption,
      alt,
      buttonText,
      buttonHref,
      variant,
      subhead,
      cabins[] {
        cabin-> {
          _id,
          title,
          slug,
          squareFeet,
          sleeps,
          bedType
        },
        image,
        description
      },
      leftHeadline,
      leftBody,
      rightHeadline,
      rightBody,
      leftImage,
      rightImage
    },
    seo
  }
`

