export {}

declare global {
  interface Window {
    hostawayCalendarWidget: (options: {
      baseUrl: string
      listingId: number
      numberOfMonths?: number
      openInNewTab?: boolean
      font?: string
      rounded?: boolean
      button?: {
        action?: 'checkout' | 'inquiry'
        text?: string
      }
      clearButtonText?: string
      color?: {
        mainColor?: string
        frameColor?: string
        textColor?: string
      }
    }) => void
    searchBar: (options: {
      baseUrl: string
      showLocation?: boolean
      color?: string
      rounded?: boolean
      openInNewTab?: boolean
      font?: string
    }) => void
  }
}
