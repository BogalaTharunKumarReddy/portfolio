import { createContext } from 'react'

export interface ActiveSectionValue {
  /** Id of the section currently in view on the home page ('' when not on home). */
  active: string
  setActive: (id: string) => void
}

export const ActiveSectionContext = createContext<ActiveSectionValue | null>(null)
