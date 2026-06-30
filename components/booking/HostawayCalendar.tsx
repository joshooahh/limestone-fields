'use client'

import { useEffect, useRef } from 'react'

interface Props {
  listingId?: number
  numberOfMonths?: number
}

export default function HostawayCalendar({ listingId = 489941, numberOfMonths = 2 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false

    const init = () => {
      if (cancelled) return
      if (typeof window.hostawayCalendarWidget !== 'function') return
      // Small delay to ensure the div is fully in the DOM
      setTimeout(() => {
        if (cancelled) return
        window.hostawayCalendarWidget({
          baseUrl: 'https://174771_1.holidayfuture.com/',
          listingId,
          numberOfMonths,
          openInNewTab: false,
          font: 'Helvetica Neue',
          rounded: true,
          button: {
            action: 'checkout',
            text: 'Book Now',
          },
          clearButtonText: 'Clear dates',
          color: {
            mainColor: '#253136',
            frameColor: '#F7F2E4',
            textColor: '#253136',
          },
        })
      }, 50)
    }

    if (typeof window.hostawayCalendarWidget === 'function') {
      init()
    } else {
      // Check if script already in DOM
      const existing = document.querySelector(
        'script[src="https://d2q3n06xhbi0am.cloudfront.net/calendar.js"]'
      )
      if (!existing) {
        const script = document.createElement('script')
        script.src = 'https://d2q3n06xhbi0am.cloudfront.net/calendar.js'
        script.async = true
        script.onload = init
        document.head.appendChild(script)
      } else {
        // Script tag exists but function not ready yet — poll briefly
        const poll = setInterval(() => {
          if (typeof window.hostawayCalendarWidget === 'function') {
            clearInterval(poll)
            init()
          }
        }, 100)
        setTimeout(() => clearInterval(poll), 5000)
      }
    }

    return () => {
      cancelled = true
    }
  }, [listingId, numberOfMonths])

  return <div id="hostaway-calendar-widget" ref={containerRef} />
}
