import type { CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '@/hooks/useInView'
import { cn } from '@/lib/format'

interface RevealProps {
  as?: ElementType
  delay?: number
  className?: string
  children: ReactNode
}

/** Animasi masuk saat scroll — murni CSS + IntersectionObserver, 0 dependensi. */
export function Reveal({ as: Tag = 'div', delay = 0, className, children }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>()
  const style: CSSProperties | undefined = delay ? { animationDelay: `${delay}ms` } : undefined
  return (
    <Tag ref={ref} style={style} className={cn('reveal', inView && 'is-visible', className)}>
      {children}
    </Tag>
  )
}
