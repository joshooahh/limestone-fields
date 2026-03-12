import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepageImages',
  title: 'Homepage Images',
  type: 'document',
  fields: [
    defineField({
      name: 'heroImage',
      title: 'Hero — Background',
      type: 'image',
      options: { hotspot: true },
      description: 'Full-bleed hero background. Wide landscape, golden hour preferred.',
    }),
    defineField({
      name: 'placeShapedByLand',
      title: '"Shaped by Land" — Main Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Large left-column image in the intro section. Landscape or portrait of the land/lake.',
    }),
    defineField({
      name: 'stayMain',
      title: 'Stay — Main Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Large background image in the Stay section. Cabin interior or exterior.',
    }),
    defineField({
      name: 'stayDetail',
      title: 'Stay — Detail Overlay',
      type: 'image',
      options: { hotspot: true },
      description: 'Small overlapping card image in the Stay section. Close-up detail shot.',
    }),
    defineField({
      name: 'experienceMain',
      title: 'Experience — Top Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Large top image in the Experience section mosaic.',
    }),
    defineField({
      name: 'experienceLeft',
      title: 'Experience — Bottom Left',
      type: 'image',
      options: { hotspot: true },
      description: 'Bottom-left square image in the Experience section mosaic.',
    }),
    defineField({
      name: 'experienceRight',
      title: 'Experience — Bottom Right',
      type: 'image',
      options: { hotspot: true },
      description: 'Bottom-right square image in the Experience section mosaic.',
    }),
    defineField({
      name: 'eventsMain',
      title: 'Events — Main Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Large top image in the Private Events section. Ceremony or gathering shot.',
    }),
    defineField({
      name: 'eventsLeft',
      title: 'Events — Bottom Left',
      type: 'image',
      options: { hotspot: true },
      description: 'Bottom-left image in the Private Events section.',
    }),
    defineField({
      name: 'eventsRight',
      title: 'Events — Bottom Right',
      type: 'image',
      options: { hotspot: true },
      description: 'Bottom-right image in the Private Events section. Fire pit or outdoor gathering.',
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage Images' }),
  },
})
