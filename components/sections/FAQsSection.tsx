'use client'

import { useState, useEffect } from 'react'
import { PortableText } from '@portabletext/react'
import type { Faq } from '@/sanity/types'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
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

  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-4xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-headline text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <Separator className="max-w-24 mx-auto" />
        </div>

        {faqs.length > 0 ? (
          <Card>
            <CardContent className="p-8">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={faq._id} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer && <PortableText value={faq.answer} />}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">Loading FAQs...</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  )
}
