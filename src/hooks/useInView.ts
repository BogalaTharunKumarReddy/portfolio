import { useEffect, useRef, useState } from 'react'

/**
 * Tracks whether an element is within `rootMargin` of the viewport.
 * `everInView` flips to true once and stays true (good for lazy mounting).
 */
export function useInView<T extends Element>(rootMargin = '200px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  const [everInView, setEverInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        setInView(entry.isIntersecting)
        if (entry.isIntersecting) setEverInView(true)
      },
      { rootMargin },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return { ref, inView, everInView }
}
