import { useState } from 'react'
import {
  Users,
  Sprout,
  MapPinned,
  Globe2,
  Check,
  Info,
} from 'lucide-react'
import { useSiteContent } from '@/context/SiteContentContext'

export function StatisticsTab() {
  const { content, updateMetric } = useSiteContent()
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    window.setTimeout(() => setToastMessage(null), 3000)
  }

  const handleUpdate = (id: string, value: number, note: string) => {
    updateMetric(id, { value, note })
    showToast('✓ Data statistik desa berhasil diperbarui!')
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
          Data & Statistik Utama Desa
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Angka-angka ini tampil pada bilah statistik animasi (Stats Widget) di bagian atas halaman beranda.
        </p>
      </div>

      <div className="card border-sky-100 bg-sky-50/60 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-sky-600 text-white">
            <Info className="h-4 w-4" />
          </span>
          <div className="text-xs text-slate-700 sm:text-sm">
            <p className="font-bold text-slate-900">Petunjuk Data:</p>
            <p className="mt-0.5 leading-relaxed">
              Anda dapat memperbarui data kependudukan, luas sawah produktif, dusun, dan diaspora terdaftar sesuai pemutakhiran data semesteran desa.
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {content.metrics.map((m) => (
          <div key={m.id} className="card p-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                {m.id === 'penduduk' && <Users className="h-5 w-5" />}
                {m.id === 'lahan' && <Sprout className="h-5 w-5" />}
                {m.id === 'dusun' && <MapPinned className="h-5 w-5" />}
                {m.id === 'diaspora' && <Globe2 className="h-5 w-5" />}
              </span>
              <div>
                <h3 className="text-base font-bold text-slate-900">{m.label}</h3>
                <p className="text-xs text-slate-500">ID Metrik: {m.id}</p>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">
                Jumlah / Nilai Angka {m.suffix ? `(${m.suffix.trim()})` : ''}
              </label>
              <input
                type="number"
                value={m.value}
                onChange={(e) => {
                  const val = parseInt(e.target.value, 10) || 0
                  handleUpdate(m.id, val, m.note)
                }}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-base font-extrabold text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700">
                Keterangan Singkat / Catatan Kaki
              </label>
              <input
                type="text"
                value={m.note}
                onChange={(e) => handleUpdate(m.id, m.value, e.target.value)}
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
