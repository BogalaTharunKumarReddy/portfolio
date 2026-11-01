import { useMemo, useState, type ReactNode } from 'react'
import { ActiveSectionContext } from './activeSection'

export function ActiveSectionProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState('')
  const value = useMemo(() => ({ active, setActive }), [active])
  return <ActiveSectionContext.Provider value={value}>{children}</ActiveSectionContext.Provider>
}
