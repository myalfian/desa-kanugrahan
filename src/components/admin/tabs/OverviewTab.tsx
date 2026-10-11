import {
  Link2,
  Newspaper,
  Wheat,
  PhoneCall,
  ArrowRight,
  Sparkles,
  Info,
  Building,
  ExternalLink,
} from 'lucide-react'
import { useSiteContent } from '@/context/SiteContentContext'

interface OverviewTabProps {
  onNavigateTab: (tabId: string) => void
}

export function OverviewTab({ onNavigateTab }: OverviewTabProps) {
  const { content } = useSiteContent()

  const activeLinks = content.partnerLinks.filter((l) => l.isActive).length
  const totalNews = content.news.length
  const totalCommodities = content.commodities.length
  const population = content.metrics.find((m) => m.id === 'penduduk')?.value || 0

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Banner Sambutan Ramah */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-royal-800 p-6 text-white shadow-xl sm:p-8">
        <div className="bg-pattern-dots absolute inset-0 opacity-40" aria-hidden />
        <div className="relative z-10 max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-emerald-100 ring-1 ring-white/20">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Panel Pengelola Konten Desa Kanugrahan
          </span>
          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
            Selamat Datang, Bapak/Ibu Staf Pengelola Desa!
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-emerald-100 sm:text-base">
            Halaman ini dirancang khusus agar Anda dapat memperbarui informasi desa dengan mudah dan aman tanpa perlu keahlian teknis pemrograman.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => onNavigateTab('partner-links')}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-emerald-950 shadow-md transition hover:bg-emerald-50 active:scale-95"
            >
              <Link2 className="h-4 w-4 text-emerald-700" aria-hidden />
              <span>Kelola Link Instansi Pemerintah</span>
              <ArrowRight className="h-3.5 w-3.5 text-emerald-700" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('news')}
              className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2.5 text-xs font-bold text-white ring-1 ring-white/30 backdrop-blur-sm transition hover:bg-white/30 active:scale-95"
            >
              <Newspaper className="h-4 w-4" aria-hidden />
              <span>Tulis Kabar Desa Baru</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Kartu Ringkasan Data */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Tautan Instansi */}
        <div className="card p-5 transition hover:border-emerald-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
              <Link2 className="h-5 w-5" aria-hidden />
            </span>
            <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-bold text-emerald-800">
              {activeLinks} Aktif
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-extrabold text-slate-900">{content.partnerLinks.length}</p>
            <p className="text-sm font-bold text-slate-700">Tautan Instansi & Mitra</p>
            <p className="mt-1 text-xs text-slate-500">Pemkab Lamongan, Kementerian, dll.</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('partner-links')}
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:underline"
          >
            Buka modul tautan <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Kabar Desa */}
        <div className="card p-5 transition hover:border-royal-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-50 text-royal-700 ring-1 ring-royal-100">
              <Newspaper className="h-5 w-5" aria-hidden />
            </span>
            <span className="rounded-full bg-royal-100 px-2 py-0.5 text-xs font-bold text-royal-800">
              Publikasi
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-extrabold text-slate-900">{totalNews}</p>
            <p className="text-sm font-bold text-slate-700">Warta & Berita Desa</p>
            <p className="mt-1 text-xs text-slate-500">Artikel kegiatan dusun & tani</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('news')}
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-royal-700 hover:underline"
          >
            Kelola berita <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Bursa Panen */}
        <div className="card p-5 transition hover:border-amber-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-100">
              <Wheat className="h-5 w-5" aria-hidden />
            </span>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
              Hari Ini
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-extrabold text-slate-900">{totalCommodities}</p>
            <p className="text-sm font-bold text-slate-700">Komoditas Bursa Tani</p>
            <p className="mt-1 text-xs text-slate-500">Gabah, jagung, cabai dsb.</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('commodities')}
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:underline"
          >
            Ubah harga panen <ArrowRight className="h-3 w-3" />
          </button>
        </div>

        {/* Kontak Desa */}
        <div className="card p-5 transition hover:border-sky-200 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
              <PhoneCall className="h-5 w-5" aria-hidden />
            </span>
            <span className="rounded-full bg-sky-100 px-2 py-0.5 text-xs font-bold text-sky-800">
              Siap Warga
            </span>
          </div>
          <div className="mt-4">
            <p className="text-2xl font-extrabold text-slate-900">{population.toLocaleString('id-ID')}</p>
            <p className="text-sm font-bold text-slate-700">Warga Terlayani</p>
            <p className="mt-1 text-xs text-slate-500">Kec. Maduran, Kab. Lamongan</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('identity')}
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-sky-700 hover:underline"
          >
            Kontak & balai desa <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Panduan 3 Langkah Ramah Non-IT */}
      <div className="card border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-white p-6 sm:p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <Info className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Panduan 3 Langkah Memperbarui Website untuk Pemula
            </h3>
            <p className="text-xs text-slate-600">
              Sangat sederhana, tidak ada kode rumit yang perlu Anda ketik!
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-extrabold text-emerald-800">
              1
            </span>
            <h4 className="mt-3 text-sm font-bold text-slate-900">Pilih Menu yang Ingin Diubah</h4>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              Klik menu di sebelah kiri seperti <strong>Tautan Instansi</strong>, <strong>Kabar Desa</strong>, atau <strong>Harga Panen</strong>.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-royal-100 text-sm font-extrabold text-royal-800">
              2
            </span>
            <h4 className="mt-3 text-sm font-bold text-slate-900">Isi Formulir dengan Mudah</h4>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              Ketik tulisan atau angka pada kolom yang disediakan. Setiap kolom dilengkapi contoh tulisan yang jelas.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-extrabold text-emerald-800">
              3
            </span>
            <h4 className="mt-3 text-sm font-bold text-slate-900">Simpan & Perubahan Langsung Aktif</h4>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              Klik tombol hijau <strong>"Simpan"</strong>. Website publik warga langsung terperbarui saat itu juga!
            </p>
          </div>
        </div>
      </div>

      {/* Pratinjau Tautan Instansi Terkini */}
      <div className="card p-6">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h3 className="text-base font-bold text-slate-900">Tautan Instansi & Mitra yang Sedang Tayang</h3>
            <p className="text-xs text-slate-500">Tautan ini muncul di halaman depan website desa.</p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('partner-links')}
            className="btn-outline min-h-9 px-3 text-xs"
          >
            + Tambah Instansi Lain
          </button>
        </div>

        <div className="mt-5 divide-y divide-slate-100 rounded-xl border border-slate-200 bg-slate-50/50">
          {content.partnerLinks.slice(0, 4).map((link) => (
            <div key={link.id} className="flex items-center justify-between gap-4 p-3.5 sm:px-4">
              <div className="flex items-center gap-3 min-w-0">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white ring-1 ring-slate-200 text-emerald-700">
                  <Building className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{link.name}</p>
                  <p className="text-xs text-slate-500 font-mono truncate">{link.url}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span
                  className={`hidden sm:inline-flex rounded-full px-2 py-0.5 text-[0.7rem] font-bold ${
                    link.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {link.isActive ? 'Tayang' : 'Disembunyikan'}
                </span>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-emerald-700"
                  title="Buka link"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
