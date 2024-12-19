import { ComponentType } from 'react'

import {
  EnvelopeClosedIcon,
  GitHubLogoIcon,
  InstagramLogoIcon,
} from '@radix-ui/react-icons'
import { IconProps } from '@radix-ui/react-icons/dist/types'
import Link from 'next/link'

type LinkIconData = {
  id: number
  href: string
  icon: ComponentType<IconProps>
  alt: string
}

export const LinkIcon = () => {
  return (
    <div className="absolute bottom-8 right-12 flex gap-4">
      {linkIconData.map((linkIcon) => (
        <Link href={linkIcon.href} key={linkIcon.id}>
          <linkIcon.icon className="h-6 w-6" />
        </Link>
      ))}
    </div>
  )
}

const linkIconData: LinkIconData[] = [
  {
    id: 0,
    href: 'mailto:knu.haedal@gmail.com',
    icon: EnvelopeClosedIcon,
    alt: 'HAEDAL Email Link',
  },
  {
    id: 1,
    href: 'https://github.com/KNU-HAEDAL',
    icon: GitHubLogoIcon,
    alt: 'HAEDAL Github Link',
  },
  {
    id: 2,
    href: 'https://www.instagram.com/knu.haedal/',
    icon: InstagramLogoIcon,
    alt: 'HAEDAL Instagram Link',
  },
]
