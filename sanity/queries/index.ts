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

const seoPageFragment = `{ title, description, ogImage { asset, crop, hotspot } }`

export const seoSettingsQuery = groq`
  *[_type == "seoSettings"][0] {
    home ${seoPageFragment},
    stay ${seoPageFragment},
    experience ${seoPageFragment},
    theProperty ${seoPageFragment},
    story ${seoPageFragment},
    book ${seoPageFragment},
    traditionalCabin ${seoPageFragment},
    familyCabin ${seoPageFragment},
    privateEvents ${seoPageFragment},
    weddings ${seoPageFragment},
    buyouts ${seoPageFragment},
    contact ${seoPageFragment},
  }
`

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title,
    description,
    email,
    phone,
    address,
    mapUrl,
    socialLinks[] {
      label,
      url
    },
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

export const homepageImagesQuery = groq`
  *[_type == "homepageImages"][0] {
    heroImage { asset, crop, hotspot },
    placeShapedByLand { asset, crop, hotspot },
    stayMain { asset, crop, hotspot },
    stayDetail { asset, crop, hotspot },
    experienceMain { asset, crop, hotspot },
    experienceLeft { asset, crop, hotspot },
    experienceRight { asset, crop, hotspot },
    eventsMain { asset, crop, hotspot },
    eventsLeft { asset, crop, hotspot },
    eventsRight { asset, crop, hotspot },
  }
`

export const bookingImagesQuery = groq`
  *[_type == "bookingImages"][0] {
    familyCabin { asset, crop, hotspot },
    traditionalCabin { asset, crop, hotspot },
    entireProperty { asset, crop, hotspot },
  }
`

export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    photo { asset, crop, hotspot },
    order
  }
`

export const propertyImagesQuery = groq`
  *[_type == "propertyImages"][0] {
    heroImage { asset, crop, hotspot },
    cabinsImages[] { asset, crop, hotspot },
    barnImages[] { asset, crop, hotspot },
    kitchenImages[] { asset, crop, hotspot },
    lakeImages[] { asset, crop, hotspot },
    farmImages[] { asset, crop, hotspot },
    landImages[] { asset, crop, hotspot },
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

