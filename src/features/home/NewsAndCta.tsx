import { Link } from 'react-router-dom'
import { ArrowRight, CalendarDays, Megaphone, MapPin } from 'lucide-react'
import { SITE } from '@/config/site'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { formatDate } from '@/lib/format'
import { useSiteContent } from '@/context/SiteContentContext'

const CAT_CLS: Record<string, string> = {
  Tani: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  Dusun: 'bg-amber-50 text-amber-800 ring-amber-200',
  Diaspora: 'bg-royal-50 text-royal-800 ring-royal-200',
  'Kegiatan Pemdes': 'bg-sky-50 text-sky-800 ring-sky-200',
}

/** Kabar terbaru + 3 dusun + CTA pengaduan (LAKSA-style). */
export function NewsAndCta() {
  const { content } = useSiteContent()
  const { news } = content

  return (
    <section aria-labelledby="kabar-title" className="bg-white py-16 sm:py-24">
      <div className="container-page grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <SectionHeading
            id="kabar-title"
            eyebrow="Kabar Desa"
            title="Warta terbaru dari Kanugrahan"
            action={
              <Link to="/kabar/berita" className="inline-flex min-h-11 items-center gap-1 text-sm font-bold text-emerald-700 hover:text-emerald-900">
                Semua berita <ArrowRight className="h-4 w-4" aria-hidden />
              </Link>
            }
            className="md:mb-6"
          />
          <ul className="divide-y divide-slate-100 rounded-[var(--radius-card)] border border-slate-200 bg-white">
            {news.slice(0, 4).map((n, i) => (
              <Reveal as="li" key={n.id} delay={i * 60}>
                <Link to={n.href} className="group flex items-start gap-4 p-5 transition-colors hover:bg-slate-50 sm:p-6">
                  <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-lg font-extrabold text-slate-500 sm:flex">
                    0{i + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className={`rounded-full px-2.5 py-0.5 font-bold ring-1 ${CAT_CLS[n.category]}`}>{n.category}</span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <CalendarDays className="h-3.5 w-3.5" aria-hidden />
                        <time dateTime={n.date}>{formatDate(n.date)}</time>
                      </span>
                    </div>
                    <h3 className="mt-2 text-base leading-snug font-bold text-slate-900 group-hover:text-emerald-800 sm:text-lg">
                      {n.title}
                    </h3>
                  </div>
                  <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </ul>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {SITE.dusun.map((d) => (
              <Link
                key={d}
                to={`/profil/selayang-pandang#${d.toLowerCase().replace(/\s/g, '-')}`}
                className="card card-hover flex flex-col items-center gap-1.5 p-4 text-center"
              >
                <MapPin className="h-5 w-5 text-emerald-600" aria-hidden />
                <span className="text-xs text-slate-500">Dusun</span>
                <span className="text-sm leading-tight font-bold text-slate-900">{d}</span>
              </Link>
            ))}
          </div>
        </div>

        <Reveal delay={120}>
          <div className="relative h-full overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-br from-royal-800 via-royal-900 to-emerald-900 p-7 text-white shadow-xl sm:p-8">
            <div className="bg-pattern-dots absolute inset-0 opacity-50" aria-hidden />
            <div className="absolute -right-10 -bottom-10 h-48 w-48 rounded-full bg-emerald-400/20 blur-2xl" aria-hidden />
            <div className="relative flex h-full flex-col">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 animate-float">
                <Megaphone className="h-7 w-7 text-emerald-300" aria-hidden />
              </span>
              <h3 className="mt-6 text-2xl leading-tight font-extrabold">Ada jalan rusak atau aspirasi untuk desa?</h3>
              <p className="mt-3 text-sm leading-relaxed text-royal-100">
                Laporkan lewat Saluran Pengaduan Warga. Pilih kategori, lampirkan foto, dan pantau tindak lanjutnya secara
                transparan. Identitas pelapor dapat dirahasiakan.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2 text-xs font-semibold">
                {['Infrastruktur', 'Pelayanan', 'Sosial', 'Lingkungan', 'Keamanan'].map((c) => (
                  <li key={c} className="rounded-full bg-white/10 px-3 py-1 ring-1 ring-white/15">{c}</li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:mt-auto lg:flex-col xl:flex-row">
                <Link to="/layanan/pengaduan" className="btn-primary flex-1 bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
                  Buat Laporan
                </Link>
                <Link to="/layanan/lacak" className="btn-ghost-light flex-1">
                  Lacak Laporan
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
