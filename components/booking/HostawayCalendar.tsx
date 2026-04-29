'use client'

import { useEffect, useRef } from 'react'

interface Props {
  listingId?: number
  numberOfMonths?: number
}

export default function HostawayCalendar({ listingId = 489941, numberOfMonths = 2 }: Props) {
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return

    const init = () => {
      if (typeof window.hostawayCalendarWidget === 'function') {
        initialized.current = true
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
      }
    }

    // If script already loaded (e.g. navigating back to page)
    if (typeof window.hostawayCalendarWidget === 'function') {
      init()
      return
    }

    // Inject script tag manually — most reliable for third-party widgets
    const script = document.createElement('script')
    script.src = 'https://d2q3n06xhbi0am.cloudfront.net/calendar.js'
    script.async = true
    script.onload = init
    document.head.appendChild(script)
  }, [listingId, numberOfMonths])

  return <div id="hostaway-calendar-widget" />
}
