import { useCallback, useEffect, useState } from 'react'
import { fetchGithubData, GithubError, type GithubData } from '@/lib/github'

type State =
  | { status: 'loading' }
  | { status: 'error'; message: string; kind: GithubError['kind'] }
  | { status: 'success'; data: GithubData }

/** Loads GitHub profile + repos once the component mounts, with retry support. */
export function useGithub(username: string, enabled = true) {
  const [state, setState] = useState<State>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    if (!enabled) return
    const controller = new AbortController()
    fetchGithubData(username, controller.signal)
      .then((data) => setState({ status: 'success', data }))
      .catch((error: unknown) => {
        if ((error as Error).name === 'AbortError') return
        setState({
          status: 'error',
          message: error instanceof GithubError ? error.message : 'Something went wrong loading GitHub data.',
          kind: error instanceof GithubError ? error.kind : 'unknown',
        })
      })
    return () => controller.abort()
  }, [username, enabled, attempt])

  const retry = useCallback(() => {
    setState({ status: 'loading' })
    setAttempt((n) => n + 1)
  }, [])

  return { state, retry }
}
