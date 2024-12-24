'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { logoutApi } from '@/service/api'
import { useMyInfoStore } from '@/store/myInfo'

export const LogoutButton = () => {
  const router = useRouter()
  const clearMyInfo = useMyInfoStore((state) => state.clearMyInfo)

  const { mutate: logout } = useMutation({
    mutationFn: logoutApi,
  })

  const onClick = () => {
    logout()
    clearMyInfo()
    router.refresh()
  }

  return <button onClick={onClick}>로그아웃</button>
}
