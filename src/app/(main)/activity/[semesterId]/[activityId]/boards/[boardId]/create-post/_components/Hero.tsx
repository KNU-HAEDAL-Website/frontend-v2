'use client'

import { usePathname } from 'next/navigation'

import { NavLink } from '@/components/common'
import { ActivityBreadcrumb } from '@/components/feature'
import { Separator } from '@/components/ui'

type CreateActivityPostHeroProps = {
  boardName: string
}

export const CreateActivityPostHero = ({
  boardName,
}: CreateActivityPostHeroProps) => {
  const pathName = usePathname()

  const boardPath = pathName.split('/').slice(0, -1).join('/')

  const navLinks: NavLink[] = [
    {
      link: `${boardPath}`,
      name: `${boardName} 게시판`,
    },
  ]

  return (
    <div>
      <Separator variant="dark" />
      <ActivityBreadcrumb navLinks={navLinks} pageName="게시글 생성하기" />
      <Separator variant="dark" />
    </div>
  )
}
