import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      description: 'Used for navigation and SEO',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubhead',
      title: 'Hero Subhead',
      type: 'text',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional hero background image',
    }),
    defineField({
      name: 'heroCtaText',
      title: 'Hero CTA Text',
      type: 'string',
      description: 'Button text (e.g., "Join the Waitlist")',
    }),
    defineField({
      name: 'heroCtaHref',
      title: 'Hero CTA Link',
      type: 'string',
      description: 'Button link (e.g., "/contact")',
    }),
    defineField({
      name: 'sections',
      title: 'Page Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'textSection',
          title: 'Text Section',
          fields: [
            { name: 'headline', type: 'string', title: 'Headline' },
            {
              name: 'body',
              type: 'array',
              of: [{ type: 'block' }],
              title: 'Body Copy',
            },
          ],
        },
        {
          type: 'object',
          name: 'imageSection',
          title: 'Image Section',
          fields: [
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
            { name: 'caption', type: 'string', title: 'Caption' },
            { name: 'alt', type: 'string', title: 'Alt Text' },
          ],
        },
        {
          type: 'object',
          name: 'valuePropSection',
          title: 'Value Proposition Section',
          fields: [
            { name: 'headline', type: 'string', title: 'Section Headline' },
            { name: 'introText', type: 'text', title: 'Intro Text' },
            {
              name: 'cards',
              type: 'array',
              title: 'Value Prop Cards',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'headline', type: 'string', title: 'Card Headline' },
                    { name: 'body', type: 'text', title: 'Card Body' },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'object',
          name: 'ctaSection',
          title: 'CTA Section',
          fields: [
            { name: 'headline', type: 'string', title: 'Headline' },
            { name: 'body', type: 'text', title: 'Body Text' },
            { name: 'buttonText', type: 'string', title: 'Button Text' },
            { name: 'buttonHref', type: 'string', title: 'Button Link' },
            { name: 'variant', type: 'string', title: 'Variant', options: { list: ['primary', 'secondary', 'muted'] } },
          ],
        },
        {
          type: 'object',
          name: 'cabinPreviewSection',
          title: 'Cabin Preview Section',
          fields: [
            { name: 'headline', type: 'string', title: 'Section Headline' },
            { name: 'subhead', type: 'text', title: 'Subhead' },
            {
              name: 'cabins',
              type: 'array',
              title: 'Featured Cabins',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'cabin', type: 'reference', to: [{ type: 'cabin' }], title: 'Cabin' },
                    { name: 'image', type: 'image', title: 'Preview Image', options: { hotspot: true } },
                    { name: 'description', type: 'text', title: 'Description Override' },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'object',
          name: 'twoColumnSection',
          title: 'Two Column Section',
          fields: [
            { name: 'leftHeadline', type: 'string', title: 'Left Column Headline' },
            { name: 'leftBody', type: 'array', of: [{ type: 'block' }], title: 'Left Column Body' },
            { name: 'rightHeadline', type: 'string', title: 'Right Column Headline' },
            { name: 'rightBody', type: 'array', of: [{ type: 'block' }], title: 'Right Column Body' },
            { name: 'leftImage', type: 'image', title: 'Left Column Image', options: { hotspot: true } },
            { name: 'rightImage', type: 'image', title: 'Right Column Image', options: { hotspot: true } },
          ],
        },
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', type: 'string', title: 'Meta Title' },
        { name: 'metaDescription', type: 'text', title: 'Meta Description' },
        { name: 'ogImage', type: 'image', title: 'Social Share Image' },
      ],
    }),
  ],
})

