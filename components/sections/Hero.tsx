import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeroProps {
  headline: string
  subhead: string
  ctaText?: string
  ctaHref?: string
  eyebrow?: string
}

export default function Hero({
  headline,
  subhead,
  ctaText = 'Join the waitlist',
  ctaHref = '/contact',
  eyebrow,
}: HeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-muted/40 via-background to-background py-28 md:py-40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(120,113,198,0.08),transparent_60%)]" />
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          {eyebrow && (
            <p className="text-xs uppercase tracking-[0.4rem] text-muted-foreground">{eyebrow}</p>
          )}
          <h1 className="text-4xl md:text-6xl font-serif tracking-tight text-foreground">{headline}</h1>
          <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">{subhead}</p>
          {ctaText && (
            <div className="flex items-center justify-center gap-3 pt-4">
              <Link
                href={ctaHref}
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'rounded-full px-8 shadow-sm hover:shadow-md transition'
                )}
              >
                <span>{ctaText}</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

