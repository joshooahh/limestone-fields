import type { StructureResolver } from 'sanity/desk'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      S.divider(),
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Cabins')
        .schemaType('cabin')
        .child(S.documentTypeList('cabin').title('Cabins')),
      S.listItem()
        .title('FAQs')
        .schemaType('faq')
        .child(S.documentTypeList('faq').title('FAQs')),
      S.listItem()
        .title('Policies')
        .schemaType('policy')
        .child(S.documentTypeList('policy').title('Policies')),
      S.divider(),
      S.listItem()
        .title('Waitlist Submissions')
        .schemaType('waitlistSubmission')
        .child(S.documentTypeList('waitlistSubmission').title('Waitlist Submissions')),
      S.listItem()
        .title('Buyout Inquiries')
        .schemaType('buyoutInquiry')
        .child(S.documentTypeList('buyoutInquiry').title('Buyout Inquiries')),
    ])

