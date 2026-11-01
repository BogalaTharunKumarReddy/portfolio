import { useEffect, useState } from 'react'

/** Whether the image at `src` exists and decodes. False while loading and on error. */
export function useImageAvailable(src: string): boolean {
  const [state, setState] = useState<{ src: string; ok: boolean } | null>(null)

  useEffect(() => {
    let cancelled = false
    const img = new Image()
    img.onload = () => {
      if (!cancelled) setState({ src, ok: true })
    }
    img.onerror = () => {
      if (!cancelled) setState({ src, ok: false })
    }
    img.src = src
    return () => {
      cancelled = true
    }
  }, [src])

  return state?.src === src && state.ok
}
