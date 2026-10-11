import { Suspense, useCallback, useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { MobileDrawer } from './MobileDrawer'
import { MobileBottomNav } from './MobileBottomNav'
import { Footer } from './Footer'

export function SiteLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const close = useCallback(() => setDrawerOpen(false), [])
  const open = useCallback(() => setDrawerOpen(true), [])
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])

  return (
    <>
      <a
        href="#konten-utama"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-xl focus:bg-royal-800 focus:px-4 focus:py-3 focus:font-bold focus:text-white"
      >
        Lewati ke konten utama
      </a>
      <Navbar drawerOpen={drawerOpen} onOpenDrawer={open} />
      <MobileDrawer open={drawerOpen} onClose={close} />
      <main id="konten-utama" tabIndex={-1} className="outline-none">
        <Suspense fallback={<div className="container-page min-h-[60vh] py-24 text-slate-500">Memuat…</div>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <MobileBottomNav onOpenMenu={open} />
    </>
  )
}
