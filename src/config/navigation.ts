import type { LucideIcon } from 'lucide-react'
import {
  Home, Landmark, Map, Target, Network, FileText, SearchCheck, Megaphone,
  Wheat, Globe2, Trophy, PieChart, FolderOpen, Newspaper, Images,
} from 'lucide-react'

export interface NavLeaf {
  label: string
  href: string
  description?: string
  icon: LucideIcon
}

export interface NavGroup {
  id: string
  label: string
  href: string
  /** Ringkasan untuk panel mega menu */
  blurb?: string
  children?: NavLeaf[]
}

/**
 * Taksonomi navigasi utama — dipetakan 1:1 dengan Arsitektur Informasi.
 * Ubah di sini, Navbar desktop, Drawer mobile, dan Footer ikut ter-update.
 */
export const NAVIGATION: NavGroup[] = [
  { id: 'beranda', label: 'Beranda', href: '/' },
  {
    id: 'profil',
    label: 'Profil Desa',
    href: '/profil',
    blurb: 'Kenali sejarah, wilayah, arah pembangunan, dan aparatur Desa Kanugrahan.',
    children: [
      { label: 'Selayang Pandang & 3 Dusun', href: '/profil/selayang-pandang', icon: Map, description: 'Kanugrahan, Pagendingan, Pasar Sore' },
      { label: 'Visi & Misi', href: '/profil/visi-misi', icon: Target, description: 'Arah pembangunan desa 2025–2031' },
      { label: 'Struktur Pemerintahan & BPD', href: '/profil/struktur', icon: Network, description: 'Bagan aparatur desa & BPD' },
    ],
  },
  {
    id: 'layanan',
    label: 'Layanan',
    href: '/layanan',
    blurb: 'Satu pintu layanan publik — urus dokumen tanpa antre dari rumah.',
    children: [
      { label: 'e-Administrasi', href: '/layanan/e-administrasi', icon: FileText, description: 'KTP, KK, Akta, Surat Pengantar, Domisili' },
      { label: 'Lacak Pengajuan', href: '/layanan/lacak', icon: SearchCheck, description: 'Cek status berkas via resi / NIK' },
      { label: 'Pengaduan Warga', href: '/layanan/pengaduan', icon: Megaphone, description: 'Aspirasi & laporan fasilitas rusak' },
    ],
  },
  {
    id: 'program',
    label: 'Program Unggulan',
    href: '/program',
    blurb: 'Ekosistem pembangunan berbasis tani, perantau, dan pemuda kreatif.',
    children: [
      { label: 'Anugrah Tani', href: '/program/tani', icon: Wheat, description: 'Bursa harga, kalender tanam, etalase' },
      { label: 'Portal Diaspora', href: '/program/diaspora', icon: Globe2, description: 'Data perantau, urun dana, rembug desa' },
      { label: 'Karang Taruna Kreatif', href: '/program/karang-taruna', icon: Trophy, description: 'Kompetisi, UMKM muda, ruang kreatif' },
    ],
  },
  {
    id: 'transparansi',
    label: 'Transparansi',
    href: '/transparansi',
    blurb: 'Keterbukaan informasi publik sesuai UU No. 14/2008 (PPID).',
    children: [
      { label: 'Infografis APBDes', href: '/transparansi/apbdes', icon: PieChart, description: 'Pendapatan, belanja, pembiayaan' },
      { label: 'Dokumen Publik (PPID)', href: '/transparansi/dokumen', icon: FolderOpen, description: 'RKPDes, RPJMDes, Perdes' },
    ],
  },
  {
    id: 'kabar',
    label: 'Kabar Desa',
    href: '/kabar',
    blurb: 'Warta terkini dari sawah, dusun, perantauan, hingga balai desa.',
    children: [
      { label: 'Warta Berita', href: '/kabar/berita', icon: Newspaper, description: 'Tani · Dusun · Diaspora · Pemdes' },
      { label: 'Galeri Foto & Video', href: '/kabar/galeri', icon: Images, description: 'Dokumentasi kegiatan desa' },
    ],
  },
]

/** Ikon untuk grup (dipakai di drawer mobile) */
export const GROUP_ICONS: Record<string, LucideIcon> = {
  beranda: Home,
  profil: Landmark,
  layanan: FileText,
  program: Wheat,
  transparansi: PieChart,
  kabar: Newspaper,
}

/** Rata semua rute daun — untuk routing & sitemap */
export const ALL_ROUTES = NAVIGATION.flatMap((g) => [
  { label: g.label, href: g.href, group: g.label },
  ...(g.children ?? []).map((c) => ({ label: c.label, href: c.href, group: g.label })),
])
