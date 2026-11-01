import { AnimatePresence } from 'framer-motion'
import { lazy, Suspense, useCallback, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { Loader } from '@/components/layout/Loader'
import { PageTransition } from '@/components/motion/PageTransition'
import { hasSeenLoader } from '@/lib/loaderSession'
import Home from '@/pages/Home'
import NotFound from '@/pages/NotFound'

// Secondary routes are code-split: they download only when visited.
const ProjectPage = lazy(() => import('@/pages/ProjectPage'))
const BlogPostPage = lazy(() => import('@/pages/BlogPostPage'))

function RouteFallback() {
  return <div role="status" aria-label="Loading page" className="min-h-screen" />
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route
          path="/projects/:slug"
          element={
            <PageTransition>
              <Suspense fallback={<RouteFallback />}>
                <ProjectPage />
              </Suspense>
            </PageTransition>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <PageTransition>
              <Suspense fallback={<RouteFallback />}>
                <BlogPostPage />
              </Suspense>
            </PageTransition>
          }
        />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  // The loader plays once per browser session. The app mounts as soon as it reports ready.
  const [ready, setReady] = useState(() => hasSeenLoader())
  const [showLoader] = useState(() => !hasSeenLoader())
  const onReady = useCallback(() => setReady(true), [])

  return (
    <>
      {showLoader && <Loader onReady={onReady} />}
      {ready && (
        <Layout>
          <AnimatedRoutes />
        </Layout>
      )}
    </>
  )
}
