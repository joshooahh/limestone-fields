import type { Image as SanityImage } from 'sanity'
import { urlForImage } from '@/sanity/lib/image'

/** Build a Sanity CDN image URL, or return null if the image is missing. */
export function imgUrl(
  sanityImage: SanityImage | null | undefined,
  width = 1400
): string | null {
  if (sanityImage?.asset) {
    return urlForImage(sanityImage).width(width).auto('format').url()
  }
  return null
}

/** Build an array of Sanity CDN image URLs from an array field, filtering out missing assets. */
export function imgUrls(
  images: SanityImage[] | null | undefined,
  width = 1200
): string[] {
  if (!images) return []
  return images
    .map((img) => imgUrl(img, width))
    .filter((url): url is string => url !== null)
}
