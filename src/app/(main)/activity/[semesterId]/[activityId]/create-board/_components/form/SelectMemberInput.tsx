'use client'

import { Dispatch, SetStateAction } from 'react'

import { UserQuries } from '@/servicetest/api/user'
import { useQuery } from '@tanstack/react-query'

import { Skeleton } from '@/components/ui'
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
  const { data: users, status, error } = useQuery(UserQuries.list())

  if (status === 'pending')
    return <Skeleton className="h-8 w-full bg-slate-50" />

  if (!users) return <div>유저가 없습니다.</div>

  if (error) return <div>{error.message}</div>

  return (
    <MultipleMemberSelect
      options={users}
      onChange={(members) => setSelectedMember(members)}
      value={selectedMember}
    />
  )
}