import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

export type LogoVariant = 'primary' | 'secondary'
export type LogoTheme = 'light' | 'dark' | 'auto'

interface LogoProps {
  variant?: LogoVariant
  theme?: LogoTheme
  href?: string
  className?: string
  width?: number
  height?: number
  priority?: boolean
}

/**
 * Logo component for Limestone Fields
 * 
 * @param variant - 'primary' (with heron mark) or 'secondary' (text-only)
 * @param theme - 'light' (for dark backgrounds), 'dark' (for light backgrounds), or 'auto' (detects based on background)
 * @param href - Optional link destination (defaults to '/')
 * @param className - Additional CSS classes
 * @param width - Logo width (defaults to auto)
 * @param height - Logo height (defaults to auto)
 * @param priority - Whether to prioritize image loading (for above-the-fold logos)
 */
export default function Logo({
  variant = 'primary',
  theme = 'auto',
  href = '/',
  className,
  width,
  height,
  priority = false,
}: LogoProps) {
  // Determine which logo file to use
  const getLogoPath = () => {
    const logoTheme = theme === 'auto' ? 'light' : theme
    const format = 'svg' // Prefer SVG for scalability
    
    if (variant === 'primary') {
      return `/logos/primary/logo-${logoTheme}.${format}`
    } else {
      return `/logos/secondary/logo-${logoTheme}.${format}`
    }
  }

  const logoPath = getLogoPath()
  
  // Default dimensions based on variant
  const defaultWidth = variant === 'primary' ? 200 : 180
  const defaultHeight = variant === 'primary' ? 70 : 50

  const logoImage = (
    <Image
      src={logoPath}
      alt="Limestone Fields"
      width={width || defaultWidth}
      height={height || defaultHeight}
      className={cn('h-auto w-auto', className)}
      priority={priority}
    />
  )

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logoImage}
      </Link>
    )
  }

  return logoImage
}
