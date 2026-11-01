import { useCallback, useState } from 'react'

export type Theme = 'light' | 'dark'
const KEY = 'portfolio:theme'

function read(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
}

/** Light is the default; a visitor's choice is remembered in localStorage (best effort). */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(read)

  const toggle = useCallback(() => {
    const next: Theme = read() === 'dark' ? 'light' : 'dark'
    if (next === 'dark') document.documentElement.setAttribute('data-theme', 'dark')
    else document.documentElement.removeAttribute('data-theme')
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#02040a' : '#f6f8fc')
    document.querySelector('meta[name="color-scheme"]')?.setAttribute('content', next)
    try {
      localStorage.setItem(KEY, next)
    } catch {
      /* storage unavailable: the choice just won't persist */
    }
    setTheme(next)
  }, [])

  return { theme, toggle }
}
