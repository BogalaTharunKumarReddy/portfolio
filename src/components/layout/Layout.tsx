import type { ReactNode } from 'react'
import { ActiveSectionProvider } from '@/context/ActiveSectionContext'
import { useHashScroll } from '@/hooks/useHashScroll'
import { AmbientBackground } from './AmbientBackground'
import { Footer } from './Footer'
import { BackToTop } from './BackToTop'
import { Navbar } from './Navbar'
import { ScrollProgress } from './ScrollProgress'
import { SkipLink } from './SkipLink'

function LayoutShell({ children }: { children: ReactNode }) {
  useHashScroll()

  return (
    <>
      <SkipLink />
      <AmbientBackground />
      <ScrollProgress />
      <Navbar />
      <main id="main" tabIndex={-1} className="min-h-[70vh] outline-none">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <ActiveSectionProvider>
      <LayoutShell>{children}</LayoutShell>
    </ActiveSectionProvider>
  )
}
