import { useState } from 'react'
import {
  Plus,
  Newspaper,
  Calendar,
  User,
  Edit2,
  Trash2,
  Check,
  X,
  Info,
} from 'lucide-react'
import { useSiteContent } from '@/context/SiteContentContext'
import { type NewsItemData } from '@/data/defaultContent'
import { formatDate } from '@/lib/format'

export function NewsTab() {
  const { content, addNews, updateNews, deleteNews } = useSiteContent()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<NewsItemData | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Form states
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<'Tani' | 'Dusun' | 'Diaspora' | 'Kegiatan Pemdes'>('Kegiatan Pemdes')
  const [date, setDate] = useState('')
  const [summary, setSummary] = useState('')
  const [author, setAuthor] = useState('')

  const showToast = (msg: string) => {
    setToastMessage(msg)
    window.setTimeout(() => setToastMessage(null), 3500)
  }

  const openAddModal = () => {
    setEditingItem(null)
    setTitle('')
    setCategory('Kegiatan Pemdes')
    setDate(new Date().toISOString().split('T')[0])
    setSummary('')
    setAuthor('Sekretariat Desa')
    setModalOpen(true)
  }

  const openEditModal = (item: NewsItemData) => {
    setEditingItem(item)
    setTitle(item.title)
    setCategory(item.category)
    setDate(item.date)
    setSummary(item.summary || '')
    setAuthor(item.author || 'Sekretariat Desa')
    setModalOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('Mohon isi judul berita.')
      return
    }

    if (editingItem) {
      updateNews(editingItem.id, {
        title: title.trim(),
        category,
        date: date || new Date().toISOString().split('T')[0],
        summary: summary.trim(),
        author: author.trim(),
      })
      showToast('✓ Berita desa berhasil diperbarui!')
    } else {
      addNews({
        title: title.trim(),
        category,
        date: date || new Date().toISOString().split('T')[0],
        href: `/kabar/berita/${Date.now()}`,
        summary: summary.trim(),
        author: author.trim(),
      })
      showToast('✓ Berita baru berhasil ditayangkan!')
    }

    setModalOpen(false)
  }

  const handleDelete = (id: string) => {
    deleteNews(id)
    setDeleteConfirmId(null)
    showToast('✓ Berita berhasil dihapus.')
  }

  const CAT_CLS: Record<string, string> = {
    Tani: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
    Dusun: 'bg-amber-50 text-amber-800 ring-amber-200',
    Diaspora: 'bg-royal-50 text-royal-800 ring-royal-200',
    'Kegiatan Pemdes': 'bg-sky-50 text-sky-800 ring-sky-200',
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

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">
            Kabar & Warta Berita Desa
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Publikasikan pengumuman, agenda musyawarah, panen dusun, dan kegiatan warga desa.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="btn-primary flex items-center gap-2 self-start sm:self-auto shadow-md"
        >
          <Plus className="h-5 w-5" />
          <span>Tulis Berita Baru</span>
        </button>
      </div>

      {/* Tips */}
      <div className="card border-royal-100 bg-royal-50/60 p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-royal-600 text-white">
            <Info className="h-4 w-4" />
          </span>
          <div className="text-xs text-slate-700 sm:text-sm">
            <p className="font-bold text-slate-900">Tips Menulis Warta Desa:</p>
            <p className="mt-0.5 leading-relaxed">
              Gunakan judul yang jelas dan menarik. Berita yang paling baru ditambahkan akan otomatis muncul di bagian atas halaman beranda website.
            </p>
          </div>
        </div>
      </div>

      {/* Daftar Berita */}
      <div className="space-y-3">
        {content.news.map((item) => (
          <div
            key={item.id}
            className="card flex flex-col justify-between gap-4 p-5 transition hover:border-slate-300 sm:flex-row sm:items-center"
          >
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className={`rounded-full px-2.5 py-0.5 font-bold ring-1 ${CAT_CLS[item.category] || 'bg-slate-100'}`}>
                  {item.category}
                </span>
                <span className="flex items-center gap-1 text-slate-500">
                  <Calendar className="h-3 w-3" />
                  <time dateTime={item.date}>{formatDate(item.date)}</time>
                </span>
                {item.author && (
                  <span className="flex items-center gap-1 text-slate-500">
                    <User className="h-3 w-3" />
                    <span>{item.author}</span>
                  </span>
                )}
              </div>

              <h3 className="mt-2 text-base font-bold text-slate-900 sm:text-lg">
                {item.title}
              </h3>
              {item.summary && (
                <p className="mt-1 text-xs text-slate-600 line-clamp-2">
                  {item.summary}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0 border-t border-slate-100 pt-3 sm:border-0 sm:pt-0">
              <button
                type="button"
                onClick={() => openEditModal(item)}
                className="btn-outline min-h-9 px-3 text-xs"
              >
                <Edit2 className="h-3.5 w-3.5" />
                <span>Ubah</span>
              </button>
              <button
                type="button"
                onClick={() => setDeleteConfirmId(item.id)}
                className="inline-flex min-h-9 items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 text-xs font-semibold text-rose-600 hover:bg-rose-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Hapus</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Tambah / Edit Berita */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="card max-h-[90vh] w-full max-w-xl overflow-y-auto p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-royal-50 text-royal-700">
                  <Newspaper className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {editingItem ? 'Perbarui Berita Desa' : 'Tulis Berita Desa Baru'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Isi informasi berita di bawah ini
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
              <div>
                <label className="block text-xs font-bold text-slate-800">
                  Judul Berita <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Panen raya jagung di Dusun Pasar Sore capai target"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800">
                    Kategori <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="Kegiatan Pemdes">Kegiatan Pemdes</option>
                    <option value="Tani">Tani & Pertanian</option>
                    <option value="Dusun">Kabar Dusun</option>
                    <option value="Diaspora">Warga Perantau / Diaspora</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800">
                    Tanggal Publikasi <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800">
                  Penulis / Tim Peliput
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Sekretariat Desa / Tim PPID"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800">
                  Ringkasan / Isi Berita Singkat
                </label>
                <textarea
                  rows={3}
                  placeholder="Tuliskan isi atau ringkasan berita secara padat dan informatif..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
                />
              </div>

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
                  <span>{editingItem ? 'Simpan Perubahan' : 'Tayangkan Berita'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Hapus */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="card w-full max-w-sm p-6 text-center shadow-2xl">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
              <Trash2 className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-base font-bold text-slate-900">
              Hapus Berita Ini?
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Berita ini akan dihapus dari daftar kabar website desa.
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
                Hapus Sekarang
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
