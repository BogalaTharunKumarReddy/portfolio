/**
 * Minimal, unauthenticated GitHub REST client. No token is used or needed
 * (public data only), so there is no secret to leak. Responses are cached in
 * sessionStorage for 10 minutes to stay well inside the anonymous rate limit.
 */

export interface GithubUser {
  login: string
  name: string | null
  avatar_url: string
  html_url: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
}

export interface GithubRepo {
  id: number
  name: string
  description: string | null
  html_url: string
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  fork: boolean
  archived: boolean
  pushed_at: string
  topics?: string[]
}

export interface GithubData {
  user: GithubUser
  repos: GithubRepo[]
  totalStars: number
  languages: { name: string; count: number }[]
}

export type GithubErrorKind = 'rate-limit' | 'not-found' | 'network' | 'unknown'

export class GithubError extends Error {
  readonly kind: GithubErrorKind

  constructor(message: string, kind: GithubErrorKind) {
    super(message)
    this.kind = kind
  }
}

const API = 'https://api.github.com'
const TTL_MS = 10 * 60 * 1000

function readCache(key: string): GithubData | null {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const { at, data } = JSON.parse(raw) as { at: number; data: GithubData }
    return Date.now() - at < TTL_MS ? data : null
  } catch {
    return null
  }
}

function writeCache(key: string, data: GithubData): void {
  try {
    sessionStorage.setItem(key, JSON.stringify({ at: Date.now(), data }))
  } catch {
    /* storage full or unavailable: skip caching */
  }
}

async function getJson<T>(url: string, signal?: AbortSignal): Promise<T> {
  let res: Response
  try {
    res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' }, signal })
  } catch (error) {
    if ((error as Error).name === 'AbortError') throw error
    throw new GithubError('Could not reach GitHub.', 'network')
  }
  if (res.status === 404) throw new GithubError('GitHub user not found.', 'not-found')
  if (res.status === 403 || res.status === 429) throw new GithubError('GitHub rate limit reached. Try again later.', 'rate-limit')
  if (!res.ok) throw new GithubError(`GitHub responded with ${res.status}.`, 'unknown')
  return (await res.json()) as T
}

const inflight = new Map<string, Promise<GithubData>>()

/** Shared by every component that needs GitHub data: one network request per page load. */
export function fetchGithubData(username: string, signal?: AbortSignal): Promise<GithubData> {
  const cached = readCache(`portfolio:github:${username}`)
  if (cached) return Promise.resolve(cached)
  let pending = inflight.get(username)
  if (!pending) {
    pending = loadGithubData(username).finally(() => inflight.delete(username))
    inflight.set(username, pending)
  }
  if (!signal) return pending
  return new Promise<GithubData>((resolve, reject) => {
    const abort = () => reject(new DOMException('Aborted', 'AbortError'))
    if (signal.aborted) return abort()
    signal.addEventListener('abort', abort, { once: true })
    pending.then(resolve, reject)
  })
}

async function loadGithubData(username: string, signal?: AbortSignal): Promise<GithubData> {
  const cacheKey = `portfolio:github:${username}`
  const cached = readCache(cacheKey)
  if (cached) return cached

  const [user, allRepos] = await Promise.all([
    getJson<GithubUser>(`${API}/users/${encodeURIComponent(username)}`, signal),
    getJson<GithubRepo[]>(`${API}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed`, signal),
  ])

  const repos = allRepos
    .filter((repo) => !repo.fork && !repo.archived)
    .sort((a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime())

  const counts = new Map<string, number>()
  for (const repo of repos) if (repo.language) counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1)

  const data: GithubData = {
    user,
    repos,
    totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    languages: [...counts.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count),
  }
  writeCache(cacheKey, data)
  return data
}
