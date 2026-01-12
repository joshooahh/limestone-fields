'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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

export default function WeddingInquiryForm() {
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
          <h3 className="text-2xl font-headline text-foreground">
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
        <CardTitle className="text-2xl font-headline">Start the Conversation</CardTitle>
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
