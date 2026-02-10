import Link from 'next/link'
import { ArrowRight, MapPin, Phone, Mail } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
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
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3 lg:gap-16">
          {/* General contact form */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.35rem] text-background/60 mb-4">
              Get in touch
            </h3>
            <FooterContactForm />
          </div>

          {/* Address, phone, email */}
          <div className="space-y-6">
            <h3 className="text-xs uppercase tracking-[0.35rem] text-background/60">
              Visit
            </h3>
            {address && (
              <p className="text-background/80 flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-background/60" />
                <a
                  href={mapUrl || DEFAULT_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-background underline underline-offset-2"
                >
                  {address}
                </a>
              </p>
            )}
            {!address && (
              <p className="text-background/80 flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-background/60" />
                <a
                  href={mapUrl || DEFAULT_MAP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-background underline underline-offset-2"
                >
                  Lake Limestone, Texas
                </a>
              </p>
            )}
            {phone && (
              <p className="text-background/80 flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0 text-background/60" />
                <a href={`tel:${phone.replace(/\D/g, '')}`} className="hover:text-background">
                  {phone}
                </a>
              </p>
            )}
            {email && (
              <p className="text-background/80 flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0 text-background/60" />
                <a href={`mailto:${email}`} className="hover:text-background underline underline-offset-2">
                  {email}
                </a>
              </p>
            )}
          </div>

          {/* CTA and social */}
          <div className="space-y-6">
            {footerCta && (footerCta.headline || footerCta.body) && (
              <div className="space-y-3">
                {footerCta.headline && (
                  <h3 className="text-lg font-headline text-background">{footerCta.headline}</h3>
                )}
                {footerCta.body && (
                  <p className="text-sm text-background/70">{footerCta.body}</p>
                )}
                {footerCta.buttonText && (
                  <Link
                    href={footerCta.buttonHref ?? '/contact'}
                    className={cn(
                      buttonVariants({ variant: 'secondary', size: 'sm' }),
                      'inline-flex items-center gap-2 rounded-full border border-background bg-background text-foreground hover:bg-background/90'
                    )}
                  >
                    {footerCta.buttonText}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </div>
            )}
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) =>
                  link?.url ? (
                    <a
                      key={link.label || link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-background/80 hover:text-background underline underline-offset-2"
                    >
                      {link.label || 'Link'}
                    </a>
                  ) : null
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
