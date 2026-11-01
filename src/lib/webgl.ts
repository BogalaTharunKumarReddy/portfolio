let cached: boolean | undefined

/** True when the browser can create a WebGL context. Result is cached. */
export function supportsWebGL(): boolean {
  if (cached !== undefined) return cached
  try {
    const canvas = document.createElement('canvas')
    cached = Boolean(
      window.WebGLRenderingContext && (canvas.getContext('webgl2') || canvas.getContext('webgl')),
    )
  } catch {
    cached = false
  }
  return cached
}
