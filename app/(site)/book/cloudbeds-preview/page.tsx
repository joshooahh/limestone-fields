import CloudbedsBookButton from '@/components/booking/CloudbedsBookButton'
import { CLOUDBEDS_ROOM_TYPES } from '@/lib/cloudbeds'

// Intentionally not linked from nav, sitemap, or any other page — a QA-only
// route for validating the Cloudbeds embed before cutover. Safe to leave
// live on production since limestonefields.com is already the whitelisted
// domain; delete this route once cutover is complete and confirmed.
export const metadata = {
  robots: { index: false, follow: false },
}

export default function CloudbedsPreviewPage() {
  return (
    <section className="pt-36 pb-24 md:pt-44 md:pb-32 bg-limestone-cream">
      <div className="container max-w-2xl mx-auto px-6 space-y-14">
        <div className="text-center space-y-3">
          <p className="font-subhead text-[11px] tracking-[0.3em] uppercase text-[#253136]/50">
            INTERNAL QA — NOT LINKED ANYWHERE
          </p>
          <h1 className="font-headline text-[32px] text-[#253136]">Cloudbeds Embed Preview</h1>
          <p className="text-[16px] text-[#253136]/70">
            Testing the popup Book Now button before it replaces any live Hostaway buttons.
            Nothing on this page affects the live booking flow.
          </p>
        </div>

        <div className="space-y-10">
          <div className="text-center space-y-3">
            <p className="font-subhead text-[13px] tracking-[0.2em] uppercase text-[#253136]/60">
              General (no room type filter)
            </p>
            <CloudbedsBookButton label="Check Availability" />
          </div>

          <div className="text-center space-y-3">
            <p className="font-subhead text-[13px] tracking-[0.2em] uppercase text-[#253136]/60">
              Standard Cabin page
            </p>
            <CloudbedsBookButton roomType={CLOUDBEDS_ROOM_TYPES.standardCabin} label="Check Availability" />
          </div>

          <div className="text-center space-y-3">
            <p className="font-subhead text-[13px] tracking-[0.2em] uppercase text-[#253136]/60">
              Cabin Suite page
            </p>
            <CloudbedsBookButton roomType={CLOUDBEDS_ROOM_TYPES.cabinSuite} label="Check Availability" />
          </div>
        </div>

        <div className="text-[14px] text-[#253136]/50 font-body-secondary italic text-center pt-4 border-t border-[#253136]/10">
          Check: does the panel open, does it show the right cabin type filtered, does the
          address bar pick up ?room_type=..., does styling look reasonably on-brand, does
          checkout complete end to end with a test/real reservation.
        </div>
      </div>
    </section>
  )
}
