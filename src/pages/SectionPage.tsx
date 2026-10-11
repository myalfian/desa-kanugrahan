import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Construction, ArrowLeft } from 'lucide-react'
import { ALL_ROUTES, NAVIGATION } from '@/config/navigation'
import { SITE } from '@/config/site'

/**
 * Halaman kerangka untuk modul yang belum dibangun.
 * Menjaga semua tautan IA tetap valid (tanpa 404) selama pengembangan bertahap.
 */
export default function SectionPage() {
  const { pathname } = useLocation()
  const route = ALL_ROUTES.find((r) => r.href === pathname)
  const group = NAVIGATION.find((g) => g.href !== '/' && pathname.startsWith(g.href))
  const title = route?.label ?? 'Halaman tidak ditemukan'

  useEffect(() => {
    document.title = `${title} — ${SITE.name}`
  }, [title])

  return (
    <section className="bg-gradient-to-b from-emerald-50 to-slate-50">
      <div className="container-page py-12 sm:py-16">
        <nav aria-label="Breadcrumb" className="text-sm">
          <ol className="flex flex-wrap items-center gap-1 text-slate-600">
            <li><Link to="/" className="hover:text-emerald-700">Beranda</Link></li>
            {group && (
              <>
                <ChevronRight className="h-4 w-4" aria-hidden />
                <li><Link to={group.href} className="hover:text-emerald-700">{group.label}</Link></li>
              </>
            )}
            {route && route.href !== group?.href && (
              <>
                <ChevronRight className="h-4 w-4" aria-hidden />
                <li aria-current="page" className="font-semibold text-slate-900">{route.label}</li>
              </>
            )}
          </ol>
        </nav>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">{title}</h1>

        <div className="card mt-8 flex flex-col items-start gap-4 p-8 sm:flex-row sm:items-center">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-100">
            <Construction className="h-7 w-7" aria-hidden />
          </span>
          <div className="flex-1">
            <p className="font-bold text-slate-900">Modul sedang dalam pengembangan</p>
            <p className="mt-1 text-sm text-slate-600">
              {route ? 'Halaman ini akan segera tersedia. ' : 'Alamat yang Anda tuju tidak tersedia. '}
              Untuk keperluan mendesak hubungi Balai Desa di {SITE.contact.phone}.
            </p>
          </div>
          <Link to="/" className="btn-outline">
            <ArrowLeft className="h-4 w-4" aria-hidden /> Kembali ke Beranda
          </Link>
        </div>

        {group?.children && (
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {group.children.map((c) => (
              <li key={c.href}>
                <Link to={c.href} className="card card-hover flex items-center gap-3 p-4">
                  <c.icon className="h-5 w-5 text-emerald-700" aria-hidden />
                  <span className="text-sm font-bold text-slate-900">{c.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
