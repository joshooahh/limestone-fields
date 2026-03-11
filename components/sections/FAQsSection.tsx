'use client'

import { useState, useEffect } from 'react'
import { PortableText } from '@portabletext/react'
import type { Faq } from '@/sanity/types'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export default function FAQsSection() {
  const [faqs, setFaqs] = useState<Faq[]>([])

  useEffect(() => {
    async function fetchFaqs() {
      try {
        const response = await fetch('/api/faqs')
        if (response.ok) {
          const data = await response.json()
          setFaqs(data)
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error)
      }
    }
    fetchFaqs()
  }, [])

  if (faqs.length === 0) return null

  return (
    <section className="py-24 md:py-32 bg-[#F9F4EE]">
      <div className="container max-w-4xl mx-auto px-6">
        <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136] mb-5">
          QUESTIONS
        </p>
        <h2 className="text-[32px] font-headline leading-[1.37] text-[#253136] mb-12">
          Frequently Asked
        </h2>

        <Accordion type="single" collapsible className="w-full space-y-0">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq._id}
              value={`item-${index}`}
              className="border-t border-[#253136]/20 last:border-b"
            >
              <AccordionTrigger className="text-left text-[18px] font-headline text-[#253136] leading-[1.37] py-5 hover:no-underline hover:opacity-70 transition">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-[17px] text-[#253136] leading-[1.6] pb-5">
                {faq.answer && <PortableText value={faq.answer} />}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
