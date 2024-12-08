'use client'

import { ColumnDef } from '@tanstack/react-table'

import { MemberTable, SkeletonTable } from '@/components/feature'
import { useGetActiveUsers } from '@/service/data/user'
import { ActiveUser } from '@/types/user'

import { ExpelMemberDialog } from './Dialog'

export const ExpelMemberTable = () => {
  const { data: activeUsers, status, error } = useGetActiveUsers()

  if (status === 'pending') return <SkeletonTable />

  if (error) return <div>{error.message}</div>

  if (!activeUsers) return <div>멤버가 없습니다.</div>

  const expelMemberColumn: ColumnDef<ActiveUser>[] = [
    {
      header: '',
      id: 'id',
      cell: ({ row, table }) => (
        <div className="text-center">
          {table?.getSortedRowModel()?.flatRows?.indexOf(row) + 1}
        </div>
      ),
    },
    {
      accessorKey: 'userName',
      header: '이름',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('userName')}</div>
      ),
    },
    {
      accessorKey: 'studentNumber',
      header: '학번',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('studentNumber')}</div>
      ),
    },
    {
      accessorKey: 'role',
      header: '등급',
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('role')}</div>
      ),
    },
    {
      accessorKey: 'isBanned',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex justify-center">
            <ExpelMemberDialog user={row.original} />
          </div>
        )
      },
    },
  ]

  return (
    <div className="flex w-full max-w-screen-lg">
      <MemberTable data={activeUsers} columns={expelMemberColumn} />
    </div>
  )
}
