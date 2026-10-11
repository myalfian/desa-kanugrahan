import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDownToLine, ArrowRight, Wallet, Receipt, Landmark, Info } from 'lucide-react'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { useInView } from '@/hooks/useInView'
import { formatRupiah, formatRupiahShort, formatDate, percent, cn } from '@/lib/format'
import { useSiteContent } from '@/context/SiteContentContext'
import type { ApbdesData } from '@/data/defaultContent'

/** Cuplikan Infografis APBDes — donut SVG murni (tanpa library chart, 0 KB tambahan). */
export function ApbdesSnapshot() {
  const { content } = useSiteContent()
  const APBDES = content.apbdes
  const { pendapatan, belanja, pembiayaan } = APBDES
  const surplus = pendapatan.total - belanja.total
  const pembiayaanNetto = pembiayaan.penerimaan - pembiayaan.pengeluaran

  return (
    <section aria-labelledby="apbdes-title" className="py-16 sm:py-24">
      <div className="container-page">
        <SectionHeading
          id="apbdes-title"
          eyebrow={`Transparansi · APBDes ${APBDES.tahun}`}
          title={<>Anggaran desa, <span className="text-royal-700">terbuka untuk semua</span></>}
          description={<>Ringkasan Anggaran Pendapatan & Belanja Desa. Data diperbarui {formatDate(APBDES.updatedAt)}.</>}
          action={
            <Link to="/transparansi/apbdes" className="btn-accent">
              Infografis Lengkap <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          }
        />

        {/* 3 kartu ringkasan */}
        <div className="grid gap-4 md:grid-cols-3">
          <SummaryCard
            icon={Wallet}
            label="Pendapatan"
            total={pendapatan.total}
            realisasi={pendapatan.realisasi}
            tahun={APBDES.tahun}
            tone="emerald"
            delay={0}
          />
          <SummaryCard
            icon={Receipt}
            label="Belanja"
            total={belanja.total}
            realisasi={belanja.realisasi}
            tahun={APBDES.tahun}
            tone="royal"
            delay={80}
          />
          <Reveal delay={160} className="card flex flex-col p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700 ring-1 ring-amber-100">
                <Landmark className="h-5 w-5" aria-hidden />
              </span>
              <p className="text-sm font-bold text-slate-700">Pembiayaan</p>
            </div>
            <p className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 tabular-nums">{formatRupiahShort(pembiayaanNetto)}</p>
            <p className="text-xs text-slate-600">Pembiayaan netto (SiLPA {APBDES.tahun - 1})</p>
            <div className="mt-auto rounded-xl bg-slate-50 p-3 pt-3 text-xs text-slate-700 ring-1 ring-slate-100">
              <span className="font-semibold">{surplus < 0 ? 'Defisit' : 'Surplus'} anggaran:</span>{' '}
              <span className={cn('font-bold tabular-nums', surplus < 0 ? 'text-rose-700' : 'text-emerald-700')}>
                {formatRupiahShort(surplus)}
              </span>{' '}
              — {surplus < 0 ? 'ditutup oleh' : 'ditambah'} pembiayaan netto.
            </div>
          </Reveal>
        </div>

        {/* Komposisi belanja */}
        <Reveal className="card mt-6 grid gap-8 p-6 sm:p-8 lg:grid-cols-[18rem_1fr] lg:items-center">
          <BelanjaDonut belanja={belanja} />
          <div>
            <h3 className="text-lg font-extrabold text-slate-900">Komposisi Belanja per Bidang</h3>
            <p className="mt-1 text-sm text-slate-600">Total belanja {formatRupiah(belanja.total)}</p>
            <ul className="mt-5 space-y-4">
              {belanja.rincian.map((r) => {
                const pct = percent(r.value, belanja.total)
                const barColor = r.color || '#10b981'
                return (
                  <li key={r.label}>
                    <div className="flex items-baseline justify-between gap-3 text-sm">
                      <span className="flex items-center gap-2 font-semibold text-slate-800">
                        <span className="h-3 w-3 shrink-0 rounded-sm" style={{ backgroundColor: barColor }} aria-hidden />
                        {r.label}
                      </span>
                      <span className="shrink-0 text-slate-600 tabular-nums">
                        <span className="font-bold text-slate-900">{pct.toLocaleString('id-ID')}%</span> · {formatRupiahShort(r.value)}
                      </span>
                    </div>
                    <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: barColor }} />
                    </div>
                  </li>
                )
              })}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Link to="/transparansi/dokumen" className="btn-outline min-h-11 text-sm">
                <ArrowDownToLine className="h-4 w-4" aria-hidden /> Unduh Perdes APBDes
              </Link>
              <p className="flex items-center gap-1.5 text-xs text-slate-500">
                <Info className="h-3.5 w-3.5" aria-hidden /> Sumber: Siskeudes Desa Kanugrahan
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

interface SummaryCardProps {
  icon: typeof Wallet
  label: string
  total: number
  realisasi: number
  tahun: number
  tone: 'emerald' | 'royal'
  delay: number
}

function SummaryCard({ icon: Icon, label, total, realisasi, tahun, tone, delay }: SummaryCardProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const pct = percent(realisasi, total)
  const t =
    tone === 'emerald'
      ? { icon: 'bg-emerald-50 text-emerald-700 ring-emerald-100', bar: 'bg-gradient-to-r from-emerald-500 to-emerald-700', txt: 'text-emerald-700' }
      : { icon: 'bg-royal-50 text-royal-700 ring-royal-100', bar: 'bg-gradient-to-r from-royal-500 to-royal-800', txt: 'text-royal-700' }
  return (
    <Reveal delay={delay} className="card p-6">
      <div ref={ref}>
        <div className="flex items-center gap-3">
          <span className={cn('flex h-11 w-11 items-center justify-center rounded-xl ring-1', t.icon)}>
            <Icon className="h-5 w-5" aria-hidden />
          </span>
          <p className="text-sm font-bold text-slate-700">{label}</p>
        </div>
        <p className="mt-4 text-2xl font-extrabold tracking-tight text-slate-900 tabular-nums">{formatRupiahShort(total)}</p>
        <p className="text-xs text-slate-600">Anggaran {tahun}</p>
        <div className="mt-5">
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-slate-700">Realisasi</span>
            <span className={cn('font-bold tabular-nums', t.txt)}>{pct.toLocaleString('id-ID')}%</span>
          </div>
          <div
            className="mt-2 h-2.5 overflow-hidden rounded-full bg-slate-100"
            role="progressbar"
            aria-label={`Realisasi ${label}`}
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className={cn('h-full rounded-full transition-[width] duration-[1200ms] ease-out', t.bar)}
              style={{ width: inView ? `${pct}%` : '0%' }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-600 tabular-nums">{formatRupiah(realisasi)} terealisasi</p>
        </div>
      </div>
    </Reveal>
  )
}

interface Segment {
  len: number
  offset: number
  color: string
  label: string
  value: number
}

function BelanjaDonut({ belanja }: { belanja: ApbdesData['belanja'] }) {
  const [hover, setHover] = useState<number | null>(null)
  const R = 70
  const C = 2 * Math.PI * R
  const segments = belanja.rincian.reduce<Segment[]>(
    (acc: Segment[], r) => {
      const prev = acc[acc.length - 1]
      const offset = prev ? prev.offset + prev.len : 0
      acc.push({
        len: (r.value / (belanja.total || 1)) * C,
        offset,
        color: r.color || '#10b981',
        label: r.label,
        value: r.value,
      })
      return acc
    },
    [],
  )
  const active = hover !== null ? segments[hover] : null

  return (
    <figure className="relative mx-auto w-full max-w-[18rem]">
      <svg viewBox="0 0 180 180" className="w-full -rotate-90" role="img" aria-label="Diagram donat komposisi belanja desa per bidang">
        <circle cx="90" cy="90" r={R} fill="none" stroke="#f1f5f9" strokeWidth="22" />
        {segments.map((s: Segment, i: number) => (
          <circle
            key={s.label}
            cx="90"
            cy="90"
            r={R}
            fill="none"
            stroke={s.color}
            strokeWidth={hover === i ? 26 : 22}
            strokeDasharray={`${Math.max(s.len - 2, 0)} ${C}`}
            strokeDashoffset={-s.offset}
            className="cursor-pointer transition-[stroke-width,opacity] duration-200"
            opacity={hover === null || hover === i ? 1 : 0.35}
            onMouseEnter={() => setHover(i)}
            onMouseLeave={() => setHover(null)}
          />
        ))}
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        {active ? (
          <>
            <span className="text-[0.72rem] font-bold text-slate-500 uppercase">{active.label}</span>
            <span className="text-xl font-extrabold text-slate-900 tabular-nums">{formatRupiahShort(active.value)}</span>
            <span className="text-xs text-slate-600">{percent(active.value, belanja.total).toLocaleString('id-ID')}%</span>
          </>
        ) : (
          <>
            <span className="text-xs font-semibold text-slate-500">Total Belanja</span>
            <span className="text-xl font-extrabold text-slate-900 tabular-nums">{formatRupiahShort(belanja.total)}</span>
            <span className="text-[0.7rem] text-slate-400">Sorot bidang</span>
          </>
        )}
      </div>
    </figure>
  )
}
