import { useId, useMemo, useState, type FormEvent, type KeyboardEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, ArrowRight, Sparkles, TrendingUp, TrendingDown, ShieldCheck } from 'lucide-react'
import { QUICK_SERVICES } from '@/data/home'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { formatNumber, cn } from '@/lib/format'
import { useSiteContent } from '@/context/SiteContentContext'
import type { CommodityData } from '@/data/defaultContent'

const POPULAR = ['Surat Domisili', 'KTP', 'Lacak berkas', 'Harga gabah', 'Lapor jalan rusak']

export function HeroSection() {
  const { content } = useSiteContent()
  const { siteInfo, commodities } = content

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-emerald-950">
      {/* Gambar LCP — prioritas tinggi, AVIF/WebP responsif */}
      <div className="absolute inset-0 -z-10">
        <ResponsiveImage
          name="hero"
          widths={[480, 960, 1600]}
          sizes="100vw"
          priority
          alt="Peta satelit lanskap tata ruang dan permukiman Desa Kanugrahan"
          width={1600}
          height={900}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/92 via-emerald-950/70 to-emerald-950/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
      </div>

      <div className="container-page grid items-center gap-10 pt-12 pb-28 sm:pt-16 lg:grid-cols-[1.25fr_1fr] lg:pt-20 lg:pb-36">
        <div className="animate-fade-up text-white">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-100 ring-1 ring-white/20 backdrop-blur-md">
            <ShieldCheck className="h-4 w-4 text-emerald-300" aria-hidden />
            Portal Resmi Pemerintah {siteInfo.name}
          </span>

          <h1 id="hero-title" className="mt-5 text-[2.1rem] leading-[1.1] font-extrabold tracking-tight sm:text-5xl lg:text-[3.6rem]">
            Tumbuh dari Akar,{' '}
            <span className="bg-gradient-to-r from-emerald-300 via-lime-200 to-emerald-200 bg-clip-text text-transparent">
              Berbuah untuk Semua.
            </span>
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            {(siteInfo.hashtags || ['#KembaliKeAkar', '#TaniBerdaya', '#BerkahUntukSesama']).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-200 ring-1 ring-emerald-300/30 backdrop-blur-xs transition hover:bg-emerald-400/25"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-emerald-50/90 sm:text-lg">
            Urus surat, laporkan aspirasi, pantau harga panen, hingga cek anggaran desa — semua dalam satu pintu
            layanan digital warga Kanugrahan, Pagendingan, dan Pasar Sore.
          </p>

          <QuickSearch />

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/layanan/e-administrasi" className="btn-primary bg-emerald-500 text-emerald-950 hover:bg-emerald-400">
              Ajukan Surat Online
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link to="/layanan/pengaduan" className="btn-ghost-light">
              Sampaikan Pengaduan
            </Link>
          </div>
        </div>

        <HeroPriceCard commodities={commodities} />
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Quick Search — combobox ARIA dengan saran layanan instan           */
/* ------------------------------------------------------------------ */
function QuickSearch() {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const navigate = useNavigate()
  const listId = useId()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return QUICK_SERVICES.filter(
      (s) => s.label.toLowerCase().includes(q) || s.keywords.some((k) => k.includes(q) || q.includes(k)),
    ).slice(0, 6)
  }, [query])

  const go = (href: string) => {
    setOpen(false)
    navigate(href)
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const target = results[active] ?? results[0]
    go(target ? target.href : `/layanan?q=${encodeURIComponent(query)}`)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setOpen(true)
      setActive((i) => (i + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((i) => (i - 1 + results.length) % results.length)
    } else if (e.key === 'Escape') {
      setOpen(false)
    }
  }

  const showList = open && results.length > 0

  return (
    <div className="mt-8 max-w-xl">
      <form role="search" onSubmit={onSubmit} className="relative">
        <label htmlFor="quick-search" className="sr-only">
          Cari layanan desa
        </label>
        <div className="flex items-center gap-2 rounded-2xl bg-white p-2 shadow-2xl shadow-emerald-950/40 ring-1 ring-white/50">
          <Search className="ml-2 h-5 w-5 shrink-0 text-slate-400" aria-hidden />
          <input
            id="quick-search"
            type="search"
            role="combobox"
            autoComplete="off"
            aria-expanded={showList}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={active >= 0 && showList ? `${listId}-${active}` : undefined}
            placeholder="Cari layanan: KTP, domisili, harga gabah…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setOpen(true)
              setActive(-1)
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => window.setTimeout(() => setOpen(false), 120)}
            onKeyDown={onKeyDown}
            className="min-h-12 w-full min-w-0 bg-transparent text-base text-slate-900 placeholder:text-slate-500 focus:outline-none"
          />
          <button type="submit" className="btn-accent min-h-12 shrink-0 px-4 sm:px-6">
            <span className="hidden sm:inline">Cari</span>
            <Search className="h-5 w-5 sm:hidden" aria-hidden />
            <span className="sr-only sm:hidden">Cari</span>
          </button>
        </div>

        {showList && (
          <ul
            id={listId}
            role="listbox"
            aria-label="Saran layanan"
            className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-2xl animate-fade-in"
          >
            {results.map((s, i) => (
              <li
                key={s.id}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => {
                  e.preventDefault()
                  go(s.href)
                }}
                onMouseEnter={() => setActive(i)}
                className={cn(
                  'flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5',
                  i === active ? 'bg-emerald-50' : 'hover:bg-slate-50',
                )}
              >
                <s.icon className="h-5 w-5 text-emerald-700" aria-hidden />
                <span className="flex-1">
                  <span className="block text-sm font-bold text-slate-900">{s.label}</span>
                  <span className="block text-xs text-slate-500">{s.hint}</span>
                </span>
                <ArrowRight className="h-4 w-4 text-slate-400" aria-hidden />
              </li>
            ))}
          </ul>
        )}
      </form>

      <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
        <span className="flex items-center gap-1 text-emerald-100/90">
          <Sparkles className="h-4 w-4" aria-hidden /> Populer:
        </span>
        {POPULAR.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => {
              setQuery(p)
              setOpen(true)
              document.getElementById('quick-search')?.focus()
            }}
            className="min-h-9 rounded-full bg-white/10 px-3 text-[0.82rem] font-medium text-white ring-1 ring-white/20 transition hover:bg-white/20"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Kartu kaca: bursa harga panen hari ini                             */
/* ------------------------------------------------------------------ */
function HeroPriceCard({ commodities }: { commodities: CommodityData[] }) {
  return (
    <aside
      aria-label="Harga komoditas hari ini"
      className="hidden animate-fade-up rounded-3xl bg-white/10 p-6 text-white shadow-2xl ring-1 ring-white/20 backdrop-blur-xl [animation-delay:150ms] lg:block"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-bold tracking-widest text-emerald-200 uppercase">Bursa Anugrah Tani</p>
          <p className="mt-1 text-lg font-bold">Harga Panen Hari Ini</p>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-400/20 px-2.5 py-1 text-xs font-semibold text-emerald-100">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
          </span>
          Live
        </span>
      </div>
      <ul className="mt-5 space-y-3">
        {commodities.map((c) => {
          const up = c.change >= 0
          return (
            <li key={c.name} className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/10">
              <div>
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="text-xs text-emerald-100/80">per {c.unit}</p>
              </div>
              <div className="text-right">
                <p className="text-base font-extrabold tabular-nums">Rp {formatNumber(c.price)}</p>
                <p className={cn('flex items-center justify-end gap-1 text-xs font-bold', up ? 'text-emerald-300' : 'text-rose-300')}>
                  {up ? <TrendingUp className="h-3.5 w-3.5" aria-hidden /> : <TrendingDown className="h-3.5 w-3.5" aria-hidden />}
                  {up ? '+' : ''}
                  {c.change.toLocaleString('id-ID')}%
                  <span className="sr-only">{up ? 'naik' : 'turun'} dibanding minggu lalu</span>
                </p>
              </div>
            </li>
          )
        })}
      </ul>
      <Link to="/program/tani" className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-emerald-200 hover:text-white">
        Lihat bursa & kalender tanam <ArrowRight className="h-4 w-4" aria-hidden />
      </Link>
    </aside>
  )
}
