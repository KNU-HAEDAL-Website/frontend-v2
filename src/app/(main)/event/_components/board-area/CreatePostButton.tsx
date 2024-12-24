'use client'

import { useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui'
import { useMyInfoStore } from '@/store/myInfo'

export const CreatePostButton = () => {
  const pathName = usePathname()
  const router = useRouter()

  const { role } = useMyInfoStore((state) => state.getMyInfo())
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    setDisabled(!(role === '해구르르'))
  }, [role])

  if (disabled) return null

  return (
    <Button
      onClick={() => router.push(`${pathName}/board/create-post`)}
      disabled={disabled}
    >
      게시글 작성하기
    </Button>
  )
}
