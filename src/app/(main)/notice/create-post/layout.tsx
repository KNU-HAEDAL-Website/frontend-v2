'use client'

import { ReactNode } from 'react'

import { useRouter } from 'next/navigation'

import { ErrorBoundary, MainErrorFallback } from '@/components/common'

const CreateNoticePostLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  return (
    <ErrorBoundary
      onReset={() => router.refresh()}
      FallbackComponent={MainErrorFallback}
    >
      {children}
    </ErrorBoundary>
  )
}

export default CreateNoticePostLayout
