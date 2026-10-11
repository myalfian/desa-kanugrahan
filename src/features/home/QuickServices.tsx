import { Link } from 'react-router-dom'
import { ArrowUpRight, LayoutGrid } from 'lucide-react'
import { QUICK_SERVICES, TONE_CLASSES } from '@/data/home'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'

/** Grid Quick Service Badges ala Tangerang LIVE — target sentuh ≥ 48px. */
export function QuickServices() {
  return (
    <section aria-labelledby="layanan-title" className="py-16 sm:py-20">
      <div className="container-page">
        <SectionHeading
          id="layanan-title"
          eyebrow="Layanan Satu Pintu"
          title={<>Akses cepat layanan <span className="text-emerald-700">warga desa</span></>}
          description="Pilih layanan yang Anda butuhkan. Pengajuan online, tanpa antre, dan bisa dilacak kapan saja."
          action={
            <Link to="/layanan" className="btn-outline">
              <LayoutGrid className="h-4 w-4" aria-hidden /> Semua Layanan
            </Link>
          }
        />

        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4 sm:gap-4 lg:grid-cols-6">
          {QUICK_SERVICES.map((s, i) => {
            const tone = TONE_CLASSES[s.tone]
            return (
              <Reveal as="li" key={s.id} delay={i * 35}>
                <Link
                  to={s.href}
                  className="card card-hover group relative flex h-full flex-col items-center gap-3 px-2 py-5 text-center sm:px-3 sm:py-6"
                >
                  <ArrowUpRight
                    className="absolute top-3 right-3 h-4 w-4 text-slate-300 opacity-0 transition group-hover:text-emerald-600 group-hover:opacity-100"
                    aria-hidden
                  />
                  <span
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ring-1 transition-transform duration-300 group-hover:scale-110 ${tone.bg} ${tone.text} ${tone.ring}`}
                  >
                    <s.icon className="h-7 w-7" strokeWidth={1.8} aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[0.85rem] leading-tight font-bold text-slate-900 sm:text-[0.95rem]">{s.label}</span>
                    <span className="mt-1 hidden text-xs text-slate-600 sm:block">{s.hint}</span>
                  </span>
                </Link>
              </Reveal>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
