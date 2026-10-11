import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { PILLARS, type Pillar } from '@/data/home'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ResponsiveImage } from '@/components/ui/ResponsiveImage'
import { Reveal } from '@/components/ui/Reveal'
import { cn } from '@/lib/format'

const ACCENT: Record<Pillar['accent'], { chip: string; check: string; link: string; num: string }> = {
  emerald: { chip: 'bg-emerald-600', check: 'bg-emerald-100 text-emerald-700', link: 'text-emerald-700 hover:text-emerald-900', num: 'text-emerald-700' },
  royal: { chip: 'bg-royal-700', check: 'bg-royal-100 text-royal-700', link: 'text-royal-700 hover:text-royal-900', num: 'text-royal-700' },
  amber: { chip: 'bg-amber-600', check: 'bg-amber-100 text-amber-800', link: 'text-amber-800 hover:text-amber-950', num: 'text-amber-700' },
}

/** Showcase 3 Pilar Program Unggulan. */
export function PillarShowcase() {
  return (
    <section aria-labelledby="pilar-title" className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-emerald-100/60 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-royal-100/60 blur-3xl" aria-hidden />

      <div className="container-page relative">
        <SectionHeading
          id="pilar-title"
          eyebrow="Program Unggulan"
          align="center"
          title={<>Tiga pilar ekosistem <span className="text-emerald-700">Desa Kanugrahan</span></>}
          description="Petani berdaulat, perantau yang pulang membawa manfaat, dan pemuda yang berkarya — bergerak bersama membangun desa."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((p, i) => {
            const a = ACCENT[p.accent]
            return (
              <Reveal as="article" key={p.id} delay={i * 90} className="h-full">
                <div className="card card-hover group flex h-full flex-col overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ResponsiveImage
                      name={p.image}
                      alt={`Ilustrasi program ${p.title}`}
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/10 to-transparent" />
                    <span className={cn('absolute top-4 left-4 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg', a.chip)}>
                      Pilar {i + 1}
                    </span>
                    <div className="absolute inset-x-4 bottom-4 text-white">
                      <p className="text-xs font-semibold tracking-wide text-white/85">{p.tagline}</p>
                      <h3 className="mt-0.5 text-xl font-extrabold">{p.title}</h3>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[0.95rem] leading-relaxed text-slate-600">{p.description}</p>
                    <ul className="mt-5 space-y-2.5">
                      {p.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2.5 text-sm font-medium text-slate-800">
                          <span className={cn('flex h-5 w-5 items-center justify-center rounded-full', a.check)}>
                            <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden />
                          </span>
                          {h}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto flex items-end justify-between gap-4 border-t border-slate-100 pt-5">
                      <div>
                        <p className={cn('text-xl font-extrabold tabular-nums', a.num)}>{p.stat.value}</p>
                        <p className="text-xs text-slate-600">{p.stat.label}</p>
                      </div>
                      <Link
                        to={p.href}
                        className={cn('inline-flex min-h-11 items-center gap-1 text-sm font-bold', a.link)}
                        aria-label={`Jelajahi program ${p.title}`}
                      >
                        Jelajahi
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
