'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useMyInfoStore } from '@/store/myInfo'

import { AdminSidebar } from './_components'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { role } = useMyInfoStore((state) => state.getMyInfo())
  const router = useRouter()

  useEffect(() => {
    if (role !== '해구르르') {
      router.replace('/')
    }
  }, [role, router])

  return (
    <div className="flex h-full w-full flex-1">
      <div className="flex-1 bg-slate-200">
        <AdminSidebar />
      </div>
      <main className="w-full">{children}</main>
    </div>
  )
}

export default AdminLayout
