import { Users, Sprout, MapPinned, Globe2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { type Metric } from '@/data/home'
import { useInView } from '@/hooks/useInView'
import { useCountUp } from '@/hooks/useCountUp'
import { formatNumber } from '@/lib/format'
import { useSiteContent } from '@/context/SiteContentContext'

const ICONS: Record<string, { icon: LucideIcon; cls: string }> = {
  penduduk: { icon: Users, cls: 'bg-royal-50 text-royal-700 ring-royal-100' },
  lahan: { icon: Sprout, cls: 'bg-emerald-50 text-emerald-700 ring-emerald-100' },
  dusun: { icon: MapPinned, cls: 'bg-amber-50 text-amber-700 ring-amber-100' },
  diaspora: { icon: Globe2, cls: 'bg-sky-50 text-sky-700 ring-sky-100' },
}

/** Quick Metrics Bar — menumpang di tepi bawah hero. */
export function StatsWidget() {
  const { ref, inView } = useInView<HTMLDivElement>()
  const { content } = useSiteContent()
  const { metrics } = content

  return (
    <section aria-labelledby="stats-title" className="relative z-10 -mt-20 lg:-mt-24">
      <h2 id="stats-title" className="sr-only">Statistik utama desa</h2>
      <div className="container-page">
        <div ref={ref} className="card grid grid-cols-2 divide-slate-100 p-2 sm:p-3 lg:grid-cols-4 lg:divide-x">
          {metrics.map((m) => (
            <StatItem key={m.id} metric={m} start={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatItem({ metric, start }: { metric: Metric; start: boolean }) {
  const value = useCountUp(metric.value, start)
  const { icon: Icon, cls } = ICONS[metric.id]
  return (
    <div className="flex flex-col gap-3 rounded-2xl p-4 sm:flex-row sm:items-center lg:p-5">
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ring-1 ${cls}`}>
        <Icon className="h-6 w-6" aria-hidden />
      </span>
      <div className="min-w-0">
        <p className="text-2xl font-extrabold tracking-tight text-slate-900 tabular-nums sm:text-[1.75rem]">
          <span aria-hidden>{formatNumber(value)}{metric.suffix}</span>
          <span className="sr-only">{formatNumber(metric.value)}{metric.suffix}</span>
        </p>
        <p className="text-sm font-bold text-slate-800">{metric.label}</p>
        <p className="mt-0.5 text-xs leading-snug text-slate-600">{metric.note}</p>
      </div>
    </div>
  )
}
