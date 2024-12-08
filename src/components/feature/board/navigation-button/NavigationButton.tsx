'use client'

import { ArrowRightIcon } from '@radix-ui/react-icons'
import { usePathname, useRouter } from 'next/navigation'

import { Button } from '@/components/ui'

export const BoardNavigationButton = () => {
  const router = useRouter()
  const pathName = usePathname()
  const boardPath = pathName.split('/').slice(0, -2).join('/')

  return (
    <div className="flex justify-end pt-20">
      <Button onClick={() => router.push(boardPath)} variant="link">
        <div>게시판으로 이동하기</div>
        <ArrowRightIcon />
      </Button>
    </div>
  )
}
