'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { PortableText } from '@portabletext/react'
import type { Faq } from '@/sanity/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const waitlistSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  interests: z.array(z.string()).optional(),
})

type WaitlistFormData = z.infer<typeof waitlistSchema>

function WaitlistForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      interests: [],
    },
  })

  const onSubmit = async (data: WaitlistFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitted(true)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-12 text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-serif text-foreground">
            You&apos;re on the list.
          </h3>
          <p className="text-muted-foreground">
            We&apos;ll be in touch when bookings open.
          </p>
        </CardContent>
      </Card>
    )
  }

  const interestOptions = [
    'Weekend stays',
    'Extended stays (5+ nights)',
    'Full property buyouts',
    'Updates and stories from the build',
  ]

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Join the Waitlist</CardTitle>
        <p className="text-sm text-muted-foreground">
          Be the first to know when bookings open. We&apos;ll send you early access, 
          updates on construction progress, and behind-the-scenes stories from the land.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="interests"
              render={() => (
                <FormItem>
                  <FormLabel className="mb-4">I&apos;m interested in:</FormLabel>
                  <div className="space-y-3">
                    {interestOptions.map((interest) => (
                      <FormField
                        key={interest}
                        control={form.control}
                        name="interests"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(interest)}
                                onCheckedChange={(checked) => {
                                  const currentValue = field.value || []
                                  return checked
                                    ? field.onChange([...currentValue, interest])
                                    : field.onChange(
                                        currentValue.filter((value) => value !== interest)
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              {interest}
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Joining...' : 'Join the Waitlist'}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              We&apos;ll never share your information. Unsubscribe anytime.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default function ContactPage() {
  const [faqs, setFaqs] = useState<Faq[]>([])

  useEffect(() => {
    // Fetch FAQs from Sanity
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
    <main>
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-muted/50 to-background">
        <div className="container max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-6xl font-serif text-foreground">
              Get in Touch
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We&apos;re still building. But we&apos;re here.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card>
              <CardContent className="p-8 space-y-3">
                <div className="text-sm uppercase tracking-wider text-muted-foreground">
                  Email
                </div>
                <a 
                  href="mailto:hello@limestonefields.com" 
                  className="text-lg text-foreground hover:text-primary transition-colors block"
                >
                  hello@limestonefields.com
                </a>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-3">
                <div className="text-sm uppercase tracking-wider text-muted-foreground">
                  Location
                </div>
                <div className="text-muted-foreground">
                  <p>Lake Limestone, Texas</p>
                  <p className="text-sm">2 hours from Austin, Dallas, Houston</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-3">
                <div className="text-sm uppercase tracking-wider text-muted-foreground">
                  Opening
                </div>
                <div className="text-lg text-foreground">
                  Spring 2026
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6">
          <Card>
            <CardContent className="p-8 md:p-12 space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-foreground mb-4">
                  How to Find Us
                </h2>
                <Separator className="mb-6" />
              </div>

              <div className="space-y-4 text-muted-foreground">
                <p>
                  Detailed directions will be provided upon booking confirmation.
                </p>
                <p>
                  General location: Lake Limestone is located in East Central Texas, 
                  accessible via Highway 164. Specific property directions and gate codes 
                  will be sent to confirmed guests prior to arrival.
                </p>
              </div>

              <div className="pt-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Nearest Airports
                </h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Austin-Bergstrom International Airport (AUS) — 2 hours</li>
                  <li>• Dallas/Fort Worth International Airport (DFW) — 2.5 hours</li>
                  <li>• Houston George Bush Intercontinental Airport (IAH) — 2.5 hours</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  We recommend renting a car. There are no ride-share services in the area.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
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

      {/* Waitlist Form */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6">
          <WaitlistForm />
        </div>
      </section>
    </main>
  )
}
