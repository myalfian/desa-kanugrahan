import type { ReactNode } from 'react'
import { cn } from '@/lib/format'

interface SectionHeadingProps {
  id?: string
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  action?: ReactNode
  className?: string
}

export function SectionHeading({ id, eyebrow, title, description, align = 'left', action, className }: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-8 flex flex-col gap-4 md:mb-10',
        align === 'center' ? 'items-center text-center' : 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-2xl', align === 'center' && 'mx-auto')}>
        {eyebrow && <span className="eyebrow mb-3">{eyebrow}</span>}
        <h2 id={id} className="text-2xl leading-tight font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-[2.25rem]">
          {title}
        </h2>
        {description && <p className="mt-3 text-base leading-relaxed text-slate-600 sm:text-lg">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
