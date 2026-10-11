import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import {
  DEFAULT_CONTENT_STATE,
  type SiteContentState,
  type SiteInfoData,
  type MetricData,
  type CommodityData,
  type NewsItemData,
  type ApbdesData,
  type PartnerLink,
} from '@/data/defaultContent'

const STORAGE_KEY = 'kanugrahan_cms_content_v1'

interface SiteContentContextValue {
  content: SiteContentState
  lastSaved: string | null
  updateSiteInfo: (partial: Partial<SiteInfoData>) => void
  updateMetric: (id: string, partial: Partial<MetricData>) => void
  addCommodity: (item: CommodityData) => void
  updateCommodity: (index: number, item: CommodityData) => void
  deleteCommodity: (index: number) => void
  addNews: (item: Omit<NewsItemData, 'id'>) => void
  updateNews: (id: string, partial: Partial<NewsItemData>) => void
  deleteNews: (id: string) => void
  updateApbdes: (updater: (prev: ApbdesData) => ApbdesData) => void
  addPartnerLink: (item: Omit<PartnerLink, 'id' | 'updatedAt'>) => void
  updatePartnerLink: (id: string, partial: Partial<PartnerLink>) => void
  deletePartnerLink: (id: string) => void
  togglePartnerLink: (id: string) => void
  resetToDefault: () => void
  exportData: () => void
  importData: (imported: SiteContentState) => boolean
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null)

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContentState>(() => {
    if (typeof window === 'undefined') return DEFAULT_CONTENT_STATE
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<SiteContentState>
        const storedTagline = parsed.siteInfo?.tagline
        const isOldTagline =
          !storedTagline ||
          storedTagline.toLowerCase().includes('kembali ke desa')
        const updatedTagline = isOldTagline
          ? DEFAULT_CONTENT_STATE.siteInfo.tagline
          : storedTagline
        const updatedHashtags =
          isOldTagline || !parsed.siteInfo?.hashtags?.length
            ? DEFAULT_CONTENT_STATE.siteInfo.hashtags
            : parsed.siteInfo.hashtags

        return {
          ...DEFAULT_CONTENT_STATE,
          ...parsed,
          siteInfo: {
            ...DEFAULT_CONTENT_STATE.siteInfo,
            ...(parsed.siteInfo ?? {}),
            tagline: updatedTagline,
            hashtags: updatedHashtags,
          },
          metrics: parsed.metrics ?? DEFAULT_CONTENT_STATE.metrics,
          commodities: parsed.commodities ?? DEFAULT_CONTENT_STATE.commodities,
          news: parsed.news ?? DEFAULT_CONTENT_STATE.news,
          apbdes: parsed.apbdes ?? DEFAULT_CONTENT_STATE.apbdes,
          partnerLinks: parsed.partnerLinks ?? DEFAULT_CONTENT_STATE.partnerLinks,
        }
      }
    } catch (e) {
      console.warn('Gagal memuat data dari penyimpanan lokal:', e)
    }
    return DEFAULT_CONTENT_STATE
  })

  const [lastSaved, setLastSaved] = useState<string | null>(null)

  // Simpan otomatis ke localStorage setiap ada perubahan
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
      setLastSaved(new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))
    } catch (e) {
      console.error('Gagal menyimpan ke localStorage:', e)
    }
  }, [content])

  const updateSiteInfo = useCallback((partial: Partial<SiteInfoData>) => {
    setContent((prev) => ({
      ...prev,
      siteInfo: {
        ...prev.siteInfo,
        ...partial,
        contact: {
          ...prev.siteInfo.contact,
          ...(partial.contact ?? {}),
        },
      },
    }))
  }, [])

  const updateMetric = useCallback((id: string, partial: Partial<MetricData>) => {
    setContent((prev) => ({
      ...prev,
      metrics: prev.metrics.map((m) => (m.id === id ? { ...m, ...partial } : m)),
    }))
  }, [])

  const addCommodity = useCallback((item: CommodityData) => {
    setContent((prev) => ({
      ...prev,
      commodities: [item, ...prev.commodities],
    }))
  }, [])

  const updateCommodity = useCallback((index: number, item: CommodityData) => {
    setContent((prev) => {
      const next = [...prev.commodities]
      next[index] = item
      return { ...prev, commodities: next }
    })
  }, [])

  const deleteCommodity = useCallback((index: number) => {
    setContent((prev) => ({
      ...prev,
      commodities: prev.commodities.filter((_, i) => i !== index),
    }))
  }, [])

  const addNews = useCallback((item: Omit<NewsItemData, 'id'>) => {
    const id = `news-${Date.now()}`
    const href = item.href || `/kabar/berita/${id}`
    setContent((prev) => ({
      ...prev,
      news: [{ ...item, id, href }, ...prev.news],
    }))
  }, [])

  const updateNews = useCallback((id: string, partial: Partial<NewsItemData>) => {
    setContent((prev) => ({
      ...prev,
      news: prev.news.map((n) => (n.id === id ? { ...n, ...partial } : n)),
    }))
  }, [])

  const deleteNews = useCallback((id: string) => {
    setContent((prev) => ({
      ...prev,
      news: prev.news.filter((n) => n.id !== id),
    }))
  }, [])

  const updateApbdes = useCallback((updater: (prev: ApbdesData) => ApbdesData) => {
    setContent((prev) => ({
      ...prev,
      apbdes: updater(prev.apbdes),
    }))
  }, [])

  // Modul Tautan Kolega / Instansi Pemerintah
  const addPartnerLink = useCallback((item: Omit<PartnerLink, 'id' | 'updatedAt'>) => {
    const id = `partner-${Date.now()}`
    const today = new Date().toISOString().split('T')[0]
    setContent((prev) => ({
      ...prev,
      partnerLinks: [
        {
          ...item,
          id,
          updatedAt: today,
        },
        ...prev.partnerLinks,
      ],
    }))
  }, [])

  const updatePartnerLink = useCallback((id: string, partial: Partial<PartnerLink>) => {
    const today = new Date().toISOString().split('T')[0]
    setContent((prev) => ({
      ...prev,
      partnerLinks: prev.partnerLinks.map((p) =>
        p.id === id ? { ...p, ...partial, updatedAt: today } : p,
      ),
    }))
  }, [])

  const deletePartnerLink = useCallback((id: string) => {
    setContent((prev) => ({
      ...prev,
      partnerLinks: prev.partnerLinks.filter((p) => p.id !== id),
    }))
  }, [])

  const togglePartnerLink = useCallback((id: string) => {
    setContent((prev) => ({
      ...prev,
      partnerLinks: prev.partnerLinks.map((p) =>
        p.id === id ? { ...p, isActive: !p.isActive } : p,
      ),
    }))
  }, [])

  const resetToDefault = useCallback(() => {
    if (window.confirm('Apakah Anda yakin ingin mengembalikan seluruh konten ke data standar pabrik? Perubahan kustom Anda akan dihapus.')) {
      setContent(DEFAULT_CONTENT_STATE)
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const exportData = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2))
    const downloadAnchor = document.createElement('a')
    downloadAnchor.setAttribute('href', dataStr)
    downloadAnchor.setAttribute('download', `cadangan_konten_desa_${new Date().toISOString().slice(0, 10)}.json`)
    document.body.appendChild(downloadAnchor)
    downloadAnchor.click()
    downloadAnchor.remove()
  }, [content])

  const importData = useCallback((imported: SiteContentState) => {
    try {
      if (!imported.siteInfo || !Array.isArray(imported.partnerLinks)) {
        alert('Format berkas tidak sesuai. Harap gunakan berkas cadangan JSON yang valid.')
        return false
      }
      setContent(imported)
      return true
    } catch (e) {
      alert('Gagal membaca data berkas: ' + (e as Error).message)
      return false
    }
  }, [])

  return (
    <SiteContentContext.Provider
      value={{
        content,
        lastSaved,
        updateSiteInfo,
        updateMetric,
        addCommodity,
        updateCommodity,
        deleteCommodity,
        addNews,
        updateNews,
        deleteNews,
        updateApbdes,
        addPartnerLink,
        updatePartnerLink,
        deletePartnerLink,
        togglePartnerLink,
        resetToDefault,
        exportData,
        importData,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  )
}

export function useSiteContent() {
  const context = useContext(SiteContentContext)
  if (!context) {
    throw new Error('useSiteContent harus digunakan di dalam SiteContentProvider')
  }
  return context
}
