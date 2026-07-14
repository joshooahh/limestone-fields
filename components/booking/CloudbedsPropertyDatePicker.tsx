'use client'

import { useEffect, useRef } from 'react'
import { CLOUDBEDS_PROPERTY_CODE } from '@/lib/cloudbeds'

interface Props {
  label?: string
  /** "horizontal" (dates + button in a row) or "vertical" (stacked). */
  layout?: 'horizontal' | 'vertical'
  className?: string
  /**
   * Where to send the guest after they pick dates, instead of Cloudbeds'
   * hosted Booking Engine. Defaults to the current page — pair this with a
   * CloudbedsBookButton on the same page to pick the dates back up and open
   * the on-domain popup, same pattern as CloudbedsAccommodationCalendar.
   * Pass `false` to leave Cloudbeds' own hosted-engine redirect in place.
   */
  customUrl?: string | false
}

/**
 * Renders a Cloudbeds <cb-property-date-picker> — a property-wide
 * (all room types combined) search bar: check-in, check-out, and a search
 * button. This is the closest Cloudbeds equivalent to the old
 * HostawaySearchBar on the homepage.
 *
 * Unlike the popup Book Now button, this one shows Cloudbeds' own inline
 * calendar UI directly on the page (not a slide-in panel) — clicking search
 * hands off to whatever customUrl resolves to.
 */
export default function CloudbedsPropertyDatePicker({
  label = 'Check Availability',
  layout = 'horizontal',
  className = 'lf-cb-property-picker',
  customUrl,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const el = document.createElement('cb-property-date-picker')
    el.setAttribute('property-code', CLOUDBEDS_PROPERTY_CODE)
    el.setAttribute('button-label', label)
    el.setAttribute('layout', layout)
    el.setAttribute('class-name', className)

    const resolvedCustomUrl = customUrl === false
      ? null
      : customUrl ?? `${window.location.origin}${window.location.pathname}`
    if (resolvedCustomUrl) {
      el.setAttribute('custom-url', resolvedCustomUrl)
    }

    container.appendChild(el)

    return () => {
      container.removeChild(el)
    }
  }, [label, layout, className, customUrl])

  return <div ref={containerRef} className="inline-block w-full" />
}
