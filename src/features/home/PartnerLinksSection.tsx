import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  ExternalLink,
  Building2,
  Landmark,
  ShieldCheck,
  Globe,
  SlidersHorizontal,
  ChevronRight,
  Handshake,
} from 'lucide-react'
import { useSiteContent } from '@/context/SiteContentContext'
import { CATEGORY_LABELS, type PartnerCategory } from '@/data/defaultContent'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

export function PartnerLinksSection() {
  const { content } = useSiteContent()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const activeLinks = useMemo(() => {
    return content.partnerLinks.filter((link) => link.isActive)
  }, [content.partnerLinks])

  const filteredLinks = useMemo(() => {
    if (selectedCategory === 'all') return activeLinks
    return activeLinks.filter((link) => link.category === selectedCategory)
  }, [activeLinks, selectedCategory])

  const categories: Array<{ id: string; label: string; count: number }> = useMemo(() => {
    const list = [
      { id: 'all', label: 'Semua Instansi', count: activeLinks.length },
      {
        id: 'pemkab',
        label: 'Pemkab Lamongan',
        count: activeLinks.filter((l) => l.category === 'pemkab').length,
      },
      {
        id: 'pemerintah_pusat',
        label: 'Pemerintah Pusat',
        count: activeLinks.filter((l) => l.category === 'pemerintah_pusat').length,
      },
      {
        id: 'kecamatan',
        label: 'Kecamatan & Wilayah',
        count: activeLinks.filter((l) => l.category === 'kecamatan').length,
      },
      {
        id: 'mitra_desa',
        label: 'Kolega & Mitra Desa',
        count: activeLinks.filter((l) => l.category === 'mitra_desa').length,
      },
      {
        id: 'layanan_digital',
        label: 'Layanan Publik Online',
        count: activeLinks.filter((l) => l.category === 'layanan_digital').length,
      },
    ]
    return list.filter((cat) => cat.count > 0 || cat.id === 'all')
  }, [activeLinks])

  const getCategoryIcon = (category: PartnerCategory) => {
    switch (category) {
      case 'pemkab':
        return Landmark
      case 'pemerintah_pusat':
        return ShieldCheck
      case 'kecamatan':
        return Building2
      case 'mitra_desa':
        return Handshake
      default:
        return Globe
    }
  }

  return (
    <section aria-labelledby="partner-title" className="relative border-t border-slate-200/80 bg-slate-50/70 py-16 sm:py-20">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <SectionHeading
            id="partner-title"
            eyebrow="Jejaring Pemerintahan & Mitra"
            title="Tautan Instansi & Kolega Resmi"
            description="Akses satu pintu menuju portal kementerian pusat, Pemerintah Kabupaten Lamongan, serta lembaga rekanan Desa Kanugrahan."
            className="md:mb-0"
          />

          <Link
            to="/admin"
            className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-slate-500 hover:text-emerald-700 md:self-auto"
            title="Kelola tautan ini di Dashboard Admin"
          >
            <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
            <span>Kelola di Ruang Admin</span>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>

        {/* Filter Tab Kategori */}
        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Kategori instansi">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat.id)}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-900/15'
                    : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* Grid Kartu Instansi */}
        {filteredLinks.length === 0 ? (
          <div className="card mt-8 p-12 text-center">
            <Building2 className="mx-auto h-12 w-12 text-slate-300" aria-hidden />
            <p className="mt-4 font-bold text-slate-800">Belum ada tautan pada kategori ini</p>
            <p className="mt-1 text-sm text-slate-500">
              Admin desa dapat menambahkan link website instansi melalui Dashboard Pengelola.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredLinks.map((item, idx) => {
              const IconComponent = getCategoryIcon(item.category)
              const catInfo = CATEGORY_LABELS[item.category]

              return (
                <Reveal key={item.id} delay={idx * 40}>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card card-hover group flex h-full flex-col justify-between p-5 transition-all duration-200 hover:border-emerald-300 hover:bg-white"
                  >
                    <div>
                      {/* Top Bar Card */}
                      <div className="flex items-start justify-between gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100 transition-colors group-hover:bg-emerald-600 group-hover:text-white">
                          <IconComponent className="h-5 w-5" aria-hidden />
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[0.7rem] font-bold tracking-wide ring-1 ${catInfo.badgeCls}`}
                        >
                          {item.badgeText || catInfo.label}
                        </span>
                      </div>

                      {/* Info Instansi */}
                      <div className="mt-4">
                        <h3 className="text-[1.05rem] leading-snug font-bold text-slate-900 group-hover:text-emerald-700">
                          {item.name}
                        </h3>
                        <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Action Link */}
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
                      <span className="font-mono text-slate-400 group-hover:text-emerald-600 truncate max-w-[170px]">
                        {item.url.replace(/^https?:\/\//, '')}
                      </span>
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 group-hover:underline">
                        Kunjungi
                        <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                      </span>
                    </div>
                  </a>
                </Reveal>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
