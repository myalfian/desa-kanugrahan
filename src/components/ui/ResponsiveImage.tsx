import { cn } from '@/lib/format'

interface ResponsiveImageProps {
  /** Nama dasar file di /public/images, mis. "hero" → hero-480.avif, hero-960.webp … */
  name: string
  alt: string
  widths?: number[]
  sizes?: string
  priority?: boolean
  className?: string
  width?: number
  height?: number
}

/**
 * <picture> AVIF → WebP dengan srcset responsif.
 * Lazy-load + decoding async secara default; `priority` untuk gambar LCP.
 */
export function ResponsiveImage({
  name, alt, widths = [480, 960], sizes = '(min-width: 1024px) 33vw, 100vw',
  priority = false, className, width = 1200, height = 900,
}: ResponsiveImageProps) {
  const set = (ext: string) => widths.map((w) => `/images/${name}-${w}.${ext} ${w}w`).join(', ')
  const fallback = `/images/${name}-${widths[widths.length - 1]}.webp`
  return (
    <picture>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <source type="image/webp" srcSet={set('webp')} sizes={sizes} />
      <img
        src={fallback}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={cn('h-full w-full object-cover', className)}
      />
    </picture>
  )
}
