import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FooterCta {
  headline?: string
  body?: string
  buttonText?: string
  buttonHref?: string
}

interface FooterProps {
  title?: string
  description?: string
  email?: string
  footerCta?: FooterCta
}

export default function Footer({ title, description, email, footerCta }: FooterProps) {
  return (
    <footer className="border-t border-border bg-foreground text-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 py-16 md:flex-row md:items-center md:justify-between">
        <div className="max-w-xl space-y-4">
          {title && <p className="text-xs uppercase tracking-[0.35rem] text-background/60">{title}</p>}
          {description && <p className="text-lg text-background/80">{description}</p>}
          {email && (
            <a className="text-sm text-background underline underline-offset-4" href={`mailto:${email}`}>
              {email}
            </a>
          )}
        </div>

        {footerCta && (footerCta.headline || footerCta.body) && (
          <div className="space-y-4 text-right">
            {footerCta.headline && <h3 className="text-2xl font-serif text-background">{footerCta.headline}</h3>}
            {footerCta.body && <p className="text-sm text-background/70">{footerCta.body}</p>}
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
      </div>
    </footer>
  )
}

