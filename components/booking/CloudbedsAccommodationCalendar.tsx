'use client'

import { useEffect, useRef } from 'react'
import { CLOUDBEDS_PROPERTY_CODE } from '@/lib/cloudbeds'

interface Props {
  /** Numeric Room Type ID from Cloudbeds Settings > Property > Accommodations (see lib/cloudbeds.ts CLOUDBEDS_ROOM_TYPE_IDS). */
  rid: string
  label?: string
  className?: string
}

/**
 * Renders a Cloudbeds <cb-accommodation-date-picker> — a calendar scoped to
 * one specific room type (or, here, a "Full Property" virtual accommodation
 * that combines all 10 cabins). Guest picks dates, then is sent to the
 * hosted Booking Engine with that room type and dates pre-filled.
 *
 * Uses the same Cloudbeds script already loaded in app/layout.tsx as the
 * other embeds (cb-book-now-button, cb-property-date-picker) — no separate
 * script needed for this one.
 */
export default function CloudbedsAccommodationCalendar({
  rid,
  label = 'Check Availability',
  className = 'lf-cb-book-button',
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
    container.appendChild(el)

    return () => {
      container.removeChild(el)
    }
  }, [rid, label, className])

  return <div ref={containerRef} className="inline-block" />
}
