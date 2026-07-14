'use client'

import { useEffect, useRef } from 'react'
import { CLOUDBEDS_PROPERTY_CODE } from '@/lib/cloudbeds'

interface Props {
  /**
   * Cloudbeds "Accommodation Abbreviation" code(s) — semicolon-separated for
   * more than one (see lib/cloudbeds.ts). Leave unset to let guests search
   * across all room types (used on the homepage / general CTAs).
   */
  roomType?: string
  label?: string
  className?: string
  /**
   * Default stay length shown when the popup opens, in nights. Cloudbeds'
   * own default is a single night starting tomorrow, which undersells the
   * property's 2-night minimum and shows a false "unavailable" for a lot of
   * dates. We default to 2 nights instead. Set to 0 to leave Cloudbeds'
   * own default in place.
   */
  defaultNights?: number
}

/** YYYY-MM-DD, in the browser's local time zone (not UTC — avoids an
 *  off-by-one day near midnight from toISOString()). */
function toDateParam(d: Date): string {
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Renders a Cloudbeds Immersive Experience 2.0 "Book Now" button
 * (<cb-book-now-button>). Clicking it slides in the full booking flow
 * (search, room, rate, payment) in a side panel — the guest never leaves
 * the current page.
 *
 * Built imperatively (not as JSX) so we can guarantee the room_type search
 * param is already in the page URL *before* the custom element is inserted
 * into the DOM — Cloudbeds only reads search params once, at initial load.
 * The address bar will reflect that param after this runs (e.g.
 * /book/traditional-cabin?room_type=C%3BCA) — that's expected and makes the
 * pre-filtered link shareable/bookmarkable.
 *
 * Requires the Cloudbeds script from app/layout.tsx to already be loaded
 * (strategy="beforeInteractive", so it always is by the time this mounts).
 */
export default function CloudbedsBookButton({
  roomType,
  label = 'Check Availability',
  className = 'lf-cb-book-button',
  defaultNights = 2,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const url = new URL(window.location.href)
    let changed = false

    if (roomType && url.searchParams.get('room_type') !== roomType) {
      url.searchParams.set('room_type', roomType)
      changed = true
    }

    // Only fill in dates if the URL doesn't already specify them — don't
    // stomp on a deep link someone shared with specific checkin/checkout.
    if (defaultNights > 0 && !url.searchParams.get('checkin') && !url.searchParams.get('checkout')) {
      const checkin = new Date()
      checkin.setDate(checkin.getDate() + 1) // tomorrow
      const checkout = new Date(checkin)
      checkout.setDate(checkout.getDate() + defaultNights)
      url.searchParams.set('checkin', toDateParam(checkin))
      url.searchParams.set('checkout', toDateParam(checkout))
      changed = true
    }

    if (changed) {
      window.history.replaceState(null, '', url.toString())
    }

    const el = document.createElement('cb-book-now-button')
    el.setAttribute('property-code', CLOUDBEDS_PROPERTY_CODE)
    el.setAttribute('label', label)
    el.setAttribute('class-name', className)
    container.appendChild(el)

    return () => {
      container.removeChild(el)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomType, label, className, defaultNights])

  return <div ref={containerRef} className="inline-block" />
}
