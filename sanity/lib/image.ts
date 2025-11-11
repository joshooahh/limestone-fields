import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'

const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
})

export function urlForImage(source: Image | { asset: { _ref: string } }) {
  return builder.image(source)
}
