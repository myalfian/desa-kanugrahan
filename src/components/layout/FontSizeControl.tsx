import { Minus, Plus, Type } from 'lucide-react'
import { useFontScale, type FontScale } from '@/hooks/useFontScale'
import { cn } from '@/lib/format'

const LABEL: Record<FontScale, string> = { base: 'Normal', lg: 'Besar', xl: 'Sangat besar' }

/** Kontrol ukuran huruf A− / A / A+ — ramah lansia. */
export function FontSizeControl({ variant = 'light' }: { variant?: 'light' | 'dark' }) {
  const { scale, increase, decrease, reset } = useFontScale()
  const dark = variant === 'dark'
  const btn = cn(
    'inline-flex items-center justify-center rounded-md font-bold transition-colors',
    dark ? 'h-7 min-w-7 px-1.5 text-royal-100 hover:bg-white/10 hover:text-white' : 'h-11 min-w-11 px-2 text-slate-700 hover:bg-slate-100',
  )
  return (
    <div role="group" aria-label={`Ukuran huruf: ${LABEL[scale]}`} className={cn('flex items-center gap-1', !dark && 'rounded-xl bg-slate-50 p-1 ring-1 ring-slate-200')}>
      {!dark && <Type className="ml-2 h-4 w-4 text-slate-500" aria-hidden />}
      <button type="button" onClick={decrease} disabled={scale === 'base'} aria-label="Perkecil huruf" className={cn(btn, 'disabled:opacity-40')}>
        <Minus className="h-3.5 w-3.5" aria-hidden />
      </button>
      <button type="button" onClick={reset} aria-label="Ukuran huruf normal" className={btn}>
        A
      </button>
      <button type="button" onClick={increase} disabled={scale === 'xl'} aria-label="Perbesar huruf" className={cn(btn, 'disabled:opacity-40')}>
        <Plus className="h-3.5 w-3.5" aria-hidden />
      </button>
      <span className="sr-only" aria-live="polite">Ukuran huruf {LABEL[scale]}</span>
    </div>
  )
}
