import { useState, useRef } from 'react'
import {
  Download,
  Upload,
  RotateCcw,
  ShieldAlert,
  CheckCircle,
  HelpCircle,
  FileJson,
} from 'lucide-react'
import { useSiteContent } from '@/context/SiteContentContext'

export function BackupTab() {
  const { exportData, importData, resetToDefault } = useSiteContent()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [statusMsg, setStatusMsg] = useState<string | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string)
        const ok = importData(json)
        if (ok) {
          setStatusMsg('✓ Berhasil memulihkan seluruh data website dari berkas cadangan!')
        }
      } catch (err) {
        alert('Gagal membaca berkas cadangan. Pastikan format berkas valid.')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">
          Cadangan & Pemulihan Data
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Simpan salinan data konten website desa ke komputer Anda atau pulihkan data bila diperlukan.
        </p>
      </div>

      {statusMsg && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-900 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-emerald-600" />
          <span>{statusMsg}</span>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Unduh Cadangan */}
        <div className="card p-6 flex flex-col justify-between">
          <div>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
              <Download className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-bold text-slate-900">
              Unduh Berkas Cadangan (Backup)
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Simpan seluruh tulisan, tautan instansi pemerintah, berita, dan harga komoditas ke dalam 1 berkas kecil di laptop atau flashdisk.
            </p>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={exportData}
              className="btn-primary w-full min-h-11 text-xs shadow-md"
            >
              <Download className="h-4 w-4" />
              <span>Unduh Cadangan Sekarang</span>
            </button>
          </div>
        </div>

        {/* Pulihkan Cadangan */}
        <div className="card p-6 flex flex-col justify-between">
          <div>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-royal-50 text-royal-700 ring-1 ring-royal-100">
              <Upload className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-bold text-slate-900">
              Pulihkan dari Berkas Cadangan
            </h3>
            <p className="mt-1 text-xs text-slate-600 leading-relaxed">
              Gunakan fitur ini jika Anda ingin mengembalikan data website dari berkas cadangan yang sebelumnya pernah diunduh.
            </p>
          </div>

          <div className="mt-6">
            <input
              type="file"
              ref={fileInputRef}
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn-outline w-full min-h-11 text-xs"
            >
              <FileJson className="h-4 w-4 text-royal-700" />
              <span>Pilih Berkas Cadangan (.json)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reset ke Pengaturan Asal */}
      <div className="card border-rose-200 bg-rose-50/30 p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-700">
            <ShieldAlert className="h-5 w-5" />
          </span>
          <div className="flex-1">
            <h3 className="text-base font-bold text-rose-950">
              Kembalikan ke Data Asal (Reset Pabrik)
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-slate-600">
              Jika terjadi kesalahan atau ingin mengembalikan contoh data resmi Desa Kanugrahan seperti semula, Anda dapat menekan tombol di bawah. Tindakan ini memerlukan konfirmasi Anda.
            </p>
            <button
              type="button"
              onClick={resetToDefault}
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-rose-300 bg-white px-4 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-50"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Kembalikan ke Data Semula</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kontak Bantuan Teknis */}
      <div className="card p-6 bg-slate-50/50">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-emerald-700" />
          <span>Butuh Bantuan Lebih Lanjut?</span>
        </h3>
        <p className="mt-1 text-xs text-slate-600">
          Jika mengalami kendala pengisian website atau butuh panduan tambahan, hubungi tim pendamping digital desa atau tim PPID Desa Kanugrahan.
        </p>
      </div>
    </div>
  )
}
