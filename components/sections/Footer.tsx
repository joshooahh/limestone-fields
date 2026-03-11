import Link from 'next/link'
import { Instagram } from 'lucide-react'
import Logo from '@/components/ui/Logo'
import FooterContactForm from '@/components/forms/FooterContactForm'

interface FooterCta {
  headline?: string
  body?: string
  buttonText?: string
  buttonHref?: string
}

interface FooterProps {
  email?: string
  phone?: string
  address?: string
  mapUrl?: string
  socialLinks?: { label?: string; url?: string }[]
  footerCta?: FooterCta
}

const DEFAULT_MAP_URL = 'https://www.google.com/maps/search/?api=1&query=Lake+Limestone+Texas'

export default function Footer({
  email,
  phone,
  address,
  mapUrl,
  socialLinks,
  footerCta,
}: FooterProps) {
  const instagramUrl = socialLinks?.find((l) => l?.url?.includes('instagram'))?.url

  return (
    <footer className="border-t border-[#2a3338] bg-[#2b353a] text-[#e8e4dc]">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-12 md:pt-20 md:pb-16">
        {/* Top centered branding: logo + Limestone Fields */}
        <div className="flex flex-col items-center justify-center text-center pb-14 md:pb-16">
          <Logo variant="primary" theme="light" href="/" className="h-16 w-auto md:h-20" />
        </div>

        {/* Three columns */}
        <div className="grid gap-14 md:grid-cols-3 md:gap-12 lg:gap-20">
          {/* GET IN TOUCH */}
          <div className="space-y-5">
            <h3 className="font-subhead text-[13px] uppercase tracking-[0.28em] text-[#e8e4dc]">
              GET IN TOUCH
            </h3>
            <FooterContactForm />
          </div>

          {/* VISIT */}
          <div className="space-y-5">
            <h3 className="font-subhead text-[13px] uppercase tracking-[0.28em] text-[#e8e4dc]">
              VISIT
            </h3>
            <div className="space-y-3 text-[17px] leading-[1.8] tracking-[0.02em] text-[#e8e4dc]">
              {address ? (
                <p>
                  <a
                    href={mapUrl || DEFAULT_MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:opacity-90"
                  >
                    {address}
                  </a>
                </p>
              ) : (
                <p>
                  <a
                    href={mapUrl || DEFAULT_MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:opacity-90"
                  >
                    123 Address Rd
                    <br />
                    City, ST 55555
                  </a>
                </p>
              )}
              {phone && (
                <p>
                  <a href={`tel:${phone.replace(/\D/g, '')}`} className="hover:opacity-90">
                    {phone}
                  </a>
                </p>
              )}
              {email && (
                <p>
                  <a href={`mailto:${email}`} className="underline underline-offset-2 hover:opacity-90">
                    {email}
                  </a>
                </p>
              )}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex mt-2 text-[#e8e4dc] hover:opacity-80"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" strokeWidth={1.5} />
                </a>
              )}
            </div>
          </div>

          {/* Opening Spring 2026 + waitlist + legal */}
          <div className="space-y-5">
            <h3 className="font-headline text-[22px] md:text-[24px] leading-[1.35] text-[#e8e4dc]">
              {footerCta?.headline ?? 'Opening Spring 2026'}
            </h3>
            <p className="font-body-secondary text-[17px] italic leading-[1.6] text-[#e8e4dc]/95">
              {footerCta?.body ?? 'Be the first to know when bookings open. Join our waitlist for early access and updates.'}
            </p>
            <Link
              href={footerCta?.buttonHref ?? '/contact'}
              className="inline-flex items-center justify-center rounded-[78px] bg-[#c9cdd1] px-7 py-2.5 text-[14px] font-subhead uppercase tracking-[0.2em] text-[#253136] transition hover:bg-[#d4d8dc]"
            >
              {footerCta?.buttonText ?? 'JOIN'}
            </Link>
            <div className="pt-2 space-y-1 text-[15px] leading-relaxed text-[#6b7280]">
              <Link href="/policies/privacy" className="block hover:text-[#e8e4dc] transition">
                Privacy Policy
              </Link>
              <Link href="/policies/terms" className="block hover:text-[#e8e4dc] transition">
                Terms and Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
