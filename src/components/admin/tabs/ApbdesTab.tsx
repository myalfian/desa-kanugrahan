import { useState } from 'react'
import {
  Check,
  Info,
} from 'lucide-react'
import { useSiteContent } from '@/context/SiteContentContext'
import { formatNumber } from '@/lib/format'

export function ApbdesTab() {
  const { content, updateApbdes } = useSiteContent()
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const [tahun, setTahun] = useState(content.apbdes.tahun)
  const [pendapatanTotal, setPendapatanTotal] = useState(content.apbdes.pendapatan.total)
  const [pendapatanRealisasi, setPendapatanRealisasi] = useState(content.apbdes.pendapatan.realisasi)
  const [belanjaTotal, setBelanjaTotal] = useState(content.apbdes.belanja.total)
  const [belanjaRealisasi, setBelanjaRealisasi] = useState(content.apbdes.belanja.realisasi)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    window.setTimeout(() => setToastMessage(null), 3000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateApbdes((prev) => ({
      ...prev,
      tahun: Number(tahun) || 2026,
      updatedAt: new Date().toISOString().split('T')[0],
      pendapatan: {
        ...prev.pendapatan,
        total: Number(pendapatanTotal) || 0,
        realisasi: Number(pendapatanRealisasi) || 0,
      },
      belanja: {
        ...prev.belanja,
        total: Number(belanjaTotal) || 0,
        realisasi: Number(belanjaRealisasi) || 0,
      },
    }))
    showToast('✓ Anggaran APBDes berhasil diperbarui!')
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-2xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white shadow-xl animate-fade-in">
          <Check className="h-4 w-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">
          Transparansi APBDes
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Kelola data APBDes tahunan yang tampil pada infografis transparansi anggaran desa.
        </p>
      </div>

      <div className="card border-sky-100 bg-sky-50/60 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white">
            <Info className="h-4 w-4" />
          </span>
          <div className="text-xs text-slate-700 sm:text-sm">
            <p className="font-bold text-slate-900">Keterbukaan Informasi Publik (UU No. 14/2008):</p>
            <p className="mt-0.5 leading-relaxed">
              Infografis APBDes membantu warga melihat realisasi serapan anggaran pembangunan dan pemerintahan desa secara jujur dan transparan.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-700">Tahun Anggaran</label>
          <input
            type="number"
            value={tahun}
            onChange={(e) => setTahun(Number(e.target.value) || 2026)}
            className="mt-1 w-36 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm font-bold text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {/* Pendapatan */}
          <div className="rounded-2xl border border-emerald-100 bg-emerald-50/30 p-5 space-y-4">
            <h3 className="text-sm font-bold text-emerald-900">Pendapatan Desa</h3>

            <div>
              <label className="block text-xs font-bold text-slate-700">Target Anggaran Pendapatan (Rp)</label>
              <input
                type="number"
                value={pendapatanTotal}
                onChange={(e) => setPendapatanTotal(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-bold text-slate-900 focus:border-emerald-500 focus:outline-none"
              />
              <p className="mt-1 text-xs text-slate-500">Rp {formatNumber(pendapatanTotal)}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Realisasi Pendapatan Masuk (Rp)</label>
              <input
                type="number"
                value={pendapatanRealisasi}
                onChange={(e) => setPendapatanRealisasi(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-bold text-slate-900 focus:border-emerald-500 focus:outline-none"
              />
              <p className="mt-1 text-xs text-slate-500">Rp {formatNumber(pendapatanRealisasi)}</p>
            </div>
          </div>

          {/* Belanja */}
          <div className="rounded-2xl border border-royal-100 bg-royal-50/30 p-5 space-y-4">
            <h3 className="text-sm font-bold text-royal-900">Belanja & Pembangunan Desa</h3>

            <div>
              <label className="block text-xs font-bold text-slate-700">Target Anggaran Belanja (Rp)</label>
              <input
                type="number"
                value={belanjaTotal}
                onChange={(e) => setBelanjaTotal(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-bold text-slate-900 focus:border-royal-500 focus:outline-none"
              />
              <p className="mt-1 text-xs text-slate-500">Rp {formatNumber(belanjaTotal)}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">Realisasi Penyerapan Belanja (Rp)</label>
              <input
                type="number"
                value={belanjaRealisasi}
                onChange={(e) => setBelanjaRealisasi(Number(e.target.value) || 0)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-bold text-slate-900 focus:border-royal-500 focus:outline-none"
              />
              <p className="mt-1 text-xs text-slate-500">Rp {formatNumber(belanjaRealisasi)}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="btn-primary min-h-11 px-6 text-sm shadow-md"
          >
            <Check className="h-4 w-4" />
            <span>Simpan Nilai APBDes</span>
          </button>
        </div>
      </form>
    </div>
  )
}
