'use client'

import { useEffect, useState } from 'react'

import Link from 'next/link'

import { useAuthStore } from '@/store/auth'

import { UserAvatar } from './UserAvatar'
import { ProfileDropdownMenu } from './dropdown-menu'

export const ProfileButton = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const accessToken = useAuthStore((state) => state.accessToken)

  useEffect(() => {
    setIsLoggedIn(!!accessToken)
  }, [accessToken])

  if (!isLoggedIn) {
    return (
      <Link href="/auth/login">
        <UserAvatar />
      </Link>
    )
  }

  return (
    <div className="flex">
      <ProfileDropdownMenu />
    </div>
  )
}
