import { useState, useMemo } from 'react'
import {
  Plus,
  Search,
  ExternalLink,
  Edit2,
  Trash2,
  Check,
  Building2,
  Landmark,
  ShieldCheck,
  Handshake,
  Globe,
  Eye,
  Info,
  X,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react'
import { useSiteContent } from '@/context/SiteContentContext'
import {
  CATEGORY_LABELS,
  type PartnerCategory,
  type PartnerLink,
} from '@/data/defaultContent'

export function PartnerLinksTab() {
  const {
    content,
    addPartnerLink,
    updatePartnerLink,
    deletePartnerLink,
    togglePartnerLink,
  } = useSiteContent()

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState<string>('all')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<PartnerLink | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Form State
  const [name, setName] = useState('')
  const [category, setCategory] = useState<PartnerCategory>('pemkab')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [badgeText, setBadgeText] = useState('')
  const [isActive, setIsActive] = useState(true)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    window.setTimeout(() => setToastMessage(null), 3500)
  }

  const openAddModal = () => {
    setEditingItem(null)
    setName('')
    setCategory('pemkab')
    setUrl('')
    setDescription('')
    setBadgeText('')
    setIsActive(true)
    setModalOpen(true)
  }

  const openEditModal = (item: PartnerLink) => {
    setEditingItem(item)
    setName(item.name)
    setCategory(item.category)
    setUrl(item.url)
    setDescription(item.description)
    setBadgeText(item.badgeText || '')
    setIsActive(item.isActive)
    setModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      alert('Mohon isi nama instansi atau kolega.')
      return
    }

    let finalUrl = url.trim()
    if (!finalUrl) {
      alert('Mohon masukkan alamat website.')
      return
    }

    // Auto-fix URL bila belum memakai http/https
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl
    }

    if (editingItem) {
      updatePartnerLink(editingItem.id, {
        name: name.trim(),
        category,
        url: finalUrl,
        description: description.trim(),
        badgeText: badgeText.trim() || undefined,
        isActive,
      })
      showToast('✓ Tautan instansi berhasil diperbarui!')
    } else {
      addPartnerLink({
        name: name.trim(),
        category,
        url: finalUrl,
        description: description.trim(),
        badgeText: badgeText.trim() || undefined,
        isActive,
      })
      showToast('✓ Tautan instansi baru berhasil ditambahkan!')
    }

    setModalOpen(false)
  }

  const handleDelete = (id: string) => {
    deletePartnerLink(id)
    setDeleteConfirmId(null)
    showToast('✓ Tautan instansi berhasil dihapus.')
  }

  // Filter & Search
  const filteredLinks = useMemo(() => {
    return content.partnerLinks.filter((item) => {
      const matchSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchCat = selectedFilter === 'all' || item.category === selectedFilter
      return matchSearch && matchCat
    })
  }, [content.partnerLinks, searchQuery, selectedFilter])

  const getCategoryIcon = (cat: PartnerCategory) => {
    switch (cat) {
      case 'pemkab':
        return Landmark
      case 'pemerintah_pusat':
        return ShieldCheck
      case 'kecamatan':
        return Building2
      case 'mitra_desa':
        return Handshake
      default:
        return Globe
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Toast Notifikasi */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-2xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white shadow-xl animate-fade-in">
          <Check className="h-4 w-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Tab */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Tautan Instansi Pemerintah & Kolega Desa
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Kelola alamat website rekanan pemerintah kabupaten, kementerian, kecamatan, dan mitra desa.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="btn-primary flex items-center gap-2 self-start sm:self-auto shadow-md"
        >
          <Plus className="h-5 w-5" />
          <span>Tambah Tautan Baru</span>
        </button>
      </div>

      {/* Tips Ramah Non-IT */}
      <div className="card border-emerald-100 bg-emerald-50/60 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
            <Info className="h-4 w-4" />
          </span>
          <div className="text-xs text-slate-700 sm:text-sm">
            <p className="font-bold text-slate-900">Petunjuk untuk Pengelola Desa:</p>
            <p className="mt-0.5 leading-relaxed">
              Tautan yang statusnya <strong>"Tayang"</strong> akan langsung muncul di halaman beranda website desa bagian <em>Tautan Instansi & Kolega</em> serta di bagian bawah website (footer). Anda dapat mematikan sakelar jika instansi tersebut sedang tidak ingin ditampilkan sementara waktu.
            </p>
          </div>
        </div>
      </div>

      {/* Pencarian & Filter Bar */}
      <div className="card p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama instansi atau alamat web…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50/50 py-2 pr-4 pl-9 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              aria-label="Filter berdasarkan kategori"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:border-emerald-500 focus:outline-none"
            >
              <option value="all">Semua Kategori ({content.partnerLinks.length})</option>
              <option value="pemkab">Pemkab Lamongan</option>
              <option value="pemerintah_pusat">Pemerintah Pusat</option>
              <option value="kecamatan">Kecamatan & Wilayah</option>
              <option value="mitra_desa">Kolega & Mitra Desa</option>
              <option value="layanan_digital">Layanan Digital</option>
            </select>
          </div>
        </div>
      </div>

      {/* Daftar Tautan */}
      {filteredLinks.length === 0 ? (
        <div className="card p-12 text-center">
          <Building2 className="mx-auto h-12 w-12 text-slate-300" />
          <p className="mt-3 text-base font-bold text-slate-800">
            Tidak ada tautan yang sesuai
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Coba ubah kata kunci pencarian atau klik tombol "Tambah Tautan Baru".
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredLinks.map((item) => {
            const Icon = getCategoryIcon(item.category)
            const catInfo = CATEGORY_LABELS[item.category]

            return (
              <div
                key={item.id}
                className={`card relative flex flex-col justify-between p-5 transition-all ${
                  item.isActive
                    ? 'border-slate-200 bg-white hover:border-emerald-300'
                    : 'border-dashed border-slate-300 bg-slate-50/80 opacity-75'
                }`}
              >
                <div>
                  {/* Top Bar Item */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <span
                          className={`inline-block rounded-full px-2 py-0.5 text-[0.7rem] font-bold ring-1 ${catInfo.badgeCls}`}
                        >
                          {item.badgeText || catInfo.label}
                        </span>
                        <h3 className="mt-1 text-base font-bold text-slate-900 line-clamp-1">
                          {item.name}
                        </h3>
                      </div>
                    </div>

                    {/* Sakelar Aktif/Nonaktif */}
                    <button
                      type="button"
                      onClick={() => togglePartnerLink(item.id)}
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-bold transition ${
                        item.isActive
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                      }`}
                      title={item.isActive ? 'Klik untuk sembunyikan' : 'Klik untuk tayangkan'}
                    >
                      {item.isActive ? (
                        <>
                          <ToggleRight className="h-4 w-4 text-emerald-700" />
                          <span>Tayang</span>
                        </>
                      ) : (
                        <>
                          <ToggleLeft className="h-4 w-4 text-slate-500" />
                          <span>Sembunyi</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Keterangan */}
                  <p className="mt-3 text-xs leading-relaxed text-slate-600 line-clamp-2">
                    {item.description || 'Tidak ada deskripsi singkat.'}
                  </p>

                  {/* Alamat Web */}
                  <div className="mt-3 flex items-center gap-2 text-xs">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-emerald-700 hover:underline max-w-[280px] truncate"
                    >
                      <Globe className="h-3 w-3 shrink-0" />
                      <span>{item.url}</span>
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>
                  </div>
                </div>

                {/* Tombol Aksi di Bawah Kartu */}
                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className="text-[0.7rem] text-slate-400">
                    Diperbarui: {item.updatedAt || 'Terbaru'}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => openEditModal(item)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-emerald-400 hover:text-emerald-700"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      <span>Ubah</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(item.id)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-rose-600 hover:border-rose-400 hover:bg-rose-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Modal Tambah / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="card max-h-[90vh] w-full max-w-xl overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                  <Building2 className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editingItem ? 'Perbarui Tautan Instansi' : 'Tambah Tautan Instansi Baru'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Isi formulir berikut untuk memuat tautan di website desa
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              {/* Nama Instansi */}
              <div>
                <label className="block text-xs font-bold text-slate-800">
                  Nama Instansi / Lembaga / Kolega <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Pemerintah Kabupaten Lamongan"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
                <p className="mt-1 text-[0.75rem] text-slate-500">
                  Ketik nama lengkap instansi yang mudah dimengerti warga.
                </p>
              </div>

              {/* Kategori */}
              <div>
                <label className="block text-xs font-bold text-slate-800">
                  Kategori Instansi <span className="text-rose-500">*</span>
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as PartnerCategory)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="pemkab">Pemerintah Kabupaten Lamongan (Pemkab)</option>
                  <option value="pemerintah_pusat">Pemerintah Pusat / Kementerian</option>
                  <option value="kecamatan">Pemerintah Kecamatan & Wilayah</option>
                  <option value="mitra_desa">Kolega & Mitra Kerja Sama Desa (BUMDes, dll)</option>
                  <option value="layanan_digital">Layanan Publik Online (BPJS, Satu Data, dll)</option>
                </select>
              </div>

              {/* Alamat Website (URL) */}
              <div>
                <label className="block text-xs font-bold text-slate-800">
                  Alamat Website (Link URL) <span className="text-rose-500">*</span>
                </label>
                <div className="mt-1 flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Contoh: https://lamongankab.go.id"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm font-mono text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                  />
                  {url && (
                    <a
                      href={url.startsWith('http') ? url : `https://${url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline shrink-0 min-h-10 px-3 text-xs"
                      title="Uji coba membuka website ini di tab baru"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      <span>Uji Buka</span>
                    </a>
                  )}
                </div>
                <p className="mt-1 text-[0.75rem] text-slate-500">
                  Boleh tanpa menuliskan https:// (sistem akan otomatis menambahkannya).
                </p>
              </div>

              {/* Keterangan Singkat */}
              <div>
                <label className="block text-xs font-bold text-slate-800">
                  Keterangan Singkat
                </label>
                <textarea
                  rows={2}
                  placeholder="Contoh: Portal resmi induk Kabupaten Lamongan untuk layanan publik terpadu."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Label Lencana / Badge (Opsional) */}
              <div>
                <label className="block text-xs font-bold text-slate-800">
                  Label Teks Lencana (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Pemkab Induk / Mitra Resmi"
                  value={badgeText}
                  onChange={(e) => setBadgeText(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>

              {/* Status Tampil */}
              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <input
                  type="checkbox"
                  id="partner-is-active"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <label htmlFor="partner-is-active" className="text-xs font-bold text-slate-800 cursor-pointer">
                  Tampilkan tautan ini di website sekarang
                </label>
              </div>

              {/* Pratinjau Tampilan */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
                <p className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <Eye className="h-3 w-3 text-emerald-600" />
                  Pratinjau Kartu di Website Warga:
                </p>
                <div className="mt-2 rounded-xl border border-slate-200 bg-white p-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">
                      {name || 'Nama Instansi Ditampilkan Di Sini'}
                    </span>
                    <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[0.65rem] font-bold text-emerald-700 ring-1 ring-emerald-200">
                      {badgeText || CATEGORY_LABELS[category].label}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                    {description || 'Deskripsi singkat instansi...'}
                  </p>
                </div>
              </div>

              {/* Tombol Simpan & Batal */}
              <div className="flex items-center justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="btn-outline min-h-11 px-4 text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="btn-primary min-h-11 px-6 text-xs shadow-md"
                >
                  <Check className="h-4 w-4" />
                  <span>{editingItem ? 'Simpan Perubahan' : 'Tambahkan ke Website'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Konfirmasi Hapus */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="card w-full max-w-sm p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">
              Hapus Tautan Instansi Ini?
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Tautan ini tidak akan muncul lagi di website warga. Anda dapat menambahkannya kembali kapan saja jika diperlukan.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="btn-outline min-h-10 px-4 text-xs"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="btn min-h-10 bg-rose-600 px-4 text-xs font-bold text-white hover:bg-rose-700"
              >
                Ya, Hapus Tautan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
