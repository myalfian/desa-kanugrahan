import { useState } from 'react'
import {
  Wheat,
  Plus,
  Trash2,
  TrendingUp,
  TrendingDown,
  Check,
  Info,
} from 'lucide-react'
import { useSiteContent } from '@/context/SiteContentContext'

export function CommodityTab() {
  const { content, updateCommodity, addCommodity, deleteCommodity } = useSiteContent()
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [newCommodityName, setNewCommodityName] = useState('')
  const [newCommodityPrice, setNewCommodityPrice] = useState('')
  const [newCommodityUnit, setNewCommodityUnit] = useState('kg')
  const [newCommodityChange, setNewCommodityChange] = useState('0')

  const showToast = (msg: string) => {
    setToastMessage(msg)
    window.setTimeout(() => setToastMessage(null), 3000)
  }

  const handlePriceChange = (index: number, newPriceStr: string) => {
    const val = Number(newPriceStr.replace(/\D/g, ''))
    if (!isNaN(val)) {
      const cur = content.commodities[index]
      updateCommodity(index, { ...cur, price: val })
    }
  }

  const handlePercentChange = (index: number, changeVal: number) => {
    const cur = content.commodities[index]
    updateCommodity(index, { ...cur, change: changeVal })
  }

  const handleAddCommodity = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCommodityName.trim()) {
      alert('Mohon isi nama komoditas panen.')
      return
    }
    const priceNum = Number(newCommodityPrice.replace(/\D/g, '')) || 0
    const changeNum = parseFloat(newCommodityChange) || 0

    addCommodity({
      name: newCommodityName.trim(),
      unit: newCommodityUnit.trim() || 'kg',
      price: priceNum,
      change: changeNum,
    })

    setNewCommodityName('')
    setNewCommodityPrice('')
    setNewCommodityChange('0')
    showToast('✓ Komoditas panen baru berhasil ditambahkan!')
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-2xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white shadow-xl animate-fade-in">
          <Check className="h-4 w-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">
          Bursa Harga Panen (Anugrah Tani)
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Perbarui harga pasar komoditas petani harian yang tampil di kartu utama beranda website.
        </p>
      </div>

      {/* Info Tips */}
      <div className="card border-amber-100 bg-amber-50/60 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-amber-600 text-white">
            <Info className="h-4 w-4" />
          </span>
          <div className="text-xs text-slate-700 sm:text-sm">
            <p className="font-bold text-slate-900">Petunjuk Update Harga Panen:</p>
            <p className="mt-0.5 leading-relaxed">
              Ketik harga terbaru dalam Rupiah. Perubahan harga akan otomatis langsung terlihat oleh petani desa saat membuka website.
            </p>
          </div>
        </div>
      </div>

      {/* Daftar Komoditas */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.commodities.map((item, index) => {
          const isUp = item.change >= 0

          return (
            <div key={item.name + index} className="card p-5 relative border-slate-200">
              <div className="flex items-start justify-between">
                <div>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <Wheat className="h-5 w-5" />
                  </span>
                  <h3 className="mt-3 text-base font-bold text-slate-900">{item.name}</h3>
                  <p className="text-xs text-slate-500">Satuan per {item.unit}</p>
                </div>

                {content.commodities.length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Hapus komoditas ${item.name}?`)) {
                        deleteCommodity(index)
                        showToast('✓ Komoditas dihapus.')
                      }
                    }}
                    className="rounded-lg p-1 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                    title="Hapus komoditas ini"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Input Harga */}
              <div className="mt-4">
                <label className="block text-xs font-bold text-slate-700">
                  Harga Hari Ini (Rp)
                </label>
                <div className="mt-1 relative">
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-xs font-bold text-slate-400">
                    Rp
                  </span>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handlePriceChange(index, e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pr-3 pl-9 text-base font-extrabold text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Status Tren / Perubahan */}
              <div className="mt-3">
                <label className="block text-xs font-bold text-slate-700">
                  Perubahan dibanding minggu lalu (%)
                </label>
                <div className="mt-1 flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    value={item.change}
                    onChange={(e) => handlePercentChange(index, parseFloat(e.target.value) || 0)}
                    className="w-24 rounded-xl border border-slate-200 bg-slate-50/50 px-2.5 py-1.5 text-xs font-bold text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                  />
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-bold ${
                      isUp ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {isUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                    <span>{isUp ? '+' : ''}{item.change}%</span>
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Form Tambah Komoditas Baru */}
      <div className="card border-dashed border-2 border-slate-300 p-6 bg-slate-50/50">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Plus className="h-5 w-5 text-emerald-700" />
          <span>Tambah Komoditas Tani Baru</span>
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          Misalnya komoditas musiman seperti Semangka, Kedelai, Tembakau, atau Ikan Bandeng tambak.
        </p>

        <form onSubmit={handleAddCommodity} className="mt-4 grid gap-3 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-slate-700">Nama Komoditas</label>
            <input
              type="text"
              required
              placeholder="Contoh: Kedelai Hitam"
              value={newCommodityName}
              onChange={(e) => setNewCommodityName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700">Satuan</label>
            <input
              type="text"
              required
              placeholder="kg / ikat"
              value={newCommodityUnit}
              onChange={(e) => setNewCommodityUnit(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700">Harga (Rp)</label>
            <input
              type="number"
              required
              placeholder="Contoh: 12500"
              value={newCommodityPrice}
              onChange={(e) => setNewCommodityPrice(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="btn-primary w-full min-h-10 text-xs shadow-sm"
            >
              <Plus className="h-4 w-4" />
              <span>Tambahkan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
