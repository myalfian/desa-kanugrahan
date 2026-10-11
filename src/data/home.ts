import type { LucideIcon } from 'lucide-react'
import {
  IdCard, Users, Baby, FileSignature, Home, SearchCheck, Megaphone, Wheat,
  Globe2, Trophy, PieChart, FolderOpen,
} from 'lucide-react'

/* ---------------------------------------------------------------
   Data dummy representatif. Pada produksi, ganti dengan fetch ke
   API SID (mis. OpenSID REST) — bentuk tipe sudah disiapkan.
   --------------------------------------------------------------- */

export type Tone = 'emerald' | 'royal' | 'amber' | 'rose' | 'sky' | 'violet'

export interface QuickService {
  id: string
  label: string
  hint: string
  href: string
  icon: LucideIcon
  tone: Tone
  keywords: string[]
}

export const QUICK_SERVICES: QuickService[] = [
  { id: 'ktp', label: 'KTP-el', hint: 'Rekam & cetak ulang', href: '/layanan/e-administrasi?jenis=ktp', icon: IdCard, tone: 'emerald', keywords: ['ktp', 'e-ktp', 'identitas', 'kartu'] },
  { id: 'kk', label: 'Kartu Keluarga', hint: 'Baru, ubah, pisah KK', href: '/layanan/e-administrasi?jenis=kk', icon: Users, tone: 'royal', keywords: ['kk', 'keluarga', 'pindah'] },
  { id: 'akta', label: 'Akta Lahir/Mati', hint: 'Pengantar Dukcapil', href: '/layanan/e-administrasi?jenis=akta', icon: Baby, tone: 'rose', keywords: ['akta', 'lahir', 'kelahiran', 'kematian'] },
  { id: 'pengantar', label: 'Surat Pengantar', hint: 'SKCK, nikah, usaha', href: '/layanan/e-administrasi?jenis=pengantar', icon: FileSignature, tone: 'amber', keywords: ['surat', 'pengantar', 'skck', 'nikah', 'usaha', 'sktm'] },
  { id: 'domisili', label: 'Surat Domisili', hint: 'Warga & lembaga', href: '/layanan/e-administrasi?jenis=domisili', icon: Home, tone: 'sky', keywords: ['domisili', 'tinggal', 'alamat'] },
  { id: 'lacak', label: 'Lacak Berkas', hint: 'Cek via resi / NIK', href: '/layanan/lacak', icon: SearchCheck, tone: 'violet', keywords: ['lacak', 'status', 'resi', 'tracking', 'cek'] },
  { id: 'aduan', label: 'Pengaduan', hint: 'Aspirasi & fasilitas', href: '/layanan/pengaduan', icon: Megaphone, tone: 'rose', keywords: ['aduan', 'lapor', 'pengaduan', 'jalan rusak', 'aspirasi'] },
  { id: 'harga', label: 'Harga Panen', hint: 'Bursa komoditas', href: '/program/tani', icon: Wheat, tone: 'emerald', keywords: ['harga', 'gabah', 'jagung', 'cabai', 'tani', 'panen'] },
  { id: 'diaspora', label: 'Data Perantau', hint: 'Daftar diaspora', href: '/program/diaspora', icon: Globe2, tone: 'royal', keywords: ['perantau', 'diaspora', 'donasi', 'urun dana'] },
  { id: 'kompetisi', label: 'Kompetisi', hint: 'Turnamen dusun', href: '/program/karang-taruna', icon: Trophy, tone: 'amber', keywords: ['karang taruna', 'turnamen', 'umkm', 'pemuda'] },
  { id: 'apbdes', label: 'APBDes', hint: 'Anggaran desa', href: '/transparansi/apbdes', icon: PieChart, tone: 'sky', keywords: ['apbdes', 'anggaran', 'dana desa', 'transparansi'] },
  { id: 'ppid', label: 'Dokumen PPID', hint: 'RKPDes, Perdes', href: '/transparansi/dokumen', icon: FolderOpen, tone: 'violet', keywords: ['ppid', 'perdes', 'rkpdes', 'rpjmdes', 'dokumen'] },
]

export const TONE_CLASSES: Record<Tone, { bg: string; text: string; ring: string }> = {
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-700', ring: 'ring-emerald-100' },
  royal: { bg: 'bg-royal-50', text: 'text-royal-700', ring: 'ring-royal-100' },
  amber: { bg: 'bg-amber-50', text: 'text-amber-700', ring: 'ring-amber-100' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-700', ring: 'ring-rose-100' },
  sky: { bg: 'bg-sky-50', text: 'text-sky-700', ring: 'ring-sky-100' },
  violet: { bg: 'bg-violet-50', text: 'text-violet-700', ring: 'ring-violet-100' },
}

export interface Metric {
  id: string
  value: number
  suffix?: string
  label: string
  note: string
}

export const METRICS: Metric[] = [
  { id: 'penduduk', value: 46, label: 'Total Penduduk', note: '12 Kepala Keluarga' },
  { id: 'lahan', value: 3, suffix: ' ha', label: 'Lahan Produktif', note: 'Sawah, tegal & tambak' },
  { id: 'dusun', value: 3, label: 'Dusun Aktif', note: 'Kanugrahan · Pagendingan · Pasar Sore' },
  { id: 'diaspora', value: 67, label: 'Diaspora Terdaftar', note: 'Di 14 provinsi & 5 negara' },
]

export interface Commodity {
  name: string
  unit: string
  price: number
  change: number // persen terhadap minggu lalu
}

export const COMMODITIES: Commodity[] = [
  { name: 'Gabah Kering Panen', unit: 'kg', price: 6850, change: 2.3 },
  { name: 'Jagung Pipil', unit: 'kg', price: 5400, change: -1.1 },
  { name: 'Cabai Rawit', unit: 'kg', price: 42000, change: 6.8 },
]

export interface Pillar {
  id: string
  title: string
  tagline: string
  description: string
  image: string
  href: string
  accent: 'emerald' | 'royal' | 'amber'
  highlights: string[]
  stat: { value: string; label: string }
}

export const PILLARS: Pillar[] = [
  {
    id: 'tani',
    title: 'Anugrah Tani',
    tagline: 'Lumbung pangan, harga adil',
    description: 'Optimalisasi hasil bumi lewat bursa komoditas lokal, kalender tanam presisi, dan pendampingan agroteknologi.',
    image: 'tani',
    href: '/program/tani',
    accent: 'emerald',
    highlights: ['Bursa harga gabah, jagung & cabai', 'Kalender masa tanam', 'Etalase hasil bumi'],
    stat: { value: '1 ton', label: 'panen/ha per tahun' },
  },
  {
    id: 'diaspora',
    title: 'Diaspora Kanugrahan',
    tagline: 'Merantau jauh, membangun dekat',
    description: 'Kanal investasi & urun dana desa, basis data perantau, serta transfer keahlian dari Ikatan Pemuda Perantauan.',
    image: 'diaspora',
    href: '/program/diaspora',
    accent: 'royal',
    highlights: ['Pendataan perantau', 'Village crowdfunding', 'Forum rembug desa'],
    stat: { value: 'Rp 4 jt', label: 'dana urunan terhimpun' },
  },
  {
    id: 'karang-taruna',
    title: 'Karang Taruna Kreatif',
    tagline: 'Muda, berdaya, berkarya',
    description: 'Turnamen olahraga antar-dusun, inkubasi wirausaha muda, dan ruang ekspresi kreatif generasi Kanugrahan.',
    image: 'karang-taruna',
    href: '/program/karang-taruna',
    accent: 'amber',
    highlights: ['Liga antar-dusun', 'Pameran UMKM muda', 'Ruang ekspresi kreatif'],
    stat: { value: '4 UMKM', label: 'binaan pemuda' },
  },
]

/** APBDes Tahun Anggaran berjalan (Rupiah) */
export const APBDES = {
  tahun: 2026,
  updatedAt: '2026-10-01',
  pendapatan: {
    total: 20,
    realisasi: 10,
    rincian: [
      { label: 'Dana Desa (DD)', value: 10 },
      { label: 'Alokasi Dana Desa (ADD)', value: 80 },
      { label: 'Bagi Hasil Pajak & Retribusi', value: 10 },
      { label: 'Pendapatan Asli Desa (PADes)', value: 30 },
    ],
  },
  belanja: {
    total: 2_612_000_000,
    realisasi: 1_801_200_000,
    rincian: [
      { label: 'Penyelenggaraan Pemerintahan', value: 70, color: '#1d37b0' },
      { label: 'Pembangunan Desa', value: 10, color: '#047857' },
      { label: 'Pembinaan Kemasyarakatan', value: 20, color: '#d97706' },
      { label: 'Pemberdayaan Masyarakat', value: 30, color: '#0284c7' },
      { label: 'Penanggulangan Bencana & Darurat', value: 90, color: '#e11d48' },
    ],
  },
  pembiayaan: {
    penerimaan: 10, // SiLPA tahun lalu
    pengeluaran: 0,
  },
}

export interface NewsItem {
  id: string
  title: string
  category: 'Tani' | 'Dusun' | 'Diaspora' | 'Kegiatan Pemdes'
  date: string
  href: string
}

export const LATEST_NEWS: NewsItem[] = [
  { id: 'n1', title: 'Panen raya Dusun Pagendingan tembus 2 ton per hektare', category: 'Tani', date: '2026-10-08', href: '/kabar/berita/panen-raya-pagendingan' },
  { id: 'n2', title: 'Ikatan Perantau Kanugrahan galang dana renovasi TPQ', category: 'Diaspora', date: '2026-10-05', href: '/kabar/berita/urun-dana-tpq' },
  { id: 'n3', title: 'Musrenbangdes 2027: warga usulkan 4 prioritas pembangunan', category: 'Kegiatan Pemdes', date: '2026-10-02', href: '/kabar/berita/musrenbangdes-2027' },
]
