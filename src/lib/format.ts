const idr = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 })
const num = new Intl.NumberFormat('id-ID')

export const formatRupiah = (v: number) => idr.format(v)
export const formatNumber = (v: number) => num.format(v)

/** Ringkas: 2.486.500.000 → "Rp 2,49 M" */
export function formatRupiahShort(v: number): string {
  const abs = Math.abs(v)
  const fmt = (n: number, unit: string) =>
    `Rp ${n.toLocaleString('id-ID', { maximumFractionDigits: 2 })} ${unit}`
  if (abs >= 1e9) return fmt(v / 1e9, 'M')
  if (abs >= 1e6) return fmt(v / 1e6, 'jt')
  if (abs >= 1e3) return fmt(v / 1e3, 'rb')
  return formatRupiah(v)
}

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })

export const percent = (part: number, total: number) => (total ? Math.round((part / total) * 1000) / 10 : 0)

export const cn = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(' ')
