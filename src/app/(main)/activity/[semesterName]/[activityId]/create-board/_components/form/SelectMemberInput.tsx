'use client'

import { Dispatch, SetStateAction } from 'react'

import { Skeleton } from '@/components/ui'
import { useGetUsers } from '@/service/data/user'
import { User } from '@/types/user'

import { MultipleMemberSelect } from './MultipleMemberSelect'

type SelectMemberInputProps = {
  selectedMember: User[]
  setSelectedMember: Dispatch<SetStateAction<User[]>>
}

export const SelectMemberInput = ({
  selectedMember,
  setSelectedMember,
}: SelectMemberInputProps) => {
  const { users, status } = useGetUsers()

  if (status === 'pending')
    return <Skeleton className="h-8 w-full bg-slate-50" />
  if (!users) return <div>유저가 없습니다.</div>

  return (
    <MultipleMemberSelect
      options={users}
      onChange={(members) => setSelectedMember(members)}
      value={selectedMember}
    />
  )
}
