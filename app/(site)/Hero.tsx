import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface HeroProps {
  headline: string
  subhead: string
  ctaText?: string
  ctaHref?: string
  eyebrow?: string
  backgroundImage?: string
  backgroundImageAlt?: string
}

export default function Hero({
  headline,
  subhead,
  ctaText,
  ctaHref = '/contact',
  eyebrow,
  backgroundImage,
  backgroundImageAlt = '',
}: HeroProps) {
  const hasImage = Boolean(backgroundImage)

  return (
    <section
      className={cn(
        // Fix: was py-28 md:py-40 — caused short, cramped hero
        // Now uses min-h-[75vh] + flex centering to match Figma full-bleed hero
        'relative isolate overflow-hidden min-h-[75vh] flex items-center',
        !hasImage && 'bg-gradient-to-br from-muted/40 via-background to-background'
      )}
    >
      {hasImage && (
        <>
          <div className="absolute inset-0 -z-20">
            <Image
              src={backgroundImage!}
              alt={backgroundImageAlt}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>
          <div className="absolute inset-0 -z-10 bg-black/35" aria-hidden />
        </>
      )}
      {!hasImage && (
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(120,113,198,0.08),transparent_60%)]" />
      )}
      <div className="container mx-auto px-6 w-full">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          {eyebrow && (
            <p
              className={cn(
                'text-xs uppercase tracking-[0.4rem]',
                hasImage ? 'text-white/90' : 'text-muted-foreground'
              )}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              'text-3xl md:text-[40px] font-headline leading-[1.38] tracking-tight',
              hasImage ? 'text-[#f7f2e3]' : 'text-foreground'
            )}
          >
            {headline}
          </h1>
          {subhead && (
            <p
              className={cn(
                'text-lg md:text-xl font-subhead leading-relaxed',
                hasImage ? 'text-white/90' : 'text-muted-foreground'
              )}
            >
              {subhead}
            </p>
          )}
          {ctaText && (
            <div className="flex items-center justify-center gap-3 pt-4">
              <Link
                href={ctaHref}
                className={cn(
                  hasImage
                    ? 'inline-flex items-center justify-center gap-2 rounded-[78px] border border-white/30 bg-[rgba(247,242,228,0.25)] px-8 py-2.5 text-[15px] font-subhead uppercase tracking-[0.22em] text-[#f7f2e4] backdrop-blur-[2px] transition hover:bg-[rgba(247,242,228,0.35)]'
                    : cn(
                        buttonVariants({ size: 'lg' }),
                        'rounded-full px-8 shadow-sm hover:shadow-md transition'
                      )
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
