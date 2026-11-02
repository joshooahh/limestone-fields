'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { newsletterSchema, type NewsletterFormInput } from '@/lib/validations'

const labelClass =
  'block font-subhead text-[11px] uppercase tracking-[0.3em] text-[#253136]/70 mb-1'
const inputClass =
  'block w-full h-12 rounded-none border-0 border-b-2 border-[#253136]/40 bg-transparent px-0 py-2 text-[17px] text-[#253136] placeholder:text-[#253136]/40 transition-colors focus:outline-none focus:border-limestone-olive aria-[invalid=true]:border-[#8a3b2a]'

export default function NewsletterForm() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null)
  const [serverError, setServerError] = useState<string | null>(null)
  const successRef = useRef<HTMLDivElement>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterFormInput>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: '', firstName: '', company: '' },
  })

  useEffect(() => {
    if (submittedEmail) successRef.current?.focus()
  }, [submittedEmail])

  const onSubmit = async (data: NewsletterFormInput) => {
    setServerError(null)
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.status === 429) {
        setServerError('Your sign-up has not gone through yet. Please try again in a few minutes.')
        return
      }
      if (response.status === 400) {
        setServerError('Please check your email address and try again.')
        return
      }
      if (!response.ok) throw new Error('Failed to submit')

      setSubmittedEmail(data.email.trim())
      reset()
    } catch {
      setServerError(
        'That did not go through. Please try again, or write to hello@limestonefields.com.'
      )
    }
  }

  if (submittedEmail) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="border-l-2 border-limestone-olive pl-5 py-1 outline-none motion-safe:animate-in motion-safe:fade-in motion-safe:duration-500"
      >
        <p className="font-headline text-[26px] leading-[1.2] text-[#253136] mb-2">
          You Are Signed Up.
        </p>
        <p className="font-body-secondary text-[17px] leading-relaxed text-[#253136]/75">
          The next Field Notes will reach {submittedEmail}. Every letter has an unsubscribe link at
          the bottom.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6" aria-label="Sign up for Field Notes">
      <div>
        <label htmlFor="newsletter-email" className={labelClass}>
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@example.com"
          required
          aria-required="true"
          aria-invalid={errors.email ? 'true' : 'false'}
          aria-describedby={errors.email ? 'newsletter-email-error' : undefined}
          className={inputClass}
          {...register('email')}
        />
        {errors.email && (
          <p id="newsletter-email-error" role="alert" className="mt-2 text-[15px] text-[#8a3b2a]">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="newsletter-first-name" className={labelClass}>
          First name <span className="normal-case tracking-normal text-[#253136]/50">(optional)</span>
        </label>
        <input
          id="newsletter-first-name"
          type="text"
          autoComplete="given-name"
          placeholder="First name"
          className={inputClass}
          {...register('firstName')}
        />
      </div>

      {/* Honeypot: hidden from people and screen readers. Bots that fill it are dropped on the server. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="newsletter-company">Company</label>
        <input
          id="newsletter-company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('company')}
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-[48px] w-full sm:w-auto items-center justify-center rounded-[78px] bg-[#253136] px-8 py-3 text-[14px] font-subhead uppercase tracking-[0.2em] text-limestone-cream transition hover:bg-[#1c262a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-limestone-olive disabled:opacity-60"
        >
          {isSubmitting ? 'SENDING' : 'GET FIELD NOTES'}
        </button>
      </div>

      <div aria-live="polite" className="min-h-[1.5rem]">
        {serverError && (
          <p role="alert" className="text-[15px] text-[#8a3b2a]">
            {serverError}
          </p>
        )}
      </div>

      <p className="font-body-secondary text-[14px] leading-relaxed text-[#253136]/65">
        By signing up you agree to get Field Notes by email from Limestone Fields: about once a
        month, plus the occasional note when dates open. Unsubscribe any time.
      </p>
    </form>
  )
}
