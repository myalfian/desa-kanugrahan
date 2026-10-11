import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Clock, ExternalLink, LockKeyhole } from 'lucide-react'
import { NAVIGATION } from '@/config/navigation'
import { Logo } from '@/components/ui/Logo'
import { useSiteContent } from '@/context/SiteContentContext'

export function Footer() {
  const { content } = useSiteContent()
  const { siteInfo, partnerLinks } = content
  const groups = NAVIGATION.filter((g) => g.children)
  const activePartners = partnerLinks.filter((p) => p.isActive).slice(0, 5)

  return (
    <footer className="relative overflow-hidden bg-royal-950 text-royal-100" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">Informasi kontak dan tautan</h2>
      <div className="bg-pattern-dots pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div className="container-page relative grid gap-10 py-14 lg:grid-cols-[1.3fr_2fr] lg:py-16">
        <div>
          <Logo inverted />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-royal-200">
            “{siteInfo.tagline}” — Portal resmi Pemerintah {siteInfo.name}, kanal satu pintu layanan publik,
            informasi, dan transparansi desa.
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2 text-xs font-semibold text-emerald-300">
            {(siteInfo.hashtags || ['#KembaliKeAkar', '#TaniBerdaya', '#BerkahUntukSesama']).map((tag) => (
              <span key={tag} className="hover:text-emerald-200 transition-colors">
                {tag}
              </span>
            ))}
          </div>
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
              {siteInfo.contact.address}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
              {siteInfo.contact.phone}
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
              {siteInfo.contact.email}
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
              {siteInfo.contact.hours}
            </li>
          </ul>

          {/* Tautan Instansi Pemerintah Pilihan */}
          {activePartners.length > 0 && (
            <div className="mt-8">
              <p className="text-xs font-bold tracking-wider text-emerald-300 uppercase">
                Tautan Instansi Terkait
              </p>
              <ul className="mt-3 space-y-1.5 text-xs">
                {activePartners.map((item) => (
                  <li key={item.id}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-royal-200 hover:text-emerald-300 transition-colors"
                    >
                      <span>{item.name}</span>
                      <ExternalLink className="h-3 w-3 opacity-70" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {groups.slice(0, 6).map((g) => (
            <div key={g.id}>
              <h3 className="text-sm font-bold tracking-wide text-white">{g.label}</h3>
              <ul className="mt-3 space-y-2">
                {g.children!.map((c) => (
                  <li key={c.href}>
                    <Link to={c.href} className="inline-block py-1 text-sm text-royal-200 transition-colors hover:text-emerald-300">
                      {c.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-5 pb-24 text-xs text-royal-300 sm:flex-row sm:items-center sm:justify-between lg:pb-5">
          <p>© {new Date().getFullYear()} Pemerintah {siteInfo.name}, Kec. {siteInfo.kecamatan}, Kab. {siteInfo.kabupaten}.</p>
          <div className="flex items-center gap-4">
            <p>Dikelola oleh Tim Pengelola Informasi & Dokumentasi (PPID) Desa.</p>
            <span className="hidden sm:inline text-white/20">|</span>
            <Link
              to="/admin"
              className="inline-flex items-center gap-1 font-semibold text-emerald-300 hover:text-white transition-colors"
              title="Akses khusus pengelola dan staf desa"
            >
              <LockKeyhole className="h-3 w-3" />
              <span>Admin Desa</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
