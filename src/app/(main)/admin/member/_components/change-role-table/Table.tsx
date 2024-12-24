'use client'

import { useQuery } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'

import { MemberTable, SkeletonTable } from '@/components/feature'
import { AdminUserQuries } from '@/service/api'
import { UserResponseDto } from '@/service/models'

import { ChangeRoleDialog } from './Dialog'

export const ChangeRoleTable = () => {
  const {
    data: activeUsers,
    status,
    error,
  } = useQuery(AdminUserQuries.active())

  if (status === 'pending') return <SkeletonTable />

  if (error) return <div>{error.message}</div>

  if (!activeUsers) return <div>멤버가 없습니다.</div>

  const changeRoleColumn: ColumnDef<UserResponseDto>[] = [
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
      cell: ({ row }) => {
        const user = row.original

        return (
          <div className="flex justify-center">
            <ChangeRoleDialog user={user} />
          </div>
        )
      },
    },
  ]

  return (
    <div className="flex w-full max-w-screen-lg">
      <MemberTable data={activeUsers} columns={changeRoleColumn} />
    </div>
  )
}
