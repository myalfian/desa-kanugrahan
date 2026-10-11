import {
  LayoutDashboard,
  Link2,
  Newspaper,
  Wheat,
  Users,
  Building,
  PieChart,
  HardDriveDownload,
} from 'lucide-react'
import { useSiteContent } from '@/context/SiteContentContext'

interface AdminSidebarProps {
  activeTab: string
  onSelectTab: (tabId: string) => void
}

export function AdminSidebar({ activeTab, onSelectTab }: AdminSidebarProps) {
  const { content } = useSiteContent()

  const tabs = [
    {
      id: 'overview',
      label: 'Ringkasan Web',
      sublabel: 'Status & panduan',
      icon: LayoutDashboard,
    },
    {
      id: 'partner-links',
      label: 'Tautan Instansi & Mitra',
      sublabel: 'Link kolega & pemerintah',
      icon: Link2,
      badge: content.partnerLinks.length,
      highlight: true,
    },
    {
      id: 'news',
      label: 'Kabar & Berita Desa',
      sublabel: 'Warta kegiatan',
      icon: Newspaper,
      badge: content.news.length,
    },
    {
      id: 'commodities',
      label: 'Bursa Harga Panen',
      sublabel: 'Gabah, jagung, dll',
      icon: Wheat,
    },
    {
      id: 'statistics',
      label: 'Data & Statistik Desa',
      sublabel: 'Penduduk & dusun',
      icon: Users,
    },
    {
      id: 'identity',
      label: 'Kontak & Balai Desa',
      sublabel: 'Alamat, WA & telepon',
      icon: Building,
    },
    {
      id: 'apbdes',
      label: 'Transparansi APBDes',
      sublabel: 'Anggaran belanja desa',
      icon: PieChart,
    },
    {
      id: 'backup',
      label: 'Cadangan & Pemulihan',
      sublabel: 'Backup data desa',
      icon: HardDriveDownload,
    },
  ]

  return (
    <aside aria-label="Menu Admin" className="w-full lg:w-72 shrink-0">
      <nav className="card overflow-hidden p-2">
        <div className="px-3 py-2 text-[0.7rem] font-bold tracking-wider text-slate-400 uppercase">
          Menu Pengelola Website
        </div>
        <ul className="space-y-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            const Icon = tab.icon

            return (
              <li key={tab.id}>
                <button
                  type="button"
                  onClick={() => onSelectTab(tab.id)}
                  className={`group flex w-full items-center justify-between rounded-xl p-3 text-left transition-all ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-md shadow-emerald-950/20'
                      : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'text-slate-800'}`}>
                        {tab.label}
                      </p>
                      <p className={`text-[0.72rem] truncate ${isActive ? 'text-emerald-100' : 'text-slate-500'}`}>
                        {tab.sublabel}
                      </p>
                    </div>
                  </div>

                  {tab.badge !== undefined && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[0.7rem] font-extrabold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-200/80 text-slate-700 group-hover:bg-emerald-100 group-hover:text-emerald-800'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
