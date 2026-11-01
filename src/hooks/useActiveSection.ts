import { useContext } from 'react'
import { ActiveSectionContext, type ActiveSectionValue } from '@/context/activeSection'

export function useActiveSection(): ActiveSectionValue {
  const ctx = useContext(ActiveSectionContext)
  if (!ctx) throw new Error('useActiveSection must be used inside <ActiveSectionProvider>')
  return ctx
}
