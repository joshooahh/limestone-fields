import type { Metadata } from 'next'
import Link from 'next/link'
import { PortableText, toPlainText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import { client } from '@/sanity/lib/client'
import JsonLd from '@/components/seo/JsonLd'
import { ORGANIZATION_ID, SITE_URL, DEFAULT_OG_IMAGE, OG_IMAGES } from '@/lib/schema-constants'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export const revalidate = 300

const PAGE_URL = `${SITE_URL}/faq`

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description:
    'Where Limestone Fields is, what the cabins are like, lake access, weddings and buyouts, pets, minimum stays, and cancellations. Straight answers about a private lakefront retreat on Lake Limestone, Texas.',
  openGraph: {
    images: OG_IMAGES,
    title: 'Frequently Asked Questions — Limestone Fields',
    description:
      'Straight answers about staying at Limestone Fields: location, cabins, the lake, events, and policies.',
    url: PAGE_URL,
  },
  alternates: { canonical: PAGE_URL },
}

type Faq = {
  _id: string
  question: string
  answer: PortableTextBlock[]
  order?: number
}

const faqsQuery = `*[_type == "faq" && defined(question)] | order(order asc) { _id, question, answer, order }`

/**
 * Dedicated FAQ page. Content lives in Sanity (the same "FAQ" documents the
 * contact page shows), rendered here with FAQPage schema so search engines
 * and AI answer engines can lift question-and-answer pairs directly.
 */
export default async function FaqPage() {
  const faqs = await client.fetch<Faq[]>(faqsQuery).catch(() => [] as Faq[])

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${PAGE_URL}#faq`,
    url: PAGE_URL,
    name: 'Limestone Fields — Frequently Asked Questions',
    about: { '@id': ORGANIZATION_ID },
    mainEntity: faqs
      .filter((f) => f.question && f.answer)
      .map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: toPlainText(f.answer) },
      })),
  }

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: PAGE_URL,
    name: 'Frequently Asked Questions — Limestone Fields',
    isPartOf: { '@type': 'WebSite', url: SITE_URL, name: 'Limestone Fields' },
    about: { '@id': ORGANIZATION_ID },
    mainEntity: { '@id': `${PAGE_URL}#faq` },
    primaryImageOfPage: { '@type': 'ImageObject', url: DEFAULT_OG_IMAGE },
  }

  return (
    <>
      <JsonLd data={faqSchema} />
      <JsonLd data={webPage} />

      <section className="bg-limestone-cream pt-36 pb-16 md:pt-44 md:pb-20">
        <div className="container max-w-3xl mx-auto px-6 text-center">
          <p className="font-subhead text-[13px] tracking-[0.3em] uppercase text-[#253136]/50 mb-5">
            Questions
          </p>
          <h1 className="font-headline text-[42px] md:text-[56px] leading-[1.15] text-[#253136] mb-5">
            Frequently Asked Questions
          </h1>
          <p className="text-[18px] text-[#253136]/75 leading-[1.6]">
            Straight answers about staying at Limestone Fields: where it is, what the cabins are like,
            the lake, events, and the small print. Anything missing? <Link href="/contact" className="underline underline-offset-4 hover:text-[#253136]">Ask us</Link>.
          </p>
        </div>
      </section>

      <section className="bg-limestone-cream pb-24 md:pb-32">
        <div className="container max-w-3xl mx-auto px-6">
          {faqs.length === 0 ? (
            <p className="text-[17px] text-[#253136]/70">
              Our FAQs are being updated. In the meantime, <Link href="/contact" className="underline underline-offset-4">reach out</Link> and we&rsquo;ll answer directly.
            </p>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq._id}
                  value={`faq-${index}`}
                  className="border-t border-[#253136]/20 last:border-b"
                >
                  <AccordionTrigger className="text-left text-[20px] md:text-[22px] font-headline text-[#253136] leading-[1.3] py-6 hover:no-underline hover:opacity-70 transition">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-[17px] text-[#253136]/85 leading-[1.65] pb-6 [&_p+p]:mt-3 [&_a]:underline">
                    {faq.answer && <PortableText value={faq.answer} />}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[#253136] text-center">
        <div className="container max-w-3xl mx-auto px-6 space-y-6">
          <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#b3c1ce]">Still wondering?</p>
          <h2 className="font-headline text-[30px] md:text-[36px] leading-[1.25] text-[#f7f2e4]">
            We&rsquo;d rather you ask than guess.
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/contact" className="inline-flex items-center justify-center rounded-[78px] bg-[#f7f2e4] px-8 py-3 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#253136] transition hover:bg-[#f7e7d5]">
              Contact us
            </Link>
            <Link href="/stay" className="inline-flex items-center justify-center rounded-[78px] border border-[#b3c1ce]/50 px-8 py-3 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#f7f2e4] transition hover:border-[#f7f2e4]">
              See the cabins
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
