/**
 * Cloudbeds Booking Engine — Immersive Experience 2.0 configuration.
 *
 * Docs: https://myfrontdesk.cloudbeds.com/hc/en-us/articles/32048321731739
 *
 * This is config only — see components/booking/CloudbedsBookButton.tsx for
 * the actual embed. Nothing here is wired into live buttons yet; Hostaway
 * remains the live booking provider until an explicit cutover.
 */

/** From the Booking Engine link: https://us2.cloudbeds.com/reservation/{PROPERTY_CODE} */
export const CLOUDBEDS_PROPERTY_CODE = 'N1pYag'

/**
 * "Accommodation Abbreviation" (Code) values from the Cloudbeds PMS room
 * type table. Used as the `room_type` search param so a "Book Now" button on
 * a specific cabin page opens the popup pre-filtered to the right type(s).
 *
 * Physical types (bookable directly):
 *   Standard Cabin            C    max occupancy 2, 6 units
 *   Standard Accessible Cabin CA   max occupancy 2, 1 unit
 *   Cabin Suite               CS   max occupancy 4, 3 units
 *
 * Virtual types (Cloudbeds-generated combinations of the physical cabins,
 * surfaced automatically when a search's occupancy needs more than one
 * cabin — not something we link to directly):
 *   Two Standard Cabins       TWO  max occupancy 4
 *   Two Cabin Suites          TWO  max occupancy 8  (⚠ same code as above —
 *                                  flagged back to Josh, likely needs a
 *                                  distinct code in Cloudbeds)
 *   Three Cabin Suites        TRE  max occupancy 12
 *   Reset                     RST  (housekeeping/out-of-service block —
 *                                  intentionally never referenced here)
 */
export const CLOUDBEDS_ROOM_TYPES = {
  /** Standard Cabin page — includes the accessible unit so it doesn't get hidden from that search. */
  standardCabin: 'C;CA',
  /** Cabin Suite page. */
  cabinSuite: 'CS',
} as const

/**
 * Numeric Room Type IDs (`rid`) from Cloudbeds Settings > Property >
 * Accommodations. These are a *different* identifier than the abbreviation
 * codes above — used by <cb-accommodation-date-picker> (the per-room-type
 * calendar embed on /stay), not the popup Book Now button.
 */
export const CLOUDBEDS_ROOM_TYPE_IDS = {
  standardCabin: '245506389131456',
  /** Not used on /stay yet (only 3 calendars were requested) — kept here in case a dedicated accessible-cabin calendar is wanted later. */
  standardAccessibleCabin: '249798235385984',
  cabinSuite: '249802008461504',
  fullProperty: '252597914378432',
} as const
