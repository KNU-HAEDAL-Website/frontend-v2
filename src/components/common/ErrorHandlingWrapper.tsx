'use client'

import { ComponentType, ReactNode, Suspense } from 'react'

import { QueryErrorResetBoundary } from '@tanstack/react-query'

import ErrorBoundary, { FallbackProps } from './error-boundary/Errorboundary'

interface PropsType {
  children: React.ReactNode
  fallbackComponent: ComponentType<FallbackProps>
  suspenseFallback: ReactNode
}

export default function ErrorHandlingWrapper({
  children,
  fallbackComponent: FallbackComponent,
  suspenseFallback: SuspenseFallback,
}: PropsType) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary onReset={reset} FallbackComponent={FallbackComponent}>
          <Suspense fallback={SuspenseFallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
