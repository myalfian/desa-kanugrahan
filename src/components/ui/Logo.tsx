import { Link } from 'react-router-dom'
import { SITE } from '@/config/site'
import { cn } from '@/lib/format'

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn('h-10 w-10 shrink-0', className)}>
      <defs>
        <linearGradient id="lg-kanugrahan" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#059669" />
          <stop offset="1" stopColor="#1d37b0" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#lg-kanugrahan)" />
      <path d="M32 12c-7 8-11 15-11 22a11 11 0 0 0 22 0c0-7-4-14-11-22Z" fill="#fff" opacity=".95" />
      <path d="M32 22v30M32 34l-6-5M32 40l6-5" stroke="#047857" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  )
}

export function Logo({ inverted = false, onClick }: { inverted?: boolean; onClick?: () => void }) {
  return (
    <Link to="/" onClick={onClick} className="group flex items-center gap-3" aria-label={`${SITE.name} — ke beranda`}>
      <LogoMark className="transition-transform duration-300 group-hover:rotate-[-6deg]" />
      <span className="flex flex-col leading-none">
        <span className={cn('text-[1.05rem] font-extrabold tracking-tight', inverted ? 'text-white' : 'text-slate-900')}>
          {SITE.name}
        </span>
        <span className={cn('mt-1 text-[0.7rem] font-semibold tracking-wide', inverted ? 'text-emerald-100' : 'text-slate-500')}>
          Kab. {SITE.kabupaten} · Jawa Timur
        </span>
      </span>
    </Link>
  )
}
