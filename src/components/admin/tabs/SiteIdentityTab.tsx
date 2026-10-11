import { useState } from 'react'
import {
  Building,
  Phone,
  Mail,
  MapPin,
  Clock,
  Check,
  MessageCircle,
  Sparkles,
} from 'lucide-react'
import { useSiteContent } from '@/context/SiteContentContext'

export function SiteIdentityTab() {
  const { content, updateSiteInfo } = useSiteContent()
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const [tagline, setTagline] = useState(content.siteInfo.tagline)
  const [hashtagsStr, setHashtagsStr] = useState(
    (content.siteInfo.hashtags || ['#KembaliKeAkar', '#TaniBerdaya', '#BerkahUntukSesama']).join(' ')
  )
  const [address, setAddress] = useState(content.siteInfo.contact.address)
  const [phone, setPhone] = useState(content.siteInfo.contact.phone)
  const [whatsapp, setWhatsapp] = useState(content.siteInfo.contact.whatsapp)
  const [email, setEmail] = useState(content.siteInfo.contact.email)
  const [hours, setHours] = useState(content.siteInfo.contact.hours)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    window.setTimeout(() => setToastMessage(null), 3000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const parsedHashtags = hashtagsStr
      .split(/[\s,]+/)
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => (t.startsWith('#') ? t : `#${t}`))

    updateSiteInfo({
      tagline,
      hashtags: parsedHashtags,
      contact: {
        address,
        phone,
        whatsapp,
        email,
        hours,
      },
    })
    showToast('✓ Informasi profil dan kontak desa berhasil disimpan!')
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-2xl bg-emerald-800 px-5 py-3 text-sm font-bold text-white shadow-xl animate-fade-in">
          <Check className="h-4 w-4 text-emerald-300" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div>
        <h2 className="text-2xl font-extrabold text-slate-900">
          Identitas & Kontak Balai Desa
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Ubah informasi slogan/tagline, hashtag promosi, alamat balai desa, jam operasional pelayanan warga, serta kontak.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-6">
        {/* Identitas Umum */}
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-700" />
              <span>Slogan / Tagline Desa</span>
            </h3>
            <p className="text-xs text-slate-500">Tampil di header utama dan footer website.</p>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-emerald-700" />
              <span>Hashtag Resmi Desa</span>
            </h3>
            <p className="text-xs text-slate-500">Pisahkan dengan spasi atau koma (contoh: #KembaliKeAkar #TaniBerdaya).</p>
            <input
              type="text"
              value={hashtagsStr}
              onChange={(e) => setHashtagsStr(e.target.value)}
              placeholder="#KembaliKeAkar #TaniBerdaya #BerkahUntukSesama"
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* Kontak Pelayanan */}
        <div className="space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Building className="h-4 w-4 text-emerald-700" />
            <span>Kontak & Lokasi Kantor Balai Desa</span>
          </h3>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Phone className="h-3.5 w-3.5 text-emerald-600" />
                Nomor Telepon Kantor
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+62 322 000 0000"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                Nomor WhatsApp Aduan Warga
              </label>
              <input
                type="text"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="6281200000000"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Mail className="h-3.5 w-3.5 text-emerald-600" />
                Email Resmi Desa
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="pemdes@kanugrahan.desa.id"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-emerald-600" />
                Jam Buka Pelayanan Balai Desa
              </label>
              <input
                type="text"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                placeholder="Senin–Jumat, 08.00–15.00 WIB"
                className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-emerald-600" />
              Alamat Lengkap Kantor Desa
            </label>
            <textarea
              rows={2}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-sm text-slate-900 focus:border-emerald-500 focus:bg-white focus:outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            className="btn-primary min-h-11 px-6 text-sm shadow-md"
          >
            <Check className="h-4 w-4" />
            <span>Simpan Informasi Balai Desa</span>
          </button>
        </div>
      </form>
    </div>
  )
}
