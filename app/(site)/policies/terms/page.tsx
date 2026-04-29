import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions for Limestone Fields.',
  robots: { index: false, follow: false },
}

export default function TermsPage() {
  return (
    <section className="bg-limestone-cream min-h-screen py-40 md:py-48">
      <div className="container max-w-2xl mx-auto px-6">
        <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]/60 mb-5">Policy</p>
        <h1 className="text-[36px] font-headline leading-[1.3] text-[#253136] mb-4">Terms &amp; Conditions</h1>
        <p className="font-body-secondary italic text-[#253136]/60 mb-12">Last updated: March 2026</p>

        <div className="text-[18px] text-[#253136] leading-[1.65] space-y-8 [&_h2]:text-[24px] [&_h2]:font-headline [&_h2]:mt-10 [&_h2]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2">

          <p>These Terms &amp; Conditions govern all stays, events, and use of the Limestone Fields property and website. By making a reservation or submitting an inquiry, you agree to these terms.</p>

          <h2>Reservations &amp; Payment</h2>
          <ul>
            <li>All reservations require a signed rental agreement and deposit to be confirmed.</li>
            <li>A deposit of 50% of the total booking amount is due at the time of reservation. The remaining balance is due 30 days prior to arrival.</li>
            <li>Reservations made within 30 days of arrival require payment in full at time of booking.</li>
            <li>Rates and availability are subject to change until a reservation is confirmed in writing.</li>
          </ul>

          <h2>Cancellation Policy</h2>
          <ul>
            <li><strong>More than 60 days before arrival:</strong> Full refund of deposit, minus a $150 processing fee.</li>
            <li><strong>30–60 days before arrival:</strong> 50% of the total booking amount is forfeited.</li>
            <li><strong>Less than 30 days before arrival:</strong> No refund. We strongly recommend travel insurance.</li>
          </ul>
          <p>Limestone Fields reserves the right to cancel a reservation due to circumstances beyond our control. In such cases, a full refund will be issued.</p>

          <h2>Check-In &amp; Check-Out</h2>
          <ul>
            <li>Check-in: 4:00 PM</li>
            <li>Check-out: 11:00 AM</li>
            <li>Early check-in and late check-out may be available upon request and are subject to availability.</li>
            <li>Guests are responsible for leaving the property in the same general condition as found.</li>
          </ul>

          <h2>Property Rules</h2>
          <ul>
            <li><strong>Quiet Hours:</strong> 10:00 PM – 8:00 AM.</li>
            <li><strong>Smoking:</strong> Not permitted inside any structure. Violation results in a cleaning fee of no less than $500.</li>
            <li><strong>Pets:</strong> Welcome with prior written approval and a refundable pet deposit.</li>
            <li><strong>Fires:</strong> Only permitted in designated fire pits. All fires are prohibited during active burn bans.</li>
            <li><strong>Lake &amp; Water Safety:</strong> Swimming and watercraft use are at guests&apos; own risk. No lifeguards are provided.</li>
          </ul>

          <h2>Events &amp; Gatherings</h2>
          <p>Guests hosting weddings, corporate events, or other gatherings are subject to a separate event agreement. A dedicated event coordinator is required for all gatherings over 20 guests. Amplified music must end by 10:00 PM.</p>

          <h2>Damage &amp; Security Deposit</h2>
          <p>A refundable security deposit is required for all reservations. Guests will be notified of any deductions within 14 days of checkout.</p>

          <h2>Liability &amp; Assumption of Risk</h2>
          <p>Guests acknowledge that outdoor recreational activities carry inherent risks and agree that Limestone Fields, its owners, and staff are not liable for injury, loss, or damage arising from recreational activities or use of the property.</p>

          <h2>Governing Law</h2>
          <p>These Terms are governed by the laws of the State of Texas. Any disputes shall be resolved in Leon County, Texas.</p>

          <h2>Contact</h2>
          <p>Limestone Fields<br />159 LCR 890, Jewett, TX 75846<br />hello@limestonefields.com</p>
        </div>
      </div>
    </section>
  )
}
