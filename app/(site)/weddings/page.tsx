'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const weddingSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().default(''),
  partnerName: z.string().default(''),
  weddingDate: z.string().min(1, 'Wedding date is required'),
  guestCount: z.coerce.number().min(1, 'Guest count is required'),
  additionalDetails: z.string().default(''),
})

type WeddingFormInput = z.input<typeof weddingSchema>

function WeddingInquiryForm() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<WeddingFormInput>({
    resolver: zodResolver(weddingSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      partnerName: '',
      weddingDate: '',
      guestCount: 0,
      additionalDetails: '',
    },
  })

  const onSubmit = async (data: WeddingFormInput) => {
    setIsSubmitting(true)
    try {
      // Convert to buyout inquiry format with eventType: "Wedding/Celebration"
      const buyoutData = {
        name: data.name,
        email: data.email,
        phone: data.phone || '',
        company: data.partnerName ? `Wedding: ${data.name} & ${data.partnerName}` : `Wedding: ${data.name}`,
        preferredDates: data.weddingDate,
        groupSize: data.guestCount,
        eventType: 'Wedding/Celebration',
        additionalDetails: data.additionalDetails || '',
      }

      const response = await fetch('/api/buyout-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buyoutData),
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
            Thank you for your inquiry
          </h3>
          <p className="text-muted-foreground">
            We&apos;re excited to learn more about your celebration. We&apos;ll send you 
            detailed information and pricing within 2 business days.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-serif">Start the Conversation</CardTitle>
        <p className="text-sm text-muted-foreground">
          Tell us about your celebration and we&apos;ll send you everything you need to know.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name *</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="partnerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Partner&apos;s Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="weddingDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Wedding Date *</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. October 15, 2026" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="guestCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Guest Count *</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="1" 
                        max="150" 
                        {...field}
                        value={typeof field.value === 'number' ? String(field.value) : ''}
                        onChange={(e) => field.onChange(e.target.value === '' ? 0 : Number(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="additionalDetails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tell Us About Your Vision</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="What drew you to Limestone Fields? What matters most to you about your celebration?"
                      className="min-h-32"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Inquiry'}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              Wedding weekends include exclusive use of the entire property from Friday 
              arrival through Sunday departure. We&apos;ll respond within 2 business days 
              with detailed information and pricing.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default function WeddingsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-gradient-to-b from-muted/50 to-background">
        <div className="container max-w-4xl mx-auto px-6 text-center space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">
              Weddings at Limestone Fields
            </p>
            <h1 className="text-4xl md:text-6xl font-serif text-foreground">
              Your People. Our Land. One Weekend.
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A lakefront property where celebrations feel less like productions and more 
            like gatherings.
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-6">
          <Card>
            <CardContent className="p-8 md:p-12 space-y-6">
              <div className="prose prose-lg max-w-none space-y-4 text-muted-foreground">
                <p>
                  Ten custom cabins for your closest people. A ceremony site on the water. 
                  A barn for dinner and dancing. Working farm for authenticity you can taste. 
                  And a weekend—not just a day—to be together without rushing.
                </p>
                <p>
                  This is not a wedding factory. We host one event at a time. The property 
                  is yours, the weekend is yours, and the land does most of the decorating.
                </p>
                <p className="text-foreground font-medium">
                  Intimate scale. 75-150 guests. Friday arrival, Sunday departure. Bring 
                  your own caterer, bring your own vision. We provide the space, the 
                  accommodations, and the kind of setting that doesn&apos;t need much help 
                  to feel special.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* For Couples Who Want */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              For Couples Who Want
            </h2>
            <Separator className="max-w-24 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">
                  A Weekend, Not Just a Day
                </h3>
                <p className="text-muted-foreground">
                  Friday arrival, Sunday departure. No shuttles, no hotel blocks. Your 
                  people stay here with you.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">
                  Natural Beauty Without Pinterest
                </h3>
                <p className="text-muted-foreground">
                  Lakefront ceremony site. Open sky. The land does the decorating. You 
                  bring what matters.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">
                  All-in-One Simplicity
                </h3>
                <p className="text-muted-foreground">
                  Ceremony, reception, and overnight accommodations in one place. Less 
                  logistics, more presence.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">
                  Privacy and Exclusive Use
                </h3>
                <p className="text-muted-foreground">
                  One wedding at a time. The entire property is yours. No strangers, no 
                  other events.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">
                  Authentic Farm-to-Table
                </h3>
                <p className="text-muted-foreground">
                  Working farm. Real agriculture. Not staged—lived in and tended daily.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-3">
                <h3 className="text-lg font-semibold text-foreground">
                  Intimate Scale
                </h3>
                <p className="text-muted-foreground">
                  75-150 guests. Small enough to feel personal. Large enough to gather 
                  everyone who matters.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              What&apos;s Included
            </h2>
            <Separator className="max-w-24 mx-auto" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Ceremony Site</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Lakefront ceremony location with natural backdrop</li>
                  <li>• Setup of ceremony chairs (up to 150)</li>
                  <li>• Sound system for ceremony</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Reception Space</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Commons barn (1,200 sq ft) + outdoor pergola area</li>
                  <li>• Tables and chairs for reception</li>
                  <li>• Basic lighting (string lights, uplighting)</li>
                  <li>• Use of bar area</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Accommodations</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• 10 cabins for wedding party (sleeps 28-30 overnight)</li>
                  <li>• Bridal suite (premium cabin for getting ready)</li>
                  <li>• Groom&apos;s suite (premium cabin)</li>
                  <li>• All standard cabin amenities</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Weekend Timeline</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Friday arrival after 2 PM</li>
                  <li>• Friday evening rehearsal included</li>
                  <li>• Saturday ceremony + reception</li>
                  <li>• Sunday departure by 11 AM</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What You Provide (BYOC) */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              What You Provide
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide the space. You bring your vision.
            </p>
            <Separator className="max-w-24 mx-auto mt-4" />
          </div>

          <Card>
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Required</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Caterer (you hire your own)</li>
                    <li>• Alcohol and bartending</li>
                    <li>• Event coordinator / day-of coordinator</li>
                    <li>• Florist and decorations</li>
                    <li>• DJ/band and entertainment</li>
                    <li>• Photography / videography</li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Optional Rentals</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Dance floor</li>
                    <li>• Additional tents</li>
                    <li>• Specialty lighting beyond basics</li>
                    <li>• Specialty furniture</li>
                    <li>• Additional tables/chairs beyond provided</li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 p-6 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> This BYOC (Bring Your Own Caterer) model gives you 
                  complete flexibility to work with vendors you trust and create the exact 
                  celebration you envision. We&apos;re happy to share our preferred vendor 
                  list to get you started.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing & Capacity */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Practical Details
            </h2>
            <Separator className="max-w-24 mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-8 text-center space-y-3">
                <div className="text-3xl font-serif text-foreground">75-150</div>
                <p className="text-sm text-muted-foreground">Guest Capacity</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center space-y-3">
                <div className="text-3xl font-serif text-foreground">28-30</div>
                <p className="text-sm text-muted-foreground">Overnight Guests</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center space-y-3">
                <div className="text-3xl font-serif text-foreground">3 Days</div>
                <p className="text-sm text-muted-foreground">Fri-Sun Weekend</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-8">
            <CardContent className="p-8 md:p-12 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  Weekend Investment
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <strong>Weekday Events (Mon-Thu):</strong> $8,000-10,000
                  </p>
                  <p>
                    <strong>Weekend Events (Fri-Sun):</strong> $13,000-16,000
                  </p>
                  <p>
                    <strong>Peak Season (March-May, Sept-Nov):</strong> $15,000-20,000
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  What This Includes
                </h3>
                <p className="text-muted-foreground">
                  Venue fee includes ceremony site, reception space, overnight 
                  accommodations for 28-30 guests, basic furniture and lighting, 
                  rehearsal, and exclusive use of the entire property for your weekend.
                </p>
              </div>

              <div className="pt-4">
                <p className="text-sm text-muted-foreground italic">
                  Detailed pricing and availability provided upon inquiry. Custom quotes 
                  based on your specific weekend and guest count.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-4">
              Let&apos;s Talk About Your Celebration
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Not every wedding belongs here. But if you&apos;re looking for a weekend that 
              feels less like a wedding and more like the best family reunion you&apos;ve ever 
              had—this might be your place.
            </p>
          </div>

          <WeddingInquiryForm />
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container max-w-4xl mx-auto px-6 text-center space-y-4">
          <h2 className="text-2xl font-serif text-foreground">
            Questions about weddings?
          </h2>
          <p className="text-muted-foreground">
            Reach out directly:{' '}
            <a href="mailto:hello@limestonefields.com" className="text-primary hover:underline">
              hello@limestonefields.com
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}

