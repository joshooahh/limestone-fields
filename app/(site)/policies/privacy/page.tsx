import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Limestone Fields.',
  robots: { index: false, follow: false },
}

export default function PrivacyPolicyPage() {
  return (
    <section className="bg-limestone-cream min-h-screen py-40 md:py-48">
      <div className="container max-w-2xl mx-auto px-6">
        <p className="font-subhead text-[13px] tracking-[0.26em] uppercase text-[#253136]/60 mb-5">Policy</p>
        <h1 className="text-[36px] font-headline leading-[1.3] text-[#253136] mb-4">Privacy Policy</h1>
        <p className="font-body-secondary italic text-[#253136]/60 mb-12">Last updated: March 2026</p>

        <div className="text-[18px] text-[#253136] leading-[1.65] space-y-8 [&_h2]:text-[24px] [&_h2]:font-headline [&_h2]:mt-10 [&_h2]:mb-4 [&_p]:mb-0 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2">

          <p>Limestone Fields (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the website at limestonefields.com and provides short-term lodging and event services at 159 LCR 890, Jewett, TX 75846. This Privacy Policy describes how we collect, use, and protect information you share with us.</p>

          <h2>Information We Collect</h2>
          <p>When you interact with our website, we may collect the following:</p>
          <p><strong>Information you provide directly:</strong></p>
          <ul>
            <li>Name, email address, and phone number submitted through our contact, waitlist, or event inquiry forms</li>
            <li>Event details, group size, and preferred dates provided in booking and inquiry forms</li>
            <li>Any additional information you choose to include in your messages to us</li>
          </ul>
          <p><strong>Information collected automatically:</strong></p>
          <ul>
            <li>Basic usage data and analytics to understand how visitors interact with our site</li>
            <li>Standard server log data including IP address and browser type</li>
          </ul>
          <p>We do not use third-party advertising trackers or sell your data to any third party.</p>

          <h2>How We Use Your Information</h2>
          <p>We use the information you provide to respond to your inquiries and reservation requests, add you to our waitlist and notify you when bookings open, coordinate event planning and private stays, send transactional communications related to your booking or inquiry, and improve our website and guest experience.</p>
          <p>We will not send you unsolicited marketing emails. You can unsubscribe at any time by replying to any email or contacting us directly.</p>

          <h2>Information Sharing</h2>
          <p>We do not sell, rent, or share your personal information with third parties for marketing purposes. We work with a small number of trusted service providers to operate our business:</p>
          <ul>
            <li><strong>Sanity</strong> — our content and form submission platform, where inquiry data is securely stored</li>
            <li><strong>Resend</strong> — our email delivery provider, used to send transactional notifications</li>
          </ul>
          <p>We may disclose your information if required by law or to protect the rights, property, or safety of Limestone Fields, our guests, or others.</p>

          <h2>Data Retention</h2>
          <p>We retain inquiry and waitlist submissions for as long as necessary to fulfill the purpose for which they were collected, or as required by applicable law. You may request deletion of your information at any time by contacting us.</p>

          <h2>Your Rights</h2>
          <p>You have the right to request access to, correction of, or deletion of your personal information, and to opt out of any communications from us. To exercise any of these rights, contact us at hello@limestonefields.com.</p>

          <h2>Cookies</h2>
          <p>Our website may use essential cookies to ensure basic functionality. We do not use cookies for advertising or cross-site tracking.</p>

          <h2>Children&apos;s Privacy</h2>
          <p>Our website and services are not directed at children under the age of 13. We do not knowingly collect personal information from children.</p>

          <h2>Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. Continued use of our website after changes are posted constitutes your acceptance of the updated policy.</p>

          <h2>Contact</h2>
          <p>Limestone Fields<br />159 LCR 890, Jewett, TX 75846<br />hello@limestonefields.com</p>
        </div>
      </div>
    </section>
  )
}
