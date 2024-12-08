'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

interface NavigationItemProps {
  name: string
  href: string
}

export const NavigationItem = ({ name, href }: NavigationItemProps) => {
  const pathname = usePathname()

  const isActive =
    (pathname === '/' && href === '/') ||
    pathname === href ||
    pathname?.startsWith(`${href}/`)

  return (
    <Link
      href={href}
      className={cn(
        'pb-1 font-normal hover:text-slate-300',
        isActive && 'border-b font-medium',
      )}
    >
      {name}
    </Link>
  )
}
