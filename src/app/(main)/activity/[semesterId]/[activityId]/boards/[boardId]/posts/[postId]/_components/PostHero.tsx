'use client'

import { usePathname } from 'next/navigation'

import { ActivityBreadcrumb } from '@/components/feature'
import { Separator } from '@/components/ui'

type ActivityPostHeroProps = {
  boardName: string
}

export const ActivityPostHero = ({ boardName }: ActivityPostHeroProps) => {
  const pathName = usePathname()
  const basePath = pathName.split('/').slice(0, -2).join('/')

  const navLinks = [
    {
      link: `${basePath}`,
      name: `${boardName} 게시판`,
    },
  ]

  return (
    <div className="flex flex-col">
      <Separator variant="dark" />
      <ActivityBreadcrumb navLinks={navLinks} />
      <Separator variant="dark" />
    </div>
  )
}
