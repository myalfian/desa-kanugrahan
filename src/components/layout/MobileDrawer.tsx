import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { X, ChevronDown, ArrowRight, Phone, MessageCircle, SearchCheck } from 'lucide-react'
import { NAVIGATION, GROUP_ICONS } from '@/config/navigation'
import { SITE } from '@/config/site'
import { Logo } from '@/components/ui/Logo'
import { FontSizeControl } from './FontSizeControl'
import { cn } from '@/lib/format'

interface MobileDrawerProps {
  open: boolean
  onClose: () => void
}

/**
 * Off-canvas drawer mobile:
 * - Akordeon per grup menu (satu terbuka sekaligus)
 * - Focus trap, Escape untuk menutup, kunci scroll body, kembalikan fokus
 * - CTA & kontrol ukuran huruf di zona ibu jari (bawah)
 */
export function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  const location = useLocation()
  const panelRef = useRef<HTMLDivElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)
  const activeGroup = NAVIGATION.find((g) => g.href !== '/' && location.pathname.startsWith(g.href))?.id ?? null
  const [expanded, setExpanded] = useState<string | null>(activeGroup)

  // Tutup saat navigasi
  useEffect(() => {
    onClose()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    lastFocus.current = document.activeElement as HTMLElement
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    const panel = panelRef.current
    panel?.querySelector<HTMLElement>('[data-autofocus]')?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab' || !panel) return
      const focusables = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
      lastFocus.current?.focus()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] lg:hidden" role="presentation">
      <button
        type="button"
        aria-label="Tutup menu"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm animate-fade-in"
      />
      <div
        id="mobile-drawer"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu navigasi"
        className="absolute inset-y-0 right-0 flex w-[min(24rem,92vw)] flex-col bg-white shadow-2xl animate-drawer-in"
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
          <Logo onClick={onClose} />
          <button
            type="button"
            data-autofocus
            onClick={onClose}
            aria-label="Tutup menu navigasi"
            className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-slate-700 ring-1 ring-slate-200 hover:bg-slate-100"
          >
            <X className="h-6 w-6" aria-hidden />
          </button>
        </div>

        {/* Isi menu */}
        <nav aria-label="Navigasi mobile" className="flex-1 overflow-y-auto overscroll-contain px-3 py-4">
          <Link
            to="/layanan/lacak"
            className="mb-4 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-royal-700 to-royal-900 p-4 text-white shadow-lg shadow-royal-900/20"
          >
            <SearchCheck className="h-6 w-6 shrink-0 text-emerald-300" aria-hidden />
            <span className="flex-1">
              <span className="block text-sm font-bold">Lacak Pengajuan Berkas</span>
              <span className="block text-xs text-royal-100">Masukkan nomor resi atau NIK</span>
            </span>
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Link>

          <ul className="space-y-1">
            {NAVIGATION.map((group) => {
              const Icon = GROUP_ICONS[group.id]
              if (!group.children) {
                return (
                  <li key={group.id}>
                    <NavLink
                      to={group.href}
                      end
                      className={({ isActive }) =>
                        cn(
                          'flex min-h-14 items-center gap-3 rounded-xl px-3 text-base font-bold',
                          isActive ? 'bg-emerald-50 text-emerald-800' : 'text-slate-800 hover:bg-slate-50',
                        )
                      }
                    >
                      <Icon className="h-5 w-5 text-emerald-700" aria-hidden />
                      {group.label}
                    </NavLink>
                  </li>
                )
              }
              const isOpen = expanded === group.id
              const regionId = `drawer-${group.id}`
              return (
                <li key={group.id}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={regionId}
                    onClick={() => setExpanded(isOpen ? null : group.id)}
                    className={cn(
                      'flex min-h-14 w-full items-center gap-3 rounded-xl px-3 text-left text-base font-bold transition-colors',
                      isOpen || activeGroup === group.id ? 'bg-slate-50 text-slate-900' : 'text-slate-800 hover:bg-slate-50',
                    )}
                  >
                    <Icon className="h-5 w-5 text-emerald-700" aria-hidden />
                    <span className="flex-1">{group.label}</span>
                    <ChevronDown className={cn('h-5 w-5 text-slate-500 transition-transform', isOpen && 'rotate-180')} aria-hidden />
                  </button>
                  <div
                    id={regionId}
                    className={cn('grid transition-[grid-template-rows] duration-300', isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}
                  >
                    <ul className="overflow-hidden" hidden={!isOpen}>
                      {group.children.map((item) => (
                        <li key={item.href}>
                          <NavLink
                            to={item.href}
                            className={({ isActive }) =>
                              cn(
                                'ml-5 flex min-h-12 items-center gap-3 border-l-2 py-2 pr-2 pl-4',
                                isActive ? 'border-emerald-600 text-emerald-800' : 'border-slate-200 text-slate-700 hover:border-emerald-300',
                              )
                            }
                          >
                            <item.icon className="h-[1.1rem] w-[1.1rem] shrink-0 text-slate-500" aria-hidden />
                            <span>
                              <span className="block text-[0.95rem] font-semibold">{item.label}</span>
                              <span className="block text-xs text-slate-500">{item.description}</span>
                            </span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Footer drawer — zona ibu jari */}
        <div className="space-y-3 border-t border-slate-100 bg-slate-50/80 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <FontSizeControl />
          <div className="grid grid-cols-2 gap-2">
            <a href={`tel:${SITE.contact.phone.replace(/\s/g, '')}`} className="btn-outline text-sm">
              <Phone className="h-4 w-4" aria-hidden /> Telepon
            </a>
            <a
              href={`https://wa.me/${SITE.contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm"
            >
              <MessageCircle className="h-4 w-4" aria-hidden /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
