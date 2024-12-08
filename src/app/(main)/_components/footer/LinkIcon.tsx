import Image from 'next/image'
import Link from 'next/link'

type LinkIconData = {
  id: number
  href: string
  src: string
  alt: string
}

export const LinkIcon = () => {
  return (
    <div className="flex gap-2">
      {linkIconData.map((linkIcon) => (
        <Link href={linkIcon.href} key={linkIcon.id}>
          <Image
            className="h-auto w-6"
            src={linkIcon.src}
            alt={linkIcon.alt}
            width={0}
            height={0}
          />
        </Link>
      ))}
    </div>
  )
}

const linkIconData: LinkIconData[] = [
  {
    id: 0,
    href: 'mailto:knu.haedal@gmail.com',
    src: '/asset/icon/Email.svg',
    alt: 'HAEDAL Email Link',
  },
  {
    id: 1,
    href: 'https://github.com/KNU-HAEDAL',
    src: '/asset/icon/Github.svg',
    alt: 'HAEDAL Github Link',
  },
  {
    id: 2,
    href: 'https://www.instagram.com/knu.haedal/',
    src: '/asset/icon/Instagram.svg',
    alt: 'HAEDAL Instagram Link',
  },
]
