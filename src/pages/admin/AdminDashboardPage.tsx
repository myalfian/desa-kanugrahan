import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  X,
  BookOpen,
  Sparkles,
} from 'lucide-react'
import { AdminHeader } from '@/components/admin/AdminHeader'
import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { OverviewTab } from '@/components/admin/tabs/OverviewTab'
import { PartnerLinksTab } from '@/components/admin/tabs/PartnerLinksTab'
import { NewsTab } from '@/components/admin/tabs/NewsTab'
import { CommodityTab } from '@/components/admin/tabs/CommodityTab'
import { StatisticsTab } from '@/components/admin/tabs/StatisticsTab'
import { SiteIdentityTab } from '@/components/admin/tabs/SiteIdentityTab'
import { ApbdesTab } from '@/components/admin/tabs/ApbdesTab'
import { BackupTab } from '@/components/admin/tabs/BackupTab'
import { useSiteContent } from '@/context/SiteContentContext'

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<string>('partner-links')
  const [helpOpen, setHelpOpen] = useState(false)
  const { content } = useSiteContent()
  const navigate = useNavigate()

  useEffect(() => {
    document.title = `Ruang Pengelola Konten — ${content.siteInfo.name}`
  }, [content.siteInfo.name])

  const handleLogout = () => {
    if (confirm('Apakah Anda ingin keluar dari Ruang Pengelola Desa?')) {
      navigate('/')
    }
  }

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans">
      {/* Header Admin */}
      <AdminHeader
        onOpenHelp={() => setHelpOpen(true)}
        onLogout={handleLogout}
      />

      {/* Main Content Area */}
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row items-start">
          {/* Sidebar */}
          <AdminSidebar
            activeTab={activeTab}
            onSelectTab={(tabId) => setActiveTab(tabId)}
          />

          {/* Tab Content */}
          <div className="flex-1 min-w-0 w-full">
            {activeTab === 'overview' && (
              <OverviewTab onNavigateTab={(tab) => setActiveTab(tab)} />
            )}
            {activeTab === 'partner-links' && <PartnerLinksTab />}
            {activeTab === 'news' && <NewsTab />}
            {activeTab === 'commodities' && <CommodityTab />}
            {activeTab === 'statistics' && <StatisticsTab />}
            {activeTab === 'identity' && <SiteIdentityTab />}
            {activeTab === 'apbdes' && <ApbdesTab />}
            {activeTab === 'backup' && <BackupTab />}
          </div>
        </div>
      </main>

      {/* Modal Panduan Bantuan */}
      {helpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="card max-h-[85vh] w-full max-w-2xl overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
                  <BookOpen className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Buku Panduan Pengelola Web Desa
                  </h3>
                  <p className="text-xs text-slate-500">
                    Panduan praktis untuk staf dan aparatur desa
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-6 space-y-5 text-sm text-slate-700 leading-relaxed">
              <div className="rounded-2xl bg-emerald-50 p-4 border border-emerald-100">
                <h4 className="font-bold text-emerald-950 flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-emerald-700" />
                  Bagaimana cara kerja sistem ini?
                </h4>
                <p className="mt-1 text-xs text-emerald-900">
                  Semua tulisan, nomor telepon, harga panen, dan link instansi yang Anda ubah di ruang admin ini tersimpan secara otomatis dan langsung tampil di website desa seketika tanpa perlu restart server.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900">
                  1. Modul Tautan Instansi Pemerintah & Kolega
                </h4>
                <p className="mt-1 text-xs text-slate-600">
                  Digunakan untuk menambahkan alamat website kementerian, Pemkab Lamongan, kantor kecamatan, BUMDes, atau portal resmi lainnya. Tautan ini akan tampil di bagian depan website warga sehingga masyarakat dapat langsung membuka portal layanan terkait.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900">
                  2. Modul Kabar & Berita Desa
                </h4>
                <p className="mt-1 text-xs text-slate-600">
                  Tuliskan judul kegiatan, tanggal, dan ringkasan singkat. Berita baru akan langsung berada di urutan teratas.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900">
                  3. Bursa Harga Panen
                </h4>
                <p className="mt-1 text-xs text-slate-600">
                  Cukup ketik harga panen terbaru dalam Rupiah. Tren persentase naik atau turun akan dihitung otomatis oleh sistem.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900">
                  4. Cadangkan Data (Backup)
                </h4>
                <p className="mt-1 text-xs text-slate-600">
                  Disarankan sebulan sekali mengunduh file cadangan dari menu <em>Cadangan & Pemulihan</em> agar data desa selalu aman di komputer Anda.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setHelpOpen(false)}
                className="btn-primary min-h-11 px-6 text-xs"
              >
                Saya Mengerti, Tutup Panduan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
