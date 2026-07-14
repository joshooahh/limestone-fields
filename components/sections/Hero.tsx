import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeroProps {
  headline: string
  subhead: string
  ctaText?: string
  ctaHref?: string
  eyebrow?: string
  /** Optional full-bleed background image (e.g. hero photo). When set, text and CTA use light styling. */
  backgroundImage?: string
  backgroundImageAlt?: string
  /**
   * Optional full-bleed background video (e.g. /videos/hero.mp4). Takes
   * priority over backgroundImage when both are set — backgroundImage is
   * still used as the <video> poster (shown before the video loads/if it
   * fails), so keep passing both. Video always autoplays muted and loops;
   * browsers require muted for autoplay to work at all.
   */
  backgroundVideo?: string
}

export default function Hero({
  headline,
  subhead,
  ctaText,
  ctaHref = '/contact',
  eyebrow,
  backgroundImage,
  backgroundImageAlt = '',
  backgroundVideo,
}: HeroProps) {
  const hasImage = Boolean(backgroundImage) || Boolean(backgroundVideo)

  return (
    <section
      className={cn(
        'relative isolate overflow-hidden py-28 md:py-40',
        !hasImage && 'bg-limestone-cream'
      )}
    >
      {hasImage && (
        <>
          <div className="absolute inset-0 -z-20">
            {backgroundVideo ? (
              <video
                className="h-full w-full object-cover"
                src={backgroundVideo}
                poster={backgroundImage}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden
              />
            ) : (
              backgroundImage && (
                <Image
                  src={backgroundImage}
                  alt={backgroundImageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
              )
            )}
          </div>
          <div className="absolute inset-0 -z-10 bg-black/40" aria-hidden />
        </>
      )}
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          {eyebrow && (
            <p
              className={cn(
                'text-xs uppercase tracking-[0.4rem]',
                hasImage ? 'text-white/90' : 'text-[#253136]/60'
              )}
            >
              {eyebrow}
            </p>
          )}
          <h1
            className={cn(
              'text-3xl md:text-[40px] font-headline leading-[1.38] tracking-tight',
              hasImage ? 'text-[#f7f2e3]' : 'text-[#253136]'
            )}
          >
            {headline}
          </h1>
          {subhead && (
            <p
              className={cn(
                'text-lg md:text-xl font-subhead leading-relaxed',
                hasImage ? 'text-white/90' : 'text-[#253136]/70'
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
                    : 'inline-flex items-center justify-center gap-2 rounded-[78px] bg-[#253136] px-8 py-2.5 text-[13px] font-subhead uppercase tracking-[0.22em] text-[#b3c1ce] transition hover:bg-[#1e282c]'
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

