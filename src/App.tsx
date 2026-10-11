import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider, Link, useRouteError } from 'react-router-dom'
import { SiteLayout } from '@/components/layout/SiteLayout'
import HomePage from '@/pages/HomePage'
import { SiteContentProvider } from '@/context/SiteContentContext'
import { AlertCircle, ArrowLeft } from 'lucide-react'

// Halaman selain Beranda di-lazy-load → bundle awal tetap kecil
const SectionPage = lazy(() => import('@/pages/SectionPage'))
const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'))

function RouteErrorBoundary() {
  const error = useRouteError() as Error | null
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-rose-200">
        <AlertCircle className="h-8 w-8" />
      </div>
      <h2 className="mt-4 text-2xl font-extrabold text-slate-900">
        Terjadi Kendala Memuat Halaman
      </h2>
      <p className="mt-2 max-w-md text-sm text-slate-600">
        {error?.message || 'Halaman sedang mengalami penyesuaian. Silakan kembali ke beranda atau muat ulang halaman.'}
      </p>
      <div className="mt-6 flex gap-3">
        <Link to="/" className="btn-primary min-h-11 px-5 text-sm">
          <ArrowLeft className="h-4 w-4" /> Kembali ke Beranda
        </Link>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="btn-outline min-h-11 px-5 text-sm"
        >
          Muat Ulang
        </button>
      </div>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/admin',
    errorElement: <RouteErrorBoundary />,
    element: (
      <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-bold">Memuat Ruang Pengelola...</div>}>
        <AdminDashboardPage />
      </Suspense>
    ),
  },
  {
    path: '/admin/*',
    errorElement: <RouteErrorBoundary />,
    element: (
      <Suspense fallback={<div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500 font-bold">Memuat Ruang Pengelola...</div>}>
        <AdminDashboardPage />
      </Suspense>
    ),
  },
  {
    element: <SiteLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: '*', element: <SectionPage /> },
    ],
  },
])

export default function App() {
  return (
    <SiteContentProvider>
      <RouterProvider router={router} />
    </SiteContentProvider>
  )
}
