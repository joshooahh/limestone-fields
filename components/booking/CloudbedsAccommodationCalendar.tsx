'use client'

import { useEffect, useRef } from 'react'
import { CLOUDBEDS_PROPERTY_CODE } from '@/lib/cloudbeds'

interface Props {
  /** Numeric Room Type ID from Cloudbeds Settings > Property > Accommodations (see lib/cloudbeds.ts CLOUDBEDS_ROOM_TYPE_IDS). */
  rid: string
  label?: string
  className?: string
  /**
   * Where to send the guest after they pick dates, instead of Cloudbeds'
   * hosted Booking Engine (us2.cloudbeds.com) — keeps the whole flow on
   * limestonefields.com. Cloudbeds appends checkin/checkout (and
   * widget_source/promo/analytics) as query params to whatever URL is set
   * here. Defaults to the current page, so a CloudbedsBookButton on the
   * same page picks up those dates on reload and opens pre-filled.
   * Pass `false` to leave Cloudbeds' own hosted-engine redirect in place.
   */
  customUrl?: string | false
}

/**
 * Renders a Cloudbeds <cb-accommodation-date-picker> — a calendar scoped to
 * one specific room type (or, here, a "Full Property" virtual accommodation
 * that combines all 10 cabins). Guest picks dates, then — by default — is
 * redirected back to this same page (not Cloudbeds' hosted booking engine)
 * with the chosen dates as query params, where a CloudbedsBookButton on the
 * same page picks them up and opens the on-domain popup pre-filled.
 *
 * Uses the same Cloudbeds script already loaded in app/layout.tsx as the
 * other embeds (cb-book-now-button, cb-property-date-picker) — no separate
 * script needed for this one.
 */
export default function CloudbedsAccommodationCalendar({
  rid,
  label = 'Check Availability',
  className = 'lf-cb-book-button',
  customUrl,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const el = document.createElement('cb-accommodation-date-picker')
    el.setAttribute('property-code', CLOUDBEDS_PROPERTY_CODE)
    el.setAttribute('rid', rid)
    el.setAttribute('button-label', label)
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
  }, [rid, label, className, customUrl])

  return <div ref={containerRef} className="inline-block" />
}
