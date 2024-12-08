import { HTMLAttributes } from 'react'

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps extends HTMLAttributes<HTMLDivElement> {}

export const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/" className={className}>
      <Image
        width={0}
        height={0}
        src="/logo.svg"
        alt="logo"
        sizes="100vw"
        priority
        className="h-full w-auto"
      />
    </Link>
  )
}
