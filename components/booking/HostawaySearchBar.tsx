'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'

export default function HostawaySearchBar() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded && typeof window !== 'undefined' && window.searchBar) {
      window.searchBar({
        baseUrl: 'https://limestonefields.com/',
        showLocation: false,
        color: '#253136',
        rounded: true,
        openInNewTab: false,
        font: 'Helvetica Neue',
      })
    }
  }, [loaded])

  return (
    <>
      <div id="hostaway-booking-widget" />
      <Script
        src="https://d2q3n06xhbi0am.cloudfront.net/widget.js?1640277196"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
      />
    </>
  )
}
