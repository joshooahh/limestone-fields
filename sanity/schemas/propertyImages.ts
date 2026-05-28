import { defineType, defineField } from 'sanity'

const imageArray = (name: string, title: string, description: string) =>
  defineField({
    name,
    title,
    type: 'array',
    description,
    of: [
      {
        type: 'image',
        options: { hotspot: true },
      },
    ],
    validation: (Rule) => Rule.max(3),
  })

export default defineType({
  name: 'propertyImages',
  title: 'Property Page Images',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      description: 'Full-bleed hero image at the top of The Property page. Best as a wide establishing shot.',
      options: { hotspot: true },
    }),
    imageArray(
      'cabinsImages',
      'The Cabins (up to 3 photos)',
      'Photos of the cabins. First image is the featured/largest.',
    ),
    imageArray(
      'barnImages',
      'The Commons Barn (up to 3 photos)',
      'Photos of the shared barn, interior, and gathering space.',
    ),
    imageArray(
      'kitchenImages',
      'The Outdoor Kitchen (up to 3 photos)',
      'Photos of the outdoor kitchen, Santa Maria grill, and cooking area.',
    ),
    imageArray(
      'lakeImages',
      'The Lake (up to 3 photos)',
      'Photos of Lake Limestone, the shoreline, and water views.',
    ),
    imageArray(
      'farmImages',
      'The Farm (up to 3 photos)',
      'Photos of the working permaculture farm and seasonal crops.',
    ),
    imageArray(
      'landImages',
      'The Land (up to 3 photos)',
      'Photos of the woods, creek, open terrain, and surrounding land.',
    ),
  ],
})
