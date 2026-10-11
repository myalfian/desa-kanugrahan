export type PartnerCategory =
  | 'pemerintah_pusat'
  | 'pemkab'
  | 'kecamatan'
  | 'mitra_desa'
  | 'layanan_digital'

export interface PartnerLink {
  id: string
  name: string
  category: PartnerCategory
  url: string
  description: string
  badgeText?: string
  isActive: boolean
  featured?: boolean
  updatedAt?: string
}

export interface SiteInfoData {
  name: string
  shortName: string
  tagline: string
  hashtags?: string[]
  kecamatan: string
  kabupaten: string
  provinsi: string
  dusun: string[]
  contact: {
    phone: string
    whatsapp: string
    email: string
    address: string
    hours: string
  }
}

export interface MetricData {
  id: string
  value: number
  suffix?: string
  label: string
  note: string
}

export interface CommodityData {
  name: string
  unit: string
  price: number
  change: number
}

export interface NewsItemData {
  id: string
  title: string
  category: 'Tani' | 'Dusun' | 'Diaspora' | 'Kegiatan Pemdes'
  date: string
  href: string
  summary?: string
  author?: string
}

export interface ApbdesData {
  tahun: number
  updatedAt: string
  pendapatan: {
    total: number
    realisasi: number
    rincian: Array<{ label: string; value: number }>
  }
  belanja: {
    total: number
    realisasi: number
    rincian: Array<{ label: string; value: number; color?: string }>
  }
  pembiayaan: {
    penerimaan: number
    pengeluaran: number
  }
}

export interface SiteContentState {
  siteInfo: SiteInfoData
  metrics: MetricData[]
  commodities: CommodityData[]
  news: NewsItemData[]
  apbdes: ApbdesData
  partnerLinks: PartnerLink[]
}

export const CATEGORY_LABELS: Record<PartnerCategory, { label: string; badgeCls: string; color: string }> = {
  pemkab: {
    label: 'Pemkab Lamongan',
    badgeCls: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
    color: 'emerald',
  },
  pemerintah_pusat: {
    label: 'Pemerintah Pusat',
    badgeCls: 'bg-royal-50 text-royal-800 ring-royal-200',
    color: 'royal',
  },
  kecamatan: {
    label: 'Kecamatan & Wilayah',
    badgeCls: 'bg-amber-50 text-amber-800 ring-amber-200',
    color: 'amber',
  },
  mitra_desa: {
    label: 'Kolega & Mitra Desa',
    badgeCls: 'bg-sky-50 text-sky-800 ring-sky-200',
    color: 'sky',
  },
  layanan_digital: {
    label: 'Layanan Publik Online',
    badgeCls: 'bg-violet-50 text-violet-800 ring-violet-200',
    color: 'violet',
  },
}

export const DEFAULT_PARTNER_LINKS: PartnerLink[] = [
  {
    id: 'link-1',
    name: 'Pemerintah Kabupaten Lamongan',
    category: 'pemkab',
    url: 'https://lamongankab.go.id',
    description: 'Portal resmi induk Pemerintah Kabupaten Lamongan, Megilan Berkelanjutan.',
    badgeText: 'Pemerintah Kabupaten',
    isActive: true,
    featured: true,
    updatedAt: '2026-10-10',
  },
  {
    id: 'link-2',
    name: 'Kementerian Desa, PDT, dan Transmigrasi RI',
    category: 'pemerintah_pusat',
    url: 'https://kemendesa.go.id',
    description: 'Pusat regulasi, informasi dana desa, dan program percepatan desa mandiri nasional.',
    badgeText: 'Kementerian Pusat',
    isActive: true,
    featured: true,
    updatedAt: '2026-10-10',
  },
  {
    id: 'link-3',
    name: 'Kementerian Dalam Negeri - Ditjen Bina Pemdes',
    category: 'pemerintah_pusat',
    url: 'https://binapemdes.kemendagri.go.id',
    description: 'Direktorat Jenderal Bina Pemerintahan Desa untuk tata kelola aparatur desa.',
    badgeText: 'Kemendagri',
    isActive: true,
    featured: true,
    updatedAt: '2026-10-09',
  },
  {
    id: 'link-4',
    name: 'Kantor Kecamatan Maduran',
    category: 'kecamatan',
    url: 'https://maduran.lamongankab.go.id',
    description: 'Pemerintah Kecamatan Maduran, kanal koordinasi wilayah administratif desa.',
    badgeText: 'Kecamatan Maduran',
    isActive: true,
    featured: true,
    updatedAt: '2026-10-08',
  },
  {
    id: 'link-5',
    name: 'Satu Data Indonesia',
    category: 'layanan_digital',
    url: 'https://data.go.id',
    description: 'Portal data terbuka pemerintah untuk mendukung transparansi kebijakan publik.',
    badgeText: 'Portal Nasional',
    isActive: true,
    featured: false,
    updatedAt: '2026-10-05',
  },
  {
    id: 'link-6',
    name: 'JDIH Kabupaten Lamongan',
    category: 'pemkab',
    url: 'https://jdih.lamongankab.go.id',
    description: 'Jaringan Dokumentasi dan Informasi Hukum Kabupaten Lamongan untuk Perda & Perbup.',
    badgeText: 'Dokumen Hukum',
    isActive: true,
    featured: false,
    updatedAt: '2026-10-02',
  },
  {
    id: 'link-7',
    name: 'BUMDes Bersama Kawasan Maduran',
    category: 'mitra_desa',
    url: 'https://bumdes.desa.id',
    description: 'Kolega kemitraan ekonomi desa penyedia sarana produksi dan pemasaran hasil tani.',
    badgeText: 'Kolega Desa',
    isActive: true,
    featured: true,
    updatedAt: '2026-10-01',
  },
  {
    id: 'link-8',
    name: 'BPJS Ketenagakerjaan Desa',
    category: 'layanan_digital',
    url: 'https://bpjsketenagakerjaan.go.id',
    description: 'Program jaminan sosial ketenagakerjaan bagi aparatur desa dan pekerja rentan tani.',
    badgeText: 'Jaminan Sosial',
    isActive: true,
    featured: false,
    updatedAt: '2026-09-28',
  },
]

export const DEFAULT_CONTENT_STATE: SiteContentState = {
  siteInfo: {
    name: 'Desa Kanugrahan',
    shortName: 'Kanugrahan',
    tagline: 'Tumbuh dari Akar, Berbuah untuk Semua',
    hashtags: ['#KembaliKeAkar', '#TaniBerdaya', '#BerkahUntukSesama'],
    kecamatan: 'Maduran',
    kabupaten: 'Lamongan',
    provinsi: 'Jawa Timur',
    dusun: ['Kanugrahan', 'Pagendingan', 'Pasar Sore'],
    contact: {
      phone: '+62 322 000 0000',
      whatsapp: '6281200000000',
      email: 'pemdes@kanugrahan.desa.id',
      address: 'Jl. Raya Kanugrahan No. 1, Kec. Maduran, Kab. Lamongan, Jawa Timur 62261',
      hours: 'Senin–Jumat, 08.00–15.00 WIB',
    },
  },
  metrics: [
    { id: 'penduduk', value: 4, label: 'Total Penduduk', note: '12 Kepala Keluarga' },
    { id: 'lahan', value: 3, suffix: ' ha', label: 'Lahan Produktif', note: 'Sawah, tegal & tambak' },
    { id: 'dusun', value: 3, label: 'Dusun Aktif', note: 'Kanugrahan · Pagendingan · Pasar Sore' },
    { id: 'diaspora', value: 6, label: 'Diaspora Terdaftar', note: 'Di 14 provinsi & 5 negara' },
  ],
  commodities: [
    { name: 'Gabah Kering Panen', unit: 'kg', price: 6850, change: 2.3 },
    { name: 'Jagung Pipil', unit: 'kg', price: 5400, change: -1.1 },
    { name: 'Cabai Rawit', unit: 'kg', price: 42000, change: 6.8 },
  ],
  news: [
    {
      id: 'n1',
      title: 'Panen raya Dusun Pagendingan tembus xxx ton per hektare',
      category: 'Tani',
      date: '2026-10-08',
      href: '/kabar/berita/panen-raya-pagendingan',
      summary: 'Kelompok tani berhasil meningkatkan produktivitas padi musim tanam kedua dengan pendampingan penyuluh pertanian lapangan.',
      author: 'Tim Liputan Tani',
    },
    {
      id: 'n2',
      title: 'Ikatan Perantau Kanugrahan galang dana renovasi TPQ',
      category: 'Diaspora',
      date: '2026-10-05',
      href: '/kabar/berita/urun-dana-tpq',
      summary: 'Warga perantau di Surabaya dan Jabodetabek berhasil menghimpun bantuan renovasi fasilitas belajar keagamaan anak-anak.',
      author: 'Pengurus Diaspora',
    },
    {
      id: 'n3',
      title: 'Musrenbangdes 2027: warga usulkan 34 prioritas pembangunan',
      category: 'Kegiatan Pemdes',
      date: '2026-10-02',
      href: '/kabar/berita/musrenbangdes-2027',
      summary: 'Pertemuan pleno musyawarah desa menyepakati peningkatan saluran irigasi tersier dan jalan usaha tani sebagai program prioritas.',
      author: 'Sekretariat Desa',
    },
  ],
  apbdes: {
    tahun: 2026,
    updatedAt: '2026-10-01',
    pendapatan: {
      total: 2_486_500_000,
      realisasi: 1_964_300_000,
      rincian: [
        { label: 'Dana Desa (DD)', value: 100 },
        { label: 'Alokasi Dana Desa (ADD)', value: 800 },
        { label: 'Bagi Hasil Pajak & Retribusi', value: 100 },
        { label: 'Pendapatan Asli Desa (PADes)', value: 300 },
      ],
    },
    belanja: {
      total: 2_612_000_000,
      realisasi: 1_801_200_000,
      rincian: [
        { label: 'Penyelenggaraan Pemerintahan', value: 700, color: '#1d37b0' },
        { label: 'Pembangunan Desa', value: 100, color: '#047857' },
        { label: 'Pembinaan Kemasyarakatan', value: 200, color: '#d97706' },
        { label: 'Pemberdayaan Masyarakat', value: 300, color: '#0284c7' },
        { label: 'Penanggulangan Bencana & Darurat', value: 200, color: '#e11d48' },
      ],
    },
    pembiayaan: {
      penerimaan: 100,
      pengeluaran: 0,
    },
  },
  partnerLinks: DEFAULT_PARTNER_LINKS,
}
