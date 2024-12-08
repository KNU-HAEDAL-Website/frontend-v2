'use client'

import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'

import { navigationLinks } from './Navigation'

export const MobileNavigation = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <HamburgerMenuIcon className="h-auto w-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-4">
        {navigationLinks.map((route) => (
          <DropdownMenuItem key={route.href}>
            <Link href={route.href}>{route.name}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
