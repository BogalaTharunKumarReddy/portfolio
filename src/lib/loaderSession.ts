export const LOADER_SESSION_KEY = 'portfolio:loaded'

/** Whether the loader has already played in this browser session. */
export function hasSeenLoader(): boolean {
  try {
    return sessionStorage.getItem(LOADER_SESSION_KEY) === '1'
  } catch {
    return false
  }
}

export function markLoaderSeen(): void {
  try {
    sessionStorage.setItem(LOADER_SESSION_KEY, '1')
  } catch {
    /* storage unavailable: the loader simply plays again next visit */
  }
}
