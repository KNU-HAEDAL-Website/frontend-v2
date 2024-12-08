'use client'

import { useRouter } from 'next/navigation'

import { useAuthStore } from '@/store/auth'
import { useMyInfoStore } from '@/store/myInfo'

export const LogoutButton = () => {
  const router = useRouter()
  const clearAccessToken = useAuthStore((state) => state.clearAccessToken)
  const clearMyInfo = useMyInfoStore((state) => state.clearMyInfo)

  const onClick = () => {
    clearAccessToken()
    clearMyInfo()
    router.refresh()
  }

  return <button onClick={onClick}>로그아웃</button>
}
