import { useEffect } from 'react'
import { HeroSection } from '@/features/home/HeroSection'
import { StatsWidget } from '@/features/home/StatsWidget'
import { QuickServices } from '@/features/home/QuickServices'
import { PillarShowcase } from '@/features/home/PillarShowcase'
import { ApbdesSnapshot } from '@/features/home/ApbdesSnapshot'
import { NewsAndCta } from '@/features/home/NewsAndCta'
import { PartnerLinksSection } from '@/features/home/PartnerLinksSection'
import { useSiteContent } from '@/context/SiteContentContext'

export default function HomePage() {
  const { content } = useSiteContent()
  const { siteInfo } = content

  useEffect(() => {
    document.title = `${siteInfo.name} — Portal Resmi Desa Digital | Kec. ${siteInfo.kecamatan}, ${siteInfo.kabupaten}`
  }, [siteInfo.name, siteInfo.kecamatan, siteInfo.kabupaten])

  return (
    <>
      <HeroSection />
      <StatsWidget />
      <QuickServices />
      <PillarShowcase />
      <ApbdesSnapshot />
      <NewsAndCta />
      <PartnerLinksSection />
    </>
  )
}
