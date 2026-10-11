import { useEffect, useId, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Menu, Clock, Phone, ArrowRight, MapPin } from 'lucide-react'
import { NAVIGATION, type NavGroup } from '@/config/navigation'
import { SITE, fullRegion } from '@/config/site'
import { Logo } from '@/components/ui/Logo'
import { FontSizeControl } from './FontSizeControl'
import { cn } from '@/lib/format'

interface NavbarProps {
  drawerOpen: boolean
  onOpenDrawer: () => void
}

/**
 * Navbar sticky dua tingkat:
 *  1. Utility bar (desktop) — wilayah, jam layanan, kontrol ukuran huruf.
 *  2. Main bar — logo, mega menu desktop (hover/klik/keyboard), CTA, hamburger mobile.
 */
export function Navbar({ drawerOpen, onOpenDrawer }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)
  const location = useLocation()
  const navRef = useRef<HTMLElement>(null)

  // Bayangan saat menggulir (passive listener → tidak memblok scroll)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Tutup dropdown ketika rute berubah
  useEffect(() => {
    setOpenId(null)
  }, [location.pathname])

  // Klik di luar & tombol Escape menutup mega menu
  useEffect(() => {
    if (!openId) return
    const onDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenId(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        document.getElementById(`trigger-${openId}`)?.focus()
        setOpenId(null)
      }
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [openId])

  return (
    <header className="sticky top-0 z-50">
      {/* ---------- Utility bar ---------- */}
      <div className="hidden bg-royal-950 text-[0.8rem] text-royal-100 lg:block">
        <div className="container-page flex h-10 items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-emerald-300" aria-hidden />
              {fullRegion}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-emerald-300" aria-hidden />
              Layanan Balai Desa: {SITE.contact.hours}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a href={`tel:${SITE.contact.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:text-white">
              <Phone className="h-3.5 w-3.5 text-emerald-300" aria-hidden />
              {SITE.contact.phone}
            </a>
            <FontSizeControl variant="dark" />
          </div>
        </div>
      </div>

      {/* ---------- Main bar ---------- */}
      <nav
        ref={navRef}
        aria-label="Navigasi utama"
        className={cn(
          'border-b transition-[background-color,box-shadow,border-color] duration-300',
          scrolled
            ? 'border-slate-200/80 bg-white/90 shadow-[0_8px_30px_-12px_rgb(15_23_42/0.18)] backdrop-blur-xl'
            : 'border-transparent bg-white',
        )}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[4.5rem]">
          <Logo />

          <ul className="hidden items-center gap-0.5 lg:flex">
            {NAVIGATION.map((group) => (
              <DesktopNavItem
                key={group.id}
                group={group}
                open={openId === group.id}
                onOpen={() => setOpenId(group.id)}
                onClose={() => setOpenId((cur) => (cur === group.id ? null : cur))}
                onToggle={() => setOpenId((cur) => (cur === group.id ? null : group.id))}
              />
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Link to="/layanan/e-administrasi" className="btn-primary hidden min-h-11 px-4 text-sm xl:inline-flex">
              Layanan Mandiri
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <button
              type="button"
              onClick={onOpenDrawer}
              aria-label="Buka menu navigasi"
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-slate-800 ring-1 ring-slate-200 transition hover:bg-slate-100 lg:hidden"
            >
              <Menu className="h-6 w-6" aria-hidden />
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}

/* ------------------------------------------------------------------ */

interface DesktopNavItemProps {
  group: NavGroup
  open: boolean
  onOpen: () => void
  onClose: () => void
  onToggle: () => void
}

function DesktopNavItem({ group, open, onOpen, onClose, onToggle }: DesktopNavItemProps) {
  const panelId = useId()
  const location = useLocation()
  const closeTimer = useRef<number | undefined>(undefined)
  const isActive = group.href === '/' ? location.pathname === '/' : location.pathname.startsWith(group.href)

  const baseLink =
    'relative inline-flex h-11 items-center gap-1 rounded-lg px-3 text-[0.92rem] font-semibold transition-colors'
  const activeBar =
    "after:absolute after:inset-x-3 after:-bottom-[0.9rem] after:h-[3px] after:rounded-full after:bg-emerald-600 after:content-['']"

  if (!group.children) {
    return (
      <li>
        <NavLink
          to={group.href}
          end
          className={({ isActive: a }) =>
            cn(baseLink, a ? `text-emerald-800 ${activeBar}` : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900')
          }
        >
          {group.label}
        </NavLink>
      </li>
    )
  }

  // Hover intent: jeda singkat agar menu tidak "berkedip" saat kursor lewat
  const enter = () => {
    window.clearTimeout(closeTimer.current)
    onOpen()
  }
  const leave = () => {
    closeTimer.current = window.setTimeout(onClose, 140)
  }

  return (
    <li className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button
        id={`trigger-${group.id}`}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={cn(
          baseLink,
          open ? 'bg-slate-100 text-slate-900' : isActive ? `text-emerald-800 ${activeBar}` : 'text-slate-700 hover:bg-slate-100',
        )}
      >
        {group.label}
        <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')} aria-hidden />
      </button>

      {open && (
        <div
          id={panelId}
          className="absolute top-full left-1/2 z-50 w-[min(40rem,90vw)] -translate-x-1/2 pt-3 animate-fade-in"
        >
          <div className="grid grid-cols-[13rem_1fr] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/15">
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-800 to-royal-900 p-5 text-white">
              <div className="bg-pattern-dots absolute inset-0 opacity-60" aria-hidden />
              <div className="relative">
                <p className="text-xs font-bold tracking-widest text-emerald-200 uppercase">{group.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-emerald-50">{group.blurb}</p>
                <Link
                  to={group.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-white underline-offset-4 hover:underline"
                >
                  Lihat semua <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
            <ul className="grid gap-1 p-3">
              {group.children.map((item) => (
                <li key={item.href}>
                  <NavLink
                    to={item.href}
                    className={({ isActive: a }) =>
                      cn(
                        'group flex items-start gap-3 rounded-xl p-3 transition-colors',
                        a ? 'bg-emerald-50' : 'hover:bg-slate-50',
                      )
                    }
                  >
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                      <item.icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-[0.92rem] font-bold text-slate-900">{item.label}</span>
                      <span className="mt-0.5 block text-[0.8rem] leading-snug text-slate-600">{item.description}</span>
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  )
}
