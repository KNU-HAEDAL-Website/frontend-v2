'use client'

import { Component, ComponentType, ErrorInfo, ReactNode } from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export interface FallbackProps {
  error: Error | null
  resetErrorBoundary: () => void
}

type ErrorBoundaryProps = {
  FallbackComponent: ComponentType<FallbackProps>
  onReset: () => void
  children: ReactNode
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)

    this.state = {
      hasError: false,
      error: null,
    }

    this.resetErrorBoundary = this.resetErrorBoundary.bind(this)
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log({ error, errorInfo })
  }

  resetErrorBoundary(): void {
    this.props.onReset()

    this.setState({
      hasError: false,
      error: null,
    })
  }

  render() {
    const { state, props } = this

    const { hasError, error } = state

    const { FallbackComponent, children } = props

    if (hasError && error) {
      return (
        <FallbackComponent
          error={error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      )
    }

    return children
  }
}

export default ErrorBoundary
