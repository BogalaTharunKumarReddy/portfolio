import { useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

export function BackToTop() {
  const reduce = useReducedMotion() ?? false
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={visible ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })}
      className={cn(
        'glass-strong fixed bottom-6 right-5 z-40 grid h-12 w-12 place-items-center rounded-full text-brand-blue shadow-glow transition-all duration-300 hover:-translate-y-1 sm:right-8',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
      )}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  )
}
