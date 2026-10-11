import { NavLink } from 'react-router-dom'
import { Home, FileText, SearchCheck, Megaphone, LayoutGrid } from 'lucide-react'
import { cn } from '@/lib/format'

const ITEMS = [
  { label: 'Beranda', href: '/', icon: Home, end: true },
  { label: 'Layanan', href: '/layanan/e-administrasi', icon: FileText },
  { label: 'Lacak', href: '/layanan/lacak', icon: SearchCheck },
  { label: 'Aduan', href: '/layanan/pengaduan', icon: Megaphone },
]

/**
 * Bottom navigation mobile ala aplikasi Smart City —
 * aksi paling sering diletakkan di zona jangkauan ibu jari.
 */
export function MobileBottomNav({ onOpenMenu }: { onOpenMenu: () => void }) {
  const item = 'flex min-h-14 flex-1 flex-col items-center justify-center gap-1 text-[0.7rem] font-semibold'
  return (
    <nav
      aria-label="Navigasi cepat"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-lg lg:hidden"
    >
      <ul className="mx-auto flex max-w-md">
        {ITEMS.map(({ label, href, icon: Icon, end }) => (
          <li key={href} className="flex flex-1">
            <NavLink
              to={href}
              end={end}
              className={({ isActive }) => cn(item, isActive ? 'text-emerald-700' : 'text-slate-600')}
            >
              {({ isActive }) => (
                <>
                  <span className={cn('flex h-8 w-12 items-center justify-center rounded-full transition-colors', isActive && 'bg-emerald-100')}>
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          </li>
        ))}
        <li className="flex flex-1">
          <button type="button" onClick={onOpenMenu} className={cn(item, 'text-slate-600')} aria-controls="mobile-drawer">
            <span className="flex h-8 w-12 items-center justify-center rounded-full">
              <LayoutGrid className="h-5 w-5" aria-hidden />
            </span>
            Menu
          </button>
        </li>
      </ul>
    </nav>
  )
}
