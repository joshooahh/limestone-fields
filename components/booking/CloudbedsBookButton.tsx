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
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (roomType) {
      const url = new URL(window.location.href)
      if (url.searchParams.get('room_type') !== roomType) {
        url.searchParams.set('room_type', roomType)
        window.history.replaceState(null, '', url.toString())
      }
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
  }, [roomType, label, className])

  return <div ref={containerRef} className="inline-block" />
}
