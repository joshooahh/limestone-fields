'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

interface Props {
  listingId?: number
  numberOfMonths?: number
}

export default function HostawayCalendar({ listingId = 40467, numberOfMonths = 2 }: Props) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded && typeof window !== 'undefined' && window.hostawayCalendarWidget) {
      window.hostawayCalendarWidget({
        baseUrl: 'https://limestonefields.com/',
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
  }, [loaded, listingId, numberOfMonths])

  return (
    <>
      <div id="hostaway-calendar-widget" />
      <Script
        src="https://d2q3n06xhbi0am.cloudfront.net/calendar.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
      />
    </>
  )
}
