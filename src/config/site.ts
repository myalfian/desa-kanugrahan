/** Identitas resmi desa — sumber kebenaran tunggal (single source of truth). */
export const SITE = {
  name: 'Desa Kanugrahan',
  shortName: 'Kanugrahan',
  tagline: 'Tumbuh dari Akar, Berbuah untuk Semua',
  hashtags: ['#KembaliKeAkar', '#TaniBerdaya', '#BerkahUntukSesama'] as const,
  kecamatan: 'Maduran',
  kabupaten: 'Lamongan',
  provinsi: 'Jawa Timur',
  dusun: ['Kanugrahan', 'Pagendingan', 'Pasar Sore'] as const,
  contact: {
    phone: '+62 322 000 0000',
    whatsapp: '6281200000000',
    email: 'pemdes@kanugrahan.desa.id',
    address: 'Jl. Raya Kanugrahan No. 1, Kec. Maduran, Kab. Lamongan, Jawa Timur 62261',
    hours: 'Senin–Jumat, 08.00–15.00 WIB',
  },
} as const

export const fullRegion = `Kec. ${SITE.kecamatan}, Kab. ${SITE.kabupaten}, ${SITE.provinsi}`
