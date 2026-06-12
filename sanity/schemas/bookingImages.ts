import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'bookingImages',
  title: 'Booking Page Images',
  type: 'document',
  fields: [
    defineField({
      name: 'familyCabin',
      title: 'Cabin Suite',
      type: 'image',
      description: 'Photo shown for the Cabin Suite (sleeps 4) on the /book page',
      options: { hotspot: true },
    }),
    defineField({
      name: 'traditionalCabin',
      title: 'Standard Cabin',
      type: 'image',
      description: 'Photo shown for the Standard Cabin (sleeps 2) on the /book page',
      options: { hotspot: true },
    }),
    defineField({
      name: 'entireProperty',
      title: 'Entire Property',
      type: 'image',
      description: 'Photo shown for the Entire Property option on the /book page',
      options: { hotspot: true },
    }),
  ],
})
