import { Link } from 'react-router-dom'
import {
  Globe,
  CheckCircle2,
  Lock,
  Sparkles,
  HelpCircle,
} from 'lucide-react'
import { Logo } from '@/components/ui/Logo'
import { useSiteContent } from '@/context/SiteContentContext'

interface AdminHeaderProps {
  onOpenHelp: () => void
  onLogout: () => void
}

export function AdminHeader({ onOpenHelp, onLogout }: AdminHeaderProps) {
  const { lastSaved } = useSiteContent()

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 shadow-xs backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand & Badge Admin */}
        <div className="flex items-center gap-3">
          <Logo />
          <span className="hidden h-5 w-px bg-slate-200 sm:block" aria-hidden />
          <div className="hidden sm:block">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-800 ring-1 ring-emerald-200">
              <Sparkles className="h-3 w-3 text-emerald-600" aria-hidden />
              Ruang Pengelola Desa
            </span>
          </div>
        </div>

        {/* Status Sync & Aksi Cepat */}
        <div className="flex items-center gap-3">
          {/* Status Auto-save ramah pemula */}
          <div className="hidden items-center gap-1.5 text-xs text-slate-500 md:flex">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" aria-hidden />
            <span>
              Tersimpan otomatis
              {lastSaved ? ` (${lastSaved})` : ''}
            </span>
          </div>

          {/* Tombol Bantuan */}
          <button
            type="button"
            onClick={onOpenHelp}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-100"
            title="Panduan mudah untuk admin"
          >
            <HelpCircle className="h-4 w-4 text-emerald-700" aria-hidden />
            <span className="hidden sm:inline">Panduan</span>
          </button>

          {/* Tombol Lihat Website Langsung */}
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary min-h-10 px-3.5 py-1 text-xs"
            title="Buka website warga di tab baru untuk melihat perubahan"
          >
            <Globe className="h-4 w-4" aria-hidden />
            <span>Lihat Website</span>
          </Link>

          {/* Tombol Keluar */}
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex min-h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 hover:border-rose-200"
            title="Keluar dari sesi admin"
          >
            <Lock className="h-3.5 w-3.5" aria-hidden />
            <span className="hidden sm:inline">Keluar</span>
          </button>
        </div>
      </div>
    </header>
  )
}
