import { Component, type ErrorInfo, type ReactNode } from 'react'

interface ErrorBoundaryProps {
  fallback: ReactNode
  children: ReactNode
  onError?: (error: Error) => void
}

interface ErrorBoundaryState {
  failed: boolean
}

/** Swallows render errors (e.g. WebGL context creation failing) and shows a fallback. */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { failed: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { failed: true }
  }

  componentDidCatch(error: Error, _info: ErrorInfo): void {
    this.props.onError?.(error)
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}
