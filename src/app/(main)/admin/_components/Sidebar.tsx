'use client'

import { PersonIcon, RocketIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Sidebar, SidebarItem } from '@/components/ui'

export const AdminSidebar = () => {
  const pathname = usePathname()

  return (
    <Sidebar name="관리자 메뉴">
      <Link href="/admin/member">
        <SidebarItem
          icon={<PersonIcon className="h-5 w-5" />}
          text="멤버 관리"
          active={pathname === '/admin/member'}
        />
      </Link>
      <Link href={'/admin/semester'}>
        <SidebarItem
          icon={<RocketIcon className="h-5 w-5" />}
          text="학기&활동 관리"
          active={pathname === '/admin/semester'}
        />
      </Link>
    </Sidebar>
  )
}
