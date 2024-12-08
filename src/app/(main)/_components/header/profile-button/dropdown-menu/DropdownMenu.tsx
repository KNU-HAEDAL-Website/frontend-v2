'use client'

import { GearIcon } from '@radix-ui/react-icons'
import Link from 'next/link'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui'
import { useMyInfoStore } from '@/store/myInfo'

import { UserAvatar } from '../UserAvatar'
import { LogoutButton } from './LogoutButton'

export const ProfileDropdownMenu = () => {
  const { role } = useMyInfoStore((state) => state.getMyInfo())

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar />
        {/* <UserAvatar userImage={userImageUrl} /> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-4">
        {role === '해구르르' && (
          <DropdownMenuItem>
            <Link href={'/admin/member'} className="flex items-center gap-2">
              <GearIcon />
              <div>관리자</div>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
