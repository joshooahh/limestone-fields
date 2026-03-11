'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { contactSchema, type ContactFormInput } from '@/lib/validations'

export default function FooterContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const form = useForm<ContactFormInput>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactFormInput) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to submit')
      setSubmitted(true)
      form.reset()
    } catch {
      form.setError('root', { message: 'Something went wrong. Please try again.' })
    }
  }

  if (submitted) {
    return (
      <p className="text-[17px] text-[#e8e4dc]/90">
        Thank you. We&apos;ll be in touch.
      </p>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#9ca3a8] text-[17px] tracking-[0.02em]">Your Name*</FormLabel>
              <FormControl>
                <Input
                  placeholder="Your Name*"
                  className="rounded-none border-0 border-b border-[#e8e4dc]/50 bg-transparent px-0 py-2 text-[#e8e4dc] placeholder:text-[#e8e4dc]/50 focus-visible:ring-0 focus-visible:border-[#e8e4dc] focus-visible:border-b"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[#e8e4dc]/80" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#9ca3a8] text-[17px] tracking-[0.02em]">Email*</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email*"
                  className="rounded-none border-0 border-b border-[#e8e4dc]/50 bg-transparent px-0 py-2 text-[#e8e4dc] placeholder:text-[#e8e4dc]/50 focus-visible:ring-0 focus-visible:border-[#e8e4dc] focus-visible:border-b"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[#e8e4dc]/80" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-[#9ca3a8] text-[17px] tracking-[0.02em]">Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Message..."
                  rows={3}
                  className="rounded-none border-0 border-b border-[#e8e4dc]/50 bg-transparent px-0 py-2 text-[#e8e4dc] placeholder:text-[#e8e4dc]/50 resize-none focus-visible:ring-0 focus-visible:border-[#e8e4dc] focus-visible:border-b"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[#e8e4dc]/80" />
            </FormItem>
          )}
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-[78px] bg-[#c9cdd1] px-7 py-2.5 text-[14px] font-subhead uppercase tracking-[0.2em] text-[#253136] transition hover:bg-[#d4d8dc]"
        >
          SUBMIT
        </button>
      </form>
    </Form>
  )
}
