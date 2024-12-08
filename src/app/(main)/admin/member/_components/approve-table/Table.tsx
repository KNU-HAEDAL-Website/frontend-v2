'use client'

import { ColumnDef } from '@tanstack/react-table'
import { kstFormat } from '@toss/date'

import { MemberTable, SkeletonTable } from '@/components/feature'
import { useGetInActiveUsers } from '@/service/data/user'
import { InActiveUser } from '@/types/user'

import { ApproveMemberButton } from './Button'

export const ApproveMemberTable = () => {
  const { data: inActiveUsers, status, error } = useGetInActiveUsers()

  if (status === 'pending') return <SkeletonTable />

  if (error) return <div>{error.message}</div>

  if (!inActiveUsers) return <div>회원 신청이 없습니다.</div>

  const approveMemberColumn: ColumnDef<InActiveUser>[] = [
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
      accessorKey: 'regDate',
      header: '가입일',
      cell: ({ row }) => (
        <div className="text-center">
          {kstFormat(new Date(row.getValue('regDate')), 'yyyy.LL.dd')}
        </div>
      ),
    },
    {
      accessorKey: 'isAccepted',
      header: '',
      cell: ({ row }) => {
        return (
          <div className="flex justify-center">
            <ApproveMemberButton userId={row.original.userId} />
          </div>
        )
      },
    },
  ]

  return (
    <div className="flex w-full max-w-screen-lg">
      <MemberTable data={inActiveUsers} columns={approveMemberColumn} />
    </div>
  )
}
