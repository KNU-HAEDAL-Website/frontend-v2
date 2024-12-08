'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui'
import { ACCESS_ERROR_MESSAGE } from '@/constant/errorMessage'

import { FallbackProps } from './error-boundary'

const MainErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const router = useRouter()

  if (error?.message === ACCESS_ERROR_MESSAGE.UNAUTHORIZED_ERROR) {
    return (
      <div className="flex flex-col items-center gap-6 pt-40">
        <div>{error?.message} </div>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => router.back()}>
            뒤로가기
          </Button>
          <Button onClick={() => router.push('/auth/login')}>로그인</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-6 pt-40">
      <div>{error?.message} </div>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={() => router.back()}>
          뒤로가기
        </Button>
        <Button onClick={() => resetErrorBoundary()}>다시 시도</Button>
      </div>
    </div>
  )
}

export default MainErrorFallback
